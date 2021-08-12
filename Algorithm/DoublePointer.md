# 双指针相关

## 有序数组的平方
```test
/**
 * 给你一个按 非递减顺序 排序的整数数组 nums，返回每个数字的平方组成的新数组，
 * 要求也按非递减顺序排序。
 * eg:
 * 输入：nums = [-4,-1,0,3,10]
 * 输出：[0,1,9,16,100]
 * 解释：平方后，数组变为 [16,1,0,9,100]
 * 排序后，数组变为 [0,1,9,16,100]
 */
```

```JavaScript
/**
 * @param { Array } nums 
 * @returns { Array }
 */
 
const sortSquares = (nums) => {
  let min = 0;
  for(let i = 0; i < nums.length; i++){
    nums[i] = Math.pow(nums[i], 2);
    // 获取最小值的位置
    min = nums[min] > nums[i] ? i : min;
  }
  // 定义一个新的数组，第一项为 nums[min]
  let arr = [];
  arr[0] = nums[min];
  // 定义指针 最小值位置左侧的结束为 min - 1 右侧开始位置为 min + 1；当前数组的下标index为1
  let l = min - 1, r = min + 1, index = 1;
  /**
   * 1、l不为0，r小于数组长度
   * 2、右侧条件不成立时，只剩下左侧数据，依次倒叙插入
   * 3、左侧条件不成立时，只剩下右侧数据，依次正序插入
   */
  while(l >= 0 && r < nums.length) arr[index++] = nums[l] > nums[r] ? nums[r++] : nums[l--];
  while(l >= 0) arr[index++] = nums[l--];
  while(r < nums.length) arr[index++] = nums[r++]
  return arr
}
```

## 旋转数组

```test
/**
 * 给定一个数组，将数组中的元素向右移动 k 个位置，其中 k 是非负数。
 * eg:
 * 输入: nums = [1,2,3,4,5,6,7], k = 3
 * 输出: [5,6,7,1,2,3,4]
 * 解释:
 * 向右旋转 1 步: [7,1,2,3,4,5,6]
 * 向右旋转 2 步: [6,7,1,2,3,4,5]
 * 向右旋转 3 步: [5,6,7,1,2,3,4]
 */
```

- 方案一

```JavaScript
const rotateArray = (nums, k) => {
  // 将k之后的元素截取出来
  let temp = nums.splice(-(k%nums.length))
  // 展开插入到原数组之前
  nums.unshift(...temp)
  return nums;
}
```
- 方案二
```JavaScript
```
- 方案三
```JavaScript
```
