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



