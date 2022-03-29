

//高内聚，低耦合 -> 模块 的单一责任制

var test = function test1(){
  var a = 1;
      b = 2;
  console.log(a,b);

}
test()//1 2
console.log(test.name)//test1

//形参和实参 的数量可以不等
function f(a,b) {
  console.log(typeof arguments)
  console.log(arguments)// [Arguments] { '0': 1, '1': 2, '2': 3 }


  console.log(arguments.length)//实参的长度,3
  console.log(f.length)//形参的长度,2
}
//实参
f(1,2,3)//[Arguments] { '0': 1, '1': 2, '2': 3 }


function f1(a,b) {
  a = 3;//在函数内部可以更改实参的值， a=3是存在栈里面的
  b = 5;//如果实参没有给f1传这个值，在内部改是没有用的
  console.log(  arguments[0])//3==>arguments[0]是存在堆里面的
  console.log(  arguments[1])//5

}

f1(1,2)
console.log("下面是f1(1)");
f1(1)//3,undefined,内部是打印不出arguments[1]的，默认为undefined

/*
*小结:
* 1.形参和实参 的数量可以不等
*
* 2.Arguments 是类数组对象
*
* 3.在函数内部可以更改实参的值
*
* 4.形参和实参是有一个映射的，(你给实参赋了值,形参也会跟着改变)
* 前提是形参里面有对应的数才可以
* 比方说形参有2个，实参有3个,那么最后一个实参就没有对应的映射
*
*
*5.每个函数都会默认添加一个return (如果你有return的除外)
*
*6.几个为假的值:
* undefined null NaN  0  " " false
* */



