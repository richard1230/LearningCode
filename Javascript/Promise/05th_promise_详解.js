// 链式调用中返回 普通值 或者是 promise 对象
let p1 = new Promise((resolve, reject) => {
  resolve(1);
})


p1.then(res => console.log(res + 1))//此时打印出2，但是p1.then的返回值为undefined(默认的),状态为成功---> promise.resolve(undefined)
  .then(res => console.log(res + 1))//此时打印出 NAN(因为undefined + 1),但是p1.then.then返回值为undefined(默认的)
  .then(res => console.log(res + 2))
/*
2
NaN
NaN
*/

p1.then(res => {
  console.log("this is in {}:" + (res + 1));
  return res + 1
})//此时打印出2，但是p1.then的返回值为2,状态为成功---> promise.resolve(2)
  .then(res => {
    console.log("this is in {}:" + (res + 1));
    return res + 1
  })//此时打印出3
  .then(res => {
    console.log("this is in {}:" + (res + 1));
    return res + 1
  })//此时打印出4
