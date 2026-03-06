/**
 * LeetCode 热题 100
 * 题目来源：https://leetcode.cn/studyplan/top-100-liked/
 * 以下代码每行均配有注释，便于理解。
 */

// 题意：将 k 条有序链表合并为一条
// 思路：最小堆维护 k 个表头，每次取最小接上；或两两合并
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
var mergeKLists = function (lists) {
  const mergeTwo = (a, b) => {
    const dummy = new ListNode(0);
    let cur = dummy;
    while (a && b) {
      if (a.val <= b.val) {
        cur.next = a;
        a = a.next;
      } else {
        cur.next = b;
        b = b.next;
      }
      cur = cur.next;
    }
    cur.next = a || b;
    return dummy.next;
  };
  if (lists.length === 0) return null;
  let ans = lists[0];
  for (let i = 1; i < lists.length; i++) ans = mergeTwo(ans, lists[i]); // 两两合并
  return ans;
};
