//初识命名空间-Namespace

//以前都是通过Node来运行代码的，为了有更好的演示效果，在浏览器中运行代码
//这就要求我们重新创建一个项目，直接在桌面上建立一个文件夹TSWeb


//1.搭建浏览器开发环境步骤

//1.建立好文件夹后，打开 VSCode，把文件夹拉到编辑器当中，然后打开终端，运行npm init -y,创建package.json文件
//2.生成文件后，我们接着在终端中运行tsc -init,生成tsconfig.json文件
//3.新建src和build文件夹，再建一个index.html文件
//4.在src目录下，新建一个page.ts文件，这就是要编写的ts文件了
//5.配置tsconfig.json文件，设置outDir和rootDir(在 17-18 行左右)，也就是设置需要编译的文件目录，和编译好的文件目录
//6.编写page.ts文件，加入一句输出console.log('程序员想恋爱'),再在控制台输入tsc,就会生成page.js文件在build文件夹下
//7.然后编写index.html，引入<script src="./build/page.js"></script>
//8.再到浏览器中查看index.html文件，如果按F12可以看到程序员想恋爱，说明搭建成功了




//2.没有命名空间时的问题    src/page.ts

//用类的形式在index.html中实现header,content和Footer部分，类似常说的模板

//这时候再到浏览器进行预览，就可以看到对应的页面被展现出来了
//看起来没有什么问题，但是有经验的程序员就会发现
//这样写全部都是全局变量（通过查看./build/page.js文件可以看出全部都是var声明的变量）
//过多的全局变量会让我们代码变的不可维护

//这时候在浏览器的控制台(Console)中，分别输入Header、Content、Footer和Page都时可以拿到对应的变量的,说明他们全都是全局变量
//理想的是，只要有Page这个全局变量就足够了，剩下的可以模块化封装起来，不暴露到全局




//3.命名空间的使用     src/page2.ts

//命名空间这个语法，很类似编程中常说的模块化思想
//比如webpack打包时，每个模块有自己的环境，不会污染其他模块,不会有全局变量产生
//命名空间就跟这个很类似，注意这里是类似，而不是相同

//命名空间声明的关键词是namespace 比如声明一个namespace Home,需要暴露出去的类，可以使用export关键词
//这样只有暴漏出去的类是全局的，其他的不会再生成全局污染了

//以使用tsc -w进行监视了，只要有改变就会进行重新编译

//再到浏览器中进行查看，可以看到现在就只有Home.PageA是在控制台可以得到的
//其他的Home.A...这些都是得不到的，说明只有Home.PageA是全局的，其他的都是模块化私有的

//这就是 TypeScript 给我们提供的类似模块化开发的语法，它的好处就是让全局变量减少了很多，实现了基本的封装，减少了全局变量的污染