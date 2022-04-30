import './index.css';

// const myButton = document.createElement('button');
// myButton.innerText = '新增';
// document.body.appendChild(myButton);

// myButton.addEventListener('click', () => {
//   const myDiv = document.createElement('div');
//   myDiv.innerText = 'item';
//   document.body.appendChild(myDiv);
// })

import counter from './counter.js';
import number from './number.js';

counter();
number();

//js中的热模块更新需要下面这段代码,css中就不需要另外添加代码,style-loader帮你做了
if (module.hot) {
  module.hot.accept('./number.js', () => {
    const numberDiv = document.getElementById('number');
    document.body.removeChild(numberDiv);
    number();
  })
}u