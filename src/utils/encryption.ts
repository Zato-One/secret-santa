import type { EncryptedAssignment } from '../types/assignment';

const ENCRYPTION_PASSPHRASE = 'secret-santa-2024-encryption-key-v1';
const SALT = 'secret-santa-salt-2024';
const ALGORITHM = 'AES-GCM';
const KEY_LENGTH = 256;
const IV_LENGTH = 12;

let cachedKey: CryptoKey | null = null;

async function deriveKey(passphrase: string): Promise<CryptoKey> {
  if (cachedKey) {
    return cachedKey;
  }

  const encoder = new TextEncoder();
  const passphraseBuffer = encoder.encode(passphrase);
  const saltBuffer = encoder.encode(SALT);

  const importedKey = await window.crypto.subtle.importKey(
    'raw',
    passphraseBuffer,
    { name: 'PBKDF2' },
    false,
    ['deriveBits', 'deriveKey']
  );

  const derivedKey = await window.crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: saltBuffer,
      iterations: 100000,
      hash: 'SHA-256',
    },
    importedKey,
    { name: ALGORITHM, length: KEY_LENGTH },
    false,
    ['encrypt', 'decrypt']
  );

  cachedKey = derivedKey;
  return derivedKey;
}

function stringToArrayBuffer(str: string): Uint8Array {
  const encoder = new TextEncoder();
  return encoder.encode(str);
}

function arrayBufferToString(buffer: ArrayBuffer): string {
  const decoder = new TextDecoder();
  return decoder.decode(buffer);
}

function arrayBufferToBase64Url(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  const base64 = btoa(binary);
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function base64UrlToArrayBuffer(base64Url: string): ArrayBuffer {
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const padding = '='.repeat((4 - (base64.length % 4)) % 4);
  const base64Padded = base64 + padding;
  const binary = atob(base64Padded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes.buffer;
}

export async function encryptData(data: EncryptedAssignment): Promise<string> {
  try {
    const key = await deriveKey(ENCRYPTION_PASSPHRASE);
    const jsonString = JSON.stringify(data);
    const dataBuffer = stringToArrayBuffer(jsonString);

    const iv = window.crypto.getRandomValues(new Uint8Array(IV_LENGTH));

    const encryptedBuffer = await window.crypto.subtle.encrypt(
      {
        name: ALGORITHM,
        iv: iv,
      },
      key,
      dataBuffer
    );

    const combined = new Uint8Array(iv.length + encryptedBuffer.byteLength);
    combined.set(iv, 0);
    combined.set(new Uint8Array(encryptedBuffer), iv.length);

    return arrayBufferToBase64Url(combined.buffer);
  } catch (error) {
    console.error('Encryption error:', error);
    throw new Error('Failed to encrypt data');
  }
}

export async function decryptData(
  encryptedString: string
): Promise<EncryptedAssignment> {
  try {
    const combined = base64UrlToArrayBuffer(encryptedString);
    const combinedArray = new Uint8Array(combined);

    if (combinedArray.length < IV_LENGTH) {
      throw new Error('Invalid encrypted data format');
    }

    const iv = combinedArray.slice(0, IV_LENGTH);
    const ciphertext = combinedArray.slice(IV_LENGTH);

    const key = await deriveKey(ENCRYPTION_PASSPHRASE);

    const decryptedBuffer = await window.crypto.subtle.decrypt(
      {
        name: ALGORITHM,
        iv: iv,
      },
      key,
      ciphertext
    );

    const jsonString = arrayBufferToString(decryptedBuffer);
    const data = JSON.parse(jsonString) as EncryptedAssignment;

    if (!data.giverName || !data.receiverName) {
      throw new Error('Invalid decrypted data structure');
    }

    return data;
  } catch (error) {
    console.error('Decryption error:', error);
    if (error instanceof Error && error.message === 'Invalid encrypted data format') {
      throw error;
    }
    throw new Error('Link is invalid or corrupted');
  }
}

export async function generateRevealLink(
  giverName: string,
  receiverName: string,
  language: string = 'en'
): Promise<string> {
  const data: EncryptedAssignment = {
    giverName,
    receiverName,
    language,
  };

  const encrypted = await encryptData(data);
  const baseUrl = window.location.origin;
  return `${baseUrl}/reveal/${encrypted}`;
}
