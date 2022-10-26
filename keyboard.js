import { appendToType, eraseOne, cursorBlink } from './utility.js'
let timer = null
export const handleKeyboardEvents = () => {
  document.addEventListener('keydown', (e) => {
    clearTimeout(timer)
    cursorBlink(false)
    timer = setTimeout(() => {
      cursorBlink(true)
    }, 500)
    if (Number.isInteger(+e.key)) {
      appendToType(e.key)
    }
    if (e.key === 'Backspace') {
      eraseOne()
    }
  })
}
