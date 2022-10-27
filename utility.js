const typeDiv = document.querySelector('#display-type')
const typeElement = document.getElementById('type-span')
const cursor = document.getElementById('cursor')
const scrollToExtremeLeft = () => {
  typeDiv.scrollLeft = typeDiv.scrollWidth
}
export const appendToType = (str) => {
  typeElement.innerText += str
  scrollToExtremeLeft()
  return typeElement.innerText
}

export const eraseOne = (n = 1, clear = false) => {
  const typedText = typeElement.innerText
  typeElement.innerText = typedText.slice((clear) ? typedText.length : 0, typedText.length - 1)
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
}

export const clear = () => {
  const temp = typeElement.innerText
  typeElement.innerText = ''
  return temp
}
