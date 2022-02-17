const makeServerRequest = new Promise((resolve, reject) => {
  // responseFromServer 设置为 true，表示从服务器获得有效响应
  let responseFromServer = true;

  if (responseFromServer) {
    resolve("We got the data");
  } else {
    reject("Data not received");
  }
});
// 用then处理Promise完成的情况

makeServerRequest.then(result => {
  console.log(result);
});

makeServerRequest.catch(error => {
  console.log(error);
});

/*
当程序需要花费未知的时间才能完成时（比如一些异步操作），
一般是服务器请求，promise 很有用。
 服务器请求会花费一些时间，当结束时，需要根据服务器的响应执行一些操作。
 这可以用 then 方法来实现， 当 promise 完成 resolve 时会触发 then 方法。
  例子如下：

myPromise.then(result => {

});
result 即传入 resolve 方法的参数



使用catch处理Promise失败的情况
当 promise 失败时会调用 catch 方法。
当 promise 的 reject 方法执行时会直接调用。 用法如下：

myPromise.catch(error => {
});
error 是传入 reject 方法的参数。







* */