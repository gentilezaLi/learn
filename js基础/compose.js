//https://juejin.cn/post/6989815456416661534


// 分类:

// Sync*（同步版本compose）: 

// 1.SyncHook （串行同步执行, 不关心返回值）
// 2.SyncBailHook （串行同步执行，如果返回值不是null，则剩下的函数不执行）
// 3.SyncWaterfallHook（串行同步执行，前一个函数的返回值作为后一个函数的参数，跟我们之前将的redux中间件原理是一个道理，迭代实现，更简单）
// 4.SyncLoopHook （串行同步执行，订阅者返回true表示继续执行后面的函数，返回undefine表示不执行后面的函数）


// Async*（异步版本compose）:

// 5.AsyncParallelHook 不关心返回值，并发异步函数而已，没顺序要求
// 6.AsyncSeriesHook 异步函数数组要求按顺序调用
// 7.AsyncSeriesBailHook 可中断的异步函数链
// 8.AsyncSeriesWaterfallHook 异步串行瀑布钩子函数

// 1.SyncHook
// 串行同步执行,不关心返回值
//面向对象式
// class SyncHook {
//     constructor(name) {
//         this.tasks = []
//         this.name = name
//     }
//     tap(task) {
//         this.tasks.push(task)
//     }
//     call() {
//         this.tasks.forEach(x => x(...arguments))
//     }
// }
// let queue = new SyncHook('name')
// queue.tap(function (...args) { console.log(args) })
// queue.tap(function (...args) { console.log(args) })
// queue.tap(function (...args) { console.log(args) })
// queue.call('hello')

//函数式
// function compose(...fns) {
//     return (...args) => fns.forEach(task => task(...args))
// }

// 2.SyncBailHook
// 串行同步执行，bail是保险丝的意思，有一个返回值不为null则跳过剩下的逻辑
//面向对象式
// class SyncBailHook {
//     constructor(name) {
//         this.tasks = [];
//         this.name = name;
//     }
//     tap(task) {
//         this.tasks.push(task);
//     }
//     call() {
//         let i = 0, ret
//         do {
//             ret = this.tasks[i++](...arguments)

//         } while (!ret)
//     }
// }
// let queue = new SyncBailHook('name');

// queue.tap(function(name){
//   console.log(name,1);
// });

// queue.tap(function(name){
//   console.log(name,2);
//   return 'Wrong';
// });

// queue.tap(function(name){
//   console.log(name,3);
// });

// queue.call('hello SyncBailHook');



