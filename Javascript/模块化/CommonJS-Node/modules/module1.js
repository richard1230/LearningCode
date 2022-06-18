//module.exports = value 暴露一个对象
module.exports = {
  msg:'module1',
  foo() {
    console.log(this.msg);
  }
}
