---
layout: article
title: Leetcode 152-Maximum Product Subarray 题解
tags: Leetcode
mode: immersive
key: l13
aside:
  toc: true
header:
  theme: dark
article_header:
  type: overlay
  theme: dark
  background_color: '#203028'
  background_image:
    gradient: 'linear-gradient(135deg, rgba(34, 139, 87 , .4), rgba(139, 34, 139, .4))'
    src: https://viewv.top/Pico//img/material-design-wallpaper-1.jpg
---

# Leetcode 152-Maximum Product Subarray 题解

## 题目

Given an integer array `nums`, find the contiguous subarray within an array (containing at least one number) which has the largest product.

**Example 1:**

```python
Input: [2,3,-2,4]
Output: 6
Explanation: [2,3] has the largest product 6.
```

**Example 2:**

```python
Input: [-2,0,-1]
Output: 0
Explanation: The result cannot be 2, because [-2,-1] is not a subarray.
```

## 分析

这是动态规划一个系列里面的题目，难度标记为中等，当然对我菜鸡来讲属于很难的题目，想到了动态规划，可是想到的与题目中的冲突就是题目中要求连续，而且乘法和加法不一样，乘法负负得正，最小的一下子就能变成最大的，最后一看讨论中的代码才发现其实很简单，记录下来到位置i的最大值和最小值，将num[i],现在的最大值，现在的最小值，等等数求最大值，比起以前要求三个数的最大值和最小值，和相互的比较，代码如下：

## 代码

下面是AC的代码：

{% highlight python %}

class Solution:
​    def maxProduct(self, nums):
​        current_min = current_max = max_so_far = nums[0]
​        for i in range(1, len(nums)):
​            temp = current_max
​            current_max = max(nums[i], current_min * nums[i], temp * nums[i])
​            current_min = min(nums[i], current_min * nums[i], temp * nums[i])
​            max_so_far = max(current_max, max_so_far)
​        return max_so_far

{% endhighlight %}

注意到这里面设置的最小值，在current_min中计算的是temp×nums[i]也就是都在相当于前一个的值上面计算的，在编码的时候注意。时间复杂度为$$O(n)$$，空间复杂度为$$O(1)$$。

感谢这个[讨论](https://leetcode.com/problems/maximum-product-subarray/discuss/218417/Kadane-inspired-Python-solution-in-O(n)-time-and-O(1)-space)和作者给出的代码，这里的代码和上面的一样，希望不要怪罪我😂。