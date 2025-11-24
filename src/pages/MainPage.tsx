import { Layout } from '@/components'

function MainPage() {
  return (
    <Layout>
      <div className="p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-christmas-red-600 text-center mb-4">
            🎅 Secret Santa 🎄
          </h1>
          <p className="text-center text-christmas-green-700 text-lg mb-8">
            Create your Secret Santa assignments
          </p>
        </div>
      </div>
    </Layout>
  )
}

export default MainPage
