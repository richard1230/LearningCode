// slice() 不会修改数组，而是会复制，或者说*提取（extract）*给定数量的元素到一个新数组。
// slice() 只接收 2 个输入参数：第一个是开始提取元素的位置（索引），
// 第二个是提取元素的结束位置（索引）。 提取的元素中不包括第二个参数所对应的元素。 如下示例：
//
// let weatherConditions = ['rain', 'snow', 'sleet', 'hail', 'clear'];
//
// let todaysWeather = weatherConditions.slice(1, 3);
// todaysWeather 值为 ['snow', 'sleet']，
// weatherConditions 值仍然为 ['rain', 'snow', 'sleet', 'hail', 'clear']。

function forecast(arr) {
  // 只修改这一行下面的代码
  arr = arr.slice(2, 4);
  return arr;
}

// 只修改这一行上面的代码
console.log(forecast(['cold', 'rainy', 'warm', 'sunny', 'cool', 'thunderstorms']));


//使用展开运算符复制数组
// 展开运算符（spread operator），它能让我们方便地复制数组中的所有元素。
// 展开语法写出来是这样：...
let thisArray = [true, true, undefined, false, null];
let thatArray = [...thisArray];
console.log(thatArray);//[ true, true, undefined, false, null ]


/*
copyMachine([true, false, true], 2) 应返回 [[true, false, true], [true, false, true]]。

copyMachine([1, 2, 3], 5) 应返回 [[1, 2, 3], [1, 2, 3], [1, 2, 3], [1, 2, 3], [1, 2, 3]]。

copyMachine([true, true, null], 1) 应返回 [[true, true, null]]。

copyMachine(["it works"], 3) 应返回 [["it works"], ["it works"], ["it works"]]。
* */

function copyMachine(arr, num) {
  let newArr = [];
  while (num >= 1) {
    // 只修改这一行下面的代码
    newArr.push([...arr])
    // 只修改这一行上面的代码
    num--;
  }
  return newArr;
}

console.log(copyMachine([true, false, true], 2));
