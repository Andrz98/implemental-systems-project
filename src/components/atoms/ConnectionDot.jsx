// El cometido de este átomo es crear un botón redondo que aparece en las tarjetsa finalizadas, para que el usuario pueda conectar tarjetas.
export default function ConnectionDot({
  isActive = false,
  isSource = false,
  connectionCount = 0,
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      className={`
        relative w-5 h-5 rounded-full
        border-2 transition-all duration-200
        cursor-pointer flex items-center justify-center
        ${isSource
          ? 'border-connect bg-connect scale-110'
          : isActive
            ? 'border-connect/60 bg-connect/10 hover:bg-connect/30 hover:border-connect'
            : connectionCount > 0
              ? 'border-accent bg-accent/10 hover:bg-accent/20'
              : 'border-surface-300 bg-white hover:border-accent hover:bg-accent/5'
        }
      `}
      title={isSource ? 'Selecciona otra tarjeta' : 'Conectar tarjeta'}
    >
      {connectionCount > 0 && !isSource && (
        <span className="text-[9px] font-bold text-accent leading-none">
          {connectionCount}
        </span>
      )}
    </button>
  )

}