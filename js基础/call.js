//JavaScript深入之call和apply的模拟实现

//call    call() 方法在使用一个指定的 this 值和若干个指定的参数值的前提下调用某个函数或方法

var foo = {
    value: 1
};

function bar() {
    console.log(this.value);
}

// bar.call(foo); // 1

//call 改变了 this 的指向，指向到 foo
//bar 函数执行了


//模拟实现第一步

//试想当调用 call 的时候，把 foo 对象改造成如下：

var foo = {
    value: 1,
    bar: function () {
        console.log(this.value)
    }
};

// foo.bar(); // 1

// 给 foo 对象本身添加了一个属性      用 delete 再删除它


// 所以模拟的步骤可以分为：

// 将函数设为对象的属性
// 执行该函数
// 删除该函数

//第一版
Function.prototype.call1 = function (context) {
    //首先要获取调用call的函数，用this可以获取
    context.fn = this
    context.fn()
    delete context.fn
}
//测试一下
var foo = {
    value: 1
}
function bar() {
    console.log('[ this.value ] >', this.value)
}
// bar.call1(foo)  //1


//模拟实现第二步

// call 函数还能给定参数执行函数

var foo = {
    value: 1
};

function bar(name, age) {
    console.log(name)
    console.log(age)
    console.log(this.value);
}

// bar.call(foo, 'kevin', 18);
// kevin
// 18
// 1

//注意：传入的参数并不确定

//第二版
Function.prototype.call2 = function (context) {
    context.fn = this
    var args = []
    for (var i = 1, len = arguments.length; i < len; i++) {
        args.push('arguments[' + i + ']');
    }
    eval('context.fn(' + args + ')');
    delete context.fn;
    delete context.fn
}

// 测试一下
var foo = {
    value: 2
};
function bar(name, age) {
    console.log(name)
    console.log(age)
    console.log(this.value);
}
// bar.call2(foo,'lsz',18)



//第三版 

// this 参数可以传 null，当为 null 的时候，视为指向 window
// 函数是可以有返回值的！

Function.prototype.call2 = function (context) {
    var context = context || window;   //window 得运行在浏览器环境下  node环境window找不到
    context.fn = this;

    var args = [];
    for (var i = 1, len = arguments.length; i < len; i++) {
        args.push('arguments[' + i + ']');
    }

    var result = eval('context.fn(' + args + ')');

    delete context.fn
    return result;
}

// 测试一下
var value = 2;

var obj = {
    value: 1
}

function bar(name, age) {
    console.log(this.value);
    return {
        value: this.value,
        name: name,
        age: age
    }
}

bar.call2(null); // 2

console.log(bar.call2(obj, 'kevin', 18));

// 1
// Object {
//    value: 1,
//    name: 'kevin',
//    age: 18
// }
