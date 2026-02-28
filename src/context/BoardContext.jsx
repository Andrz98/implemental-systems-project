// En el contexto global, necesito importar hooks de React:
// createContext y useContext para crear y consumir el contexto,
// useReducer para gestionar estado complejo,
// y useCallback para memorizar funciones y evitar renders innecesarios.
// También necesito importar el generador de IDs únicos.
import { createContext } from 'react'
import { generateId } from '../utils/generateId'

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
}

// Mi app inicia vacía y en esta misma constante preparo la fase de conexiones que implementaré.
const initialState = {
  groups: [],
  connections:[],
}

// Este se crea el cerebro de la app, el cual recibirá dos cosas:
// 1. Estado actual
// 2. Una acción (qué es exactamente lo que quiere hacer el usuario)

function boardReducer(state, action) {
  // Mediante switch, evalúo action.type y ejecutar la acción correspondiente.
  switch (action.type) {
    // ====================================
    // Acciones que se producen en el grupo
    // ====================================

    case ACTIONS.ADD_GROUP: {
      const newGroup = {
        id: generateId('group'),
        name: action.payload?.name || `Grupo ${state.groups.length + 1}`,
        cards: [],
      }
      return {...state, groups: [...state.groups, newGroup]}
    }

    case ACTIONS.REMOVE_GROUP: {
      return {
        ...state,
        groups: state.groups.filter(g => g.id !== action.payload),
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

    // ========================================
    // Acciones que se producen en las tarjetas
    // ========================================

    // En los casos de cards, siempre seguiremos una lógica parecida a la que se seguía en groups.
    // Se identifica el id, si es ese, entonces se copia el grupo, se recorren las tarjetas, si es la tarjeta, entonces se hacen los cambios, si no se queda igual.
    // Si no es la tarjeta, entonces todo el grupo se queda igual.

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

    // ========================================
    // Acciones que se producen en las palabras
    // ========================================

    // En las acciones que podemos realizar en con las palabras, tenemos que pasar por Groups -> Cards y finalmente -> Words
    // Aquí añadimos una capa de seguridad, validando que sean 5 el número total de palabras que se pueden añadir dentro de una misma tarjeta.
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

export { BoardContext, ACTIONS, initialState, boardReducer }