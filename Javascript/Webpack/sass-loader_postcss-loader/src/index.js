import avatar from './avatar.jpg';
import './index.scss';

var img = new Image();
img.src = avatar;
img.className += 'avatar';

var app = document.getElementById('app');
app.appendChild(img);
