function reactive(target) {
    if (typeof target !== 'object') {
      console.warn(`reactive ${target} 必须是一个对象`)
      return target
    }
    return new Proxy(target, get, set)
  }
  
  //get 中直接返回读取的数据，这里的 Reflect.get 和 target[key]实现的结果是一致的；并且返回值是对象的话，还会嵌套执行 reactive，并且调用 track 函数收集依赖。
  //set 中调用 trigger 函数，执行 track 收集的依赖。
  
  const get = createGetter()
  const set = createSetter()
  
  function createGetter(shallow = false) {
    return function get(target, key, receiver) {
      const res = Reflect.get(target, key, receiver)
      track(target, 'get', key)
      if (isObject(res)) {
        //值也是对象的话，需要嵌套调用reactive
        //res就是targer[key]
        //浅层代理，不需要嵌套
        return shallow ? res : reactive(res)
      }
      return res
    }
  }
  
  function createSetter() {
    return function (target, key, value, receiver) {
      const result = Reflect.set(target, key, value, receiver)
      //在触发set的时候进行触发依赖
      trigger(target, 'set', key)
      return result
    }
  }
  
  const targetMap = new WeakMap()
  let activeEffect = null
  
  function track(target, type, key) {
    console.log('arget, type,key: ', target, type, key)
    //1.首现基于targer找到对应的dep
    //如果是第一次的话，需要初始化
    // {
    //     target1:{  //depsmap
    //         key:[effect1,effect2]
    //     }
    // }
    let depsMap = targetMap.get(target)
    if (!depsMap) {
      //初始化depsMap
      // depsMap=new Map()
      // targetMap.set(target,depsMap)
      //上面两行可以简写成下面的
      targetMap.set(target, (depsMap=new Map()))
    }
    let deps = targetMap.get(key)
    if (!deps) {
      deps = new Set()
    }
    //由于 target 是对象，所以必须得用 map 才可以把 target 作为 key 来管理数据，每次操作之前需要做非空的判断。最终把 activeEffect 存储在集合之中：
    if (!deps.has(activeEffect) && activeEffect) {
      //防止重复注册
      deps.add(activeEffect)
    }
    depsMap.set(key, deps)
  }
  
  // trigger 函数实现的思路就是从 targetMap 中，根据 target 和 key 找到对应的依赖函数集合 deps，然后遍历 deps 执行依赖函数。
  function trigger(target, type, key) {
    console.log('target,type,key: ', target, type, key)
    //从targetMap中找到触发的函数，执行它
    const depsMap = targetMap.get(target)
    if (!depsMap) {
      //没找到依赖
      return
    }
    const deps = depsMap.get(key)
    if (!deps) {
      return
    }
    deps.forEach((effectFn) => {
      //可以看到执行的是 effect 的 scheduler 或者 run 函数，这是因为我们需要在 effect 函数中把依赖函数进行包装，
      //并对依赖函数的执行时机进行控制，这是一个小的设计点。
      if (effectFn.scheduler) {
        effectFn.sechduler()
      } else {
        effectFn()
      }
    })
  }
  
  //effect函数
  //把传递进来的 fn 函数通过 effectFn 函数包裹执行，在 effectFn 函数内部，把函数赋值给全局变量 activeEffect；然后执行 fn() 的时候，
  //就会触发响应式对象的 get 函数，get 函数内部就会把 activeEffect 存储到依赖地图中，完成依赖的收集：
  function effect(fn, options = {}) {
    //effect嵌套，通过队列管理
    const effectFn = () => {
      try {
        activeEffect = effectFn
        //fn执行的时候，内部读取响应式数据的时候，就能在get配置里读取到activeEffect
        return fn()
      } finally {
        activeEffect = null
      }
    }
    if (!options.lazy) {
      //没有配置lazy直接执行
      effectFn()
    }
    effectFn.scheduler = options.scheduler //调度时机watchEffect会用到
  
    //可以通过传递 lazy 和 scheduler 来控制函数执行的时机，默认是同步执行。
  
    //scheduler 存在的意义就是我们可以手动控制函数执行的时机，方便应对一些性能优化的场景，
    //比如数据在一次交互中可能会被修改很多次，不想每次修改都重新执行依次 effect 函数，而是合并最终的状态之后，最后统一修改一次。
    return effectFn
  }
  
  // const proxy = new Proxy(target, mutableHandlers)
  
  //ref
  //ref 的执行逻辑要比 reactive 要简单一些
  //不需要使用 Proxy 代理语法，直接使用对象语法的 getter 和 setter 配置，监听 value 属性即可。
  
  //在 ref 函数返回的对象中，对象的 get value 方法，使用 track 函数去收集依赖，set value 方法中使用 trigger 函数去触发函数的执行。
  function ref(val) {
    if (isRef(val)) {
      return val
    }
    return new RefImpl(val)
  }
  
  function isRef(val) {
    return !!(val && val.__isRef)
  }
  // ref就是利用面向对象的getter和setters进行track和trigget
  class RefImpl {
    constructor(val) {
      this.__isRef = true
      this._val = convert(val)
    }
    get value() {
      track(this, 'value')
      return this._val
    }
    set value(val) {
      if (val !== this._val) {
        this._val = convert(val)
        trigger(this, 'value')
      }
    }
  }
  //ref也可以支持复杂数据结构
  function convert(val) {
    return isObject(val) ? reactive(val) : val
  }
  
  //computed  computed 可以传递一个函数或者对象，实现计算属性的读取和修改。
  //拦截 computed 的 value 属性，并且定制了 effect 的 lazy 和 scheduler 配置，
  //computed 注册的函数就不会直接执行，而是要通过 scheduler 函数中对 _dirty 属性决定是否执行。
  function computed(getterOrOptions) {
    //getterOrOptions可以是函数，也可以是一个对象，支持get和set
    let getter, setter
    if (typeof getterOrOptions === 'function') {
      getter = getterOrOptions
      setter = () => {
        console.warn('计算属性不能修改')
      }
    } else {
      getter = getterOrOptions.get
      setter = getterOrOptions.set
    }
    return new ComputedRefImpl(getter, setter)
  }
  class ComputedRefImpl {
    constructor(getter, setter) {
      this._setter = setter
      this._val = undefined
      this._dirty = true //dirty 脏
      //conmpted是一个特殊的effect，设置lazy和执行时机
      this.effect = effect(getter, {
        lazy: true,
        scheduler: () => {
          if (!this._dirty) {
            this._dirty = true
            trigger(this, 'value')
          }
        },
      })
    }
    get value() {
      track(this, 'value')
      if (this._dirty) {
        this._dirty = false
        this._val = this.effect()
      }
      return this._val
    }
    set value(val) {
      this._setter(val)
    }
  }
  
  //响应式的主要功能就是可以把普通的 JavaScript 对象封装成为响应式对象，在读取数据的时候通过 track 收集函数的依赖关系，把整个对象和 effect 注册函数的依赖关系全部存储在一个依赖图中。
  //定义的 dependsMap 是一个巨大的 Map 数据，effect 函数内部读取的数据都会存储在 dependsMap 中，数据在修改的时候，通过查询 dependsMap，获得需要执行的函数，再去执行即可。
  //dependsMap 中存储的也不是直接存储 effect 中传递的函数，而是包装了一层对象对这个函数的执行实际进行管理，内部可以通过 active 管理执行状态，还可以通过全局变量 shouldTrack 控制监听状态，并且执行的方式也是判断 scheduler 和 run 方法，实现了对性能的提升。
  