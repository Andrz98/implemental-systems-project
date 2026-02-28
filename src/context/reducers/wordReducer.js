import { ACTIONS } from '../BoardContext'

// ========================================
// Acciones que se producen en las palabras
// ========================================

// En las acciones que podemos realizar en con las palabras, tenemos que pasar por Groups -> Cards y finalmente -> Words
// Aquí añadimos una capa de seguridad, validando que sean 5 el número total de palabras que se pueden añadir dentro de una misma tarjeta.

export function wordReducer(state, action) {
  switch (action.type) {

    case ACTIONS.ADD_WORD: {
      const { groupId, cardId, word } = action.payload
      return {
        ...state,
        groups: state.groups.map(g =>
          g.id === groupId
            ? {
                ...g,
                cards: g.cards.map(c =>
                  c.id === cardId && c.words.length < 5
                    ? { ...c, words: [...c.words, word.trim()] }
                    : c
                ),
              }
            : g
        ),
      }
    }

    case ACTIONS.REMOVE_WORD: {
      const { groupId, cardId, wordIndex } = action.payload
      return {
        ...state,
        groups: state.groups.map(g =>
          g.id === groupId
            ? {
                ...g,
                cards: g.cards.map(c =>
                  c.id === cardId
                    ? { ...c, words: c.words.filter((_, i) => i !== wordIndex) }
                    : c
                ),
              }
            : g
        ),
      }
    }

    default:
      return state
  }
}