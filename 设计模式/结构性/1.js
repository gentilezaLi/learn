// 适配器模式 Adapter
// 原有功能不变  适配只是中间适配 不增加任何功能 也不改变任何功能

class HKDevice {
  getPlug() {
    return '港行插头'
  }
}

class Target {
  constructor() {
    this.plug = new HKDevice()
  }
  getPlug() {
    // 适配逻辑
    return this.plug.getPlug() + 'xxxxxx 适配'
  }
}

const target = new Target()

target.getPlug()

// 常见场景
// api接口内容 和前端组件的数据格式不一致
// 添加适配层
// 后端返回的数据结构
const backendData = [
  { id: 1, full_name: 'John Doe', created_at: '2023-01-15' },
  { id: 2, full_name: 'Jane Smith', created_at: '2023-02-20' },
]

// 前端表格组件需要的数据结构
// { id: number, name: string, joinDate: string }

// 数据适配器
const userDataAdapter = (data) => {
  return data.map((item) => ({
    id: item.id,
    name: item.full_name,
    joinDate: new Date(item.created_at).toLocaleDateString(),
  }))
}

// 使用适配器
const adaptedData = userDataAdapter(backendData)
/*
  输出:
  [
    { id: 1, name: "John Doe", joinDate: "2023-01-15" },
    { id: 2, name: "Jane Smith", joinDate: "2023-02-20" }
  ]
  */

// 第三方库  api兼容
// 统一地图接口
class MapService {
  display(lat, lng) {
    throw new Error('Method not implemented')
  }
}

// Google Maps 适配器
class GoogleMapsAdapter extends MapService {
  constructor() {
    super()
    this.maps = window.google.maps
  }

  display(lat, lng) {
    new this.maps.Map(document.getElementById('map'), {
      center: { lat, lng },
      zoom: 8,
    })
  }
}

// Mapbox 适配器
class MapboxAdapter extends MapService {
  display(lat, lng) {
    mapboxgl.accessToken = 'YOUR_ACCESS_TOKEN'
    new mapboxgl.Map({
      container: 'map',
      center: [lng, lat],
      zoom: 8,
    })
  }
}

// 使用适配器
function initMap(service) {
  const mapService = new service()
  mapService.display(40.7128, -74.006)
}

// 根据配置切换服务
const mapProvider = config.useMapbox ? MapboxAdapter : GoogleMapsAdapter
initMap(mapProvider)

// 浏览器兼容
// 事件处理适配器
const eventAdapter = {
  addEvent(element, event, handler) {
    if (element.addEventListener) {
      element.addEventListener(event, handler, false)
    } else if (element.attachEvent) {
      element.attachEvent(`on${event}`, handler)
    } else {
      element[`on${event}`] = handler
    }
  },

  removeEvent(element, event, handler) {
    // 类似实现移除逻辑...
  },

  getEventTarget(event) {
    return event.target || event.srcElement
  },
}

// 使用适配器
const button = document.getElementById('myButton')
eventAdapter.addEvent(button, 'click', (e) => {
  const target = eventAdapter.getEventTarget(e)
  console.log('Clicked:', target)
})

// 本地存储场景
// localStorage indexedDb
class StorageAdapter {
  constructor(engine = 'localStorage') {
    this.engine = engine

    if (engine === 'indexedDB') {
      this.db = this._initIndexedDB()
    }
  }

  async setItem(key, value) {
    if (this.engine === 'localStorage') {
      localStorage.setItem(key, JSON.stringify(value))
    } else {
      await this.db.put('store', value, key)
    }
  }

  async getItem(key) {
    if (this.engine === 'localStorage') {
      return JSON.parse(localStorage.getItem(key))
    } else {
      return await this.db.get('store', key)
    }
  }

  _initIndexedDB() {
    return new Promise((resolve) => {
      const request = indexedDB.open('myDatabase', 1)

      request.onupgradeneeded = (e) => {
        const db = e.target.result
        if (!db.objectStoreNames.contains('store')) {
          db.createObjectStore('store')
        }
      }

      request.onsuccess = (e) => resolve(e.target.result)
    })
  }
}

// 使用适配器
const storage = new StorageAdapter('indexedDB')
await storage.setItem('user', { name: 'Alice', id: 123 })
const user = await storage.getItem('user')

// 处理不同的API响应
// API V1 响应格式
const v1Response = {
  user: {
    id: 1,
    full_name: 'John Doe',
    contact_info: 'john@example.com',
  },
}

// API V2 响应格式
const v2Response = {
  data: {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
  },
}

// API 适配器
const apiAdapter = {
  adaptUser(response, version = 'v2') {
    if (version === 'v1') {
      return {
        id: response.user.id,
        name: response.user.full_name,
        email: response.user.contact_info,
      }
    } else {
      return {
        id: response.data.id,
        name: response.data.name,
        email: response.data.email,
      }
    }
  },
}

// 使用适配器
const userV1 = apiAdapter.adaptUser(v1Response, 'v1')
const userV2 = apiAdapter.adaptUser(v2Response)
