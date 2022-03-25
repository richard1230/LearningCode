const defaultState = {
  authenticated: false
};

const authReducer = (state = defaultState, action) => {
  // 修改这行下面的代码
  switch (action.type) {
    case "LOGIN":
      return {
        authenticated: true
      };

    case "LOGOUT":
      return {
        authenticated: false
      };
    default:
      return defaultState
  }
  // 修改这行上面的代码
};

const store = Redux.createStore(authReducer);

const loginUser = () => {
  return {
    type: 'LOGIN'
  }
};

const logoutUser = () => {
  return {
    type: 'LOGOUT'
  }
};
