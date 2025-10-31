// 单例模式
// 只允许创建一个实例的模式
// 管理全局状态和资源
// 创建全局唯一的对象 比如 全局的状态管理器 日志记录器

// 只有一台ps4
class PlayStation {
  constructor() {
    this.state = 'off'
  }
  play() {
    if (this.state === 'on') {
      console.log('已经开机了')
      return
    }

    this.state = 'on'
  }
  shutdown() {
    if (this.state === 'off') {
      console.log('已经关了')
      return
    }

    this.state = 'off'
  }
}

const ps = new PlayStation()
ps.play()

const Ps = new PlayStation()
ps.play()

// 单例化改造
class PlayStation {
  constructor() {
    this.state = 'off'
  }
  play() {
    if (this.state === 'on') {
      console.log('已经开机了')
      return
    }

    this.state = 'on'
  }
  shutdown() {
    if (this.state === 'off') {
      console.log('已经关了')
      return
    }

    this.state = 'off'
  }
}
PlayStation.instance = null
PlayStation.getInstance = () => {
  return () => {
    if (!PlayStation.instance) {
      PlayStation.instance = new PlayStation()
    }

    return PlayStation.instance
  }
}

const ps1 = PlayStation.getInstance()
ps1.play()
const ps2 = PlayStation.getInstance()
ps2.play()

// 2.对象字面量
const Singleton = {
  name: 'test',
  method() {
    console.log('im a sington')
  },
}
Singleton.method()
// 特点：
// 立即创建实例
// 创建无法延迟
// 对象属性是可以被修改
Singleton.name = 'xxx'

// 3. 闭包+IIFE
const Singleton = (function () {
  // 内部属性私有
  let instance

  function init() {
    return {
      name: 'hello',
      method() {
        console.log('iffe')
      },
    }
  }

  return {
    getInstance() {
      if (!instance) {
        instance = init()
      }

      return instance
    },
  }
})()

const obj1 = Singleton.getInstance()
const obj2 = Singleton.getInstance()
console.log(obj1 === obj2) // true

// 3. 模块化的方式
// es module 天然单例特性
// config.js
const config = {
  apiBase: 'http://api',
}

export default config

// 1.js
import config from './config.js'

// 2.js
import config from './config.js'

// 显然是一个config
// webpack
// __weback_require__()

// webpack 实现的 require() 函数
function __webpack_require__(moduleId) {
  // Check if module is in cache
  // 如果模块已经加载过，直接返回缓存
  if (installedModules[moduleId]) {
    return installedModules[moduleId].exports
  }
  // Create a new module (and put it into the cache)
  // 创建一个新模块，并放入缓存
  var module = (installedModules[moduleId] = {
    i: moduleId,
    l: false,
    exports: {},
  })

  // Execute the module function
  // 执行模块函数
  modules[moduleId].call(
    module.exports,
    module,
    module.exports,
    __webpack_require__
  )

  // Flag the module as loaded
  // 将模块标识为已加载
  module.l = true

  // Return the exports of the module
  return module.exports
}

// vue  react
// 状态管理

// 路由
// store.js
import { createStore } from 'vuex';

export default createStore({
  state: { count: 0 },
  mutations: {
    increment(state) {
      state.count++;
    }
  }
});

// main.js
import { createApp } from 'vue';
import store from './store'; // 单实例

createApp(App).use(store).mount('#app');


// 模态框 loading 
class ModalController {
    constructor() {
      if (ModalController.instance) return ModalController.instance;
      this.modal = null;
      ModalController.instance = this;
    }
  
    open(content) {
      if (!this.modal) {
        this.modal = document.createElement('div');
        // ...初始化模态框DOM
      }
      this.modal.innerText = content;
      document.body.appendChild(this.modal);
    }
  }
  
  // 在任何地方调用都操作同一个模态框
  const modal1 = new ModalController();
  modal1.open("Hello");
  
  const modal2 = new ModalController();
  modal2.open("World"); // 会覆盖之前的模态框内容


//   websocket
// 维持唯一的socket链接 避免重复创建

