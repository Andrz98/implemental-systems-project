// Puesto que necesitamos el id de las tarjetas que hemos creado para poder crear conexiones entre ellas y además necesitamos las acciones de BoardConext,
// entonces importamos esos dos archivos.
import { generateId } from '../../utils/generateId'
import { ACTIONS } from '../BoardContext'

// ========================================
// Acciones de conexión entre tarjetas
// ========================================
export function connectionReducer(state, action) {
  switch (action.type) {

    case ACTIONS.START_CONNECTION: {
      return { ...state, connectingFrom: action.payload }
    }

    case ACTIONS.CANCEL_CONNECTION: {
      return { ...state, connectingFrom: null }
    }

    case ACTIONS.REMOVE_CONNECTION: {
      return {
        ...state,
        connections: state.connections.filter(c => c.id !== action.payload),
      }
    }

    case ACTIONS.FINISH_CONNECTION: {
      const toCardId = action.payload
      const fromCardId = state.connectingFrom

      // Si no hay origen o es la misma tarjeta, cancelamos
      if (!fromCardId || fromCardId === toCardId) {
        return { ...state, connectingFrom: null }
      }

      // Verificamos que sean de grupos distintos
      const fromGroup = state.groups.find(g =>
        g.cards.some(c => c.id === fromCardId)
      )
      const toGroup = state.groups.find(g =>
        g.cards.some(c => c.id === toCardId)
      )
      if (fromGroup?.id === toGroup?.id) {
        return { ...state, connectingFrom: null }
      }

      // Verificamos que ambas estén finalizadas
      const fromCard = fromGroup?.cards.find(c => c.id === fromCardId)
      const toCard = toGroup?.cards.find(c => c.id === toCardId)
      if (!fromCard?.done || !toCard?.done) {
        return { ...state, connectingFrom: null }
      }

      // Verificamos que no exista ya esa conexión
      const exists = state.connections.some(
        c =>
          (c.fromCardId === fromCardId && c.toCardId === toCardId) ||
          (c.fromCardId === toCardId && c.toCardId === fromCardId)
      )
      if (exists) {
        return { ...state, connectingFrom: null }
      }

      // Todo validado, creamos la conexión
      const newConnection = {
        id: generateId('conn'),
        fromCardId,
        toCardId,
      }
      return {
        ...state,
        connections: [...state.connections, newConnection],
        connectingFrom: null,
      }
    }

    default:
      return state
  }
}