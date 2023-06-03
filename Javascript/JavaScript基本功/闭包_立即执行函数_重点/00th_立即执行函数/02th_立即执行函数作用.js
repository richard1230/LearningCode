

var test112 = function() {
  console.log(112);
  console.log("我是函数表达式，函数名不会被忽略");

};


console.log(test112);

console.log(test112());


console.log("===========我是分割线========");


var test118 = function() {
  console.log("我是立即执行函数，函数名会被忽略");
}();

console.log(test118);
console.log(test118());
