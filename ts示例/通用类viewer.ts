export type TypeJoin<A extends any[]> = A extends [infer R, ...infer L] ? R & TypeJoin<L> : A;
export type Class<A extends any[] = any[], I = any> = new (...args: A)=>I;
export type ClassInstance<T> =T extends Class<any[], infer R> ? R : never;
export type MixinType<O extends Class, T> = ClassInstance<O> & T;
export type MixinTypeClass<O extends Class, T> = Class<ConstructorParameters<O>, MixinType<O, T>>

export type ClassMix<Cs extends Class<void[]>[], Result extends any[]= []> = Cs extends [infer R, ...infer L] ?
L extends Class<void[]>[] ? ClassMix<L, [...Result, ClassInstance<R>]> : [...Result, ClassInstance<R>] : Result;

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