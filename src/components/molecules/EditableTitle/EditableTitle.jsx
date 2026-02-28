// El patrón que voy a seguir aquí es inline editing para poder mostrar el nombre del grupo que tenemos dentro de una tarjeta, para ello, me he inspirado en Trello.

// Este componente es más inteligente que los átomos, y es por ese motivo que debo utilizar los Hooks de React.
import { useState, useRef, useEffect } from 'react'

export default function EditableTitle({ value, onChange }) {
  // Definición de constantes
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(value)
  const inputRef = useRef(null)

  // En este hook, cada vez que editing sea true, selecciona todo el texto del input
  useEffect(() => {
    if (editing) {
      inputRef.current?.select()
    }
  }, [editing])

  // Aquí, necesitamos una función que nos permita añadir un texto distinto al original con onChange y que si no se produce ningún cambio, entonces se quede como estaba. Además, queremos que la función se dispare cuando el usuario de a enter o pulse fuera del input.
  const commit = () => {
    const trimmed = draft.trim()
    if (trimmed && trimmed !== value) {
      onChange(trimmed)
    } else {
      setDraft(value)
    }
    setEditing(false)
  }

  // Puesto que el componente es pequeño y manejable, los estilos los voy a trabajar dentro de este mismo archivo sin hacer modulaciones.
  // En casos donde el componente fuera más grande, entonces lo modularía en un archivo EditableTitle.styles.js
  return editing ? (
    <input
      ref={inputRef}
      value={draft}
      onChange={(e) => setDraft(e.target.value)}
      onBlur={commit}
      onKeyDown={(e) => {
        if (e.key === 'Enter') commit()
        if (e.key === 'Escape') {
          setDraft(value)
          setEditing(false)
        }
      }}
      className="
        font-bold text-lg
        bg-transparent border-b-2 border-indigo-300
        text-gray-800 outline-none
        px-0 py-0 w-full
      "
      maxLength={40}
    />
  ) : (
    <h2
      onClick={() => setEditing(true)}
      className="
        font-bold text-lg text-gray-800
        cursor-text hover:text-indigo-500
        transition-colors truncate
      "
      title="Clic para editar"
    >
      {value}
    </h2>
  )
}