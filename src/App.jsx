import { useState } from 'react'
import { Button, Input, WordTag } from './components/atoms'
import { EditableTitle } from './components/molecules'

export default function App() {
  const [title, setTitle] = useState('Mi primer grupo')
  const [words, setWords] = useState(['perro', 'gato'])
  const [inputValue, setInputValue] = useState('')

  const addWord = () => {
    const trimmed = inputValue.trim()
    if (!trimmed || words.length >= 5) return
    setWords([...words, trimmed])
    setInputValue('')
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-2xl font-bold mb-8">Prueba de componentes</h1>

      {/* Prueba de átomos */}
      <section className="mb-8">
        <h2 className="text-lg font-bold mb-4">Átomos</h2>
        <div className="flex gap-2 mb-4">
          <Button variant="primary" size="sm">Primary</Button>
          <Button variant="secondary" size="sm">Secondary</Button>
          <Button variant="ghost" size="sm">Ghost</Button>
          <Button variant="danger" size="sm">Danger</Button>
        </div>
        <div className="flex gap-2 mb-4">
          {words.map((w, i) => (
            <WordTag
              key={i}
              word={w}
              onRemove={() => setWords(words.filter((_, idx) => idx !== i))}
            />
          ))}
        </div>
        <div className="max-w-xs">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') addWord() }}
            placeholder="Escribe una palabra…"
          />
        </div>
      </section>

      {/* Prueba de molécula EditableTitle */}
      <section className="mb-8">
        <h2 className="text-lg font-bold mb-4">EditableTitle</h2>
        <div className="max-w-xs bg-gray-100 rounded-xl p-4">
          <EditableTitle
            value={title}
            onChange={(newTitle) => setTitle(newTitle)}
          />
        </div>
      </section>
    </div>
  )
}