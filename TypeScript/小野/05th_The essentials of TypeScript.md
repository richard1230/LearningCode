https://exploringjs.com/tackling-ts/ch_typescript-essentials.html

## 前言

读完这篇文章之后,你将会理解如下代码:

```TypeScript
interface Array<T> {
  concat(...items: Array<T[] | T>): T[];
  reduce<U>(
    callback: (state: U, element: T, index: number, array: T[]) => U,
    firstState?: U
  ): U;
  // ···
}

```

## 指定类型检查

配置TypeScript编译器的方法有很多种。这里只推荐这一种进行静态类型检查: 通过`--strict `

有关`--strict `的更多内容请看下面:

将`--strict`设置为true，将以下所有选项设置为true:

`--noImplicitAny:` 如果TypeScript不能推断类型，我们必须指定它。这主要适用于函数和方法的参数:使用这种设置，我们必须注释它们。

`--noImplicitThis:`如果this的类型不清楚就使用这种类型;

`--alwaysStrict:`尽可能使用JavaScript的strict模式。

`--strictNullChecks:`null不是任何类型的一部分(除了它自己的类型null)，如果它是一个可接受的值，必须显式地提及。

`--strictFunctionTypes:`启用更强的函数类型检查。

`--strictPropertyInitialization:`:类定义中的属性必须初始化，除非它们的值是undefined。

## TS中的类型

JavaScript语言(不是TypeScript!)只有8种类型:

Undefined:未定义唯一元素的集合  <br>
Null:只有一个为空的元素的集合   <br>
Boolean:包含false和true两个元素的集合  <br>
Number:所有数字的集合  <br>
BigInt:所有任意精度整数的集合   <br>
String:所有字符串的集合  <br>
Symbol:所有符号的集合  <br>
Object:所有对象的集合(包括函数和数组)  <br>

所有这些类型都是动态的:可以在运行时使用它们。

TypeScript为JavaScript带来了一个额外的层:静态类型。这些只在编译或类型检查源代码时存在。每个存储位置(变量、属性等)都有一个预测其动态值的静态类型。类型检查可以确保这些预测成真。


还有很多东西可以静态检查(不需要运行代码)。例如，如果函数toString(num)的形参num具有静态类型number，则函数调用toString('abc')是非法的，因为实参'abc'具有错误的静态类型。

## 类型注解

```ts
function toString(num: number): string {
  return String(num);
}
```

在前面的函数声明中有两个类型注释:

参数num:冒号后接数字  <br>
toString()的结果:冒号后接字符串  <br>
number和string都是指定存储位置类型的类型表达式。  <br>


## Type inference 

通常情况下，如果没有类型注释，TypeScript可以推断出静态类型。例如，如果我们省略了toString()的返回类型，TypeScript会推断它是字符串:

```ts
// %inferred-type: (num: number) => string
function toString(num: number) {
  return String(num);
}
```
类型推断不是猜测:它遵循明确的规则(类似于算术)来派生未显式指定的类型。在本例中，return语句应用函数String()将任意值映射到字符串，映射到类型为number的值num并返回结果。这就是为什么推断的返回类型是字符串

如果一个位置的类型既不能显式指定也不能推断，TypeScript将使用any类型。这是所有值的类型和一个通配符，因为如果值具有该类型，我们可以执行任何操作。

对于`--strict`, any只允许显式使用。换句话说:每个位置都必须有显式或推断的静态类型。在下面的例子中，参数num两者都没有，我们会得到一个编译时错误:


```ts
// @ts-expect-error: Parameter 'num' implicitly has an 'any' type. (7006)
function toString(num) {
  return String(num);
}

```


## 7.6Specifying types via type expressions 

















