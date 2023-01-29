//泛型
// 借用 Java 中泛型的释义来回答这个问题：泛型指的是类型参数化，即将原来某种具体的类型进行参数化。和定义函数参数一样，我们可以给泛型定义若干个类型参数，并在调用时给泛型传入明确的类型参数。设计泛型的目的在于有效约束类型成员之间的关系，比如函数参数和返回值、类或者接口成员和方法之间的关系。


// function reflect<P>(params:P){
//     return params
// }

// const str = reflect('string'); // str 类型是 unknown
// console.log('str: ', str);
// const num = reflect(1); // num 类型 unknown
// console.log('num: ', num);

//使用泛型显式地注解返回值的类型
function reflect<P>(params: P): P {
    return params
}

//在调用函数时， 通过 <> 语法指定了如下所示的 string、number 类型入参，相应地，reflectStr 的类型是 string，reflectNum 的类型是 number。
const reflectStr = reflect<string>('string')
const reflectNum = reflect<number>(1)

//如果调用泛型函数时受泛型约束的参数有传值，泛型参数的入参可以从参数的类型中进行推断，而无须再显式指定类型（可缺省）
const reflectStr2 = reflect('string')
const reflectNum2 = reflect(1)

//泛型不仅可以约束函数整个参数的类型，还可以约束参数属性、成员的类型，比如参数的类型可以是数组、对象
function reflectArray<P>(params: P[]) {
    return params
}
const reflectArr = reflectArray([1, '1'])

//React Hooks useState 
function useState<S>(state: S, initialValue?: S) {
    return [state, (s: S) => void 0] as unknown as [S, (s: S) => void]
}

//可以给函数定义任何个数的泛型入参
function reflectExtraParams<P, Q>(p1: P, p2: Q): [P, Q] {
    return [p1, p2]
}

// 泛型类    可以使用泛型用来约束构造函数、属性、方法的类型
class Memory<S>{
    store: S;
    constructor(store: S) {
        this.store = store
    }
    set(store: S) {
        this.store = store
    }
    get() {
        return this.store
    }
}
const numMemory = new Memory<number>(1)
const getNumMemory = numMemory.get()
console.log('getNumMemory: ', getNumMemory);
numMemory.set(2)
const getNumMemory2 = numMemory.get()
console.log('getNumMemory2: ', getNumMemory2);
const strMemory = new Memory<string>('lsz')
const getNumMemory3 = strMemory.get()
console.log('getNumMemory3: ', getNumMemory3);
strMemory.set('lv')
const getNumMemory4 = strMemory.get()
console.log('getNumMemory4: ', getNumMemory4);


//范型类型
const reflectFn: <P>(params: P) => P = reflect   //为变量 reflectFn 显式添加了泛型类型注解，并将 reflect 函数作为值赋给了它

//可以把 reflectFn 的类型注解提取为一个能被复用的类型别名或者接口
type reflectFunction = <P>(params: P) => P
interface IReflectFunction {
    <P>(params: P): P
}
const reflectFn2: reflectFunction = reflect
const reflectFn3: IReflectFunction = reflect

//将类型入参的定义移动到类型别名或接口名称后，此时定义的一个接收具体类型入参后返回一个新类型的类型就是泛型类型。


//定义了两个可以接收入参 P 的泛型类型
type GenericReflectFunction<P> = (params: P) => P
interface IGenericReflectFunction<P> {
    (params: P): P
}
const reflectFn4: GenericReflectFunction<string> = reflect  // 具象化泛型
const reflectFn5: IGenericReflectFunction<number> = reflect  // 具象化泛型
const reflectFn3Return = reflectFn4('lsz000')//入参和返回值都必须是 string 类型
console.log('reflectFn3Return: ', reflectFn3Return);
const reflectFn4Return = reflectFn5(111222)//入参和返回值都必须是 number 类型
console.log('reflectFn4Return: ', reflectFn4Return);

//甚至可以使用一些类型操作符进行运算表达，使得泛型可以根据入参的类型衍生出各异的类型
type StringOrNumberArray<E> = E extends string | number ? E[] : E
type StingArray = StringOrNumberArray<string>  //类型是 string[]
type NumberArray = StringOrNumberArray<number>  //类型是 number[]
type BoolArray = StringOrNumberArray<boolean>  //类型是 boolean


// 如果我们给上面这个泛型传入了一个 string | boolean 联合类型作为入参，将会得到什么类型呢？
type BooleanOrString = string | boolean;
type WhatIsThis = StringOrNumberArray<BooleanOrString>; // 好像应该是 string | boolean ?    boolean | string[]
type BooleanOrStringGot = BooleanOrString extends string | number ? BooleanOrString[] : BooleanOrString; //  string | boolean
//这个就是所谓的分配条件类型

// 关于分配条件类型这个概念，官方的释义：在条件类型判断的情况下（比如上边示例中出现的 extends），如果入参是联合类型，则会被拆解成一个个独立的（原子）类型（成员）进行类型运算。

// 上边示例中的 string | boolean 入参，先被拆解成 string 和 boolean 这两个独立类型，再分别判断是否是 string | number 类型的子集。因为 string 是子集而 boolean 不是，所以最终我们得到的 WhatIsThis 的类型是 boolean | string[]。


//泛型约束
// 前边提到的原封不动返回参数的 reflect 函数希望把接收参数的类型限定在几种原始类型的集合中，此时就可以使用“泛型入参名 extends 类型”语法达到这个目的
function reflectSpecified<P extends number | string | boolean>(params: P): P {
    return params
}
reflectSpecified('lsz')
reflectSpecified(1111111)
reflectSpecified(false)
// reflectSpecified(null)  //类型“null”的参数不能赋给类型“string | number | boolean”的参数。

// 也可以把接口泛型入参约束在特定的范围内
interface ReduxModelSpecified<State extends { id: number, name: string }> {
    state: State
}
type ComputedReduxModel1 = ReduxModelSpecified<{ id: number, name: string }>
type ComputedReduxModel2 = ReduxModelSpecified<{ id: number, name: string, age: number }>
// type ComputedReduxModel3 = ReduxModelSpecified<{ id: string, name: number }>
// type ComputedReduxModel4 = ReduxModelSpecified<{ id: number }>

//还可以在多个不同的泛型入参之间设置约束关系
interface ObjSetter {
    <O extends {}, K extends keyof O, V extends O[K]>(obj: O, key: K, value: V): V
}
const setvalueOfObj:ObjSetter=(obj, key, value)=> obj[key] = value
setvalueOfObj({id:1,name:'name'},'id',2)
setvalueOfObj({id:1,name:'name'},'name','new name')
// setvalueOfObj({id:1,name:'name'},'age',2)
// setvalueOfObj({id:1,name:'name'},'id','2')

// 另外，泛型入参与函数入参还有一个相似的地方在于，它也可以给泛型入参指定默认值（默认类型），且语法和指定函数默认参数完全一致
interface ReduxModelSpecified2<State = {id:number,name:string}>{
    state:State
}
type ComputedReduxModel5=ReduxModelSpecified2
type ComputedReduxModel6=ReduxModelSpecified2<{id:number,name:string}>
// type ComputedReduxModel7=ReduxModelSpecified  //需要 1 个类型参数

//泛型入参的约束与默认值还可以组合使用
interface ReduxModelMixed<State extends {} = {id:number,name:string}>{
    state:State
}