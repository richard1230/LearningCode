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


/*
使用splice()删除元素

如果我们想删除数组中间的一个元素， 或者想一次删除多个元素，该如何操作呢？
 这时候我们就需要使用 splice() 方法了，
 splice() 可以让我们从数组中的任意位置连续删除任意数量的元素。

splice() 最多可以接受 3 个参数，但现在我们先关注前两个。
splice() 的第一个参数代表从数组中的哪个索引开始移除元素，而第二个参数表示要从数组中的这个位置开始删除多少个元素。 例如：

let array = ['today', 'was', 'not', 'so', 'great'];

array.splice(2, 2);
这里我们移除 2 个元素，首先是第三个元素（索引为 2）。
 array 会有值 ['today', 'was', 'great']。


splice() 不仅会修改调用该方法的数组，还会返回一个包含被移除元素的数组：

let array = ['I', 'am', 'feeling', 'really', 'happy'];
let newArray = array.splice(3, 2);
newArray 值为 ['really', 'happy']。


* */
const arr = [2, 4, 5, 1, 7, 5, 2, 1,8];
// 只修改这一行下面的代码
// arr.shift();
const deletearr = arr.splice(3, 5);

console.log(deletearr)
// 只修改这一行上面的代码
console.log(arr);