//TypeScript 中的两个基本概念：类型注解和类型推断

//1.type annotation 类型注解

let countss: number;
countss = 123;
//countss 变量就是一个数字类型，这就叫做类型注解



//2.type inferrence 类型推断
let countInference = 123;
//并没有显示的告诉你变量countInference是一个数字类型
//但是如果你把鼠标放到变量上时，你会发现 TypeScript 自动把变量注释为了number（数字）类型
//也就是说它是有某种推断能力的，通过你的代码 TS 会自动的去尝试分析变量的类型


// 3.工作使用问题（潜规则）
// 如果 TS 能够自动分析变量类型， 我们就什么也不需要做了
// 如果 TS 无法分析变量类型的话， 我们就需要使用类型注解

//先来看一个不用写类型注解的例子
const one = 1;
const two = 2;
const three = one + two;

//再来看一个用写类型注解的例子
function getTotal(one, two) {
    return one + two;
}
const total = getTotal(1, 2);
//这种形式，就需要用到类型注释了，因为这里的one和two会显示为any类型


function getTotalsa(one: number, two: number) {
    return one + two;
}
const totals = getTotalsa(1, 2);
//这里有的一个问题是，为什么totals这个变量不需要加类型注解
//因为当one和two两个变量加上注解后，TypeScript 就可以自动通过类型推断，分析出变量的类型

const XiaoJieJie = {
    name: "刘英",
    age: 18,
};
//把鼠标放在XiaoJieJie对象上面，就会提示出他里边的属性，这表明 TypeScript 也分析出了对象的属性的类型

//在写 TypeScript 代码的一个重要宗旨就是每个变量，每个对象的属性类型都应该是固定的，如果你推断就让它推断，推断不出来的时候你要进行注释