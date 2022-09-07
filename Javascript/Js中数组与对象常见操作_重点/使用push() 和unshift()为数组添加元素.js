

/*
push() 方法会将元素插入到数组的末尾，
而 unshift() 方法会将元素插入到数组的开头。
请看以下例子：

let twentyThree = 'XXIII';
let romanNumerals = ['XXI', 'XXII'];

romanNumerals.unshift('XIX', 'XX');
romanNumerals 的值就变成了['XIX', 'XX', 'XXI', 'XXII']。

romanNumerals.push(twentyThree);
romanNumerals 的值现在就变成了 ['XIX', 'XX', 'XXI', 'XXII', 'XXIII']。
请注意这里，我们也可以使用变量作为参数，这让我们在动态修改数组数据时更加灵活
* */

function mixedNumbers(arr) {
  // 只修改这一行下面的代码
   arr.unshift('I', 2, 'three');
   arr.push(7, 'VIII', 9);
  // 只修改这一行上面的代码
  return arr;
}

console.log(mixedNumbers(['IV', 5, 'six']));


// let Errors ={}
//
// Errors