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








