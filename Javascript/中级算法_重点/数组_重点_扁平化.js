//https://singsing.io/blog/fcc/intermediate-steamroller/
function steamrollArray1(arr) {
  let newarr = [];

  function helper(arg) {
    if (!Array.isArray(arg)) {
      newarr.push(arg)
    } else {
      //map暗含了对arg中的每个参数进行操作，所以没有用for循环
      return arg.map(helper)
    }
  }

  helper(arr);
  return newarr;

}

console.log(steamrollArray1([1, [2], [3, [[4]]]]));

/*
help函数的处理:
在这个函数中，处理的思路是：
  如果传入的参数不是数组，那么就把它添加到结果中
  如果传入的参数是数组，那么就对这个数组中的每一个元素都再执行一遍 helper 方法


  如果我们传入的 arg 是 [1, 2]，那我们就分别对 1 和 2 调用一次 helper，
  这时候就会给 result 添加上 1 和 2。这也就是我们上面说的 “深入一步” 的情景

  如果我们传入的 arg 是 [1, [2, 3]]，我们还是要分别对 1 和 [2, 3] 调用一次 helper，
  这时候就会给 result 添加上 1。但由于后面的 [2, 3] 是一个数组，因此不会直接添加。
  而是走到了 else 里，再对 [2, 3] 中的 2 和 3 调用一次 helper，
  然后才会把 2 和 3 添加到 result。这也就是我们上面说的 “深入两步” 的情景
* */