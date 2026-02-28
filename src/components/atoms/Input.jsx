// Para este componente importo forwardRef, para poder acceder a Input desde el componente padre a este elemento hijo del DOM.
import { forwardRef } from 'react'

const Input = forwardRef(function Input(
  { className = '', ...props },
  ref // Está es la equita ref con la que accedemos al input del DOM
) {
  return (
    <input
      ref={ref}
      className={`
        w-full px-3 py-2 rounded-lg text-sm
        bg-white border border-gray-200
        text-gray-800 placeholder:text-gray-400
        focus:outline-none focus:ring-2 focus:ring-indigo-300/50 focus:border-indigo-400
        transition-all duration-150
        ${className}
      `}
      {...props}
    />
  )
})

export default Input