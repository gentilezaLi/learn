//TypeScript 类的 Getter、Setter 和 static 使用

//1.类的 Getter 和 Setter

//声明一个XiaoJieJieZ（小姐姐）类，都知道小姐姐的年龄是不能随便告诉人，所以使用了private
//这样别人就都不知道她的真实年龄，而只有她自己知道


class XiaoJieJieZ {
    constructor(private _age: number) { }
}

//如果别人想知道，就必须通过getter属性知道,注意这里用的是属性，对他就是一个属性
//getter属性的关键字是get,后边跟着类似方法的东西,但是要注意，它并不是方法，归根到底还是属性

class XiaojiejieZZ {
    constructor(private _age: number) { }
    get age() {
        return this._age
    }
}
const lsz = new XiaojiejieZZ(27)
// console.log(lsz.age)

//这么写不是多此一举吗?玄妙就在于getter里
//我们可以对_age进行处理，比如别人问的时候就偷摸的减少 10 岁

class XiaojiejieZZZ {
    constructor(private _age: number) { }
    get age() {
        return this._age - 10
    }
}
const lszz = new XiaojiejieZZZ(27)
// console.log(lszz.age)
//这样明白了private和getter的用处

//_age是私有的，那类的外部就没办法改变，所以这时候可以用setter属性进行改变

class XiaojiejieZZZZ {
    constructor(private _age: number) { }
    get age() {
        return this._age - 10
    }
    set age(age: number) {
        this._age = age
    }
}
const lszzzzz = new XiaojiejieZZZZ(27)
lszzzzz.age = 18  //18-8   这里修改了
// console.log(lszzzzz.age) //10



//2.类中的 static

//学习类，都知道要想使用这个类的实例，就要先New出来（）
//但有时候人们就是喜欢走捷径，在们有对象的情况下，也想享受青春的躁动，有没有方法？肯定是有方法的

//常规写法

class Girl {
    sayLove() {
        return 'I LOVE YOU'
    }
}
const girl = new Girl()
// console.log(girl.sayLove())

//但是现在你不想new出对象，而直接使用这个方法，那TypeScript为你提供了快捷的方式
//用static声明的属性和方法，不需要进行声明对象，就可以直接使用

class Girls {
    static sayLove() {
        return 'I LOVE YOU'
    }
}
// console.log(Girls.sayLove())


//3.类里的只读属性readonly
class Person {
    constructor(public name: string) { }
}
const person = new Person('lsz')
// console.log(person.name)

//现在有一个需求，就是在实例化对象时赋予的名字，以后不能再更改了，也就是我们常说的只读属性
//先来看现在这种情况是可以随意更改的
class PersonA {
    constructor(public name: string) { }
}

const personA = new PersonA('lsz')
personA.name = '李生智'
// console.log(personA.name)

//可以用一个关键词readonly,也就是只读的意思，来修改Person类代码

class PersonAA {
    public readonly _name: string;
    constructor(name: string) {
        this._name = name
    }
}
const personAA=new PersonAA('lsz')
// personAA._name='李生智' //不能修改  只读
console.log(person.name) //报错