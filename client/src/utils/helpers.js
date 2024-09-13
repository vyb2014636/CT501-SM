export const setFalse = (...setters) => setters.forEach((setter) => setter(false))

export const setValues = (...statePairs) => {
  statePairs.forEach(([setter, value]) => setter(value))
}
export const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`
}

export const formatFullname = (firstName, lastName) => {
  return `${firstName.trim()} ${lastName.trim()}` || ''
}
