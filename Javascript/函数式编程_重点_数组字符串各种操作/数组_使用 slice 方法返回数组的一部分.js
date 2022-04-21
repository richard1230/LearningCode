/*
使用slice方法返回数组的一部分
slice 方法可以从已有数组中返回指定元素。
它接受两个参数，第一个规定从何处开始选取，第二个规定从何处结束选取（不包括该元素）。
 如果没有传参，则默认为从数组的开头开始到结尾结束，
这是复制整个数组的简单方式。 slice 返回一个新数组，不会修改原始数组。

const arr = ["Cat", "Dog", "Tiger", "Zebra"];
const newArray = arr.slice(1, 3);
newArray 值为 ["Dog", "Tiger"]


* */

function sliceArray(anim, beginSlice, endSlice) {
  // 只修改这一行下面的代码
  const newArray = anim.slice(beginSlice, endSlice)


  return newArray
  // 只修改这一行上面的代码
}

const inputAnim = ["Cat", "Dog", "Tiger", "Zebra", "Ant"];
console.log(sliceArray(inputAnim, 1, 3));
;
console.log(inputAnim);


