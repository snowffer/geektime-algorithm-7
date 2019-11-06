/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function (nums) {
    let len = nums.length;
    let first = 0;
    if (len > 1) {
        for (let i = 1; i < len; i++) {
            if (nums[first] !== nums[i]) {
                first++;
                if (i > first) { // 避免紧跟在first后面的i给自己赋值，但是这样会有性能损耗
                    nums[first] = nums[i];
                }
            }
        }

    }
    return len > 1 ? ++first : len;
};