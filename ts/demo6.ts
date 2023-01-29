//TypeScript 中数组类型的定义

//1.一般数组类型的定义

//定义一个最简单的数组类型
const numberArr = [1, 2, 3];
//把鼠标放在numberArr上面可以看出，这个数组的类型就是 number 类型

//TypeScript 通过类型推断自己推断出来的   如果你要显示的注解
const numberArr2: number[] = [1, 2, 3]

//数组各项是字符串
const numberArr3: string[] = ['a', 'b', 'c']

//定义任意类型的数组，比如是undefined
const undefinedArr: undefined[] = [undefined, undefined]

//既有数字类型，又有字符串    只要加个()，然后在里边加上|就可以了
const arr: (number | string)[] = [1, 'a', 2]



//2.数组中对象类型的定义

//比如现在我们要定义一个有很多小姐姐的数组，每一个小姐姐都是一个对象。这是的定义就编程了这样

const xiaojiejiesss: { name: string, age: number }[] = [
    { name: '小红', age: 20 },
    { name: '小花', age: 21 },
]

//这种形式看起来比较麻烦，而且如果有同样类型的数组，写代码也比较麻烦，TypeScript 为我们准备了一个概念，叫做类型别名(type alias)。
//比如刚才的代码，就可以定义一个类型别名，定义别名的时候要以type关键字开始

//现在定义一个Lady的别名。
type Lady = { name: string, age: number }
const xiaojiejiesssss: Lady[] = [
    { name: '小红', age: 20 },
    { name: '小花', age: 21 },
]

//这样定义是完全起作用的，比如我们下面在对象里再加入一个属性，这时候编译器就会直接给我们报错了
type Ladys = { name: string, age: number }
const xiaojiejiessssss: Ladys[] = [
    { name: '小红', age: 20 },
    { name: '小花', age: 21, hehe: 789 },  //报错
]

//也可以只用类class定义 比如我们定义一个Madam的类,然后用这个类来限制数组的类型也是可以的
class Madam {
    name: string;
    age: number;
}
const xiaojiejieaa: Madam[] = [
    { name: '小红', age: 20 },
    { name: '小花', age: 21 },
]




