// 代理模式
// 引入代理对象 来间接控制对真实对象的访问
// 访问控制 代理对象过滤一些非法请求
// 功能增强 不修改原有对象去扩展一些能力

// 应用场景
// 图片预加载 虚拟代理
// 真实图片对象
const RealImage = {
  setSrc(src) {
    const img = document.createElement('img')
    document.body.appendChild(img)
    img.src = src
  },
}

// 代理对象
const ProxyImage = (() => {
  const tempImg = new Image()
  tempImg.onload = function () {
    RealImage.setSrc(this.src) // 真实图片加载完成后替换
  }
  return {
    setSrc(src) {
      RealImage.setSrc('./loading.gif') // 先显示Loading图
      tempImg.src = src // 后台加载真实图片
    },
  }
})()

// 使用代理
ProxyImage.setSrc('https://example.com/large-image.jpg')

// 函数缓存 缓存代理
const cacheProxy = (fn) => {
  const cache = new Map()
  return async (...args) => {
    const key = JSON.stringify(args)
    if (cache.has(key)) return cache.get(key) // 返回缓存

    const result = await fn(...args)
    cache.set(key, result) // 缓存新结果
    return result
  }
}

// 真实请求函数
const fetchUserData = (userId) => axios.get(`/api/users/${userId}`)

// 使用代理
const cachedFetch = cacheProxy(fetchUserData)
cachedFetch(1) // 首次请求
cachedFetch(1) // 直接返回缓存

// 计算逻辑
// 频繁调用的计算函数

// 请求拦截与转发 跨域代理
// vite.config.js
export default {
  server: {
    proxy: {
      '/api': {
        target: 'http://backend-server.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
}

// 代理沙箱隔离 防止全局污染
window.Proxy ? new ProxySandbox() : '快照沙箱'

window._a 


离开 delete window._a
下次进入 添加上次的快照
window._a

class ProxySandbox {
  constructor() {
    // 1. 创建子应用专属的虚拟全局对象
    this.fakeWindow = Object.create(null)

    // 2. 使用Proxy代理真实window
    this.proxy = new Proxy(window, {
      get: (target, key) => {
        // 3. 优先返回沙箱内部属性
        if (key in this.fakeWindow) {
          return this.fakeWindow[key]
        }

        // 4. 安全访问全局内置对象
        const value = target[key]
        return typeof value === 'function' ? value.bind(target) : value
      },
      set: (target, key, value) => {
        // 5. 所有修改只作用于沙箱内部
        this.fakeWindow[key] = value
        return true
      },
      has: (target, key) => {
        return key in this.fakeWindow || key in target
      },
    })
  }

  // 6. 激活沙箱
  activate() {
    window.__currentSandbox__ = this.proxy
  }

  // 7. 卸载沙箱
  deactivate() {
    this.fakeWindow = Object.create(null)
    delete window.__currentSandbox__
  }
}

// 子应用运行时绑定代理沙箱
const sandbox = new ProxySandbox()
window.__currentSandbox__ = sandbox.proxy


