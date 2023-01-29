//apply的模拟实现

//apply 的实现跟 call 类似

Function.prototype.apply1 = function (context, arr) {
    var context = Object(context) || window
    context.fn = this

    var result;
    if (!arr) {
        result = context.fn()
    } else {
        var args = []
        for (var i = 0; i < arr.length; i++) {
            args.push('arr[' + i + ']')
        }
        result = eval('context.fn(' + args + ')')
    }
    delete context.fn
    return result
}

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

bar.apply1(null)
console.log(bar.apply1(obj, ['lsz', 18]))