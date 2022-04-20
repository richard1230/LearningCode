import avatar from './avatar.jpg';
// 全局引入
import styles from './index.scss';
import createAvatar from './createAvatar.js';

// 创建img
createAvatar();

// 创建img
var img = new Image();
img.src = avatar;
img.className += `${styles.avatar}`;

var app = document.getElementById('app');
app.appendChild(img);
