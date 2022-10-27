import { handleKeyboardEvents } from './keyboard.js'
import { evaluate } from './parser.js'
import { appendToType, eraseOne, cursorBlink, setAnswer, clear } from './utility.js'
import { dropdown } from './animations.js'
dropdown()
let timer = null
const typeElement = document.getElementById('type-span')
const internalTokens = []
const tokens = {
  'sin': 'Math.sin',
  'cos': 'Math.cos',
  'tan': 'Math.tan',
  'π': 'Math.PI',
  'e': 'Math.e',
  'log': 'Math.log2',
  'ln': 'Math.ln'
}
// even ( and ) are considered as tokens and are added seperately
// which of ( and ) should be permitted to add to display is decided and only then sent here
// we will automatically add ( after Math functions where value needs to be supplied
handleKeyboardEvents()
document.addEventListener('click', (e) => {
  clearTimeout(timer)
  cursorBlink(false)
  timer = cursorBlink(true, 500)
  if (e.target.classList.contains('num')) {
    setAnswer(evaluate(appendToType(e.target.innerText)))
  }
  if (e.target.classList.contains('op')) {
    setAnswer(evaluate(appendToType(e.target.innerText)))
  }
  if (e.target.classList.contains('spop')) {
    switch (e.target.id) {
      case 'AC':
        {
          clear()
        }
        break
      case 'BS':
        {
          eraseOne()
        }
        break
      case 'ANS':
        {
          setAnswer(evaluate(clear()))
        }
      default:
        {
          console.log(e.target.getAttribute('op'))
        }
    }
  }
})
