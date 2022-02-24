//找出字符串中的最长单词的长度
function findLongestWordLength(str) {
  let words = str.split(" ");//注意:这里引号里面需要空很大
  let maxlength = 0;
  for (let i = 0; i < words.length; i++) {
    if (words[i].length > maxlength) {
      maxlength = words[i].length;
    }
  }

  return maxlength;
}

console.log(findLongestWordLength("The quick brown fox jumped over the lazy dog"));
;

//方法2
function findLongestWordLength2(s) {
  return s.split(' ')
    .reduce(function (longest, word) {
      return Math.max(longest, word.length)
    }, 0);
}


function findLongestWordLength3(str) {
  return Math.max(...str.split(" ").map(word => word.length));
}