//类型物料

//泛型
// 工具类型的本质就是构造复杂类型的泛型
{
    type isXX = 1 extends number ? true : false
    type isYY = 'string' extends string ? true : false
}

{
    type isSubTying<Child, Par> = Child extends Par ? true : false
    type isXX2 = isSubTying<1, number>
    type isYY2 = isSubTying<'string', string>
    type isZZ2 = isSubTying<true, boolean>
}

//条件类型
//TypeScript 支持使用三元运算的条件类型
{
    type isSubTying<Child, Par> = Child extends Par ? true : false
    type isAssertable<T, S> = T extends S ? true : S extends T ? true : false
    type isNumAssertable = isAssertable<1, number>
    type isStrAssertable = isAssertable<'string', string>
    type isNotAssertable = isAssertable<1, boolean>
}

//分配条件类型
//在条件类型中，如果入参是联合类型，则会被拆解为一个个独立的（原子）类型（成员），然后再进行类型运算。
{
    type BooleanOrString = string | boolean
    type StringOrNumberArray<E> = E extends string | number ? E[] : E
    type WhatIsThis = StringOrNumberArray<BooleanOrString>
    type BooleanOrStringGot = BooleanOrString extends string | number ? BooleanOrString[] : BooleanOrString
}

//通过某些手段强制类型入参被当成一个整体，也可以解除类型分配
{
    type StringOrNumberArray<E> = [E] extends [string | number] ? E[] : E
    type WhatIsThis = StringOrNumberArray<string | boolean>


    //注意：包含条件类型的泛型接收 never 作为泛型入参时，存在一定“陷阱”

    type GetSNums = never extends number ? number[] : never extends string ? string[] : never
    type GetNever = StringOrNumberArray<never>
}

//条件类型中的类型推断 infer
{
    type ElementTypeOfArray<T> = T extends (infer E)[] ? E : never;
    type isNumber = ElementTypeOfArray<number[]>; // number
    type isNever = ElementTypeOfArray<number>; // never
}

//还可以通过 infer 创建任意个类型推断参数，以此获取任意的成员类型
{
    type ElementTypeOfObj<T> = T extends { name: infer E, id: infer I, age: infer P } ? [E, I, P] : never
    type isArray = ElementTypeOfObj<{ name: 'lsz'; id: 1; age: 30 }>
    type isNever = ElementTypeOfObj<number>
}

// 索引访问类型
// 索引访问类型其实更像是获取物料的方式，首先我们可以通过属性名、索引、索引签名按需提取对象（接口类型）任意成员的类型（注意：只能使用 [索引名] 的语法）
{
    interface MixedObject {
        animal: {
            type: 'animal' | 'dog' | 'cat';
            age: number
        };
        [name: number]: {
            type: string;
            age: number;
            nickName: string;
        };
        [name: string]: {
            type: string;
            age: number;
        }
    }
    type animal = MixedObject['animal']
    type animaltype = MixedObject['animal']['type']
    type index = MixedObject[number]
    type index0 = MixedObject[0]
    type strings = MixedObject[string]
    type stringss = MixedObject['string']
}

//keyof 
//可以使用 keyof 关键字提取对象属性名、索引名、索引签名的类型
{
    interface MixedObject {
        animal: {
            type: 'animal' | 'dog' | 'cat';
            age: number
        };
        [name: number]: {
            type: string;
            age: number;
            nickName: string;
        };
        [name: string]: {
            type: string;
            age: number;
        }
    }

    type animal = MixedObject['animal']
    type animaltype = MixedObject['animal']['type']
    type index = MixedObject[number]
    type index0 = MixedObject[0]
    type strings = MixedObject[string]
    type stringss = MixedObject['string']

    type MixedObjectKeys = keyof MixedObject  // string | number  它是由 string、number 和 'animal' 类型组成的联合类型，缩减之后就是 string | number 联合类型
    type animalKeys = keyof animal
    type numberKeys = keyof index
}

//typeof
//用来获取表达式值的类型
{
    let str = 'a'
    const unions = typeof str  //"string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function"
    const strA: typeof str = 'string'  //string
    type DerivedFromStrA = typeof str  //string
}
{
    const animal = {
        id: 1,
        name: 'animal'
    };
    type Animal = typeof animal;
    const animalFun = () => animal;
    type AnimalFun = typeof animalFun;
}

//映射类型
//可以使用索引签名语法和 in 关键字限定对象属性的范围
{
    type SpecifiedKeys = 'name' | 'id'
    type TargetType = {
        [key in SpecifiedKeys]: any
    }
    type TargetGeneric<O extends string | number | symbol> = {   // { id: any; name: any; }
        [key in O]: any
    }
    type TargetInstance = TargetGeneric<SpecifiedKeys>   // { id: any; name: any; }
}

//只能在类型别名定义中使用 in，如果在接口中使用，则会提示一个 ts(1169) 的错误
{
    interface xxx {
        [key in SpecifiedKeys]: any
    }
}

//可以组合使用 in 和 keyof，并基于已有的类型创建一个新类型，使得新类型与已有类型保持一致的只读、可选特性，这样的泛型被称之为映射类型。
//注意：in 和 keyof 也只能在类型别名定义中组合使用。
{
    interface SourceInterface {
        readonly id: number;
        name?: string
    }
    type TargetType = {
        [key in keyof SourceInterface]: SourceInterface[key]
    }
    type TargetGenericType<S> = {
        [key in keyof S]: S[key]
    }
    type TargetInstance = TargetGenericType<SourceInterface>
}

//可以在映射类型中使用 readonly、? 修饰符来描述属性的可读性、可选性，也可以在修饰符前添加 +、- 前缀表示添加、移除指定修饰符（默认是 +、添加），
{
    interface SourceInterface {
        readonly id: number;
        name?: string
    }
    type TargetGenericTypeReadonly<S> = {
        readonly [key in keyof S]: S[key]
    }
    type TargetGenericTypeReadonlyInstance = TargetGenericTypeReadonly<SourceInterface>

    type TargetGenericTypeOptional<S> = {
        [key in keyof S]?: S[key];
    }

    type TargetGenericTypeOptionalInstance = TargetGenericTypeOptional<SourceInterface>

    type TargetGenericTypeRemoveReadonly<S> = {
        -readonly [key in keyof S]: S[key];
    }

    type TargetGenericTypeRemoveReadonlyInstance = TargetGenericTypeRemoveReadonly<SourceInterface>

    type TargetGenericTypeRemoveOptional<S> = {
        [key in keyof S]-?: S[key]
    }

    type TargetGenericTypeRemoveOptionalInstance = TargetGenericTypeRemoveOptional<SourceInterface>
}

//使用 as 重新映射 key
//在映射类型的索引签名中使用类型断言
{
    interface SourceInterface {
        readonly id: number;
        name?: string
    }
    type TargetGenericTypeAssertiony<S> = {
        [key in keyof S as Exclude<key, 'id'>]: S[key]
    }
    type TargetGenericTypeAssertionyInstance = TargetGenericTypeAssertiony<SourceInterface>
}

//ReturnType
{
    type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any
}

//ReturnTypeOfResolved 
//ReturnTypeOfResolved 和官方 ReturnType 的区别：如果入参 F 的返回类型是泛型 Promise 的实例，则返回 Promise 接收的入参
{
    type ReturnTypeOfResolved<F extends (...args: any) => any> = F extends (...args: any[]) => Promise<infer R> ? R : ReturnType<F>
    type isNumber = ReturnTypeOfResolved<() => number>
    type isString = ReturnTypeOfResolved<() => Promise<string>>
}

//Merge
//基于映射类型将类型入参 A 和 B 合并为一个类型的泛型 Merge<A, B>
{
    type Merge<A, B> = {
        [key in keyof A | keyof B]: key extends keyof A
        ? key extends keyof B
        ? A[key] | B[key]
        : A[key]
        : key extends keyof B
        ? B[key]
        : never
    }
    type Merged = Merge<{ id: number; name: string }, { id: string; age: number }>

    // type Merged = {
    //     name: string;
    //     id: string | number;
    //     age: number;
    // }
}

//Equal 
//判断入参 S 和 T 是否是相同的类型
{
    type EqualV1<S, T> = S extends T ? T extends S ? true : false : false
    type ExampleV11 = EqualV1<1 | number & {}, number>
    type ExampleV12 = EqualV1<never, never>
    //在示例中的第 1 行，我们实现了泛型 EqualV1；
    //第 2 行中的第一个入参是联合类型，因为分配条件类型的设定，所以第一个类型入参被拆解，最终返回类型 boolean（实际上是联合类型 true | false）
    //在第 3 行中，当入参是 never，则返回类型 never。因此，EqualV1 并不符合我们的预期
}

//需要使用 [] 解除条件分配类型和 never “陷阱”，确保自定义泛型仅返回 true 或者 false
{
    type EqualV2<S, T> = [S] extends [T] ? [T] extends [S] ? true : false : false
    type ExampleV21 = EqualV2<1 | number & {}, number>; // true
    type ExampleV22 = EqualV2<never, never>; // true
    type ExampleV23 = EqualV2<any, number>; // false but true  假的但是真的
    // 示例中的第 2 行、第 3 行，虽然我们解决了联合类型和 never 的问题，但是还是无法区分万金油类型 any 和其他类型。在第 4 行，当入参是 any 和 number，预期应该返回 false，却返回了 true。
}

//需要使用一个可以能识别 any 的改良版 EqualV3
{
    type IsAny<T> = 0 extends (1 & T) ? true : false;
    type EqualV3<S, T> = IsAny<S> extends true
        ? IsAny<T> extends true
        ? true
        : false
        : IsAny<T> extends true
        ? false                      //定义了 EqualV3（首先特殊处理了类型入参 S 和 T 至少有一个是 any 的情况），当 S 和 T 都是 any 才返回 true，否则返回 false
        : [S] extends [T]
        ? [T] extends [S]
        ? true
        : false
        : false;    //复用了 EqualV2 的逻辑，并通过 [] 解除了条件分配类型
    type ExampleV31 = EqualV3<1 | number & {}, number>; // true but false got
    type ExampleV32 = EqualV3<never, never>; // true
    type ExampleV34 = EqualV3<any, any>; // true
    type ExampleV33 = EqualV3<any, number>; // false
    type ExampleV35 = EqualV3<never, any>; // false 

    //定义了可以区分 any 和其他类型的泛型 IsAny，因为只有 any 和 1 交叉得到的类型（any）是 0 的父类型，所以如果入参是 any 则会返回 true，否则返回 false。

}
