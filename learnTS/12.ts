//any 
// 万金油 any 类型可以赋值给除了 never 之外的任意其他类型，反过来其他类型也可以赋值给 any。也就是说 any 可以兼容除 never 之外所有的类型，同时也可以被所有的类型兼容（即 any 既是 bottom type，也是 top type） 
// 再次强调：Any is 魔鬼，我们一定要慎用、少用

//never 
//never 的特性是可以赋值给任何其他类型，但反过来不能被其他任何类型（包括 any 在内）赋值（即 never 是 bottom type）
{
    // let never: never = (() => {
    //     throw Error('never')
    // })()
    // let a: number = never
    // let b: () => any = never
    // let c: {} = never
}

//unknown 
//unknown 的特性和 never 的特性几乎反过来，即我们不能把 unknown 赋值给除了 any 之外任何其他类型，反过来其他类型都可以赋值给 unknown（即 unknown 是 top type）
{
    let unknown: unknown
    // const a: number = unknown
    // const b: () => any = unknown
    // const c: {} => unknown
}

// void、null、undefined
// void、null、undefined 这三大废材类型的兼容性也很特别，比如 void 类型仅可以赋值给 any 和 unknown 类型，反过来仅 any、never、undefined 可以赋值给 void

{
    let thisIsAny: any
    let thisIsNever: never
    let thisIsUnknown: unknown
    let thisIsVoid: void
    let thisIsUndefined: undefined
    let thisIsNull: null

    thisIsAny = thisIsVoid
    thisIsUnknown = thisIsVoid

    thisIsVoid = thisIsAny
    thisIsVoid = thisIsNever
    thisIsVoid = thisIsUndefined

    thisIsAny = thisIsNull
    thisIsUnknown = thisIsNull

    thisIsAny = thisIsUndefined
    thisIsUnknown = thisIsUndefined

    thisIsNull = thisIsAny
    thisIsNull = thisIsNever

    thisIsUndefined = thisIsAny
    thisIsUndefined = thisIsNever
}


//enum
//enum 枚举类型，其中数字枚举和数字类型相互兼容

{
    enum A {
        one
    }
    let num: number = A.one
    let fun = (params: A) => void 0
    fun(1)
}

{
    enum A {
        one
    }
    enum B {
        two
    }
    let a: A
    let b: B
    a = b
    b = a
}

//类型兼容性
//1.子类型 从子类型的角度来看，所有的子类型与它的父类型都兼容
{
    const one = 1;
    let num: number = one; // ok
    interface IPar {
        name: string;
    }
    interface IChild extends IPar {
        id: number;
    }
    let Par: IPar;
    let Child: IChild;
    Par = Child; // ok
    console.log('Par: ', Par);
    class CPar {
        cname = '';
    }
    class CChild extends CPar {
        cid = 1;
    }
    let ParInst: CPar;
    let ChildInst: CChild;
    ParInst = ChildInst; // ok
    let mixedNum: 1 | 2 | 3 = one; // ok

    let ICPar: IPar | CPar;
    let ICChild: IChild | CChild;
    ICPar = ICChild; // ok

}

// （2）结构类型
// 类型兼容性的另一准则是结构类型，即如果两个类型的结构一致，则它们是互相兼容的。比如拥有相同类型的属性、方法的接口类型或类，则可以互相赋值。
{
    class C1 {
        name = '1';
    }
    class C2 {
        name = '2';
    }
    interface I1 {
        name: string;
    }
    interface I2 {
        name: string;
    }
    let InstC1: C1;
    let InstC2: C2;
    let O1: I1;
    let O2: I2;
    InstC1 = InstC2; // ok
    O1 = O2; // ok
    InstC1 = O1; // ok
    O2 = InstC2; // ok

}

{
    interface I1<T> {
        id: number;
    }
    let O1: I1<string>;
    let O2: I1<number>;
    O1 = O2; // ol    
}

{
    let fun1 = <T>(p1: T): 1 => 1;
    let fun2 = <T>(p2: T): number => 2;
    fun2 = fun1; // ok？
}

//（1）协变
{
    type isChild<Child, Par> = Child extends Par ? true : false;
    interface Animal {
        name: string;
    }
    interface Dog extends Animal {
        woof: () => void;
    }
    type Covariance<T> = T;
    type isCovariant = isChild<Covariance<Dog>, Covariance<Animal>>; // true

    type isPropAssignmentCovariant = isChild<{ type: Dog }, { type: Animal }>; // true
    type isArrayElementCovariant = isChild<Dog[], Animal[]>; // true
    type isReturnTypeCovariant = isChild<() => Dog, () => Animal>; // true

}

// （2）逆变
{
    type Contravariance<T> = (param: T) => void;
    type isNotContravariance = isChild<Contravariance<Dog>, Contravariance<Animal>>; // false;
    type isContravariance = isChild<Contravariance<Animal>, Contravariance<Dog>>; // true;
}

// （3）双向协变
{
    interface Event {
        timestamp: number;
    }

    interface MouseEvent extends Event {
        x: number;
        y: number;
    }

    function addEventListener(handler: (n: Event) => void) { }
    addEventListener((e: MouseEvent) => console.log(e.x + ',' + e.y)); // ts(2769)
}

// （4）不变
{
    interface Cat extends Animal {
        miao: () => void;
    }
    const cat: Cat = {
        name: 'Cat',
        miao: () => void 0,
    };
    const dog: Dog = {
        name: 'Dog',
        woof: () => void 0,
    };
    let dogs: Dog[] = [dog];
    animals = dogs; // ok
    animals.push(cat); // ok
    dogs.forEach(visitDog); // 类型 ok，但运行时会抛出错误
}

{
    let optionalParams = (one?: number, tow?: number) => void 0;
    let requiredParams = (one: number, tow: number) => void 0;
    let restParams = (...args: number[]) => void 0;
    requiredParams = optionalParams; // ok
    restParams = optionalParams; // ok
    optionalParams = restParams; // ts(2322)
    optionalParams = requiredParams; // ts(2322)
    restParams = requiredParams; // ok
    requiredParams = restParams; // ok

    type GetFun<F extends (...args: number[]) => any> = Parameters<F>;
    type GetRequiredParams = GetFun<typeof requiredParams>;
    type GetRestParams = GetFun<typeof restParams>;
    type GetEmptyParams = GetFun<() => void>;

}

{
    interface Obj {
        identity(val: any): any;
    }
    interface Obj {
        identity(val: number): number;
    }
    interface Obj {
        identity(val: boolean): boolean;
    }
    // 相当于
    interface Obj {
      identity(val: boolean): boolean;
      identity(val: number): number;
      identity(val: any): any;
    }
    const obj: Obj = {
        identity(val: any) {
            return val;
        }
    };
    const t1 = obj.identity(1); // => number
    const t2 = obj.identity(true); // => boolean
    const t3 = obj.identity("t3"); // => any
    
}