//1.初步搭建promise函数

//Promise 是个类，在 ES6 中用 Class 语法创建
//Promise 构造函数接收 executor 函数作为参数，且在其中执行 executor 函数
//Promise 构造函数中有 resolve 和 reject 内置方法，并作为参数传递给 executor 函数
//设置个实例属性 status 来存储状态
//内置函数 resolve 可以把状态变为已成功，内置函数 reject 可以把状态变为已失败，且一旦状态改变就不会再变

//用Synmol定义三种状态，防止外界改变
const Pending = Symbol('Pending');//进行中
const Fuifilled = Symbol('Fuifilled');//已成功
const Rejected = Symbol('Rejected'); // 已失败

class Promise {
    constructor(executor) {
        this.status = Pending;//存储Promise的状态
        const resolve = () => {
            //只有状态为pending才会改变，来保证一旦状态改变就不会再变
            if (this.status === Pending) {
                this.status = Fuifilled
            }
        }
        const reject = () => {
            //只有状态为pending才会改变，来保证一旦状态改变就不会再变
            if (this.status === Pending) {
                this.status = Rejected
            }
        }
        executor(resolve, reject)
    }
}


