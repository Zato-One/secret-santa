import { useState, FormEvent } from 'react'
import { Layout } from '@/components'
import { Participant, PreAssignment } from '@/types'

function MainPage() {
  const [participants, setParticipants] = useState<Participant[]>([])
  const [inputName, setInputName] = useState('')
  const [error, setError] = useState('')
  const [preAssignments, setPreAssignments] = useState<PreAssignment[]>([])
  const [selectedGiverId, setSelectedGiverId] = useState('')
  const [selectedReceiverId, setSelectedReceiverId] = useState('')
  const [preAssignmentError, setPreAssignmentError] = useState('')

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
    setPreAssignments(preAssignments.filter(
      pa => pa.giverId !== id && pa.receiverId !== id
    ))
  }

  const handleInputChange = (value: string) => {
    setInputName(value)
    if (error) setError('')
  }

  const handleAddPreAssignment = (e: FormEvent) => {
    e.preventDefault()

    if (!selectedGiverId || !selectedReceiverId) {
      return
    }

    if (selectedGiverId === selectedReceiverId) {
      setPreAssignmentError('A participant cannot give to themselves')
      return
    }

    const duplicateExists = preAssignments.some(
      pa => pa.giverId === selectedGiverId && pa.receiverId === selectedReceiverId
    )
    if (duplicateExists) {
      setPreAssignmentError('This pre-assignment already exists')
      return
    }

    const giverAlreadyAssigned = preAssignments.some(
      pa => pa.giverId === selectedGiverId
    )
    if (giverAlreadyAssigned) {
      const giverName = getParticipantName(selectedGiverId)
      setPreAssignmentError(`${giverName} is already pre-assigned`)
      return
    }

    const newPreAssignment: PreAssignment = {
      id: crypto.randomUUID(),
      giverId: selectedGiverId,
      receiverId: selectedReceiverId
    }

    setPreAssignments([...preAssignments, newPreAssignment])
    setSelectedGiverId('')
    setSelectedReceiverId('')
    setPreAssignmentError('')
  }

  const handlePreAssignmentSelectionChange = (type: 'giver' | 'receiver', value: string) => {
    if (type === 'giver') {
      setSelectedGiverId(value)
    } else {
      setSelectedReceiverId(value)
    }
    if (preAssignmentError) {
      setPreAssignmentError('')
    }
  }

  const handleRemovePreAssignment = (id: string) => {
    setPreAssignments(preAssignments.filter(pa => pa.id !== id))
  }

  const getParticipantName = (id: string) => {
    return participants.find(p => p.id === id)?.name || 'Unknown'
  }

  const isParticipantPreAssigned = (id: string) => {
    return preAssignments.some(pa => pa.giverId === id || pa.receiverId === id)
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
                        <span className="font-medium text-christmas-green-800 flex items-center gap-2">
                          {participant.name}
                          {isParticipantPreAssigned(participant.id) && (
                            <span className="text-xs bg-christmas-gold-500 text-white px-2 py-0.5 rounded-full" title="Has pre-assignment">
                              🎯
                            </span>
                          )}
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

          {participants.length >= 2 && (
            <section className="mb-8">
              <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8">
                <h2 className="text-2xl font-bold text-christmas-green-700 mb-4">
                  Pre-Assignments (Optional)
                </h2>
                <p className="text-snow-600 mb-6">
                  Specify who should give to whom. The algorithm will respect these assignments.
                </p>

                <form onSubmit={handleAddPreAssignment} className="mb-6">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="flex-1">
                      <label htmlFor="giver-select" className="block text-sm font-medium text-christmas-green-700 mb-2">
                        Giver
                      </label>
                      <select
                        id="giver-select"
                        value={selectedGiverId}
                        onChange={(e) => handlePreAssignmentSelectionChange('giver', e.target.value)}
                        className="w-full px-4 py-3 border-2 border-snow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-christmas-green-500 focus:border-transparent transition-all"
                      >
                        <option value="">Select...</option>
                        {participants.map((participant) => (
                          <option key={participant.id} value={participant.id}>
                            {participant.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="flex-1">
                      <label htmlFor="receiver-select" className="block text-sm font-medium text-christmas-green-700 mb-2">
                        Receiver
                      </label>
                      <select
                        id="receiver-select"
                        value={selectedReceiverId}
                        onChange={(e) => handlePreAssignmentSelectionChange('receiver', e.target.value)}
                        className="w-full px-4 py-3 border-2 border-snow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-christmas-green-500 focus:border-transparent transition-all"
                      >
                        <option value="">Select...</option>
                        {participants.map((participant) => (
                          <option key={participant.id} value={participant.id}>
                            {participant.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="sm:self-end">
                      <button
                        type="submit"
                        className="w-full sm:w-auto px-6 py-3 bg-christmas-green-600 text-white font-semibold rounded-lg hover:bg-christmas-green-700 active:bg-christmas-green-800 transition-colors shadow-md hover:shadow-lg disabled:bg-snow-300 disabled:cursor-not-allowed"
                        disabled={!selectedGiverId || !selectedReceiverId}
                      >
                        Add Pre-Assignment
                      </button>
                    </div>
                  </div>
                  {preAssignmentError && (
                    <p className="text-christmas-red-600 text-sm mt-2 animate-pulse">
                      {preAssignmentError}
                    </p>
                  )}
                </form>

                {preAssignments.length === 0 ? (
                  <div className="text-center py-6 text-snow-600">
                    <p>No pre-assignments yet</p>
                  </div>
                ) : (
                  <div>
                    <h3 className="text-lg font-semibold text-christmas-green-700 mb-4">
                      Pre-Assignments ({preAssignments.length})
                    </h3>
                    <ul className="space-y-2">
                      {preAssignments.map((preAssignment) => (
                        <li
                          key={preAssignment.id}
                          className="flex items-center justify-between bg-snow-50 rounded-lg px-4 py-3 shadow-sm hover:shadow-md transition-shadow"
                        >
                          <span className="font-medium text-christmas-green-800">
                            {getParticipantName(preAssignment.giverId)} → {getParticipantName(preAssignment.receiverId)}
                          </span>
                          <button
                            onClick={() => handleRemovePreAssignment(preAssignment.id)}
                            className="text-christmas-red-600 hover:text-christmas-red-700 hover:scale-110 transition-transform"
                            aria-label={`Remove pre-assignment: ${getParticipantName(preAssignment.giverId)} to ${getParticipantName(preAssignment.receiverId)}`}
                          >
                            ❌
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="mt-8 pt-6 border-t border-snow-200">
                  <button
                    className="w-full px-8 py-4 bg-christmas-gold-500 text-white font-bold text-lg rounded-lg hover:bg-christmas-gold-600 active:bg-christmas-gold-700 transition-colors shadow-lg hover:shadow-xl disabled:bg-snow-300 disabled:cursor-not-allowed disabled:text-snow-500"
                    disabled={participants.length < 3}
                  >
                    {participants.length < 3
                      ? `Need at least 3 participants (currently ${participants.length})`
                      : 'Generate Assignments'}
                  </button>
                </div>
              </div>
            </section>
          )}
        </div>
      </div>
    </Layout>
  )
}

export default MainPage
