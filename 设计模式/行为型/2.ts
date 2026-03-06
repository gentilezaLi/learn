// 发布订阅模式 - TypeScript 版本

type EventHandler<Payload> = (data: Payload) => void

type EventMap = Record<string, unknown>

class EventBus<Events extends EventMap = EventMap> {
  private subscribers: {
    [K in keyof Events]?: Array<EventHandler<Events[K]>>
  } = {}

  // 订阅事件
  subscribe<K extends keyof Events>(
    event: K,
    callback: EventHandler<Events[K]>,
  ): () => void {
    if (!this.subscribers[event]) {
      this.subscribers[event] = []
    }
    this.subscribers[event]!.push(callback)

    // 返回取消订阅函数
    return () => {
      this.unsubscribe(event, callback)
    }
  }

  // 发布事件
  publish<K extends keyof Events>(event: K, data: Events[K]): void {
    const cbs = this.subscribers[event]
    if (!cbs || cbs.length === 0) return

    cbs.forEach((callback) => {
      try {
        callback(data)
      } catch (error) {
        console.error(`事件处理错误: ${String(event)}`, error)
      }
    })
  }

  // 取消订阅
  unsubscribe<K extends keyof Events>(
    event: K,
    callback: EventHandler<Events[K]>,
  ): void {
    const cbs = this.subscribers[event]
    if (!cbs) return
    const index = cbs.indexOf(callback)
    if (index !== -1) {
      cbs.splice(index, 1)
    }
  }

  // 一次性订阅
  once<K extends keyof Events>(
    event: K,
    callback: EventHandler<Events[K]>,
  ): void {
    const onceHandler: EventHandler<Events[K]> = (data) => {
      callback(data)
      this.unsubscribe(event, onceHandler)
    }
    this.subscribe(event, onceHandler)
  }
}

// 事件类型示例
interface AppEvents extends EventMap {
  'user.login': { name: string; id: number }
  'app.initialized': void
  'user.updated': { name: string; age?: number }
  'user.logout': void
}

// 使用示例
const bus = new EventBus<AppEvents>()

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
const eventBus = new EventBus<AppEvents>()

// 用户组件
class UserComponent {
  constructor(private readonly bus: EventBus<AppEvents> = eventBus) {
    this.bus.subscribe('user.updated', this.updateProfile)
  }

  private updateProfile = (user: AppEvents['user.updated']): void => {
    console.log('更新用户资料:', user)
    // DOM 更新逻辑...
  }

  logout(): void {
    this.bus.publish('user.logout', undefined)
  }
}

// 购物车组件
class CartComponent {
  constructor(private readonly bus: EventBus<AppEvents> = eventBus) {
    this.bus.subscribe('user.logout', this.clearCart)
  }

  private clearCart = (): void => {
    console.log('清空购物车')
    // 清空逻辑...
  }
}

// 使用
const userComp = new UserComponent()
const cartComp = new CartComponent()

// 用户登出时自动清空购物车
userComp.logout()

