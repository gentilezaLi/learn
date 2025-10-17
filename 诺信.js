// nodjes中间件 666

// Express框架中一个非常重要的概念——中间件。在Express框架中，允许通过中间件的使用来调用各种第三方类库，这让我们的开发工作变得更为方便，也使得我们可以开发出各种更为强大的应用程序。
// 一个中间件是一个用于处理客户端请求的函数。一个HTTP服务器中可能会使用到各种中间件。当接收到一个客户端请求时，首先将该请求提交给第一个中间件函数，每一个中间件函数内部封装一个next回调函数，在一个中间件函数内部可以判断是否调用next回调函数来处理该客户端请求。一个最简单的中间件的书写方法如下所示。
// function middleware(req,res,next){next()}
// 在Express框架中，使用应用程序实例对象的use方法来调用一个中间件，该方法的使用方式如下所示。
// app.use([path],function)
// 在use方法中，使用两个参数，其中path参数为可选参数，function参数为必须指定参数。path参数值为一个字符串，用于指定何种路径应用中间件，默认参数值为“/”。function参数值为一个函数，用于指定我们所要调用的中间件函数。

// koa2的洋葱模型的理解
// koa2中间件是基于async / await实现的，其执行过程是通过next来驱动的，于是，koa2就有了一个特殊的执行顺序，我们为这种执行顺序设定了一个模型叫--洋葱模型
const Koa = require('koa');
const app = new Koa();

// logger
app.use(async(ctx, next) => {
    console.log('第一层洋葱 - 开始')
    await next();
    const rt = ctx.response.get('X-Response-Time');
    console.log(`${ctx.method} ${ctx.url} - ${rt}`);
    console.log('第一层洋葱 - 结束')
});

// x-response-time
app.use(async(ctx, next) => {
    console.log('第二层洋葱 - 开始')
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    ctx.set('X-Response-Time', `${ms}ms`);
    console.log('第二层洋葱 - 结束')
});

// response
app.use(async ctx => {
    console.log('第三层洋葱 - 开始')
    ctx.body = 'Hello World';
    console.log('第三层洋葱 - 结束')
});

app.listen(8000);

// 我们执行一下上面代码。会发现打印结果是

// 第一层洋葱 - 开始
// 第二层洋葱 - 开始
// 第三层洋葱 - 开始
// 第三层洋葱 - 结束
// 第二层洋葱 - 结束
// 第一层洋葱 - 结束
// 这就是洋葱模型，一个执行顺序。

// 1：mvvm和mvc区别
// MVC全名是Model View Controller，是模型(model)－视图(view)－控制器(controller)的缩写，一种软件设计典范，用一种业务逻辑、数据、界面显示分离的方法组织代码，将业务逻辑聚集到一个部件里面，在改进和个性化定制界面及用户交互的同时，不需要重新编写业务逻辑。MVC被独特的发展起来用于映射传统的输入、处理和输出功能在一个逻辑的图形化用户界面的结构中。
// MVC的思想：一句话描述就是Controller负责将Model的数据用View显示出来，换句话说就是在Controller里面把Model的数据赋值给View。

// MVVM：Model、View、ViewModel。
// Model负责对数据进行取和存，然而我们对数据的操作除了取和存以外，还有一个非常重要的操作：解析。

// MVC：Model-View-Controller 模型-视图-控制器
// MVVM：Model-View-ViewModel 模型-视图-视图模型

// 相同点：都是为了分离View和Model，M注重数据，V注重视图，使Model和View更易于维护。
// 不同：MVC是系统架构级别的，MVVM是用于单页面上的，MVVM的灵活性大于MVC。

// MVC是Controller从View视图层收集数据，然后向相关模型请求数据并返回相应的视图来完成交互请求。
// MVVM本质上是MVC的改进版，其最重要的特性是数据绑定，此外还包括依赖注入，路由配置，数据模板等一些特性。

// 2：怎样理解vue  单向数据流     ok

// 数据从父级组件传递给子组件，只能单向绑定。
// 子组件内部不能直接修改从父级传递过来的数据。
// 所有的 prop 都使得其父子 prop 之间形成了一个单向下行绑定：父级 prop 的更新会向下流动到子组件中，但是反过来则不行。
// 这样会防止从子组件意外改变父级组件的状态，从而导致你的应用的数据流向难以理解。
// 额外的，每次父级组件发生更新时，子组件中所有的 prop 都将会刷新为最新的值。
// 这意味着你不应该在一个子组件内部改变 prop。如果你这样做了，Vue 会在浏览器的控制台中发出警告。
// 子组件想修改时，只能通过 $emit 派发一个自定义事件，父组件接收到后，由父组件修改。

// 3：vuex  有哪几种属性 作用和使用方法   回答不完整

// VueX 是一个专门为 Vue.js 应用设计的状态管理构架，统一管理和维护各个vue组件的可变化状态(你可以理解成 vue 组件里的某些 data) 。
// Vuex有五个核心概念：
// state, getters, mutations, actions, modules。
// 1. state：vuex的基本数据，用来存储变量
// 2. getters：从基本数据(state)派生的数据，相当于state的计算属性
// 3. mutation：提交更新数据的方法，必须是同步的(如果需要异步使用action) 。每个 mutation 都有一个字符串的 事件类型(type) 和 一个 回调函数(handler) 。
// 回调函数就是我们实际进行状态更改的地方，并且它会接受 state 作为第一个参数，提交载荷作为第二个参数。
// 4. action：和mutation的功能大致相同，不同之处在于 ==》1. Action 提交的是 mutation，而不是直接变更状态。 2. Action 可以包含任意异步操作。
// 5. modules：模块化vuex，可以让每一个模块拥有自己的state、mutation、action、getters, 使得结构非常清晰，方便管理。

// const user = {
//     state: {
//         self: null,
//         token: '',
//     },
//     mutations: {
//         SET_SELF: (state, self) => {
//             state.self = self
//         },
//         SET_TOKEN: (state, token) => {
//             state.token = token
//         }
//     },
//     actions: {
//         login({ commit }, res) {
//             commit('SET_SELF', res.self)
//             commit('SET_TOKEN', res.token
//         }
//     }
// export default user  

// 　　使用下面这两种方法存储数据：
//     dispatch：异步操作，写法： this.$store.dispatch('mutations方法名', 值)
// 　　commit：同步操作，写法：this.$store.commit('mutations方法名', 值)

// 4：vue  activated 和  deactivated 生命周期    不会

// 注意：只有当组件在 <keep-alive> 内被切换，才会有activated 和 deactivated 这两个钩子函数
// <keep-alive> 包裹动态组件时，会缓存不活动的组件实例，而不是销毁它们。
// 通过描述我们知道，它会缓存不活动的组件，而不是销毁。这样组件之间的切换就能保存上个组件的状态，而不是切换之后又得重新操作

// 例如有a和b两个组件   a组件有切换按钮 控制show和hide 在a组件分别打印created、activated、deactivated  b组件是普通组件  父组件包含a、b组件 有两个按钮分别控制a、b的内容展示并用 <keep-alive>包裹

// 点击按钮a切换到a组件，可以看到created和activated执行了。然后我们把a组件的show切换成hide，在进行组件切换。
// 可以看到离开的A组件的时候deactivated执行了（每次离开当前组件都会执行），再切换回来activated执行了（activated每次切换回来都会执行）、created没有执行（因为组件是缓存并不是销毁，所以created只会执行一次）。而且我们在组件切换之前改的hide，切换回来还是hide，这样就能一直保存组件的状态了。

// 5：vue slot插槽    作用域插槽不会   插槽、具名插槽、作用域插槽

// 什么时候用到slot
// 父组件要传递内容给子组件

// 具名插槽，给插槽起一个名字，对传递内容进行唯一性的标识
{
    /* <div id="root">
        <body-content>
            <div class="header" slot="header">header</div> //重点在这
            <div class="footer" slot="footer">footer</div> //重点在这
        </body-content> 
      </div>

      <script>
        Vue.component('body-content',{
           template: `<div>
                        <slot name="header"></slot>   //重点在这
                        <div class='content'>content</div>
                        <slot name="footer"></slot>   //重点在这
                      </div>`
        })

        var vm = new Vue({
          el: "#root"
        })
      </script> */
}

// 作用域插槽
// 当子组件做循环显示列表 或 某一部分由外部传递进来 时，则使用 作用域插槽

//     < body >
//      <div id="root">
//          <child>
//            <template slot-scope="props">
//                <h1>{{props.item}}</h1>
// 	   </template>
//          </child>
//      </div>

//    <script>
//         Vue.component('child', {
//        data: function(){
//           return {
// 	    list: [1, 2, 3, 4]
// 	   }
//        },
//        template: `<div>
//                     <ul>
//                      <slot 
//                         v-for="item of list"
//                         :item=item
//                      ></slot>
//                    </ul>
//                  </div>`
// 	})

// 	var vm = new Vue({
// 	   el:'#root'
// 	})
//     </script>
// </>
// 子组件向父组件插槽里传数据，如 :item=item

// 父组件接收数据并需在外层使用 作用域插槽（必须用） <template></template>，同时声明属性名 接收子组件传递的数据,如 slot-scope="props" , 然后在dom标签使用该数据，通常用插值表达式接收具体数据。


// 6：vue-router 全局钩子函数   不会    

// vue router.beforeEach（全局前置守卫）
// beforeEach的钩子函数，它是一个全局的before 钩子函数， （before each）意思是在 每次每一个路由改变的时候都得执行一遍。
// 它的三个参数：
// to: (Route路由对象) 即将要进入的目标 路由对象 to对象下面的属性： path params query hash fullPath matched name meta（在matched下，但是本例可以直接用）
// from: (Route路由对象) 当前导航正要离开的路由
// next: (Function函数) 一定要调用该方法来 resolve 这个钩子。 调用方法：next(参数或者空) ***必须调用

// 应用场景：可进行一些页面跳转前处理，例如判断需要登录的页面进行拦截，做登录跳转！！
router.beforeEach((to, from, next) => {
            if (to.meta.requireAuth) {
                //判断该路由是否需要登录权限
                if (cookies('token')) {
                    //通过封装好的cookies读取token，如果存在，name接下一步如果不存在，那跳转回登录页
                    next() //不要在next里面加"path:/",会陷入死循环
                } else {
                    next({
                        path: '/login',
                        query: { redirect: to.fullPath } //将跳转的路由path作为参数，登录成功后跳转到该路由
                    })
                }
            } else {
                next()
            }
        }

        // vue router.afterEach（全局后置守卫） router.beforeEach 是页面加载之前，相反router.afterEach是页面加载之后 

        // 路由独享的守卫(路由内钩子)  beforeEnter
        // 组件内的守卫(组件内钩子)  beforeRouteEnter、beforeRouteUpdate、beforeRouteLeave



        // 7：双向绑定底层原理   了解一点

        // 1、如何实现双向绑定？
        // 以用户提交表单为例，其原理是我们对input进行value的属性绑定(v-bind：value="…"),将Model中的变量绑定到View上(Model -> View)，以及当用户对input进行操作时，进行事件监听(v-on: input =" … ")，从而实现双向数据绑定。v-model实际上是语法糖，结合了上述两个操作。

        // 2、底层原理是什么？
        // 参考：Vue的MVVM是如何实现的
        // 如何追踪数据变化？
        // Vue将遍历传入Vue实例data选项中的js对象的所有property，并使用Object.defineProperty 把这些 property 全部转为getter/setter。这些getter/setter可使property在被访问和修改时通知变更。每个组件实例都对应一个watcher实例，它会在组件渲染的过程中把“接触”过的数据property记为依赖，之后当依赖项的setter触发时，会通知watcher，从而使它关联的组件重新渲染。

        // vue实现数据双向绑定主要是采用数据劫持，配合发布-订阅者模式的方式，通过Object.defineProperty()来劫持各个属性的setter和getter，在数据变动时发布消息给订阅者，触发响应监听回调。
        // vue数据双向绑定整合Observer（观察者） Compile（编译） 和 Watcher三者，

        // （1） 通过Observer来监听自己Model的数据变化： Obeject.defineProperty()来监听属性变动，将需要observe的数据对象进行递归遍历，包括子属性对象的属性，都加上setter和getter，同时创建一个消息订阅器Dep用来收集订阅者，数据变动之后触发notify，再调用订阅者的update方法
        // （2） 通过Complie来解析编译模板指令: 对每个元素节点的指令进行扫描和解析，根据指令模板替换数据，以及绑定相应的更新函数，添加监听数据的订阅者，一旦数据有变动，收到通知，更新视图。（每次找到一个数据替换,都要重新渲染一遍,可能会造成页面的回流和重绘,那么我们最好的办法就是把以上的元素放在内存中,在内存中操作完成之后,再替换掉.）
        // （3） 通过Watcher搭起Observer 和Compile 之间的通信桥梁：能够订阅并收到每个属性变动的通知，执行指令绑定的相应回调函数，从而更新视图，达到 数据变化 -> 视图更新，视图交互变化 -> 数据model变更。什么时候添加绑定watcher？ 当订阅数据变化时，来绑定更新函数，从而让watcher更新视图

        // 3.Object.defineProperty可以对数组对象数据进行劫持吗？数组对象如何实现数据的响应更新？
        // Object.defineProperty(obj, prop, descriptor)
        // descriptor由两部分组成：数据描述符（configurable，enumerable，value 及 writable 配置项）和访问器描述符(configurable，enumerable,get以及set)，即使用访问器描述符中 getter或 setter方法的话，不允许使用 writable 和 value 这两个配置项

        // a:当我们使用 Object.defineProperty 对数组赋值有一个新对象的时候，会执行set方法，但是当我们改变数组中的某一项值的时候，或者使用数组中的push等其他的方法，或者改变数组的长度，都不会执行set方法
        // b:通过重写 Array.property.push方法，并且生成一个新的数组赋值给数据，这样数据双向绑定就触发了

        // 重新编写数组的方法：
        const arrPush = {};

        // 如下是 数组的常用方法
        const arrayMethods = [
            'push',
            'pop',
            'shift',
            'unshift',
            'splice',
            'sort',
            'reverse'
        ];
        // 对数组的方法进行重写
        arrayMethods.forEach((method) => {

            const original = Array.prototype[method];
            arrPush[method] = function() {
                console.log(this);
                return original.apply(this, arguments);
            }
        });

        const testPush = [];
        // 对 testPush 的原型 指向 arrPush，因此testPush也有重写后的方法
        testPush.__proto__ = arrPush; testPush.push(1); // 打印 [], this指向了 testPush
        testPush.push(2); // 打印 [1], this指向了 testPush

        // 4.Object.defineProperty和Proxy的区别
        // Object.definePropery是对对象的属性的劫持，而Proxy是对对象的劫持，因此对于新增的属性不用重新定义getter,setter特性，Proxy也可以实现劫持，同时对于复杂对象也不必进行深度遍历。Vue3中将使用Proxy来实现数据劫持

        // let p = new Proxy(target, handler)

        // Object.defineProperty()的主要问题
        // 1.不能监听数组的变化
        // 2.必须遍历对象的每个属性
        // 3.必须深层遍历嵌套的对象
        // Proxy
        // 1.针对对象：针对整个对象,而不是对象的某个属性。相比于Object.defineProperty()，省了一个 Object.keys() 的遍历
        // 2.支持数组：不需要对数组的方法进行重载
        // 3.嵌套支持：和 Object.defineProperty() 是一样的，也需要通过逐层遍历来解决。Proxy 的写法是在 get 里面递归调用 Proxy 并返回
        // Proxy的优劣势
        // 1.优势：Proxy 的第二个参数可以有 13 种拦截方法，比 Object.defineProperty() 要更加丰富
        // 2.劣势：Proxy 的兼容性不如 Object.defineProperty()， 不能使用 polyfill 来处理兼容性


        // 8：vue对数组的底层处理原理      不会

        // 9：AST语法树和虚拟dom的区别  
        // 通俗的理解抽象地将代码根据 源代码语法 生成对应的树状结构。
        // 在js中，js引擎会将代码转换成AST，解释器根据AST生成字节码，提供给计算机。
        // js还有优化编译器， 它可以通过AST将代码直接转化为机器码。
        
        // 所谓虚拟DOM，就是用一个JS对象来描述一个DOM节点

        {
            /* <div class="a" id="b">我是内容</div>

            {
              tag:'div',        // 元素标签
              attrs:{           // 属性
                class:'a',
                id:'b'
              },
              text:'我是内容',  // 文本内容
              children:[]       // 子元素
            } */
        }

        

        // 10：webpack原理   
        // webpack是一个打包模块化js的工具，可以通过loader转换文件，通过plugin扩展功能。
        // 1、核心概念
        // （1）entry：一个可执行模块或者库的入口。
        // （2）chunk：多个文件组成一个代码块。可以将可执行的模块和他所依赖的模块组合成一个chunk，这是打包。
        // （3）loader：文件转换器。例如把es6转为es5，scss转为css等
        // （4）plugin：扩展webpack功能的插件。在webpack构建的生命周期节点上加入扩展hook，添加功能。
        //  (5) output：出口
        //  （6）devServer服务配置  open 自动打开浏览器 port 指定端口号 hot 热更新

        // 2、webpack构建流程（原理）
        // 从启动构建到输出结果一系列过程：
        // （1）初始化参数：解析webpack配置参数，合并shell传入和webpack.config.js文件配置的参数，形成最后的配置结果。
        // （2）开始编译：上一步得到的参数初始化compiler对象，注册所有配置的插件，插件监听webpack构建生命周期的事件节点，做出相应的反应，执行对象的 run 方法开始执行编译。
        // （3）确定入口：从配置的entry入口，开始解析文件构建AST语法树（AST 全称为 Abstract Syntax Tree，译为抽象语法树。在 JavaScript 中，任何一个对象（变量、函数、表达式等）都可以转化为一个抽象语法树的形式。抽象语法树本质就是一个树形结构的对象。），找出依赖，递归下去。
        // （4）编译模块：递归中根据文件类型和loader配置，调用所有配置的loader对文件进行转换，再找出该模块依赖的模块，再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理。
        // （5）完成模块编译并输出：递归完事后，得到每个文件结果，包含每个模块以及他们之间的依赖关系，根据entry配置生成代码块chunk。
        // （6）输出完成：输出所有的chunk到文件系统。
        // 注意：在构建生命周期中有一系列插件在做合适的时机做合适事情，比如UglifyPlugin会在loader转换递归完对结果使用UglifyJs压缩覆盖之前的结果。

        // 其他打包工具 rollup  gulp

        // 3、有哪些常见的Loader？他们是解决什么问题的？
        // （1）babel-loader：把es6转成es5；
        // （2）css-loader：加载css，支持模块化，压缩，文件导入等特性；
        // （3）style-loader：把css代码注入到js中，通过dom操作去加载css；
        // （4）eslint-loader：通过Eslint检查js代码；
        // （5）image-loader：加载并且压缩图片晚间；
        // （6）file-loader：文件输出到一个文件夹中，在代码中通过相对url去引用输出的文件；
        // （7）url-loader：和file-loader类似，文件很小的时候可以base64方式吧文件内容注入到代码中。
        // （8）source-map-loader：加载额外的source map文件，方便调试。

        // 4、有哪些常见的Plugin？他们是解决什么问题的？
        // （1）uglifyjs-webpack-plugin：通过UglifyJS去压缩js代码；
        // （2）commons-chunk-plugin：提取公共代码；
        // （3）define-plugin：定义环境变量。
        // htmlWebpackPlugin 处理html
        // cleanWebpackPlugin  处理dist
        // miniCssExtractPlugin  分离css
        // optimizeCssAssetsPlugin 压缩css
        // terserJsPlugin  压缩js

        // 5、loader和plugin的不同
        // 作用不同：（1）loader让webpack有加载和解析非js的能力；（2）plugin可以扩展webpack功能，在webpack运行周期中会广播很多事件，Plugin可以监听一些事件，通过webpack的api改变结果。
        // 用法不同：（1）loader在module.rule中配置。类型为数组，每一项都是Object；（2）plugin是单独配置的，类型为数组，每一项都是plugin实例，参数通过构造函数传入。

        // 10：正则的了解
        // 10：Js的变量提升   不会
        // 11： js 字符串 中substr和substring 区别  — 不会    数组中 slice和splice的区别  —  不会  

        // js中substr和substring都是截取字符串中子串，非常相近，可以有一个或两个参数。
        // 语法：substr(start [，length]) 第一个字符的索引是0，start必选 length可选
        // 　　　substring(start [, end]) 第一个字符的索引是0，start必选 end可选
        // 相同点：当有一个参数时，两者的功能是一样的，返回从start指定的位置直到字符串结束的子串
        // var str = "hello Tony";
        // str.substr(6);  //Tony
        // str.substring(6); //Tony

        // 不同点：有两个参数时
        // （1）substr(start,length) 返回从start位置开始length长度的子串
        // “goodboy”.substr(1,6);   //oodboy
        // 【注】当length为0或者负数，返回空字符串
        // （2）substring(start,end) 返回从start位置开始到end位置的子串（不包含end）
        // “goodboy”.substring(1,6);  //oodbo
        // 【注】:
        // （1）substring 方法使用 start 和 end 两者中的较小值作为子字符串的起始点
        // （2）start 或 end 为 NaN 或者负数，那么将其替换为0

        // slice(start,end) 从哪到哪开始删   可以用来从数组中提取指定元素   该方法不会改变元素数组，而是将截取到的元素封装到一个新数组中返回
        // splice(strt,end,index1,index2) 从什么位置开始，删几个？删了后插入什么新元素？

        // 11. AOP 面向切片编程的理解  AOP说白了就是在运行时，动态的将代码切入到类的指定方法的指定位置上，这种思想就是面向切面的编程思想。
        // 简而言之，AOP是针对业务处理过程中的切面(即非业务逻辑部分，例如错误处理，埋点，日志等)进行提取.
        // 它所面对的是处理过程中的某个步骤或阶段，以获得逻辑过程中各部分之间低耦合性的隔离效果(目的是降低耦合)。
        // 具体到实现来说就是通过动态的方式将非主关注点部分插入到主关注点(一般是业务逻辑中)
        // 我们的业务逻辑里面只管业务本身，侧关注点通过这种方式来动态引入，与主逻辑解耦，更加纯净、易于维护。

        // 11：二分法排序    不会
        function twoSort(arr) {
            //最后当数组长度只有一的时候，不再往下执行
            if (arr.length <= 1) return arr
            let middle = arr.splice(Math.floor(arr.length / 2), 1)
            let left = [],
                right = []
            for (let i = 0; i < arr.length; i++) {
                if (arr[i] <= middle) {
                    left.push(arr[i])
                } else {
                    right.push(arr[i])
                }
            }
            //concat() 方法用于连接两个或多个数组
            return twoSort(left).concat(middle, twoSort(right))
        }
        // 12：JS闭包的了解   ok

        // 「函数」和「函数内部能访问到的变量」（也叫环境）的总和，就是一个闭包。
        // 闭包是 JS 函数作用域的副产品。

        // 1.可以访问其他函数内变量的函数，叫做闭包。
        // 2.闭包可以用来保存一个需要持久保存的变量，可以模拟命名空间。
        // 闭包不是函数，闭包是「函数+自由变量」

        // 当函数可以记住并访问所在的词法作用域，即使函数是在当前词法作用域之外执行，这时就产生了闭包
        // 函数执行形成的私有作用域，保护里面的变量不受外界干扰的机制

        //  → 优点：
        //     1.保护函数内的变量安全 
        //     2.在内存中维持一个变量(用的太多就变成了缺点，占内存) ； 
        //     3. 逻辑连续，当闭包作为另一个函数调用的参数时，避免你脱离当前逻辑而单独编写额外逻辑。 
        //     4. 方便调用上下文的局部变量。 
        //     5. 加强封装性，可以达到对变量的保护作用。

        //   → 缺点：
        //     1.常驻内存，会增大内存使用量，使用不当很容易造成内存泄露。 
        //     2.还有有一个非常严重的问题，那就是内存浪费问题，这个内存浪费不仅仅因为它常驻内存，更重要的是，对闭包的使用不当会造成无效内存的产生。

        //   → 特性：
        //     1. 函数嵌套函数 
        //     2. 内部函数可以访问外部函数的变量 
        //     3. 参数和变量不会被回收。

        // 13:  Js的防抖和节流   不会
        /**
         * 防抖函数，返回函数连续调用时，空闲时间必须大于或等于 wait，func 才会执行
         *
         * @param  {function} func        回调函数
         * @param  {number}   wait        表示时间窗口的间隔
         * @param  {boolean}  immediate   设置为ture时，是否立即调用函数
         * @return {function}             返回客户调用函数
         */
        function debounce(func, wait = 50, immediate = true) {
            let timer, context, args

            // 延迟执行函数
            const later = () => setTimeout(() => {
                // 延迟函数执行完毕，清空缓存的定时器序号
                timer = null
                    // 延迟执行的情况下，函数会在延迟函数中执行
                    // 使用到之前缓存的参数和上下文
                if (!immediate) {
                    func.apply(context, args)
                    context = args = null
                }
            }, wait)

            // 这里返回的函数是每次实际调用的函数
            return function(...params) {
                // 如果没有创建延迟执行函数（later），就创建一个
                if (!timer) {
                    timer = later()
                        // 如果是立即执行，调用函数
                        // 否则缓存参数和调用上下文
                    if (immediate) {
                        func.apply(this, params)
                    } else {
                        context = this
                        args = params
                    }
                    // 如果已有延迟执行函数（later），调用的时候清除原来的并重新设定一个
                    // 这样做延迟函数会重新计时
                } else {
                    clearTimeout(timer)
                    timer = later()
                }
            }
        }

        function throttle(fn, wait) {
            let timer, context, args, startTime = Date.now()
            return function() {
                let curTime = Date.now()
                let remaining = wait - (curTime - startTime)
                context = this
                args = arguments
                clearTimeout(timer)
                if (remaining < 0) {
                    fn.apply(context, args)
                    startTime = Date.now()
                } else {
                    timer = setTimeout(fn, remaining)
                }
            }
        }
        // 14:  promise的内部实现原理
        // 15: 手动实现一个promise.all   
        // 16: 常见设计模式   

        //工厂模式、单例模式、观察者模式、发布-订阅模式、代理模式、装饰器模式、策略模式

        // 17：函数调用的方式有哪些？ 对应函数内部this指向？  

        //this的指向，是当我们调用函数的时候确定的，调用方式的不同决定了this的指向不同

        // 调用方式            this指向
        // 普通函数调用         window                    
        // 构造函数调用         实例对象 原型里面的方法也指向实例对象
        // 对象方法调用         该方法所属的对象
        // 事件绑定方法         绑定事件对象
        // 定时器函数           window
        // 立即执行函数         window       


        // 18：常见的回调函数有哪些？   

        // dom事件回调函数
        // 定时器回调函数
        // ajax请求回调函数
        // 生命周期回调函数

        // 19:  es5 构造函数，如何实现组合继承      不会
        // ES6中类的继承使用extends关键字，那么ES5中是怎么实现的呢？
        // ES5中采用构造函数和原型对象的组合方式模拟继承，所以也称为组合继承；
        // 核心原理：通过call()借用父构造函数,并把父类型的this指向子类型的this；
        // 这种继承，实际上是在调用子构造函数创建实例对象时，在子构造函数内调用了父构造函数，那么就可以获得父构造函数中的成员，同时修改被调用的父构造函数的this的指向为子函数即可，成员就会被继承到子函数中；
        // 用一句话说：使用call()在子构造函数调用父构造函数，实现继承；记得修改父构造函数中的this为子函数中的this

        // function Father(uname, age){
        //   this.uname = uame;
        //   this.age = age;       
        // }
        // function Son(uname, age){
        //   Father.call(this);
        // }
        // 借用原型对象继承方法
        // Son.prototype = new Father();//因为可以通过原型链访问到Father的原型对象中的方法
        // Son.prototype.constructor = Son;//上面的赋值操作，会使Son的constructor指向Father


        // 20：如何实现原生new  
        // instanceof 判断当前变量是否在当前实例对象的原型链上

        function myNew(fn, ...args) {
            let obj = Object.create(fn.prototype)
            const res = fn.apply(obj, args)
            return res instanceof Object ? res : obj
        }

        function People(n, age) {
            console.log('[ n ] >', n)
            this.age = age
            this.name = n
        }

        const a = myNew(People, 'apple', 12)
        console.log('[ a ] >', a)
        // 21： 如何实现原生bind方法
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

        class EventEmitter {
            constructor() {
                this.cache = {} //隐藏物
            }
            on(name, fn) {
                if (this.cache[name]) {
                    this.cache[name].push(fn)
                } else {
                    this.cache[name] = [fn]
                }

            }
            off(name, fn) {
                let tasks = this.cache[name]
                if (tasks) {
                    const index = tasks.findIndex(item => item === fn || item.callback === fn)
                    if (index >= 0) {
                        tasks.splice(index, 1)
                    }
                }
            }
            emit(name, once = false, ...args) {
                if (this.cache[name]) {
                    //创建副本，如果回调函数内继续注册相同事件，会造成死循环
                    let tasks = this.cache[name].slice()

                    for (let fn of tasks) {
                        fn(...args)
                    }

                    if (once) {
                        delete this.cache[name]
                    }
                }
            }
        }

        //测试
        let eventBus = new EventEmitter()
        let fn1 = function(name, age) {
            console.log(name + age)
        }
        let fn2 = function(name, age) {
            console.log('hello' + name + age)
        }
        eventBus.on('lsz', fn1) 
        eventBus.on('dcy', fn2) 
        eventBus.off('lsz', fn1) 
        eventBus.emit('dcy', false, 'hehehee', 666)