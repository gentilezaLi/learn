//TypeScript 类的构造函数

//构造函数就是在类被初始化的时候，自动执行的一个方法

//1.类的构造函数

//在页面里新建一个 Person 类，类的里边定义一个name
//但是name我们并不给他值,然后我们希望在new出对象的时候，直接通过传递参数的形式，给name赋值，并打印出来
//这时候我们就需要用到构造函数了，构造函数的关键字是constructor

class Person {
    public name: string;
    constructor(name: string) {
        this.name = name
    }
}
const person = new Person('lsz')
// console.log(person.name)

//更简单的写法
//这种写法就相当于你定义了一个name,然后在构造函数里进行了赋值，这是一种简化的语法
class PersonA {
    constructor(public name: string) {
        this.name = name
    }
}
const persona = new PersonA('lsz')
// console.log(person.name)



//2.类继承中的构造器写法

//子类中使用构造函数需要用super()调用父类的构造函数

class PersonB {
    constructor(public name: string) { }
}
class TeacherB extends PersonB {
    constructor(public age: number) {
        super('lsz')
    }
}
const teacher = new TeacherB(18)
// console.log(teacher.age)
// console.log(teacher.name)

//这就是子类继承父类并有构造函数的原则，就是在子类里写构造函数时
//必须用super()调用父类的构造函数，如果需要传值，也必须进行传值操作
//就是是父类没有构造函数，子类也要使用super()进行调用，否则就会报错