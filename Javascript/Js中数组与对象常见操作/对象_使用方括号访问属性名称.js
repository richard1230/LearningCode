/*
checkInventory 应是一个函数。

foods 对象应只包含以下键值对：
apples: 25、oranges: 32、plums: 28、bananas: 13、grapes: 35、strawberries: 27。

checkInventory("apples") 应返回 25。

checkInventory("bananas") 应返回 13。

checkInventory("strawberries") 应返回 27。
* */

let foods = {
  apples: 25,
  oranges: 32,
  plums: 28,
  bananas: 13,
  grapes: 35,
  strawberries: 27
};

function checkInventory(scannedItem) {
  // 只修改这一行下面的代码
  return foods[scannedItem];
  // 只修改这一行上面的代码
}

console.log(checkInventory("apples"));

//删除对象属性
let foods1 = {
  apples: 25,
  oranges: 32,
  plums: 28,
  bananas: 13,
  grapes: 35,
  strawberries: 27
};

// 只修改这一行下面的代码
delete foods1.oranges;
delete foods1.plums;
delete foods1.strawberries;
// 只修改这一行上面的代码

console.log(foods1);
