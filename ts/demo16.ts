//配置文件-初识 compilerOptions 配置项

//熟悉compilerOptions的使用方法

//1.removeComments 属性

//removeComments是complerOptions里的一个子属性
//它的用处是告诉TypeScript对编译出来的js文件是否显示注释（注解）

//现在把removeComments的值设置为true，就是在js中不显示注释


//2.strict 属性

//strict属性如果设置为true,就代表我们的编译和书写规范
//要按照TypeScript最严格的规范来写，如果我们把这个设置为false或者注释掉
//意思是我们可以对设置一些不严格的写法


//3.noImplicitAny 属性

//noImplicitAny属性的作用是，允许你的注解类型 any 不用特意表明


//4.strictNullChecks 属性

//strictNullChecks设置为false,它的意思就是，不强制检查 NULL 类型