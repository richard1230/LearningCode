function Content() {
  var dom = document.getElementById('app');
  var content = document.createElement('div');
  content.innerHTML = 'Content';
  dom.appendChild(content);
}

export default Content;
