//联合类型和类型保护

//注意的是，只有联合类型存在的情况下，才需要类型保护
//普通的类型注解，并不需要我们这种特殊操作

//1.联合类型展示  
//所谓联合类型，可以认为一个变量可能有两种或两种以上的类型

//声明两个接口 qianduan（前端）和 houduan（后端）接口，然后写一个judgeWho（判断是谁） 的方法
//里面传入一个animal（任意值）  这时候可能是qianduan，也可能是houduan
//所以使用联合类型，关键符号是 | （竖线）

interface qianduan {
    yemian: boolean;
    say: () => {}
}
interface houduan {
    shuju: boolean;
    skill: () => {}
}

function judgeWho(animal: qianduan | houduan) {
    // animal.say()  //报错  judgeWho不能准确的判断联合类型具体的实例是什么   这时候就需要再引出一个概念叫做类型保护
}


//2.类型保护-类型断言

//类型断言就是通过断言的方式确定传递过来的准确值
//如果会yemian（页面） 就说明他是前端 就可以通过断言animal as qianduan,然后直接调用skill方法,程序就不再报错了
//同样如果不会yemian（页面），说明就是后端，这时候调用say()方法，就不会报错了

interface QianduanA {
    yemian: boolean;
    say: () => {}
}
interface HouduanA {
    shuju: boolean;
    skill: () => {}
}
function judgeWhoOne(animal: QianduanA | HouduanA) {
    if (animal as QianduanA) {
        (animal as QianduanA).say()
    } else {
        (animal as HouduanA).skill()
    }
}


//3.类型保护-in 语法
//使用in语法来作类型保护，比如用if来判断animal里有没有skill()方法

//可以赋值上面的judgeWhoOne()方法，这里改成了judgeWhoTwo()方法

function judgeWhoTwo(animal: QianduanA | HouduanA) {
    if ('skill' in animal) {
        animal.skill()
    } else {
        animal.say()
    }
}

//4.类型保护-typeof 语法

//写一个新的add方法，方法接收两个参数，这两个参数可以是数字number也可以是字符串string
//如果我们不做任何的类型保护，只是相加，这时候就会报错
function add(first: string | number, second: string | number) {
    // return first + second  //报错
}

//解决这个问题，就可以直接使用typeof来进行解决
function addA(first: string | number, second: string | number) {
    if (typeof first === 'string' || typeof second === 'string') {
        return `${first}${second}`
    } else {
        return first + second
    }
}

//5.类型保护-instanceof 语法  instanceof 只能用在类上

//现在要作类型保护的是一个对象，这时候就可以使用instanceof语法来作

//写一个NumberObj的类
class NumberObj {
    count: number
}

//再写一个addObj的方法，这时候传递过来的参数
//可以是任意的object,也可以是NumberObj的实例
//然后返回相加值，当然不进行类型保护，这段代码一定是错误的

function addObj(first: object | NumberObj, second: object | NumberObj) {
    // return first.count + second.count   //报错
}

//使用instanceof语法进行判断一下
function addObjA(first: object | NumberObj, second: object | NumberObj) {
    if (first instanceof NumberObj && second instanceof NumberObj) {
        return first.count + second.count
    } else {
        return 0
    }
}