const immutableReducer = (state = [0,1,2,3,4,5], action) => {
  switch(action.type) {
    case 'REMOVE_ITEM':
      // 这里不能修改 state，否则测试不能通过
      let a = [...state].slice(action.index+1)
      let b = [...state].slice(0,action.index)
      return b.concat(a)
    default:
      return state;
  }
};

const removeItem = (index) => {
  return {
    type: 'REMOVE_ITEM',
    index
  }
}

const store = Redux.createStore(immutableReducer);
