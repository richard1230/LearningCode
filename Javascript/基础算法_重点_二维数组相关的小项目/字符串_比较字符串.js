/*
比较字符串需求：
后面一个字符串的字母如果都能在前面一个字符串里面找到,就返回true,反之返回false;

如果数组里的第一个字符串包含了第二个字符串中的所有字母，则返回 true。

例如，["hello", "Hello"] 应该返回 true。因为在忽略大小写的情况下，
第一个字符串包含了第二个字符串里出现的所有字母。

["hello", "hey"] 应该返回 false。因为 hello 并不包含字符 y。

最后，["Alien", "line"] 应该返回 true。因为 line 中的所有字母都出现在了 Alien 中。


* */


function mutation(arr) {
  let target = arr[0].toLowerCase();
  let test = arr[1].toLowerCase();
  for (let i = 0; i < test.length; i++) {
    if (target.indexOf(test[i]) == -1) {
      return false
    }
  }

  return true;
}

console.log(mutation(["hello", "hel"]));


function mutation1(arr) {
  let test = arr[1].toLowerCase();
  let target = arr[0].toLowerCase();
  for (let i = 0; i < test.length; i++) {
    if (target.indexOf(test[i]) < 0) return false;
  }
  return true;
}


console.log(mutation1(["hello", "hey"]));
