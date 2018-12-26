---
layout: article
title: Leetcode 525-Contiguous Array 题解
tags: Leetcode
mode: immersive
key: l01
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
    src: https://viewv.top/Pico/img/20181226204335.jpg
---

# Leetcode 525-Contiguous Array 题解

## 题目  
>
> Given a binary array, find the maximum length of a contiguous subarray with equal number of 0 and 1.
>
> **Example 1:**
>
> ```
> Input: [0,1]
> Output: 2
> Explanation: [0, 1] is the longest contiguous subarray with equal number of 0 and 1.
> ```
>
> **Example 2:**
>
> ```
> Input: [0,1,0]
> Output: 2
> Explanation: [0, 1] (or [1, 0]) is a longest contiguous subarray with equal number of 0 and 1.
> ```
>
> **Note:** The length of the given binary array will not exceed 50,000.

## 分析

这也就是说要找到一个子序列，这个子序列里面0和1的数量是相同的，一开始遇到这道题读错了题目，想到了简单的连续有效的字符串，后来发现没有这么简单，一直没有想出来，于是就去看了讨论区的题解，才知道了怎么做这个题。

算法大致是这个样子，设置一个count，这个count记录的是1与0个数的差在数到序列某个位置的时候，也就是在遇到0的时候减一，遇到1的时候加一，没走一步就算一次这个count，这样带来的好处便是，在遍历序列的时候，如果发生了这个count和前面某个地方计算的count一样的话，这样就证明了第一个count出现的位置到现在这个count位置的中间部分的0和1的个数就是相等的(因为设置的0为-1,1为1，数量相同的时候就抵消了)这时候就可以计算这两个位置的length和maxlenght比较，如果大于则更新这个maxlength，最后就可以算出来最大位置了。

但是怎么保存count的位置呢？这里使用Python中的字典，也就是哈希表这种东西，关键字是count，键值是这个count在当时的位置，这样就可以快速的寻找位置进行计算了，是有些精妙的。

## 代码

下面是AC的代码：

{% highlight python %}

class Solution(object):
    def findMaxLength(self, nums):
        dic = {0: -1}
        count = 0
        maxlen = 0
        for x in range(0, len(nums)):
            count += (1 if nums[x] == 1 else - 1)
            if count not in dic:
                dic[count] = x
            else:
                maxlen = max(maxlen, x - dic[count])
        return maxlen

{% endhighlight %}

类似动态规划的思想，是一个很有趣的问题。