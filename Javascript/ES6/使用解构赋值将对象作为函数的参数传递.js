const stats = {
  max: 56.78,
  standard_deviation: 4.34,
  median: 34.54,
  mode: 23.87,
  min: -0.75,
  average: 35.85
};

// 只修改这一行下面的代码
const half = ({max, min}) => (max + min) / 2.0;
// 只修改这一行上面的代码


// 使用解构赋值将对象作为函数的参数传递
// 在某些情况下，你可以在函数的参数里直接解构对象。
//
// 请看以下代码：
//
// const profileUpdate = (profileData) => {
//   const { name, age, nationality, location } = profileData;
//
// }
// 上面的操作解构了传给函数的对象。 这样的操作也可以直接在参数里完成：
//
// const profileUpdate = ({ name, age, nationality, location }) => {
//
// }
// 当 profileData 被传递到上面的函数时，从函数参数中解构出值以在函数内使用。
//
