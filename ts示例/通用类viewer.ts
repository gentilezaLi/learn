//TypeJoin：将一个元组类型中的所有元素合并成一个类型。
export type TypeJoin<A extends any[]> = A extends [infer R, ...infer L] ? R & TypeJoin<L> : A;

//Class：表示一个类的类型，包括构造函数和实例类型。
export type Class<A extends any[] = any[], I = any> = new (...args: A)=>I;

//ClassInstance：从一个类类型中获取实例类型。
export type ClassInstance<T> =T extends Class<any[], infer R> ? R : never;

//MixinType：表示将一个类类型和一个类型 T 合并后的类型。
export type MixinType<O extends Class, T> = ClassInstance<O> & T;

//MixinTypeClass：表示将一个类类型和一个类型 T 合并后的类类型。
export type MixinTypeClass<O extends Class, T> = Class<ConstructorParameters<O>, MixinType<O, T>>

//ClassMix，它接受一个类类型的元组，并将它们合并成一个类类型。具体实现方式是通过递归和类型推断来实现的。
export type ClassMix<Cs extends Class<void[]>[], Result extends any[]= []> = Cs extends [infer R, ...infer L] ?
L extends Class<void[]>[] ? ClassMix<L, [...Result, ClassInstance<R>]> : [...Result, ClassInstance<R>] : Result;

//extendsMultiple，它接受多个类类型，并将它们合并成一个新的类类型。
//具体实现方式是通过创建一个空类 mixed，然后将多个类类型的实例属性和方法拷贝到 mixed 类的原型上来实现的。
function extendsMultiple<Cs extends Class<void[]>[]>(...args: Cs): Class<void[], TypeJoin<ClassMix<Cs>>> {
  class mixed {};
  return mixed as Class<void[], TypeJoin<ClassMix<Cs>>>;
}

// 使用方式： 定义多个功能相对独立class
class Mix {
  bar = '123';
  getName(this: Foo) {
    return this.foo;
  }
}

class Mix2  {
  sayHello(this: Foo) {
    console.info(this.foo);
  }
}

// 业务使用方extends合并后的Class做实例化，其实实现上还是mixin拓展了原类的prototype，类似上面注释掉的mixin，这里聚焦在类型的实现上
class Foo extends extendsMultiple(Mix, Mix2) {
  foo = 'FOO';
  constructor(private a: string) {
    super();
    this.foo = a;
  }
}

const a = new Foo('123');
// 现在a上有了Mix和Mix2双方的方法和属性
a.bar;
a.foo;
a.getName();
a.sayHello();