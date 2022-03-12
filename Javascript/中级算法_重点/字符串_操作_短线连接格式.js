/*
spinalCase("This Is Spinal Tap")
应返回 this-is-spinal-tap

spinalCase("thisIsSpinalTap")
应返回 this-is-spinal-tap。

spinalCase("The_Andy_Griffith_Show")
 应返回 the-andy-griffith-show。

spinalCase("Teletubbies say Eh-oh")
应返回 teletubbies-say-eh-oh。

spinalCase("AllThe-small Things")
应返回 all-the-small-things

解题思路:
1.分割单词的标志为空格或者大写,或者两者混搭，或者下划线,可以考虑正则

2.找到上一步的标志之后，用-替换,用replace

//? 表示 0 次或 1 次，加上 + 表示 1 次至 n 次
3.空格===> \s 来判断;下划线===>用_;   直接用\s|_

4.小写后面紧紧跟着大写(第二种情况)，写成[a-z][A-Z]

5.连续用两次replace即可
* */
function spinalCase(str) {
  // let regex = /\s+|_+/g;
  // str = str.replace(/([a-z])([A-Z])/g,"$1 $2")
  // return str.replace(regex,'-').toLowerCase();
  return str.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/\s+|_+/g, '-').toLowerCase();
}

console.log(spinalCase('This Is Spinal Tap'));
;
console.log(spinalCase("thisIsSpinalTap"));
console.log(spinalCase("AllThe-small Things"));
console.log(spinalCase("The_Andy_Griffith_Show"));


/*
* 方法二:
* 正则中，有一种查找方式叫 positive lookahead (正向先行断言)，用法是 a(?=b)。
* 它表示，如果 a 之后紧跟着 b，那么这个 a 就会被匹配到。
* 类似的还有 negative lookahead (负向先行断言)，用法是 a(?!b)。
* 表示如果 a 之后跟着的不是 b，那么这个 a 就会被匹配到。
* 显然，这里我们可以通过正向先行断言来处理第二种情况
*
在写的时候需要注意，由于 split 是不保留分割参考的，
* 因此不能写成 ([a-z])(?=[A-Z])。
* 这样，在大写字符前面的小写字符就不会被保留下来。
* 只需要写成 (?=[A-Z]) 就可以，这样就会在大写字符前，上一个字符的位置之后进行分割
*
* */

function spinalCase1(str) {
  return str.split(/\s+|_+|(?=[A-Z])/).join('-').toLowerCase();
}

console.log(spinalCase1("thisIsSpinalTap"));
