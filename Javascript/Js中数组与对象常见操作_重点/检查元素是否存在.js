//使用 indexOf() 检查元素是否存在
// indexOf() 方法接受一个元素作为输入参数，并返回该元素在数组中的位置（索引）；
// 若该元素不存在于数组中则返回 -1。
let fruits = ['apples', 'pears', 'oranges', 'peaches', 'pears'];

fruits.indexOf('dates');
fruits.indexOf('oranges');
fruits.indexOf('pears');
//
// indexOf('dates') 返回 -1，indexOf('oranges') 返回 2，
// indexOf('pears') 返回 1 (每个元素存在的第一个索引)。


function quickCheck(arr, elem) {
  // 只修改这一行下面的代码
  if (arr.indexOf(elem) != -1) {
    return true;
  } else {
    return false;
  }
// 只修改这一行上面的代码
}

console.log(quickCheck(['squash', 'onions', 'shallots'], 'mushrooms'));