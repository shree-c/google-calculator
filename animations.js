export const dropdown = () => {
  document.getElementById('reveal').addEventListener('click', (e) => {
    document.querySelectorAll('#roundbuts .but').forEach((e) => {
      e.classList.toggle('flatten')
    })
    document.querySelector('.hidden-buts').classList.toggle('show')
  })
}
