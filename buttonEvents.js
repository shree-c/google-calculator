import { appendToType, eraseOne, cursorBlink, setAnswer, clear, handleDecimalPoints, handleFuns, handleOps, removeOneToken, handleBrackets } from './utility.js'
import { evaluate } from './parser.js'
let internalTokens = ['5', '0', '0', '/', '2']
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
  //brackets are added seperately because parser needs them to add '*' sign
  get π() {
    internalTokens.push('(')
    internalTokens.push('Math.PI')
    internalTokens.push(')')
  },
  get e() {
    internalTokens.push('(')
    internalTokens.push('Math.E')
    internalTokens.push(')')
  },
}
let timer = null
export function handleButtonEvents() {
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
      } else if (e.target.innerText === '•') {
        handleDecimalPoints(internalTokens)
      } else if (e.target.classList.contains('op')) {
        handleOps(e.target.innerText, internalTokens)
        setAnswer(evaluate(internalTokens))
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
    if (e.target.classList.contains('fun')) {
      handleFuns(e.target.innerText, internalTokens)
      setAnswer(evaluate(internalTokens))
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
            console.log('before sinding to removeOneToken', internalTokens)
            const lengthDiff = removeOneToken(internalTokens)
            eraseOne(lengthDiff)
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
  })
}
