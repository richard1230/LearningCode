/*
*
* 创建 action 后要将 action 发送到 Redux store，以便它可以更新其状态。
*  在 Redux 中，可以定义动作创建器来完成此任务，
*  action creator 只是一个返回动作的 JavaScript 函数。
* 换句话说，action creator 创建表示动作事件的对象。


* */
let action = {
  type: 'LOGIN'
}


function actionCreator() {
  return action
}

//https://www.jianshu.com/p/8b9abedcf072

