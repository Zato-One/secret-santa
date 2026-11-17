import { useState, FormEvent } from 'react'
import { Participant, PreAssignment, BlockedAssignment } from '@/types'
import type { Translations } from '@/i18n/types'

interface BlockedAssignmentsSectionProps {
  participants: Participant[]
  preAssignments: PreAssignment[]
  blockedAssignments: BlockedAssignment[]
  onChange: (blockedAssignments: BlockedAssignment[]) => void
  t: Translations
}

const selectClass =
  'w-full px-4 py-3 sm:py-3.5 text-base sm:text-lg border-2 border-snow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-christmas-green-500 focus:border-transparent transition-all duration-200'

export function BlockedAssignmentsSection({
  participants,
  preAssignments,
  blockedAssignments,
  onChange,
  t,
}: BlockedAssignmentsSectionProps) {
  const [giverId, setGiverId] = useState('')
  const [receiverId, setReceiverId] = useState('')
  const [error, setError] = useState('')

  const text = t.mainPage.blockedAssignments
  const nameOf = (id: string) => participants.find(p => p.id === id)?.name || 'Unknown'

  const handleSelect = (type: 'giver' | 'receiver', value: string) => {
    if (type === 'giver') setGiverId(value)
    else setReceiverId(value)
    if (error) setError('')
  }

  const handleAdd = (e: FormEvent) => {
    e.preventDefault()
    if (!giverId || !receiverId) return

    if (giverId === receiverId) {
      setError(t.mainPage.errors.selfAssignment)
      return
    }
    if (blockedAssignments.some(b => b.giverId === giverId && b.receiverId === receiverId)) {
      setError(t.mainPage.errors.duplicateBlocked)
      return
    }
    if (preAssignments.some(pa => pa.giverId === giverId && pa.receiverId === receiverId)) {
      setError(t.mainPage.errors.blockedIsPreAssigned)
      return
    }

    onChange([...blockedAssignments, { id: crypto.randomUUID(), giverId, receiverId }])
    setGiverId('')
    setReceiverId('')
    setError('')
  }

  return (
    <div className="mt-8 sm:mt-10 pt-6 sm:pt-8 border-t-2 border-snow-200">
      <h3 className="text-xl sm:text-2xl font-bold text-christmas-green-700 mb-3 sm:mb-4 flex items-center gap-2">
        <span>🚫</span>
        <span>{text.title}</span>
      </h3>
      <p className="text-snow-600 text-base sm:text-lg mb-6 sm:mb-8">{text.description}</p>

      <form onSubmit={handleAdd} className="mb-6 sm:mb-8">
        <div className="flex flex-col lg:flex-row gap-3 sm:gap-4">
          <div className="flex-1">
            <label htmlFor="blocked-giver-select" className="block text-sm sm:text-base font-medium text-christmas-green-700 mb-2">
              {text.giverLabel}
            </label>
            <select
              id="blocked-giver-select"
              value={giverId}
              onChange={(e) => handleSelect('giver', e.target.value)}
              className={selectClass}
            >
              <option value="">{t.mainPage.preAssignments.selectPlaceholder}</option>
              {participants.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>

          <div className="flex-1">
            <label htmlFor="blocked-receiver-select" className="block text-sm sm:text-base font-medium text-christmas-green-700 mb-2">
              {text.receiverLabel}
            </label>
            <select
              id="blocked-receiver-select"
              value={receiverId}
              onChange={(e) => handleSelect('receiver', e.target.value)}
              className={selectClass}
            >
              <option value="">{t.mainPage.preAssignments.selectPlaceholder}</option>
              {participants.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>

          <div className="lg:self-end">
            <button
              type="submit"
              className="w-full lg:w-auto px-6 sm:px-8 py-3 sm:py-3.5 bg-christmas-green-600 text-white font-semibold text-base sm:text-lg rounded-lg hover:bg-christmas-green-700 active:bg-christmas-green-800 transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105 active:scale-100 disabled:bg-snow-300 disabled:cursor-not-allowed disabled:hover:scale-100"
              disabled={!giverId || !receiverId}
            >
              {text.addButton}
            </button>
          </div>
        </div>
        {error && (
          <p className="text-christmas-red-600 text-sm sm:text-base mt-3 animate-slide-in">{error}</p>
        )}
      </form>

      {blockedAssignments.length === 0 ? (
        <div className="text-center py-8 sm:py-10 text-snow-600">
          <p className="text-base sm:text-lg">{text.noBlockedAssignments}</p>
        </div>
      ) : (
        <div>
          <h4 className="text-lg sm:text-xl font-semibold text-christmas-green-700 mb-4 sm:mb-5">
            {text.blockedAssignmentCount} ({blockedAssignments.length})
          </h4>
          <ul className="space-y-2 sm:space-y-3">
            {blockedAssignments.map(b => (
              <li
                key={b.id}
                className="flex items-center justify-between bg-snow-50 rounded-lg px-4 sm:px-5 py-3 sm:py-4 shadow-sm hover:shadow-lg transition-all duration-200 hover:scale-[1.02] animate-slide-in border border-snow-100"
              >
                <span className="font-medium sm:font-semibold text-base sm:text-lg text-christmas-green-800">
                  {nameOf(b.giverId)} ⛔ {nameOf(b.receiverId)}
                </span>
                <button
                  onClick={() => onChange(blockedAssignments.filter(x => x.id !== b.id))}
                  className="text-christmas-red-600 hover:text-christmas-red-700 hover:scale-125 transition-all duration-200 text-xl"
                  aria-label={`Remove avoided pairing: ${nameOf(b.giverId)} to ${nameOf(b.receiverId)}`}
                >
                  ❌
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
