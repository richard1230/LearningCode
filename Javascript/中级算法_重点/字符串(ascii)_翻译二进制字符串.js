function binaryAgent(str) {
  // 跳出条件
  if (str.length === 0) return;

  var result = "";
  // 双指针
  var left = 0;
  var right = 1;

  while (left < str.length) {
    // 小坑，如果没有后面的条件，则最后一组会执行不到
    if (str[right] === " " || right === str.length) {
      result += binaryToChar(str.slice(left, right));
      // 这里可能有点不清晰。其实就是指针的移动
      // 先把 left 移到当前 right 的右一位，再把 right 移到移动后的 left 右一位
      left = right + 1;
      right = left + 1;
    } else {
      right++;
    }
  }

  // 只是一个逻辑的封装。这个函数作用就是传入一段二进制数字，转成 10 进制，然后根据 ASCII 码输出对应的字符
  function binaryToChar(str) {
    var num = 0;
    for (var i = 0; i < str.length; i++) {
      num += str[i] * Math.pow(2, str.length - i - 1)
    }
    return String.fromCharCode(num);
  }

  return result;
}

console.log(binaryAgent("01000001 01110010 01100101 01101110 00100111 " +
  "01110100 00100000 01100010 01101111 01101110 01100110 " +
  "01101001 01110010 01100101 01110011 00100000 01100110 " +
  "01110101 01101110 00100001 00111111"));


//整体思路:
/*
* 1.用split将字符串分割为一个一个的单独字符串
*
* 2.用将二进制转换为十进制的ascii码
*
* 3.将ascii码转换为字符
*
*
* 双指针思路:
* (以下用 ↑ 表示左边的指针，↓ 表示右边的)

010101 111111 000000
↑↓                   初始状态。此时 if 不满足，right++

010101 111111 000000
↑ ↓                  此时 if 依旧不满足，继续 right++

……

010101 111111 000000
↑     ↓              此时 if 满足，取到第一组

010101 111111 000000
      ↓↑             这是 left = right + 1 执行后的情况

010101 111111 000000
       ↑↓            这是 right = left + 1 执行后的情况。继续 while 循环。此时 if 不满足，right++

010101 111111 000000
       ↑ ↓           ……以此类推
* */


console.log([1, 2, 3].map(parseInt));//[ 1, NaN, NaN ]

/*
* 惊不惊喜？意不意外？其实 parseInt 的第二个参数是 radix (基数)。
* 比如，第二个参数传入 8 就代表第一个参数是八进制的，16 就代表第一个参数是十六进制的。
* 传入 1 是肯定不对的，肯定返回 NaN。如果传入 0 或者不传，那要先看第一个参数的开头。
* 如果是 "0x" 或者 "0X" 开头，则会按十六进制解析；
* 如果是 "0" 开头就会按八进制解析，其余均按照十进制解析
那么我们只要给第二个参数传入 2，就可以直接得到十进制的结果了，代码也变得容易很多
很多朋友应该都想到了，既然空格分割，又是字符串，那我们给它 split 一下就行了。当然，之后我们只要再 map 一次就解决了。别忘了最后要 join
* */


function binaryAgent1(str) {
  return str.split(" ").map(e => String.fromCharCode(parseInt(e, 2))).join('');
}


console.log(binaryAgent1("01000001 01110010 01100101 01101110 00100111 " +
  "01110100 00100000 01100010 01101111 01101110 01100110 " +
  "01101001 01110010 01100101 01110011 00100000 01100110 " +
  "01110101 01101110 00100001 00111111"));

