---
layout: article
title: Leetcode 300-Longest Increasing Subsequence 题解 01
tags: Leetcode
mode: immersive
key: l12
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
    src: https://viewv.top/Pico//img/angel-origgi-1198759-unsplash.jpg
---

# Leetcode 300-Longest Increasing Subsequence 题解 01

## 题目

Given an unsorted array of integers, find the length of longest increasing subsequence.

**Example:**

```
Input: [10,9,2,5,3,7,101,18]
Output: 4 
Explanation: The longest increasing subsequence is [2,3,7,101], therefore the length is 4. 
```

**Note:**

- There may be more than one LIS combination, it is only necessary for you to return the length.
- Your algorithm should run in O(*n2*) complexity.

**Follow up:** Could you improve it to O(*n* log *n*) time complexity?

## 分析

采用动态规划的思想，这里是第一种方法$$O(n^2)$$的时间复杂度。

设置一个dp数组，这个数组dp[i]保存着到位置i的最长递增字符串，最后返回dp里面最长的就是答案，其中dp[i]表示以nums[i]为结尾的最长递增子串的长度，对于每一个nums[i]，我们从第一个数再搜索到i，如果发现某个数小于nums[i]，我们更新dp[i]，更新方法为dp[i] = max(dp[i], dp[j] + 1)，即比较当前dp[i]的值和那个小于num[i]的数的dp值加1的大小，我们就这样不断的更新dp数组，到最后dp数组中最大的值就是我们要返回的LIS的长度。

这里最有趣的是更新的时候，是dp[i]=max(dp[i],dp[j] + 1) 这个地方，看到dp[j] + 1的意思就是说i这个位置的值比j的值大，那么这里就可以使用dp[j]+1来更新dp[i]，这是重要的地方，选择这个和不选择这个的区别，是动态规划的常见问题，这里选择j就是要更新为dp[j]+1，不选择就还是dp[i]，取最大，便是需要更新的地方。

## 代码

下面是AC的代码：

{% highlight python %}

class Solution:
​    def lengthOfLIS(self, nums):
​        length = len(nums)
​        dp = [1 for x in range(0, length)]
​        for x in range(0, length):
​            for y in range(0, x):
​                if nums[x] > nums[y]:
​                    dp[x] = max(dp[x], dp[y] + 1)
​            maxlength = max(maxlength, dp[x])
​        return maxlength

{% endhighlight %}

这个问题还有一个更快速的算法，能够优化时间到$$O(nlogn)$$的时间复杂度，将会在第二篇博文中论述。