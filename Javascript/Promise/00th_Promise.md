[TOC]


## promise特性

1.promise 状态不受外界影响<br>


promise有三个状态:
- pending 进行中
- rejected 已经失败
- fulfilled 已经成功

2.promise的固化:<br>
一旦promise 的状态变化后就不在更改;<br>
pending --->  fulfilled(状态固定下来了,不可以在变化了)<br> 

pending --->  rejected(状态固定下来了,不可以在变化了)<br>


```JavaScript
//注意对比下面这两个例子:
//一旦promise状态发生变化,就不会再更改
let p1 = new Promise((resolve, reject) => {
  resolve("i am in resolve p1");
  reject("i am in reject p1")
})

p1.then(res => console.log("i am res p1:" + res))
  .catch(err => console.log('err  p1: ' + err))
/*
i am res :i am in resolve
*/

let p2 = new Promise((resolve, reject) => {
  reject("i am in reject p2");
  resolve("i am in resolve p2");

})

p2.then(res => console.log("i am p2 res  :" + res))
  .catch(err => console.log('p2 err : ' + err))

  /*
   p2 err : i am in reject p2
  * */
  ```
举个例子:(重点)
```shell
let p1 = new Promise((resolve, reject) => {
  resolve("i am in resolve p1");
  reject("i am in reject p1")
})

p1.then(res => console.log("i am res p1:" + res))
  .catch(err => console.log('err  p1: ' + err))

//i am res p1:i am in resolve p1



let p1 = new Promise((resolve, reject) => {
  reject("i am in reject p1");
  resolve("i am in resolve p1")
})

p1.then(res => console.log("i am res p1:" + res))
  .catch(err => console.log('err  p1: ' + err))

// err  p1: i am in reject p1



let p1 = new Promise(( reject,resolve) => {
  reject("i am in reject p1");
  resolve("i am in resolve p1")
})

p1.then(res => console.log("i am res p1:" + res))
  .catch(err => console.log('err  p1: ' + err))

// i am res p1:i am in reject p1





let p1 = new Promise(( reject,resolve) => {
  resolve("i am in resolve p1");

  reject("i am in reject p1")
})

p1.then(res => console.log("i am res p1:" + res))
  .catch(err => console.log('err  p1: ' + err))

// err  p1: i am in resolve p1


//结构剖析
let p1 = new Promise(( A,B) => {
  C("i am in resolve p1");//C中的字符串为 c

  D("i am in reject p1")// D中的字符串为 d
})

p1.then(res => console.log("E" + res))
  .catch(err => console.log('F ' + err))

//结果为 XX : XXX
// C在D前面
// 如果说A===C , 结果为E + c    ,注意其实C行和D行的位置还可以交换,结果也就不一样了
// 如果说 A !== C ,结果为 F + c

// D在C前面
// A===D，结果为 E + d
// A!==D ,结果为 F+ d
```

举个例子:
```js
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
      // reject(err);//作为对比,后面一个例子将把这里作为对比
      resolve(data)
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

      }, function (err) {
        console.log('当前是在第二个promise.then的接受err函数里面，第二次调用promise.then: ' + err)
        promise.then(function () {

        }, function (err) {
          console.log('当前是在第三个promise.then的接受err函数里面,第三次调用promise.then: ' + err)
        })
      }
    )
  })
```
此时输出:
```
//输出正确
i am in promise
当前是在第一个promise.then的接受data,函数里面第一次调用promise.then : richard is in name.txt

```
再看下面:
```js
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


let promise = readFile('./name.txt')
//此时输入其实是正确的,理论上应该需要执行接受data那个函数


promise.then(function (data) {
    console.log('当前是在第一个promise.then的接受data,函数里面第一次调用promise.then : ' + data);
  },
  function (err) {
    console.log('只有err存在时: err: ' + err);
    promise.then(
      function () {

      }, function (err) {
        console.log('当前是在第二个promise.then的接受err函数里面，第二次调用promise.then: ' + err)
        promise.then(function () {

        }, function (err) {
          console.log('当前是在第三个promise.then的接受err函数里面,第三次调用promise.then: ' + err)
        })
      }
    )
  })
```
此时输出:
```
i am in promise
只有err存在时: err: null
当前是在第二个promise.then的接受err函数里面，第二次调用promise.then: null
当前是在第三个promise.then的接受err函数里面,第三次调用promise.then: null

```





