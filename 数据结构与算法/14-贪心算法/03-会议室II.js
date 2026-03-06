/**
 * LeetCode 热题 100
 * 题目来源：https://leetcode.cn/studyplan/top-100-liked/
 * 以下代码每行均配有注释，便于理解。
 */

// 题意：若干会议时间区间，求最少需要多少会议室（同一时间重叠区间数）
// 思路：将开始、结束时间拆成事件排序，遇开始+1 遇结束-1，取最大值
/**
 * @param {number[][]} intervals
 * @return {number}
 */
var minMeetingRooms = function (intervals) {
  const events = [];
  for (const [s, e] of intervals) {
    events.push([s, 1]);
    events.push([e, -1]);
  }
  events.sort((a, b) => (a[0] !== b[0] ? a[0] - b[0] : a[1] - b[1])); // 结束先于开始
  let cur = 0;
  let max = 0;
  for (const [, d] of events) {
    cur += d;
    max = Math.max(max, cur);
  }
  return max;
};
