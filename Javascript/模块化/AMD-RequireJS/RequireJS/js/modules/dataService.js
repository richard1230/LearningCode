// 定义没有依赖的模块
// 使用AMD语法
define(function () {
  let name = 'dataService.js'
  function getName() {
    return name
  }
  // 暴露模块
  return {getName}
})

