//修改存储在对象中的数组
/*
JavaScript 对象的这些基本操作：
 添加:
 修改:
 移除键值对、
 检查某个属性是否存在、
 遍历对象的所有属性
 在继续学习 JavaScript 的过程中，我们会了解对象的更多用法。
另外，在之后的数据结构课程中，我们还会学习 ES6 的 Map 和 Set
* */

let user = {
  name: 'Kenneth',
  age: 28,
  data: {
    username: 'kennethCodesAllDay',
    joinDate: 'March 26, 2016',
    organization: 'freeCodeCamp',
    friends: [
      'Sam',
      'Kira',
      'Tomo'
    ],
    location: {
      city: 'San Francisco',
      state: 'CA',
      country: 'USA'
    }
  }
};

function addFriend(userObj, friend) {
  // 只修改这一行下面的代码
  userObj.data.friends.push(friend);
  return userObj.data.friends;
  // 只修改这一行上面的代码
}

console.log(addFriend(user, 'Pete'));