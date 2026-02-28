// En primer lugar, defino las variantes de botón que voy a tener, voy a usar un botón diferente en las tarjeteas, por eso necesito que tenga más de una variante.
const variants = {
  primary:
    'bg-accent text-white hover:bg-accent-dark active:scale-[0.97] shadow-sm',
  secondary:
    'bg-surface-100 text-surface-600 hover:bg-surface-200 hover:text-surface-800 active:scale-[0.97]',
  ghost:
    'text-surface-400 hover:text-surface-600 hover:bg-surface-100',
  danger:
    'text-red-400 hover:bg-red-50 hover:text-red-500',
  connect:
    'bg-accent-50 text-accent-dark hover:bg-accent-100 ring-1 ring-accent/30',
}

const sizes = {
  sm: 'px-2.5 py-1 text-xs',
  md: 'px-3.5 py-2 text-sm'
}


// En segundo lugar defino el componente en sí (Button), lo haré con variant y size predefinida, classname lo dejo vacío ''.
export default function Button({
  children,
  variant = 'secondary',
  size = 'md',
  className = '',
  ...props // importante para las props nativas de HTML
}) {
  return (
    // Devuelvo el JSX del Button
    <button
      className={`
        inline-flex items-center justify-center gap-1.5
        rounded-lg font-medium
        transition-all duration-150 ease-out
        cursor-pointer select-none
        disabled:opacity-40 disabled:pointer-events-none
        ${variants[variant] || variants.secondary}
        ${sizes[size] || sizes.md}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  )
}