/**
 * LeetCode 热题 100
 * 题目来源：https://leetcode.cn/studyplan/top-100-liked/
 * 以下代码每行均配有注释，便于理解。
 */

// 题意：两条链表表示两个非负整数，每位逆序存储，求和的链表
// 思路：模拟加法，维护进位 carry
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function (l1, l2) {
  const dummy = new ListNode(0); // 哑节点，方便统一处理头节点
  let cur = dummy; // 当前结果链表的尾节点
  let carry = 0; // 进位 0 或 1
  while (l1 || l2 || carry) {
    // 只要还有数或进位就继续
    const v1 = l1 ? l1.val : 0; // 取 l1 当前位，没有则为 0
    const v2 = l2 ? l2.val : 0; // 取 l2 当前位
    const sum = v1 + v2 + carry; // 当前位之和（含进位）
    carry = sum >= 10 ? 1 : 0; // 更新进位
    cur.next = new ListNode(sum % 10); // 当前位写入结果
    cur = cur.next; // 尾指针后移
    if (l1) l1 = l1.next; // 链表指针后移
    if (l2) l2 = l2.next;
  }
  return dummy.next; // 返回真正的头节点
};
