// https://wangdoc.com/javascript/async/promise.html#

function f3(res) {
  console.log("this is in  f3 :" + (res + 3));
  return res + 3
}


function f2(res) {
  console.log("this is in f2:" + (res + 2));
  return res + 2
}

let f1 = new Promise((resolve, reject) => {
  resolve(1);
})

// f1.then(res=>console.log(res))//1

// f1.then(function (res) {
//   return f2(res);
// }).then(f3)
// this is in f2:3
// this is in  f3 :6

// f1.then(function (res) {
//   f2(res)
// }).then(f3)

// this is in f2:3
// this is in  f3 :NaN

// f1.then(f2()).then(f3)
// this is in f2:NaN
// this is in  f3 :4

f1.then(f2).then(f3)

// this is in f2:3
// this is in  f3 :6



