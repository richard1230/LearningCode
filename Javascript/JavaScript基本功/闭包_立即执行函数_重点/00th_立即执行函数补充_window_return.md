## 立即执行函数知识点补充

主要是window,return与立即执行函数相关的知识点

```javascript
function f() {
  window.a = 3;
}

f()

console.log(a)//3
console.log("==========================================")

function test0() {
  var a = 1;

  function add() {
    a++;
    console.log(a);
  }

  return add;

}

var plus = test0();
plus();//2
plus();//3
plus()//4


console.log("==========================================")

function test() {
  var a = 1;

  function add() {
    a++;
    console.log(a);

  }

  window.add = add;
}

test();

add();//2
add();//3
add();//4
console.log("==========================================")

var add1 = (function () {
  var a = 1;

  function add2() {
    a++;
    console.log(a);
  }

  return add2;
})()

add1();
add1();
add1();

console.log("====================下面是重点======================")

;(function test101() {//注意:这里没有;这个符号会报错,
  // 这里在前面加是为了养成一个习惯
  var a = 1;

  function add3() {
    a++;
    console.log(a);
  }

  window.add3 = add3;
})()

// ;(function () {})()//没有分号会报错,+也可以,前面讲过
// ;(function () {})()


add3();//2
add3();//3
add3();//4
console.log("over")
console.log("==========================================")
//这种模式在写插件的时候经常用的
;(function () {
  function Test() {
  }

  Test.prototype = {}
  window.Test = Test;
})();

var test = new Test()

```



