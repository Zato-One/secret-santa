import { useState, FormEvent, useRef, useEffect } from 'react'
import { Layout, LanguageSelector } from '@/components'
import { Participant, PreAssignment } from '@/types'
import { generateAssignments } from '@/utils/assignmentAlgorithm'
import { generateRevealLink } from '@/utils/encryption'
import type { GeneratedLink } from '@/types/assignment'
import { getTranslations, replaceVariables, DEFAULT_LANGUAGE, type LanguageCode } from '@/i18n'

const LANGUAGE_STORAGE_KEY = 'secretSantaLanguage'

function MainPage() {
  const [language, setLanguage] = useState<LanguageCode>(() => {
    const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY)
    return (stored as LanguageCode) || DEFAULT_LANGUAGE
  })

  const [participants, setParticipants] = useState<Participant[]>([])
  const [inputName, setInputName] = useState('')
  const [error, setError] = useState('')
  const [preAssignments, setPreAssignments] = useState<PreAssignment[]>([])
  const [selectedGiverId, setSelectedGiverId] = useState('')
  const [selectedReceiverId, setSelectedReceiverId] = useState('')
  const [preAssignmentError, setPreAssignmentError] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedLinks, setGeneratedLinks] = useState<GeneratedLink[]>([])
  const [generationError, setGenerationError] = useState('')
  const [copiedLinkId, setCopiedLinkId] = useState<string | null>(null)
  const [copiedAll, setCopiedAll] = useState(false)

  const resultsRef = useRef<HTMLElement>(null)
  const t = getTranslations(language)

  useEffect(() => {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, language)
  }, [language])

  useEffect(() => {
    if (generatedLinks.length > 0 && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [generatedLinks.length])

  const handleLanguageChange = (newLanguage: LanguageCode) => {
    setLanguage(newLanguage)
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    const trimmedName = inputName.trim()

    if (!trimmedName) {
      setError(t.mainPage.errors.emptyName)
      return
    }

    if (trimmedName.length > 50) {
      setError(t.mainPage.errors.nameTooLong)
      return
    }

    const isDuplicate = participants.some(
      p => p.name.toLowerCase() === trimmedName.toLowerCase()
    )

    if (isDuplicate) {
      setError(t.mainPage.errors.duplicateName)
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
      setPreAssignmentError(t.mainPage.errors.selfAssignment)
      return
    }

    const duplicateExists = preAssignments.some(
      pa => pa.giverId === selectedGiverId && pa.receiverId === selectedReceiverId
    )
    if (duplicateExists) {
      setPreAssignmentError(t.mainPage.errors.duplicatePreAssignment)
      return
    }

    const giverAlreadyAssigned = preAssignments.some(
      pa => pa.giverId === selectedGiverId
    )
    if (giverAlreadyAssigned) {
      const giverName = getParticipantName(selectedGiverId)
      setPreAssignmentError(replaceVariables(t.mainPage.errors.giverAlreadyAssigned, { name: giverName }))
      return
    }

    const receiverAlreadyAssigned = preAssignments.some(
      pa => pa.receiverId === selectedReceiverId
    )
    if (receiverAlreadyAssigned) {
      const isReciprocalPair = preAssignments.some(
        pa => pa.giverId === selectedReceiverId && pa.receiverId === selectedGiverId
      )
      if (!isReciprocalPair) {
        const receiverName = getParticipantName(selectedReceiverId)
        setPreAssignmentError(replaceVariables(t.mainPage.errors.receiverAlreadyAssigned, { name: receiverName }))
        return
      }
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

  const handleGenerateAssignments = async () => {
    setIsGenerating(true)
    setGenerationError('')
    setGeneratedLinks([])

    try {
      const result = generateAssignments(participants, preAssignments)

      if (!result.success) {
        setGenerationError(result.error || t.mainPage.errors.generationFailed)
        setIsGenerating(false)
        return
      }

      const sortedAssignments = [...result.assignments].sort((a, b) => {
        const indexA = participants.findIndex(p => p.id === a.giverId)
        const indexB = participants.findIndex(p => p.id === b.giverId)
        return indexA - indexB
      })

      const links: GeneratedLink[] = []
      for (const assignment of sortedAssignments) {
        const url = await generateRevealLink(
          assignment.giverName,
          assignment.receiverName,
          language
        )
        links.push({
          participantName: assignment.giverName,
          revealUrl: url,
        })
      }

      setGeneratedLinks(links)
    } catch (err) {
      setGenerationError(t.mainPage.errors.generationFailed)
      console.error('Generation error:', err)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleCopyLink = async (url: string, participantId: string) => {
    try {
      await navigator.clipboard.writeText(url)
      setCopiedLinkId(participantId)
      setTimeout(() => setCopiedLinkId(null), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const handleCopyAllLinks = async () => {
    const formattedText = generatedLinks
      .map((link) => `${link.participantName}: ${link.revealUrl}`)
      .join('\n\n')

    const message = `${t.common.secretSanta}\n\n${formattedText}\n\n${t.mainPage.results.description}`

    try {
      await navigator.clipboard.writeText(message)
      setCopiedAll(true)
      setTimeout(() => setCopiedAll(false), 2000)
    } catch (err) {
      console.error('Failed to copy all:', err)
    }
  }

  return (
    <Layout>
      <div className="p-4 sm:p-6 md:p-8 lg:p-10">
        <div className="max-w-5xl mx-auto">
          <header className="mb-8 sm:mb-10 md:mb-12 lg:mb-16">
            <div className="flex justify-end mb-4">
              <LanguageSelector selectedLanguage={language} onLanguageChange={handleLanguageChange} />
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-christmas-red-600 text-center mb-4 sm:mb-6 leading-tight">
              🎅 {t.mainPage.title} 🎄
            </h1>
            <p className="text-center text-christmas-green-700 text-lg sm:text-xl md:text-2xl mb-3 sm:mb-4 font-medium">
              {t.mainPage.subtitle}
            </p>
            <div className="text-center text-2xl sm:text-3xl space-x-2 sm:space-x-3">
              <span>❄️</span>
              <span>🎁</span>
              <span>⭐</span>
              <span>🎁</span>
              <span>❄️</span>
            </div>
          </header>

          <section className="mb-6 sm:mb-8">
            <div className="bg-white rounded-xl shadow-xl p-6 sm:p-8 lg:p-10 border border-snow-200">
              <h2 className="text-2xl sm:text-3xl font-bold text-christmas-green-700 mb-6 sm:mb-8 flex items-center gap-2">
                <span>👥</span>
                <span>{t.mainPage.addParticipants.title}</span>
              </h2>

              <form onSubmit={handleSubmit} className="mb-6 sm:mb-8">
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <div className="flex-1">
                    <label htmlFor="participant-name" className="sr-only">
                      {t.mainPage.addParticipants.inputPlaceholder}
                    </label>
                    <input
                      id="participant-name"
                      type="text"
                      value={inputName}
                      onChange={(e) => handleInputChange(e.target.value)}
                      placeholder={t.mainPage.addParticipants.inputPlaceholder}
                      className="w-full px-4 py-3 sm:py-3.5 text-base sm:text-lg border-2 border-snow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-christmas-green-500 focus:border-transparent transition-all duration-200"
                    />
                    {error && (
                      <p className="text-christmas-red-600 text-sm sm:text-base mt-2 animate-slide-in">
                        {error}
                      </p>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="px-6 sm:px-8 py-3 sm:py-3.5 bg-christmas-green-600 text-white font-semibold text-base sm:text-lg rounded-lg hover:bg-christmas-green-700 active:bg-christmas-green-800 transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105 active:scale-100"
                  >
                    {t.mainPage.addParticipants.addButton}
                  </button>
                </div>
              </form>

              {participants.length === 0 ? (
                <div className="text-center py-10 sm:py-12 text-snow-600">
                  <p className="text-lg sm:text-xl">{t.mainPage.addParticipants.noParticipants}</p>
                  <p className="text-sm sm:text-base mt-2">{t.mainPage.addParticipants.noParticipantsHint}</p>
                </div>
              ) : (
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-christmas-green-700 mb-4 sm:mb-5">
                    {t.mainPage.addParticipants.participantCount} ({participants.length})
                  </h3>
                  <ul className="space-y-2 sm:space-y-3">
                    {participants.map((participant) => (
                      <li
                        key={participant.id}
                        className="flex items-center justify-between bg-snow-50 rounded-lg px-4 sm:px-5 py-3 sm:py-4 shadow-sm hover:shadow-lg transition-all duration-200 hover:scale-[1.02] animate-slide-in border border-snow-100"
                      >
                        <span className="font-medium sm:font-semibold text-base sm:text-lg text-christmas-green-800 flex items-center gap-2">
                          {participant.name}
                          {isParticipantPreAssigned(participant.id) && (
                            <span className="text-xs sm:text-sm bg-christmas-gold-500 text-white px-2 py-0.5 sm:py-1 rounded-full" title="Has pre-assignment">
                              {t.mainPage.addParticipants.preAssignedBadge}
                            </span>
                          )}
                        </span>
                        <button
                          onClick={() => handleRemove(participant.id)}
                          className="text-christmas-red-600 hover:text-christmas-red-700 hover:scale-125 transition-all duration-200 text-xl"
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
            <section className="mb-6 sm:mb-8">
              <div className="bg-white rounded-xl shadow-xl p-6 sm:p-8 lg:p-10 border border-snow-200">
                <h2 className="text-2xl sm:text-3xl font-bold text-christmas-green-700 mb-4 sm:mb-6 flex items-center gap-2">
                  <span>🎯</span>
                  <span>{t.mainPage.preAssignments.title}</span>
                </h2>
                <p className="text-snow-600 text-base sm:text-lg mb-6 sm:mb-8">
                  {t.mainPage.preAssignments.description}
                </p>

                <form onSubmit={handleAddPreAssignment} className="mb-6 sm:mb-8">
                  <div className="flex flex-col lg:flex-row gap-3 sm:gap-4">
                    <div className="flex-1">
                      <label htmlFor="giver-select" className="block text-sm sm:text-base font-medium text-christmas-green-700 mb-2">
                        {t.mainPage.preAssignments.giverLabel}
                      </label>
                      <select
                        id="giver-select"
                        value={selectedGiverId}
                        onChange={(e) => handlePreAssignmentSelectionChange('giver', e.target.value)}
                        className="w-full px-4 py-3 sm:py-3.5 text-base sm:text-lg border-2 border-snow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-christmas-green-500 focus:border-transparent transition-all duration-200"
                      >
                        <option value="">{t.mainPage.preAssignments.selectPlaceholder}</option>
                        {participants.map((participant) => (
                          <option key={participant.id} value={participant.id}>
                            {participant.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="flex-1">
                      <label htmlFor="receiver-select" className="block text-sm sm:text-base font-medium text-christmas-green-700 mb-2">
                        {t.mainPage.preAssignments.receiverLabel}
                      </label>
                      <select
                        id="receiver-select"
                        value={selectedReceiverId}
                        onChange={(e) => handlePreAssignmentSelectionChange('receiver', e.target.value)}
                        className="w-full px-4 py-3 sm:py-3.5 text-base sm:text-lg border-2 border-snow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-christmas-green-500 focus:border-transparent transition-all duration-200"
                      >
                        <option value="">{t.mainPage.preAssignments.selectPlaceholder}</option>
                        {participants.map((participant) => (
                          <option key={participant.id} value={participant.id}>
                            {participant.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="lg:self-end">
                      <button
                        type="submit"
                        className="w-full lg:w-auto px-6 sm:px-8 py-3 sm:py-3.5 bg-christmas-green-600 text-white font-semibold text-base sm:text-lg rounded-lg hover:bg-christmas-green-700 active:bg-christmas-green-800 transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105 active:scale-100 disabled:bg-snow-300 disabled:cursor-not-allowed disabled:hover:scale-100"
                        disabled={!selectedGiverId || !selectedReceiverId}
                      >
                        {t.mainPage.preAssignments.addButton}
                      </button>
                    </div>
                  </div>
                  {preAssignmentError && (
                    <p className="text-christmas-red-600 text-sm sm:text-base mt-3 animate-slide-in">
                      {preAssignmentError}
                    </p>
                  )}
                </form>

                {preAssignments.length === 0 ? (
                  <div className="text-center py-8 sm:py-10 text-snow-600">
                    <p className="text-base sm:text-lg">{t.mainPage.preAssignments.noPreAssignments}</p>
                  </div>
                ) : (
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold text-christmas-green-700 mb-4 sm:mb-5">
                      {t.mainPage.preAssignments.preAssignmentCount} ({preAssignments.length})
                    </h3>
                    <ul className="space-y-2 sm:space-y-3">
                      {preAssignments.map((preAssignment) => (
                        <li
                          key={preAssignment.id}
                          className="flex items-center justify-between bg-snow-50 rounded-lg px-4 sm:px-5 py-3 sm:py-4 shadow-sm hover:shadow-lg transition-all duration-200 hover:scale-[1.02] animate-slide-in border border-snow-100"
                        >
                          <span className="font-medium sm:font-semibold text-base sm:text-lg text-christmas-green-800">
                            {getParticipantName(preAssignment.giverId)} → {getParticipantName(preAssignment.receiverId)}
                          </span>
                          <button
                            onClick={() => handleRemovePreAssignment(preAssignment.id)}
                            className="text-christmas-red-600 hover:text-christmas-red-700 hover:scale-125 transition-all duration-200 text-xl"
                            aria-label={`Remove pre-assignment: ${getParticipantName(preAssignment.giverId)} to ${getParticipantName(preAssignment.receiverId)}`}
                          >
                            ❌
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="mt-8 sm:mt-10 pt-6 sm:pt-8 border-t-2 border-snow-200">
                  <button
                    onClick={handleGenerateAssignments}
                    className="w-full px-8 sm:px-10 py-4 sm:py-5 bg-christmas-gold-500 text-white font-bold text-lg sm:text-xl rounded-xl hover:bg-christmas-gold-600 active:bg-christmas-gold-700 transition-all duration-200 shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-100 disabled:bg-snow-300 disabled:cursor-not-allowed disabled:text-snow-500 disabled:hover:scale-100"
                    disabled={participants.length < 3 || isGenerating}
                  >
                    {isGenerating ? (
                      <span className="flex items-center justify-center gap-3">
                        <span className="animate-spin text-2xl">🎄</span>
                        <span>{t.mainPage.generate.buttonGenerating}</span>
                      </span>
                    ) : participants.length < 3 ? (
                      replaceVariables(t.mainPage.generate.buttonNeedMore, { count: participants.length.toString() })
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        <span>🎅</span>
                        <span>{t.mainPage.generate.button}</span>
                      </span>
                    )}
                  </button>
                  {generationError && (
                    <p className="text-christmas-red-600 text-center mt-4 sm:mt-5 font-medium text-base sm:text-lg animate-slide-in">
                      {generationError}
                    </p>
                  )}
                </div>
              </div>
            </section>
          )}

          {generatedLinks.length > 0 && (
            <section ref={resultsRef} className="mb-8 sm:mb-10 animate-fade-in">
              <div className="bg-white rounded-xl shadow-xl p-6 sm:p-8 lg:p-10 border-2 border-christmas-gold-200">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-christmas-green-700 mb-4 sm:mb-6 text-center">
                  {t.mainPage.results.title}
                </h2>
                <p className="text-center text-snow-600 text-base sm:text-lg mb-6 sm:mb-8">
                  {t.mainPage.results.description}
                </p>

                <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                  {generatedLinks.map((link, index) => (
                    <div
                      key={index}
                      className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-gradient-to-r from-snow-50 to-christmas-green-50 rounded-xl p-4 sm:p-5 shadow-md hover:shadow-xl transition-all duration-200 hover:scale-[1.01] gap-3 border border-snow-200"
                    >
                      <div className="flex-1 min-w-0 w-full">
                        <p className="font-bold sm:font-extrabold text-lg sm:text-xl text-christmas-green-800 mb-2">
                          {link.participantName}
                        </p>
                        <p className="text-xs sm:text-sm text-snow-600 break-all font-mono bg-white px-2 py-1 rounded">
                          {link.revealUrl}
                        </p>
                      </div>
                      <div className="flex gap-2 sm:gap-3 w-full sm:w-auto">
                        <button
                          onClick={() => handleCopyLink(link.revealUrl, link.participantName)}
                          className="flex items-center justify-center gap-2 px-3 sm:px-5 md:px-6 py-2.5 sm:py-3 bg-christmas-green-600 text-white font-semibold rounded-lg hover:bg-christmas-green-700 transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105 active:scale-100 text-xs sm:text-sm md:text-base flex-1 sm:flex-none sm:whitespace-nowrap"
                          aria-label={`Copy link for ${link.participantName}`}
                        >
                          {copiedLinkId === link.participantName ? (
                            <>
                              <span className="text-lg">✓</span>
                              <span>{t.mainPage.results.copied}</span>
                            </>
                          ) : (
                            <>
                              <span>📋</span>
                              <span>{t.mainPage.results.copyLink}</span>
                            </>
                          )}
                        </button>
                        <button
                          onClick={() => window.open(link.revealUrl, '_blank')}
                          className="flex items-center justify-center gap-2 px-3 sm:px-5 md:px-6 py-2.5 sm:py-3 bg-christmas-red-600 text-white font-semibold rounded-lg hover:bg-christmas-red-700 transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105 active:scale-100 text-xs sm:text-sm md:text-base flex-1 sm:flex-none sm:whitespace-nowrap"
                          aria-label={`Open link for ${link.participantName}`}
                        >
                          <span>🎁</span>
                          <span>{t.mainPage.results.open}</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-6 sm:pt-8 border-t-2 border-snow-200">
                  <button
                    onClick={handleCopyAllLinks}
                    className="w-full px-8 sm:px-10 py-4 sm:py-5 bg-christmas-red-600 text-white font-bold text-lg sm:text-xl rounded-xl hover:bg-christmas-red-700 active:bg-christmas-red-800 transition-all duration-200 shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-100"
                  >
                    {copiedAll ? (
                      <span className="flex items-center justify-center gap-3">
                        <span className="text-2xl">✓</span>
                        <span>{t.mainPage.results.copiedAll}</span>
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-3">
                        <span>📋</span>
                        <span>{t.mainPage.results.copyAll}</span>
                      </span>
                    )}
                  </button>
                  <p className="text-center text-sm sm:text-base text-snow-600 mt-3 sm:mt-4">
                    {copiedAll ? t.mainPage.results.copiedAllMessage : t.mainPage.results.copyAllHint}
                  </p>
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
