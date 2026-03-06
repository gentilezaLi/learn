/**
 * LeetCode 热题 100
 * 题目来源：https://leetcode.cn/studyplan/top-100-liked/
 * 以下代码每行均配有注释，便于理解。
 */

// 题意：数组元素在 [1,n]，找出 [1,n] 中未出现在数组里的数
// 思路：将 nums[i] 对应下标位置取负做标记，未被打到的下标+1 即缺失数
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var findDisappearedNumbers = function (nums) {
  const n = nums.length;
  for (let i = 0; i < n; i++) {
    const idx = Math.abs(nums[i]) - 1;
    if (nums[idx] > 0) nums[idx] = -nums[idx];
  }
  const ans = [];
  for (let i = 0; i < n; i++) if (nums[i] > 0) ans.push(i + 1);
  return ans;
};
