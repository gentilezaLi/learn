//堆

//堆是什么? 在前端中甚至都很少提过这个概念，其实，堆是一种特殊的完全二叉树

//一个完全二叉树，却不是一个满二叉树,那完全二叉树的定义是啥呢
//若设二叉树的深度为k，除第 k 层外，其它各层 (1～k-1) 的结点数都达到最大个数，第k 层所有的结点都连续集中在最左边，这就是完全二叉树。

//堆是一中特殊的完全二叉树，那么他又什么特点呢？
//所有的节点都大于等于或者小于等于它的子节点
//如果每个节点都大于等于它的子节点是最大堆
//如果每个节点都小于等于它的子节点是最小堆

//手写一个实践一个最小堆类
class MinHeep {
    constructor() {
        this.heap = []
    }

    //插入方法
    insert(val) {
        this.heap.push(val)
        this.shiftUP(this.heap.length - 1)
    }

    //交换方法
    swap(i, v) {
        let temp = this.heap[i]
        this.heap[i] = this.heap[v]
        this.heap[v] = temp
    }

    //上移方法
    shiftUP(index) {
        if (index === 0) return
        let preIndex = this.getParentIndex(index)
        if (this.heap[preIndex] > this.heap[index]) {
            this.swap(preIndex, index)
        }
    }
    getParentIndex(i) {
        //求商的方法
        return (i - 1) >> 1
    }
}

let h=new MinHeep()
h.insert(3)
h.insert(1)
h.insert(2)
h.insert(7)
h.insert(4)
console.log(h.heap)