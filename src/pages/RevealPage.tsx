import { useParams } from 'react-router-dom'
import { Layout } from '@/components'

function RevealPage() {
  const { encryptedData } = useParams<{ encryptedData: string }>()

  return (
    <Layout>
      <div className="p-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-5xl font-bold text-christmas-red-600 text-center mb-8">
            🎁 Secret Santa Reveal 🎁
          </h1>
          <p className="text-center text-christmas-green-700 text-lg">
            Loading your assignment...
          </p>
          {encryptedData && (
            <p className="text-xs text-gray-500 text-center mt-4">
              Data: {encryptedData.substring(0, 20)}...
            </p>
          )}
        </div>
      </div>
    </Layout>
  )
}

export default RevealPage
