// Este archivo es sencillo, nos permite conectar un componente a la caja central y nos devuelve todo lo que haya dentro (estado + funciones)
import { useContext } from 'react'
import { BoardContext } from './BoardContext'

export default function useBoard() {
  const context = useContext(BoardContext)
  if (!context) {
    throw new Error('useBoard debe usarse dentro de un BoardProvider')
  }
  return context
}