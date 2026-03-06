/**
 * LeetCode 热题 100
 * 题目来源：https://leetcode.cn/studyplan/top-100-liked/
 * 以下代码每行均配有注释，便于理解。
 * 
 * 示例 1：

输入：nums = [100,4,200,1,3,2]
输出：4
解释：最长数字连续序列是 [1, 2, 3, 4]。它的长度为 4。
示例 2：

输入：nums = [0,3,7,2,5,8,4,6,0,1]
输出：9
示例 3：

输入：nums = [1,0,1,2]
输出：3


* 思路：
 * 1. 用 Set 去重，达到 O(1) 查询。
 * 2. 只有当一个数 x 的前驱 x-1 不在 Set 中时，x 才可能是某段连续区间的“起点”。
 * 3. 从起点开始逐一枚举 x, x+1, x+2… 直到断裂，记录本次长度。
 * 4. 全局保留最大长度。


 */

// 题意：未排序数组，求数值连续的最长序列长度（可乱序）
// 思路：用 Set 存所有数，只从“序列起点”开始枚举长度（即 x-1 不在 set 时）
/**
 * @param {number[]} nums
 * @return {number}
 */
var longestConsecutive = function (nums) {
  // 1. 去重：防止重复数字干扰长度统计
  const set = new Set(nums);
  let maxLen = 0; // 全局最长长度
  // 2. 遍历每一个“可能起点”
  for (const x of set) {
    // 2.1 如果 x-1 存在，说明 x 不是起点，跳过，保证每个区间只被处理一次
    if (set.has(x - 1)) continue;
    // 2.2 从起点 x 开始向后枚举
    let len = 0; // 当前连续区间长度
    let cur = x; // 当前正在考察的数字
    while (set.has(cur)) {
      len++; // 长度 +1
      cur++; // 考察下一个数字
      console.log(len, cur);
    }
    // 2.3 更新全局最大长度
    maxLen = Math.max(maxLen, len);
  }
  // console.log(maxLen);
  return maxLen;
};

// longestConsecutive([100, 4, 200, 1, 3, 2, 5]);

var longestConsecutiveNew = function (nums) {
  const set = new Set(nums);
  let maxLen = 0;
  for (const x of set) {
    // if (set.has(x - 1)) continue;
    let len = 0;
    let cur = x;
    while (set.has(cur)) {
      len++;
      cur++;
    }
    maxLen = Math.max(maxLen, len);
  }
  console.log(maxLen);
  return maxLen;
};
console.log(longestConsecutiveNew([100, 4, 200, 1, 3, 2, 5]));
