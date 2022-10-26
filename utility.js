const typeDiv = document.querySelector('.display-type')
const typeElement = document.getElementById('type-span')
const cursor = document.getElementById('cursor')

const scrollToExtremeLeft = () => {
  typeDiv.scrollLeft = typeDiv.scrollWidth
}
export const appendToType = (str) => {
  typeElement.innerText += str
  scrollToExtremeLeft()
}

export const eraseOne = (n = 1) => {
  const typedText = typeElement.innerText
  typeElement.innerText = typedText.slice(0, typedText.length - n)
}

export const cursorBlink = (action) => {
  if (action) {
    cursor.style.animationIterationCount = 'infinite'
  } else {
    cursor.style.animationIterationCount = '0'
  }
}
