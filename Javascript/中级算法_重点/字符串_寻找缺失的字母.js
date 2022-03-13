/*
我们肯定要先遍历字符串。只要找到不连续的，
直接返回结果就可以了，不用继续判断。
如果找到字符串最后，还是连续的，那么我们就返回 undefined


至于如何判断是否连续，由于传入的字符串全都是小写，
那我们可以通过字符串的 charCodeAt 方法得到 ASCII 码，
然后比较一下是否差 1 就可以了


但是需要注意，由于返回值是缺失的字符，
因此我们还要通过 fromCharCode 来得到返回值
* */

function fearNotLetter(str) {
  for (let i = 0; i < str.length; i++) {
    let curcode = str[i].charCodeAt()
    let nextcode = str[i + 1].charCodeAt();
    if (curcode !== nextcode - 1) {
      let missingword = String.fromCharCode(curcode + 1);
      let newarr = str.split('');
      newstr1 = newarr.splice(i + 1, 0, missingword)
      // return newarr.join('');  //返回完整的字符串
      return missingword;
    }


  }

  // return str;
}

console.log(fearNotLetter("abce"));



