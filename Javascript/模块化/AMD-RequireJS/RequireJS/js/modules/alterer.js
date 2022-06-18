//定义有依赖的模块
define(['dataService'],function (dataService) {
  let msg = 'alerter.js'
  function showMsg() {
    console.log(msg,dataService.getName());
  }
  // 暴露模块
  return {showMsg}//如果{k:k}--->写为{k}
})