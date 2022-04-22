var arr = [1, 2, 3,4];

var str = '123';

var obj = {a: 1, b: 2};

for (let i = 0; i < arr.length; i++) {
  console.log(arr[i])
}

for (let i = 0; i < str.length; i++) {
  console.log(str[i])
}


arr.forEach(function (item) {
  console.log(item)
})

for (var i in obj) {
  console.log(i, obj[i]);
}

//有没一种方式实现不同类型的数据用同一种遍历方法--->迭代


//遍历和迭代的区别


// var obj = {
//   a:1,
//   b:2,
//   c:3,
//   [Symbol.iterator](){
//     var index = 0;
//     let map = new Map();
//     map.set('a',1);
//     map.set('b',2);
//     map.set('c',3);
//     console.log(map)
//     return {
//       next(){
//         var mapEntries = [...map.entries()];
//         if(index < map.size){
//           return {
//             value: mapEntries[index++],done:false
//           }
//         }
//         return {value: undefined,done: true}
//       }
//     }
//   }
// }
//
// for (const i in obj) {
//   console.log(i);
//   console.log( typeof i);
//
// }
// let map = new Map();
// map.set('a',1);
// map.set('b',2);
// map.set('c',3);
// console.log(map)//Map(3) { 'a' => 1, 'b' => 2, 'c' => 3 } ;
// // 0: a → 1
// // 1: b → 2
// // 2: c → 3
//
// console.log(new Set([1,2,3,4,5]))//Set(5) { 1, 2, 3, 4, 5 }
// //0: 1
// // 1: 2
// // 2: 3
// // 3: 4
// // 4: 5
//
