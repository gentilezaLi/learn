// 以下是前端处理数组的所有方法：
// concat()：连接两个或多个数组，并返回一个新的数组。
// copyWithin()：从数组的指定位置拷贝元素到数组的另一个指定位置。
// entries()：返回一个数组的迭代器对象，该对象包含数组的键值对。
// every()：检测数组中的所有元素是否都满足指定条件。
// fill()：使用一个固定值来填充数组。
// filter()：返回一个新数组，该数组包含符合指定条件的所有元素。
// find()：返回数组中符合指定条件的第一个元素。
// findIndex()：返回数组中符合指定条件的第一个元素的索引。
// flat()：将嵌套的数组“扁平化”，并返回一个新的数组。
// flatMap()：对数组中的每个元素执行一个函数，并返回一个“扁平化”的新数组。
// forEach()：对数组中的每个元素执行一个函数。
// includes()：判断数组中是否包含指定元素。
// indexOf()：返回数组中指定元素的第一个索引。
// join()：将数组中的所有元素转换为一个字符串。
// keys()：返回一个数组的迭代器对象，该对象包含数组的键。
// lastIndexOf()：返回数组中指定元素的最后一个索引。
// map()：对数组中的每个元素执行一个函数，并返回一个新的数组。
// pop()：删除数组中的最后一个元素，并返回该元素。
// push()：向数组的末尾添加一个或多个元素，并返回新的长度。
// reduce()：对数组中的每个元素执行一个函数，并返回一个累加器的值。
// reduceRight()：对数组中的每个元素执行一个函数，并返回一个累加器的值（从右到左）。
// reverse()：反转数组中的元素顺序。
// shift()：删除数组中的第一个元素，并返回该元素。
// slice()：返回一个新数组，包含从开始到结束（不包括结束）的所有元素。
// some()：检测数组中是否至少有一个元素满足指定条件。
// sort()：对数组中的元素进行排序。
// splice()：向数组中添加或删除元素，并返回被删除的元素。
// toLocaleString()：将数组中的所有元素转换为本地字符串。
// toString()：将数组中的所有元素转换为一个字符串。
// unshift()：向数组的开头添加一个或多个元素，并返回新的长度。
// values()：返回一个数组的迭代器对象，该对象包含数组的值。

// 会改变原数组的方法：
// concat()
// copyWithin()
// fill()
// pop()
// push()
// reverse()
// shift()
// sort()
// splice()
// unshift()

// 不会改变原数组的方法：
// entries()
// every()
// filter()
// find()
// findIndex()
// flat()
// flatMap()
// forEach()
// includes()
// indexOf()
// join()
// keys()
// lastIndexOf()
// map()
// reduce()
// reduceRight()
// slice()
// some()
// toLocaleString()
// toString()
// values()

// 需要注意的是，虽然不会直接改变原数组，但是在使用某些方法时，可能会改变原数组中的某些元素。
// 例如，使用map()方法时，虽然不会直接改变原数组，但是如果在回调函数中修改了元素的值，那么原数组中的元素也会被修改。
// 因此，在使用这些方法时，需要注意是否会对原数组产生影响。
