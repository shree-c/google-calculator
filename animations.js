export const dropdown = () => {
  document.getElementById('reveal').addEventListener('click', (e) => {
    document.querySelector('#hidden-buts').classList.toggle('show')
  })
}
