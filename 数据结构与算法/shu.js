//树

//在计算机科学中，树是一种十分重要的数据结构。树被描述为一种分层数据抽象模型，常用来描述数据间的层级关系和组织结构。树也是一种非顺序的数据结构。

//大众普遍接受的算法，叫做深度优先遍历（DFS），和广度优先遍历(BFS)

//深度优先遍历（DFS）
//深度优先遍历顾名思义，就是紧着深度的层级遍历，他是纵向的维度对dom树进行遍历
//从一个dom节点开始，一直遍历其子节点，直到它的所有子节点都被遍历完毕之后再遍历它的兄弟节点，如此往复，直到遍历完他所有的节点

//将dom 抽象成树
var dom = {
    tag: 'div',
    children: [
        {
            tag: 'ul',
            children: [
                {
                    tag: 'li',
                    children: [
                        {
                            tag: 'a',
                            children: [
                                {
                                    tag: 'img'
                                }
                            ]
                        }

                    ]
                },
                {
                    tag: 'li',
                    children: [
                        {
                            tag: 'span'
                        }
                    ]
                },
                {
                    tag: 'li'
                }
            ]
        },
        {
            tag: 'p'
        },
        {
            tag: 'button'
        }
    ]
}
var nodeList = []
//深度优先遍历算法
function DFS(node, nodeList) {
    if (node) {
        nodeList.push(node.tag);
        var children = node.children;
        if (children) {
            for (var i = 0; i < children.length; i++) {
                //每次递归的时候将 需要遍历的节点 和 节点所存储的数组传下去
                DFS(children[i], nodeList);
            }
        }
    }
    return nodeList;
}
DFS(dom, nodeList)
console.log(nodeList)


//广度优先遍历（BFS）
//所谓广度优先遍历，也是同样的道理，就是紧着同级的遍历，该方法是以横向的维度对dom树进行遍历
//从该节点的第一个子节点开始，遍历其所有的兄弟节点，再遍历第一个节点的子节点，完成该遍历之后，暂时不深入，开始遍历其兄弟节点的子节点

var nodeLists = []

function BFS(node, nodeLists) {
    //由于是广度优先，for循环不是很优雅，我们可以使用队列来解决
    if (node) {
        var q = [node]
        while (q.length > 0) {
            var item = q.shift()
            // console.log(item,'---')
            nodeLists.push(item.tag)
            if (item.children) {
                item.children.forEach(e => {
                    q.push(e)
                })
            }

        }
    }
}
BFS(dom, nodeLists)
console.log(nodeLists)

//二叉树

//二叉树(Binary Tree)是一种树形结构，它的特点是每个节点最多只有两个分支节点
//一棵二叉树通常由根节点，分支节点，叶子节点组成。而每个分支节点也常常被称作为一棵子树

//二叉树中最有名的当属先序遍历，中序遍历，以及后序遍历

//前端用对象来表示二叉树
const bt = {
    val: 1,
    left: {
        val: 2,
        left: {
            val: 4,
            left: null,
            right: null,
        },
        right: {
            val: 5,
            left: null,
            right: null,
        },
    },
    right: {
        val: 3,
        left: {
            val: 6,
            left: null,
            right: null,
        },
        right: {
            val: 7,
            left: null,
            right: null,
        },
    },
}

// console.log(bt)

//创建二叉树
//arr=[6,5,6,8,9,1,4,3,6]将数组根据下标为0的大小转化成二叉树
const arr = [6, 5, 6, 8, 9, 1, 4, 3, 6]
class CreateTreeNode {
    constructor(key) {
        this.left = null  // 左节点
        this.right = null  // 右节点
        this.key = key  // 键
    }
}

class CreateTree {
    constructor() {
        this.root = null
    }
    insert(key) {
        const node = new CreateTreeNode(key)
        if (this.root === null) {
            this.root = node
        } else {
            this.insertNode(this.root, node)
        }
    }
    // 抽离递归比较部分逻辑
    insertNode(node, newNode) {
        if (node.key < newNode.key) {
            if (node.left) {
                this.insertNode(node.left, newNode)
            } else {
                node.left = newNode
            }
        } else {
            if (node.right) {
                this.insertNode(node.right, newNode)
            } else {
                node.right = newNode
            }
        }
    }


    //先序遍历
    //先序遍历(preorder)：先自己，再遍历左节点，最后遍历右节点
    preorderTransverse(root, arr) {
        if (!root) return
        arr.push(root.key)
        this.preorderTransverse(root.left, arr)
        this.preorderTransverse(root.right, arr)
        return arr
    }

    //中序遍历
    //中序遍历(inorder)：先遍历左节点，再遍历自己，最后遍历右节点，输出的刚好是有序的列表
    //中序遍历 有递归版本和 非递归的版本，此处使用递归版本
    inorderTransverse(root, arr) {
        if (!root) return
        this.inorderTransverse(root.left, arr)
        arr.push(root.key)
        this.inorderTransverse(root.right, arr)
    }

    //后序遍历(postorder)：先左节点，再右节点，最后自己
    // 由于后序遍历的非递归版本比较巧妙，我们使用非递归版本
    postorderTransverse(root, arr) {
        //创建一个栈
        var stack = []
        //将根节点压入栈顶
        stack.push(root)
        while (stack.length > 0) {
            let node = stack.push()
            //利用unshift按照顺序压入数组
            arr.unshift(node.key)
            if (node.left) {
                stack.push(node.left)
            }
            if (node.right) {
                stack.push(node.right)
            }
        }
    }
}

const tree = new CreateTree()

arr.forEach(key => {
    tree.insert(key)
})

// console.log(tree)






