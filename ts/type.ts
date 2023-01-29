//unknown  主要用来描述类型并不确定的变量
//可以将任意类型赋值给unknown 但unknown类型只能赋值给unknown和any
let res: unknown
let num: number = res
let anything: any = res

//void 仅适用于表示没有返回值的函数，即如果该函数没有返回值

//undefined的最大价值主要体现在接口类型上，它表示一个可缺省、未定义的类型

//可以把undefined值或者类型是undefined的变量赋值给void类型变量
//反过来，类型是void但值是undefined的变量不能赋值给undefined类型

const usreInfo: {
    id?: number
} = {}

let undeclared: undefined = undefined
let unusable: void = undefined

unusable = undeclared  //ok
undeclared = unusable   //报错

//null的价值主要体现在接口的指定上，它主要表明对象或属性可能是空值

const user: {
    name: null | string
} = { name: null }

//类型守卫既能通过类型缩小影响TypeScript的类型检测，也能保障JavaScript运行时的安全性

const userI: {
    id?: number,
    name?: null | string
} = {
    id: 1,
    name: 'lsz'
}

if (userI.id !== undefined) {
    userI.id.toFixed()//id的类型缩小成string
}

//不建议随意使用非空断言来排除可能为null或者undefined的情况
userI.id!.toFixed()  //ok,但不建议
userI.name!.toLowerCase() //ok,但不建议

//never表示永远不会发生值的类型

//定义一个统一抛出错误的函数

function ThrowRrror(msg: string): never {
    throw Error(msg)
}

//如果函数代码中是一个死循环，那么这个函数的返回值类型也是never

function InfiniteLoop(): never {
    while (true) { }
}

//never是所有类型的子类型，它可以给所有类型赋值

let Unreachable: never = 1
Unreachable = 'string'
Unreachable = true

let num1: number = Unreachable //ok
let str: string = Unreachable //ok
let bool: boolean = Unreachable //ok

//可以把never作为接口类型下的属性类型，用来禁止写接口下特定的属性

const props: {
    id: number,
    name?: never
} = {
    id: 1
}
props.name = null   //报错
props.name = 'str'   //报错
props.name = 1   //报错

//object类型表示非原始类型的类型 即非number、string、boolean、bigint、symbol、null、undefined的类型

//TypeScript类型检测无法做到绝对智能

const arrayNumber: number[] = [1, 2, 3, 4]
const greaterThan: number = arrayNumber.find(x => x > 2)  //greaterThan既可能是数字也可能是undefined

//可以使用as语法做类型断言
const greaterThan2: number = arrayNumber.find(x => x > 2) as number

//使用尖括号+类型的格式做类型断言
const greaterThan3: number = <number>arrayNumber.find(x => x > 2)


//类型判断：
//使用类型标注后置的好处是编译器可以通过代码所在的上下文推导其对应的类型   无须再声明变量类型

{
    let x1 = 42  //推断出想x1的类型是number
    let x2: number = x1  //ok
}

//根据return语句推断函数返回的类型

{
    //根据参数的类型，推断出返回值的类型也是number
    function add(a: number, b: number) {
        return a + b
    }

    const x1 = add(1, 1)  //推断出x1的类型也是number

    //推断参数b的类型是数字或者是undefined，返回值的类型也是number
    function add2(a: number, b = 1) {
        return a + b
    }

    const x2 = add2(1)
    const x3 = add2(1, '1')
}

//上下文推断 
// 通过变量所在的上下文环境推断变量的类型   

{
    type Adder = (a: number, b: number) => number
    const add: Adder = (a, b) => {
        return a + b
    }

    const x1 = add(1, 1)  //推断出x1的类型也是number
    const x2 = add2(1, 'l')
}

//无须显示声明，即可直接通过上下文环境推断出变量的类型，此时类型可缺省
{
    let str = 'this is string'  //str:string
    let num = 1  //num:number
    let bool = true  //bool:boolean
}
{
    const str = 'this is string'  //str:'this is string'
    const num = 1  //num:1
    const bool = true //bool:true
}

//字面量类型 
//1.字符串字面量类型 2.数字字面量类型 3.布尔字面量类型

//字符串字面量类型
{
    let specifiedStr: 'this is string' = 'this is string'
    let specifiedNum: 1 = 1
    let specifiedBoolean: true = true
}

{
    //string类型不一定是this is string类型
    let specifiedStr: 'this is string' = 'this is string'
    let str: string = 'any string'

    specifiedStr = str   //类型this is string不能赋值给类型string
    str = specifiedStr   //ok
}

{
    //使用一个字符串字面量类型作为变量的类型
    let hello: 'hello' = 'hello'
    hello = 'hi'
}

//字面量类型组合的联合类型
//1.可以限制函数的参数为指定的字面量类型的集合
//2.编译器会检查参数是否指定的字面量类型集合里面的成员

{
    //使用字面量联合类型描述了一个明确、可up可down的集合
    type Direction = 'up' | 'down'
    function move(dir: Direction) {
        //...
    }
    move('up')  //ok
    move('right')
}

//数字字面量类型以及布尔字面量类型

{
    //类型Config
    interface Config {
        size: 'small' | 'big',
        isEnable: true | false,
        margin: 0 | 2 | 4
    }
}

//'literal widwning'  类型拓宽
//将TypeScript的字面量子类型转换为父类型的这种设计称之为'literal widwning'  (字面量类型拓宽)
//所有通过let或者var定义的变量、函数的形参、对象的非只读属性
//如果满足指定了初始值且未显示添加类型注解的条件
//字面量类型拓宽:指定的初始值字面量类型拓宽后的类型

{
    //通过字符串字面量的示例来理解一下字面量类型拓宽
    let str = 'this is string'  //类型是string
    let strFun = (str = 'this is string') => str  //类型是（str?string）=>string

    const specifiedStr = 'this is string'  //类型是this is string

    let str2 = specifiedStr  //类型是string
    let strFun2 = (str = specifiedStr) => str  //类型是（str?string）=>string
}

{
    //基于字面量类型拓宽的条件，可以通过添加显示类型注解控制类型拓宽行为
    const specifiedStr: 'this is string' = 'this is string' //类型是this is string

    let str2 = specifiedStr  //即便使用let定义，类型也是this is string
}

{
    //通过let、var定义的变量如果满足未显示声明类型注解且被赋予了null或者undefined值，则推断出这些变量的类型是any
    let x = null   //类型拓宽成any
    let y = undefined    //类型拓宽成any
    //---------------
    const z = null  //类型是null
    //---------------
    let anyFun = (param = null) => param  //形参类型是null
    let z2 = z  //类型是null
    let x2 = x  //类型是null
    let y2 = y  //类型是undefined
}

//'type narrowing'  类型缩小
//在TypeScript中，可以通过某些操作将变量的类型由一个较为宽泛的集合缩小到相对较小、较明确的集合

{
    //可以使用类型守卫将函数的类型从any缩小到明确的类型
    let func = (anything: any) => {
        if (typeof anything === 'string') {
            return anything   //类型是string
        } else if (typeof anything === 'number') {
            return anything  //类型是number
        }
        return null
    }
}

{
    //可以使用类型守卫将联合类型缩小到明确的子类型
    let func = (anything: string | number) => {
        if (typeof anything === 'string') {
            return anything   //类型是string
        } else if (typeof anything === 'number') {
            return anything  //类型是number
        }
    }
}

{
    //可以通过字面量类型等值判断（===）或其他控制流语句（包括但不限于if、三目运算符、switch分支）将联合类型收敛为更具体的类型
    type Goods = 'pen' | 'pencil' | 'ruler'

    const getPenCost = (item: 'pen') => 2
    const getPencilCost = (item: 'pencil') => 4
    const getRulerCost = (item: 'ruler') => 8

    const getCost = (item: Goods) => {
        if (item === 'pen') {
            return getPenCost(item)
        } else if (item === 'pencil') {
            return getPencilCost(item)
        } else if (item === 'ruler') {
            return getRulerCost(item)
        }=
    }
}