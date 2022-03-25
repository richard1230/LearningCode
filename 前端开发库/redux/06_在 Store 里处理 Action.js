const defaultState = {
  login: false
};

const reducer = (state = defaultState, action) => {
  // 修改这行下面的代码
  if (action.type === 'LOGIN'){
    return{
      login: true
    }
  }else {
    return state
  }

  // 修改这行上面的代码
};

const store = Redux.createStore(reducer);

const loginAction = () => {
  return {
    type: 'LOGIN'
  }
};

