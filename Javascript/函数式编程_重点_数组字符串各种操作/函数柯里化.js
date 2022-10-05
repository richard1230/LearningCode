/*
arity（参数个数）是函数所需的形参的数量。
 函数柯里化（Currying）意思是把接受多个 arity 的函数变换成接受单一 arity 的函数。

 function unCurried(x, y) {
  return x + y;
}

function curried(x) {
  return function(y) {
    return x + y;
  }
}

const curried = x => y => x + y

curried(1)(2)
* */



const obj1 = {foo:"bar"}

const obj2 = { ...obj1 }

console.log(obj1 === obj2)// false

const obj11 = {foo:"bar"}

const obj22= obj11

console.log(obj11 === obj22)// true