function myBind() {
    if (typeof this !== 'function') {
        //判断调用者是否是函数
        throw new TypeError('提示试图被绑定的对象是不可调用的')
    }
    let self = this, //保存原函数（this指向调用bind者）
        context = [].shift.call(arguments), //把参数中的第一个剪切出来，保存需要绑定的this上下文
        args = [].slice.call(arguments) //剩余参数转换为数组
    return function() {
        self.apply(context, [].concat.call(args, [].slice.call(arguments)))
    }
}