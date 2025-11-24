import { useState, FormEvent } from 'react'
import { Layout } from '@/components'
import { Participant } from '@/types'

function MainPage() {
  const [participants, setParticipants] = useState<Participant[]>([])
  const [inputName, setInputName] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    const trimmedName = inputName.trim()

    if (!trimmedName) {
      setError('Please enter a name')
      return
    }

    const isDuplicate = participants.some(
      p => p.name.toLowerCase() === trimmedName.toLowerCase()
    )

    if (isDuplicate) {
      setError('This participant already exists')
      return
    }

    const newParticipant: Participant = {
      id: crypto.randomUUID(),
      name: trimmedName
    }

    setParticipants([...participants, newParticipant])
    setInputName('')
    setError('')
  }

  const handleRemove = (id: string) => {
    setParticipants(participants.filter(p => p.id !== id))
  }

  const handleInputChange = (value: string) => {
    setInputName(value)
    if (error) setError('')
  }

  return (
    <Layout>
      <div className="p-4 sm:p-8">
        <div className="max-w-4xl mx-auto">
          <header className="mb-12">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-christmas-red-600 text-center mb-4">
              🎅 Secret Santa 🎄
            </h1>
            <p className="text-center text-christmas-green-700 text-lg sm:text-xl mb-2">
              Create your Secret Santa assignments
            </p>
            <div className="text-center text-2xl space-x-2">
              <span>❄️</span>
              <span>🎁</span>
              <span>⭐</span>
              <span>🎁</span>
              <span>❄️</span>
            </div>
          </header>

          <section className="mb-8">
            <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8">
              <h2 className="text-2xl font-bold text-christmas-green-700 mb-6">
                Add Participants
              </h2>

              <form onSubmit={handleSubmit} className="mb-6">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1">
                    <label htmlFor="participant-name" className="sr-only">
                      Participant Name
                    </label>
                    <input
                      id="participant-name"
                      type="text"
                      value={inputName}
                      onChange={(e) => handleInputChange(e.target.value)}
                      placeholder="Enter participant name"
                      className="w-full px-4 py-3 border-2 border-snow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-christmas-green-500 focus:border-transparent transition-all"
                    />
                    {error && (
                      <p className="text-christmas-red-600 text-sm mt-2 animate-pulse">
                        {error}
                      </p>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-christmas-green-600 text-white font-semibold rounded-lg hover:bg-christmas-green-700 active:bg-christmas-green-800 transition-colors shadow-md hover:shadow-lg"
                  >
                    Add Participant
                  </button>
                </div>
              </form>

              {participants.length === 0 ? (
                <div className="text-center py-8 text-snow-600">
                  <p className="text-lg">🎄 No participants yet</p>
                  <p className="text-sm mt-2">Add your first participant to get started!</p>
                </div>
              ) : (
                <div>
                  <h3 className="text-lg font-semibold text-christmas-green-700 mb-4">
                    Participants ({participants.length})
                  </h3>
                  <ul className="space-y-2">
                    {participants.map((participant) => (
                      <li
                        key={participant.id}
                        className="flex items-center justify-between bg-snow-50 rounded-lg px-4 py-3 shadow-sm hover:shadow-md transition-shadow"
                      >
                        <span className="font-medium text-christmas-green-800">
                          {participant.name}
                        </span>
                        <button
                          onClick={() => handleRemove(participant.id)}
                          className="text-christmas-red-600 hover:text-christmas-red-700 hover:scale-110 transition-transform"
                          aria-label={`Remove ${participant.name}`}
                        >
                          ❌
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </Layout>
  )
}

export default MainPage
