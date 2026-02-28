// Se importan hooks de reack y aquí importamos los átomos que creamos anteriormente
import { useState, useRef } from 'react'
import { Button, Input, WordTag } from '../atoms'

// Defino constante de valor, para el número máximo de palabras que se pueden añadir a la tarjeta.
const MAX_WORDS = 5

// Defino cards con props y funciones que llamaré desde el contexto global para mantener la molécula desacoplada.
export default function Card({ card, groupId, onAddWord, onRemove, onRemoveCard, onToggleDone }) {
  const [inputValue, setInputValue] = useState('')
  const inputRef = useRef(null)
  const isFull = card.words.length >= MAX_WORDS // lo utilizo para calcular y evaluar si en el componente ya hay 5 palabras, utilziando la propiedad nativa .lenght de JavaScript

  // Necesito una constante que se salga de la función en 3 casos distintos: Texto vacío (!trimmed), (isFull), (card.done)
  const handleAddWord = () => {
    const trimmed = inputValue.trim()
    if (!trimmed || isFull || card.done) return
    onAddWord(groupId, card.id, trimmed)
    setInputValue('')
    inputRef.current?.focus()
  }

  // En esta función detectamos cuando el usuario pulsa Enter en el input.
  // Si es Enter, prevenimos el comportamiento nativo del navegador de recargar la página y llamamos a handleAddWord para añadir la palabra.
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAddWord()
    }
  }
}
