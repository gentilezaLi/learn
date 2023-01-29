//最终版 完整代码

//这里用Symbol定义三种状态，防止外部改变状态
const Pending = Symbol('Pending') //进行中
const FulFilled = Symbol('FulFilled')//已成功
const Rejected = Symbol('Rejected')//已失败
//handleValue函数
const handleValue = (promise, x, resolve, reject) => {
    //循环引用，自己等待自己完成，会出错，用reject传递出错误原因
    if (promise === x) return reject(new TypeError('检测到Promise的链式循环引用'))

    //确保递归解析中只传递出去一次值
    let once = false
    if ((x !== null && typeof x === 'object') || typeof x === 'function') {
        try {
            //防止重复去读取x.then
            let then = x.then
            //判断x是否是promise
            if (typeof then === 'function') {
                //调用then实例方法处理promise执行结果
                then.call(x, y => {
                    if (once) return
                    once = true
                    //防止promise中的promise执行成功之后有传递一个promise过来
                    //要做递归解析
                    handleValue(promise, y, resolve, reject)
                }, r => {
                    if (once) return
                    once = true
                    reject(r)
                })
            } else {
                //如果x是个普通对象，直接调用resolve(x)
                resolve(x)
            }
        } catch (error) {
            if (once) return
            once = true
            reject(error)
        }
    } else {
        //如果x是个原始值，直接调用resolve(x)
        resolve(x)
    }
}

class Promise {
    constructor(exector) {
        this.status = Pending; //存储 Promise 的状态
        this.value = undefined;//存储executor函数中业务代码执行成功的结果
        this.reason = undefined;//存储executor函数中业务代码执行失败的原因
        this.onFulfilled = [];//executor函数中业务代码执行成功回调函数的集合
        this.onRejected = []; //executor函数中业务代码执行失败回调函数的集合

        const resolve = value => {
            if (this.status === Pending) {
                // 只有当状态为 Pending 才会改变，来保证一旦状态改变就不会再变
                this.status = FulFilled
                this.value = value
                // 依次调用成功回调函数
                this.onFulfilled.forEach(fn => fn())
            }
        }

        const reject = value => {
            if (this.status === Pending) {
                // 只有当状态为 Pending 才会改变，来保证一旦状态改变就不会再变
                this.status = Rejected
                this.reason = value
                // 依次调用失败回调函数
                this.onRejected.forEach(fn => fn())
            }
        }

        try {
            exector(resolve, reject)
        } catch (error) {
            reject(error)
        }
    }

    //then方法
    then(onFulfilled, onRejected) {
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : v => v
        onRejected = typeof onRejected === 'function' ? onRejected : err => {
            throw err
        }

        let promise = new Promise((resolve, reject) => {
            if (this.status === FulFilled) {
                setTimeout(() => {
                    try {
                        let x = onFulfilled(this.value)
                        handleValue(promise, x, resolve, reject)
                    } catch (error) {
                        reject(error)
                    }
                }, 0);
            }
            if (this.status === Rejected) {
                if (onRejected && typeof onRejected === 'function') {
                    setTimeout(() => {
                        try {
                            let x = onRejected(this.reason)
                            handleValue(promise, x, resolve, reject)
                        } catch (error) {
                            reject(error)
                        }
                    }, 0);
                }
            }
            if (this.status === Pending) {
                this.onFulfilled.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onFulfilled(this.value)
                            handleValue(promise, x, resolve, reject)
                        } catch (error) {
                            reject(error)
                        }
                    }, 0);
                })
                if (onRejected && typeof onRejected === 'function') {
                    this.onRejected.push(() => {
                        setTimeout(() => {
                            try {
                                let x = onRejected(this.reason)
                                handleValue(promise, x, resolve, reject)
                            } catch (error) {
                                reject(error)
                            }
                        }, 0);
                    })
                }
            }
        })
        return promise;
    }
    //catch方法
    catch(fn) {
        return this.then(null, fn)
    }

    //静态resolve方法
    static resolve(params) {
        if (params instanceof Promise) {
            return params
        }
        return new Promise((resolve, reject) => {
            if (
                params &&
                Object.prototype.toString.call(params) === '[object Object]' &&
                typeof params === 'function'
            ) {
                setTimeout(() => {
                    params.then(resolve, reject)
                }, 0);
            } else {
                resolve(params)
            }
        })
    }

    //静态reject方法
    static reject(params) {
        return new Promise((resolve, reject) => {
            reject(params)
        })
    }

    //静态all方法
    static all(promises) {
        //将参数promises转化为一个真正的数组
        promises = Array.from(promises)
        return new Promise((resolve, reject) => {
            const length = promises.length
            let value = []
            if (length) {
                value = Array.apply(null, {
                    length: length
                })
                for (let i = 0; i < length; i++) {
                    Promise.resolve(promises[i]).then(res => {
                        value[i] = res
                        if (value.length == length) {
                            resolve(value)
                        }
                    }, err => {
                        reject(err)
                        return
                    })
                }
            } else {
                resolve(value)
            }
        })
    }

    //静态race方法
    static race(promises) {
        //将参数promises转化为一个真正的数组
        promises = Array.from(promises)
        return new Promise((resolve, reject) => {
            const length = promises.length
            if (length) {
                for (let i = 0; i < length; i++) {
                    Promise.resolve(promises[i]).then(res => {
                        resolve(res)
                        return
                    }, err => {
                        reject(errr)
                        return
                    })
                }
            } else {
                return
            }
        })
    }
}
