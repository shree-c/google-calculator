import { TM, FUNS } from './utilityObjects.js'
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

export const eraseOne = (n = 1, clear = false) => {
  const typedText = typeElement.innerText
  typeElement.innerText = typedText.slice((clear) ? typedText.length : 0, typedText.length - n)
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

//remove an extra star if it exists as pnultimate element
export function removeOneToken(internalTokens) {
  let reducedLength = 0
  if (internalTokens.length !== 0) {
    if (internalTokens[internalTokens.length - 2] == '*' || internalTokens[internalTokens.length - 2]?.startsWith('f')) {
      reducedLength += internalTokens.pop().length
      if (internalTokens[internalTokens.length - 1].startsWith('f')) {
        reducedLength += internalTokens.pop().length - 3
      } else {
        reducedLength += internalTokens.pop().length
      }
    } else {
      reducedLength = internalTokens.pop().length
    }
  }
  console.log('--<>', reducedLength)
  return reducedLength
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
