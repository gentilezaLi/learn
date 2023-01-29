// 配置文件- compilerOptions 配置内容详解

//1.rootDir 和 outDir

//现在js文件直接编译到了根目录下，和ts文件混在了一起
//我们当然是不喜欢这种方法的，工作中我们希望打包的js都生成在特定的一个文件夹里,比如build

//可以通过配置outDir来配置，当然你也可以通过rootDir来指定ts文件的位置，比如我们把所有的 ts 文件都放到 src 下

// {
//     "outDir": "./build" ,
//     "rootDir": "./src" ,
// }


//2.编译 ES6 语法到 ES5 语法-allowJs

// "target":'es5' ,  // 这一项默认是开启的，你必须要保证它的开启，才能转换成功
// "allowJs":true,   // 这个配置项的意思是联通


//3.sourceMap 属性

//如果把sourceMap的注释去掉，在打包的过程中就会给我们生成sourceMap文件
//sourceMap 简单说，Source map 就是一个信息文件，里面储存着位置信息
//也就是说，转换后的代码的每一个位置，所对应的转换前的位置


//4.noUnusedLocals 和 noUnusedParameters

//noUnusedParameters是针对于名优使用的函数的，方法和noUnusedLocals：true  
//如果我们的程序申明了变量而没有使用 开启这样的属性就会提示