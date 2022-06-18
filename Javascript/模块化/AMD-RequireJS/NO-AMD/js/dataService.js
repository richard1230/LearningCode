// 定义一个个没有依赖的模块
(function(window) {
  let name = '没有依赖的模块: dataService.js'
  function getName() {
    return name;
  }
  window.dataService = {getName}
})(window)


