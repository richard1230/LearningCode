/*
split方法将一个字符串分割成一个字符串数组。 它需要一个参数作为分隔符，
它可以是用于拆分字符串或正则表达式的一个字符。 举个例子，如果分隔符是空格，
你会得到一个单词数组；如果分隔符是空字符串，你会得到一个由字符串中每个字符组成的数组。

下面是两个用空格分隔一个字符串的例子，另一个是用数字的正则表达式分隔：

const str = "Hello World";
const bySpace = str.split(" ");

const otherString = "How9are7you2today";
const byDigits = otherString.split(/\d/);
bySpace 将有值 ["Hello", "World"]，byDigits 将有值 ["How", "are", "you", "today"]。

* */

const str = "Hello World";
const bySpace = str.split(" ");
console.log(bySpace)

const otherString = "How9are7you2today";
const byDigits = otherString.split(/\d/);

console.log(byDigits)


function splitify(str) {
  // 只修改这一行下面的代码

  return str.split(/\W/)

  // 只修改这一行上面的代码
}

console.log(splitify("Hello World,I-am code"));;



function geturlParam(sParam) {
  var sPageURL = 'q=#血氧仪对农村意味着什么#&t=31&band_rank=2&Refer=top',
    sURLVariables = sPageURL.split('&'),
    sParameterName,
    i;
  for (i = 0; i < sURLVariables.length; i++) {
    sParameterName = sURLVariables[i].split('=');

    if (sParameterName[0] === sParam) {
      var x = decodeURIComponent(sParameterName[1])
      return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
    }
  }
}


console.log(geturlParam('t'))


function getQueryParamByName(e) {
  // var t = window.location.href;
  var t1 = 'https://s.weibo.com/weibo?q=%23iPhone15Pro%E6%9C%BA%E5%9E%8B%E4%BC%9A%E6%9C%896%E5%A4%A7%E7%8B%AC%E5%8D%A0%E5%8A%9F%E8%83%BD%23&t=31&band_rank=4&Refer=top'
  e = e.replace(/[\[\]]/g, "\\$&");
  var a = new RegExp("[?&]" + e + "(=([^&#]*)|&|#|$)").exec(t1);
  return a ? a[2] ? decodeURIComponent(a[2].replace(/\+/g, " ")) : "" : null
}

console.log(getQueryParamByName('t'))


