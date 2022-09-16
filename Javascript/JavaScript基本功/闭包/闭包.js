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
// //累加器
// function test5() {
//   var num = 0;
//
//   function add() {
//     console.log(++num)
//   }
//
//   return add;
// }
//
// var add = test5();
// add()
// add()
// add()
// add()
// add()
//


const debounce = (func,delay) =>{
  let timeout;
  return ()=>{
    if(timeout){
      clearTimeout(timeout)
    }
    timeout = setTimeout(function () {
      func()
    },delay)
  }
}


const log = debounce(()=> console.log('call'),3000)

console.log(log())

