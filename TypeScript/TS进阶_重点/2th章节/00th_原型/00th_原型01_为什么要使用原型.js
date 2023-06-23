function WechatUsers (WechatNo_, WechatAge_, Wechatname_) {
  //3个属性
  this.WechatNo = WechatNo_;//Wechat号
  this.WechatAge = WechatAge_;//微信使用时间
  this.Wechatname = Wechatname_;//Wechat名字
  //引用对象类型=引用类型=对象类型=引用数据类型
  // 数组也是一种引用数据类型
  this.commonfriends = ['骑驴找马', '大漠英雄', '坚实的果子', '小草']//共同好友
  // 方法也是一种引用数据类型
  this.show = function () {
    console.log(`Wechat号:${this.WechatNo},Wechat使用时间:${this.WechatAge},Wechat名字:${this.Wechatname}`)
    console.log(`共同的好友是:${this.commonfriends}`);
  }
}
// 对象也叫实例(instance)
// WechatZhangSan叫做对象变量 对象是等号右边通过new出来的一个实例 而且是运行期间才在堆中开辟对象的内存空间
let WechatZhangSan = new WechatUsers("37834522", 15, "龙的传人")
let WechatLisi = new WechatUsers("30424232", 10, "张三丰徒弟")
//let WechatLiuwu = new WechatUsers("刘武", 12, "飞起来的鸭子")

WechatZhangSan.show();
WechatLisi.show();
//WechatLiuwu.show();

console.log("===========");

console.log(WechatUsers.prototype);