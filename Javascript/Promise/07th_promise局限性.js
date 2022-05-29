
let p = Promise.resolve(42);
p.then(function (message) {
  //数字没有string函数，所以这里会抛出错误
  console.log(message.toLowCase())
},function reject(err) {
   //这里永远接受不到上面message.toLowCase()的错误
})

