---
layout: article
title: Hello Jekyll
tags: jekyll
mode: immersive
key: b89
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
    src: https://i.loli.net/2018/12/14/5c13b7f020c0f.jpg
---

> Transform your plain text into static websites and blogs.

# Welcome

## Welcome

### Welcome

This site aims to be a comprehensive guide to Jekyll. We’ll cover topics such as getting your site up and running, creating and managing your content, customizing the way your site works and looks, deploying to various environments, and give you some advice on participating in the future development of Jekyll itself.

### So what is Jekyll, exactly?Permalink

Jekyll is a simple, blog-aware, static site generator. It takes a template directory containing raw text files in various formats, runs it through a converter (like [Markdown](https://daringfireball.net/projects/markdown/)) and our [Liquid](https://github.com/Shopify/liquid/wiki) renderer, and spits out a complete, ready-to-publish static website suitable for serving with your favorite web server. Jekyll also happens to be the engine behind GitHub Pages, which means you can use Jekyll to host your project’s page, blog, or website from GitHub’s servers for free.

### Helpful HintsPermalink

Throughout this guide there are a number of small-but-handy pieces of information that can make using Jekyll easier, more interesting, and less hazardous. Here’s what to look out for.

### Math Test

$$x = {-b \pm \sqrt{b^2-4ac} \over 2a}$$

### Code Test

{% highlight python %}
class Solution(object):
    def isSameTree(self, p, q):
        if p == None and q == None:
            return True
        elif p == None or q == None:
            return False

        if p.val == q.val:
            return self.isSameTree(p.left, q.left) and self.isSameTree(p.right, q.right)
        else:
            return False
{% endhighlight %}

### Music Test

<iframe frameborder="no" border="0" marginwidth="0" marginheight="0" width="100%" height="100" src="//music.163.com/outchain/player?type=2&id=1329734055&auto=1&height=66"></iframe>

### Video Test

<div>{%- include extensions/bilibili.html id='9453144' -%}</div>
