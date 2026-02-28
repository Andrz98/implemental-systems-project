// Las importaciones para este componente son claras, necesitamos un botón y el diseño importado de lucidereact para la X que marca la salida de la card
import { Button, ConnectionDot } from '../../atoms'
import { X } from 'lucide-react'

// La función cuenta con props que llamaremos desde el componente Card.jsx
export default function CardHeader({
  wordCount,
  maxWords,
  isDone,
  onToggleDone,
  onRemove,
  isConnecting,
  isSource,
  connectionCount,
  onConnectionClick,
}) {
  return (
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center gap-2">
        {/* ConnectionDot solo aparece en tarjetas finalizadas */}
        {isDone && (
          <ConnectionDot
            isActive={isConnecting && isDone}
            isSource={isSource}
            connectionCount={connectionCount}
            onClick={onConnectionClick}
          />
        )}
        <span className="text-xs text-surface-400 font-medium tracking-wide uppercase">
          {isDone
            ? `${wordCount} palabra${wordCount !== 1 ? 's' : ''}`
            : `${wordCount}/${maxWords}`
          }
        </span>
      </div>

      <div className="flex items-center gap-1">
        {wordCount > 0 && (
          <Button
            variant={isDone ? 'primary' : 'ghost'}
            size="sm"
            onClick={onToggleDone}
          >
            {isDone ? '✓ Finalizada' : 'Finalizar'}
          </Button>
        )}
        <Button
          variant="danger"
          size="sm"
          onClick={onRemove}
        >
          <X size={14} />
        </Button>
      </div>
    </div>
  )
}