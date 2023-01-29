//根据使用范围，将工具类型划分为操作接口类型、联合类型、函数类型、字符串类型这 4 个方向

//一、操作接口类型    Partial   Required   Readonly    Pick   Omit
//1.Partial 工具类型可以将一个类型的所有属性变为可选的，且该工具类型返回的类型是给定类型的所有子集
{
    type Partial<T> = {
        [P in keyof T]?: T[P]
    }
    interface Person {
        name: string;
        age?: number;
        weight?: number;
    }
    type PartialPerson = Partial<Person>
    //相当于
    interface PartialPerson1 {
        name: string;
        age?: number;
        weight?: number;
    }
}

// 2.Required
// 与 Partial 工具类型相反，Required 工具类型可以将给定类型的所有属性变为必填的
{
    type Required<T> = {
        [P in keyof T]-?: T[P]
    }
    interface Person {
        name: string;
        age?: number;
        weight?: number;
    }
    type RequiredPerson = Required<Person>
    // 相当于
    interface RequiredPerson1 {
        name: string;
        age: number;
        weight: number;
    }
}
//映射类型在键值的后面使用了一个 - 符号，- 与 ? 组合起来表示去除类型的可选属性，因此给定类型的所有属性都变为了必填。


//3.Readonly 工具类型可以将给定类型的所有属性设为只读，这意味着给定类型的属性不可以被重新赋值
{
    type Readonly<T> = {
        readonly [P in keyof T]: T[P];
    };
    interface Person {
        name: string;
        age?: number;
        weight?: number;
    }
    type ReadonlyPerson = Readonly<Person>;
    // 相当于
    interface ReadonlyPerson1 {
        readonly name: string;
        readonly age?: number;
        readonly weight?: number;
    }
}
//经过 Readonly 处理后，ReadonlyPerson 的 name、age、weight 等属性都变成了 readonly 只读

// 4.Pick 工具类型可以从给定的类型中选取出指定的键值，然后组成一个新的类型
{
    type Pick<T, K extends keyof T> = {
        [P in K]: T[P];
    };
    interface Person {
        name: string;
        age?: number;
        weight?: number;
    }
    type NewPerson = Pick<Person, 'name' | 'age'>;
    // 相当于
    interface NewPerson1 {
        name: string;
        age?: number;
    }

}

//Omit
// 与 Pick 类型相反，Omit 工具类型的功能是返回去除指定的键值之后返回的新类型
{
    type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
    interface Person {
        name: string;
        age?: number;
        weight?: number;
    }
    type NewOmit = Omit<Person, 'weight'>
    // 相当于
    interface NewPerson {
        name: string;
        age?: number;
    }

}

// 二、联合类型  Exclude   Extract   NonNullable  Record
//1.Exclude 的作用就是从联合类型中去除指定的类型
{
    type Exclude<T, U> = T extends U ? never : T
    type T = Exclude<'a' | 'b' | 'c' | 'd', 'a'>
    //type T = "b" | "c" | "d"
    interface Person {
        name: string;
        age?: number;
        weight?: number;
    }
    type NewPerson = Pick<Person, Exclude<keyof Person, 'weight'>>
    // type NewPerson = {
    //     name: string;
    //     age?: number | undefined;
    // }
    type ExcludeKey = Exclude<keyof Person, 'weight'>
    //type ExcludeKey = "name" | "age"
}

// Extract
// Extract 类型的作用与 Exclude 正好相反，Extract 主要用来从联合类型中提取指定的类型，类似于操作接口类型中的 Pick 类型
{
    type Extract<T, U> = T extends U ? T : never
    type T = Extract<'a' | 'b' | 'c' | 'd', 'a'>
    // type T = "a"
}
//基于 Extract 实现一个获取接口类型交集的工具类型
{
    type Intersect<T, U> = {
        [K in Extract<keyof T, keyof U>]: T[K]
    }
    interface Person {
        name: string;
        age?: number;
        weight?: number;
    }
    interface NewPerson {
        name: string
        age?: number
    }
    type T = Intersect<Person, NewPerson>
    // type T = {
    //     name: string;
    //     age?: number;
    // };
}

//3.NonNullable 的作用是从联合类型中去除 null 或者 undefined 的类型。
{
    type NonNullable<T> = T extends null | undefined ? never : T
    // 等同于使用 Exclude
    type NonNullable1<T> = Exclude<T, null | undefined>
    type T = NonNullable1<string | number | null | undefined>   //type T = string | number
}

//4.Record 的作用是生成接口类型，使用传入的泛型参数分别作为接口类型的属性和值。
{
    type Record<K extends keyof any, T> = {
        [P in K]: T
    }
    type MenuKey = 'home' | 'about' | 'more'
    interface Meun {
        label: string
        hidden?: boolean
    }
    const menus: Record<MenuKey, Meun> = {
        about: { label: '关于' },
        home: { label: '主页' },
        more: { label: '更多', hidden: true },
    }
    console.log('menus: ', menus);

    type T = keyof any; // => string | number | symbol
}


// 三、函数类型   ConstructorParameters   Parameters   ReturnType   ThisParameterType   ThisType   OmitThisParameter

//1.ConstructorParameters 可以用来获取构造函数的构造参数，而 ConstructorParameters 类型的实现则需要使用 infer 关键字推断构造参数的类型。
// 关于 infer 关键字，我们可以把它当成简单的模式匹配来看待。如果真实的参数类型和 infer 匹配的一致，那么就返回匹配到的这个类型。

{
    type ConstructorParameters<T extends new (...args: any) => any> = T extends new (...args: infer P) => any ? P : never
    class Person {
        constructor(name: string, age?: number) { }
    }
    type T = ConstructorParameters<typeof Person>
}

//2.Parameters
//Parameters 的作用与 ConstructorParameters 类似，Parameters 可以用来获取函数的参数并返回序对
{
    type Parameters<T extends new (...args: any) => any> = T extends (...args: infer P) => any ? P : never
    type T0 = Parameters<() => void>  //type T0 = []
    type T1 = Parameters<(x: number, y?: string) => void> //type T1 = [x: number, y?: string | undefined]
}

//3.ReturnType 
//ReturnType 的作用是用来获取函数的返回类型
{
    type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer P ? P : any
    type T0 = ReturnType<() => void>; // => void
    type T1 = ReturnType<() => string>; // => string
    type T2 = ReturnType<() => number>; // => number
    type T3 = ReturnType<() => null>; // => null
    type T4 = ReturnType<() => any>; // => any
}

//4.ThisParameterType
//ThisParameterType 可以用来获取函数的 this 参数类型。
{
    type ThisParameterType<T> = T extends (this: infer U, ...args: any[]) => any ? U : unknown
    type T = ThisParameterType<(this: number, x: number) => void>
}

//5.ThisType
//ThisType 的作用是可以在对象字面量中指定 this 的类型。ThisType 不返回转换后的类型，而是通过 ThisType 的泛型参数指定 this 的类型
{
    type ObjectDescriptor<D, M> = {
        data?: D,
        method?: M & ThisType<D & M>
    }
    function makeObject<D, M>(desc: ObjectDescriptor<D, M>): D & M {
        let data: object = desc.data || {}
        let method: object = desc.method || {}
        return { ...data, ...method } as D & M
    }
    const obj = makeObject({
        data: { x: 0, y: 0 },
        method: {
            moveBy(dx: number, dy: number) {
                this.x += dx
                this.y += dy
            }
        }
    })
    obj.x = 10;
    obj.y = 20;
    obj.moveBy(5, 5);
}

//6.OmitThisParameter 
//OmitThisParameter 工具类型主要用来去除函数类型中的 this 类型。如果传入的函数类型没有显式声明 this 类型，那么返回的仍是原来的函数类型。
{
    type OmitThisParameter<T> = unknown extends ThisParamterType<T>
        ? T
        : T extends (...args: infer A) => infer R
        ? (...args: A) => R
        : T
    type T = OmitThisParameter<(this: Number, x: number) => string>
}

//四、字符串类型 Uppercase  Lowercase  Capitalize  Uncapitalize
{
    // 转换字符串字面量到大写字母
    type Uppercase<S extends string> = intrinsic;
    // 转换字符串字面量到小写字母
    type Lowercase<S extends string> = intrinsic;
    // 转换字符串字面量的第一个字母为大写字母
    type Capitalize<S extends string> = intrinsic;
    // 转换字符串字面量的第一个字母为小写字母
    type Uncapitalize<S extends string> = intrinsic;
    type T0 = Uppercase<'Hello'>; // => 'HELLO'
    type T1 = Lowercase<T0>; // => 'hello'
    type T2 = Capitalize<T1>; // => 'Hello'
    type T3 = Uncapitalize<T2>; // => 'hello'

}


