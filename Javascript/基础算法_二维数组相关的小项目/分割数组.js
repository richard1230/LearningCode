/*
请编写一个函数，该函数将一个数组（第一个参数）拆分成若干长度为 size（第二个参数）的子数组，
并将它们作为二维数组返回。

chunkArrayInGroups(["a", "b", "c", "d"], 2) 应返回 [["a", "b"], ["c", "d"]]。

chunkArrayInGroups([0, 1, 2, 3, 4, 5], 3) 应返回 [[0, 1, 2], [3, 4, 5]]。

chunkArrayInGroups([0, 1, 2, 3, 4, 5,6], 3) ===>  将前面一个数组拆分为若干个长度为3的二维数组

思路:

* */

function chunkArrayInGroups(arr, size) {
  let newArr = [];
  for (let i = 0; i <arr.length ; i+=size) {
    newArr.push(arr.slice(i,i+size));
  }
  return newArr;
}

console.log(chunkArrayInGroups([0, 1, 2, 3, 4, 5,6], 3));
