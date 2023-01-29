//TypeScript 中的 interface 接口  2

//1.允许加入任意值

//简历一般是有自由发挥的空间的，所以这时候需要一些任意值，就是自己愿意写什么就写什么
//这时候interface接口也是支持的

interface Girl {
    name: string;
    age: number;
    bust: number;
    waistline?: number;
    [propname: string]: any;  //属性的名字是字符串类型，属性的值可以是任何类型
}

//这时候我们在对象里给一个性别

const girlAAA = {
    name: "xiaohua",
    age: 18,
    bust: 165,
    waistline: 21,
    sex: "女",
};

const getResumeS = (girl: Girl) => {
    console.log(girl.name + "年龄是：" + girl.age);
    console.log(girl.name + "身高是：" + girl.bust);
    girl.waistline && console.log(girl.name + "身高是：" + girl.waistline);
    girl.sex && console.log(girl.name + "性别是：" + girl.sex);
}

//[propname:string]:any;  //去掉就会报错


//2.接口里的方法
//接口里不仅可以存属性，还可以存方法，比如这时候有个say()方法，返回值是string类型
//这时候你就不要再想成简历了，你需要更面向对象化的编程，想象成一个人

interface Girl {
    name: string;
    age: number;
    bust: number;
    waistline?: number;
    // [propname: string]: any;
    say(): string;
}
//加上这个say()方法后，程序马上就会报错，因为我们对象里没有 say 方法
//那我们就要给对象一个 say 方法

const girlS = {
    name: "小花",
    age: 18,
    bust: 165,
    waistline: 21,
    sex: "女",
    say() {
        return "欢迎光临 ，红浪漫洗浴！！";
    },
};
// console.log(girlS)

//3.接口和类的约束

//我们知道 JavaScript 从ES6里是有类这个概念的，类可以和接口很好的结合，我们先来看一个例子
// class XiaoJieJie implements Girl { }   //这时候类会直接报错，所以我们需要把这个类写的完全点

class XiaoJieJieS implements Girl {
    name = "小花";
    age = 18;
    bust = 165;
    say() {
        return "欢迎光临 ，红浪漫洗浴！！";
    }
}


//4.接口间的继承
//接口也可以用于继承的，比如你新写一个Teacher接口，继承于Person接口

interface Teacher extends Girl {
    teach(): string;
}

//这时候老板说了，只看 Teacher 级别的简历，那我们需要修改getResumeS()方法

const getResumeSS = (girl: Teacher)=>{
    console.log(girl.name + "年龄是：" + girl.age);
    console.log(girl.name + "身高是：" + girl.bust);
    girl.waistline && console.log(girl.name + "身高是：" + girl.waistline);
    girl.sex && console.log(girl.name + "性别是：" + girl.sex);
}

//修改后，你就会发现下面我们调用getResumeSS()方法的地方报错了,因为这时候传的值必须有Teach方法

// getResumeSS(girl); //报错


const girls = {
    name: "小花",
    age: 18,
    bust: 165,
    waistline: 21,
    sex: "女",
    say() {
        return "欢迎光临 ，红浪漫洗浴！！";
    },
    teach() {
        return "我是一个老师";
    },
};
