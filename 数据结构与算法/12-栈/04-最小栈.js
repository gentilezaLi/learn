/**
 * LeetCode 热题 100
 * 题目来源：https://leetcode.cn/studyplan/top-100-liked/
 * 以下代码每行均配有注释，便于理解。
 */

// 题意：栈支持 push、pop、top、getMin，均 O(1)
// 思路：数据栈 + 同步的“当前最小值”栈
var MinStack = function () {
  this.stack = [];
  this.minStack = []; // 与 stack 同步，存当前栈内最小值
};

MinStack.prototype.push = function (val) {
  this.stack.push(val);
  const min = this.minStack.length ? Math.min(this.minStack[this.minStack.length - 1], val) : val;
  this.minStack.push(min);
};

MinStack.prototype.pop = function () {
  this.stack.pop();
  this.minStack.pop();
};

MinStack.prototype.top = function () {
  return this.stack[this.stack.length - 1];
};

MinStack.prototype.getMin = function () {
  return this.minStack[this.minStack.length - 1];
};
