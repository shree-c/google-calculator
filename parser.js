import { isSign } from './utility.js'
// process decimal points
function isDecimalPart(item) {
  if (!Number.isNaN(+item) || item === '.')
    return true
  else
    return false
}

const fc = {
  fsin: function (val) {
    return Math.sin(val)
  },
  fcos: function (val) {
    return Math.cos(val)
  },
  ftan: function (val) {
    return Math.cos(val)
  },
  log: function (val) {
    return Math.log10(val)
  },
  ln: function (val) {
    return Math.log(val)
  },
  asin: function (val) {
    return Math.asin(val)
  },
  acos: function (val) {
    return Math.acos(val)
  },
  atan: function (val) {
    return Math.atan(val)
  },
  sqrt: function (val) {
    return Math.sqrt(val)
  },
  raise2: function (val) {
    return val ** 2
  },
  raise10: function (val) {
    return val ** 10
  }

}
//concatanates sepeperate number and decimal point tokens
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
  return retArr
}

//decimal points should be processed before this is applied
//inserts multiplication signs where it is implicitly assumed
function addStar(tokensArray) {
  //between two tokens that evaulate to a value and do not have any operator between them
  //after a number and next element is not a sign
  //minimum three elements are required
  let len = tokensArray.length
  if (len < 3) {
    return tokensArray
  } else {
    const retArr = []
    for (let i = 0; i < len - 1; i++) {
      // console.log(tokensArray[i], tokensArray[i + 1])
      if (
        //experimental
        //for processing math functions
        (((tokensArray[i]) === ')') && ((!Number.isNaN(tokensArray[i])) && (tokensArray[i + 1].startsWith('f'))))
        ||
        //after closing brace and next element is not a sign or a ')'
        ((tokensArray[i] === ')') && (!isSign(tokensArray[i + 1]) && tokensArray[i + 1] !== ')'))
        ||
        //after number and next element is not a sign, number, and a ')'
        (!Number.isNaN(+tokensArray[i]) && Number.isNaN(+tokensArray[i + 1]) && tokensArray[i + 1] !== ')' && !isSign(tokensArray[i + 1]))
      ) {
        retArr.push(tokensArray[i], '*')
      } else {
        retArr.push(tokensArray[i])
      }
    }
    retArr.push(tokensArray[len - 1])
    return retArr
  }
}

//the fake star of the show
export const evaluate = (function evaluate(equation) {
  try {
    console.log('eq', equation)
    return eval(addStar(processDecimals(equation)).join(''))
  } catch (e) {
    console.error(e.message)
    console.error((addStar(processDecimals(equation)).join('')))
    return 'error'
  }
}).bind(fc)
