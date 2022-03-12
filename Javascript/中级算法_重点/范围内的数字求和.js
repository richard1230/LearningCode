/*
sumAll([4,1]) 应返回 10，
因为从 1 到 4（包含 1、4）的所有数字的和是 10。
sumAll([4, 1]) 应返回 10。
sumAll([5, 10]) 应返回 45。

* */

function sumAll(arr) {
  let max = Math.max(arr[0],arr[1]);
  let min = Math.min(arr[0],arr[1])
  let between = 0;
  for (let i = min; i<=max;i++){
      between += i;
  }
  return between;
}

console.log(sumAll([1, 4]));;

