/*
* uniteUnique([1, 3, 2], [5, 2, 1, 4], [2, 1])
* 应返回 [1, 3, 2, 5, 4]。
*
* uniteUnique([1, 2, 3], [5, 2, 1]) 应返回 [1, 2, 3, 5]。
*
* uniteUnique([1, 2, 3], [5, 2, 1, 4], [2, 1], [6, 7, 8])
* 应返回 [1, 2, 3, 5, 4, 6, 7, 8]。
*
* 数组去重固定写法
* // Use to remove duplicate elements from the array
const numbers = [2,3,4,4,2,3,3,4,4,5,5,6,6,7,5,32,3,4,5]
console.log([...new Set(numbers)])
// [2, 3, 4, 5, 6, 7, 32]

* */

function uniteUnique(...arr) {
  const array = [].concat(...arr);

  return [...new Set(array)];
}

console.log(uniteUnique([1, 3, 2], [5, 2, 1, 4], [2, 1]));
;

function uniteUnique1(arr) {
  var args = [...arguments];
  var result = [];
  for (var i = 0; i < args.length; i++) {
    for (var j = 0; j < args[i].length; j++) {
      if (!result.includes(args[i][j])) {
        result.push(args[i][j]);
      }
    }
  }
  return result;
}

console.log(uniteUnique1([1, 3, 2], [5, 2, 1, 4], [2, 1]));;