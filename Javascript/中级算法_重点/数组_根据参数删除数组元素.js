/*
* 这个 function 接受一个数组参数 arr 和一个函数参数 func。
* 返回值为 arr 第一个满足参数 func 的元素及其之后的所有元素
*
如果 arr 是 [1, 2, 3, 4]，func 是 function(n) {return n >=3;}，
* 那么此时返回值应为 [3, 4]
*
更值得关注的是这样的情况，如果 arr 是 [0, 1, 0, 1]，func 是 function(n) {return n === 1;}，
* 那么此时返回值应为 [1, 0, 1]
* */


function dropElements(arr, func) {
  for (let i = 0; i < arr.length; i++) {
    if (func(arr[i])) {
      return arr.slice(i)
    }
  }
  return [];

}

// console.log(dropElements([1, 2, 3], function (n) {
//   return n < 3;
// }));;

console.log(dropElements([1, 2, 3, 4], function (n) {
  return n >= 3;
}));

//深拷贝
var arr = [1, 2, 3, 4];
var shallowCopy = arr;
var hardCopy = arr.slice();

// arr.shift();
console.log("深拷贝");
console.log(shallowCopy, hardCopy);
