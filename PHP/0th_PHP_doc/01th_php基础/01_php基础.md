
[TOC]

## PHP定义

PHP(PHP: Hypertext Preprocessor，超文本预处理器的缩写)，是一种被广泛应用的开放源代码的、基于服务器端的用于产生动态网页的、可嵌入 HTML 中的脚本程序语言，尤其适合 WEB 开发。

当客户端向服务器的程序提出请求时，web 服务器根据请求响应对应的页面，当页面中含有 php 脚本时，服务器会交给 PHP 解释器进行解释执行，将生成的 html 代码再回传给客户端，客户端的浏览器解释 html 代码，最终形成网页格式的页面。


## 运行环境安装

| 集成开发软件 | 操作系统 | 注释 |
|------|------|----|
| WAMP | Win  | 推荐 |
| Mamp | Mac  | 推荐 |
| Lamp |Linux | 推荐 |



## 特点

- 开放源代码,服务器端的脚本语言
- 独立于操作系统,可以运行在所有系统中
- 支持大部分的服务器，如 Apache,IIS。
- 支持大量的数据库,包含MsSQL/MySQL/Sybase/Db2/Oracle/PostgreSQL/Access
- 文件操作
- ......

## 集成开发环境

### WAMP

Windows 下的 Apache+Mysql/MariaDB+Perl/PHP/Python，一组常用来搭建动态网站或者服务器的开源软件，本身都是各自独立的程序，但是因为常被放在一起使用，拥有了越来越高的兼容度，共同组成了一个强大的 Web 应用程序平台。

### MAMP

苹果系统下 MAMP PRO 是专业级版本的经典本地服务器环境的 os x 软件。MAMP 这几个首字母代表苹果的 OSX 系统上的 Macintosh、Apache、MySQL 和 PHP，顾名思义，你应该知道 MAMP 的强大功能 啦！MAMP 内含 Apache 伺服器、PHP 安装套件以及 MySQL 安装套件。

## PHP 的标记风格

```PHP
<?php … … ?>
```
这是 PHP 推荐使用的标记风格。服务器管理员不能禁用这种风格的标记。

## 分号

PHP 用分号来分隔简单的语句。复合语句用大括号来标记代码块，如条件测试或循环，在大括号后面不要用分号。和其他语言不一样的是，在 PHP 中右括号(?>)前的分号不是必选的。


## 空白和换行符

一般来说，空白符在 PHP 中无关紧要。可以将一个语句展开成任意行，或者将语句紧缩在一行。可以利用这个灵活的格式来使代码更具有可读性（通过排列分配、缩进等）。一些懒惰的程序员利用这种自由的格式创建根本无法阅读的代码，这是不提倡的。


## 程序的注释

PHP 支持 C、C ＋＋和 Shell 脚本风格的注释，如下：

```shell
// 单行注释
/* ...*/  多行注释 		（注意：不能嵌套）
# 脚本注释
```

## 查看数据

### echo

输出一个或多个变量，他不是函数，不需要使用括号，如果输出多个请用逗号分隔

```php
echo 1,2,3,4;
```

### var_dump

打印变量的相关信息

`var_dump(1234);`

区别：echo 是直接输出，var_dump 输出和带有变量类型


## 变量知识

### 定义变量

PHP 是弱类型语言，不像其他语言需要对变量进行类型声明。PHP 中以 $ 作为前缀来定义变量，以 a~z（大小写）或 _ 下划线定义变量名。

合法的变量名如下:

```shell
$web = 'yahoo.com';

$&* = 'sina.com';
```

## 弱类型
PHP 是一种非常弱的类型语言。在大多数编程语言中，变量只能保持一种类型的数据，而且这个类型必须在使用变量前声明，例如 Java 语言中。

而在 PHP 中，变量的类型通常不是由程序员设定的，确切地说，是根据该变量使用的上下文在运行时（即变量的值）决定的。

简单来说,`var = 1;`就是数字, `var2 = '1'`就是字符串,变量类型是由值决定的。


## 传值与引用

### 传值赋值

直接使用 `=` 将变量的值赋值给另一个变量。

```shell
$a = 1;
$b = $a;
$b = 2;
echo $a;//结果是1
```
### 引用赋值

将一个变量的内存地址赋值给另一个变量的行为即传址赋值。需要在 = 等号前加上 & 引用符号，这样两个变量指向内存中的一个地址，任何一个变量的改变都影响到另一个变量，有点类似于快捷方式的概念。

```shell
$a = 1;
$b = &$a;
$b = 2;
echo $a;//结果是2

```


### 可变变量

可以变量即使用一个变量的值，作为另一个变量名。

```shell
$a = 'hello';	//普通变量
$$a = 'world';	//可变变量 相当于：$hello = ‘world’;
echo "$a ${$a}";//输出：hello world
echo "$a $hello";//输出：hello world

```


## 变量作用域

变量作用域指变量在代码中可以访问的位置。

## 超全局变量

可以在代码的任何位置都可以访问的变量

| 变量         | 说明                     |
|------------|------------------------|
| $_GET      | GET 提交                 |
| $_POST	    | POST提交                 |
| $_FILES    | 文件上传变量                 |
| $_SESSION  | 单会话变量                  |
| $_COKKIE   | cookie 值变量             |
| $_GLOBALS  | 全局变量                   |
| $_REQUEST	 | 包含$_GET、$_POST、$_COOKIE |
| $_SERVER   | 服务器环境变量                |



## 全局变量

全局声明（函数外声明）的变量会保存在 `$_GLOBALS` 中,函数内默认不能访问到全局变量,在函数中访问需要使用 global 关键字。


```shell
$Chinese='中国人';
function p() {
	//利⽤ global 引入全局变量
	global $Chinese;
	echo $Chinese;
}
p();
```

>也可以使用全局数组$GLOBALS 调⽤用全局变量量。 如： $GLOBALS['Chinese'];


### 检测变量
通过 isset 函数可以检测变量是否定义。

```shell
var_dump(isset($name));
# 这里的结果是false
```
### 变量销毁

php 在全部代码执行结束后会删除所有变量，也使用 unset 函数可以在程序运行中删除变量。
```shell
$name='baidu.com';
unset($name);

```

全局变量不能在函数中删除

```shell
$name = 'baidu.com';
function run()
{
    global $name;
    unset($name);
}
run();
echo $name;
# 依然可以输出 baidu.com
```
## 静态变量

PHP 支持声明函数变量为静态的(static)。一个静态变量在所有对该函数的调用之间共享,并且仅在脚本的执行期间函数第一次被调⽤时被初始化。要声明函数变量为静态的⽤关键字 static。通常静态变量的第一次使⽤用时赋予⼀个初始值。


```shell
function calculate()
{
    static $a=1;
    return ++$a;
}
calculate();
echo calculate();
```


## 数据类型
使用不同数据类型储存不同数据，就像我们家里面放衣服和放洗手液会使用用不同的容器一样。下面是常用 PHP 数据类型表：


| 类型     | 说明 |
|--------|----|
| integer	 | 整型 |
| float	 | 浮点型 |
| string | 字符串 |
| boolean | 布尔型 |
| array  | 数组 |
| object | 对象 |




### 整型

整型可以是十进制、八进制、十六进制。

```shell
01988 #十进制
0xfff #十六进制
```

## 浮点数


浮点数表示实数，可理解为有限或无限小数。

```shell
0.11
-100.21
```
## 布尔型

当转换为 boolean 时,以下值被认为是 FALSE：

- 布尔值 FALSE
- 整型值 0（零）
- 浮点型值 0.0（零）
- 空白字符串
- 字符串 "0"
- 没有成员变量的数组
- 没有单元的对象（仅适用于 PHP 4）
- 特殊类型 NULL（包括尚未设定的变量）

所有其它值都被认为是 TRUE



## 字符串

引号

字符串可以用双引号"" 或 '' 号包含，区别是双引号中可以解析变量。


```shell
$url = 'baidu.com';
$string = "百度的网址: {$url}";
```
在所有输出前使用下面的代码可以正确显示中文：

```shell
header('Content-type:text/html;charset=utf-8');
```
定义符

定界符文本表现的就和双引号字符串一样，在定界符文本中不需要转义引号，适合输入大量文本。

结束符必须从第一列开始，并且后面除了分号以外不能包含任何其他字符，空格也不可以。


```shell
$string =<<<str

这是使用定界符输入的内容
str;
echo $string;
```
## 连接符

多个字符串使用 `.` 符号连接

```shell
$name = '中国';
$url  = 'china.com'
echo $name.$url;
```


## 转义

转义是将有多种含义的字符进行转换，比如 $即是变量前缀也是美元符号，就需要转义在不同场景进行改变。

```shell
echo  "变量定义 \$name = 'baidu.com',这是一个变量";
```

## 常用函数

strlen — 取得字符串长度传度的函数

```shell
echo strlen('baidu.com');

```
mb_strlen — 根据字符编码获取长度

```shell
echo mb_strlen('中国人很聪明','utf8');

```
trim — 截去字符串首尾的内容

```shell
$string = ' baidu.com  ';
echo strlen(trim($string,' taicoole'));
# 从前后删除 taicoole和空格字符
```

rtrim 从右侧删除、ltrim 从左侧删除

```shell
$string = ' baidu.com  ';
echo strlen(rtrim($string,' moc'));
```

strtolower — 字母转为小写

```shell

$str = "I Love China";
$str = strtolower($str);
echo $str;
```
strtoupper — 字母转大写

```shell

$str = "I love China";
$str = strtoupper($str);
echo $str;
```

ucfirst — 将字符串的首字母转换为大写

```shell
$foo = 'hello world!';
$foo = ucfirst($foo); // Hello world!
```
ucwords — 将字符串中每个单词的首字母转换为大写

```shell
$foo = 'hello world!';
$foo = ucwords($foo);             // Hello World!

$foo = 'hello|world!';
$baz = ucwords($foo, "|");        // Hello|World!
```

md5 — 计算字符串的 MD5 散列值，以 32 字符十六进制数字形式返回散列值

```shell
md5('baidu.com') 
```
explode — 使用一个字符串分割另一个字符串

```shell
$pizza  = "piece1 piece2 piece3 piece4 piece5 piece6";
$pieces = explode(" ", $pizza);
echo $pieces[0]; // piece1
echo $pieces[1]; // piece2
```

implode — 将一个一维数组的值转化为字符串

```shell
$array = array('lastname', 'email', 'phone');
$comma_separated = implode(",", $array);

echo $comma_separated; // lastname,email,phone
```
substr — 返回字符串的子串

```shell
$rest = substr('abcdef', 1);     // bcdef
$rest = substr('abcdef', 1, 3);  // bcd
$rest = substr("abcdef", 0, -1);  // 返回 "abcde"
$rest = substr("abcdef", 2, -1);  // 返回 "cde"
$rest = substr("abcdef", 4, -4);  // 返回 ""
$rest = substr("abcdef", -3, -1); // 返回 "de"
```
mb_substr — 获取部分字符串

```shell
echo mb_substr('中国人', 1, 1, 'utf-8'); //国
```

strstr — 查找字符串的首次出现

