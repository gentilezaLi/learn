//用 Parcel 打包 TypeScript 代码

//demo24.ts daima 配置起来非常麻烦，步骤也很多，工作中一定是有更好的解决方案的

//最通用的有两种解决方案Webpack和Parcel
//webpack不用多说，只要是前端基本都会，这几年Parcel也开始崛起，用的人也越来越多
//所以这节课就讲一下，如何使用Parcel来打包TypeScript代码



//1.建立一个新项目

//1.重新建立一个项目TSTest,在桌面新建立一个文件夹，然后在VSCode中打开
//2.打开终端，输入npm init -y,创建package.json文件
//3.在终端中输入tsc --init,创建tsconfig.json文件
//4.修改tsconfig.json配置rootDir和outDir
//5.新建src文件夹，在里边建立index.html,page.ts文件
//6.编写index.html文件，并引入page.ts文件
//7.编写page.ts文件

// index.html 文件代码：

// <!DOCTYPE html>
// <html lang="en">
//   <head>
//     <meta charset="UTF-8" />
//     <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//     <script src="./page.ts"></script>
//     <title>Document</title>
//   </head>
//   <body></body>
// </html>


//page.ts 文件代码：

// const teacher: string = 'lszxh'
// console.log(teacher)


//这时候并不能正常的预览出效果，需要Parcel的帮忙


//2.Parcel 的安装和使用

//Parcel 可以通过npm或者yarn来进行安装，npm安装很慢，会 5 分钟左右，使用yarn来进行安装
//yarn add --dev parcel@next

// 安装好以后，打开package.json文件，可以看到这样一段代码，
// 安装的版本是^2.0.0-beta.1
// 修改package.json里边的代码。

// {
//   "scripts": {
//     "test": "parcel ./src/index.html"   意思就是使用parcel对index.html进行一个编译
//   },
// }

//打开终端输入yarn test,这时候终端会给出一个地址http://localhost:1234      

//直接打开地址是http://127.0.0.1:5500/TSTest/src/index.html  是没有东西的  
//地址http://localhost:1234    

//把地址放到浏览器上，可以看到浏览器的控制台会输出lszxh
