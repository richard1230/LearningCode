/*
数组的对称差
比较两个数组并返回一个新数组，包含所有只在其中一个数组中出现的元素，
排除两个数组都存在的元素。 换言之，我们需要返回两个数组的对称差。
**注意：**返回数组中的元素顺序不会影响挑战的测试结果
* */

function diffArray(arr1, arr2) {
  const newArr = [];

  function onlyfirst(one, two) {
    for (let i = 0; i < two.length; i++) {
      if (one.indexOf(two[i]) == -1) {
        newArr.push(two[i])
      }
    }
  }

  onlyfirst(arr1, arr2)
  onlyfirst(arr2, arr1)
  return newArr;
}

function diffArray2(arr1, arr2) {
  return arr1.concat(arr2).filter(item => !arr1.includes(item) || !arr2.includes(item));
}

function diffArray3(arr1, arr2) {
  function diff(a, b) {
    return a.filter(item => b.indexOf(item) === -1)
  }

  return [...diff(arr1, arr2), ...diff(arr2, arr1)];
}


console.log(diffArray([1, 2, 3, 5], [1, 2, 3, 4, 5]));
;
console.log(diffArray2([1, 2, 3, 5], [1, 2, 3, 4, 5]));
;
console.log(diffArray3([1, 2, 3, 5], [1, 2, 3, 4, 5]));
