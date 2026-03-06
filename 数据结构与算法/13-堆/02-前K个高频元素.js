/**
 * LeetCode 热题 100
 * 题目来源：https://leetcode.cn/studyplan/top-100-liked/
 * 以下代码每行均配有注释，便于理解。
 */

// 题意：返回出现频率前 k 高的元素
// 思路：哈希统计频率，再用小顶堆维护 k 个最大，或桶排序
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var topKFrequent = function (nums, k) {
  const map = new Map();
  for (const x of nums) map.set(x, (map.get(x) || 0) + 1);
  const arr = [...map.entries()].sort((a, b) => b[1] - a[1]); // 按频次降序
  return arr.slice(0, k).map(([num]) => num);
};
