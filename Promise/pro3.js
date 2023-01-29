//实例方法then微任务的实现


const Pending = Symbol('Pending');//进行中
const Fulfilled = Symbol('Fulfilled');//已成功
const Rejected = Symbol('Rejected');//已失败


class Promise {
    constructor(executor) {
        this.status = Pending;
        this.value = undefined;
        this.reason = undefined;
        this.onFulfilled = [];
        this.onRejected = [];
        const resolve = value => {
            if (this, status === Pending) {
                this.status = Fuifilled
                this.value = value
                this.onFulfilled.forEach(fn => fn())
            }
        }
        const reject = value => {
            if (this.status === Pending) {
                this.status = Rejected
                this.reason = value
                this.onRejected.forEach(fn => fn())
            }
        }
        executor(resolve, reject)
    }
    then(onFulfilled, onRejected) {
        if (this.status === Fuifilled) {
            if (onFulfilled && typeof onFulfilled === 'function') {
                setTimeout(() => {
                    onFulfilled(this.value)
                }, 0)
            }
        }
        if (this.status === Rejected) {
            if (onRejected && typeof onRejected === 'function') {
                setTimeout(() => {
                    onRejected(this.reason)
                }, 0)
            }
        }
        if (this.status === Pending) {
            if (onFulfilled && typeof onFulfilled === 'function') {
                this.onFulfilled.push(() => {
                    setTimeout(() => {
                        onFulfilled(this.value)
                    }, 0);
                })
            }
            if (onRejected && typeof onRejected === 'function') {
                this.onRejected.push(() => {
                    setTimeout(() => {
                        onRejected(this.reason)
                    }, 0);
                })
            }
        }
    }
    //catch方法 实例方法catch实现
    catch(onRejected) {
        this.then(null, onRejected)
    }
}
