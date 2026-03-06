/**
 * LeetCode 热题 100
 * 题目来源：https://leetcode.cn/studyplan/top-100-liked/
 * 以下代码每行均配有注释，便于理解。
 */

// 题意：未排序数组找第 k 大的数（不是第 k 个 distinct）
// 思路：快排划分 / 堆。这里用快速选择（划分后看 k 在左还是右）
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest = function (nums, k) {
  const swap = (i, j) => ([nums[i], nums[j]] = [nums[j], nums[i]]);
  const partition = (l, r) => {
    const pivot = nums[r];
    let i = l;
    for (let j = l; j < r; j++) {
      if (nums[j] >= pivot) swap(i++, j);
    }
    swap(i, r);
    return i;
  };
  let left = 0;
  let right = nums.length - 1;
  const target = k - 1; // 第 k 大即排序后下标 k-1
  while (true) {
    const p = partition(left, right);
    if (p === target) return nums[p];
    if (p < target) left = p + 1;
    else right = p - 1;
  }
};
