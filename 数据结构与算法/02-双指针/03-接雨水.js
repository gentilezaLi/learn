/** LeetCode 热题 100，这道题是「接雨水」 */
/** 题目来源：https://leetcode.cn/studyplan/top-100-liked/ */
/** 以下代码每一行都配有中文注释，帮助你理解双指针解法 */

/** 示例 1：输入高度数组 height = [0,1,0,2,1,0,1,3,2,1,2,1] */
/** 示例 1：输出 6，表示可以接到 6 个单位的雨水 */
/** 高度数组可以看成柱状图，每个数字是对应位置的柱子高度 */
/** 蓝色部分代表柱子之间能存下来的雨水体积 */

/** 示例 2：输入 height = [4,2,0,3,2,5] */
/** 示例 2：输出 9，同样是统计所有位置上能接到的水的总量 */

/** 题意：给定每个位置柱子的高度，下雨后统计柱子之间能接多少水 */
/** 核心思路：双指针 + 局部最高：当前位置能接多少水取决于左边最高和右边最高中较小的那个 */

/** 函数签名：接收一个表示柱子高度的数组 height，返回可以接到的总水量 */
/**
 * @param {number[]} height  // height 是一个数组，每个元素表示对应位置的柱子高度
 * @return {number}          // 返回一个数字，表示所有位置上能接到的雨水总量
 */
var trap = function (height) {
  // 定义函数 trap，接收高度数组 height
  let left = 0; // left 指针从左往右移动，初始指向索引 0
  let right = height.length - 1; // right 指针从右往左移动，初始指向最后一个索引
  let maxL = 0; // maxL 记录从左侧扫描到当前位置为止的最高柱子高度
  let maxR = 0; // maxR 记录从右侧扫描到当前位置为止的最高柱子高度
  let water = 0; // water 用来累加每个位置上能接到的水量

  while (left < right) {
    // 当左右指针没有相遇时，一直循环计算
    if (height[left] <= height[right]) {
      // 如果左侧柱子高度 <= 右侧柱子高度，则由左侧决定当前水位
      maxL = Math.max(maxL, height[left]); // 更新左侧最高高度：在 maxL 和当前 height[left] 中取较大值
      water += maxL - height[left]; // 当前 left 位置能接到的水 = 左侧最高高度 - 当前柱子高度（负数等价于 0）
      left++; // 左指针右移一格，考察下一个位置
    } else {
      // 否则右侧柱子更矮或相等，由右侧来决定当前水位
      maxR = Math.max(maxR, height[right]); // 更新右侧最高高度：在 maxR 和当前 height[right] 中取较大值
      water += maxR - height[right]; // 当前 right 位置能接到的水 = 右侧最高高度 - 当前柱子高度
      right--; // 右指针左移一格，考察下一个位置
    } // if-else 结束，完成当前一轮左右指针所指位置的计算
  } // while 循环结束，说明左右指针已经相遇，所有位置都计算过

  return water; // 返回最终累加得到的水量总和
}; // 函数定义结束
