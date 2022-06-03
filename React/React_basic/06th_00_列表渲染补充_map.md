## map的使用
先看下面一段代码:
```jsx
import React from 'react';

class App extends React.Component {
  constructor() { 
    super();
    this.state = {
      monster1: {
        name: 'Linda'
      },
      monster2: {
        name: 'Frank'
      },
      monster3: {
        name: 'Jacky'
      }
    };
  }
 

  render(){
    return (
      <div className="App">
        <h1>{this.state.monster1.name}</h1>
        <h1>{ this.state.monster2.name}</h1>
        <h1>{ this.state.monster3.name}</h1>
      </div>
    );
  }
}

export default App;

```
上面这种写法的缺点:
如果有1000个monster,那下面就要写1000个name，显然这是一个问题:<br>
优化:
```jsx
import React from 'react';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      monsters: [
        {
          name: 'Linda'
        },
        {
          name: 'Frank'
        },
        {
          name: 'Jacky'
        }
      ]
    }
  }
 

  render(){
    return (
      <div className="App">
        { 
          this.state.monsters.map((monster) => { 
            return <h1>{ monster.name }</h1>
          })
        }
      </div>
    );
  }
}

export default App

```
但是会有警告:
`Each child in a list should have a unique "key" prop.`
再次优化:
```jsx
import React from 'react';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      monsters: [
        {
          name: 'Linda',
          id:'123qwe'
        },
        {
          name: 'Frank',
          id:'123qw1'

        },
        {
          name: 'Jacky',
          id:'123qw2'

        }
      ]
    }
  }
 

  render(){
    return (
      <div className="App">
        { 
          this.state.monsters.map((monster) => { 
            return <h1 key={monster.id}>{ monster.name }</h1>
          })
        }
      </div>
    );
  }
}

export default App

```
再次优化:
```jsx
 render(){
    return (
      <div className="App">
        { 
          this.state.monsters.map((monster) => { 
            return <div key={monster.id}>
              <h1>
                {
                monster.name
              }
              </h1>
            </div>
          })
        }
      </div>
    );
  }
```