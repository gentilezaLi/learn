/**
 * LeetCode 热题 100
 * 题目来源：https://leetcode.cn/studyplan/top-100-liked/
 * 以下代码每行均配有注释，便于理解。
 * 
 * 输入：[1,8,6,2,5,4,8,3,7]
输出：49 

 */

// 题意：若干竖线，选两条与 x 轴围成容器，求最大容积
// 思路：双指针从两端向中间，每次移动较短的那边
/**
 * @param {number[]} height
 * @return {number}
 */
// var maxArea = function (height) {
//   let left = 0;
//   let right = height.length - 1;
//   let maxA = 0;
//   while (left < right) {
//     const w = right - left; // 底边宽度
//     const h = Math.min(height[left], height[right]); // 高度取较短边
//     maxA = Math.max(maxA, w * h); // 更新最大面积
//     if (height[left] <= height[right]) left++;
//     else right--; // 移动较短的一侧，才有机会得到更大面积
//   }
//   return maxA;
// };

var maxArea = function (height) {
  let left = 0;                    // 左指针，初始在最左端
  let right = height.length - 1;   // 右指针，初始在最右端
  let maxA = 0;                    // 记录当前最大面积

  // 双指针相向移动，直到相遇
  while (left < right) {
    const w = right - left;                              // 底边宽度
    const h = Math.min(height[left], height[right]);     // 高度受限于较短的一边
    maxA = Math.max(maxA, w * h);                        // 更新最大面积

    // 移动较短的一侧：只有换掉短板，才有可能让高度变大，从而面积变大
    if (height[left] <= height[right]) {
      left++;
    } else {
      right--;
    }
  }

  return maxA;
};

