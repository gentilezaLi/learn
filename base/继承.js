//原型链继承
function Animal() {
    this.colors = ['red', 'pink']
}
Animal.prototype.getColor = function () {
    return this.colors
}
function Dog() { }
Dog.prototype = new Animal()

let dog1 = new Dog()
dog1.colors.push('black')
let dog2 = new Dog()
console.log('[ dog2.colors ] >', dog2.colors)
// 原型链继承存在的问题
// 1.原型中包含的引用类型属性将被所有实例共享
// 2.子类在实例化的时候不能给父类构造函数传参

//借用构造函数实现继承
function Animals(name) {
    this.name = name
    this.getName = function () {
        return this.name
    }
}
function Dogs(name) {
    Animals.call(this, name)
}
Dogs.prototype = new Animals()
let dogs = new Dogs('xiaohua')
console.log('[ dogs() ] >', dogs.name)
console.log('[ dogs() ] >', dogs.getName())
//借用构造函数实现继承解决了原型链继承的两个问题：引用共享和传参问题
//但是由于方法必须定义在构造函数中，所以会导致每次创建子类实例都会创建一遍方法

//组合继承
// 组合继承结合了原型链继承和盗用构造函数，将两者的优点集中起来
// 思路是使用原型链继承原型的属性和方法，通过盗用构造函数继承实例属性

function AnimalP(name) {
    this.name = name
    this.colors = ['red', 'pink']
}
AnimalP.prototype.getName = function () {
    return this.name
}
function DogC(name, age) {
    AnimalP.call(this, name)
    this.age = age
}
DogC.prototype = new AnimalP()
DogC.prototype.constructor = DogC

let dogc1 = new DogC('阿西吧', 20)
dogc1.colors.push('purple')
console.log('[ dogc ] >', dogc1)
let dogc2 = new DogC('阿西吧2', 30)
console.log('[ dogc2 ] >', dogc2)

//寄生式组合继承
//组合继承相对完善了，但是还存在问题，就是调用了两次父类构造函数，第一次是在new Animal（），第二次是在Animal.call（）
//所以解决方案就是不直接调用父类构造函数给子类原型赋值，而是创建空函数F获取父类原型的副本

// 原来
// Dog.prototype=new Animals()
// Dog.prototype.constructor=Dog
//现在
// function F(){}
// F.prototype=Animals.prototype
// let f=new F()
// F.constructor=Dog
// Dog.prototype=f

//改装下
// 原来
Dog.prototype = new Animals()
Dog.prototype.constructor = Dog
//现在
Dog.prototype = Object.create(Animal.prototype)
Dog.prototype.constructor = Dog

//class类实现继承
class AnimalC {
    constructor(name) {
        this.name = name
    }
    getName() {
        return this.name
    }
}
class DogC {
    constructor(name, age) {
        super(names)
        this.age = age
    }
}
let dogc = new DogC()
console.log('[ dogc ] >', dogc)