[TOC]

## lazy内置方法 Suspense内置组件

- lazy是React提供的懒（动态）加载组件的方法，React.lazy()

- 能减少打包体积、延迟加载首屏不需要渲染的组件

- 依赖内置组件Suspense：给lazy加上loading指示器组件的一个容器组件

- Suspense目前只和lazy配合实现组件等待加载指示器的功能

- React.lazy 接受一个函数，这个函数需要动态调用 import()。它必须返回一个 Promise，该 Promise 需要 resolve 一个 default export 的 React 组件。所以要用类返回render而不是函数


App.jsx

```jsx
import React from 'react';
import ReactDOM from 'react-dom'
import Loading from './Loading';

const MyMain = React.lazy(() => import('./main.jsx'));

function App() {
    return (
        <div>
            {/* 注意 fallback这里是组件 */}
            <React.Suspense fallback={<Loading />}>
                <MyMain />
            </React.Suspense>
        </div>
    )
}


export default App;

ReactDOM.render(
    <App/>,
    document.getElementById('root')
)


```
Loading.jsx

```jsx
export default function Loading() {
    return (
        <div>
            <h1>Loading...先出现</h1>
            <h1>Loading...先出现</h1>
            <h1>Loading...先出现</h1>
        </div>
    )
}
```

main.jsx
```jsx
import React from 'react';

// React.lazy 接受一个函数，这个函数需要动态调用 import()。
// 它必须返回一个 Promise，该 Promise 需要 resolve 一个 default export 的 React 组件。
export default class Main extends React.Component {
    render() {
        return (
            <div>
               这里是main.js所 显示 的 内容(延迟加载出来的)
            </div>
        )
    }
}
```


## 路由懒加载
```shell
yarn add react-router@5.3.3 react-router-dom@5.3.3
```

各个文件相对路径:
```shell
src
├── App.jsx
├── Loading.jsx
├── index.js
└── views
    ├── 1.js
    ├── 2.js
    └── 3.js
```
Loading.js
```jsx
export default function Loading() {
    return (
        <div>
            <h1>Loading...先出现</h1>
            <h1>Loading...先出现</h1>
            <h1>Loading...先出现</h1>
        </div>
    )
}
```
2.js(其他几个类似)
```js
import React,{Component} from 'react';

class Page2 extends Component{
    render(){
        return (
            <p>
                Page2
            </p>
        )
    }
}
export default Page2;
```

index.js
```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import App from './App';
ReactDOM.render(
  <React.StrictMode>
      <BrowserRouter>
    <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
```
APP.jsx:
```jsx
import React ,{Suspense,lazy}from 'react';
import ReactDOM from 'react-dom'
import Loading from './Loading';
import { BrowserRouter ,Switch, Route} from 'react-router-dom'

function App() {
    return (
        <div>

            <Suspense fallback={<Loading />}>
                <div>
                    <Switch>                    
                         <Route  path='/page1'  component={lazy(()=>import('./views/1'))}/>
                         <Route  path='/page2'  component={lazy(()=>import('./views/2'))}/>
                         <Route  path='/page3 ' component={lazy(()=>import('./views/3'))}/>
                    </Switch>
                </div>
            </Suspense>
        </div>
    )
}

export default App;

```