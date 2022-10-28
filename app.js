import { handleKeyboardEvents } from './keyboard.js'
import { evaluate, isSign } from './parser.js'
import { appendToType, eraseOne, cursorBlink, setAnswer, clear } from './utility.js'
import { dropdown } from './animations.js'
dropdown()
let timer = null
let internalTokens = ['500', '/', '2']
const tokensMap = {
  get 'sin'() {
    internalTokens.push()
  },
  'cos': 'Math.cos',
  'tan': 'Math.tan',
  'log': 'Math.log2',
  'ln': 'Math.ln',
  get '％'() {
    internalTokens.push('%')
  },
  get '×'() {
    internalTokens.push('*')
  },
  get '•'() {
    internalTokens.push('.')
  },
  get '÷'() {
    internalTokens.push('/')
  },
  get '^'() {
    internalTokens.push('**')
  },
  get '-'() {
    internalTokens.push('-')
  },
  get '+'() {
    internalTokens.push('+')
  },
  get π() {
    internalTokens.push('*')
    internalTokens.push('Math.PI')
  },
  get e() {
    internalTokens.push('*')
    internalTokens.push('Math.E')
  },
}
// even ( and ) are considered as tokens and are added seperately
// which of ( and ) should be permitted to add to display is decided and only then sent here
// we will automatically add ( after Math functions where value needs to be supplied
function removeOneToken() {
  if (internalTokens[internalTokens.length - 2] === '*') {
    internalTokens.pop()
    internalTokens.pop()
  } else {
    internalTokens.pop()
  }
}

function inTheMiddleOfNumber(tokenArray) {
  if (tokenArray.length === 0) {
    return false
  } else {
    for (let i = tokenArray.length - 1; i >= 0; i--) {
      if (isSign(tokenArray[i]) || tokenArray[i] === '(' || tokenArray[i] === ')') {
        return false
      }
      if (tokenArray[i] === '.') {
        return true
      }
    }
  }
}

function handleDecimalPoints(tokenArray) {
  const len = tokenArray.length
  if (len === 0 || !inTheMiddleOfNumber(tokenArray)) {
    tokenArray.push('.')
    appendToType('.')
  }
}

function handleBrackets(tokenArray) {
  if (tokenArray.length !== 0) {
    const lastElement = tokenArray[tokenArray.length - 1]
    if (lastElement === '(' || isSign(lastElement)) {
      tokenArray.push('(')
      appendToType('(')
    } else {
      let left = 0, right = 0
      for (let i = 0; i < tokenArray.length; i++) {
        if (tokenArray[i] === '(') {
          left++
        } else if (tokenArray[i] === ')') {
          right++
        }
      }
      if (left === 0 || left === right) {
        tokenArray.push('(')
        appendToType('(')
      } else if (left > right) {
        tokenArray.push(')')
        appendToType(')')
      } else {
        console.error('closing brackets are greater than opening brackets')
      }
    }
  }
  else {
    console.log('add some number')
  }
}
handleKeyboardEvents()
document.addEventListener('click', (e) => {
  const target = e.target
  clearTimeout(timer)
  cursorBlink(false)
  timer = cursorBlink(true, 500)
  //if it is not a function
  if (target.classList.contains('val')) {
    //if the value not needs to be changed
    if (target.classList.contains('num')) {
      appendToType(target.innerText)
      internalTokens.push(target.innerText)
      setAnswer(evaluate(internalTokens))
    }
    else if (e.target.innerText === '•') {
      handleDecimalPoints(internalTokens)
    } else {
      appendToType(target.innerText)
      tokensMap[target.innerText]
      setAnswer(evaluate(internalTokens))
    }
  }
  // handeling brackets
  if (e.target.innerText === '()') {
    handleBrackets(internalTokens)
  }

  //handling special operations
  if (target.classList.contains('spop')) {
    switch (target.id) {
      case 'AC':
        {
          clear()
          setAnswer('')
          internalTokens = []
        }
        break
      case 'BS':
        {
          eraseOne()
          removeOneToken()
          setAnswer(evaluate(internalTokens))
        }
        break
      case 'ANS':
        {
          clear()
          setAnswer(evaluate(internalTokens))
          internalTokens = []
        }
        break
      default:
        {
          console.log('default', e.target.innerText)
        }
    }
  }
  console.log(internalTokens)
})
