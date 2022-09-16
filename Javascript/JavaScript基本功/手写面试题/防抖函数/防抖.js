
const inputDom = document.getElementById('hInput')


function debounce(fn) {
  return function () {
    fn()
  }
}

inputDom.addEventListener('input',debounce(()=>{
  console.log('发送搜索请求')
}))