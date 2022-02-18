/*
"Hello, World!".match(/Hello/);
Array [ "Hello" ]

/Hello/.test("Hello, World!")
true

.match 语法是目前为止一直使用的 .test 方法中的“反向”：
'string'.match(/regex/);
/regex/.test('string');
* */

let extractStr = "Extract the word 'coding' from this string.";
let codingRegex = /coding/; // 修改这一行
let result = extractStr.match(codingRegex); // 修改这一行
console.log(result);

//全局匹配
/*
到目前为止，只能提取或搜寻一次模式匹配。

let testStr = "Repeat, Repeat, Repeat";
let ourRegex = /Repeat/;
testStr.match(ourRegex);
在这里 match 将返回 ["Repeat"]。

若要多次搜寻或提取模式匹配，可以使用 g 标志。

let repeatRegex = /Repeat/g;
testStr.match(repeatRegex);
这里 match 返回值 ["Repeat", "Repeat", "Repeat"]


使用正则表达式 starRegex，从字符串 twinkleStar 中匹配所有的 Twinkle 单词并提取出来。

注意：
在正则表达式上可以有多个标志，比如 /search/gi
 */

let twinkleStar = "Twinkle, twinkle, little star";
let starRegex = /Twinkle/gi; // 修改这一行
let result1 = twinkleStar.match(starRegex); // 修改这一行
console.log(result1);


//匹配出现零次或多次的字符
let chewieQuote = "Aaaaaaaaaaaaaaaarrrgh!";
let chewieRegex = /Aa*/; // 修改这一行
// 只修改这一行上面的代码

let result2 = chewieQuote.match(chewieRegex);
console.log(result2);

//用惰性匹配来查找字符
// 可以将正则表达式 /t[a-z]*i/ 应用于字符串 "titanic"。
// 这个正则表达式是一个以 t 开始，以 i 结束，并且中间有一些字母的匹配模式。
// 正则表达式默认是贪婪匹配，因此匹配返回为 ["titani"],
// 它会匹配到适合该匹配模式的最大子字符串。

// 但是，你可以使用 ? 字符来将其变成懒惰匹配。
// 调整后的正则表达式 /t[a-z]*?i/ 匹配字符串 "titanic" 返回 ["ti"]。

let text = "<h1>Winter is coming</h1>";
let myRegex = /<.*?>/; // 修改这一行
let result3 = text.match(myRegex);
console.log(result3);


//匹配字符串的开头
//^ 的另外一个功能:
/*

在之前的挑战中，使用字符集中前插入符号（^）来创建一个否定字符集，
形如 [^thingsThatWillNotBeMatched]。
除了在字符集中使用之外，脱字符还用于匹配字符串的开始位置。

let firstString = "Ricky is first and can be found.";
let firstRegex = /^Ricky/;
firstRegex.test(firstString);
let notFirst = "You can't find Ricky now.";
firstRegex.test(notFirst);
第一次 test 调用将返回 true，而第二次调用将返回 false。

*/
let rickyAndCal = "Cal and Ricky both like racing.";
let calRegex = /^Cal/; // 修改这一行
let result0 = calRegex.test(rickyAndCal);
console.log(result0);





