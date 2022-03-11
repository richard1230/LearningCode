/*
请将传入的字符串中，每个单词的第一个字母变成大写并返回。
注意除首字母外，其余的字符都应是小写的。

在这个挑战中，我们还需要将诸如 the 和 of 之类的连接词大写。

titleCase("I'm a little tea pot") 应返回 I'm A Little Tea Pot。

titleCase("sHoRt AnD sToUt") 应返回 Short And Stout。

* */

function titleCase(str) {
  return str.toLowerCase().split(" ")
    .map(val => val.replace(val.charAt(0), val.charAt(0).toUpperCase()))
    .join(" ");
}

console.log(titleCase("I'm a little tea pot"));
;

function titleCase1(str) {
  const newTitle = str.split(" ");
  const updatedTitle = [];
  for (let st in newTitle) {
    updatedTitle[st] = newTitle[st][0].toUpperCase() + newTitle[st].slice(1).toLowerCase();
  }
  return updatedTitle.join(" ");
}

console.log(titleCase1("I'm a little tea pot"));
;


