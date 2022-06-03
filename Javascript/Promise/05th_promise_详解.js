// // 链式调用中返回 普通值 或者是 promise 对象
// let p1 = new Promise((resolve, reject) => {
//   resolve(1);
// })
//
//
// p1.then(res => console.log(res + 1))//此时打印出2，但是p1.then的返回值为undefined(默认的),状态为成功---> promise.resolve(undefined)
//   .then(res => console.log(res + 1))//此时打印出 NAN(因为undefined + 1),但是p1.then.then返回值为undefined(默认的)
//   .then(res => console.log(res + 2))
// /*
// 2
// NaN
// NaN
// */
//
// p1.then(res => {
//   console.log("this is in {}:" + (res + 1));
//   return res + 1
// })//此时打印出2，但是p1.then的返回值为2,状态为成功---> promise.resolve(2)
//   .then(res => {
//     console.log("this is in {}:" + (res + 1));
//     return res + 1
//   })//此时打印出3
//   .then(res => {
//     console.log("this is in {}:" + (res + 1));
//     return res + 1
//   })//此时打印出4


let p11 = new Promise((resolve, reject) => {
  reject('i am in reject');
})


let p22 = p11.then(() => {    //line 4
    console.log('ok 1')
  }, function fn2(err) {
    console.log('error 1: ' + err)
    return undefined
  }
)


let p33 = p22.then(() => {   //line 9
  console.log('ok 2')
}, function fn3(err) {
  console.log('error 2: ' + err)
})


let p44 = p33.catch(function fn4(err) {//line 14
  console.log('catch 1: ' + err)
})

/*
error 1: i am in reject
ok 2
* */


