import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Layout } from '@/components'
import { decryptData } from '@/utils/encryption'
import type { EncryptedAssignment } from '@/types/assignment'
import { getTranslations, replaceVariables, DEFAULT_LANGUAGE } from '@/i18n'

type PageState = 'loading' | 'error' | 'first-confirmation' | 'second-confirmation' | 'reveal'

interface ErrorInfo {
  title: string
  message: string
}

function RevealPage() {
  const { encryptedData } = useParams<{ encryptedData: string }>()

  const [pageState, setPageState] = useState<PageState>('loading')
  const [assignmentData, setAssignmentData] = useState<EncryptedAssignment | null>(null)
  const [error, setError] = useState<ErrorInfo | null>(null)
  const [showModal, setShowModal] = useState(false)

  const language = assignmentData?.language || DEFAULT_LANGUAGE
  const t = getTranslations(language)

  useEffect(() => {
    const loadAssignment = async () => {
      if (!encryptedData || encryptedData.trim() === '') {
        setError({
          title: t.revealPage.error.missingData.title,
          message: t.revealPage.error.missingData.message
        })
        setPageState('error')
        return
      }

      if (encryptedData.length < 10) {
        setError({
          title: t.revealPage.error.invalidLink.title,
          message: t.revealPage.error.invalidLink.message
        })
        setPageState('error')
        return
      }

      try {
        const decrypted = await decryptData(encryptedData)
        setAssignmentData(decrypted)
        setPageState('first-confirmation')
      } catch (err) {
        console.error('Decryption error:', err)

        if (err instanceof Error) {
          if (err.message.includes('Invalid encrypted data format')) {
            setError({
              title: t.revealPage.error.invalidFormat.title,
              message: t.revealPage.error.invalidFormat.message
            })
          } else if (err.message.includes('corrupted')) {
            setError({
              title: t.revealPage.error.corrupted.title,
              message: t.revealPage.error.corrupted.message
            })
          } else {
            setError({
              title: t.revealPage.error.cannotLoad.title,
              message: t.revealPage.error.cannotLoad.message
            })
          }
        } else {
          setError({
            title: t.revealPage.error.unexpected.title,
            message: t.revealPage.error.unexpected.message
          })
        }

        setPageState('error')
      }
    }

    loadAssignment()
  }, [encryptedData])

  const handleFirstConfirmation = () => {
    setShowModal(true)
    setPageState('second-confirmation')
  }

  const handleSecondConfirmation = () => {
    setShowModal(false)
    setPageState('reveal')
  }

  const handleDisagree = () => {
    setShowModal(false)
    setPageState('first-confirmation')
  }

  if (pageState === 'loading') {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center p-8">
          <div className="max-w-2xl mx-auto text-center">
            <div className="animate-spin text-6xl mb-6">❄️</div>
            <h1 className="text-4xl font-bold text-christmas-red-600 mb-4">
              {t.revealPage.loading.title}
            </h1>
            <p className="text-christmas-green-700 text-lg">
              {t.revealPage.loading.subtitle}
            </p>
          </div>
        </div>
      </Layout>
    )
  }

  if (pageState === 'error') {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center p-8">
          <div className="max-w-2xl mx-auto text-center">
            <div className="text-6xl mb-6">🎅</div>
            <h1 className="text-4xl font-bold text-christmas-red-600 mb-4">
              {error?.title || t.revealPage.error.unexpected.title}
            </h1>
            <p className="text-christmas-green-700 text-lg mb-8">
              {error?.message || t.revealPage.error.unexpected.message}
            </p>
            <div className="bg-white/50 backdrop-blur-sm rounded-lg p-6 border-2 border-christmas-gold-400">
              <p className="text-gray-700">
                💡 <strong>{t.revealPage.error.tipLabel}</strong> {t.revealPage.error.tipMessage}
              </p>
            </div>
          </div>
        </div>
      </Layout>
    )
  }

  if (pageState === 'first-confirmation' && assignmentData) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center p-8">
          <div className="max-w-2xl mx-auto text-center">
            <div className="text-6xl mb-8 animate-bounce">🎁</div>
            <h1 className="text-5xl font-bold text-christmas-red-600 mb-6">
              {replaceVariables(t.revealPage.firstConfirmation.question, { name: assignmentData.giverName })}
            </h1>
            <div className="bg-white/50 backdrop-blur-sm rounded-lg p-8 mb-8 border-2 border-christmas-gold-400">
              <p className="text-christmas-green-800 text-lg leading-relaxed mb-4">
                {t.revealPage.firstConfirmation.welcomeText}
              </p>
              <p className="text-christmas-green-700 leading-relaxed">
                {t.revealPage.firstConfirmation.secretText}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleFirstConfirmation}
                className="px-8 py-4 bg-christmas-red-600 text-white text-xl font-semibold rounded-lg hover:bg-christmas-red-700 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform"
              >
                {t.revealPage.firstConfirmation.yesButton}
              </button>
              <button
                onClick={() => window.history.back()}
                className="px-8 py-4 bg-gray-500 text-white text-xl font-semibold rounded-lg hover:bg-gray-600 transition-colors shadow-lg"
              >
                {t.revealPage.firstConfirmation.noButton}
              </button>
            </div>
          </div>
        </div>
      </Layout>
    )
  }

  if ((pageState === 'second-confirmation' || showModal) && assignmentData) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center p-8">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-8 border-4 border-christmas-gold-400 relative animate-scale-in">
              <div className="text-6xl mb-6 text-center">⭐</div>
              <h2 className="text-3xl font-bold text-christmas-red-600 text-center mb-6">
                {replaceVariables(t.revealPage.secondConfirmation.question, { name: assignmentData.giverName })}
              </h2>
              <p className="text-gray-700 text-center mb-8">
                {t.revealPage.secondConfirmation.subtitle}
              </p>
              <div className="flex flex-col gap-3">
                <button
                  onClick={handleSecondConfirmation}
                  className="w-full px-6 py-3 bg-christmas-red-600 text-white text-lg font-semibold rounded-lg hover:bg-christmas-red-700 transition-colors shadow-lg"
                >
                  {replaceVariables(t.revealPage.secondConfirmation.yesButton, { name: assignmentData.giverName })}
                </button>
                <button
                  onClick={handleDisagree}
                  className="w-full px-6 py-3 bg-gray-400 text-white text-lg font-semibold rounded-lg hover:bg-gray-500 transition-colors"
                >
                  {t.revealPage.secondConfirmation.noButton}
                </button>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    )
  }

  if (pageState === 'reveal' && assignmentData) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center p-8 relative overflow-hidden">
          <div className="snowflakes" aria-hidden="true">
            <div className="snowflake">❅</div>
            <div className="snowflake">❆</div>
            <div className="snowflake">❅</div>
            <div className="snowflake">❆</div>
            <div className="snowflake">❅</div>
            <div className="snowflake">❆</div>
            <div className="snowflake">❅</div>
          </div>

          <div className="max-w-3xl mx-auto text-center relative z-10">
            <div className="text-6xl mb-6 animate-bounce">🎅</div>

            <h1 className="text-4xl md:text-5xl font-bold text-christmas-red-600 mb-8 animate-fade-in">
              {t.revealPage.reveal.title}
            </h1>

            <div className="bg-gradient-to-br from-christmas-red-50 to-christmas-green-50 rounded-2xl p-12 mb-8 border-4 border-christmas-gold-400 shadow-2xl animate-scale-in">
              <div className="text-7xl md:text-8xl font-extrabold text-christmas-green-700 mb-4 drop-shadow-lg">
                ⭐ {assignmentData.receiverName} ⭐
              </div>
            </div>

            <div className="bg-white/50 backdrop-blur-sm rounded-xl p-8 mb-6 border-2 border-christmas-gold-300 animate-fade-in-delay">
              <p className="text-2xl font-semibold text-christmas-red-600 mb-4">
                {t.revealPage.reveal.congratulations}
              </p>
              <p className="text-lg text-christmas-green-800 leading-relaxed mb-4">
                {t.revealPage.reveal.messagePrefix} <strong>{assignmentData.receiverName}</strong>{t.revealPage.reveal.messageSuffix}
              </p>
              <p className="text-gray-700 leading-relaxed">
                {t.revealPage.reveal.reminder}
              </p>
            </div>

            <div className="text-4xl space-x-4 animate-fade-in-delay-2">
              <span>🎄</span>
              <span>🎁</span>
              <span>⭐</span>
              <span>🎅</span>
              <span>❄️</span>
            </div>
          </div>
        </div>
      </Layout>
    )
  }

  return null
}

export default RevealPage
