/**
 * LeetCode 热题 100
 * 题目来源：https://leetcode.cn/studyplan/top-100-liked/
 * 以下代码每行均配有注释，便于理解。
 */

// 题意：删除链表倒数第 n 个节点
// 思路：快指针先走 n 步，再一起走，慢指针停在待删前驱
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function (head, n) {
  const dummy = new ListNode(0, head); // 哑节点，避免删头时特判
  let fast = dummy;
  let slow = dummy;
  for (let i = 0; i <= n; i++) fast = fast.next; // 快指针先走 n+1 步
  while (fast) {
    fast = fast.next;
    slow = slow.next;
  }
  slow.next = slow.next.next; // 删除 slow 的下一个节点
  return dummy.next;
};
