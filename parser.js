export function isSign(arg) {
  return (arg === '*' || arg === '/' || arg === '+' || arg === '-' || arg === '**')
}
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
      console.log(tokensArray[i], tokensArray[i + 1])
      if ((tokensArray[i] === ')' || Number.isInteger(+tokensArray[i])) && (!isSign(tokensArray[i + 1]) && tokensArray[i + 1] !== ')')) {
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
    return 'error'
  }
}
