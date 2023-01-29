//集合

//集合是由一组无序但彼此之间又有一定相关性的成员构成的, 每个成员在集合中只能出现一次.他是一个无序且唯一的数据结构

//set是es6新出的一种数据结构，Set对象是值的集合，可以按照插入的顺序迭代它的元素
//Set中的元素只会出现一次，即 Set 中的元素是唯一的

// 创建一个 集合
var s = new Set([1, 2, 3, '3', 4]);
//添加一个key
s.add(5);
//重复元素在Set中自动被过滤
s.add(5);
console.log(s);//Set {1, 2, 3, 4,5}
//删除一个key
s.delete(2);
// 判断是否有这个元素
s.has(3)
console.log(s);//Set{1, 3, "3", 4, 5}//注意数字3和字符串'3'是不同的元素


// 并集
const arr1 = new Set([1, 2, 4])
const arr2 = new Set([2, 3, 4, 5])
console.log(new Set([...arr1, ...arr2]))

//交集
const arr3 = new Set([1, 3, 4, 6, 7, 9])
const arr4 = new Set([2, 3, 4, 5, 6, 7])
const arr = new Set([...arr3].filter(item => arr4.has(item)))
console.log(arr)

