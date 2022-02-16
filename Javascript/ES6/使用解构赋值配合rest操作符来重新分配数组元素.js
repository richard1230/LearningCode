const source = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function removeFirstTwo(list) {
  // 只修改这一行下面的代码
  const [a, b, ...arr] = list; // 修改这一行
  // 只修改这一行上面的代码
  return arr;
}

const arr = removeFirstTwo(source);

//
// 使用解构赋值配合 rest 操作符来重新分配数组元素
// 在解构数组的某些情况下，我们可能希望将剩下的元素放进另一个数组里面。
//
// 以下代码的结果与使用 Array.prototype.slice() 类似：
//
// const [a, b, ...arr] = [1, 2, 3, 4, 5, 7];
// console.log(a, b);
// console.log(arr);
// 控制台将显示 1, 2 和 [3, 4, 5, 7]。
//
// 变量 a 和 b 分别接收数组的第一个和第二个值。 之后，
// 因为 rest 操作符的存在，arr 获取了原数组剩余的元素的值。
// rest 操作符只能对数组列表最后的元素起作用。
// 这意味着你不能使用 rest 操作符来截取原数组中间的元素作为子数组。
