/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */

// 暴力求解
// 时间复杂度：O(N*k)
// 空间复杂度：O(1)
// 优点：思路清晰简单
var rotate1 = function (nums, k) {
    let len = nums.length;
    for (let i = 0; i < k; i++) {
        let temp = nums[len - 1];
        for (let j = len - 2; j >= 0; j--) {
            nums[j + 1] = nums[j];
        }
        nums[0] = temp;
    }
    return nums;
};

// 尾部前推：将末尾的k个元素以倒序的方式一次推到数组最前面，最后裁剪数组
// 时间复杂度：O(k)
// 空间复杂度：O(N+k)
// 优点：最优时间复杂度
var rotate2 = function (nums, k) {
    const len = nums.length;
    for (let i = 0; i < k; i++) {
        nums.unshift(nums[len - 1]);
    }
    return nums.slice(0, len);
};

// 一步到位：直接找到每个元素旋转以后的最终位置，进行替换
// 时间复杂度：O(N)
// 空间复杂度：O(1)
// 优点：符合题目要求
var rotate3 = function (nums, k) {
    const len = nums.length;
    if (k >= len) {
        k %= len;
    }
    if (k === 0) {
        return nums;
    }

    let times = 0;
    let begin = 0;
    let target = 0;
    let temp1;
    let temp2;
    while (times < len) {
        temp1 = nums[begin];
        target = begin;
        do {
            target = (target + k) % len;
            temp2 = nums[target];
            nums[target] = temp1;
            temp1 = temp2;
            times++;
        } while (target !== begin);

        begin++;
    }
    return nums;
};

// 旋转法
// 时间复杂度：O(k)
// 空间复杂度：O(1)
// 优点：不仅符合题目要求，而且思路清晰，非常巧妙，代码易懂
var rotate4 = function (nums, k) {
    let len = nums.length;
    k %= len;
    nums = reverse(nums, 0, len - 1);
    nums = reverse(nums, 0, k - 1);
    nums = reverse(nums, k, len - 1);
    return nums;
};

var reverse = function (nums, begin, end) {
    if (nums.length < 2) {
        return nums;
    }
    let temp;
    while (begin < end) {
        temp = nums[end];
        nums[end] = nums[begin];
        nums[begin] = temp;
        begin++;
        end--;
    }
    return nums;
};