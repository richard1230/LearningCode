import avatar from "./avatar.jpg";

function createAvatar() {
  var img = new Image();
  img.src = avatar;
  img.className += 'avatar';

  var app = document.getElementById('app');
  app.appendChild(img);
}

export default createAvatar;