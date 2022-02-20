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