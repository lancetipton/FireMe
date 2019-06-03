const isDev = process.env.NODE_ENV === 'development'
const oldWarn = console.warn
const IGNR_WARN = isDev
  ? [ 'Warning: React does not recognize the ' ]
  : []

const overRideAll = function() {
  let args = Array.from(arguments)

  // If in dev, check if the warning should be ignored
  if (
    isDev &&
    typeof args[0] === 'string' &&
    IGNR_WARN.some(inWarn => args[0].startsWith(inWarn))
  )
    return

  isDev && true
}

console.warn = function(){
  let args = Array.from(arguments)
  overRideAll(...args) && oldWarn.apply(console, [ ...args ])
}

console.error = function(){
  let args = Array.from(arguments)
  overRideAll(...args) && oldWarn.apply(console, [ ...args ])
}