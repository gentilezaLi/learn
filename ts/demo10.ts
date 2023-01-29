//TypeScript 中类的概念和使用

//1.类的基本使用

//定义一个最简单的Lady类,这里要使用关键字class,类里边有姓名属性和一个得到姓名的方法

class Lady {
    content = "Hi，帅哥";
    sayHello() {
        return this.content;
    }
}
const goddess = new Lady()
// console.log(goddess.sayHello())

//2.类的继承

//TypeScrip 的继承和ES6中的继承是一样的   关键字也是extends
//新建一个XiaojiejieQ的类，然后继承自Lady类，在XiaojiejieQ类里写一个新的方法，叫做sayLove

class Ladys {
    content = "Hi，帅哥";
    sayHello() {
        return this.content;
    }
}
class XiaojiejieQ extends Ladys {
    sayLove() {
        return 'I Love You'
    }
}
const god = new XiaojiejieQ()
// console.log(god.sayLove())
// console.log(god.sayHello())


//3.类的重写
//重写就是子类可以重新编写父类里边的代码

class Dajiejie extends Ladys {
    sayLove() {
        return 'I LOVE YOU'
    }
    sayHello() {
        return 'Hi,lsz'
    }
}
const godss=new Dajiejie()
// console.log(godss.sayHello())

