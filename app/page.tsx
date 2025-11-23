'use client';

import { useState } from 'react';
import { Participant } from '@/types';

export default function Home() {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [inputName, setInputName] = useState('');
  const [error, setError] = useState('');

  const addParticipant = () => {
    const trimmedName = inputName.trim();

    if (!trimmedName) {
      setError('Name cannot be empty');
      return;
    }

    if (participants.some(p => p.name.toLowerCase() === trimmedName.toLowerCase())) {
      setError('This name is already in the list');
      return;
    }

    const newParticipant: Participant = {
      id: crypto.randomUUID(),
      name: trimmedName,
    };

    setParticipants([...participants, newParticipant]);
    setInputName('');
    setError('');
  };

  const removeParticipant = (id: string) => {
    setParticipants(participants.filter(p => p.id !== id));
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addParticipant();
    }
  };

  const isValidGroup = participants.length >= 3;

  return (
    <div className="max-w-2xl mx-auto">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Secret Santa Generator</h1>
        <p className="text-gray-600 mb-2">
          Create encrypted Secret Santa assignments for your group.
        </p>
        <p className="text-sm text-gray-500">
          Add participants, generate secure links, and share them privately. Each person will receive a unique link to reveal their Secret Santa assignment.
        </p>
      </header>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Add Participants</h2>

        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={inputName}
            onChange={(e) => setInputName(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter participant name"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={addParticipant}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add
          </button>
        </div>

        {error && (
          <p className="text-red-600 text-sm mb-4">{error}</p>
        )}

        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-2">
            Participants: {participants.length} {!isValidGroup && '(minimum 3 required)'}
          </p>
          {!isValidGroup && participants.length > 0 && (
            <p className="text-amber-600 text-sm">
              You need at least 3 participants to generate assignments.
            </p>
          )}
        </div>

        {participants.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            No participants yet. Add some names to get started!
          </div>
        ) : (
          <ul className="space-y-2">
            {participants.map((participant) => (
              <li
                key={participant.id}
                className="flex items-center justify-between px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <span className="font-medium">{participant.name}</span>
                <button
                  onClick={() => removeParticipant(participant.id)}
                  className="text-red-600 hover:text-red-700 font-semibold"
                  aria-label={`Remove ${participant.name}`}
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
