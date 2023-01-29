// TypeScript 类中泛型-难点

//1.编写一个基本类

//编写一个基本的类SelectGirl,在类的构造函数中(constructor)需要传递一组女孩的名称，然后再通过下边展现女孩的名称

class SelectGirl {
    constructor(private girls: string[]) { }
    getGirl(index: number): string {
        return this.girls[index]
    }
}
const selectGirl = new SelectGirl(['李生智', 'lsz'])
console.log(selectGirl.getGirl(0))

//新的需求，同时使用编号

class SelectGirlA {
    constructor(private girls: string[] | number[]) { }
    getGirl(index: number): string | number {
        return this.girls[index]
    }
}
const selectGirlA = new SelectGirlA(['lsz', 'hh', 'hehe'])
console.log(selectGirlA.getGirl(2))


//2.初始类的泛型

//要用泛型重构代码

class SelectGirlB<T>{
    constructor(private girls: T[]) { }
    getGirls(index: number): T {
        return this.girls[index]
    }
}
const selectGirlB = new SelectGirlB(['李生智', 'lsz', 'shopping'])
console.log(selectGirlB.getGirls(2))

//这时候代码并不报错，也使用了泛型，但是在实例化对象的时候，TypeScript 是通过类型推断出来的
//这种方法并不好，所以还是需要在实例化对象的时候，对泛型的值进行确定，比如是string类型，就这样写

const selectGirlV = new SelectGirlB<string>(['李生智', 'lsz', 'shopping']);


//3.泛型中的继承

//现在需求又变了，要求返回是一个对象中的name

//写一个Girl的接口，每个接口里都要有 name 属性

interface GirlC {
    name: string;
}

//有了接口后用extends关键字实现泛型继承
//意思是泛型里必须有一个name属性，因为它继承了Girl接口

class SelectGirlC<T extends GirlC>{
    constructor(private girls: T[]) { }
    getGirl(index: number): string {
        return this.girls[index].name
    }
}
const selectGirlC = new SelectGirlC([
    { name: '李生智' },
    { name: 'lsz' },
    { name: 'going shopping' },
])
console.log(selectGirlC.getGirl(1), 71)



//4.泛型约束

//现在的泛型可以是任意类型，可以是对象、字符串、布尔、数字都是可以的
//但现在要求这个泛型必须是string或者number类型

class SelectGirlD<T extends number | string>{
    constructor(private girls: T[]) { }
    getGril(index: number): number | string {
        return this.girls[index]
    }
}
const selectGrilD = new SelectGirlD(['李生智', 'lsz', 'shopping', 789])
console.log(selectGrilD.getGril(3), 87)