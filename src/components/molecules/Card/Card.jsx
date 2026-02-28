// Se importan hooks de reack y aquí importamos los átomos que creamos anteriormente
import { useState } from 'react'
import CardHeader from './CardHeader'
import CardWordList from './CardWordList'
import CardInput from './CardInput'

// Defino constante de valor, para el número máximo de palabras que se pueden añadir a la tarjeta.
const MAX_WORDS = 5

// Defino cards con props y funciones que llamaré desde el contexto global para mantener la molécula desacoplada.
export default function Card({ card, groupId, onAddWord, onRemoveWord, onRemoveCard, onToggleDone }) {
  const [inputValue, setInputValue] = useState('')
  const isFull = card.words.length >= MAX_WORDS // lo utilizo para calcular y evaluar si en el componente ya hay 5 palabras, utilziando la propiedad nativa .lenght de JavaScript

  // Necesito una constante que se salga de la función en 3 casos distintos: Texto vacío (!trimmed), (isFull), (card.done)
  const handleAddWord = () => {
    const trimmed = inputValue.trim()
    if (!trimmed || isFull || card.done) return
    onAddWord(groupId, card.id, trimmed)
    setInputValue('')
  }

  