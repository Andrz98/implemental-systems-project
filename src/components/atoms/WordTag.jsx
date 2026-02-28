// La intención de este componente, es permitir que el usuario escriba una palabra y opcionalmente la elimine se así lo desea.
// Además voy a utilziar la biblioteca de LucideRact para la X de eliminación
import { X } from 'lucide-react'

export default function WordTag({ word, onRemove, disabled = false }) {
  return (
    <span
      className={`
        inline-flex items-center gap-1
        px-2.5 py-1 rounded-md text-sm
        bg-indigo-100 text-indigo-700 font-medium
        ${disabled ? 'opacity-60' : ''}
      `}
    >
      {word}
      {!disabled && onRemove && (
        <button
          onClick={onRemove}
          className="
            ml-0.5 w-4 h-4 rounded-full
            flex items-center justify-center
            text-indigo-400 hover:text-indigo-600 hover:bg-indigo-200/50
            transition-colors cursor-pointer
          "
          aria-label={`Eliminar "${word}"`}
        >
          <X size={12} />
        </button>
      )}
    </span>
  )
}