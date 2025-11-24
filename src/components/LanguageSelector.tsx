import { useState, useRef, useEffect } from 'react'
import { SUPPORTED_LANGUAGES, type LanguageCode } from '@/i18n'

interface LanguageSelectorProps {
  selectedLanguage: LanguageCode
  onLanguageChange: (language: LanguageCode) => void
}

export function LanguageSelector({ selectedLanguage, onLanguageChange }: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const currentLanguage = SUPPORTED_LANGUAGES.find(lang => lang.code === selectedLanguage)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const handleSelect = (code: LanguageCode) => {
    onLanguageChange(code)
    setIsOpen(false)
  }

  return (
    <div ref={dropdownRef} className="relative inline-block">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2.5 bg-white border-2 border-christmas-green-600 rounded-lg hover:bg-christmas-green-50 transition-all duration-200 shadow-md hover:shadow-lg text-sm sm:text-base font-medium text-christmas-green-700"
        aria-label="Select language"
        aria-expanded={isOpen}
      >
        <span className="text-lg sm:text-xl">{currentLanguage?.flag}</span>
        <span className="hidden sm:inline">{currentLanguage?.nativeName}</span>
        <span className="text-xs sm:text-sm">▼</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 sm:w-56 bg-white border-2 border-christmas-green-600 rounded-lg shadow-xl z-50 max-h-80 overflow-y-auto animate-slide-in">
          {SUPPORTED_LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleSelect(lang.code)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-christmas-green-50 transition-colors duration-150 ${
                lang.code === selectedLanguage
                  ? 'bg-christmas-green-100 font-semibold'
                  : ''
              } first:rounded-t-lg last:rounded-b-lg`}
              aria-label={`Select ${lang.name}`}
            >
              <span className="text-xl">{lang.flag}</span>
              <div className="flex-1">
                <div className="text-sm sm:text-base text-christmas-green-700">
                  {lang.nativeName}
                </div>
                {lang.name !== lang.nativeName && (
                  <div className="text-xs text-snow-600">{lang.name}</div>
                )}
              </div>
              {lang.code === selectedLanguage && (
                <span className="text-christmas-green-700">✓</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
