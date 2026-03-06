/**
 * LeetCode 热题 100
 * 题目来源：https://leetcode.cn/studyplan/top-100-liked/
 * 以下代码每行均配有注释，便于理解。
 */

// 题意：在数组中找出和为目标值 target 的两个整数的下标
// 思路：哈希表存「值 -> 下标」，遍历时查 target - nums[i]
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
  const map = new Map(); // 哈希表：已遍历过的 值 -> 下标
  for (let i = 0; i < nums.length; i++) {
    // 当前数字
    const need = target - nums[i]; // 需要的另一个加数
    if (map.has(need)) return [map.get(need), i]; // 找到则返回两下标
    map.set(nums[i], i); // 否则将当前值及其下标存入 map
  }
  return []; // 题目保证有解，不会走到这里
};
