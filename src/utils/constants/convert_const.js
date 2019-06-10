export const convertConst = arr => {
  return arr.reduce((obj, key) => {
    obj[key.toUpperCase()] = key
    return obj
  }, {})
}