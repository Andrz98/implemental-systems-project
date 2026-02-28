// Esté organismo debe importar átomos y moléculas ya que, ahora si nos encontramos frente a un componente inteligente.
// Nuevamente se importa lucide-react para mantener la consitencia en el diseño.
import { Card, EditableTitle } from '../molecules'
import { Button } from '../atoms'
import { X, Plus } from 'lucide-react'

// La función Group recibe las props desde el padre y será por medio del componente que maneje el contexto global
export default function Group({
  group,
  onRenameGroup,
  onRemoveGroup,
  onAddCard,
  onAddWord,
  onRemoveWord,
  onRemoveCard,
  onToggleDone,
}) {
  return (
    <section className="
      bg-gray-100 rounded-2xl p-5
      shadow
      flex flex-col gap-4
      min-w-[300px] max-w-[380px] w-full
    ">

      {/* 1. Cabecera del grupo: Aquí tenemos Título editable y botón de limpiar */}
      <div className="flex items-center justify-between gap-2">
        <EditableTitle
          value={group.name}
          onChange={(name) => onRenameGroup(group.id, name)}
        />

        <Button
          variant="danger"
          size="sm"
          onClick={() => onRemoveGroup(group.id)}
        >
          <X size={14} />
        </Button>
      </div>

      {/* 2. Lista de tarjetas que tenemos en el grupo */}
      <div className="flex flex-col- gap-3">
        {group.cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            groupId={group.id}
            onAddWord={onAddWord}
            onRemoveWord={onRemoveWord}
            onRemoveCard={onRemoveCard}
            onToggleDone={onToggleDone}
          />
        ))}
      </div>

      {/* Botón para crear una nueva tarjeta */}
      <Button
        variant="secondary"
        size="md"
        onClick={() => onAddCard(group.id)}
        className="w-full justify-center"
      >
        <Plus size={16} />
        Crear tarjeta
      </Button>
    </section>
  )
}