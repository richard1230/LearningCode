/*
给 Object.keys() 方法传入一个对象作为参数，来生成包含对象所有键的数组。
这会返回一个由对象中所有属性（字符串）组成的数组。
 需要注意的是，数组中元素的顺序是不确定的
* */

let users = {
  Alan: {
    age: 27,
    online: false
  },
  Jeff: {
    age: 32,
    online: true
  },
  Sarah: {
    age: 48,
    online: false
  },
  Ryan: {
    age: 19,
    online: true
  }
};

function getArrayOfUsers(obj) {
  // 只修改这一行下面的代码
  return Object.keys(obj);
  // 只修改这一行上面的代码
}

console.log(getArrayOfUsers(users));//[ 'Alan', 'Jeff', 'Sarah', 'Ryan' ]
