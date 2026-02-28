// Se importan hooks de reack y aquí importamos los átomos que creamos anteriormente
import { useState } from 'react'
import useBoard from '../../../context/useBoard'
import CardHeader from './CardHeader'
import CardWordList from './CardWordList'
import CardInput from './CardInput'

// Defino constante de valor, para el número máximo de palabras que se pueden añadir a la tarjeta.
const MAX_WORDS = 5

// Defino cards con props y funciones que llamaré desde el contexto global para mantener la molécula desacoplada.
export default function Card({ card, groupId }) {
  const { addWord, removeWord, removeCard, toggleCardDone } = useBoard()
  const [inputValue, setInputValue] = useState('')
  const isFull = card.words.length >= MAX_WORDS // lo utilizo para calcular y evaluar si en el componente ya hay 5 palabras, utilziando la propiedad nativa .lenght de JavaScript

  // Necesito una constante que se salga de la función en 3 casos distintos: Texto vacío (!trimmed), (isFull), (card.done)
  const handleAddWord = () => {
    const trimmed = inputValue.trim()
    if (!trimmed || isFull || card.done) return
    addWord(groupId, card.id, trimmed)
    setInputValue('')
  }

  return (
    <div
      data-card-id={card.id}
      className={`
        relative bg-white rounded-xl p-4
        shadow-card hover:shadow-card-hover
        transition-all duration-200
        ${card.done ? 'ring-1 ring-accent/20' : ''}
      `}
    >
      {/* En la cabecera, se muestra el contenedor de palabras y los botones de acción y pasamos nuestras props primitivas */}
      <CardHeader
        wordCount={card.words.length}
        maxWords={MAX_WORDS}
        isDone={card.done}
        onToggleDone={() => toggleCardDone(groupId, card.id)}
        onRemove={() => removeCard(groupId, card.id)}
      />

      {/* En este apartado, se encuentra la lista de palabras que se renderiza como un WordTag.
          onRemoveWord recibe solo el índice porque Card.jsx ya inserta groupId y card.id
          en la función que pasa al hijo. */}
      <CardWordList
        words={card.words}
        isDone={card.done}
        maxWords={MAX_WORDS}
        onRemoveWord={(index) => removeWord(groupId, card.id, index)}
      />

      {/* En este apartado, el Input solo se renderiza si la tarjeta no está finalizada
          y no ha alcanzado el límite de palabras. */}
      {!card.done && !isFull && (
        <CardInput
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onAdd={handleAddWord}
          disabled={!inputValue.trim()}
        />
      )}
    </div>
  )
}