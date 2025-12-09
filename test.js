function deepCloneWithSpread(obj) {
  // 如果是数组，递归拷贝每一项
  if (Array.isArray(obj)) return obj.map((item) => deepCloneWithSpread(item));
  // 如果是对象（且不为 null），使用 Object.entries + reduce 递归拷贝每个属性
  // 注意：函数类型、原始值（number/string/boolean/undefined/null）会原样返回
  if (typeof obj === "object" && obj !== null) {
    return Object.entries(obj).reduce((clone, [key, value]) => {
      // 这里可以加日志用于调试：当前处理的键、值以及已构建的克隆对象
      console.log(key, value, clone);
      clone[key] = deepCloneWithSpread(value);
      return clone;
    }, {});
  }
  return obj;
}

// const obj = {
//   a: 1,
//   b: 2,
//   c: () => {
//     return 3;
//   },
// };

// const clonedObj = deepCloneWithSpread(obj);
// console.log(clonedObj, "---");

// function cloneDeep(obj) {
//   if (Array.isArray(obj)) return obj.map((x) => deepCloneWithSpread(x));
//   if (typeof obj === "object" && obj !== null) {
//     return Object.entries(obj).reduce((clone, [key, value]) => {
//       console.log(clone);
//       clone[key] = cloneDeep(value);
//       return clone;
//     }, {});
//   }
//   return obj;
// }

// const obj = {
//   a: 1,
//   b: 2,
//   c: () => {
//     return 3;
//   },
// };

// const clonedObj = cloneDeep(obj);
// console.log(clonedObj, "---");

function* fn() {
  // 生成器示例：每次调用 `next()` 依次返回下一个 yield 的值
  yield "a";
  yield "b";
  yield "c";
}
const a = fn();
console.log(a.next());
console.log(a.next());
console.log(a.next());
console.log(a.next());
console.log(a.next());
console.log(a.next());
console.log(a.next());
