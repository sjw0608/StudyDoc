// 节点
class Node {
    constructor(element) {
        // 当前节点的元素
        this.element = element;
        /**
         * 下一个节点链接 
         * 循环链表的话 this.next = head
         */
        this.next = null;
        // 上一个节点连接
        this.prev = null;
    }
}

// 链表类
class List {
    constructor() {
        // 头节点
        this.head = new Node('head');
    }
    // 查找节点
    find(item) {
        let currNode = this.head;
        while (currNode.element !== item) {
            currNode = currNode.next;
        }
        return currNode
    }
    // 插入节点
    insert(newElement, item) {
        let newNode = new Node(newElement);
        let currNode = this.find(item);
        newNode.next = currNode.next;
        newNode.prev = currNode;
        currNode.next.prev = newNode;
        currNode.next = newNode;
    }
    // 删除节点
    remove(item) {
        // 单链表删除，需要查找前驱节点
        // let prevNode = this.findPrev(item);
        // if (prevNode.next !== null) {
        //     prevNode.next = prevNode.next.next;
        // }
        // 双向链表比单链表效率要高，不需要查找前驱节点
        let currNode = this.find(item);
        if (currNode.next !== null) {
            currNode.prev.next = currNode.next;
            currNode.next.prev = currNode.prev;
        } else {
            currNode.prev.next = null;
        }
        currNode.next = null;
        currNode.prev = null;
    }
    // 查找前一个节点
    findPrev(item) {
        let prevNode = this.head;
        while (prevNode.next !== null && prevNode.next.element !== item) {
            prevNode = prevNode.next;
        }
        return prevNode
    }
    // 查找链表的最后一个节点
    findLast() {
        let lastNode = this.head;
        while (lastNode.next !== null) {
            lastNode = lastNode.next;
        }
        return lastNode
    }
    // 显示链表
    display() {
        let currNode = this.head;
        while (!(currNode.next == null)) {
            console.log(currNode.next.element);
            currNode = currNode.next;
        }
    }
    // 反向显示链表
    displayReverse() {
        let lastNode = this.findLast();
        while (lastNode.prev !== null) {
            console.log(lastNode.element);
            lastNode = lastNode.prev;
        }
    }
}

/**
 * 21.合并两个有序链表
 * 将两个升序链表合并为一个新的 升序 链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。
 * eg1:
 * 1 -> 2 -> 4 
 * 1 -> 3 -> 4
 * 1 -> 1 -> 2 -> 3 -> 4 -> 4
 * 输入： l1 = [1,2,4] ,l2 = [1,3,4]
 * 输出：[1,1,2,3,4,4]
 */
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
const mergeTwoLists = function (l1, l2) {
    let newNode = new ListNode('head'),
        cur = newNode;

    while (l1 && l2) {
        if (l1.val > l2.val) {
            cur.next = l2;
            l2 = l2.next;
        } else {
            cur.next = l1;
            l1 = l1.next;
        }
        cur = cur.next
    }
    cur.next = l1 === null ? l2 : l1;

    return newNode.next;
}

/**
 * 返回倒数第 k 个节点
 * 实现一种算法，找出单向链表中倒数第 k 个节点。返回该节点的值。
 * eg:
 * 输入：1 -> 2 -> 3 -> 4 -> 5 和 k = 2
 * 输出：4
 * 
 * 题解：定义两个指针，先让一个指针走k步，接着两个指针就相差k步，最后遍历后指针，当后指针为null时，
 * 前指针就是答案。
 */
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {number}
 */
const kthToLast = function (head, k) {
    let start = head, end = head, pos = k;
    while (pos > 0) {
        end = end.next;
        pos--;
    }
    while (end !== null) {
        start = start.next;
        end = end.next;
    }
    return start.val
}

/**
 * 206.反转链表
 * 给你单链表的头节点head，请你反转链表，并返回反转后的链表。
 * eg1：
 * 1 -> 2 -> 3 -> 4 -> 5 
 * 5 -> 4 -> 3 -> 2 -> 1
 * 输入： head = [1,2,3,4,5]
 * 输出： [5,4,3,2,1]
 * eg2:
 * 1 -> 2
 * 2 -> 1
 * 输入： head = [1,2]
 * 输出： [2,1]
 * eg3:
 * 输入： head = []
 * 输出： []
 * 题解：
 * - 定义三个指针 prev curr next 前指针 当前指针 下一个指针
 * - 每次把当前 curr 指针指向上一个 prev
 * - next 保存下一个节点信息
 * - 一开始把 prev 设置为null，curr设置为head；一直迭代下去，直到 curr 当前节点为尾节点。
 */
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
const reverseList = function (head) {
    if (!head) return head
    let prev = null,
        curr = head;
    while (curr !== null) {
        let next = curr.next;
        curr.next = prev;
        prev = curr;
        curr = next;
    }
    return prev;
}

/**
 * 92.反转链表II 区间反转
 * 给你单链表的头指针 head 和两个整数 left 和 right ，其中 left <= right 。
 * 请你反转从位置 left 到位置 right 的链表节点，返回 反转后的链表 。
 * eg:
 * 1 -> 2 -> 3 -> 4 -> 5
 * 1 -> 4 -> 3 -> 2 -> 5
 * 输入：head = [1,2,3,4,5], left = 2, right = 4 
 * 输出：[1,4,3,2,5]
 * eg2:
 * 输入：head = [5], left = 1, right = 1
 * 输出：[5]
 */
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} left
 * @param {number} right
 * @return {ListNode}
 */
/**
 * 方案一：穿针引线两次遍历
 */
const reverseBetween1 = function (head, left, right) {
    // 因为头节点有可能发生变化，使用虚拟头节点可以避免复杂的分类讨论
    let newNode = new ListNode('head');
    newNode.next = head;
    let pre = newNode;
    // 第一步：从虚拟节点走left - 1 步，来到left节点的前一个节点
    for (let i = 0; i < left - 1; i++) {
        pre = pre.next;
    }
    // 第二步：从pre再走right-left+1步，来到right节点
    let rightNode = pre;
    for (let i = 0; i < right - left + 1; i++) {
        rightNode = rightNode.next;
    }
    // 第三步：切断出一个子链表（截取链表）
    let leftNode = pre.next;
    let curr = rightNode.next;
    // 切断链接
    pre.next = null;
    rightNode.next = null;
    // 第四步：反转截取的链表
    reverseLinkedList(leftNode);
    // 第五步：接回到原来的链表中
    pre.next = rightNode;
    leftNode.next = curr;
    return newNode.next;
};

const reverseLinkedList = (head) => {
    let pre = null;
    let cur = head;
    while (cur) {
        let next = cur.next;
        cur.next = pre;
        pre = cur;
        cur = next;
    }
}
/**
 * 方案二：一次遍历「穿针引线」反转链表（头插法）
 * cur：指向待反转区域的第一个节点 left；
 * next：永远指向 cur 的下一个节点，循环过程中，cur 变化以后 next 会变化；
 * pre：永远指向待反转区域的第一个节点 left 的前一个节点，在循环过程中不变。
 */
const reverseBetween2 = function (head, left, right) {
    let newNode = new ListNode('head');
    newNode.next = head;
    let pre = newNode;
    for (let i = 0; i < left - 1; i++) {
        pre = pre.next;
    }
    let cur = pre.next;
    for (let i = 0; i < right - left; i++) {
        let next = cur.next;
        cur.next = next.next;
        next.next = pre.next;
        pre.next = next;
    }

    return newNode.next;
}
/**
 * 两两交换链表中的节点
 * 给定一个链表，两两交换其中相邻的节点，并返回交换后的链表
 * 你不能只是单纯的改变节点内部的值，而是需要实际的进行节点交换。
 * eg1:
 * 1 -> 2 -> 3 -> 4
 * 2 -> 1 -> 4 -> 3
 * 输入：head = [1,2,3,4]
 * 输出：[2,1,4,3]
 * eg2:
 * 输入：head = []
 * 输出：[]
 * eg3:
 * 输入：head = [1]
 * 输出：[1]
 */
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
const swapPairs = function (head) {
    if (!head) return head;
    let newNode = new ListNode('head');
    newNode.next = head;
    let temp = newNode;
    while (temp.next !== null && temp.next.next !== null) {
        let cur = temp.next;
        let next = cur.next;
        cur.next = next.next;
        next.next = cur;
        temp.next = next;
        temp = cur;
    }
    return newNode.next
};
/**
 * 回文链表
 * 给你一个单链表的头节点head，请你判断该链表是否为回文链表。如果是，返回true，否则，返回false；
 * eg1:
 * 输入：head = [1,2,2,1]
 * 输出：true
 * eg2:
 * 输入：head = [1,2]
 * 输出：false
 */
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {boolean}
 */
const isPalindrome = function (head) {
    let ary = []
    while(head){
        ary.push(head.val)
        head = head.next
    }
    for (let i = 0, j = ary.length - 1; i < j; i++, j--) {
        if(ary[i] !== ary[j]){
            return false
        }
    }
    return true
};
