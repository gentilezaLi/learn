class Promise {
    constructor(params) {
        this.status = 'pending'
        this.value = undefined
        this.reason = undefined
        this.onResolvedCallbacks = []
        this.onRejectedCallbacks = []

        const resolve = value => {
            if (this.status === 'pending') {
                this.status = 'fulfilled'
                this.value = value
                this.onResolvedCallbacks.forEach(fn => fn())
            }
        }
        
        const reject = reason => {
            if (this.status === 'pending') {
                this.status = 'rejected'
                this.reason = reason
                this.onRejectedCallbacks.forEach(fn => fn())
            }
        }

        try {
            params(resolve, reject)
        } catch (err) {
            reject(err)
        }
    }

    then(onFulfilled, onRejected) {
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value
        onRejected = typeof onRejected === 'function' ? onRejected : err => {
            throw err
        }
        let promise2 = new Promise((resolve, reject) => {
            if (this.status === 'fulfilled') {
                setTimeout(() => {
                    try {
                        let x = onFulfilled(this.value)
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (err) {
                        reject(err)
                    }
                }, 0);
            }
            if (this.status === 'rejected') {
                setTimeout(() => {
                    try {
                        let x = onRejected(this.reason)
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (err) {
                        reject(err)
                    }
                }, 0);
            }
            if (this.status === 'pending') {
                this.onResolvedCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onFulfilled(this.value)
                            resolvePromise(promise2, x, resolve, reject)
                        } catch (err) {
                            reject(err)
                        }
                    }, 0);
                })
                this.onRejectedCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onFulfilled(this.reason)
                            resolvePromise(promise2, x, resolve, reject)
                        } catch (err) {
                            reject(err)
                        }
                    }, 0);
                })
            }
        })
        return promise2;
    }

    catch(fn) {
        return this.then.call(null, fn)
    }

    static resolve(val) {
        if (val instanceof Promise) {
            return val
        }
        return new Promise((resolve, reject) => {
            if (val &&
                Object.prototype.toString.call(val) === '[object object]' &&
                typeof val === 'function'
            ) {
                setTimeout(() => {
                    val.then(resolve, reject)
                }, 0);
            } else {
                resolve(val)
            }
        })
    }

    static reject(val) {
        return new Promise((resolve, reject) => {
            reject(val)
        })
    }

    static all(promises) {
        promises = Array.from(promises)
        return new Promise((resolve, reject) => {
            const length = promises.length
            let value = []
            if (length) {
                value = Array.apply(null, {
                    len: length
                })
                for (let i = 0; i < length; i++) {
                    Promise.resolve(promises[i]).then(res => {
                        value[i] = res
                        if (value.length) {
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
    static rece(promises) {
        promises = Array.from(promises)
        return new Promise((resolve, reject) => {
            const length = promises.length
            if (length) {
                for (let i = 0; i < length; i++) {
                    Promise.resolve(promises[i]).then(res => {
                        resolve(res)
                        return
                    }, err => {
                        reject(err)
                        return
                    })
                }
            } else {
                return
            }
        })
    }
}

function promise2(paomise, x, resolve, reject) {
    if (x === promise) return reject(new TypeError('检测到Promise的链式循环引用'))
    let once = false
    if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
        try {
            let then = x.then
            if (typeof then === 'function') {
                then.call(x, y => {
                    if (once) return
                    once = true
                    promise2(paomise, y, resolve, reject)
                }, err => {
                    if (once) return
                    once = true
                    reject(err)
                })
            } else {
                resolve(x)
            }
        } catch (err) {
            if (once) return
            once = true
            reject(err)
        }
    } else {
        resolve(x)
    }
}
const test = new Promise((res, rej) => {
    setTimeout(() => {
        res('resolve after 2000ms');
    }, 2000)
})

test.then(res => {
    console.error('res: ', res);	// res: resolve after 2000ms
})