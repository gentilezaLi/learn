/*
 * @Author: your name
 * @Date: 2020-12-14 16:35:26
 * @LastEditTime: 2020-12-28 10:34:52
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \learn\数据结构与算法\zhan.js
 */
//栈  

//栈是一种遵从后进先出（LIFO）原则的数据结构

class Stack {
    constructor() {
        this.stack = []
        //栈的长度
        this.size = 0
    }

    //入栈
    push(i) {
        this.stack[this.size] = i
        this.size++
    }

    //出栈
    pop() {
        if (this.stack.length > 0) {
            const last = this.stack[--this.size]
            this.stack.length--
            return last
        }
    }

    //查看栈顶元素
    peek() {
        return this.stack[this.size - 1]
    }

    //栈是否为空
    isEmpty() {
        return this.stack.length === 0
    }

    //清空栈
    clear(){
        this.stack=[]
    }

    //查看栈元素
    see(){
        console.log(this.stack)
        return this.stack
    }
}

let arr=new Stack()
console.log(arr.push(100))
console.log(arr.push(200))
console.log(arr.push(500))
console.log(arr.push(1000))
console.log(arr.pop())
console.log(arr.peek())
console.log(arr.isEmpty())
// console.log(arr.clear())
console.log(arr.see())
console.log(arr)