import avatar from './avatar.jpg';
import Header from './Header.js';
import Content from './Content.js';
import Footer from './Footer.js';


var img = new Image();
img.src = avatar;


var app = document.getElementById('app');
app.appendChild(img);
new Header();
new Content();
new Footer();
