/**
 * @author Fábio Pereira <fabio.pereira.gti@gmail.com>
 */

function ObjectToMap (incoming) {
  const map = new Map()
  const keys = Object.keys(incoming)

  keys.forEach((key) => {
    const value = incoming[key]

    if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
      return map.set(key, ObjectToMap(value))
    }

    if (isNaN(Number(value)) || Number(value) <= 0) {
      throw new Error(`Could not add node at key "${key}"`)
    }

    return map.set(key, Number(value))
  })

  return map
};

export default ObjectToMap
