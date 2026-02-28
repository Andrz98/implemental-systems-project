import { generateId } from '../../utils/generateId'
import { ACTIONS } from '../BoardContext'

// ====================================
// Acciones que se producen en el grupo
// ====================================

export function groupReducer(state, action) {
  switch (action.type) {

    case ACTIONS.ADD_GROUP: {
      const newGroup = {
        id: generateId('group'),
        name: action.payload?.name || `Grupo ${state.groups.length + 1}`,
        cards: [],
      }
      return {...state, groups: [...state.groups, newGroup]}
    }

    case ACTIONS.REMOVE_GROUP: {
      const group = state.groups.find(g => g.id === action.payload)
      const cardIds = group ? group.cards.map(c => c.id) : []
      return {
        ...state,
        groups: state.groups.filter(g => g.id !== action.payload),
        // Al eliminar un grupo, eliminamos también las conexiones de sus tarjetas
        connections: state.connections.filter(
          c => !cardIds.includes(c.fromCardId) && !cardIds.includes(c.toCardId)
        ),
      }
    }

    case ACTIONS.RENAME_GROUP: {
      const { groupId, name } = action.payload
      return {
        ...state,
        // Recorre todos los grupos, si encuentra el que necesito, se crea la copia con el cambio, si no, se queda igual.
        groups: state.groups.map(g =>
          g.id === groupId ? { ...g, name } : g
        ),
      }
    }

    default:
      return state
  }
}