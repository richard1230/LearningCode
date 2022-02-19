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


//匹配字符串的末尾
/*
可以使用正则表达式的美元符号 $ 来搜寻字符串的结尾。

let theEnding = "This is a never ending story";
let storyRegex = /story$/;
storyRegex.test(theEnding);
let noEnding = "Sometimes a story will have to end";
storyRegex.test(noEnding);
第一次 test 调用将返回 true, 而第二次调用将返回 false。
* */
let caboose = "The last car on a train is the caboose";
let lastRegex = /caboose$/; // 修改这一行
let result01 = lastRegex.test(caboose);
console.log(result01);


//匹配所有的字母和数字
/*

使用元字符，可以使用 [a-z] 搜寻字母表中的所有字母。
这种元字符是很常见的，它有一个缩写，但这个缩写也包含额外的字符。

JavaScript 中与字母表匹配的最接近的元字符是\w。
这个缩写等同于[A-Za-z0-9_]。 此字符类匹配大写字母和小写字母以及数字。
注意，这个字符类也包含下划线字符 (_)。

let longHand = /[A-Za-z0-9_]+/;
let shortHand = /\w+/;
let numbers = "42";
let varNames = "important_var";
longHand.test(numbers);
shortHand.test(numbers);
longHand.test(varNames);
shortHand.test(varNames);
上面的 test 都会返回 true。


* */
let quoteSample = "The five boxing wizards jump quickly.";
let alphabetRegexV2 = /\w/g; // 修改这一行
let result02 = quoteSample.match(alphabetRegexV2).length;
console.log(result02);

//匹配除了字母和数字的所有符号
/*

可以使用 \W 搜寻和 \w 相反的匹配模式。
 注意，相反匹配模式使用大写字母。
 此缩写与 [^A-Za-z0-9_] 是一样的。

let shortHand = /\W/;
let numbers = "42%";
let sentence = "Coding!";
numbers.match(shortHand);
sentence.match(shortHand);
第一次 match 调用将返回值 ["%"] 而第二次调用将返回 ["!"]。

*
*/
let quoteSample00 = "The five boxing wizards jump quickly.";
let nonAlphabetRegex = /\W/g; // 修改这一行
let result03 = quoteSample00.match(nonAlphabetRegex).length;
console.log(result03);

//匹配所有数字
let movieName = "2001: A Space Odyssey";
let numRegex = /\d/g; // 修改这一行
let result04 = movieName.match(numRegex).length;
console.log(result04);

//匹配所有非数字
let movieName00 = "2001: A Space Odyssey";
let noNumRegex = /\D/g; // 修改这一行
let result05 = movieName00.match(noNumRegex).length;
console.log(result05);

//限制可能的用户名
/*
需要检索数据库中的所有用户名。 以下是用户在创建用户名时必须遵守的一些简单规则。

用户名只能是数字字母字符。

用户名中的数字必须在最后。 数字可以有零个或多个。 用户名不能以数字开头。

用户名字母可以是小写字母和大写字母。

用户名长度必须至少为两个字符。 两位用户名只能使用字母。
* */

let username = "JackOfAllTrades";
let userCheck = /^[a-z]([0-9]{2,}|[a-z]+\d*)$/i; // 修改这一行
let result06 = userCheck.test(username);
let result07 = username.match(userCheck)
console.log(result07);


// 匹配空白字符
// 迄今为止的挑战包括匹配字母和数字。 还可以匹配字符之间的空格。
//
// 可以使用 \s 搜寻空格，其中 s 是小写。 此匹配模式将匹配空格、回车符、制表符、换页符和换行符。 可以认为这类似于元字符 [ \r\t\f\n\v]。
//
// let whiteSpace = "Whitespace. Whitespace everywhere!"
// let spaceRegex = /\s/g;
// whiteSpace.match(spaceRegex);
// 这个 match 调用将返回 [" ", " "]。

/*
匹配非空白字符
已经学会了如何使用带有小写 s 的缩写 \s 来搜寻空白字符。
还可以搜寻除了空格之外的所有内容。

使用 \S 搜寻非空白字符，其中 s 是大写。
此匹配模式将不匹配空格、回车符、制表符、换页符和换行符。
可以认为这类似于元字符 [^ \r\t\f\n\v]。

let whiteSpace = "Whitespace. Whitespace everywhere!"
let nonSpaceRegex = /\S/g;
whiteSpace.match(nonSpaceRegex).length;
返回值的 .length 应该是 32。

* */


/*
指定匹配的上限和下限
回想一下，使用加号 + 查找一个或多个字符，使用星号 * 查找零个或多个字符。
这些都很方便，但有时需要匹配一定范围的匹配模式。

可以使用数量说明符（quantity specifiers）指定匹配模式的上下限。
数量说明符与花括号（{ 和 }）一起使用。 可以在花括号之间放两个数字，这两个数字代表匹配模式的上限和下限。

例如，要匹配出现 3 到 5 次字母 a 的在字符串 ah，
正则表达式应为/a{3,5}h/。

let A4 = "aaaah";
let A2 = "aah";
let multipleA = /a{3,5}h/;
multipleA.test(A4);
multipleA.test(A2);
第一次 test 调用将返回 true，而第二次调用将返回 false。
* */

let ohStr = "Ohhh no";
let ohRegex = /Oh{3,6}\sno/gi; // 修改这一行
let result08 = ohRegex.test(ohStr);
console.log(result08);


/*
只指定匹配的下限
可以使用带有花括号的数量说明符来指定匹配模式的上下限。
但有时候只想指定匹配模式的下限而不需要指定上限。

为此，在第一个数字后面跟一个逗号即可。

例如，要匹配至少出现 3 次字母 a 的字符串 hah，
正则表达式应该是 /ha{3,}h/。

let A4 = "haaaah";
let A2 = "haah";
let A100 = "h" + "a".repeat(100) + "h";
let multipleA = /ha{3,}h/;
multipleA.test(A4);
multipleA.test(A2);
multipleA.test(A100);
按顺序排列，三次 test 调用将返回值 true，false 和 true。

* */


/*
只指定匹配的下限
可以使用带有花括号的数量说明符来指定匹配模式的上下限。
但有时候只想指定匹配模式的下限而不需要指定上限。

为此，在第一个数字后面跟一个逗号即可。

例如，要匹配至少出现 3 次字母 a 的字符串 hah，
正则表达式应该是 /ha{3,}h/。

let A4 = "haaaah";
let A2 = "haah";
let A100 = "h" + "a".repeat(100) + "h";
let multipleA = /ha{3,}h/;
multipleA.test(A4);
multipleA.test(A2);
multipleA.test(A100);
按顺序排列，三次 test 调用将返回值 true，false 和 true。
* */
let haStr = "Hazzzzah";
let haRegex = /Haz{4,}ah/gi; // 修改这一行
let result09 = haRegex.test(haStr);
console.log(result09);


/*
指定匹配的确切数量
可以使用带有花括号的数量说明符来指定匹配模式的上下限。
 但有时只需要特定数量的匹配。

要指定一定数量的匹配模式，只需在大括号之间放置一个数字。

例如，要只匹配字母 a 出现3次的单词hah，
正则表达式应为/ha{3}h/。

let A4 = "haaaah";
let A3 = "haaah";
let A100 = "h" + "a".repeat(100) + "h";
let multipleHA = /ha{3}h/;
multipleHA.test(A4);
multipleHA.test(A3);
multipleHA.test(A100);
按顺序排列，三次 test 调用将返回值 false，true 和 false。


* */
let timStr = "Timmmmber";
let timRegex = /Tim{4}ber/gi; // 修改这一行
let result09 = timRegex.test(timStr);
console.log(result09);