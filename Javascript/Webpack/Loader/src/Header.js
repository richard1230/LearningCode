function Header() {
  var dom = document.getElementById('app');
  var header = document.createElement('div');
  header.innerHTML = 'Header';
  dom.appendChild(header);
}

export default Header;
