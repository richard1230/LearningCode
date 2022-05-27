let promise = new Promise(function (resolve, reject) {
    console.log('i am in Promise');
    resolve('i am in Promise and in resolve bracket')
  }
)


setTimeout(function () {
  console.log('i am in settimeout')
}, 0)


promise.then(function (data) {
  console.log(data)
})


console.log('hello')

/*
i am in Promise
hello
i am in Promise and in resolve bracket
i am in settimeout
*/





