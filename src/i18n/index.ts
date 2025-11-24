import type { LanguageCode, Translations } from './types'
import { DEFAULT_LANGUAGE, isValidLanguageCode } from './languages'
import { en } from './translations/en'
import { cs } from './translations/cs'
import { de } from './translations/de'
import { es } from './translations/es'
import { fr } from './translations/fr'
import { it } from './translations/it'
import { pl } from './translations/pl'
import { pt } from './translations/pt'
import { ru } from './translations/ru'

const translations: Record<LanguageCode, Translations> = {
  en,
  cs,
  de,
  es,
  fr,
  it,
  pl,
  pt,
  ru,
}

export function getTranslations(languageCode: string): Translations {
  if (isValidLanguageCode(languageCode)) {
    return translations[languageCode]
  }
  return translations[DEFAULT_LANGUAGE]
}

export function replaceVariables(text: string, variables: Record<string, string>): string {
  let result = text
  for (const [key, value] of Object.entries(variables)) {
    result = result.replace(`{${key}}`, value)
  }
  return result
}

export * from './types'
export * from './languages'
