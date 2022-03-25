const ADD_NOTE = 'ADD_NOTE';

const notesReducer = (state = 'Initial State', action) => {
  switch (action.type) {
    // 修改这行下面的代码
    case ADD_NOTE:
      return action.text;
    // 修改这行上面的代码
    default:
      return state;
  }
};

const addNoteText = (note) => {
  // 修改这行下面的代码
  return {
    type: ADD_NOTE,
    text: note
  }
  // 修改这行上面的代码
};

const store = Redux.createStore(notesReducer);

console.log(store.getState());
store.dispatch(addNoteText('Hello!'));
console.log(store.getState());


//https://www.jianshu.com/p/8b9abedcf072


