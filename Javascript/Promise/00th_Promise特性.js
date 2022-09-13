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

//异步任务的完成与否 取决于当前 promise 的状态
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

