// TypeScript 如何使用 import 语法

//1.修改 componentsA.ts 文件

//现在去掉components.ts里的namespace命名空间代码，写成 ES6 的 export 导出模式


//2.修改 page3.ts 文件


//编译出来就是这种的

// define("page3", ["require", "exports", "componentsA"], function (require, exports, componentsA_1) {
//     "use strict";
//     Object.defineProperty(exports, "__esModule", { value: true });
//     exports.Page3 = void 0;
//     var Page3 = /** @class */ (function () {
//         function Page3() {
//             new componentsA_1.Head();
//             new componentsA_1.Con();
//             new componentsA_1.Foot();
//         }
//         return Page3;
//     }());
//     exports.Page3 = Page3;
// });

//现在看起来确实和工作中写的代码非常类似了
//这时候可以使用tsc进行编译。然后可以看到编译好的代码都是define开头的(这是 amd 规范的代码
//不能直接在浏览器中运行，可以在 Node 中直接运行)
//这种代码在浏览器中是没办法被直接运行的，需要其他库(require.js)的支持


//3.引入 require.js

//使用了一个现成的 CDN 的require.js
//<script src="https://cdnjs.cloudflare.com/ajax/libs/require.js/2.3.6/require.js"></script>

//这时候就可以解析define这样的语法了。然后把page.ts中加入default关键字，如果不加是没办法直接引用到的

//这时候再用tsc进行编译一下，你会发现还是又问题。因为使用export default这种形式的语法，需要在html里用require来进行引入


//4.require 方式引入

//因为你已经加入了require.js这个库，所以现在可以直接在代码中使用require了。具体代码如下

// <body>
//   <script>
//     require(["page"], function (page) {
//       new page.default();
//     });
//   </script>
// </body>

//刷新页面，可以看到正常显示出来了，虽然用起来比较麻烦，但是还是实现了用import来进行引入
//当我们用了webpack和Parcel的时候就不会这么麻烦，这些都交给打包工具来处理就好了