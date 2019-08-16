---
layout: article
title: Leetcode 229. Majority Element II 题解
tags: Leetcode
mode: immersive
key: l71
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
    src: https://i.loli.net/2019/08/16/eEjUBVKQz68mXZ5.jpg
---

# Leetcode 229. Majority Element II 题解

## 题目

Given an integer array of size *n*, find all elements that appear more than `⌊ n/3 ⌋` times.

**Note:** The algorithm should run in linear time and in O(1) space.

**Example 1:**

```
Input: [3,2,3]
Output: [3]
```

**Example 2:**

```
Input: [1,1,1,3,3,2,2,2]
Output: [1,2]
```

## 分析

首先可以知道对于题目中的这种情况，如果存在这样的一种最多出现次数的数字，也就是 appear more than `⌊ n/3 ⌋` times 的话，这样的数字最多有两个，这里简单说明一下为什么最多只会有两个。

对于一个长度为n的数组，n是整数，那么我们可以使用 $3k, 3k+1,3k+2$ ，k是整数来表示一个n，这三种情况下最后计算得到要求的答案数字个数要大于k，也就是最小要是$k+1$，如果一个数组里面有三个这样的数字的话，3个$k+1$，将大于最大的$3k+2$，不符合要求所以最多有2个答案。

确定了最多有两个数字之后，这道题可以使用字典计数来确定，但是题目要求要用一个线性时间的算法，而且需要一个$O(1)$ 的空间复杂度，这就需要用 majority vote 算法，多数投票法。

显然，如果一个数字满足大多数这个条件的话，相当于对其投票，相同的数字就在其的count上面加1，不相同的就减一，如果这个候选人的票被减没了，那么就会有新的参选者加入，在这个题目中，我们设置两个候选人，如果遇到相同的情况就对对应的count加一，当count=0的时候更换候选人，如果count没有减到0，那么就减1，这样我们就可以找到最后的两个人，也就是两个数字。

但是这里面是有一些问题的，首先的确能找到两个数字，不用担心过程中会出现原本很多次出现的数字被洗刷掉的情况，因为如果某个数字满足条件，在这个投票过程中，一定会成功的取代出现次数比自己小的数字，如果它的量足够，但是我们不能保证最后出来的两个数字都满足条件，多数不一定是满足⌊ n/3 ⌋，所以我们需要再进行一次遍历数组，计算到底有多少个这样的数字，最后和⌊ n/3 ⌋比较，大于这个就是真结果，小于这个就是假结果，舍去，最后得到正确的答案。

## 代码

{% highlight python %}

from typing import List

\# ** majority vote Algo.*



​    def majorityElement(self, nums: List[int]) -> List[int]:

​        count0 = count1 = 0

​        target0 = target1 = 0

​        length = len(nums)

​        for x in range(length):

​            if nums[x] == target0:

​                count0 += 1

​            elif nums[x] == target1:

​                count1 += 1

​            elif count0 == 0:

​                count0 += 1

​                target0 = nums[x]

​            elif count1 == 0:

​                count1 += 1

​                target1 = nums[x]

​            else:

​                count0 -= 1

​                count1 -= 1

​        count0 = 0

​        count1 = 0

​        for x in range(length):

​            if nums[x] == target0:

​                count0 += 1

​            \#*!important to have a elif if!*

​            \#*!to avoid target0 == target1 and get two answer!*

​            elif nums[x] == target1:

​                count1 += 1

​        ans = []

​        k = length // 3

​        if count0 > k:

​            ans**.**append(target0)

​        if count1 > k:

​            ans**.**append(target1)

​        return ans

{% endhighlight %}

Python中新加入了Typing的支持，应该是学习静态语言方便查错等等的，在这里注意里面第二遍遍历中的是elif检查第二个target参选者，如果不用elif，有可能出现target0 == target1，得到结果两个数字相同的错误结果。