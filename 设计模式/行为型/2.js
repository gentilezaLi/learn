// 发布订阅模式
// 一对多 如果依赖的对象发生变化 都会收到通知 并自动更新
// 解耦了发布者和订阅者
// 核心概念
// publish-subscribe 消息队列模式
// 发布者 Publisher 状态变化的时候 触发事件的对象
// 订阅者 Subscriber 监听特定事件并且做出响应
// 事件通道 Event Channel 管理事件和订阅者关系的中间层
// 事件 event 标识状态变化的字段

class EventBus {
  constructor() {
    this.subscribers = {}
  }

  // 订阅事件
  subscribe(event, callback) {
    if (!this.subscribers[event]) {
      this.subscribers[event] = []
    }
    this.subscribers[event].push(callback)

    // 返回取消订阅函数
    return () => {
      this.unsubscribe(event, callback)
    }
  }

  // 发布事件
  publish(event, data) {
    if (!this.subscribers[event]) return
    this.subscribers[event].forEach((callback) => {
      try {
        callback(data)
      } catch (error) {
        console.error(`事件处理错误: ${event}`, error)
      }
    })
  }

  // 取消订阅
  unsubscribe(event, callback) {
    if (!this.subscribers[event]) return
    const index = this.subscribers[event].indexOf(callback)
    if (index !== -1) {
      this.subscribers[event].splice(index, 1)
    }
  }

  // 一次性订阅
  once(event, callback) {
    const onceHandler = (data) => {
      callback(data)
      this.unsubscribe(event, onceHandler)
    }
    this.subscribe(event, onceHandler)
  }
}

// 使用示例
const bus = new EventBus()

// 订阅事件
const unsub = bus.subscribe('user.login', (user) => {
  console.log(`用户登录: ${user.name}`)
})

// 发布事件
bus.publish('user.login', { name: 'Alice', id: 123 })

// 取消订阅
unsub()

// 一次性订阅
bus.once('app.initialized', () => {
  console.log('应用已初始化')
})

// 全局事件总线
const eventBus = new EventBus()

// 用户组件
class UserComponent {
  constructor() {
    eventBus.subscribe('user.updated', this.updateProfile)
  }

  updateProfile(user) {
    console.log('更新用户资料:', user)
    // DOM 更新逻辑...
  }

  logout() {
    eventBus.publish('user.logout')
  }
}

// 购物车组件
class CartComponent {
  constructor() {
    eventBus.subscribe('user.logout', this.clearCart)
  }

  clearCart() {
    console.log('清空购物车')
    // 清空逻辑...
  }
}

// 使用
const userComp = new UserComponent()
const cartComp = new CartComponent()

// 用户登出时自动清空购物车
userComp.logout()
