function smallestCommons1(arr) {
  return arr;
}

// function smallestCommons(arr) {
//   const [min, max] = arr.sort((a, b) => a - b);
//   const numberDivisors = max - min + 1;
//   // Largest possible value for SCM
//   let upperBound = 1;
//   for (let i = min; i <= max; i++) {
//     upperBound *= i;
//   }
//   // Test all multiples of 'max'
//   for (let multiple = max; multiple <= upperBound; multiple += max) {
//     // Check if every value in range divides 'multiple'
//     let divisorCount = 0;
//     for (let i = min; i <= max; i++) {
//       // Count divisors
//       if (multiple % i === 0) {
//         divisorCount += 1;
//       }
//     }
//     if (divisorCount === numberDivisors) {
//       return multiple;
//     }
//   }}


function smallestCommons(arr) {
  var smaller = Math.min(arr[0], arr[1]);
  var greater = Math.max(arr[0], arr[1]);
  var numArr = [];
  // 设置用于保存结果的初始值
  var result = smaller * (smaller + 1);

  // 根据参数生成一个范围内所有数字的数组
  for (var i = smaller; i <= greater; i++) {
    numArr.push(i);
  }

  // 用于获取两个数最小公倍数的方法
  // 其中参数 left 为较小数，right 为较大数
  function getSCM(left, right) {
    // 边界判断
    if (left === 0 || right === 0) {
      return 0;
    }
    if (left === right) {
      return left;
    }

    // 设置 scm(最小公倍数) 初始值为较大数
    var scm = right;

    // 循环，用 scm % left 是否为 0 来判断是不是最小公倍数
    while (scm <= right * left) {
      if (scm % left === 0) {
        return scm;
      }
      scm += right;
    }

    // 外面可以不 return。因为理论上，当 scm 的值为 right * left 的时候，scm % left 是肯定为 0 的
  }

  for (var i = 2; i < numArr.length; i++) {
    // 显然，要么 result 和 numArr[i] 相等，要么 result 大于 numArr[i]
    result = getSCM(numArr[i], result);
  }

  return result;
}

console.log(smallestCommons([1, 5]));


/*
首先，根据传入的数组参数，取出较大值和较小值，方便后续操作

生成数组那里应该不用多说。至于初始值的设置，
原因在于，n 与 n + 1 的最小公倍数一定是 n * (n + 1)。
这样，我们只要把这个结果带到第三个数 (索引为 2) 继续计算就好了

至于求两个数最小公倍数的方法，比如 n 和 m，我们只需要去测试 n、2n、3n、4n……是否能被 m 整除。
当然，试到 m * n 就够了，因为这个数肯定能被 m 整除

当然，n 和 m 都不能为 0。这个要进行边界判断

如果还有细节想不明白的，再看一下代码中的注释吧
* */