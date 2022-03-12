/*
* 儿童黑话也叫 Pig Latin，是一种英语语言游戏。 规则如下：

- 如果单词以辅音开头，就把第一个辅音字母或第一组辅音簇移到单词的结尾，并在后面加上 ay。

- 如果单词以元音开头，只需要在结尾加上 way。
*
* translatePigLatin("california") 应该返回字符串 aliforniacay。


* translatePigLatin("glove") 应该返回字符串 oveglay。

translatePigLatin("schwartz") 应该返回字符串 artzschway
* 
* translatePigLatin("eight") 应该返回字符串 eightway。
*
* translatePigLatin("rhythm") 应该返回字符串 rhythmay。


*
*
* */

function translatePigLatin(str) {
  let alpha = "";

  let regex = /[aeiou]/gi;

  if (str[0].match(regex) !== null) {
    alpha = str + "way";
  } else if (str.match(regex) === null) {
    alpha = str + "ay";
  } else {
    let index = str.indexOf(str.match(regex)[0])
    alpha = str.slice(index) + str.slice(0, index) + "ay"
  }

  return alpha;
}

console.log(translatePigLatin("consonant"));

console.log(translatePigLatin("algorithm"));

console.log(translatePigLatin("glove"));

