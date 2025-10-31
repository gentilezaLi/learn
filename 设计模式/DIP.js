// DIP  依赖倒置原则
// 高层模块不应该依赖底层模块 二者都应该依赖抽象

// 1. 依赖倒置
// 2. 抽象稳定层 建立抽象接口作为系统架构的核心 usb接口标准  vue是如何抽象的呢？
// 3. 细节是可替换 具体实现可随时替换 不影响高层逻辑  pinia vuex =》vue不改动

// DIP重要性
// 减少模块之间的直接依赖
// 增强可扩展 扩展可轻松替换
// 提升架构的灵活性 适用技术栈变化

// 社交 分享
// 开发者A
class Store {
  constructor() {
    this.share = new Share()
  }
}

// 开发者B
class Share {
  shareTo() {
    // 分享到不同的平台
  }
}

const store = new Store()
store.share.shareTo('wx')

// 游戏评分功能
class Store {
  constructor() {
    this.share = new Share()
    this.rate = new Rate()
    // 聊天
  }
}

// 开发者B
class Rate {
  star(stars) {
    // 评分
  }
}

const store1 = new Store()
store1.rate.star(5)

// =》DIP
// 抽象稳定层 开发者A 按时按点下班 B
class Store {
  // 维护模块名单
  static modules = new Map()
  static inject(module) {
    Store.modules.set(module.contructor.name, module)
  }
  constructor() {
    for (let module of Store.modules.values()) {
      // 按照我的约定来 // module init方法
      module.init(this)
    }
  }
}

class Share {
  init(store) {
    store.share = this
  }
  shareTo(platform) {
    //
  }
}

class Rate {
  init(store) {
    store.rate = this
  }
  star(stars) {}
}

class Chat {
  init(store) {
    store.chat = this
  }
  chat() {}
}

const rate = new Rate()
const chat = new Chat()
Store.inject(rate)
Store.inject(chat)

const store2 = new Store()
store2.rate.star(5)
store2.chat.chat()

// 插件机制
// 高层模块不影响 vue插件 webpack 插件 rollup等

// Vue 核心只定义插件接口，不依赖具体实现
// vue dip实现 使得系统非常灵活
export function initUse(Vue: GlobalAPI) {
  Vue.use = function (plugin: Function | Object) {
    // 检查插件是否已安装
    const installedPlugins =
      this._installedPlugins || (this._installedPlugins = [])
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // 获取额外参数
    const args = toArray(arguments, 1)
    args.unshift(this)

    // 关键：调用插件的 install 方法（抽象接口）
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args)
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args)
    }

    installedPlugins.push(plugin)
    return this
  }
}

// 依赖注入 DI 控制反转 loc 等 DIP
// server koa serverA 使用Service B 无需实例化 container 帮我们做实例化 container.B

// DIP优势：极大的降低了类间的耦合性
// 提高系统稳定性
// 通过增加抽象层 解放高层模块
