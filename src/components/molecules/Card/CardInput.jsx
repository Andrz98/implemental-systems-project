// Este componente, es el formulario donde el usuario escribe y añade una palabra, en el debe importarse el hook useRef puesto que necesito señalar
// inputRef del átomo Input y por lo tanto, se importa el átomo Input y el átomo Button y además el diseño de este último átomo lo hacemos con lucide react
import { useRef } from 'react'
import { Button, Input } from '../../atoms'
import { Plus } from 'lucide-react'


// Las props de está función, las llamo desde Card.jsx
export default function CardInput({
  value,
  onChange,
  onAdd,
  disabled,
}) {
  // Necesito crear la ref que debo conectar al Input real del DOM
  const inputRef = useRef(null)

  const handleAddWord = () => {
    onAdd()
    inputRef.current?.focus()
  }

   // En esta función detectamos cuando el usuario pulsa Enter en el input.
  // Si es Enter, prevenimos el comportamiento nativo del navegador de recargar la página y llamamos a handleAddWord para añadir la palabra.
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAddWord()
    }
  }

  return (
    <div className="flex gap-2 mt-3">
      {/* El input, está controlado haciendo que el valor y los cambios se gestionen desde el padre 'Card.jsx',
          con ref devuelvo el foco automáticamente al añadir una palabra. */}
      <Input
        ref={inputRef}
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        placeholder="Escribe una palabra…"
        maxLength={30}
      />

      {/* Este debe deshabilitarse cuando el input es´ta vacío para eviatar que el usuario añada palabras en blanco. */}
      <Button
        variant="primary"
        size="sm"
        onClick={handleAddWord}
        disabled={disabled}
        className="shrink-0"
      >
        <Plus size={14} />
      </Button>
    </div>
  )
}
