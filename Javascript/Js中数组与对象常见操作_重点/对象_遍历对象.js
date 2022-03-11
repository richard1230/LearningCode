const users = {
  Alan: {
    online: true
  },
  Jeff: {
    online: true
  },
  Sarah: {
    online: false
  }
}

function countOnline(usersObj) {
  // 只修改这一行下面的代码
  //注意这里的写法, (就是18行),具体参考 ==> 对象_将键值对添加到对象中_删除对象属性
  let result = 0;
  for (let user in usersObj) {
    if (usersObj[user].online == true) {
      result += 1;
    }
  }
  return result;
  // 只修改这一行上面的代码
}

console.log(countOnline(users));