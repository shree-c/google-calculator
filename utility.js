import { TM, FUNS, ERASEVALS } from './utilityObjects.js'
const typeDiv = document.querySelector('#display-type')
const typeElement = document.getElementById('type-span')
const cursor = document.getElementById('cursor')
const scrollToExtremeLeft = (div) => {
  div.scrollLeft = div.scrollWidth
}

export function isSign(arg) {
  return (arg === '*' || arg === '/' || arg === '+' || arg === '-' || arg === '**')
}

export const appendToType = (str) => {
  typeElement.innerText += str
  scrollToExtremeLeft(typeDiv)
  return typeElement.innerText
}

export const eraseOne = (chars_to_del = 1, clear = false) => {
  console.log('characters to delete: ', chars_to_del)
  if (chars_to_del === undefined) {
    chars_to_del = 0
  }
  const typedText = typeElement.innerText
  typeElement.innerText = typedText.slice((clear) ? typedText.length : 0, typedText.length - chars_to_del)
  return typedText
}

export const cursorBlink = (action = ture, time = 0) => {
  return setTimeout(() => {
    if (action) {
      cursor.style.animationIterationCount = 'infinite'
    } else {
      cursor.style.animationIterationCount = '0'
    }
  }, time)
}

export const setAnswer = (ans) => {
  document.querySelector('#instant-ans').innerText = ans
  // scrollToExtremeLeft(document.querySelector('#instant-ans'))
}

export const clear = () => {
  const temp = typeElement.innerText
  typeElement.innerText = ''
  return temp
}
export function assert(condition) {
  if (!condition) {
    throw new Error(`${condition} failed:assert`)
  }
}

//handles removing of tokens from internal array as items are erased on screen
//called each time for a backspace button press
//function and its opening braces should be pair deleted
/* algorithm
* handle math functions: identified by starting with Math
* handle math constants: identified by starting with f
*/
export function removeOneToken(internalTokens) {
  const len = internalTokens.length
  let toBeErased = 0
  if (len === 0) {
    return toBeErased
  } else {
    let lastElement = internalTokens[len - 1]
    console.log('removetoken last element: ', lastElement)
    if (lastElement === ')') {
      //math constants
      //there should at least three elements
      if (internalTokens[len - 2].startsWith('Math')) {
        internalTokens.pop()
        toBeErased += ERASEVALS[internalTokens.pop()]
        assert(internalTokens[internalTokens.length - 1] === '(')
        internalTokens.pop()
      }
    } else if (lastElement === '(') {
      if (len > 1 && internalTokens[len - 2].startsWith('f')) {
        internalTokens.pop()
        toBeErased++
        toBeErased += ERASEVALS[internalTokens.pop()]
      } else {
        internalTokens.pop()
        toBeErased++
      }
    } else if (len > 0) {
      //remaining items
      internalTokens.pop()
      toBeErased++
    }
    return toBeErased
  }
}

//check whether the is in the middle of a floating point value
export function inTheMiddleOfNumber(tokenArray) {
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

//decides whether to add decimal point
export function handleDecimalPoints(tokenArray) {
  const len = tokenArray.length
  if (len === 0 || !inTheMiddleOfNumber(tokenArray)) {
    tokenArray.push('.')
    appendToType('.')
  }
}

//decides when to allow adding operation symbols
export function handleOps(op, tokenArray) {
  const len = tokenArray.length
  const lastElement = tokenArray[len - 1]
  if (TM[op] === '%') {
    tokenArray.push(TM[op])
    appendToType(op)
  } else if (TM[op] === '-') {
    if (lastElement !== '-' && (len === 0 || lastElement === ')' || lastElement === '(' || isSign(TM[op]))) {
      tokenArray.push(TM[op])
      appendToType(op)
    }
  } else {
    if (len !== 0 && (lastElement === ')' || lastElement === '.' || !Number.isNaN(+lastElement))) {
      tokenArray.push(TM[op])
      appendToType(op)
    } else if (isSign(lastElement)) {
      tokenArray.pop()
      eraseOne()
      if (TM[op] === '-') {
        tokenArray.push(TM[op])
        appendToType(TM[op])
      }
    }
  }
}

//an algorithm for adding brackets based on existing equation
export function handleBrackets(tokenArray) {
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

//handle math functions in calc
export function handleFuns(fun, tokenArray) {
  tokenArray.push(FUNS[fun])
  tokenArray.push('(')
  appendToType(`${fun}(`)
}
