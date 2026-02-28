import useBoard from '../../context/useBoard'
import { Button } from '../atoms'
import { Plus } from 'lucide-react'
import Group from './Group'

export default function Board() {
  const { groups, addGroup } = useBoard()

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <header className="
        sticky top-0 z-30
        bg-white/80 backdrop-blur-lg
        border-b border-surface-200
        px-6 py-4
      ">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <a href="https://implementalsystems.com/en/" target="_blank" rel="noopener noreferrer">
            <img
              src="https://implementalsystems.com/wp-content/uploads/2018/10/logo-IS.svg"
              alt="Implemental Systems"
              className="h-8"
            />
          </a>
          <span className="text-xs text-surface-400">
            {groups.length} grupo{groups.length !== 1 ? 's' : ''}
          </span>
        </div>
      </header>

      {/* Tablero principal */}
      <main className="flex-1 px-6 py-8">
        <div className="
          max-w-6xl mx-auto
          grid grid-cols-2 gap-x-96 gap-y-6
          items-start
        ">
          {groups.map((group) => (
            <Group key={group.id} group={group} />
          ))}

          {/* Botón para crear nuevo grupo */}
          <button
            onClick={() => addGroup()}
            className="
              w-full
              border-2 border-dashed border-surface-300
              rounded-2xl p-8
              flex flex-col items-center justify-center gap-2
              text-surface-400 hover:text-accent hover:border-accent/40
              hover:bg-accent/5
              transition-all duration-200
              cursor-pointer
              active:scale-[0.98]
            "
          >
            <Plus size={24} />
            <span className="text-sm font-medium">Crear grupo</span>
          </button>
        </div>

        {/* Estado vacío: cuando no hay grupos */}
        {groups.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center">
              <p className="text-surface-300 text-lg mb-1">No hay grupos aún</p>
              <p className="text-surface-300 text-sm">Crea tu primer grupo para empezar</p>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}