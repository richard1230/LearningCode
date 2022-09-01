## Jsx本质

```jsx
class App extends React.Component {
  render() {
    return (
      <div className='box' id='J_Box'>
        <h1 className='title'>
          This is a <span>TITLE</span>
        </h1>
      </div>
    );
  }
}

ReactDOM.render(
  <App/>,
  document.getElementById('app')
)
```

return里面可以换一种写法:

```jsx
class App extends React.Component {
  render() {
    return (
      React.createElement(
        div,
        {
          className:'box',
          id: 'J_Box'
        },
        // div(标签) , 属性,子元素
        React,createElement(
          'h1',
          {
            className:'title'
          },
          'This is a',
          React.createElement(
            'span',
            null,
            'TITLE'
          )
        )
      )
    );
  }
}
```

### 小结 
JSX其实是React.createElement函数调用的语法糖;

JSX ---> 编译 ---> React.createElement函数调用

![img.png](img.png)





