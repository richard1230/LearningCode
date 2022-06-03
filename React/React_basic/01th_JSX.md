
## 1、定义

（1）JSX是一种JavaScript的语法扩展，其格式⽐比较像模版语⾔言，但事实上完全是在JavaScript内部实现的。<br>
（2）JSX可以很好地描述UI，能够有效提⾼高开发效率，体验JSX  <br>
（3）JSX实质就是React.createElement的调⽤用，最终的结果React“元素”（JavaScript对象）。<br>


## 使用
1）表达式{}的使用，index.js
```jsx
const name = "react study";
const jsx = <h2>{name}</h2>;
```
2）函数也是合法表达式，index.js
```jsx
const user = {
    firstName: "tom", 
    lastName: "jerry"
};
function formatName(user) {
    return user.firstName + " " + user.lastName;
}
const jsx = <h2>{formatName(user)}</h2>;
```
3）jsx是js对象，也是合法表达式，index.js
```jsx
const greet = <p>hello, Jerry</p>
const jsx = <h2>{greet}</h2>;
```
4）条件语句使用，index.js
```jsx
const showTitle = true;
const jsx = (
    <div>
        {/* 条件语句句 */}
        { showTitle ? <h2>{showTitle}</h2> : null}
    </div>
);
```
5）数组使用

```jsx
const arr = [1,2,3].map(num => <li key={num}>{num}</li>)
const jsx = (
    <div>
        {/* 数组 */}
        <ul>{arr}</ul>
    </div>
);
```

6）属性使用
```jsx
import logo from "./logo.svg";
const jsx = (
    <div>
        {/* 属性：静态值用双引号，动态值用花括号；class、for等
要特殊处理理。 */}
        <img src={logo} style={{ width: 100 }}  className="img" />
    </div>
);

```

7）CSS使用
```jsx
import style from "./index.module.css";
<img className={style.img} />
```

JS的逻辑一定要写在`{}`里面


