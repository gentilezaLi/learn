/**
 * LeetCode 热题 100
 * 题目来源：https://leetcode.cn/studyplan/top-100-liked/
 * 以下代码每行均配有注释，便于理解。
 */

// 题意：找出所有和为 0 的三元组，且不重复
// 思路：排序 + 固定一个数，双指针找两数之和
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
  nums.sort((a, b) => a - b); // 排序便于去重和双指针
  const ans = [];
  for (let i = 0; i < nums.length - 2; i++) {
    if (nums[i] > 0) break; // 最小数已大于 0，后面不可能和为 0
    if (i > 0 && nums[i] === nums[i - 1]) continue; // 去重
    let l = i + 1;
    let r = nums.length - 1;
    while (l < r) {
      const sum = nums[i] + nums[l] + nums[r];
      if (sum === 0) {
        ans.push([nums[i], nums[l], nums[r]]);
        while (l < r && nums[l] === nums[l + 1]) l++; // 去重
        while (l < r && nums[r] === nums[r - 1]) r--;
        l++;
        r--;
      } else if (sum < 0) l++;
      else r--;
    }
  }
  return ans;
};
