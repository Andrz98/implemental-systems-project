import { groupReducer } from './groupReducer'
import { cardReducer } from './cardReducer'
import { wordReducer } from './wordReducer'
import { connectionReducer } from './connectionReducer'

// Aquí ensamblamos los cuatro reducers de dominio (grupos, tarjetas, palabras y conexiones)
// en un único boardReducer. Este recibirá dos cosas:
// 1. Estado actual
// 2. Una acción (qué es exactamente lo que quiere hacer el usuario)
// Cada reducer evalúa action.type con un switch y ejecuta la acción si le corresponde.

export function boardReducer(state, action) {
  let newState = groupReducer(state, action)
  if (newState !== state) return newState

  newState = cardReducer(state, action)
  if (newState !== state) return newState

  newState = wordReducer(state, action)
  if (newState !== state) return newState

  newState = connectionReducer(state, action)
  if (newState !== state) return newState

  return state
}