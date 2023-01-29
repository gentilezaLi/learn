//TypeScript 中元组的使用和类型约束

//TypeScript 中提供了元组的概念，这个概念是JavaScript中没有的
//其实元组在开发中并不常用，也可能是我的精力还不够。一般只在数据源是CVS这种文件的时候，会使用元组
//其实可以把元组看成数组的一个加强，它可以更好的控制或者说规范里边的类型

//1.元组的基本应用

//先来看一个数组和这个数组注解的缺点，比如我们有一个小姐姐数组，数组中有姓名、职业和年龄
const xiaojiejieA = ['xiaohua', 'student', 28]
//这时候把鼠标放到xiaojiejie变量上面，可以看出推断出来的类型

//用类型注解的形式给他作一个注解
const xiaojiejeiAA: (string | number)[] = ['xiaohua', 'student', 28]

//这时候你已经增加了代码注解，但是这并不能很好的限制，比如我们把代码改成下面的样子，TypeScript依然不会报错
const xiaojiejieAAA: (string | number)[] = ["xiaohua", 28, "student"];

//我们只是简单的把数组中的位置调换了一下，但是TypeScript并不能发现问题，这时候我们需要一个更强大的类型，来解决这个问题，这就是元组

//元组和数组类似，但是类型注解时会不一样
const xiaojiejieAAAA: [string, string, number] = ['xiaohua', 'student', 28]

//这样我们就把数组中的每个元素类型的位置给固定住了，这就叫做元组


//2.元组的使用
const xiaojiejiesAAAAAA: [string, string, number][] = [
    ["xiaohua", "teacher", 28],
    ["xiaohong", "teacher", 18],
    ["xiaobai", "teacher", 25],
];
