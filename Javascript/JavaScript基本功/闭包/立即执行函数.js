//a,b是形参,2,4是实参
(function (a, b) {
  console.log(a + b);//6
}(2, 4));

var num = (function (a, b) {
  return a + b;//6
}(2, 4));
console.log(num);//6


// 匿名函数
var num = (function(){
  return 123;
})();
console.log(num); // 123

// 忽略函数名
var num = (function test(){
  return 123;
})();
console.log(num); // 123

1 && function test() {
  console.log(1);
}();