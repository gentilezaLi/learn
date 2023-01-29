//类的抽象类

//类里的一个概念就是抽象类，抽象类很父类很像，都需要继承，但是抽象类里一般都有抽象方法
//继承抽象类的类必须实现抽象方法才可以

//比如我开了家公司，里面要有前端、后端、测试  每一个岗位我都写成一个类
class qianduan { }
class houduan { }
class ceshi { }

//我作为老板，我要求无论是什么职位，都要有独特的技能
//前端写页面 后端提供数据 测试出产出
//这是一个硬性要求，但是每个职位的技能有不同，这时候就可以用抽象类来解决问题

//抽象类的关键词是abstract,里边的抽象方法也是abstract开头的

abstract class Girl{
    abstract skill()
}

//有了抽象类，三个类就可以继承这个类，然后会要求必须实现skill()方法

class Qianduan extends Girl{
    skill(){
        console.log('老板，我会排页面')
    }
}
class Houduan extends Girl{
    skill(){
        console.log('老板，我提供数据')
    }
}
class Ceshi extends Girl{
    skill(){
        console.log('老板，我负责出产出')
    }
}