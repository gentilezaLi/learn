function deepCloneWithSpread(obj) {
  if (Array.isArray(obj)) return obj.map((item) => deepCloneWithSpread(item));
  if (typeof obj === "object" && obj !== null) {
    return Object.entries(obj).reduce((clone, [key, value]) => {
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
