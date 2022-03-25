const INCREMENT = 'INCREMENT'; // 为 increment action types 定义一个常量
const DECREMENT = 'DECREMENT'; // 为 decrement action types 定义一个常量

const counterReducer = (state=0,action)=>{
   switch (action.type) {
     case INCREMENT:
       return state +1;
     case DECREMENT:
       return state-1;
     default:
       return state;
   }
}; // 定义 counter reducer，根据接收到的动作递增或递减 state

const incAction = ()=>{
  return {
    type:INCREMENT
  }
}; // 为自增运算定义一个动作创建器

const decAction = ()=>{
  return{
    type: DECREMENT
  }
}; // 为自减运算定义一个动作创建器

const store = Redux.createStore(counterReducer()); // 在这里定义 Redux store，传入 reducers
