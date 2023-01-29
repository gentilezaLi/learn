// 新的 SFC 单文件组件特性
// 可以在 style 标签里使用 v-bind，如下
// <template>
//     <div>{{ color }}</div>
//     <button @click="color = color === 'red' ? 'green' : 'red'">按钮</button>
// </template>
// <script setup>
//     import { ref } from "vue"
//     const color = ref("ref")
// </script>
// <style scoped>
//     div{
//         color: v-bind(color)
//     }
// </style>
// 复制代码

// 废弃 useContext
// 原来的 useContext 是这样的，现在下面这个都不能用了
// import { useContext } from "vue"
// const { expose, slots, emit, attrs } = useContext()
// 复制代码
// 由于 expose、slots、emit、attrs 都不能通过 useContext 获取了，随之而来的是下面几个新的代替方式

// 新增 useAttrs、useSlots
// 不能通过 useContext 获取了，就像下面这样获取
// import { useAttrs, useSlots } from "vue"
// const attrs = useAttrs()
// const slots = useSlots()
// 复制代码

// 新增 defineExpose
// 不需要通过 import 导入，向下面这样直接使用，功能一样，对外暴露属性和方法
// defineExpose({
//     name:"沐华"
//     someMethod(){
//         console.log("这是子组件的方法")
//     }
// })
// 复制代码

// defineEmit 改名
// 原来是可以向上面那样通过 useContext() 获取或者向下面这样导入的
// import { defineEmit } from "vue"
// 复制代码
// 改名后，加了一个 s ，并且不需要通过 import 导入，像下面这样直接使用
// // import { defineEmit } from "vue"
// defineEmits(["getName","myClick"])
// 复制代码

// defineProps 变更
// 本来是需要通过 import 导入的，变更后不需要导入，直接像下面这样使用
// defineProps(["name"])
// //或者
// defineProps({
//     name: String
// })
// //或者
// defineProps({
//     name: {
//         type: String,
//         default: "",
//         ...
//     }
// })
// //或者
// const props = defineProps({
//     ... // 和上面一样
// })
// console.log(props.name)
// 复制代码

// 顶级 await
// 不需要再用 async 就可以直接使用 await，这样默认会把组件的 setup 变为 async setup，像下面这样
// <script setup lang="ts">
//     const post = await fetch(`/api/post/xxx`).then(res => res.json())
// </script>
// 复制代码
// 最终会转换成下面这样
// <script lang="ts">
//     import { defineComponent, withAsyncContext } from "vue"
//     export default defineComponent({
//         async setup(){
//             const post = await withAsyncContext(
//                 fetch(`/api/post/xxx`).then(res => res.json())
//             )
//             return {
//                 post
//             }
//         }
//     })
// </script>
// 复制代码

// 新增 withDefaults
// 在 TS 中，像下面这样定义 props 是不能设置默认值的
// interface Props{
//     name: string,
//     age: number
// }
// defineProps<Props>()
// 复制代码
// 加入 withDefaults 之后就可以指定默认值，像下面这样
// import { withDefaults } from 
// interface Props{
//     name: string,
//     age: number
// }
// const props = withDefaults(defineProps<Props>(), {
//     name: "沐华"
//     age: 3
// })
// 复制代码

// 自定义 web 组件
// 通过 defineCustomElement 方法创建原生自定义组件。也可以通过这种方式发布组件出去卖给别人使用
// // main.js
// import { defineCustomElement } from "vue"

// const MyVueElement = defineCustomElement({
//     // 通用 vue 组件选项
//     props:["foo"],
//     render(){
//         return h("div", "my-vue-element:" + this.foo)
//     },
//     // 仅适用于 defineCustomElement, css将被注入到 shadow root
//     style: [`div { border: 1px solid red }`]
// })

// customElements.define("my-vue-element", MyVueElement)
// 复制代码
// 然后在 vite.config.js 里配置白名单
// export default defineConfig({
//     plugins: [
//         vue({
//             template: {
//                 compilerOptions: {
//                     // vue 将跳过 my-vue-element 解析
//                     isCustomElement: (tag) => tag === "my-vue-element"
//                 }
//             }
//         })
//     ]
// })
// 复制代码
// 然后使用
// <my-vue-element foo="foo" />
// 复制代码

// 新增指令 v-memo
// 官方说的是我们写程序很少有场景能用到。官方文档点这里
// 它可以缓存模板中的一部分，从而提升速度。比如说大量 v-for 的列表，只创建一次，就不会再更新了，直接用缓存，就是用内存换时间
// 下面这样组件重新渲染时，如果 valueA 和 valueB 没有变化，div 将跳过此组件和其子组件的所有更新
// <div v-memo="[valueA, valueB]">
//     ...
// </div>
// 复制代码
// 还有像下面这样，部分缓存。需要注意的是在 v-memo 里面不能用 v-for
// <div v-for="item in list" :key="item.id" v-memo="[item.id === selected]">
//     ...
// </div>
// 复制代码

// 性能提升
// 响应式的优化

// 更高效的 ref 实现，读取提升约 260%，写入提升约 50%
// 依赖收集速度提升约 40%
// 减少内存消耗约 17%

// 模板编译器优化

// 创建元素 VNodes 速度提升约 200%



// 作者：沐华
// 链接：https://juejin.cn/post/7000160263521435685
// 来源：稀土掘金
// 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。