let fs = require('fs');

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

readFile('./name.txt', 'utf-8')
  .then(res => readFile(res, 'utf-8'))
  .then(res => readFile(res, 'utf-8'))
  .then(res => console.log(res))

//name.txt --> ./number.txt
//number.txt ----> ./score.txt
//score.txt -----> richard---> I am in score.txt

//输出:
// richard---> I am in score.txt


