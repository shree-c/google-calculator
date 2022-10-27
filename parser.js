export function evaluate(equation) {
  equation = equation.replace(/×/g, '*')
  equation = equation.replace(/÷/g, '/')
  equation = equation.replace(/％/g, '%')
  console.log(equation)
  try {
    const res = eval(equation)
    return res
  } catch (e) {
    console.error(e.message)
    return 'error'
  }
}
