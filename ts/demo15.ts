//配置文件-初识 tsconfig.json

//1.生成 tsconfig.json 文件
//通过tsc --init命令生成
//如果此时你的tsc执行不了，很有可能是你没有全局安装 TypeScript,可以全局安装一下 见demo.ts


//2.让 tsconfig.json 文件生效
//不在使用ts-node直接执行了，需要用tsc demo.ts进行编译，编译后会得到demo.js

//这时候好像一切都是正常的，但是告诉你的真相是tsconfig.json这个编译配置文件并没有生效。
//打开tsconfig.json文件，找到complilerOptions属性下的removeComments:true选项，把注释去掉

//removeComments:true
//这个配置项的意思是，编译时不显示注释，也就是编译出来的js文件不显示注释内容

//这时候再运行编译代码tsc demo.ts，编译后打开demo.js文件
//你会发现注释依然存在，说明tsconfig.json文件没有起作用

//要想编译配置文件起作用，我们可以直接运行tsc命令
//这时候tsconfig.json才起作用，可以看到生成的js文件已经不带注释了   

//我已经测试过了 全部的ts文件都会编译成js文件 并且去掉了注释
//我这里删掉了除demo.ts编译出来的demo.js文件



//3.include 、exclude 和 files

//如果我们的跟目录下有多个ts文件，我们却只想编译其中的一个文件时，如何作？

//第一种：使用 include 配置
//include属性是用来指定要编译的文件的，现在我们只编译demo.ts文件，而不编译demo2.ts文件

//写配置文件时有个坑需要注意，就是配置文件不支持单引号，所以里边都要使用双引号

//和compilerOptions同级

// {
//     "include": ["demo.ts"],
//         "compilerOptions": {
//         //........
//     }
// }

//这时候再编译，就只编译demo.ts文件了


//第二种：使用 exclude 配置     与  include真好相反

//include是包含的意思，exclude是不包含，除什么文件之外，意思是写再这个属性之外的而文件才进行编译
//比如你还是要编译demo.ts文件，这时候的写法就应该是这样了

//和compilerOptions同级  

// {
//     "exclude": ["demo2.ts"],
//         "compilerOptions": {
//         //........
//     }
// }

//第三种：使用 files 配置

//files的配置效果和include几乎一样，没找出有什么不同，只要配置到里边的文件都可以编译

//和compilerOptions同级  

// {
//     "files": ["demo.ts"],
//         "compilerOptions": {
//         //........
//     }
// }
