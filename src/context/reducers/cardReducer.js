import { generateId } from '../../utils/generateId'
import { ACTIONS } from '../BoardContext'

// ========================================
// Acciones que se producen en las tarjetas
// ========================================

// En los casos de cards, siempre seguiremos una lógica parecida a la que se seguía en groups.
// Se identifica el id, si es ese, entonces se copia el grupo, se recorren las tarjetas, si es la tarjeta, entonces se hacen los cambios, si no se queda igual.
// Si no es la tarjeta, entonces todo el grupo se queda igual.

export function cardReducer(state, action) {
  switch (action.type) {

    case ACTIONS.ADD_CARD: {
      const { groupId } = action.payload
      const newCard = {
        id: generateId('card'),
        words: [],
        done: false,
      }
      return {
        ...state,
        groups: state.groups.map(g =>
          g.id === groupId
            ? { ...g, cards: [...g.cards, newCard] }
            : g
        ),
      }
    }

    case ACTIONS.REMOVE_CARD: {
      const { groupId, cardId } = action.payload
      return {
        ...state,
        groups: state.groups.map(g =>
          g.id === groupId
            ? { ...g, cards: g.cards.filter(c => c.id !== cardId) }
            : g
        ),
        // Al eliminar una tarjeta, eliminamos sus conexiones
        connections: state.connections.filter(
          c => c.fromCardId !== cardId && c.toCardId !== cardId
        ),
        connectingFrom: state.connectingFrom === cardId ? null : state.connectingFrom,
      }
    }

    case ACTIONS.TOGGLE_CARD_DONE: {
      const { groupId, cardId } = action.payload
      return {
        ...state,
        groups: state.groups.map(g =>
          g.id === groupId
            ? {
                ...g,
                cards: g.cards.map(c =>
                  c.id === cardId ? { ...c, done: !c.done } : c
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