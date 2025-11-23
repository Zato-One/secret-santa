const ALGORITHM = 'AES-GCM';
const KEY_LENGTH = 256;
const IV_LENGTH = 12;
const PBKDF2_ITERATIONS = 100000;
const PASSPHRASE = 'secret-santa-encryption-key-2024';

const FIXED_SALT = new Uint8Array([
  83, 101, 99, 114, 101, 116, 83, 97,
  110, 116, 97, 50, 48, 50, 52, 33
]);

let cachedKey: CryptoKey | null = null;

async function deriveKey(): Promise<CryptoKey> {
  if (cachedKey) {
    return cachedKey;
  }

  const encoder = new TextEncoder();
  const passphraseBuffer = encoder.encode(PASSPHRASE);

  const baseKey = await crypto.subtle.importKey(
    'raw',
    passphraseBuffer,
    'PBKDF2',
    false,
    ['deriveBits', 'deriveKey']
  );

  const derivedKey = await crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: FIXED_SALT,
      iterations: PBKDF2_ITERATIONS,
      hash: 'SHA-256',
    },
    baseKey,
    { name: ALGORITHM, length: KEY_LENGTH },
    false,
    ['encrypt', 'decrypt']
  );

  cachedKey = derivedKey;
  return derivedKey;
}

function generateIV(): Uint8Array {
  return crypto.getRandomValues(new Uint8Array(IV_LENGTH));
}

function stringToArrayBuffer(str: string): Uint8Array {
  const encoder = new TextEncoder();
  return encoder.encode(str);
}

function arrayBufferToString(buffer: ArrayBuffer): string {
  const decoder = new TextDecoder();
  return decoder.decode(buffer);
}

export async function encrypt(data: string): Promise<string> {
  const { arrayBufferToBase64Url } = await import('./encoding');

  const key = await deriveKey();
  const iv = generateIV();
  const dataBuffer = stringToArrayBuffer(data);

  const encryptedBuffer = await crypto.subtle.encrypt(
    {
      name: ALGORITHM,
      iv: iv as BufferSource,
    },
    key,
    dataBuffer as BufferSource
  );

  const combinedBuffer = new Uint8Array(iv.length + encryptedBuffer.byteLength);
  combinedBuffer.set(iv, 0);
  combinedBuffer.set(new Uint8Array(encryptedBuffer), iv.length);

  return arrayBufferToBase64Url(combinedBuffer.buffer);
}

export async function decrypt(encryptedData: string): Promise<string> {
  const { base64UrlToArrayBuffer } = await import('./encoding');

  try {
    const key = await deriveKey();
    const combinedBuffer = base64UrlToArrayBuffer(encryptedData);
    const combinedArray = new Uint8Array(combinedBuffer);

    const iv = combinedArray.slice(0, IV_LENGTH);
    const ciphertext = combinedArray.slice(IV_LENGTH);

    const decryptedBuffer = await crypto.subtle.decrypt(
      {
        name: ALGORITHM,
        iv: iv as BufferSource,
      },
      key,
      ciphertext as BufferSource
    );

    return arrayBufferToString(decryptedBuffer);
  } catch {
    throw new Error('Failed to decrypt data. The encrypted code may be invalid or corrupted.');
  }
}

export { deriveKey, generateIV, stringToArrayBuffer, arrayBufferToString };
