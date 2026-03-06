/**
 * LeetCode 热题 100
 * 题目来源：https://leetcode.cn/studyplan/top-100-liked/
 * 以下代码每行均配有注释，便于理解。
 */

// 题意：get/put，容量满时淘汰最久未使用的
// 思路：Map 保持插入顺序（或 双向链表 + 哈希表）
/**
 * @param {number} capacity
 */
var LRUCache = function (capacity) {
  this.cap = capacity;
  this.cache = new Map(); // 键 -> 值，Map 按插入顺序
};

LRUCache.prototype.get = function (key) {
  if (!this.cache.has(key)) return -1;
  const v = this.cache.get(key);
  this.cache.delete(key);
  this.cache.set(key, v); // 提到“最近使用”
  return v;
};

LRUCache.prototype.put = function (key, value) {
  if (this.cache.has(key)) this.cache.delete(key);
  this.cache.set(key, value);
  if (this.cache.size > this.cap) this.cache.delete(this.cache.keys().next().value); // 删最久未用
};
