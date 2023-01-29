//队列

//队列是一种遵从先进先出原则的数据结构

//模拟原生的入队push方法，再模拟原生的shift方法

class Queue {
    constructor() {
        //创建一个队列
        this.queue = []
        //队列长度
        this.size = 0
    }

    //入队列
    push(i) {
        this.queue[this.size] = i
        this.size++
    }

    //出队列
    shift() {
        if (this.queue.length === 0) return
        const first = this.queue[0]
        //将后面的值赋给前面的
        for (let i = 0; i < this.queue.length - 1; i++) {
            this.queue[i] = this.queue[i + 1]
        }
        this.queue.length--
        return first
    }

    //获取队首
    getFront() {
        return this.queue[0]
    }

    //获取队尾
    getRear() {
        return this.queue[this.size - 1]
    }

    // 清空队列
    clear() {
        this.queue = []
    }

    // 查看队列元素
    see() {
        console.log(this.queue)
        return this.queue
    }
}