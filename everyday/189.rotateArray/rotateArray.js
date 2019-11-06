/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */

// 暴力求解
// 时间复杂度：O(N*k)
// 空间复杂度：O(1)
// 优点：思路清晰简单
// 缺点：时间复杂度最高
var rotate1 = function (nums, k) {
    let len = nums.length;
    if (k >= len) {
        k %= len;
    }
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
// 时间复杂度：O(k*N)
// 空间复杂度：O(N+k)
// 优点：代码最短，清晰易懂
// 缺点：时间复杂度教高，空间复杂度最高
var rotate2 = function (nums, k) {
    const len = nums.length;
    if (k >= len) {
        k %= len;
    }
    for (let i = 0; i < k; i++) {
        nums.unshift(nums[len - 1]);
        nums.pop(); // 力扣上要这样才能通过检测
    }
    // return nums.slice(0, len); // 这样也可以，但是力扣上通不过
};

// 一步到位：找到一个元素最终位置，然后把这个元素赋值给这个位置，再寻找这个最终位置原来元素的最终位置，以此类推
// 时间复杂度：O(N)
// 空间复杂度：O(1)
// 优点：符合题目要求
// 缺点：逻辑上不直观。因为在寻找的过程中，当数组的个数是偶数时，会出现一个问题：遍历过程中只替换其中的一部分元素，其它的元素永远遍历不到。
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
// 时间复杂度：O(N)
// 空间复杂度：O(1)
// 优点：不仅符合题目要求，而且思路清晰，非常巧妙，代码易懂
var rotate4 = function (nums, k) {
    let len = nums.length;
    if (k >= len) {
        k %= len;
    }
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