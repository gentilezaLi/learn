/**
 * LeetCode 热题 100
 * 题目来源：https://leetcode.cn/studyplan/top-100-liked/
 * 以下代码每行均配有注释，便于理解。
 */

// 题意：people[i]=[h,k] 表示身高 h 且前面有 k 个身高>=h 的人，还原队列
// 思路：按 h 降序、k 升序排，再按 k 插入到结果数组的 k 位置
/**
 * @param {number[][]} people
 * @return {number[][]}
 */
var reconstructQueue = function (people) {
  people.sort((a, b) => (a[0] !== b[0] ? b[0] - a[0] : a[1] - b[1]));
  const ans = [];
  for (const p of people) ans.splice(p[1], 0, p);
  return ans;
};
