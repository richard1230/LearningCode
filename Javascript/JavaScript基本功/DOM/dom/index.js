;(function () {

//插件就是要立即执行的
  var Test = function (opt) {
    this.num1 = opt.num1;
    this.num2 = opt.num2;
    this.btnGroup = opt.btnGroup;
  }

  Test.prototype = {//企业级写法
    //执行bindEevent
    init: function () {
      this.bindEvent();
    },

    bindEvent: function () {
      var btns = this.btnGroup,
        __self = this;
      //下面写事件绑定
      addEvent(btns, 'click', function (e) {
        __self.compute.call(__self, e)
      })
    },
    //自己写的插件
    compute: function (e) {
      var e = e || window.event,
        tar = e.target || e.srcElement,//考虑到兼容性
        val1 = parseInt(this.num1.value),
        val2 = parseInt(this.num2.value),
        btns = this.btnGroup,
        sign;

      sign = tar.getAttribute('data-sign')

      switch (sign) {
        case 'plus':
          console.log(val1 + val2);
          break;
        case 'minus':
          console.log(val1 - val2);
          break;
        case 'mul':
          console.log(val1 * val2);
          break;
        case 'div':
          console.log(val1 / val2);
          break;
        default:
          console.log('出错了');
      }
    }
  }

  window.Test = Test;

})()