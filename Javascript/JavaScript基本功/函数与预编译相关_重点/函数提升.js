//预编译==>函数在执行之前要执行的步骤
/*
* 1.检查通篇的语法错误
*
* 1.5预编译的过程
*
* 2.解释一行,执行一行
*
* 函数声明整体提升, 变量只有声明提升， 赋值不提升
*
* 暗示全局变量 imply global variable
* 未被声明就被赋值，就是暗示全局变量
* */

// var a = 1;
// b = 2;
// console.log(window.b);//a 就等于 window.a ; b 就等于 window.b


/*
* AO  activation object
* 活跃对象  函数上下文
*重点:
*
*1.寻找形参和变量声明
*
* 2.实参值赋给形参

* 3.寻找函数体内的函数声明==>赋值函数
*
* 4.执行
*
* AO={
*
* }
* */


a = 2;
var a;
console.log(a);//2

console.log(b);//undefined
var b = 2;


foo()

function foo() {
  console.log(c);//undefined
  var c = 2;
}


//GO global object 全局上下文
/*其实GO===window
1.找变量

2.找函数声明


3.执行

*
* */





