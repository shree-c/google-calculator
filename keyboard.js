import { evaluate } from './parser.js'
import { appendToType, eraseOne, cursorBlink, setAnswer } from './utility.js'
let timer = null
export const handleKeyboardEvents = () => {
  document.addEventListener('keydown', (e) => {
    clearTimeout(timer)
    cursorBlink(false)
    timer = cursorBlink(true, 500)
    if (Number.isInteger(+e.key)) {
      setAnswer(evaluate(appendToType(e.key)))
    }
    if (e.key === 'Backspace') {
      setAnswer(evaluate(eraseOne()))
    }
  })
}
