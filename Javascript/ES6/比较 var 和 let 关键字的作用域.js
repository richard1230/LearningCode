var numArray = [];
for (var i = 0; i < 3; i++) {
  numArray.push(i);
}
console.log(numArray);
console.log(i);

console.log("=================================");
var numArray = [];
var i;
for (i = 0; i < 3; i++) {
  numArray.push(i);
}
console.log(numArray);
console.log(i);
console.log("===============会出问题的代码:==================");
//如果你创建一个函数，将它存储起来，稍后在使用 i 变量的 for 循环中使用。
// 这么做可能会出现问题。
// 这是因为存储的函数将始终引用更新后的全局 i 变量的值。
// var printNumTwo;
// for (var i = 0; i < 3; i++) {
//   if (i === 2) {
//     printNumTwo = function() {
//       return i;
//     };
//   }
// }
// console.log(printNumTwo());
//可以看到，printNumTwo() 打印了 3 而不是 2。
// 这是因为赋值给 i 的值已经更新，printNumTwo() 返回全局的 i，
// 而不是在 for 循环中创建函数时 i 的值。 let 关键字就不会出现这种现象：
console.log("===============修复问题的代码:==================");

let printNumTwo;
for (let j = 0; j < 3; j++) {
  if (j === 2) {
    printNumTwo = function () {
      return j;
    };
  }
}
console.log(printNumTwo());
console.log(j);//ReferenceError: j is not defined
// 未定义，因为它没有在全局范围内声明。 它只在 for 循环语句中被声明。
// printNumTwo() 返回了正确的值，
// 因为 let 关键字创建了三个具有唯一值（0、1 和 2）的不同 j变量在循环语句中



/*
* 使用 var 关键字声明变量时，它是全局声明的，
* 如果在函数内部声明则是局部声明的。

let 关键字的行为类似，但有一些额外的功能。
* 在代码块、语句或表达式中使用 let 关键字声明变量时，
* 其作用域仅限于该代码块、语句或表达式。

* */

