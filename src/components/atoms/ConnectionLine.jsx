// Para este componente, voy a importar una biblioteca externa que ya facilita la creación de líneas.
import Xarrow from 'react-xarrows'

// Tenemos una función con 3 props que conectan los ids de los elementos html
export default function ConnectionLine({
  start,
  end,
  onClick,
}) {
  return (
    <Xarrow
      start={start}
      end={end}
      color="#C8102E"
      strokeWidth={2}
      path="smooth"
      curveness={0.6}
      dashness={{ strokeLen: 6, nonStrokeLen: 4, animation: 0.8 }}
      headSize={4}
      zIndex={10}
      passProps={{
        onClick: onClick,
        cursor: 'pointer',
      }}
    />
  )
}