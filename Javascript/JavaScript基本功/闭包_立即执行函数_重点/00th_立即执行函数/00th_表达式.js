
// function f() {
//   console.log("我是函数")
// }
//
// f()


//括号包起来的一定是表达式,反之不对

// (funiton test(){})


//一定是表达式才能被执行符号执行

(function test1() {
  console.log(1); // 1
})();

// 被执行,有=号，它是一个表达式
var test2 = function () {
  console.log(1); // 1
}();

// 因为执行完毕即可销毁，外部调用不到test2函数
console.log(test2())//Uncaught TypeError: test2 is not a function



