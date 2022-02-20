/*
假如我们有一个 users 对象，为检查它是否含有 Alan 属性，可以这样写：

users.hasOwnProperty('Alan');
'Alan' in users;
这两者结果都应该为 true。


* */


let users = {
  Alan: {
    age: 27,
    online: true
  },
  Jeff: {
    age: 32,
    online: true
  },
  Sarah: {
    age: 48,
    online: true
  },
  Ryan: {
    age: 19,
    online: true
  }
};

function isEveryoneHere(userObj) {
  // 只修改这一行下面的代码
  if (
    userObj.hasOwnProperty("Alan") &&
    userObj.hasOwnProperty("Jeff") &&
    userObj.hasOwnProperty("Sarah") &&
    userObj.hasOwnProperty("Ryan")
  ) {
    return true;
  }
  return false;

  // 只修改这一行上面的代码
}

console.log(isEveryoneHere(users));