import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Layout } from '@/components'
import { decryptData } from '@/utils/encryption'
import type { EncryptedAssignment } from '@/types/assignment'

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

  useEffect(() => {
    const loadAssignment = async () => {
      if (!encryptedData || encryptedData.trim() === '') {
        setError({
          title: 'Missing Link Data',
          message: 'This link appears to be incomplete. Please check the link and try again, or contact the organizer for a new link.'
        })
        setPageState('error')
        return
      }

      if (encryptedData.length < 10) {
        setError({
          title: 'Invalid Link',
          message: 'This link appears to be invalid or incomplete. Please contact the organizer for a new link.'
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
              title: 'Invalid Link Format',
              message: 'This link appears to be incomplete or invalid. Please contact the organizer for a new link.'
            })
          } else if (err.message.includes('corrupted')) {
            setError({
              title: 'Link Corrupted',
              message: 'This link has been corrupted and cannot be opened. Please contact the organizer for a new link.'
            })
          } else {
            setError({
              title: 'Cannot Load Assignment',
              message: 'Unable to load your assignment. Please contact the organizer for a new link.'
            })
          }
        } else {
          setError({
            title: 'Unexpected Error',
            message: 'Something went wrong while loading your assignment. Please try again or contact the organizer.'
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
              Loading Your Assignment...
            </h1>
            <p className="text-christmas-green-700 text-lg">
              Please wait while we prepare your Secret Santa reveal
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
              {error?.title || 'Oops!'}
            </h1>
            <p className="text-christmas-green-700 text-lg mb-8">
              {error?.message || 'Something went wrong. Please try again.'}
            </p>
            <div className="bg-white/50 backdrop-blur-sm rounded-lg p-6 border-2 border-christmas-gold-400">
              <p className="text-gray-700">
                💡 <strong>Tip:</strong> Make sure you copied the entire link, including all characters at the end.
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
              Are you {assignmentData.giverName}?
            </h1>
            <div className="bg-white/50 backdrop-blur-sm rounded-lg p-8 mb-8 border-2 border-christmas-gold-400">
              <p className="text-christmas-green-800 text-lg leading-relaxed mb-4">
                Welcome to Secret Santa! You've been randomly matched with someone to give a gift to.
              </p>
              <p className="text-christmas-green-700 leading-relaxed">
                This is a surprise, so make sure you're the only one looking at this screen! 🤫
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleFirstConfirmation}
                className="px-8 py-4 bg-christmas-red-600 text-white text-xl font-semibold rounded-lg hover:bg-christmas-red-700 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform"
              >
                Yes, that's me! 🎅
              </button>
              <button
                onClick={() => window.history.back()}
                className="px-8 py-4 bg-gray-500 text-white text-xl font-semibold rounded-lg hover:bg-gray-600 transition-colors shadow-lg"
              >
                No, that's not me
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
                Are you really {assignmentData.giverName}?
              </h2>
              <p className="text-gray-700 text-center mb-8">
                Just making sure before we reveal your Secret Santa assignment!
              </p>
              <div className="flex flex-col gap-3">
                <button
                  onClick={handleSecondConfirmation}
                  className="w-full px-6 py-3 bg-christmas-red-600 text-white text-lg font-semibold rounded-lg hover:bg-christmas-red-700 transition-colors shadow-lg"
                >
                  Yes, I'm {assignmentData.giverName}
                </button>
                <button
                  onClick={handleDisagree}
                  className="w-full px-6 py-3 bg-gray-400 text-white text-lg font-semibold rounded-lg hover:bg-gray-500 transition-colors"
                >
                  No, go back
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
              You're Secret Santa for...
            </h1>

            <div className="bg-gradient-to-br from-christmas-red-50 to-christmas-green-50 rounded-2xl p-12 mb-8 border-4 border-christmas-gold-400 shadow-2xl animate-scale-in">
              <div className="text-7xl md:text-8xl font-extrabold text-christmas-green-700 mb-4 drop-shadow-lg">
                ⭐ {assignmentData.receiverName} ⭐
              </div>
            </div>

            <div className="bg-white/50 backdrop-blur-sm rounded-xl p-8 mb-6 border-2 border-christmas-gold-300 animate-fade-in-delay">
              <p className="text-2xl font-semibold text-christmas-red-600 mb-4">
                🎁 Congratulations! 🎁
              </p>
              <p className="text-lg text-christmas-green-800 leading-relaxed mb-4">
                You're giving a gift to <strong>{assignmentData.receiverName}</strong>!
              </p>
              <p className="text-gray-700 leading-relaxed">
                Remember to keep this a secret and start thinking about a thoughtful gift. Happy holidays! 🎄
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
