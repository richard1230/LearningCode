//基本类型: Boolean，Null,Undefined,Number,String，Symbol
// js中的对象类型(引用类型 ):常规: Object,函数，数组，(其他Date，Regex等了解即可)


// 使用原型之前
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
let WechatZhangSan = new WechatUsers("123456", 8, "龙的传人")
let WechatLisi = new WechatUsers("789101112", 10, "张三丰徒弟")
let Wechatwangwu = new WechatUsers("13141516", 12, "汉光武帝")

WechatZhangSan.show();
WechatLisi.show();
Wechatwangwu.show();

console.log("===========");

console.log(WechatUsers.prototype);





