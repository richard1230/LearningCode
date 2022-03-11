/*
sort方法可以根据回调函数对数组元素进行排序。

举个例子：

function ascendingOrder(arr) {
  return arr.sort(function(a, b) {
    return a - b;
  });
}

ascendingOrder([1, 5, 2, 3, 4]);
这将返回值 [1, 2, 3, 4, 5]。

function reverseAlpha(arr) {
  return arr.sort(function(a, b) {
    return a === b ? 0 : a < b ? 1 : -1;
  });
}

reverseAlpha(['l', 'h', 'z', 'b', 's']);
这将返回值 ['z', 's', 'l', 'h', 'b']。

JavaScript 的默认排序方法是 Unicode 值顺序排序，有时可能会得到意想不到的结果。
 因此，建议提供一个回调函数来指定如何对数组项目排序。 这个回调函数通常叫做 compareFunction，它根据 compareFunction 的返回值决定数组元素的排序方式： 如果两个元素 a 和 b，compareFunction(a,b) 返回一个比 0 小的值，那么 a 会在 b 的前面。 如果两个元素 a 和 b，compareFunction(a,b) 返回一个比 0 大的值，那么 b 会在 a 的前面。 如果两个元素 a 和 b，compareFunction(a,b) 返回等于 0 的值，那么 a 和 b 的位置保持不变。

在 alphabeticalOrder 函数中使用 sort 方法对 arr 中的元素按照字母顺序排列。
 该函数应返回一个排序的数组。
* */
function alphabeticalOrder(arr) {
  // 只修改这一行下面的代码

  return arr.sort(function (a, b) {
    return a == b ? 0 : a < b ? -1 : 1;
  })
  // 只修改这一行上面的代码
}

arr = ["a", "d", "c", "a", "z", "g"]
console.log(alphabeticalOrder(arr));
console.log(arr);//注意:原始数组arr改变了


console.log("==============在不更改原始数组的前提下返回排序后的数组\n=======================");


const globalArray = [5, 6, 3, 2, 9];

function nonMutatingSort(arr) {
  // 只修改这一行下面的代码

  return [].concat(arr).sort(function (a, b) {
    return a - b;
  })
  // 只修改这一行上面的代码
}

console.log(nonMutatingSort(globalArray));
console.log(globalArray);//注意:原始数组没有改变





