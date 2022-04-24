function number() {
  const myDiv = document.createElement('div');
  myDiv.innerText = 5000;
  myDiv.setAttribute('id', 'number');
  document.body.appendChild(myDiv);
}

export default number;