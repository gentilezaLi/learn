//构造函数创建对象
function Person() { }
var person = new Person()
person.name = 'lsz'
// console.log('[ person.name ] >', person.name)

//prototype
//每个函数都有一个prototype属性
function Person1() { }
//prototype是函数才会有的属性
Person1.prototype.name = 'dcy'
var person1 = new Person1()
var person2 = new Person1()
// console.log('[ person1.name ] >', person1.name)
// console.log('[ person2.name ] >', person2.name)

//__proto__
//这是每一个JavaScript对象（除了null）都具有一个属性，就是__proto__,这个属性会指向该对象的原型
function Person2() { }
var person2 = new Person2()
// console.log(person2.__proto__ === Person2.prototype) //true

//constructor
//每个原型都有一个constructor属性指向关联的构造函数
function Person3() { }
var person3 = new Person3()
// console.log(Person3 === Person3.prototype.constructor) //true
// console.log(person3.constructor === Person3.prototype.constructor) //true

//总结
function Person4() { }
var person4 = new Person4()
// console.log(person4.__proto__ === Person4.prototype)//true
// console.log(Person4.prototype.constructor === Person4)//true
//ES5的一个方法，获取对象方法的原型
// console.log(Object.getPrototypeOf(person4) === Person4.prototype)//true



//实例到原型
//当获取实例的属性时，如果找不到，就会查找与对象关联的的原型中的属性，如果还查不到就会找原型的原型，一直找到最顶层为null为止
function Person5() { }

Person5.prototype.name = 'lsz'

var person5 = new Person5()

person5.name = 'dcy'
console.log('[ person5.name ] >', person5.name)

delete person5.name
console.log('[ person5.name ] >', person5.name)

//给实例对象person5添加name属性 打印person5.name 为 dcy
//当删除person5.name时 读取person5.name 从person5对象中找不到name就会从person5的原型也就是person5.__proto__，也就是Person5.prototype中查找 结果为 lsz

//但是万一还没找到，就找原型的原型


//原型的原型
//原型也是一个对象，用最原始的方式创建
var obj = new Object()
obj.name = 'lsz'
// console.log('[ obj.name ] >', obj.name)
// console.log('[ obj.__proto__===Object.prototype ] >', obj.__proto__ === Object.prototype)

//原型链
// console.log('[ Object.prototype.__proto__===null ] >', Object.prototype.__proto__ === null)
//所以Object.prototype.__proto__的值为null跟Object.prototype没有原型就是一个意思
//所以查找属性的时候查到Object.prototype就可以停止查找了