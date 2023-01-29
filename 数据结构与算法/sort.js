//排序算法

//冒泡排序、选择排序、插入排序、归并排序、快速排序、搜索排序


//冒泡排序
//1.比较相邻的元素，如果第一个比第二个大，就交换他们两个
//2.对每一对相邻元素做同样的工作，从开始第一对到结尾的最后一对，这步做完后，最后的元素将会是最大的数
//3.针对多有的元素重复以上的步骤，除了最后一个
//4.持续每次对越来越少的元素重复上面的步骤，直到没有任何一对数字需要比较

let arr = [5, 8, 2, 9, 4, 6, 3, 7, 1]

function bubble(arr) {
    //外层i控制比较轮数
    for (let i = 0; i < arr.length; i++) {
        //里层循环控制每一轮比较的次数
        for (let j = 0; j < arr.length - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
            }
        }
    }
    return arr
}
// console.log(bubble(arr))
//由于冒泡排序有两个嵌套循环，所以他的时间复杂度为O(n²)，由于这个时间复杂度相当的高
//所以在排序算法中，冒泡排序属于性能较差的所以工作中基本用不到，只是在面试中使用

//选择排序
//1.首先在为排序序列中找到最小（大）元素，存放到排序序列的起始位置
//2.再从剩余未排序元素中继续寻找最小（大）元素，然后放到已排序序列的末尾
//3.重复第二部，直到所有元素均排序完毕

function selectsort(arr) {
    let length = arr.length
    for (let i = 0; i < length - 1; i++) {
        let min = i
        for (let j = min + 1; j < length; j++) {
            if (arr[min] > arr[j]) {
                min = j
            }
        }
        if (min != 1) {
            [arr[i], arr[min]] = [arr[min], arr[i]]
        }
    }
    return arr
}
// console.log(selectsort(arr))
//选择排序我们发现他也是两个for循环，那么相应的他也是O(n²)，性能较差


//插入排序
//1.从第二个数字往前比
//2.比他大的往后排，以此类推直接排到末尾

function insertsort(arr) {
    let length = arr.length
    //从第二个数字开始
    for (let i = 1; i < length; i++) {
        //用变量保存每个值
        let temp = arr[i]
        let j = i
        for (; j > 0; j--) {
            if (temp >= arr[j - 1]) {
                break  //当前考察的数大于前一个数，证明有序，退出循环
            }
            arr[j] = arr[j - 1] //将前一个数赋值到后一个数上
        }
        arr[j] = temp //找到考察的数应处于的位置
    }
    return arr
}
// console.log(insertsort(arr))
//插入排序我们发现他也是两个for循环，那么相应的他也是O(n²)，性能较差

//归并排序
//1.把数组劈成两半，再递归的对子数组进行劈开的操作，直到分成一个个单独的数
//2.把两个数组合并成有序的数组，再对有序数组进行合并直到全部子数组合并为一个完整的数组

function mergesort(arr) {
    //劈开数组
    if (arr.length === 1) return arr;
    const mid = Math.floor(arr.length / 2)
    const left = arr.slice(0, mid)
    const right = arr.slice(mid, arr.length)

    //递归
    const orderLeft = mergesort(left)
    const orderRight = mergesort(right)

    const res = []
    while (orderLeft.length || orderRight.length) {
        //利用队列排序数字并压入数组
        if (orderLeft.length && orderRight.length) {
            res.push(orderLeft[0] < orderRight[0] ? orderLeft.shift() : orderRight.shift())
        } else if (orderLeft.length) {
            res.push(orderLeft.shift())
        } else if (orderRight.length) {
            res.push(orderRight.shift())
        }
    }
    return res;
}
// console.log(mergesort(arr))
//由于分的操作是一个递归，并且是给劈成两半那么他的时间复杂度就是O(logN)由于合并是一个while 的循环那么总体的时间复杂度就是O(nlogN)


//快速排序
//1.首先需要分区，从数组选任意一个基准，然后将前后的值跟基准比较，如果比基准小，那么放入左边数组，否则放入右边数组
//2.递归的对子数组进行分区直到最后和合并排序号的子数组

function quicksort(arr){
    if(arr.length===0||arr.length===1) return arr
    const left=[],right=[]
    //找到基准，暂时取下标0
    const mid=arr[0]
    //由于0被取了，从1开始
    for(let i=1;i<arr.length;i++){
        if(arr[i]<mid){
            left.push(arr[i])
        }else{
            right.push(arr[i])
        }
    }
    //递归
    return [...quicksort(left),mid,...quicksort(right)]
}
// console.log(quicksort(arr))
//快速排序的代码，跟归并排序很像，都是分治思想，同样的他们的时间复杂度也都是O(nlogN) 

//归并排序、快速排序的区别
//进行分组的策略不同，合并的策略也不同
//归并的分组策略：是假设排序的元素存放在数组中，那么把数组前面的一半元素作为一组，后面一半作为另一组
//快排的分组策略：根据元素的值来分的，大于某个值的元素的一组，小于某个值的元素的一种
//归并的合并策略: 对两个有序的数组根据大小合并
//快排的合并策略: 把两个数组合并起来就行了



//一个二维数组全排列
function full(arr){
    const len=arr.length
    if(len<=1) return arr[0]||[]
    let res=[]
    full(arr.slice(0,len-1)).forEach(x=>{
        arr[len-1].forEach(y=>{
            res.push(x+''+y)
        })
    })
    return res
}
// console.log(full([['A','B'],['a','b'],[1,2]]))

console.log(Math.random().toString().slice(2))