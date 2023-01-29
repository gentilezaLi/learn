// class Dog{
//     name:string;
//     constructor(name:string){
//         this.name=name
//     }
//     bark(){
//         console.log('woof')
//     }
// }
// const dog=new Dog('Q')
// dog.bark()

// function Dog(name:string){
//     this.name=name
// }
// Dog.prototype.bark=function(){
//     console.log('woff')
// }
// const dog=new Dog('Q')
// dog.bark()

// class Animal{
//     type='Animal';
//     say(name:string){
//         console.log(`I,m ${name}`)
//     }
// }
// class Dog extends Animal{
//     bark(){
//         console.log('woff')
//     }
// }
// const dog=new Dog()
// dog.bark()
// dog.say('dog')
// // dog.type
// console.log('dog.type: ', dog.type);

// class Animal {
//     weight: number;
//     type = 'Animal';
//     constructor(weight: number) {
//         this.weight = weight;
//     }
//     say(name: string) {
//         console.log(`I'm ${name}!`);
//     }
// }
// class Dog extends Animal {
//     name: string;
//     constructor(name: string) {
//         super(0); // ts(2554) Expected 1 arguments, but got 0.
//         this.name = name;
//     }
//     bark() {
//         console.log('Woof! Woof!');
//     }
// }

// class Son{
//     public firstName:string;
//     private lastName:string='lsz';
//     protected name:string='lll'
//     constructor(firstName:string){
//         this.firstName=firstName
//         this.lastName
//     }
// }
// class GrandSon extends Son{
//     constructor(firstName:string){
//         super(firstName)
//     }
//     public getName(){
//         return this.name
//     }
// }
// const son=new Son('lv')
// console.log(son.firstName)
// son.firstName='ppp'
// console.log(son.firstName)
// console.log(son.lastName) //属性“lastName”为私有属性，只能在类“Son”中访问
// console.log('son.name: ', son.name);//属性“name”受保护，只能在类“Son”及其子类中访问
// const grandSon=new GrandSon('kkk')
// console.log('grandSon.getName(): ', grandSon.getName());
// grandSon.lastName  //属性“lastName”为私有属性，只能在类“Son”中访问

//readonly
// class Son{
//     public readonly name:'lsz'
//     constructor(name:string){
//         this.name=name
//     }
// }
// const son=new Son('lll')
// son.name='ooo'

//存取器
// class Son{
//     public firstName:string;
//     protected lastName:string='stark';
//     constructor(firstName:string) {
//         this.firstName=firstName
//     }
// }
// class GrandSon extends Son {
//     constructor(firstName:string){
//         super(firstName)
//     }
//     get myLastName(){
//         return this.lastName
//     }
//     set myLastName(name:string){
//         if(this.firstName==='tony'){
//             this.lastName=name
//         }else{
//             console.error('error')
//         }
//     }
// }
// const grandSon=new GrandSon('tony')
// console.log(grandSon.myLastName)
// grandSon.myLastName='lsz'
// console.log(grandSon.myLastName)
// const grandSon1=new GrandSon('tony1')
// grandSon1.myLastName='lq'

//静态属性
// class myArray{
//     static displayName='myArray'
//     static isArry(obj:unknown){
//         return Object.prototype.toString.call(obj).slice(8,-1)==='Array'
//     }
// }
// console.log(myArray.displayName)
// console.log(myArray.isArry([]))
// console.log(myArray.isArry({}))

//抽象类
abstract class Adder{
    abstract x:number;
    abstract y:number;
    abstract add():number;
    displayName='Adder';
    addTwice():number{
        return (this.x+this.y)*2
    }
}
class NumAdder extends Adder{
    x:number;
    y:number;
    constructor(x:number,y:number) {
        super()
        this.x=x
        this.y=y
    }
    add():number{
        return this.x+this.y
    }
}
const numAdder=new NumAdder(1,2)
console.log(numAdder.displayName)
console.log(numAdder.add())
console.log(numAdder.addTwice())
