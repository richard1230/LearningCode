// let p1 = Promise.resolve({a: "I am p1, i am in resolve"});
//
// let p2 = Promise.resolve({b: "I am p2, i am in resolve"});
//
// p1.then(function (data) {
//   console.log("==================p1 的 then=====================")
//   console.log(data)//{ a: 'I am p1, i am in resolve' }
//   console.log("==================p1 的 then=====================")
// })
//
//
// // p2.then(function () {
// //
// // }, function (err) {
// //   console.log("err :" + err)
// //   console.log("=======================================")
// //
// // })
//
// p2.catch(function (err) {
//   console.log("err :" + err);
//   console.log("===============p2 的catch========================")
// })

// { a: 'I am p1, i am in resolve' }


// thenable对象
// let obj = {
//    then(resolve,reject){
//       resolve("I am in resolve")
//    }
// }
//
// let p11 = Promise.resolve(obj)
//
//
// p11.then(
//   function (data) {
//     console.log("================p11 的 then=======================")
//     console.log(data)
//      console.log("================p11 的 then=======================")
//   },function (err) {
//      console.log(" i am in p11.then err : "+err)
//   }
// )

// ================p11 的 then=======================
// I am in resolve
// ================p11 的 then=======================


// let obj = {
//   then(resolve,reject){
//     reject("I am in reject")
//   }
// }
//
// let p11 = Promise.resolve(obj)
//
//
// p11.then(
//   function (data) {
//     console.log("================p11 的 then=======================")
//     console.log(data)
//     console.log("================p11 的 then=======================")
//   },function (err) {
//     console.log(" i am in p11.then err : "+err)
//   }
// )

// i am in p11.then err : I am in reject

// let obj = {
//   then(resolve,reject){
//     resolve("I am in resolve")
//   }
// }
//
// let p11 = Promise.reject(obj)
//
//
// p11.then(
//   function (data) {
//     console.log("================p11 的 then=======================")
//     console.log(data)
//     console.log("================p11 的 then=======================")
//   },function (err) {
//     console.log(" i am in p11.then err : "+err)
//   }
// )

// i am in p11.then err : [object Object]

let obj = {
  then(resolve,reject){
    reject("I am in resolve")
  }
}

let p11 = Promise.reject(obj)


p11.then(
  function (data) {
    console.log("================p11 的 then=======================")
    console.log(data)
    console.log("================p11 的 then=======================")
  },function (err) {
    console.log(" i am in p11.then err : "+err)
  }
)

// i am in p11.then err : [object Object]



// let obj1 = {
//    then(resolve,reject){
//       reject("I am in obj1 reject")
//    }
// }
//
// let p22 = Promise.resolve(obj1)
//
//
// p22.then(
//   function (data) {
//      console.log("I am in p22.then data : "+data)
//   },function (err) {
//      console.log("i am in p22.then err : "+err)
//      console.log("================p22  的   then=======================")
//   }
// )
// // i am in p22.then err : I am in obj1 reject
//
// let obj3 = {
//    then(resolve,reject){
//       reject("I am in obj3 reject")
//    }
// }
//
// let p33 = Promise.reject(obj3)
//
//
// p33.then(
//   function (data) {
//      console.log("I am in p33.then data : "+data)
//   },
//
//   function (err) {
//      console.log(err)//{ then: [Function: then] }
//      console.log("================p33=======================")
//   }
// )
