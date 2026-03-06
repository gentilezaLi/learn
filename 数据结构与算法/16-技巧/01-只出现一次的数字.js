/**
 * LeetCode 热题 100
 * 题目来源：https://leetcode.cn/studyplan/top-100-liked/
 * 以下代码每行均配有注释，便于理解。
 */

// 题意：非空数组除一个数出现一次外其余都出现两次，找那个数
// 思路：异或性质 a^a=0，全部异或即得单次出现的数
/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function (nums) {
  let res = 0;
  for (const x of nums) res ^= x;
  return res;
};
