let fs = require('fs');
let co = require('co')

function promisify(fn) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      fn(...args, (err, data) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(data)
      })
    })
  }
}

let readFile = promisify(fs.readFile)

// promise的链式写法:
// readFile('./name.txt', 'utf-8')
//   .then(res => readFile(res, 'utf-8'))
//   .then(res => readFile(res, 'utf-8'))
//   .then(res => console.log(res))


// function* read() {
//   let value1 = yield  readFile('./name.txt','utf-8')
//   let value2 = yield  readFile(value1,'utf-8');
//   let value3 = yield  readFile(value2,'utf-8');
//   return value3;
// }

async function readSync() {
  let value1 = await readFile('./name.txt', 'utf-8');
  let value2 = await readFile(value1, 'utf-8');
  let value3 = await readFile(value2, 'utf-8');
  return value3;
}

// let promise = co(read());
let promise = co(readSync());
promise.then(res => {
  console.log("利用Co得到的promise: " + res)
})
//利用Co得到的promise: richard---> I am in score.txt

//co 模块 伪代码
// function Co(iter) {
//   return new Promise((resolve, reject)=>{
//     console.log("Co 里面")
//     let next = function (data) {
//       let {value, done} = iter.next(data);
//       if(done){
//         resolve
//       }else {
//         value.then(val =>{
//           next(val)
//         },reject)
//       }
//     }
//     next();
//   })
// }

