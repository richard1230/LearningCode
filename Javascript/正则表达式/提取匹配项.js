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
