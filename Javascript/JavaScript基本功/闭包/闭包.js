//函数作为返回值
function test() {
  const a = 1;
  return function f1() {
    console.log('a:', a);
  }
}

const fn = test();
console.log(fn)//[Function: f1]
const a = 2;
console.log("fn():==============")

fn()//a: 1


//函数作为参数
function test1(fn1) {
  const b = 1;
  fn1();
}

const b = 2;

function fn1() {
  console.log('b:', b);
}

test1(fn1)//b: 2

//
// function sunSched() {
//   var sunSched = '';
//
//   var operation = {
//     setSched: function (thing) {
//       sunSched = thing;
//       console.log("sunSched: " + sunSched)
//     },
//     showSched: function () {
//       console.log("My schedule on sunday is " + sunSched)
//     }
//   }
//
//   return operation;
// }
//
//
// var sunSched = sunSched();
// sunSched.setSched('studying');
// sunSched.showSched()//My schedule on sunday is studying
// sunSched.setSched('walking');
// sunSched.showSched();//My schedule on sunday is walking
//
//
console.log("闭包测试: ==============")

//累加器
function test5() {
  var num = 0;
  function add() {
    console.log(++num)
    // return function () {
    //   console.log(++num)
    // }
  }
  return add;
}
var add = test5();
console.log(add());//1 undefined
console.log(add());//2 undefined
console.log(add());//3 undefined
console.log(add());//4 undefined
console.log(add());//5 undefined


console.log("闭包测试...>>>: ==============")

// const testClosure = () => {
//   let num = 0;
//   const effect = () => {
//     num += 1;
//     const message = `num value in message：${num}`;
//     return function unmount() {
//       console.log("这是在effect里面的unmount: ",message);
//     };
//     // console.log(num)
//   };
//   return effect;
// };
// // 执行test，返回effect函数
// const add = testClosure();
// // 执行effect函数，返回引用了message1的unmount函数
// var unmount = add();
// // 再一次执行effect函数，返回引用了message2的unmount函数
// console.log(add);;//[Function: effect]
// // message3
// var unmount01 = add()
// console.log(unmount01);;//[Function: unmount]
//
// console.log(unmount01 === unmount)//false
//
// // message4
// // console.log(add());;
// // // message5
// // console.log(add());;
// unmount();// 在这里会打印什么呢？按照直觉似乎应该打印5,实际上打印了1
//
// unmount()
//
// unmount()




