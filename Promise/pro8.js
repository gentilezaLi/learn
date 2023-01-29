//静态方法Promise.reject()的实现

//返回一个新的Promise的实例，状态为已失败，并把参数作为失败的原因传递出去


//安排
class Promise {
    //...
    static reject(params) {
        return new Promise((resolve, reject) => {
            reject(params)
        })
    }
}