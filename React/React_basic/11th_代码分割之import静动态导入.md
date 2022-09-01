[TOC]

## 代码分割(代码分离)
>项目构建时会整体打包成一个bundle的JS文件，而有的代码、模块是加载时不需要的，需要分割出来单独形成一个文件块chunk（不会打包在main里），让模块懒加载（想加载时才加载），以减少应用体积、减少加载时的体积。

import是关键字而非函数（类比typeof，typeof '123’ or typeof('123')）,分为静动两类:<br>
- 静态导入： import xxx from ''，导入并加载时，导入的模块会被立即编译，不是按需编译
- 动态导入：import('') 根据条件或按需的模块导入
- 动态导入应用场景：
  - 模块太大，使用可能性低
  - 模块的导入占用了大量系统内存
  - 模块需要异步获取
  - 导入模块时需要动态构建路径（路径拼接）import('./' + a + '.js')
  - 模块中的代码需要程序触发了某些条件才运行（比如点击事件）  


不能滥用动态导入：静态导入有利于初始化依赖，动态导入不能用于静态的程序分析和tree shaking<br>

```js
// 1.module.js
export default class MyTest {
    construct() {
        console.log('这是src/1.module.js中的 构造器')
    }
}
```

```jsx
function App() {
    var oBtn = document.querySelector('#btn');

    oBtn.onclick = async function () {
        var module = await import('./1.module.js')
        console.log(new module.default());//MyTest{}
    }
    return (
        <div>

        </div>
    )
}
```
等价于:
```jsx
 var oBtn = document.querySelector('#btn');

    oBtn.onclick = async function () {
        var Test = await import('./1.module.js').then(res=>res.default)
        console.log(new Test());//MyTest{}
    }
```
![点击之前](https://mmbiz.qpic.cn/mmbiz_png/YmmVSe19Qj7asNNWQlnzSkZB3G4qr5fibzQNxIlg3ArhLMSXdksxIJPhx54wB6HeIwZeNibJic9c72KwTeBGbGQqA/0?wx_fmt=png)

点击之前

![点击之后-动态导入](https://mmbiz.qpic.cn/mmbiz_png/YmmVSe19Qj7asNNWQlnzSkZB3G4qr5fibicFRa0e4CiaMvQUShibC3rugODF4RIQYjBrUKiay7W6AvE0ofqB8Yuu5KQ/0?wx_fmt=png)
点击之后--->动态导入,发现多了一个`chunk.js`文件


```js
//2.module.js
export const plus = (a, b) => {
    console.log("a + b = " + (a + b))
    return a + b
}
```

```jsx
function App() {
    var oBtn = document.querySelector('#btn');

    oBtn.onclick = async function () {
        var Test = await import('./1.module.js').then(res => res.default)
        var fns = await import('./2.module.js')
        const { plus } = fns //解构
        console.log(plus(1,2))// a + b = 3
    }
    return (
        <div>

        </div>
    )
}
```


![图3](https://mmbiz.qpic.cn/mmbiz_png/YmmVSe19Qj7asNNWQlnzSkZB3G4qr5fibQvX3xP7gubyibQLCGTESWhV7kicRZEpUic0cAT4VPapwqxOX0AS8nu5Ow/0?wx_fmt=png)




## React中动态导入
```jsx

import React from 'react';
import { async } from 'q';

async function importModule(){ 
    const { plus } = await import('./2.module.js');
    console.log(plus(1,2))//a + b = 3
}

function App() {
    
    return (
        <div>
            <button onClick={importModule}> click</button>
        </div>
    )
}
export default App;

```

### 验证
```jsx
import React from 'react';
import { async } from 'q';
import { plus} from './2.module.js'

async function importModule(){ 
    console.log(plus(1,2))
}

function App() {
    
    return (
        <div>
            <button onClick={importModule}> click</button>
        </div>
    )
}
export default App;

```
上面为静态导入,而后 `yarn build`:

![dabao1](https://mmbiz.qpic.cn/mmbiz_png/YmmVSe19Qj7asNNWQlnzSkZB3G4qr5fib85wbvvRYdXQYz9fsKLxysH9LHgXltnYbmeuKf1bDA6tVWFt5Nwkheg/0?wx_fmt=png)

发现对应代码在static下面的`main.js`里面找到;



动态导入(实现按需加载):
```jsx
import React from 'react';
import { async } from 'q';
// import { plus} from './2.module.js'

async function importModule(){ 
    const { plus } = await import('./2.module.js');
    console.log(plus(1,2))
}

function App() {
    
    return (
        <div>
            <button onClick={importModule}> click</button>
        </div>
    )
}
```
![图](https://mmbiz.qpic.cn/mmbiz_png/YmmVSe19Qj7asNNWQlnzSkZB3G4qr5fib3cVgJaXqWzEtrFRYpCJhZmnhpBjN56OCVJ1nGD2rT7RngsVxSFkUSg/0?wx_fmt=png)

发现对应代码在static下面的chunk.js里面找到;

>注意:<br>
> 如果使用vite/脚手架（create react app）搭建的项目 → 可以直接使用import()<br>
如果是手动做webpack的配置，查看代码分离指南<br>
webpack动态导入<br>
如果是用babel解析import() 需要安装依赖@babel/plugin-syntax-dynamic-import（在动态注册vue-router时，出现对import的语法错误，可能就是需要安装该依赖）


## 小结
- 对于动态import的内容，不会直接打包进main.js里；
- 如果是静态导入的就会直接打包进一个main.js里


