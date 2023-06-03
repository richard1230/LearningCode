// Function Declaration
// sayHello(); //
// function sayHello() {
//   console.log("Hello, world!");
// }
//
//
// sayHi(); //TypeError: sayHi is not a function
// var sayHi = function() {
//   console.log("Hello, 表达式!");
// };

function test5() {
  var num = 0;    //s1
  function add() {//s2
    console.log(++num)
  }
  return add;
}
var add = test5();
console.log(add());//1 undefined
console.log(add());//2
console.log(add());//3
console.log(add());//4
console.log(add());//5