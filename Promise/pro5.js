//实例方法then值穿透的实现
import handleValue from '../Promise/pro4';

//在pro4.js中 then链式调用的实现过程中，已经实现了值传递，当然是在then有传入参数的场景下

//如果在实例方法then中没传入参数
const test = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('执行成功')
    }, 3000);
})
test.then().then(res => {
    console.log(res)
})

//此时后面的实例方法依旧可以得到之前实例方法then的返回值，这就是所谓的值的穿透

const Pending = Symbol('Pending');//进行中
const Fulfilled = Symbol('Fulfilled');//已成功
const Rejected = Symbol('Rejected');//已失败

class Promise {
    constructor(exector) {
        this.status = Pending
        this.value = undefined
        this.reason = undefined
        this.onFilfilled = []
        this.onRejected = []
        const resolve = value => {
            if (this.status === Pending) {
                this.status = Fulfilled
                this.value = value
                this.onFilfilled.forEach(fn => fn())
            }
        }
        const reject = value => {
            if (this.status === Pending) {
                this.status = Rejected
                this.reason = value
                this.onRejected.forEach(fn => fn())
            }
        }
        exector(resolve, reject)
    }

    then(onFulfilled, onRejected) {
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : v => v
        onRejected = typeof onRejected === 'function' ? onRejected : err => { throw err }
        let promise = new Promise((resolve, reject) => {
            if (this.status === Fuifilled) {
                setTimeout(() => {
                    let x = onFulfilled(this.value)
                    handleValue(promise, x, resolve, reject)
                }, 0);
            }
            if (this.status === Rejected) {
                if (onRejected && typeof onRejected === 'function') {
                    setTimeout(() => {
                        let x = onRejected(this.reason)
                        handleValue(promise, x, resolve, reject)
                    }, 0);
                }
            }
            if (this.status === Pending) {
                this.onFilfilled.push(() => {
                    setTimeout(() => {
                        let x = onFulfilled(this.value)
                        handleValue(promise, x, resolve, reject)
                    }, 0);
                })
                if (onRejected && typeof onRejected === 'function') {
                    this.onRejected.push(() => {
                        setTimeout(() => {
                            let x = onRejected(this.reason)
                            handleValue(promise, x, resolve, reject)
                        }, 0);
                    })
                }
            }
        })
        return promise
    }
}

