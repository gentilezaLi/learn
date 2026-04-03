/**
 * LeetCode 热题 100
 * 题目来源：https://leetcode.cn/studyplan/top-100-liked/
 * 以下代码每行均配有注释，便于理解。
 * 
 * 示例 1：

输入：intervals = [[1,3],[2,6],[8,10],[15,18]]
输出：[[1,6],[8,10],[15,18]]
解释：区间 [1,3] 和 [2,6] 重叠, 将它们合并为 [1,6].
示例 2：

输入：intervals = [[1,4],[4,5]]
输出：[[1,5]]
解释：区间 [1,4] 和 [4,5] 可被视为重叠区间。
示例 3：

输入：intervals = [[4,7],[1,4]]
输出：[[1,7]]
解释：区间 [1,4] 和 [4,7] 可被视为重叠区间。
 
 */

// 题意：合并所有重叠区间
// 思路：按左端点排序，依次合并
/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function (intervals) {
  // 前提：题目通常保证 intervals.length >= 1；这里默认输入非空
  // 先按「区间左端点」升序排序，保证扫描时新区间只可能与“最后合并区间”发生重叠
  intervals.sort((a, b) => a[0] - b[0]);
  // ans 存放已经合并好的区间；不变量：ans 始终按左端点有序且互不重叠
  const ans = [intervals[0]];
  console.log("ans", ans, ans.length);
  for (let i = 1; i < intervals.length; i++) {
    // last 是当前已合并结果中的最后一个区间（与新区间最可能发生重叠）
    const last = ans[ans.length - 1];
    // 若新区间的起点 <= last 的终点，则视为重叠（端点相接也算重叠，如 [1,4] 与 [4,5]）
    if (intervals[i][0] <= last[1])
      // 合并后的终点取二者终点的最大值（覆盖更大的右边界）
      last[1] = Math.max(last[1], intervals[i][1]);
    // 否则与 last 不重叠，直接作为一个新区间加入结果
    else ans.push(intervals[i]);
  }
  return ans;
};

let intervals = [
  [1, 3],
  [2, 6],
  [8, 10],
  [15, 18],
];
console.log(merge(intervals));
