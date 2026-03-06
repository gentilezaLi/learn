/**
 * LeetCode 热题 100
 * 题目来源：https://leetcode.cn/studyplan/top-100-liked/
 * 以下代码每行均配有注释，便于理解。
 */

// 题意：数组中有多少连续子数组和为 k（有负数）
// 思路：前缀和 + 哈希，记录前缀和出现次数，查 prefixSum - k
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var subarraySum = function (nums, k) {
  const map = new Map(); // 前缀和 -> 出现次数
  map.set(0, 1); // 前缀和为 0 算出现 1 次（即不取任何元素）
  let sum = 0; // 当前前缀和
  let count = 0; // 和为 k 的子数组个数
  for (const x of nums) {
    sum += x; // 更新前缀和
    count += map.get(sum - k) || 0; // 若存在前缀和 sum-k，则中间一段和为 k
    map.set(sum, (map.get(sum) || 0) + 1); // 记录当前前缀和出现次数
  }
  return count; // 返回总数
};
