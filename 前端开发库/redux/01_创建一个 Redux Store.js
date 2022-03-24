const reducer = (state = 5) => {
  return state;
}

// 可从 Redux 对象获得 Redux 方法
// 例如：Redux.createStore()
// 在这里定义 store here：
const store = Redux.createStore(reducer)
