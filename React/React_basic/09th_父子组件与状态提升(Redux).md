## 定义
状态提升：两个无父子关系的组件共享一个数据并且同步数据变化;<br>

类组件调用（实例化）的时候，组件内部的状态是唯一且独立的
```jsx
 class Info extends React.Component {
  // constructor(propos) { 
  //      super(propos)
  // }
  render() {
    return (
      <div>
        <p>输入长度: {this.props.username.length}</p>
        <p>提示:{
          this.props.username.length < 6 ?
            '长度需要大于6' :
            (
              this.props.username.length >= 6 && (
                this.props.username.length <= 12 ?
                  '长度合法' :
                  '长度必须小于12'
              )
            )
        }</p>
      </div>
    )
  }
}


class UserNameInput extends React.Component {
  state = {
    username: ''
  };

  changeUserName = (e) => {
    this.setState({
        username: e.target.value
      }
    )
  }

  render() {
    return (
      <div>
        <p>第{this.props.inputNum}号</p>
        <Info username={this.state.username}/>
        <div>
          <input type='text' onChange={this.changeUserName.bind(this)} />
        </div>
      </div>
    )
  }
}


class App extends React.Component {
  render() {
    return (
      <div>
        <UserNameInput inputNum={1}  />
        <UserNameInput inputNum={2}/>
      </div>

    )
  }
}


 ```

改为函数组件:
```jsx

import React from 'react';


function Info(props) {
    return (
        <div>
            <p>第{props.inputNum}号</p>

            <p>输入长度: {props.username.length}</p>
            <p>提示:{
                props.username.length < 6 ?
                    '长度需要大于6' :
                    (
                        props.username.length >= 6 && (
                            props.username.length <= 12 ?
                                '长度合法' :
                                '长度必须小于12'
                        )
                    )
            }</p>
        </div>
    )

}




function UserNameInput(props) {
    const [username, setUsername] = React.useState('');
    // username初始值原来是存放在state里面的, 原先更改数据是在setState里面进行的
    // 现在变为了:username初始值用useXXX设置,更改数据在setUsername里面

    const changeUserName = (e) => {
        setUsername(e.target.value)
    }

    return (
        <div>
            <Info username={username} inputNum={props.inputNum} />
            <div>
                <input type='text' onChange={changeUserName} />
            </div>
        </div>
    )
}

function App() {

    return (
        <div>
            <UserNameInput inputNum={1} />
            <UserNameInput inputNum={2} />
        </div>

    )
}
export default App;

```
小结:<br>
组件嵌套与调用，和是类组件（render）还是函数组件（直接return）没有关系<br>
类组件与函数组件是可以相互嵌套调用的<br>

## 状态提升

现在想要做的事:<br>
两个无父子关系的组件共享一个数据并且同步数据变化<br>
单向数据流本质:<br>
让状态(state)由父组件管理,子组件只获取属性,子组件不更改状态(数据)<br>


数据由父组件管理:<br>
状态提升:<br>
本应该是子组件的状态(状态中有数据) ---> 父组件来保存与操作 ---> 通过props来传递给子组件

代码如下:

```jsx
class Info extends React.Component {
    render() {
        return (
            <div>
                <p>第{this.props.inputNum}号</p>
                <p>输入长度: {this.props.username.length}</p>
                <p>提示:{
                    this.props.username.length < 6 ?
                        '长度需要大于6' :
                        (
                            this.props.username.length >= 6 && (
                                this.props.username.length <= 12 ?
                                    '长度合法' :
                                    '长度必须小于12'
                            )
                        )
                }</p>
            </div>
        )
    }
}


class UserNameInput extends React.Component {

    render() {
        return (
            <div>

                <Info username={this.props.username} inputNum={this.props.inputNum} />
                <div>
                    <input type='text' value={this.props.username} onChange={(e) => this.props.usernameChange(e)} />
                </div>
            </div>
        )
    }
}


class App extends React.Component {

    state = {
        username: ''
    }

    myUsernameChange(e) {
        this.setState({
            username: e.target.value
        }
        )
    }

    render() {
        return (
            <div>
                <UserNameInput
                    inputNum={1}
                    username={this.state.username}
                    usernameChange={this.myUsernameChange.bind(this)}

                />
                <UserNameInput
                    inputNum={2}
                    username={this.state.username}//注意:等号左边的变量名必须要与子组件中props中相同
                    usernameChange={this.myUsernameChange.bind(this)}
                />
            </div>

        )
    }
}

```


## 总结
> 0.几个准则

- props配置：使用组件时传入数据(传递数据时候才会用到,并且其中数据不可改,只能读)
  
- state为私有数据：组件内部使用的数据

> 1.类组件与函数组件相互转换
- 上面示例代码中username初始值原来是存放在state里面的, 原先更改数据是在setState里面进行的;<br>
要想变为函数组件,就要:username初始值用useXXX设置,更改数据在setUsername里面


> 2.状态提升相关
- 状态提升：两个无父子关系的组件共享一个数据并且同步数据变化

要想状态提升:<br>

- 父组件管理数据(state和对应的事件处理函数必须放在父组件里面)

- 子组件只获取属性,子组件不更改状态(数据)


> 单向数据流
- 数据（状态）从父到子，由上而下传递的方式叫单向数据流!!!


[4张动图解释如何使用Redux](https://github.com/dev-reading/fe/blob/master/articles/2017-11-24-when-do-i-know-im-ready-for-redux.md)