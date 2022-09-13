let fs = require('fs')

function readFile(pathname) {
  return new Promise(function (resolve, reject) {
    console.log("i am in promise");
    fs.readFile(pathname, 'utf-8', function (err, data) {
      if (err) {
        console.log("i am an err, but not hava reject")
        // reject(err);
        return;
      }
      reject(err);
      // resolve(data)
    })
  })
}


let promise = readFile('./name.txt')//


promise.then(function (data) {
    console.log('当前是在第一个promise.then的接受data,函数里面第一次调用promise.then : ' + data);
  },
  function (err) {
    console.log('只有err存在时: err: ' + err);
    promise.then(
      function () {

      },
      function (err) {
        console.log('当前是在第二个promise.then的接受err函数里面，第二次调用promise.then: ' + err)
        promise.then(function () {

        }, function (err) {
          console.log('当前是在第三个promise.then的接受err函数里面,第三次调用promise.then: ' + err)
          console.log("================================================")
        })
      }
    )
  })


//注意对比下面这两个例子:
//一旦promise状态发生变化,就不会再更改
// let p1 = new Promise((resolve, reject) => {
//   resolve("i am in resolve p1");
//   reject("i am in reject p1")
// })
//
// p1.then(res => console.log("i am res p1:" + res))
//   .catch(err => console.log('err  p1: ' + err))
// /*
// i am res :i am in resolve
// */
//
// let p2 = new Promise((resolve, reject) => {
//   reject("i am in reject p2");
//   resolve("i am in resolve p2");
//
// })
//
// p2.then(res => console.log("i am p2 res  :" + res))
//   .catch(err => console.log('p2 err : ' + err))

/*
 p2 err : i am in reject p2
* */