


// function后面有两对小括号，立即执行，下面这个叫立即执行函数
var test2 = function () {
  console.log("这里是函数表达式后面加了一个括号"); // 1
}();

// 因为执行完毕即可销毁，外部调用不到test2函数
// console.log(test2())//Uncaught TypeError: test2 is not a function




//函数表达式，function后面只有一对小括号,{}里面的不算
var test112 = function() {
  console.log(112);
};

test112()//1

