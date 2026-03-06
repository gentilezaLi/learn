/**
 * LeetCode 热题 100
 * 题目来源：https://leetcode.cn/studyplan/top-100-liked/
 * 以下代码每行均配有注释，便于理解。
 */

// 题意：数组和窗口大小 k，求每个窗口内的最大值
// 思路：单调递减双端队列，队头为当前窗口最大值
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var maxSlidingWindow = function (nums, k) {
  const q = []; // 存下标，对应值单调减
  const ans = [];
  for (let i = 0; i < nums.length; i++) {
    while (q.length && nums[q[q.length - 1]] <= nums[i]) q.pop();
    q.push(i);
    if (q[0] <= i - k) q.shift(); // 队头滑出窗口
    if (i >= k - 1) ans.push(nums[q[0]]);
  }
  return ans;
};
