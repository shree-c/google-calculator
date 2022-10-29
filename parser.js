import { isSign } from './utility.js'
// process decimal points
function isDecimalPart(item) {
  if (!Number.isNaN(+item) || item === '.')
    return true
  else
    return false
}
function processDecimals(tokenArray) {
  const retArr = []
  let temp = []
  for (let i = 0; i < tokenArray.length; i++) {
    if (isDecimalPart(tokenArray[i])) {
      temp.push(tokenArray[i])
    } else {
      if (temp.length !== 0) {
        retArr.push(temp.join(''))
        retArr.push(tokenArray[i])
        temp = []
      } else {
        retArr.push(tokenArray[i])
      }
    }
  }
  if (temp.length !== 0) {
    retArr.push(temp.join(''))
  }
  // console.log('retarr', retArr)
  return retArr
}

//decimal points should be processed before this is applied
function addStar(tokensArray) {
  //between two tokens that evaulate to a value and do not have any operator between them
  //after closing brace and next element is not a sign
  //after a number and next element is not a sign
  //minimum three elements are required
  let len = tokensArray.length
  if (len < 3) {
    return tokensArray
  } else {
    const retArr = []
    for (let i = 0; i < len - 1; i++) {
      // console.log(tokensArray[i], tokensArray[i + 1])
      if (((tokensArray[i] === ')') && (!isSign(tokensArray[i + 1]) && tokensArray[i + 1] !== ')')) || (!Number.isNaN(+tokensArray[i]) && Number.isNaN(+tokensArray[i + 1]) && tokensArray[i + 1] !== ')' && !isSign(tokensArray[i + 1]))) {
        retArr.push(tokensArray[i], '*')
      } else {
        retArr.push(tokensArray[i])
      }
    }
    retArr.push(tokensArray[len - 1])
    return retArr
  }
}

export function evaluate(equation) {
  try {
    console.log('eq', equation)
    return eval(addStar(processDecimals(equation)).join(''))
  } catch (e) {
    console.error(e.message)
    console.error((addStar(processDecimals(equation)).join('')))
    return 'error'
  }
}
