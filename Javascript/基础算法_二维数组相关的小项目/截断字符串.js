/*
截断字符串
如果传入的字符串（第一个参数）的长度大于传入的值（第二个参数），
请在这个位置截断它， 并在后面加上 ...，然后返回结果。

truncateString("A-tisket a-tasket A green and yellow basket", 8)
 应返回 A-tisket...。

truncateString("Peter Piper picked a peck of pickled peppers", 11)
应返回 Peter Piper...。
* */

function truncateString(str, num) {
  if (str.length > num){
    return str.slice(0,num)+"..."
  }else {
    return str;
  }
}

console.log(truncateString("A-tisket a-tasket A green and yellow basket", 8));;