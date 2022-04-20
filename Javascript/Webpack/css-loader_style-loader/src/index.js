import avatar from './avatar.jpg';
//全局引入,就是说index.css会同时影响createAvatar()和代码a部分
//但是实际的需求是只影响部分(这里为代码a部分),另一部分不受影响
import './index.css';
import createAvatar from "./createAvatar";

//创建img
createAvatar();


//创建img,设为代码a
var img = new Image();
img.src = avatar;
img.className += 'avatar';

var app = document.getElementById('app');
app.appendChild(img);

