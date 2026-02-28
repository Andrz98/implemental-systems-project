// Este archivo nos permite exponer el estado y las funciones que los componentes usarán.
// Los imports necesitan los hooks de react useReducer y useCallback y
// la caja central (BoardContext), el diccionario de acciones (ACTIONS), el estado inicial (initialState) y el cerebro de acciones (boardReducer)
import { useReducer, useCallback } from 'react'
import { BoardContext, ACTIONS, initialState, boardReducer } from './BoardContext'

// Necesitamos el componente Provider donde irán las funciones helper que envuelven el dispatch
export default function BoardProvider({ children }) {

  const [state, dispatch] = useReducer(boardReducer, initialState)

  const addGroup = useCallback((name) => {
    dispatch({ type: ACTIONS.ADD_GROUP, payload: { name } })
  }, [])

  const removeGroup = useCallback((groupId) => {
    dispatch({ type: ACTIONS.REMOVE_GROUP, payload: groupId })
  }, [])

  const renameGroup = useCallback((groupId, name) => {
    dispatch({ type: ACTIONS.RENAME_GROUP, payload: { groupId, name } })
  }, [])

  const addCard = useCallback((groupId) => {
    dispatch({ type: ACTIONS.ADD_CARD, payload: { groupId } })
  }, [])

  const removeCard = useCallback((groupId, cardId) => {
    dispatch({ type: ACTIONS.REMOVE_CARD, payload: { groupId, cardId } })
  }, [])

  const addWord = useCallback((groupId, cardId, word) => {
    dispatch({ type: ACTIONS.ADD_WORD, payload: { groupId, cardId, word } })
  }, [])

  const removeWord = useCallback((groupId, cardId, wordIndex) => {
    dispatch({ type: ACTIONS.REMOVE_WORD, payload: { groupId, cardId, wordIndex } })
  }, [])

  const toggleCardDone = useCallback((groupId, cardId) => {
    dispatch({ type: ACTIONS.TOGGLE_CARD_DONE, payload: { groupId, cardId } })
  }, [])

  const value = {
    ...state,
    addGroup,
    removeGroup,
    renameGroup,
    addCard,
    removeCard,
    addWord,
    removeWord,
    toggleCardDone,
  }

  return (
    <BoardContext.Provider value={value}>
      {children}
    </BoardContext.Provider>
  )
}