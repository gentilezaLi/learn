//TypeScript 函数泛型-难点

//1.编写一个联合类型 Demo

//作一个简单的join方法，方法接受两个参数first和second,参数有可能是字符串类型，也有可能是数字类型
//方法里为了保证都可以使用，所以我们只作了字符串的基本拼接

function join(first: string | number, second: string | number) {
    return `${first}${second}`
}

console.log(join('lsz', 123))

//这个方法现在没有任何问题，但现在有这样一个需求，就是first参数如果传的是字符串类型，要求second也传字符串类型.同理，如果是number类型，就都是number类型

//现在所学的知识就完成不了啦，所以需要学习泛型来解决这个问题


//2.初始泛型概念-generic
//泛型：generic - 通用、泛指的意思,那最简单的理解，泛型就是泛指的类型

//泛型的定义使用<>（尖角号）进行定义的，比如现在给joinA方法一个泛型，名字就叫做JSLsz

function joinA<JSLsz>(first: JSLsz, second: JSLsz) {
    return `${first}${second}`
}
// console.log(joinA<string>('lsz', 456))   //456 会报错
console.log(joinA<string>('lsz', '456'))   //456 会报错

console.log(joinA<number>(123, 789))



//3.泛型中数组的使用

//如果传递过来的值要求是数字，如何用泛型进行定义那?
//两种方法，第一种是直接使用[]，第二种是使用Array<泛型>

//第一种写法
function myFun<ANY>(params: ANY[]) {
    return params;
}
console.log(myFun<string>(["123", "456"]))

//第二种写法
function myFunA<ANY>(params: Array<ANY>) {
    return params;
}
console.log(myFunA<string>(['123', '456789']))

//在工作中，经常使用<T>来作泛型的表示，当然这不是硬性的规定，只是大部分程序员的习惯性写法



//4.多个泛型的定义

//一个函数只能定义一个泛型吗?当然不是，是可以定义多个的
//这里还是拿joinB方法举例，定义多个泛型，比如第一个泛型用T,第二个用P代表

function joinB<T, P>(first: T, second: P) {
    return `${first}${second}`
}
console.log(joinB<string, number>('123', 789))



//5.泛型的类型推断

//泛型也是支持类型推断的，比如下面的代码并没有报错，这就是类型推断的功劳

function joinC<T, P>(first: T, second: P) {
    return `${first}${second}`
}
console.log(joinC('123', 78946))