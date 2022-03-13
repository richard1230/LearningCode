/*
* uniteUnique([1, 3, 2], [5, 2, 1, 4], [2, 1])
* 应返回 [1, 3, 2, 5, 4]。
*
* uniteUnique([1, 2, 3], [5, 2, 1]) 应返回 [1, 2, 3, 5]。
*
* uniteUnique([1, 2, 3], [5, 2, 1, 4], [2, 1], [6, 7, 8])
* 应返回 [1, 2, 3, 5, 4, 6, 7, 8]。
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

uniteUnique1([1, 3, 2], [5, 2, 1, 4], [2, 1]);