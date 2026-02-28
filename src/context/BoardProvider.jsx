// Este archivo nos permite exponer el estado y las funciones que los componentes usarán.
// Los imports necesitan los hooks de react useReducer y useCallback y
// la caja central (BoardContext), el diccionario de acciones (ACTIONS) y el estado inicial (initialState)
import { useReducer, useCallback } from 'react'
import { BoardContext, ACTIONS, initialState } from './BoardContext'
import { boardReducer } from './reducers'

// Necesitamos el componente Provider donde irán las funciones helper que envuelven el dispatch
export default function BoardProvider({ children }) {

  const [state, dispatch] = useReducer(boardReducer, initialState)

  // ========================================
  // Helpers de grupos
  // ========================================

  const addGroup = useCallback((name) => {
    dispatch({ type: ACTIONS.ADD_GROUP, payload: { name } })
  }, [])

  const removeGroup = useCallback((groupId) => {
    dispatch({ type: ACTIONS.REMOVE_GROUP, payload: groupId })
  }, [])

  const renameGroup = useCallback((groupId, name) => {
    dispatch({ type: ACTIONS.RENAME_GROUP, payload: { groupId, name } })
  }, [])

  // ========================================
  // Helpers de tarjetas
  // ========================================

  const addCard = useCallback((groupId) => {
    dispatch({ type: ACTIONS.ADD_CARD, payload: { groupId } })
  }, [])

  const removeCard = useCallback((groupId, cardId) => {
    dispatch({ type: ACTIONS.REMOVE_CARD, payload: { groupId, cardId } })
  }, [])

  const toggleCardDone = useCallback((groupId, cardId) => {
    dispatch({ type: ACTIONS.TOGGLE_CARD_DONE, payload: { groupId, cardId } })
  }, [])

  // ========================================
  // Helpers de palabras
  // ========================================

  const addWord = useCallback((groupId, cardId, word) => {
    dispatch({ type: ACTIONS.ADD_WORD, payload: { groupId, cardId, word } })
  }, [])

  const removeWord = useCallback((groupId, cardId, wordIndex) => {
    dispatch({ type: ACTIONS.REMOVE_WORD, payload: { groupId, cardId, wordIndex } })
  }, [])

  // ========================================
  // Helpers de conexiones
  // ========================================

  const startConnection = useCallback((cardId) => {
    dispatch({ type: ACTIONS.START_CONNECTION, payload: cardId })
  }, [])

  const finishConnection = useCallback((cardId) => {
    dispatch({ type: ACTIONS.FINISH_CONNECTION, payload: cardId })
  }, [])

  const cancelConnection = useCallback(() => {
    dispatch({ type: ACTIONS.CANCEL_CONNECTION })
  }, [])

  const removeConnection = useCallback((connectionId) => {
    dispatch({ type: ACTIONS.REMOVE_CONNECTION, payload: connectionId })
  }, [])

  const value = {
    ...state,
    addGroup,
    removeGroup,
    renameGroup,
    addCard,
    removeCard,
    toggleCardDone,
    addWord,
    removeWord,
    startConnection,
    finishConnection,
    cancelConnection,
    removeConnection,
  }

  return (
    <BoardContext.Provider value={value}>
      {children}
    </BoardContext.Provider>
  )
}