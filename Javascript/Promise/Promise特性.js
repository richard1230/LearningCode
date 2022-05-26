let fs = require('fs')

function readFile(pathname) {
  return new Promise(function (resolve, reject) {
    console.log("i am in promise");
    fs.readFile(pathname, 'utf-8', function (err, data) {
      if (err) {
        reject(err);
        return;
      }
      resolve(data)
    })
  })
}

let promise = readFile('./name.txt')
//pending 进行中
//rejected 已经失败
//fulfilled 已经成功

promise.then(function (data) {
  console.log("success: " + data);
}, function (error) {
  console.log(error)
})

//fulfilled:
// i am in promise
// success: richard is in name.txt
