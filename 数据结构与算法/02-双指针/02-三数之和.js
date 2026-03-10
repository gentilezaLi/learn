/**
 * LeetCode 热题 100
 * 题目来源：https://leetcode.cn/studyplan/top-100-liked/
 * 以下代码每行均配有注释，便于理解。
 * 
 * 示例 1：

输入：nums = [-1,0,1,2,-1,-4]
输出：[[-1,-1,2],[-1,0,1]]
解释：
nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0 。
nums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0 。
nums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0 。
不同的三元组是 [-1,0,1] 和 [-1,-1,2] 。
注意，输出的顺序和三元组的顺序并不重要。
示例 2：

输入：nums = [0,1,1]
输出：[]
解释：唯一可能的三元组和不为 0 。
示例 3：

输入：nums = [0,0,0]
输出：[[0,0,0]]
解释：唯一可能的三元组和为 0 。

 */

// 题意：找出所有和为 0 的三元组，且不重复
// 思路：排序 + 固定一个数，剩余部分用双指针在有序数组中找「两数之和 = -nums[i]」
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
  // 1. 升序排序：方便使用双指针，并且相等元素会挨在一起，便于后面「跳过重复」
  nums.sort((a, b) => a - b);

  const ans = [];

  // 2. 外层循环枚举三元组中的第一个数 nums[i]
  //    至少需要 3 个数构成三元组，所以 i 最大到 nums.length - 3
  for (let i = 0; i < nums.length - 2; i++) {
    // 剪枝：数组已排序，如果当前 nums[i] 已经 > 0，
    // 后面的数都 >= nums[i] > 0，三数之和一定大于 0，不可能再找到和为 0 的三元组，直接结束循环
    if (nums[i] > 0) break;

    // 去重（第一位）：如果当前值等于前一个值，会产生相同的三元组，直接跳过
    if (i > 0 && nums[i] === nums[i - 1]) continue;

    // 3. 在 (i, nums.length - 1] 区间内，用双指针寻找「两数之和 = -nums[i]」
    let l = i + 1; // 左指针从 i 的右侧第一个位置开始
    let r = nums.length - 1; // 右指针从数组末尾开始

    while (l < r) {
      const sum = nums[i] + nums[l] + nums[r];

      if (sum === 0) {
        // 找到一个和为 0 的三元组
        ans.push([nums[i], nums[l], nums[r]]);

        // 去重（第二位）：跳过所有和当前 nums[l] 相等的元素，避免重复三元组
        while (l < r && nums[l] === nums[l + 1]) l++;
        // 去重（第三位）：同理，跳过所有和当前 nums[r] 相等的元素
        while (l < r && nums[r] === nums[r - 1]) r--;

        // 收缩左右指针，继续寻找下一个可能的组合
        l++;
        r--;
      } else if (sum < 0) {
        // 当前和小于 0，需要「更大」的值，移动左指针
        l++;
      } else {
        // 当前和大于 0，需要「更小」的值，移动右指针
        r--;
      }
    }
  }

  // 返回所有找到的不重复三元组
  return ans;
};
