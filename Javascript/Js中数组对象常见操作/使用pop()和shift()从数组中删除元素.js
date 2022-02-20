/*
push() 和 unshift() 都有一个与它们作用相反的函数：pop() 和 shift()。
与插入元素相反，pop() 会从数组的末尾移除一个元素，
而 shift() 会从数组的开头移除一个元素。
pop() 和 shift() 与 push() 和 unshift() 的关键区别在于，
用于删除元素的方法不接收参数，而且每次只能删除数组中的一个元素。

让我们来看以下的例子：

let greetings = ['whats up?', 'hello', 'see ya!'];

greetings.pop();
greetings 值为 ['whats up?', 'hello']。

greetings.shift();
greetings 值为 ['hello']。

* */
function popShift(arr) {
  let popped = arr.pop(); // 修改这一行
  let shifted = arr.shift(); // 修改这一行
  return [shifted, popped];
}

console.log(popShift(['challenge', 'is', 'not', 'complete']));