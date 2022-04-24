function counter() {
  const myDiv = document.createElement('div');
  myDiv.innerText = 1;
  myDiv.setAttribute('id', 'counter');
  myDiv.addEventListener('click', () => {
    myDiv.innerText = parseInt(myDiv.innerText, 10) + 1;
  })
  document.body.appendChild(myDiv)
}

export default counter;