

// function f() {
//   console.log("我是函数")
// }
//
// f()


(function () {
   console.log("我是立即执行函数,形式是(function(){})()")
})(); // 看着清晰


(function () {
  console.log("我是立即执行函数,形式是(function(){}())")
}());


+function test() {
  console.log("我是立即执行函数,形式是+、-、! 、~、void、new function(){}()")
}()

// test()


