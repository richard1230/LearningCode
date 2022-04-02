//a,b是形参,2,4是实参
(function (a, b) {
  console.log(a + b);//6
}(2, 4));

var num = (function (a, b) {
  return a + b;//6
}(2, 4));
console.log(num);//6


// 匿名函数
var num = (function () {
  return 123;
})();
console.log(num); // 123

// 忽略函数名
var num = (function test() {
  return 123;
})();
console.log(num); // 123

1 && function test() {
  console.log(1);//1
}();


var test = function () {
  console.log(111)
}
console.log(test)//[Function: test]

var test1 = function () {
  console.log(111)//2
}();
console.log(test1)//undefined,注意，上面的test1是立即执行函数，
                  // 执行完之后函数就被释放了
                  //此时再调用test1,就是undefined

// function test5(a) {
//   console.log(111)//2
// }();//会报错


function test6(a) {
  console.log(a)//2
}

(6);//不会报错


//逗号也是一个运算符
var num1 = (1, 2)
console.log(num1)//2,总是最后一个数字
var num2 = (1, 2, 3)
console.log(num2)//3
console.log("=======我是分割线===========")//3



function testf() {
  var n = 10;
  var a = function () {
    console.log(n)
  }

  var b = function () {
    console.log(n);
  }
  return [a, b];
}
//testf执行完之后,testf的AO并没有销毁,
// (testf的AO里面还是包含n=10的)
//testf的AO还被a,b两个函数拽着
var arr = testf();
console.log(arr[0]());//10
console.log(arr[1]());//10






var a = 10;
if (function b() {
}) {
  a += typeof (b);
}
console.log(a);//









