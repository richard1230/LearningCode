/*
本挑战的输入参数为两个数组和一个索引值。

将第一个数组中的所有元素依次复制到第二个数组中。

请注意，你需要从第二个数组索引值为 n 的地方开始插入。

最后，请返回插入元素后的数组。 作为输入参数的两个数组在函数执行前后应保持不变。
var str="Hello world!";
var n=str.slice(1,5);
ello
===================== ===================== =====================
const startIndex = 3;         //删除的起始位置,从0开始
const amountToDelete = 1;     //删除的数的个数

numbers.splice(startIndex, amountToDelete, 13, 14);
numbers.splice(3, 1, 13, 14);//如果没有13，14,就表示删除

console.log(numbers);
第二个 12 已被删除，我们在同一索引处添加 13 和 14。
===================== ===================== =====================
思路:

1.向arr2下标为n的地方每次加入一个arr1的元素;
2.挨个遍历
3.实现了在arr2指定的位置处加入了arr1

* */
function frankenSplice(arr1, arr2, n) {
  let localArray = arr2.slice();
  for (let i = 0; i < arr1.length; i++) {
    localArray.splice(n, 0, arr1[i])
    n++;
  }
  return localArray;
}

console.log(frankenSplice([1, 2, 3], [4, 5, 6], 1));
;

