//TypeScript 中类的访问类型

//类的访问类型就是基于三个关键词 private、protected 和 public,也是三种访问类型

//1.先写一个简单的类
//定义一个 Person 类，然后使用这个类的对象，进行赋值，最后打印在控制台上

class Person {
    name: string
}
const person = new Person()
person.name = 'lsz'
// console.log(person.name)

//2.public 访问属性讲解

//如果不在类里对name的访问属性进行定义，那么它就会默认是public访问属性
//public从英文字面的解释就是公共的或者说是公众的，在程序里的意思就是允许在类的内部和外部被调用
class PersonA {
    public name:string;
}

//比如我们在类内调用，我们在写一个sayHello的方法

class PersonAA {
    public name:string;
    public sayHello(){
        console.log(this.name+' say hello')
    }
}
//-------以下属于类的外部--------
const personaa=new PersonAA()
personaa.name='lsz'
// console.log(personaa.name,'***')
// personaa.sayHello()



//3.private 访问属性讲解
//private 访问属性的意思是，只允许再类的内部被调用，外部不允许调用

//我们把 name 属性改成private,这时候在类的内部使用不会提示错误，而外部使用VSCode直接会报错

class PersonBB {
    private name:string;
    public sayHello(){
        console.log(this.name+' say Hello')  //此处不报错
    }
}
//-------以下属于类的外部--------
const personbb=new PersonBB()
// personbb.name='lsz'  //此处报错
// console.log(personbb.name,'***')  //此处报错
// personbb.sayHello() 


//4.protected 访问属性讲解
//protected 允许在类内及继承的子类中使用

class PersonCC{
    protected name:string;
    public sayHello(){
        console.log(this.name+' say  hello!!!') //此处不报错
    }
}
class Teacher extends PersonCC{
    public sayBye(){
        this.name
    }
}
//这时候在子类中使用this.name是不报错的

//-------以下属于类的外部--------
const Personcc=new PersonCC()
// Personcc.name='lsz';   //属性“name”受保护，只能在类“PersonCC”及其子类中访问
const teacher=new Teacher()
// teacher.name='lsz'  //此处报错  //属性“name”受保护，只能在类“PersonCC”及其子类中访问
teacher.sayHello()
teacher.sayBye()