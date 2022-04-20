import avatar from './avatar.jpg';
// import test from './test.scss';

function createAvatar() {
  var img = new Image();
  img.src = avatar;
  // img.className += `${test.avatar}`;
  img.className += 'avatar';


  var app = document.getElementById('app');
  app.appendChild(img);
}

export default createAvatar;
