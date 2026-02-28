// Esté archivo lo creo con el fin de identificar exactamente el id de cada uno de los componentes que tengo, para los grupos, las tarjetas y los puntos de conexión.
let counter = 0

// Lo más importante es identificar que el tipo de elemento, esto lo realizo con prefix.
export const generateId = (prefix = 'id') => {
  counter += 1
  return `${prefix}_${Date.now()}_${counter}`
}
