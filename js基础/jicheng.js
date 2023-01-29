//JavaScript深入之继承的多种方式和优缺点

//一.原型链继承
function Parent() {
    this.name = 'lsz'
}
Parent.prototype.getName = function () {
    // console.log('[ this.name ] >', this.name)
}
function Child() { }
Child.prototype = new Parent()

var child = new Child()
// console.log('[ child1.getName() ] >', child.getName())

//1.引用的类型被所有实例共享
//2.在创建Child实例时，不能像Parent传参




//二.借用构造函数（经典继承）
function Parent1() {
    this.names = ['lsz', 'dcy']
}
function Child1() {
    Parent1.call(this)
}
var child1 = new Child1()
child1.names.push('123')
// console.log('[ child1.name-31 ] >', child1.names)//[ 'lsz', 'dcy', '123' ]

var child2 = new Child1()
// console.log('[ child1.name-31 ] >', child2.names)//[ 'lsz', 'dcy' ]

//优点
//1.避免了引用类型的属性被所有实例共享
//2.可以在Child中像Parent传参
//缺点
//方法在构造函数中定义，每次创建实例都会创建一遍方法




//三.组合继承
//原型链和经典继承合并
function Parent2(name) {
    this.name = name
    this.colors = ['red', 'blue', 'green']
}
Parent2.prototype.getName = function () {
    console.log('[ this.name ] >', this.name)
}
function Child2(name, age) {
    Parent2.call(this, name)
    this.age = age
}
Child2.prototype = new Parent2()
Child2.prototype.constructor = Child2

var child2 = new Child2('lsz', 18)
child2.colors.push('pick')
// console.log('[ child2.name ] >', child2.name)
// console.log('[ child2.age ] >', child2.age)
// console.log('[ child2.colors ] >', child2.colors)

var child3=new Child2('dcy',20)
// console.log('[ child3.name ] >', child3.name)
// console.log('[ child3.age ] >', child3.age)
// console.log('[ child3.colors ] >', child3.colors)

//优点:融合了原型链继承和构造函数的优点
