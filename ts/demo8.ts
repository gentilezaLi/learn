//TypeScript 中的 interface 接口  1

//1.Interface 接口初步了解
//现在我们要作一个简历的自动筛选程序，很简单。年龄小于 25 岁，身高大于 160 公分的

const screenResume = (name: string, age: number, bust: number) => {
    age < 24 && bust >= 160 && console.log(name + "进入面试")
    age > 24 || (bust < 160 && console.log(name + "你被淘汰"))
}

screenResume('小花', 18, 170)

//这时候又增加了需求，说我必须能看到这些女孩的简历

const getResume = (name: string, age: number, bust: number) => {
    console.log(name + "年龄是：" + age);
    console.log(name + "身高是：" + bust);
}

//这时候问题来了，程序开发中一直强调“代码重用”，两个方法用的类型注解一样，需要作个统一的约束
//我们学了一个类型别名的知识可以解决代码重复的问题，这时候学习一个更常用的语法接口（Interface）

//我们可以把这两个重复的类型注解，定义成统一的接口
interface Girl {
    name: string,
    age: number,
    bust: number
}

//对上面的screenResume进行修改
const screenResumeA = (girl: Girl) => {
    girl.age < 24 && girl.bust >= 160 && console.log(girl.name + "进入面试")
    girl.age > 24 || (girl.bust < 160 && console.log(girl.name + "你被淘汰"))
}

const getResumeA = (girl: Girl) => {
    console.log(girl.name + "年龄是：" + girl.age);
    console.log(girl.name + "身高是：" + girl.bust);
}

const girl = {
    name: "小花",
    age: 18,
    bust: 165,
};
screenResumeA(girl)
getResumeA(girl)

//2.接口和类型别名的区别

//类型别名可以直接给类型，比如string，而接口必须代表对象
type Girl1 = String;

//但是接口就不能这样写，它必须代表的是一个对象，也就是说，你初始化girl的时候
const girlA = {
    name: "小花",
    age: 18,
    bust: 165,
};


//3.接口非必选值得定义

//这时候又有了新的要求，要求尽量能看到小姐姐的身高，但是不作强制要求，就是可选值
//其实typeScript已经为我们准备好了相应的办法，就是在:号前加一个?

interface Girls {
    name: string;
    age: number;
    bust: number;
    waistline?: number;
}
//然后我们再修改一下getResumeA方法，写成这样
const getResumeAA = (girl: Girls) => {
    console.log(girl.name + "年龄是：" + girl.age);
    console.log(girl.name + "身高是：" + girl.bust);
    girl.waistline && console.log(girl.name + "身高是：" + girl.waistline);
};
