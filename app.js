import { handleKeyboardEvents } from './keyboard.js'
import { appendToType, eraseOne } from './utility.js'
handleKeyboardEvents()
const typeElement = document.getElementById('type-span')
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('but') && !e.target.classList.contains('spop')) {
    appendToType(e.target.innerText)
  }
  if (e.target.classList.contains('spop')) {
    switch (e.target.id) {
      case 'AC':
        {
          console.log('AC')
          typeElement.innerText = ''
        }
        break
      case 'BS':
        {
          console.log('BS')
          eraseOne()
          break
        }
      default:
        {
          console.log(e.target.getAttribute('op'))
        }
    }
  }
})
