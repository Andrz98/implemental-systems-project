import BoardProvider from './context/BoardProvider'
import { Board } from './components/organisms'

export default function App() {
  return (
    <BoardProvider>
      <Board />
    </BoardProvider>
  )
}