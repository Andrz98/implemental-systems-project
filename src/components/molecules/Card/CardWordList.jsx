// Este componente muestra el listado de palabras que nuestro usuario ha añadido, para eso necesitamos llamar al átomo WordTag
import { WordTag } from '../../atoms'

export default function CardWordList({
  words,
  isDone,
  maxWords,
  onRemoveWord,
}) {
  return (
    <div className="flex flex-wrap gap-1.5 min-h-[32px]">
    {/* Necesito que la función recorra el array de palabras y renderice con un WordTag por cada una.
      si la tarjeta está finalizada, entonces deshabilito la eliminación.
    */}
      {words.map((word, i) => (
        <WordTag
          key={i}
          word={word}
          disabled={isDone}
          onRemove={
            isDone
              ? undefined
              : () => onRemoveWord(i)
          }
        />
      ))}
      {words.length === 0 && !isDone && (
        <span className="text-sm text-surface-300 italic">
          Añade hasta {maxWords} palabras…
        </span>
      )}
    </div>
  )
}