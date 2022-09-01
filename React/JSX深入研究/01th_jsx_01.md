[TOC]

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
          className: 'box',
          id: 'J_Box'
        },
        // div(标签) , 属性,子元素
        React, createElement(
          'h1',
          {
            className: 'title'
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

## React元素类型

```jsx
class MyButton extends React.Compponent {

  render() {
    return (
      <button>Click</button>
    )
  }
}

class App extends React.Component {
  render() {
    return (
      <MyButton/>
    );
  }
}

```

React ---> 编译 ---> JSX ---> React.createElement调用形式

React ---> createElement ---> 让React库存在当前的模块作用域中

`import React from 'react'`(index.html---> script ---> src ---> React cdn 是不需要 import的)

![img_1.png](img_1.png)

## 如何在JSX中使用点语法

```jsx

const colorSystem = {
  'primary': 'blue',
  'success': 'green',
  'warning': 'orange',
  'danger': 'red'
}

const MyUI = {
  Button: class extends React.Component {
    render() {
      const {type, children} = this.props;

      return (
        <button
          style={{
            color: '#fff',
            backgroundColor: colorSystem[type]
          }}
        >
          {children}

        </button>
      )
    }
  },
  Input: function (props) {
    const {placeholder,onValueInput} = props;
    return(
      <input
      type="text"
      placeholder={placeholder}
      onCHange={(e)=> onValueInput(e)}
      />
    )
  }
}

class App extends React.Component {
  render() {
    return (
     <div>
       <MyUI.Button
         type='danger'
       >
         Click
       </MyUI.Button>

       <MyUI.Input placeholder="请填写" onValueInput={this.valueInput}>
       </MyUI.Input>
     </div>

      );
  }
}
```

![img_2.png](img_2.png)

![img_3.png](img_3.png)


## JSX书写规范

小写字母开头代表HTML的内置组件,标签转换为 字符串: `div` =====> `'div'` --->作为React.createElement的第一个参数

大写字母开头代表自定义组件 , 例如 `MyButton`，编译 React.createElement(MyButton)


![img_4.png](img_4.png)




## 运行时选择组件

![img_10.png](img_10.png)


![img_5.png](img_5.png)
![img_9.png](img_9.png)
![img_7.png](img_7.png)

![img_6.png](img_6.png)

![img_8.png](img_8.png)




