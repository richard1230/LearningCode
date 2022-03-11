// https://chinese.freecodecamp.org/learn/javascript-algorithms-and-data-structures/basic-data-structures/iterate-through-all-an-arrays-items-using-for-loops

/*
已经定义了 filteredArray 函数，
它接受一个嵌套的数组 arr 和一个 elem 作为参数，
并要返回一个新数组。
 arr 数组中嵌套的数组里可能包含 elem 元素，也可能不包含。
请修改该函数，用一个 for 循环来做筛选，
使函数返回一个由 arr 中不包含 elem 的数组所组成的新数组。

filteredArray([[10, 8, 3], [14, 6, 23], [3, 18, 6]], 18)
应返回 [[10, 8, 3], [14, 6, 23]]。

filteredArray([["trumpets", 2], ["flutes", 4], ["saxophones", 2]], 2)
应返回 [["flutes", 4]]。

filteredArray([["amy", "beth", "sam"], ["dave", "sean", "peter"]], "peter")
应返回 [["amy", "beth", "sam"]]。

filteredArray([[3, 2, 3], [1, 6, 3], [3, 13, 26], [19, 3, 9]], 3)
应返回 []。

filteredArray 函数中应使用 for 循环。
* */

function filteredArray(arr, elem) {
  let newArr = [];
  // 只修改这一行下面的代码
  for(let i = 0; i < arr.length;i++){
    if (arr[i].indexOf(elem) == -1){
       newArr.push(arr[i]);
    }
  }
  // 只修改这一行上面的代码
  return newArr;
}

console.log(filteredArray([[3, 2, 3], [1, 6, 3], [3, 13, 26], [19, 3, 9]], 3));
// console.log(filteredArray([[1, 2, 4], [1, 6, 3], [3, 13, 26], [19, 3, 9]], 3));