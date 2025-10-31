// 观察者模式
// Subject 主题  维护观察者列表 提供注册 注销方法 状态变化时通知观察者
// Observer 观察着 定义更新接口 接收主题的通知

class Subject {
  constructor() {
    this.observers = []
  }

  subscribe(observer) {
    this.observers.push(observer)
  }

  unsubscribe(observer) {
    this.observers = this.observers.filter((obs) => obs !== observer)
  }

  notify(data) {
    this.observers.forEach((observer) => observer.update(data))
  }
}

// 观察者
class Observer {
  constructor(name) {
    this.name = name
  }

  update(data) {
    console.log(`${this.name} received:`, data)
  }
}

// 使用示例
const newsPublisher = new Subject()
const user1 = new Observer('Alice')
const user2 = new Observer('Bob')

newsPublisher.subscribe(user1)
newsPublisher.subscribe(user2)

newsPublisher.notify('Breaking News: JavaScript wins again!')
// Alice received: Breaking News: JavaScript wins again!
// Bob received: Breaking News: JavaScript wins again!

newsPublisher.unsubscribe(user2)
newsPublisher.notify('Update: React 19 released')
// Alice received: Update: React 19 released

// redux
// 创建全局状态管理器
class Store {
  constructor(reducer) {
    this.state = reducer(undefined, {})
    this.observers = []
    this.reducer = reducer
  }

  subscribe(observer) {
    this.observers.push(observer)
    return () => {
      this.observers = this.observers.filter((obs) => obs !== observer)
    }
  }

  dispatch(action) {
    this.state = this.reducer(this.state, action) // 拿到最新的数据 通知观察者 观察者去更新
    // react setState() // 更新组件 渲染最新数据 redux
    this.observers.forEach((observer) => observer())
  }

  getState() {
    return this.state
  }
}

// 使用示例
function counterReducer(state = { count: 0 }, action) {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 }
    case 'DECREMENT':
      return { count: state.count - 1 }
    default:
      return state
  }
}

const store = new Store(counterReducer)

// 组件1：计数器显示
class CounterDisplay {
  constructor(containerId) {
    this.container = document.getElementById(containerId)
    store.subscribe(() => this.render())
    this.render()
  }

  render() {
    this.container.textContent = `Count: ${store.getState().count}`
  }
}

// 组件2：控制按钮
class ControlButtons {
  constructor(containerId) {
    this.container = document.getElementById(containerId)
    this.container.innerHTML = `
        <button id="increment">+</button>
        <button id="decrement">-</button>
      `

    document.getElementById('increment').addEventListener('click', () => {
      store.dispatch({ type: 'INCREMENT' })
    })

    document.getElementById('decrement').addEventListener('click', () => {
      store.dispatch({ type: 'DECREMENT' })
    })
  }
}

// 初始化组件
new CounterDisplay('counter-display')
new ControlButtons('control-buttons')

useEffect(() => {
  const unsubscribe = new Store().subscribe()

  return () => {
    unsubscribe()
  }
}, [])
