console.log("=====使用原型之后======");


function WechatUsers (WechatNo_, WechatAge_, Wechatname_) {
  this.WechatNo = WechatNo_;//Wechat号
  this.WechatAge = WechatAge_;//w龄
  this.Wechatname = Wechatname_;//Wechat名字
}
//方法栈--执行方法时的栈区

WechatUsers.prototype.commonfriends = ['骑驴找马', '大漠英雄', '坚实的果子', '小草']
WechatUsers.prototype.show = function () {
  console.log(`Wechat号:${this.WechatNo},Wechat龄:${this.WechatAge},Wechat名字:${this.Wechatname}`)
  console.log(`共同的好友是:${this.commonfriends}`);
}

let WechatZhangSan = new WechatUsers("123456", 8, "龙的传人")
let WechatLisi = new WechatUsers("789101112", 10, "张三丰徒弟")
// WechatUsers.prototype.commonfriends.push("大树");

// WechatUsers.prototype = {
//   commonfriends: ["abc", "bcd", '骑驴找马']
// }
console.log(WechatZhangSan.commonfriends);
console.log(WechatLisi.commonfriends);