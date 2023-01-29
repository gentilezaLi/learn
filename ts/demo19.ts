//Enum 枚举类型

//现在有一个项目  通过掷色子随机选择一个小组去做

//初级程序员写法:
function getGroup(status: number) {
    if (status === 0) {
        return 'A组'
    } else if (status === 1) {
        return 'B组'
    } else if (status === 2) {
        return 'C组'
    }
}
const result = getGroup(0)
console.log(`我要选择${result}`)


//中级程序员写法:
const Status = {
    'A组': 0,
    'B组': 1,
    'C组': 2
}
function getGroupZ(status: any) {
    if (status === Status['A组']) {
        return "A组";
    } else if (status === Status['B组']) {
        return "B组";
    } else if (status === Status['C组']) {
        return "C组";
    }
}
const resultZ = getGroupZ(Status['A组']);
console.log(`我要选择${resultZ}`);

//高级程序员写法:
enum StatusG {
    'A组',
    'B组',
    'C组'
}
function getServeG(status: any) {
    if (status === StatusG['A组']) {
        return "A组";
    } else if (status === StatusG['B组']) {
        return "B组";
    } else if (status === StatusG['C组']) {
        return "C组";
    }
}
const resultG = getServeG(StatusG['C组']);
console.log(`我要选择${resultG}`);


//1.枚举类型的对应值

//调用是传入A组，也会输出 ‘我要选择A组’

const results=getGroupZ('A')
//因为枚举类型是有对应的数字值的，默认是从 0 开始的
console.log(StatusG['A组'])  //0
console.log(StatusG['B组'])  //1
console.log(StatusG['C组'])  //2

//可以看出结果就是0,1,2。那这时候不想默认从 0 开始，而是想从 1 开始

enum StatusH {
    'A组'=1,
    'B组',
    'C组'
}
console.log(StatusH['A组'])  //1
console.log(StatusH['B组'])  //2
console.log(StatusH['C组'])  //3

//2.枚举通过下标反查
//能打印出枚举的值(也有叫下标的)，那如果知道下标后，也可以通过反差的方法，得到枚举的值

console.log(StatusG['A组'],StatusG[1],'反查')