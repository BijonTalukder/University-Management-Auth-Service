let lastUserId = 0
export const generatedUserId = () => {
  //    const currentId = (0).toString().padStart(5,'0')

  lastUserId++
  return String(lastUserId).padStart(5, '0')
}
