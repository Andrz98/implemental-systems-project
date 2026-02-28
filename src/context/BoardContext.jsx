// En el contexto global, necesito importar hooks de React:
// createContext y useContext para crear y consumir el contexto,
// useReducer para gestionar estado complejo,
// y useCallback para memorizar funciones y evitar renders innecesarios.
// También necesito importar el generador de IDs únicos.
import { createContext } from 'react'

// Creo el contexto con valor inicial null. Siendo esta la caja central
// a la que cualquier componente del proyecto podrá conectarse
// para acceder al estado y las funciones.
const BoardContext = createContext(null)

// Preparo un diccionario de acciones, cada una representa una operación que puede ocurrir dentro de la app.
// JavaScript debería avisarnos si se escribe mal un nombre
const ACTIONS = {
  ADD_GROUP: 'ADD_GROUP',
  REMOVE_GROUP: 'REMOVE_GROUP',
  RENAME_GROUP: 'RENAME_GROUP',
  ADD_CARD: 'ADD_CARD',
  REMOVE_CARD: 'REMOVE_CARD',
  ADD_WORD: 'ADD_WORD',
  REMOVE_WORD: 'REMOVE_WORD',
  TOGGLE_CARD_DONE: 'TOGGLE_CARD_DONE',
  START_CONNECTION: 'START_CONNECTION',
  FINISH_CONNECTION: 'FINISH_CONNECTION',
  CANCEL_CONNECTION: 'CANCEL_CONNECTION',
  REMOVE_CONNECTION: 'REMOVE_CONNECTION',
}

// Mi app inicia vacía y en esta misma constante preparo la fase de conexiones que implementaré.
// connectingFrom guarda el ID de la tarjeta que inició la conexión.
const initialState = {
  groups: [],
  connections: [],
  connectingFrom: null,
}

export { BoardContext, ACTIONS, initialState }