# 二分查找

## 二分查找

```test
给定一个 n 个元素有序的（升序）整型数组 nums 和一个目标值 target，写一个函数搜索 nums 中的 target，如果目标值存在返回下标，否则返回 -1。
输入: nums = [-1,0,3,5,9,12], target = 9
输出: 4
解释: 9 出现在 nums 中并且下标为 4
```

```JavaScript
/**
 * 题解
 * 这道题是二分查找经典基础题。主要是使用左右指针，根据数组的单调性，每次从中间取值：
 * - 中间值小于目标值，就说明存在于右边区间，将左指针道中间值的右边，区间缩小到后半部分；
 * - 如果中间值大于目标值，说明目标值存在于左半区间；
 * - 如果相等，直接返回。
 * - 在上述情况下一直循环，当左指针不再小于右指针式，跳出循环。此时，跳出循环的话就相当于没有找到目标值，返回-1。
 */
 /**
 * @param { Array } nums 
 * @param { Number } target 
 * @returns { Number }
 */
const BinarySearch = (nums, target) => {
  let l = 0, r = nums.length-1, mid;
  while( l <= r ){
    mid = l + Math.floor((r - l) >> 1);
    if (nums[mid] === target) return mid;
    else if (nums[mid] > target) r = mid -1;
    else l = mid + 1;
  }
  return -1;
}
 ```
 
 ## 第一个错误版本
 
 ```test
 /**
 * 你是产品经理，目前正在带领一个团队开发新的产品。不幸的是，你的产品的最新版本没有通过质量检测。
 * 由于每个版本都是基于之前的版本开发的，所以错误的版本之后的所有版本都是错的。
 * 假设你有 n 个版本 [1, 2, ..., n]，你想找出导致之后所有版本出错的第一个错误的版本。
 * 你可以通过调用 bool isBadVersion(version) 接口来判断版本号 version 是否在单元测试中出错。
 * 实现一个函数来查找第一个错误的版本。你应该尽量减少对调用 API 的次数。
 * 
 * eg:
 * 输入：n = 5, bad = 4
 * 输出：4
 * 解释：
 * 调用 isBadVersion(3) -> false 
 * 调用 isBadVersion(5) -> true 
 * 调用 isBadVersion(4) -> true
 * 所以，4 是第一个错误的版本。
 */
 ```
 ```JavaScript
 /**
 * Definition for isBadVersion()
 * 
 * @param {integer} version number
 * @return {boolean} whether the version is bad
 * isBadVersion = function(version) {
 *     ...
 * };
 */
 /**
 * 
 * @param {fuction} isBadVersion()
 * @returns {fuction}
 */
 const solution = (isBadVersion) => (n) => {
   let l = 0, r = n, mid;
   while(l < r){
     if(l === r) return r
     mid = l + Math.floor((r - l) >> 1);
     if(isBadVersion(mid)) r = mid
     else l = mid + 1
   }
 }
 ```
 
 ## 搜索插入的位置
 
 ```test
 /**
 * 给定一个排序数组和一个目标值，在数组中找到目标值，并返回其索引。
 * 如果目标值不存在于数组中，返回它将会被按顺序插入的位置。 
 * 请必须使用时间复杂度为 O(log n) 的算法。
 * eg：
 * 输入: nums = [1,3,5,6], target = 5
 * 输出: 2
 */
 ```
 
 ```JavaScript
 /**
 * 
 * @param { Array } nums 
 * @param { Number } target 
 * @returns { Number }
 */
 const searchInsert = (nums, target) => {
   let l = 0, r = nums.length, mid;
   while(l < r){
     mid = l + Math.floor((r - l) >> 1);
     if(nums[mid] >= target) r = mid;
     else l = mid + 1;
   }
   return r;
 }
 ```
 
