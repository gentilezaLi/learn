// 深入命名空间-Namespace

//1.用命名空间实现组件化

//虽实现了模块化和全局变量的污染，但是我们工作中分的要更细致一些，会单独写一个components的文件，然后进行组件化

//在src目录下新建一个文件components.ts

//需要注意的是，每个类(class)都使用了export导出，导出后就可以在page.ts中使用这些组件了


//2.多文件编译成一个文件

//直接打开tsconfig.json文件，然后找到outFile配置项，这个就是用来生成一个文件的设置，但是如果设置了它
//就不再支持"module":"commonjs"设置了，我们需要把它改成"module":"amd",然后在去掉对应的outFile注释，设置成下面的样子。

// {
//   "outFile": "./build/page.js"
// }

//配置好后，删除掉build下的js文件，然后用tsc进行再次编译。
//然后删掉index.html文件中的component.js,在浏览器里还是可以正常运行的


//3.子命名空间

//也就是说在命名空间里，再写一个命名空间

namespace Components {
    export namespace SubComponents {
        export class Test { }
    }

    //someting ...
}

//写完后在控制台再次编辑tsc，然后你在浏览器中也是可以查到这个命名空间的Components.SubComponents.Test