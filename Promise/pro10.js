//静态方法Promise.race()的实现

//Promise.race()的作用是吧多个Promise实例包装成一个新的Promise的实例

//例如 p=Promise.all(p1,p2,p3),其中p1、p2、p3不是Promise实例的
//内部会通过Promise.resolve()将其转化为Promise实例
//p的状态由p1、p2、p3决定，只要p1、p2、p3中有一个状态改变
//p的状态马上就会对应改变，此时p1、p2、p3中第一个状态改变的返回值会传递给p的回调函数

//安排
class Promise {
    //...
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