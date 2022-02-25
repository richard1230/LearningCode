/*
找出多个数组中的最大数字
请返回一个数组，该数组由参数中每个子数组中的最大数字组成。
为简单起见，给出的数组总会包含 4 个子数组。

largestOfFour([[4, 5, 1, 3], [13, 27, 18, 26], [32, 35, 37, 39], [1000, 1001, 857, 1]]) 应返回一个数组。

largestOfFour([[13, 27, 18, 26], [4, 5, 1, 3], [32, 35, 37, 39], [1000, 1001, 857, 1]])
 应返回 [27, 5, 39, 1001]。

largestOfFour([[4, 9, 1, 3], [13, 35, 18, 26], [32, 35, 97, 39], [1000000, 1001, 857, 1]])
应返回 [9, 35, 97, 1000000]。
* */

function largestOfFour(arr) {
  let results = [];
  for (let i = 0; i < arr.length; i++) {
    let largestNumber = arr[i][0];
    for (let j = 1; j < arr[i].length; j++) {
      if (arr[i][j] > largestNumber) {
        largestNumber = arr[i][j];
      }
    }
    results[i] = largestNumber;
  }

  return results;
}

console.log(largestOfFour([[4, 5, 1, 3], [13, 27, 18, 26],
  [32, 35, 37, 39], [1000, 1001, 857, 1]]));
;


