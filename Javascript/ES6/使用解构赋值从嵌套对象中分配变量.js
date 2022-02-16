const LOCAL_FORECAST = {
  yesterday: {low: 61, high: 75},
  today: {low: 64, high: 77},
  tomorrow: {low: 68, high: 80}
};

// 只修改这一行下面的代码

// const lowToday = LOCAL_FORECAST.today.low;
// const highToday = LOCAL_FORECAST.today.high;
const {today: {low: lowToday, high: highToday}} = LOCAL_FORECAST
// 只修改这一行上面的代码


/*
*
*
你可以使用前两节课程中相同的原则来解构嵌套对象中的值。

使用与前面的例子中类似的对象：

const user = {
  johnDoe: {
    age: 34,
    email: 'johnDoe@freeCodeCamp.com'
  }
};
这是解构对象的属性值赋值给具有相同名字的变量：

const { johnDoe: { age, email }} = user;
这是将对象的属性值赋值给具有不同名字的变量：

const { johnDoe: { age: userAge, email: userEmail }} = user;

*
*
*
*
* */