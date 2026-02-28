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
        bg-white border border-surface-200
        text-surface-800 placeholder:text-surface-400
        focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent
        transition-all duration-150
        ${className}
      `}
      {...props}
    />
  )
})

export default Input