(function () {
  requirejs.config({
    baseUrl:'js/', // 基本的路径 出发点正在根目录下 不配置时从main.js出发去找
    paths:{
      dataService:'./modules/dataService', //不要加.js 默认会添加后缀
      alerter:'./modules/alerter'
    }
  })
  requirejs(['alerter'],function(alerter) {
    alerter.showMsg()
  })
})()