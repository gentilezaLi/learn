//二叉树

//前序 遍历 递归版
var preorderTraversal = function (root, array = []) {
    if (root) {
        array.push(root.val);
        preorderTraversal(root.left, array);
        preorderTraversal(root.right, array);
    }
    return array;
};

/**
 * 取跟节点为目标节点，开始遍历
    1.访问目标节点
    2.左孩子入栈 -> 直至左孩子为空的节点
    3.节点出栈，以右孩子为目标节点，再依次执行1、2、3
 */
//非递归版
var preorderTraversal = function (root) {
    const result = [];
    const stack = [];
    let current = root;
    while (current || stack.length > 0) {
        while (current) {
            result.push(current.val);
            stack.push(current);
            current = current.left;
        }
        current = stack.pop();
        current = current.right;
    }
    return result;
};

//中序 遍历 递归版
var inorderTraversal = function (root, array = []) {
    if (root) {
        inorderTraversal(root.left, array);
        array.push(root.val);
        inorderTraversal(root.right, array);
    }
    return array;
};
/**
    取跟节点为目标节点，开始遍历
    .左孩子入栈 -> 直至左孩子为空的节点
    2.节点出栈 -> 访问该节点
    3.以右孩子为目标节点，再依次执行1、2、3
 */
//非递归版
var inorderTraversal = function (root) {
    const result = [];
    const stack = [];
    let current = root;
    while (current || stack.length > 0) {
        while (current) {
            stack.push(current);
            current = current.left;
        }
        current = stack.pop();
        result.push(current.val);
        current = current.right;
    }
    return result;
};

//后序 遍历 递归版
var postorderTraversal = function (root, array = []) {
    if (root) {
        postorderTraversal(root.left, array);
        postorderTraversal(root.right, array);
        array.push(root.val);
    }
    return array;
};
/**
    取跟节点为目标节点，开始遍历
    1.左孩子入栈 -> 直至左孩子为空的节点
    2.栈顶节点的右节点为空或右节点被访问过 -> 节点出栈并访问他，将节点标记为已访问
    3.栈顶节点的右节点不为空且未被访问，以右孩子为目标节点，再依次执行1、2、3
 */
//非递归版
var postorderTraversal = function (root) {
    const result = [];
    const stack = [];
    let last = null; // 标记上一个访问的节点
    let current = root;
    while (current || stack.length > 0) {
        while (current) {
            stack.push(current);
            current = current.left;
        }
        current = stack[stack.length - 1];
        if (!current.right || current.right == last) {
            current = stack.pop();
            result.push(current.val);
            last = current;
            current = null; // 继续弹栈
        } else {
            current = current.right;
        }
    }
    return result;
}



//二叉树的基本结构
function Node(data, left, right) {
    this.data = data;
    this.left = left;
    this.right = right;
}

Node.prototype = {
    show: function () {
        console.log(this.data);
    }
}

function Tree() {
    this.root = null;
}

Tree.prototype = {
    insert: function (data) {
        var node = new Node(data, null, null);
        if (!this.root) {
            this.root = node;
            return;
        }
        var current = this.root;
        var parent = null;
        while (current) {
            parent = current;
            if (data < parent.data) {
                current = current.left;
                if (!current) {
                    parent.left = node;
                    return;
                }
            } else {
                current = current.right;
                if (!current) {
                    parent.right = node;
                    return;
                }
            }

        }
    },
    preOrder: function (node) {
        if (node) {
            node.show();
            this.preOrder(node.left);
            this.preOrder(node.right);
        }
    },
    middleOrder: function (node) {
        if (node) {
            this.middleOrder(node.left);
            node.show();
            this.middleOrder(node.right);
        }
    },
    laterOrder: function (node) {
        if (node) {
            this.laterOrder(node.left);
            this.laterOrder(node.right);
            node.show();
        }
    },
    getMin: function () {
        var current = this.root;
        while (current) {
            if (!current.left) {
                return current;
            }
            current = current.left;
        }
    },
    getMax: function () {
        var current = this.root;
        while (current) {
            if (!current.right) {
                return current;
            }
            current = current.right;
        }
    },
    getDeep: function (node, deep) {
        deep = deep || 0;
        if (node == null) {
            return deep;
        }
        deep++;
        var dleft = this.getDeep(node.left, deep);
        var dright = this.getDeep(node.right, deep);
        return Math.max(dleft, dright);
    },
    getNode: function (data, node) {
        if (node) {
            if (data === node.data) {
                return node;
            } else if (data < node.data) {
                return this.getNode(data, node.left);
            } else {
                return this.getNode(data, node.right);
            }
        } else {
            return null;
        }
    }
}

var t = new Tree();
t.insert(3);
t.insert(8);
t.insert(1);
t.insert(2);
t.insert(5);
t.insert(7);
t.insert(6);
t.insert(0);
// console.log(t);
// t.preOrder(t.root);
// t.middleOrder(t.root);
// t.laterOrder(t.root);
// console.log(t.getMin(), t.getMax(),'--------');
// console.log(t.getDeep(t.root, 0),'--------');
// console.log(t.getNode(5, t.root), '--------');


//二分查找
//二分查找的条件是必须是有序的线性表 
//和线性表的中点值进行比较，如果小就继续在小的序列中查找，如此递归直到找到相同的值
function binarySearch(data, arr, start, end) {
    if (statt > end) return -1;
    var mid = Math.floor((start + end) / 2);
    if (data == arr[mid]) return mid;
    if (data < arr[mid]) return binarySearch(data, arr, start, mid - 1)
    else return binarySearch(data, arr, mid + 1, end)
}
//var arr = [0, 1, 1, 1, 1, 1, 4, 6, 7, 8]
//console.log(binarySearch(1, arr, 0, arr.length-1));


//重建二叉树

//例如输入前序遍历序列{1,2,4,7,3,5,6,8}和中序遍历序列{4,7,2,1,5,3,8,6}，则重建二叉树并返回

//前序遍历：跟节点 + 左子树前序遍历 + 右子树前序遍历
//中序遍历：左子树中序遍历 + 跟节点 + 右字数中序遍历
//后序遍历：左子树后序遍历 + 右子树后序遍历 + 跟节点

//根据上面的规律：
//前序遍历找到根结点root
//找到root在中序遍历的位置 -> 左子树的长度和右子树的长度
//截取左子树的中序遍历、右子树的中序遍历
//截取左子树的前序遍历、右子树的前序遍历
//递归重建二叉树

/**    前序遍历                                            中序遍历
 *     1,         2,4,7,       3,5,6,8                    4,7,2,     1,     5,3,8,6
 *     root       左子树        右子树                     左子树     root    右子树 
 */

//重建二叉树代码
function reConstructBinaryTree(pre, vin) {
    if (pre.length === 0) return null;
    if (pre.length === 1) return new TreeNode(pre[0])
    const value = pre[0]
    const index = vin.indexOf(value)
    const preLeft = pre.slice(1, index + 1)
    const preRight = pre.clice(index + 1)
    const vinLeft = vin.slice(0, index)
    const vinRight = vin.slice(index + 1)
    const node = new TreeNode(value)
    node.left = reConstructBinaryTree(preLeft, vinLeft)
    node.right = reConstructBinaryTree(preRight, vinRight)
    return node
}



//求二叉树的遍历

//给定一棵二叉树的前序遍历和中序遍历，求其后序遍历
//两个字符串，其长度n均小于等于26。 
//第一行为前序遍历，第二行为中序遍历。 二叉树中的结点名称以大写字母表示：A，B，C....最多26个结点。

/**
输入
    ABC         FDXEAG
    BAC         XDEFAG
输出
    BCA         XEDGAF
 */

function getH() {
    let pre, vin
    while ((pre = readline()) !== null) {
        vin = readline()
        console.log(getHRD(pre, vin))
    }
    function getHRD() {
        if (!pre) return '';
        if (pre.length === 1) return pre;
        const value = pre[0]
        const index = vin.substring(value)
        const preLeft = pre.substring(1, index + 1)
        const preRight = pre.substring(index + 1)
        const vinLeft = vin.substring(0, index)
        const vinRight = vin.substring(index + 1)
        return getHRD(preLeft, vinLeft) + getHRD(preRight, vinRight)
    }
}


//对称二叉树

//如果一个二叉树同此二叉树的镜像是同样的，定义其为对称的
//二叉树的右子树是二叉树左子树的镜像二叉树

//镜像二叉树：两颗二叉树根结点相同，但他们的左右两个子节点交换了位置

/**            一                二                三
 *             8                 8                 8
 *          6     6           6     9           8     8
 *         5 7   7 5         5 7   5 7         8 8   8
 *
 *    1为对称二叉树，2、3都不是
 */


/**
 *  两个根结点相等
    左子树的右节点和右子树的左节点相同。
    右子树的左节点和左子树的右节点相同。

    递归所有节点满足以上条件即二叉树对称
 */

//代码
function isSymmetrical(pRoot) {
    return isSymmetricalTree(pRoot, pRoot)
    function isSymmetricalTree(node1, node2) {
        if (!node1 && !node2) return true;
        if (!node1 || !node2) return false;
        if (node1.val != node2.val) return false;
        return isSymmetricalTree(node1.left, node2.right) && isSymmetricalTree(node1.right, node2.left)
    }
}


//二叉树的镜像
//操作给定的二叉树，将其变换为源二叉树的镜像
/**
 * 源二叉树                 镜像二叉树
        8                      8
      /   \                  /  \
     6    10                10   6
    / \   / \              / \  / \
    5   7  9 11           11 9  7  5

    递归交换二叉树所有节点左右节点的位置
 */

function Mirror(root) {
    if (root) {
        [root.left, root.right] = [root.right, root.left]
        Mirror(root.right)
        Mirror(root.left)
    }
}


//平衡二叉树   每个子树的深度之差不超过1

/**
 * 后续遍历二叉树

在遍历二叉树每个节点前都会遍历其左右子树

比较左右子树的深度，若差值大于1 则返回一个标记 -1表示当前子树不平衡

左右子树有一个不是平衡的，或左右子树差值大于1，则整课树不平衡

若左右子树平衡，返回当前树的深度（左右子树的深度最大值+1）
 */

function IsBalanced_Solution(pRoot) {
    return balanced(pRoot) != -1
    function balanced(node) {
        if (!node) return 0;
        const left = balanced(node.left)
        const right = balanced(node.right)
        if (left == -1 || right == -1 || Math.abs(left - right) > 1) return -1
        return Math.max(left, right) + 1
    }
}

//二叉树中和为某一值的路径

//输入一颗二叉树的跟节点和一个整数，打印出二叉树中结点值的和为输入整数的所有路径。路径定义为从树的根结点开始往下一直到叶结点所经过的结点形成一条路径

/**
 * 套用回溯算法的思路

设定一个结果数组result来存储所有符合条件的路径

设定一个栈stack来存储当前路径中的节点

设定一个和sum来标识当前路径之和

从根结点开始深度优先遍历，每经过一个节点，将节点入栈

到达叶子节点，且当前路径之和等于给定目标值，则找到一个可行的解决方案，将其加入结果数组

遍历到二叉树的某个节点时有2个可能的选项，选择前往左子树或右子树

若存在左子树，继续向左子树递归

若存在右子树，继续向右子树递归

若上述条件均不满足，或已经遍历过，将当前节点出栈，向上回溯

 */

function FindPath(root, expectNumber) {
    const result = []
    if (node) {
        FindPathCore(root, expectNumber, [], 0, result)
    }
    return result;
    function FindPathCore(node, expectNumber, stack, sum, result) {
        stack.push(node.val)
        sum += node.val
        if (!node.left && !node.right && sum === expectNumber) {
            result.push(stack.slice(0))
        }
        if (node.left) {
            FindPathCore(node.left, expectNumber, stack, sum, result)
        }
        if (node.right) {
            FindPathCore(node.right, expectNumber, stack, sum, result)
        }
        stack.pop()
    }
}


//序列化二叉树  反序列化二叉树

/****
 * 若一颗二叉树是不完全的，我们至少需要两个遍历才能将它重建（像题目重建二叉树一样）
 但是这种方式仍然有一定的局限性，比如二叉树中不能出现重复节点。
 如果二叉树是一颗完全二叉树，我们只需要知道前序遍历即可将它重建。
 因此在序列化时二叉树时，可以将空节点使用特殊符号存储起来，这样就可以模拟一棵完全二叉树的前序遍历
 在重建二叉树时，当遇到特殊符号当空节点进行处理
 */

//序列化二叉树 
function Serialize(pRoot, arr = []) {
    if (!pRoot) {
        arr.push('#')
    } else {
        arr.push(pRoot.val)
        Serialize(pRoot.left, arr)
        Serialize(pRoot.right, arr)
    }
    arr.join(',')
}
//反序列化二叉树
function Deserialize(s) {
    if (!s) return null;
    return deserialize(a.split(','))
    function deserialize(arr) {
        let node = null
        const current = arr.shift()
        if (current !== '#') {
            node = { val: current }
            node.left = deserialize(arr)
            node.right = deserialize(arr)
        }
        return node
    }
}

//数的子结构
//输入两棵二叉树A，B，判断B是不是A的子结构

/**
 * 首先找到A树中和B树根节点相同的节点
从此节点开始，递归AB树比较是否有不同节点
 */

function HasSubtree(pRoot1, pRoot2) {
    let result = false
    if (pRoot1 && pRoot2) {
        if (pRoot1.val === pRoot2.val) {
            result = compare(pRoot1, pRoot2)
        }
        if (!result) {
            result = HasSubtree(pRoot1.left, pRoot2)
        }
        if (!result) {
            result = HasSubtree(pRoot1.right, pRoot2)
        }
    }
    return result;
    function compare(pRoot1, pRoot2) {
        if (pRoot2 === null) return true
        if (pRoot1 === null) return false
        if (pRoot1.val !== pRoot2.val) return false
        return compare(pRoot1.right, pRoot1.right) && compare(pRoot1.left, pRoot2.left)
    }
}
