// var arr = [1, 2, 3,4];
//
// var str = '123';
//
// var obj = {a: 1, b: 2};
//
// for (let i = 0; i < arr.length; i++) {
//   console.log(arr[i])
// }
//
// for (let i = 0; i < str.length; i++) {
//   console.log(str[i])
// }
//
//
// arr.forEach(function (item) {
//   console.log(item)
// })
//
// for (var i in obj) {
//   console.log(i, obj[i]);
// }

//有没一种方式实现不同类型的数据用同一种遍历方法--->迭代


//遍历和迭代的区别


var obj = {
  a: 1,
  b: 2,
  c: 3,
  [Symbol.iterator]: function* () {
    var index = 0;
    let map = new Map();
    map.set('a', 1);
    map.set('b', 2);
    map.set('c', 3);
    console.log(map)
    // return {
    //   next(){
    //     var mapEntries = [...map.entries()];
    //     if(index < map.size){
    //       return {
    //         value: mapEntries[index++],done:false
    //       }
    //     }
    //     return {value: undefined,done: true}
    //   }
    // }
    var mapEntries = [...map.entries()];
    while (index < mapEntries.length) {
      yield mapEntries[index++]
    }
    // if(index < map.size){
    //   return {
    //     value: mapEntries[index++],done:false
    //   }
    // }
    // return {value: undefined,done: true}
  }
}
//
for (const i in obj) {
  console.log(i);
}

// let map = new Map();
// map.set('a',1);
// map.set('b',2);
// map.set('c',3);
// console.log(map)//Map(3) { 'a' => 1, 'b' => 2, 'c' => 3 } ;
// // 0: a → 1
// // 1: b → 2
// // 2: c → 3
//
// console.log(new Set([1,2,3,4,5]))//Set(5) { 1, 2, 3, 4, 5 }
// //0: 1
// // 1: 2
// // 2: 3
// // 3: 4
// // 4: 5
//


//生成器函数需要有关键字 *
function* test() {
  yield 5;
  yield 2;
  yield 3;
  yield 4;
}

var iter = test();

console.log(iter.next())//{ value: 5, done: false }
console.log(iter.next())//{ value: 2, done: false }


// for (const i of iter) {
//   console.log(i)
// }

console.log('=============================================')

function test0() {
  console.log(1)
}

var iter = test0();//有返回值


function* test01() {
  console.log(1)
  yield 5;
  console.log(2)
  yield 2;
  yield 3;
  yield 4;
}

var iter = test01();//没有任何返回值
console.log(iter.next())
// 1
// { value: 5, done: false }


console.log(iter.next())
// 2
// { value: 2, done: false }

//要想打印后面的数据必须调用iter.next()

console.log('=============================================')


function* test02() {
  console.log(1)
  return 1
}

var iter = test02();//没有任何返回值
console.log(iter)//不返回任何值,只返回迭代器对象: Object [Generator] {}
console.log(iter.next())//{ value: 1, done: true }


function* test03() {
  console.log(1)
  yield 1;
}

var iter = test03()
console.log(iter.next())//{ value: 1, done: false }
console.log(iter.next())//{ value: undefined, done: true }


//生成器函数中一般不要手动去return一个值


console.log('=============================================')


function* test04() {
  let val1 = yield 1;//this is val1:two
  console.log("this is val1:" + val1)
  let val2 = yield 2;// this is val2:this is three
  console.log("this is val2:" + val2)
  let val3 = yield 3;//this is val3:four
  console.log("this is val3:" + val3)
  let val4 = yield 4;// this is val4:five
  console.log("this is val4:" + val4)
}

var iter = test04()
console.log(iter.next('oneone'))//{ value: 1, done: false }

console.log(iter.next('two'))
// this is val1:two
// { value: 2, done: false }


console.log(iter.next('this is three'))
// this is val2:this is three
// { value: 3, done: false }


console.log(iter.next('four'))
// this is val3:four
// { value: 4, done: false }


console.log(iter.next('fivefive'))
// this is val4:fivefive
// { value: undefined, done: true }


console.log('======================hi=======================')

//宏任务
// setTimeout(()=>{
//   console.log(" 宏任务:setTimeout");
// },0)
//
//
//
// new Promise(resolve => {
//   resolve();//微任务
//   console.log("同步任务: promise")
// }).then(value => console.log("微任务: 成功"))
//
// console.log("Promise之后的 那个 任务")

// 同步任务: promise
// Promise之后的 那个 任务
// 微任务: 成功
// 宏任务 : setTimeout

console.log('=====================主线程的任务--->微任务队列--->宏任务队列========================')
//正常情况下: 主线程的任务--->微任务队列--->宏任务队列

let promise = new Promise(resolve => {
  setTimeout(()=>{
    console.log("setTimeout里面的宏观任务: setTimeout");
    resolve();//微任务
  },0);
  console.log("同步任务:promise")
}).then(value => console.log("微任务 成功"))

console.log("Promise之后的 那个 任务")

// 微任务: 成功
// 宏任务 : setTimeout
// setTimeout里面的宏观任务: setTimeout
// 微任务 成功


console.log('=================主要是promise相关:============================')

let p1 = new Promise((resolve,reject)=>{
  resolve('success')//resolve与reject同时有时,默认resolve
  reject("fail");
}).then(
  value => console.log("resolve就打印： "+value),
  reason => console.log("reject就打印: "+reason)
)
//resolve就打印： success


let p2 = new Promise((resolve,reject)=>{
  //如果这里什么都没有,下面的then里面就不会执行,什么都不会执行
}).then(
  value => console.log("resolve就打印： "+value),
  reason => console.log("reject就打印: "+reason)
)


let p3 = new Promise((resolve,reject)=>{
  resolve('success')//
}).then(
  //这里没有对应的函数
)
//什么都没输出



let p4 = new Promise((resolve,reject)=>{
  reject("fail");

}).then(
  value => console.log("resolve就打印： "+value),
  reason => console.log("reject就打印: "+reason)
)
//reject就打印: fail



let p5 = new Promise((resolve,reject)=>{
    resolve("success...")
}).then(
  value => {
    //aaaaa
    return new Promise((resolve,reject)=>{
      resolve("解决了")
    })
  },
  reason => console.log("error: "+ reason)
).then(
  //这里的then是对aaaaa这里的Promise的处理
  value => {
    console.log("成功了: "+value)
  }
)
//成功了: 解决了


let p6 = new Promise((resolve,reject)=>{
  resolve("success...")
}).then(//aabbb
  value => {
    //
     new Promise((resolve,reject)=>{
      resolve("解决了")
    })
  },
  reason => console.log("error: "+ reason)
).then(
  //这里的then是对aabbb处的处理
  value => {
    console.log("成功了: "+value)
  }
)
//成功了: undefined


let p7 = new Promise((resolve,reject)=>{
  resolve("success...")
}).then(//aabbb
  value => {
   console.log("hello: "+value)
  },
  reason => console.log("error: "+ reason)

).then(
  //这里的then是对aabbb处的处理
  value => {
    console.log("成功了: "+value)
  }
)
//hello: success...
//成功了: undefined

let p8 = new Promise((resolve,reject)=>{
  resolve("ok");
}).then(//aabbb
 value => {
   new Promise((resolve,reject)=>{
     setTimeout(()=>{
       reject("处理失败")
     },3000);
   });
 },
  reason => console.log("错误："+reason)
)
//这里会报错,因为没有对错误进行处理
//Uncaught (in promise) 处理失败



let p9 = new Promise((resolve,reject)=>{
  resolve("ok");
}).then(//aabbb
  value => {
    new Promise((resolve,reject)=>{
      setTimeout(()=>{
        reject("处理失败")
      },3000);
    }).then(
      null,
      r=>{console.log("error: "+r)}
    );
  },
  reason => console.log("错误："+reason)
)
//error: 处理失败

console.log('=================其他类型的promise封装:============================')

let p10 = new Promise((resolve,reject)=>{
  resolve("ok");
}).then(//aabbb
  value => {
   return  {
     then(resolve,reject){
       setTimeout(()=>{
         resolve("这是对象")//aabbcc
       },3000)
     }
   };
  },
).then(//这里的then的处理必须要等aabbcc处的resolve的状态改变之后才可执行
  value => {
    console.log(value)
  }
)
//这是对象

let p11 = new Promise((resolve,reject)=>{
  resolve("ok");
}).then(//aabbb
  value => {
    class Hd{
      then(resolve,reject){
        setTimeout(()=>{
          resolve("这是对象")//aabbcc
        },3000)
      }
    }
    return new Hd();
  },
).then(//这里的then的处理必须要等aabbcc处的resolve的状态改变之后才可执行
  value => {
    console.log(value)
  }
)
//这是对象

console.log('=================promise封装AJAX请求 :============================')

function request() {
  return new Promise((resolve,reject)=>{
    setTimeout(()=>{
      resolve("连接上了")
    },3000)
  })
}

request().then(value => console.log("成功了： "+value))
//成功了： 连接上了


//https://api.github.com/users/defunkt
//

function ajax(url) {
  return new Promise((resolve,reject)=>{
    let xhr = new XMLHttpRequest();
    xhr.open("GET",url);
    xhr.send();
    xhr.onload = function () {
      if (this.status === 200){
        resolve(JSON.parse(this.response))
      }else {
        reject("加载失败")
      }
    }

    xhr.onerror = function (){
      reject(this)
    }
  })
}


let url = `https://api.github.com/users/defunkt`


ajax(`${url}`).then(value => console.log(value),
    reason => console.log("发生错误！！！"))


