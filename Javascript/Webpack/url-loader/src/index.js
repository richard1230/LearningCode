import avatar from './avatar.jpg';
console.log(avatar);

var img = new Image();
img.src = avatar;

var app = document.getElementById('app');
app.appendChild(img);

