/**
 * LeetCode 热题 100
 * 题目来源：https://leetcode.cn/studyplan/top-100-liked/
 * 以下代码每行均配有注释，便于理解。
 */

// 题意：合并所有重叠区间
// 思路：按左端点排序，依次合并
/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function (intervals) {
  intervals.sort((a, b) => a[0] - b[0]);
  const ans = [intervals[0]];
  for (let i = 1; i < intervals.length; i++) {
    const last = ans[ans.length - 1];
    if (intervals[i][0] <= last[1]) last[1] = Math.max(last[1], intervals[i][1]); // 重叠则合并
    else ans.push(intervals[i]);
  }
  return ans;
};
