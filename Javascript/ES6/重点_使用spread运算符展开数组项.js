const arr1 = ['JAN', 'FEB', 'MAR', 'APR', 'MAY'];
let arr2;

arr2 = [...arr1];  // 修改这一行

console.log(arr2);

/*

ES6 引入了展开操作符，可以展开数组以及需要多个参数或元素的表达式。

下面的 ES5 代码使用了 apply() 来计算数组的最大值：

var arr = [6, 89, 3, 45];
var maximus = Math.max.apply(null, arr);
maximus 的值为 89。

我们必须使用 Math.max.apply(null, arr)，
因为 Math.max(arr) 返回 NaN。 Math.max() 函数中需要传入的是一系列由逗号分隔的参数，
而不是一个数组。 展开操作符可以提升代码的可读性，使代码易于维护。

const arr = [6, 89, 3, 45];
const maximus = Math.max(...arr);
maximus 的值应该是 89。


...arr 返回一个解压的数组。 也就是说，它展开数组。
然而，展开操作符只能够在函数的参数中或者数组中使用。
下面的代码将会报错：
const spreaded = ...arr;
使用展开操作符将 arr1 中的内容都复制到 arr2 中去。

* */