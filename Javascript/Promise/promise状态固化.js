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

      }, function (err) {
        console.log('当前是在第二个promise.then的接受err函数里面，第二次调用promise.then: ' + err)
        promise.then(function () {

        }, function (err) {
          console.log('当前是在第三个promise.then的接受err函数里面,第三次调用promise.then: ' + err)
        })
      }
    )
  })