const { webpack } = require("./webpack.js"); //后面自己手写
// const { webpack } = require("webpack");
const webpackOptions = require("./webpack.config.js");
const compiler = webpack(webpackOptions);

//开始编译
compiler.run((err, stats) => {
  console.log(err);
  console.log(
    stats.toJson({
      assets: true, //打印本次编译产出的资源
      chunks: true, //打印本次编译产出的代码块
      modules: true, //打印本次编译产出的模块
    })
  );
});

//Webpack 本质上是一个函数，它接受一个配置信息作为参数，执行后返回一个 compiler 对象，
//调用 compiler 对象中的 run 方法就会启动编译。
//run 方法接受一个回调，可以用来查看编译过程中的错误信息或编译信息。

