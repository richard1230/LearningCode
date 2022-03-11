/*
使用 splice() 添加元素
还记得在上个挑战中我们提到 splice() 方法最多可以接收 3 个参数吗？
第三个参数可以是一个或多个元素，这些元素会被添加到数组中。
这样，我们能够便捷地将数组中的一个或多个连续元素换成其他的元素。

const numbers = [10, 11, 12, 12, 15];
const startIndex = 3;         //删除的起始位置下标,从0开始
const amountToDelete = 1;     //删除的数的个数

numbers.splice(startIndex, amountToDelete, 13, 14);
numbers.splice(3, 1, 13, 14);

console.log(numbers);
第二个 12 已被删除，我们在同一索引处添加 13 和 14。
numbers 数组现在将会是 [ 10, 11, 12, 13, 14, 15 ]。
* */

function htmlColorNames(arr) {
  // 只修改这一行下面的代码
  arr.splice(0, 2, 'DarkSalmon', 'BlanchedAlmond')
  // 只修改这一行上面的代码
  return arr;
}

console.log(htmlColorNames(['DarkGoldenRod', 'WhiteSmoke', 'LavenderBlush', 'PaleTurquoise', 'FireBrick']));
