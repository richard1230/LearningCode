//小宝宝
class Subject {
  constructor(name) {
    this.name = name
    this.state = '开心'
    this.observers = []//存放观察者
  }

  attach(ther) {
    this.observers.push(ther)
  }

  setState(state) {
    this.state = state
    this.observers.forEach(ther => {
      ther.update(this)
    })
  }
}


//爸爸妈妈
class Observer {
  constructor(name) {
    this.name = name
  }

  update(subject) {
    console.log(this.name + ':' + subject.name + "当前状态:" + subject.state)
  }

}

let baby = new Subject('小宝宝')
let father = new Observer('爸爸')
let mother = new Observer('妈妈')

baby.attach(father)
baby.attach(mother)

baby.setState('不开心')
baby.setState('非常开心')

