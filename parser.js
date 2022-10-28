export function isSign(arg) {
  return (arg === '*' || arg === '/' || arg === '+' || arg === '-' || arg === '**')
}

// process decimal points
function processDecimals(tokenArray) {

  let len = tokensArray.length
  if (len < 3) {
    return tokensArray
  } else {
    const retArr = []
    for (let i = 0; i <= len - 2; i++) {
      if (!Number.isNaN(tokenArray[i]) && tokenArray[i + 1] === '.' && !Number.isNaN(tokenArray[i + 2])) {
        retArr.push([tokenArray[i], tokenArray[i + 2].join('.')])
        i += 3
      }
    }
  }
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
    console.log('-->', addStar(equation))
    return eval(addStar(equation).join(''))
  } catch (e) {
    console.error(e.message)
    console.log(addStar(equation).join(''))
    return 'error'
  }
}
