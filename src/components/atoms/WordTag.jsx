// La intención de este componente, es permitir que el usuario escriba una palabra y opcionalmente la elimine se así lo desea.
// Además voy a utilziar la biblioteca de LucideRact para la X de eliminación
import { X } from 'lucide-react'

export default function WordTag({ word, onRemove, disabled = false }) {
  return (
    <span
      className={`
        inline-flex items-center gap-1
        px-2.5 py-1 rounded-md text-sm
        bg-accent-muted text-accent-dark font-medium
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
            text-accent/50 hover:text-accent hover:bg-accent/10
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