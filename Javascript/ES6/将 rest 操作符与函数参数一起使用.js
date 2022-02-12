function howMany(...args) {
  return "You have passed " + args.length + " arguments.";
}
console.log(howMany(0, 1, 2));
console.log(howMany("string", null, [1, 2, 3], { }));


const sum = (...args) => {
  return args.reduce((a, b) => a + b, 0);
}

/*
*sum(0,1,2) 的结果应是 3。

sum(1,2,3,4) 的结果应是 10。

sum(5) 的结果应是 5。

sum() 的结果应是 0。

sum 应是一个箭头函数，对 args 参数使用 rest 操作符语法（...）。
*
* */