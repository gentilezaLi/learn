//TypeScript 函数参数和返回类型定义

//1.简单类型定义
function getTotals(one: number, two: number) {
    return one + two;
}

const totalss = getTotal(1, 2);

//这时候我们写的代码其实是有一个小坑的，就是我们并没有定义getTotal的返回值类型
//虽然TypeScript可以自己推断出返回值是number类型
//但是如果这时候我们的代码写错了，比如写程了下面这个样子

function getTotalaaa(one: number, two: number) {
    return one + two + "";
}

const totala = getTotalaaa(1, 2);
//这时候totala的值就不是number类型了，但是不会报错



function getTotalsss(one: number, two: number): number {
    return one + two;
}
const totalsss = getTotalsss(1, 2);
//给函数的返回值加上类型注解


//2.函数无返回值时定义方法
function sayHello() {
    console.log("hello world");
}
//这就是没有返回值的函数，我们就可以给他一个类型注解void，代表没有任何返回值。

function sayHellos(): void {   //如果这样定义后，你再加入任何返回值，程序都会报错
    console.log("hello world");
}

//3.never 返回值类型
//如果一个函数是永远也执行不完的，就可以定义返回值为never
//比如执行执行的时候，抛出了异常，这时候就无法执行完了

function errorFuntion(): never {
    throw new Error();
    console.log("Hello World");
}

//还有一种是一直循环，也是我们常说的死循环，这样也运行不完
function forNever(): never {
    while (true) { }
    console.log("Hello JSPang");
}

//4.函数参数为对象(解构)时
function add({ one, two }) {
    return one + two;
}
const totalaz = add({ one: 1, two: 2 });


function add1({ one, two }: { one: number, two: number }): number {
    return one + two
}
const threea = add1({ one: 1, two: 2 });