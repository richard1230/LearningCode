const result = {
  success: ["max-length", "no-amd", "prefer-arrow-functions"],
  failure: ["no-var", "var-on-top", "linebreak"],
  skipped: ["no-extra-semi", "no-dup-keys"]
};

function makeList(arr) {
  // 只修改这一行下面的代码
  const failureItems = [];
  for (var i = 0; i < arr.length; i++) {
    failureItems.push(`<li class="text-warning">${arr[i]}</li>`);
  }

  // 只修改这一行上面的代码

  return failureItems;
}

const failuresList = makeList(result.failure);


/*
*
*
*
* 使用模板字面量创建字符串
模板字符串是 ES6 的另外一项新的功能。 这是一种可以轻松构建复杂字符串的方法。

模板字符串可以使用多行字符串和字符串插值功能。

请看以下代码：

const person = {
  name: "Zodiac Hasbro",
  age: 56
};

const greeting = `Hello, my name is ${person.name}!
I am ${person.age} years old.`;

console.log(greeting);
控制台将显示字符串 Hello, my name is Zodiac Hasbro! 和 I am 56 years old.。
*
* */