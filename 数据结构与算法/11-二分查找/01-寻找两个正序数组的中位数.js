/**
 * LeetCode 热题 100
 * 题目来源：https://leetcode.cn/studyplan/top-100-liked/
 * 以下代码每行均配有注释，便于理解。
 */

// 题意：两个有序数组合并后的中位数，要求 O(log(m+n))
// 思路：二分查找“第 k 小”，每次排除 k/2 个元素
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function (nums1, nums2) {
  const m = nums1.length;
  const n = nums2.length;
  const k1 = (m + n + 1) >> 1; // 中位数位置（奇数时唯一，偶数时第一个）
  const k2 = (m + n + 2) >> 1; // 偶数时第二个中位数位置
  const getKth = (i, j, k) => {
    // 从 nums1[i..]、nums2[j..] 中找第 k 小（k 从 1 计）
    if (i >= m) return nums2[j + k - 1]; // nums1 用完，直接取 nums2
    if (j >= n) return nums1[i + k - 1]; // nums2 用完
    if (k === 1) return Math.min(nums1[i], nums2[j]); // 取较小者
    const half = k >> 1; // 每边取 k/2 个
    const a = i + half - 1 < m ? nums1[i + half - 1] : Infinity; // nums1 第 half 个
    const b = j + half - 1 < n ? nums2[j + half - 1] : Infinity;
    if (a <= b) return getKth(i + half, j, k - half); // 排除 nums1 前 half 个
    return getKth(i, j + half, k - half); // 否则排除 nums2 前 half 个
  };
  return (getKth(0, 0, k1) + getKth(0, 0, k2)) / 2; // 两个中位数取平均
};
