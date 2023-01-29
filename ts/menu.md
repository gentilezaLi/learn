# ts 基础知识学习

## 目录

##### 01 TypeScript 开发环境搭建

> 安装 ts 及 ts-node

##### 02 TypeScript 的静态类型

- 1.定义静态类型
- 2.基础静态类型
- 3.对象类型

##### 03 TypeScript 的对象类型

> 对象类型的形式

##### 04 TypeScript 中的类型注释和类型推断

- 1.类型注解 type annotation
- 1.类型推断 type inferrence
- 3.工作使用问题（潜规则）

##### 05 TypeScript 函数参数和返回类型定义

- 1.简单类型定义
- 2.函数无返回值时定义方法
- 3.never 返回值类型
- 4.函数参数为对象(解构)时

##### 06 TypeScript 中数组类型的定义

- 1.一般数组类型的定义
- 2.数组中对象类型的定义

##### 07 TypeScript 中元组的使用和类型约束

- 1.元组的基本应用
- 2.元组的使用

##### 08 TypeScript 中的 interface 接口 1

- 1.Interface 接口初步了解
- 2.接口和类型别名的区别
- 3.接口非必选值得定义

##### 09 TypeScript 中的 interface 接口 2

- 1.允许加入任意值
- 2.接口里的方法
- 3.接口和类的约束
- 4.接口间的继承

##### 10 TypeScript 中类的概念和使用

- 1.类的基本使用
- 2.类的继承
- 3.类的重写

##### 11 TypeScript 中类的访问类型

- 1.先写一个简单的类
- 2.public 访问属性讲解
- 3.private 访问属性讲解
- 4.protected 访问属性讲解

##### 12 TypeScript 类的构造函数

- 1.类的构造函数
- 2.类继承中的构造器写法

##### 13 TypeScript 类的 Getter、Setter 和 static 使用

- 1.类的 Getter 和 Setter
- 2.类中的 static
- 3.类里的只读属性 readonly

##### 14 类的抽象类

> 抽象类 abstract

##### 15 配置文件-初识 tsconfig.json

- 1.生成 tsconfig.json 文件
- 2.让 tsconfig.json 文件生效
- 3.include 、exclude 和 files

##### 16 配置文件-初识 compilerOptions 配置项

- 1.removeComments 属性
- 2.strict 属性
- 3.noImplicitAny 属性
- 4.strictNullChecks 属性

##### 17 配置文件- compilerOptions 配置内容详解

- 1.rootDir 和 outDir
- 2.编译 ES6 语法到 ES5 语法-allowJs
- 3.sourceMap 属性
- 4.noUnusedLocals 和 noUnusedParameters

##### 18 联合类型和类型保护

- 1.联合类型展示
- 2.类型保护-类型断言
- 3.类型保护-in 语法
- 4.类型保护-typeof 语法
- 5.类型保护-instanceof 语法

##### 19 Enum 枚举类型

- 1.枚举类型的对应值
- 2.枚举通过下标反查

##### 20 TypeScript 函数泛型-难点 1

- 1.编写一个联合类型 Demo
- 2.初始泛型概念-generic
- 3.泛型中数组的使用
- 4.多个泛型的定义
- 5.泛型的类型推断

##### 21 TypeScript 函数泛型-难点 2

- 1.编写一个基本类
- 2.初始类的泛型
- 3.泛型中的继承
- 4.泛型约束

##### 22 初识命名空间-Namespace

- 1.搭建浏览器开发环境步骤  TSWwb
- 2.没有命名空间时的问题
- 3.命名空间的使用

##### 23 深入命名空间-Namespace

- 1.用命名空间实现组件化
- 2.多文件编译成一个文件
- 3.子命名空间

##### 24 TypeScript 如何使用 import 语法

- 1.修改 componentsA.ts 文件
- 2.修改 page3.ts 文件
- 3.引入 require.js
- 4.require 方式引入

##### 25 用 Parcel 打包 TypeScript 代码

- 1.建立一个新项目 TSTest
- 2.Parcel 的安装和使用
