// 消息队列和事件循环

// 第一个问题是如何处理高优先级的任务。
// 如果 DOM 发生变化，采用同步通知的方式，会影响当前任务的执行效率；如果采用异步方式，又会影响到监控的实时性。
// 通常我们把消息队列中的任务称为宏任务，每个宏任务中都包含了一个微任务队列，在执行宏任务的过程中，如果 DOM 有变化，那么就会将该变化添加到微任务列表中，这样就不会影响到宏任务的继续执行，因此也就解决了执行效率的问题。等宏任务中的主要功能都直接完成之后，这时候，渲染引擎并不着急去执行下一个宏任务，而是执行当前宏任务中的微任务，因为 DOM 变化的事件都保存在这些微任务队列中，这样也就解决了实时性问题。
// 第二个是如何解决单个任务执行时长过久的问题。
// JavaScript 可以通过回调功能来规避这种问题，也就是让要执行的 JavaScript 任务滞后执行。

// 1.如果有一些确定好的任务，可以使用一个单线程来按照顺序处理这些任务，这是第一版线程模型。
// 2.要在线程执行过程中接收并处理新的任务，就需要引入循环语句和事件系统，这是第二版线程模型。
// 3.如果要接收其他线程发送过来的任务，就需要引入消息队列，这是第三版线程模型。
// 4.如果其他进程想要发送任务给页面主线程，那么先通过 IPC 把任务发送给渲染进程的 IO 线程，IO 线程再把任务发送给页面主线程。
// 5.消息队列机制并不是太灵活，为了适应效率和实时性，引入了微任务。

// 事件循环系统，我们知道渲染进程中所有运行在主线程上的任务都需要先添加到消息队列，然后事件循环系统再按照顺序执行消息队列中的任务。

// setTimeout
// 浏览器的页面是通过消息队列和事件循环系统来驱动的。
// settimeout的函数会被加入到延迟消息队列中，
// 等到执行完Task任务之后就会执行延迟队列中的任务。然后分析几种场景下面的setimeout的执行方式。
// 1. 如果执行一个很耗时的任务，会影响延迟消息队列中任务的执行
// 2. 存在嵌套带调用时候，系统会设置最短时间间隔为4s（超过5层）
// 3. 未激活的页面，setTimeout最小时间间隔为1000ms
// 4. 延时执行时间的最大值2147483647，溢出会导致定时器立即执行
// 5. setTimeout设置回调函数this会是回调时候对应的this对象，可以使用箭头函数解决

// XMLHttpRequest
// 将一个函数作为参数传递给另外一个函数，那作为参数的这个函数就是回调函数。
// 回调函数 callback 是在主函数 返回之前执行的，我们把这个回调过程称为同步回调。
// 把这种回调函数在主函数外部执行的过程称为异步回调。
// 一般有两种方式：
// 第一种是把异步函数做成一个任务，添加到信息队列尾部；
// 第二种是把异步函数添加到微任务队列中，这样就可以在当前任务的末尾处执行微任务了。

// 宏任务
// 为了协调这些任务有条不紊地在主线程上执行，页面进程引入了消息队列和事件循环机制，渲染进程内部会维护多个消息队列，比如延迟执行队列和普通的消息队列。然后主线程采用一个 for 循环，不断地从这些任务队列中取出任务并执行任务。我们把这些消息队列中的任务称为宏任务。
// 1.渲染事件（如解析 DOM、计算布局、绘制）；
// 2.用户交互事件（如鼠标点击、滚动页面、放大缩小等）；
// 3.JavaScript 脚本执行事件；
// 4.网络请求完成、文件读写完成事件。
// setTimeout 函数触发的回调函数都是宏任务

// 微任务
// 1.第一种是把异步回调函数封装成一个宏任务，添加到消息队列尾部，当循环系统执行到该任务的时候执行回调函数。
// 2.第二种方式的执行时机是在主函数执行结束之后、当前宏任务结束之前执行回调函数，这通常都是以微任务形式体现的。
// 微任务就是一个需要异步执行的函数，执行时机是在主函数执行结束之后、当前宏任务结束之前。
// 分析：
// 不过要搞清楚微任务系统是怎么运转起来的，就得站在 V8 引擎的层面来分析下。
// 我们知道当 JavaScript 执行一段脚本的时候，V8 会为其创建一个全局执行上下文，在创建全局执行上下文的同时，V8 引擎也会在内部创建一个微任务队列。顾名思义，这个微任务队列就是用来存放微任务的，因为在当前宏任务执行的过程中，有时候会产生多个微任务，这时候就需要使用这个微任务队列来保存这些微任务了。不过这个微任务队列是给 V8 引擎内部使用的，所以你是无法通过 JavaScript 直接访问的。也就是说每个宏任务都关联了一个微任务队列。
// 我们就需要分析两个重要的时间点——微任务产生的时机和执行微任务队列的时机。

// 微任务是怎么产生的？在现代浏览器里面，产生微任务有两种方式。
// 第一种方式是使用 MutationObserver 监控某个 DOM 节点，然后再通过 JavaScript 来修改这个节点，或者为这个节点添加、删除部分子节点，当 DOM 节点发生变化时，就会产生 DOM 变化记录的微任务。
// 第二种方式是使用 Promise，当调用 Promise.resolve() 或者 Promise.reject() 的时候，也会产生微任务。
// 执行微任务队列的时机。
// 通常情况下，在当前宏任务中的 JavaScript 快执行完成时，也就在 JavaScript 引擎准备退出全局执行上下文并清空调用栈的时候，JavaScript 引擎会检查全局执行上下文中的微任务队列，然后按照顺序执行队列中的微任务。WHATWG 把执行微任务的时间点称为检查点。
// 如果在执行微任务的过程中，产生了新的微任务，同样会将该微任务添加到微任务队列中，V8 引擎一直循环执行微任务队列中的任务，直到队列为空才算执行结束。也就是说在执行微任务过程中产生的新的微任务并不会推迟到下个宏任务中执行，而是在当前的宏任务中继续执行。
// 结论：
// 1.微任务和宏任务是绑定的，每个宏任务在执行时，会创建自己的微任务队列。
// 2.微任务的执行时长会影响到当前宏任务的时长。比如一个宏任务在执行过程中，产生了 100 个微任务，执行每个微任务的时间是 10 毫秒，那么执行这 100 个微任务的时间就是 1000 毫秒，也可以说这 100 个微任务让宏任务的执行时间延长了 1000 毫秒。所以你在写代码的时候一定要注意控制微任务的执行时长。
// 3.在一个宏任务中，分别创建一个用于回调的宏任务和微任务，无论什么情况下，微任务都早于宏任务执行。
