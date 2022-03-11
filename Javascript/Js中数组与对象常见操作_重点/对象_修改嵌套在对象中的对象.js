let nestedObject = {
  id: 28802695164,
  date: 'December 31, 2016',
  data: {
    totalUsers: 99,
    online: 80,
    onlineStatus: {
      active: 67,
      away: 13,
      busy: 8
    }
  }
};

// nestedObject 有 3 个属性：id（属性值为数字）、date（属性值为字符串）、data（属性值为嵌套的对象）。
// 虽然对象中的数据可能很复杂，我们仍能使用上一个挑战中讲到的写法来访问我们需要的信息。
// 如果我们想把嵌套在 onlineStatus 中 busy 的属性值改为 10，可以用点号表示法来这样实现：

nestedObject.data.onlineStatus.busy = 10;

let userActivity = {
  id: 23894201352,
  date: 'January 1, 2017',
  data: {
    totalUsers: 51,
    online: 42
  }
};

// 只修改这一行下面的代码
userActivity.data.online = 45;
// 只修改这一行上面的代码

console.log(userActivity);

