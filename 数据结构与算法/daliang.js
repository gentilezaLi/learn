
// function shuffle(arr) {
//     let m = arr.length;
//     while (m > 1) {
//         let index = parseInt(Math.random() * m--);
//         [arr[index], arr[m]] = [arr[m], arr[index]];
//     }
//     return arr;
// }
// console.log(shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]))


// function removeDup(arr){
//     var result = [];
//     var hashMap = {};
//     for(var i = 0; i < arr.length; i++){
//         var temp = arr[i]
//         if(!hashMap[temp]){
//             hashMap[temp] = true
//             result.push(temp)
//         }
//     }
//     return result;
// }

// console.log(removeDup([1,1,2,2,3,4,5,6,3,2]))

// function flattenByDeep(array,deep){
//     var result = [];
//     for(var i = 0 ; i < array.length; i++){
//         if(Array.isArray(array[i]) && deep >= 1){
//               result = result.concat(flattenByDeep(array[i],deep -1))
//         }else{
//               result.push(array[i])
//         }
//     }
//     return result;
// }

// console.log(flattenByDeep([1,[2,[3,[4,5]]]]))

// function Animal(){
//     this.type="animal"
// }
// Animal.prototype.getType=function(){
//     return this.type
// }

// function Dog(){
//     this.name="dog"
// }
// Dog.prototype=new Animal()
// Dog.prototype.getName=function(){
//     return this.name
// }
// let aaa=new Dog()

// console.log(aaa.__proto__===Dog.prototype)
// console.log(Dog.prototype.__proto__===Animal.prototype)
// console.log(Animal.prototype.__proto__===Object.prototype)
// console.log(Object.prototype.__proto__===null)


// let ppp=new Promise((resolve)=>{
//     console.log('ppp')
//     resolve()
// })
// ppp.then(()=>{
//     console.log("resolved")
// })
// console.log("Hi")

// function* helloWorldGenerator() {
//     yield 'hello';
//     yield 'world';
//     return 'ending';
// }

// var hw = helloWorldGenerator();
// console.log(hw.next())
// console.log(hw.next())
// console.log(hw.next())
// console.log(hw.next())
// console.log(hw.next())

// function* gen() {
//     yield  123 + 456;
//   }
//   var a=gen()
// console.log(a.next())
// console.log(a.next())

// function* numbers () {
//     yield 1
//     yield 2
//     return 3
//     yield 4
//   }
//   let a=numbers()
//   console.log(a.next())
//   console.log(a.next())
//   console.log(a.next())
//   console.log(a.next())
//   console.log(a.next())

// for (const i of [1,2,5]) {
//     console.log(i)
//  }

// const message = 'hello';

// for (const character of message) {
//     console.log(character)
//  }

// const map = new Map();
// map.set("name", '前端未来');
// map.set("author", '河畔一角');
// for(const item of map){ 
//     console.log(item)
// }// 或者
// for(const [key,val] of map){ 
//     console.log(key)
//     // console.log(val)
// }


// const names = new Set(['Tom', 'Jack', 'Lily']);
// for (let name of names) {
//     console.log(name)
//  }
// let text = "和"
// console.log(text.length)


// [
//     {
//         a: 1,
//         b: [{ c: 2, d: 3 }]
//     },
//     {
//         a: 1,
//         b: [{ c: 2, d: 3 }]
//     }
// ]

// let arr1 = [
//     { a: 1, b: 2, c: 3 },
//     { a: 4, b: 5, c: 6 },
//     { a: 7, b: 8, c: 9 }
// ]

// let arr2 = [
//     { a: 10, b: 2, c: 3 },
//     { a: 4, b: 5, c: 6 },
//     { a: 7, b: 8, c: 9 },
//     { a: 5, b: 8, c: 9,d:11111 },
// ]

//  let arr3 = []
//     arr2.forEach((item, index) => {
//       for (var key in item) {
//         if (item[key] !== arr1[index][key]) {
//           arr3.push(item)
//         }
//       }
//     })
// console.log(arr3)

// var array1 = [ {"Num": "A "  },{"Num": "B" }];
// var array2 = [ {"Num": "A ","Name": "t1 " }, {"Num": "B","Name": "t2"}, {"Num": "C " ,"Name": "t3 "}];
// var result = [];
// for(var i = 0; i < array2.length; i++){
//     var obj = array2[i];
//     var num = obj.Num;
//     var isExist = false;
//     for(var j = 0; j < array1.length; j++){
//         var aj = array1[j];
//         var n = aj.Num;
//         if(n == num){
//             isExist = true;
//             break;
//         }
//     }
//     if(!isExist){
//         result.push(obj);
//     }
// }
// console.log(result);
// var array1 = [{
//     "USER_ID": "1111",
//     "USER_NAME": "88881",
//     "TF_REMARK": "备注备注备注"
// }, {
//     "USER_ID": "2222",
//     "USER_NAME": "88882",
//     "TF_REMARK": "这是一个备注"
// }];
// var array2 = [
//     {
//         "USER_ID": "1111",
//         "USER_NAME": "88881",
//         "TF_REMARK": "备注备注备注"
//     },
//     {
//         "USER_ID": "2222",
//         "USER_NAME": "88882",
//         "TF_REMARK": "备注备注备注"
//     },
//     {
//         "USER_ID": "3333",
//         "USER_NAME": "88882",
//         "TF_REMARK": "这是一个备注"
//     },
//     {
//         "USER_ID": "4444",
//         "USER_NAME": "8888",
//         "TF_REMARK": null
//     }
// ];
// var result = [];
// for (var i = 0; i < array2.length; i++) {
//     var obj = array2[i];
//     var num = obj.USER_ID;
//     var flag = false;
//     for (var j = 0; j < array1.length; j++) {
//         var aj = array1[j];
//         var n = aj.USER_ID;
//         if (n == num) {
//             flag = true;
//             break;
//         }
//     }
//     if (!flag) {
//         result.push(obj);
//     }
// }
// console.log(result);

// var climbStairs = function (n) {
//     let dp = [];
//     dp[0] = 0, dp[1] = 1, dp[2] = 2;
//     for (let i = 3; i <= n; i++) {
//         dp[i] = dp[i - 2] + dp[i - 1];
//     }
//     return dp[n];
// };
// console.log(climbStairs(6))
// console.log(climbStairs(3))


// var uniquePaths = function(m, n) {
//     if(m === 1 && n === 1) return 1;
//     let data = [],rows = [0];
//     for(let i = 0;i < n-1;i++){
//         rows.push(1);
//     }
//     data.push(rows);
//     for(let i = 0;i < m-1;i++){
//         data.push([1]);
//     }
//     for(let i = 1;i < m;i++){
//         for(let j = 1;j < n;j++){
//             data[i][j] = data[i-1][j] + data[i][j-1];
//         }
//     }
//     return data[m-1][n-1];
// };
// console.log(uniquePaths(3,3))

// var maxProfit = function(prices) {
//     let dp_i_0 = 0,dp_i_1 = -Infinity;
//     for(let i = 0;i < prices.length;i++){
//         dp_i_0 = Math.max(dp_i_0,dp_i_1+prices[i]);
//         dp_i_1 = Math.max(dp_i_1,-prices[i]);
//     }
//     return dp_i_0;
// };
// console.log(maxProfit(10))

// var cuttingRope = function(number) {
//     if(number === 2 || number === 3) return number - 1;
//     let a = number % 3;
//     let b = parseInt(number / 3);
//     if(a === 0){
//         return 3 ** b;
//     }else if(a === 1){
//         return 2 * 2 * (3 ** (b - 1));
//     }else{
//         return 2 * (3 ** b);
//     }
// };
// console.log(cuttingRope(9))

// function minNumberInRotateArray(rotateArray) {
//     if (!rotateArray.length) return 0;
//     let left = 0, right = rotateArray.length - 1;
//     while (left < right) {
//         let mid = Math.floor((right + left) >> 1);
//         if (rotateArray[left] <= rotateArray[right]) {
//             return rotateArray[left];
//         }
//         if (rotateArray[left] < rotateArray[mid]) {
//             left = mid + 1;
//         } else if (rotateArray[right] > rotateArray[mid]) {
//             right = mid;
//         } else {
//             left++;
//         }
//     }
//     return rotateArray[left]
// }
// console.log(minNumberInRotateArray([2,5,7,1,6,8],'///'))

// function GetNumberOfK(data, k)
// {
//     let low = 0,high = data.length-1;
//     let pos,count = 0;
//     while(low < high){
//         let mid = Math.floor((low+high)>>1);
//         if(data[mid] === k){
//             pos = mid;
//             break;
//         }else if(data[mid] < k){
//             low = mid + 1;
//         }else{
//             high = mid-1;
//         }
//     }
//     if(pos !== undefined){
//         count++;
//         let left = pos,right = pos;
//         while(left--){
//             if(data[left] === k){
//                 count++;
//             }else{
//                 break;
//             }
//         }
//         while(right++){
//             if(data[right] === k){
//                 count++;
//             }else{
//                 break;
//             }
//         }
//         return count;
//     }else return 0;
// }

// console.log(GetNumberOfK([1,2,3,4,5,6,2,3,6,5,1,4]))
// var missingNumber = function(nums) {
//     let left = 0,
//         right = nums.length - 1;
//     while (left <= right) {
//         let mid = Math.floor((left + right) / 2);
//         if (mid === nums[mid]) {
//             left = mid + 1;
//         } else if (mid < nums[mid]) {
//             right = mid - 1;
//         }
//     }
//     return left;
// };
// console.log(missingNumber([1,2,3,4,5,7,8,9]))

// let names = ["iPhone X", "iPhone XS"]
// let colors = ["黑色", "白色"]
// let storages = ["64g", "256g"]
// let combine = function (...chunks) {
//     let res = []
//     let helper = function (chunkIndex, prev) {
//         let chunk = chunks[chunkIndex]
//         let isLast = chunkIndex === chunks.length - 1
//         for (let val of chunk) {
//             let cur = prev.concat(val)
//             if (isLast) {
//                 // 如果已经处理到数组的最后一项了 则把拼接的结果放入返回值中
//                 res.push(cur)
//             } else {
//                 helper(chunkIndex + 1, cur)
//             }
//         }
//     }

//     // 从属性数组下标为 0 开始处理
//     // 并且此时的 prev 是个空数组
//     helper(0, [])

//     return res
// }

// console.log(combine(names, colors, storages,a))

// var numOne = 12.00;
// var numTwo = 12.50;
// var numThree = 12.35;
// strOne = parseFloat(numOne + '');
// strTwo = parseFloat(numTwo + '');
// strThree = parseFloat(numThree + '');
// console.log(strOne + '/' + strTwo + '/' + strThree)

// var twoSum = function(nums, target) {
//     const diffMap = {}
//     for (const index in nums) {
//         // 每次迭代检查差值表中是否有对应项目, 如果有直接返回其 index 和当前 index
//         if (diffMap[nums[index]] !== undefined) return [index, diffMap[nums[index]]]
//         // 否则计算当前项和目标值的差值, 加入差值表中
//         diffMap[target - nums[index]] = index
//     }
// };
// console.log(twoSum([1,2,3,4,5],10))

// let data = [
//     {
//         a: '123',
//         b: "456",
//     },
//     {
//         a: '123',
//         b: '789'
//     },
//     {
//         a: 'aaa',
//         b: 'bbb'
//     },
//     {
//         a: 'aaa',
//         b: 'ccc'
//     },
//     {
//         a: 'ert',
//         b: '999'
//     }
// ]

// data.map((v, i) => {
//     if (i + 1 < data.length) {
//         data[i + 1].a = v.a === data[i + 1].a ? '' : data[i + 1].a
//     }
// })
// console.log(data);


// let a = '1234a1234b';

// let b = (s) => {
//     let map = {};
//     let left = 0;
//     let right = 0;
//     let count = 0;
//     while (right < s.length) {
//         const char = s[right]
//         console.log(char)
//         if (char in map) {
//             left = Math.max(left, map[char] + 1)
//         }
//         count = Math.max(count, right - left + 1)
//         map[char] = right++
//     }
//     console.log(map)
//     return count
// }

// console.log(b(a))


// let arr = [
//     [2],
//     [3, 4],
//     [6, 5, 7],
//     [4, 1, 8, 3]
// ]

// function minimumTotal(triangle) {
//     let h = triangle.length
//     let arrs = new Array(h)

//     for (let k = 0; k < h; k++) {
//         arrs[k] = new Array(triangle[k].length)
//     }

//     for (let i = h - 1; i >= 0; i--) {
//         for (let j = 0; j < triangle[i].length; j++) {
//             if (i == h - 1) {
//                 arrs[i][j] = triangle[i][j];
//             } else {
//                 arrs[i][j] = Math.min(arrs[i + 1][j], arrs[i + 1][j + 1]) + triangle[i][j];
//             }
//         }
//     }
//     return arrs[0][0]

// }

// console.log(minimumTotal(arr))

// const list = ['h3', 'h2', 'h3', 'h1', 'h2', 'h3', 'h3', 'h2', 'h3', 'h1', 'h2', 'h4', 'h2', 'h3'];
// const new_list = list.map(item => {
//     return parseInt(item.replace('h', ''));
// });
// const activeArray = [];
// const structureObj = i => ({
//     name: 'h' + new_list[i],
//     child: [],
// });
// let count = 0; // 用来判断child嵌套了多少次 题目默认最大是2次 超过2次后就不重新赋值新对象了

// activeArray.push(structureObj(0));
// console.log(activeArray,'activeArray')
// let activeObj = {};

// new_list.reduce((a, b, id) => {
//     if (a > b) {
//         // 后一个比前一个小的话重新创建一个新对象
//         activeObj = structureObj(id);
//         if (activeArray[activeArray.length - 1].name >= activeObj.name) {
//             // 创建一个外层对象的时候清除count
//             count = 0;
//             activeArray.push(activeObj);
//         } else {
//             activeArray[activeArray.length - 1].child.push(activeObj);
//         }
//     } else {
//         const obj = structureObj(id);
//         activeObj.child.push(obj);
//         count++;
//         if (count < 2) {
//             activeObj = obj;
//         }
//     }
//     return b;
// });
// console.log(JSON.stringify(activeArray));

// var data = [];

// for (var i = 0; i < 9; i++) {
//   data[i] = function () {
//     console.log(i);
//   };
// }

// data[0]();
// data[1]();
// data[2]();
// data[4]();
// data[5]();
// data[6]();

// var data = [];

// for (var i = 0; i < 3; i++) {
//   data[i] = (function (i) {
//         return function(){
//             console.log(i);
//         }
//   })(i);
// }

// data[0]();
// data[1]();
// data[2]();


// var value = 1;

// var foo = {
//   value: 2,
//   bar: function () {
//     return this.value;
//   }
// }

// //示例1
// console.log(foo.bar());
// //示例2
// console.log((foo.bar)());
// //示例3
// console.log((foo.bar = foo.bar)());
// //示例4
// console.log((false || foo.bar)());
// //示例5
// console.log((foo.bar, foo.bar)());

// const fn = (len, from = 0, to = 100) => {
//     const allNums = Array.from({ length: to - from }, (_, i) => i + from)
//     const result = []

//     for (let i = len; i-- > 0;) {
//         result.push(allNums.splice(Math.floor(Math.random() * allNums.length), 1)[0])
//     }

//     return result;
// }

// console.log('[ fn(10) ] >', fn(10,2,12))
// console.log( fn(5))

// const fn=num=>{
//     let arr=[]
//     while(arr.length<num){
//         arr.push(Math.round(Math.random()*30+2))
//         arr=[...new Set(arr)]
//     }
//     return arr
// }
// console.log('[ fn(10) ] >', fn(10))

// var mergeTwoLists = function (l1, l2) {
//     if (!l1) return l2;
//     if (!l2) return l1;
//     console.log('[ l1.val  ] >', l1.val )
//     console.log('[ l1.val  ] >', l2.val )
//     let resList;
//     if (l1.val > l2.val) {
//         resList = l2;
//         l2.next = mergeTwoLists(l1, l2.next);
//     } else {
//         resList = l1;
//         l1.next = mergeTwoLists(l1.next, l2);
//     }
//     return resList;

// };
// console.log('[ mergeTwoLists ] >', mergeTwoLists([1,2,4], [1,3,4]))

// var reverseList = function(head) {
//     /* 
//             类比思考 反转数组思路 双端指针实现
//             while (l < r) swap(a, l++, r--)
//             数组位置的交换是这样 [a[i], a[j]] = [a[j], a[i]]
//             但是 单链表只能依次通过 next 访问 不能通过索引访问 
//             链表的交换需要扩展一个指针 即next
//             cur 当前项
//             prev 上一项
//             cur.next 当前指针指向
//             [ cur.next, prev, cur ] = [prev, cur, cur.next]
//             上面这段ES6语法表示
//             当前cur 的指针next 指向prev上一项 并且 交换迭代prev 和 next
//         */
//         let [p, c] = [null, head]
//         console.log('[ c ]', c)
//         console.log('[ p ]', p)

//         while (c) [c.next, p, c] = [p, c, c.next]

//         console.log('[ ppppp ] >', p)

//         return p

//     };

//     console.log('[ [1,2,3,4,5] ] >', reverseList([1,2,3,4,5]))


// let data1 = [
//     { a: 2020, b: null, c: null, d: 'aaa' },
//     { a: 2021, b: null, c: null, d: 'bbb' },
//     { a: 2022, b: null, c: null, d: 'ccc' }
// ]

// let data2 = [
//     { a: 2020, b: 123, c: 456, d: 'aaa' },
//     { a: 2021, b: 789, c: 101, d: 'bbb' },
// ]

// [
//     { a: 2020, b: 123, c: 456, d: 'aaa' },
//     { a: 2021, b: 789, c: 101, d: 'bbb' },
//     { a: 2022, b: null, c: null, d: 'ccc' }
// ]

// const object = {
//     message:'hello world',

//     logMessage() {
//       console.log(this.message);
//     }
//   };
//   setTimeout(object.logMessage,1000);

// const object = {
//     message:'hello,world',
//     getMessage() {
//       const message = 'hello,earth';
//       return this.message;
//     }
//   };
//   console.log(object.getMessage());

// function Person(name) {
//     this.name = name;
//     this.getName = () => this.name;
//   }
//   const cat = new Person('jing');
//   console.log(cat.getName());
//   const { getName } = cat;
//   console.log(getName());

// const object = {
//     who: 'World',

//     greet() {
//       return `Hello, ${this.who}!`;
//     },

//     farewell: () => {
//       return `Goodbye, ${this.who}!`;
//     }
//   };
//   console.log(object.greet());   
//   console.log(object.farewell());

// var length = 4;
// function callback() {
//   console.log(this.length);
// }
// const object = {
//   length:5,
//   method(callback) {
//     callback();
//   }
// };
// object.method(callback,1,2);

// var myObject = {
//     foo:"bar",
//     func:function() {
//       var self = this;
//       console.log(this.foo);
//       console.log(self.foo);
//       (function() {
//         console.log(this.foo);
//         console.log(self.foo);
//       }());
//     }
//   }
//   myObject.func();


// const arr2 = [1, 2, 3, 4, [1, 2, 3, [1, 2, 3, [1, 2, 3]]]]
// console.log('[  ] >',arr2.toString().split(',').map(v => parseInt(v)) )

// const arr = [
//     { id: 1, pid: 0, name: '总公司' },
//     { id: 2, pid: 1, name: '北京总公司' },
//     { id: 3, pid: 1, name: '上海总公司' },
//     { id: 4, pid: 1, name: '深正总公司' },
//     { id: 5, pid: 1, name: '广州总公司' },
//     { id: 6, pid: 2, name: '昌平办事处' },
//     { id: 7, pid: 2, name: '海淀办事处' },
// ]

// function format (list, value) {
//     const arr = []
//     list.forEach((item)=>{
//         if(item.pid===value){
//             arr.push(item)
//             const children=format(list,item.id)
//             children.length&&(item.children=children)
//         }
//     })

//     return arr
// }

// console.log(format(arr, 0))


//数组转树
// const arr = [
//   { "id": 12, "parent_id": 1, "name": "朝阳区" },
//   { "id": 241, "parent_id": 24, "name": "田林街道" },
//   { "id": 31, "parent_id": 3, "name": "广州市" },
//   { "id": 13, "parent_id": 1, "name": "昌平区" },
//   { "id": 2421, "parent_id": 242, "name": "上海科技绿洲" },
//   { "id": 21, "parent_id": 2, "name": "静安区" },
//   { "id": 242, "parent_id": 24, "name": "漕河泾街道" },
//   { "id": 22, "parent_id": 2, "name": "黄浦区" },
//   { "id": 11, "parent_id": 1, "name": "顺义区" },
//   { "id": 2, "parent_id": 0, "name": "上海市" },
//   { "id": 24, "parent_id": 2, "name": "徐汇区" },
//   { "id": 1, "parent_id": 0, "name": "北京市" },
//   { "id": 2422, "parent_id": 242, "name": "漕河泾开发区" },
//   { "id": 32, "parent_id": 3, "name": "深圳市" },
//   { "id": 33, "parent_id": 3, "name": "东莞市" },
//   { "id": 3, "parent_id": 0, "name": "广东省" }
// ]

// function arrayToTreeV3 (list, root) {
//   return list
//     .filter(item => item.parent_id === root)
//     .map(item => ({ ...item, children: arrayToTreeV3(list, item.id) }))
// }

// console.log('arrayToTreeV3(arr,1): ', arrayToTreeV3(arr, 0));