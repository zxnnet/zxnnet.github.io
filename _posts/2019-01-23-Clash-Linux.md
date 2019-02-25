---
layout: article
title: Clash Linux 代理的使用
tags: Clash Proxy Linux
mode: immersive
key: c11
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
    src: https://i.loli.net/2019/02/25/5c73b2958bf19.png
---

# Clash Linux 代理使用

## 前言

Clash是一个很好的代理软件，可是现在有Mac的客户端，有Windows的客户端，还没有Linux的客户端，只有那个原始的clash-linux的软件，没有图形化，而且我也没发现什么可以让这个玩意自动获取订阅的东西，自己照着网上折腾了一个一会儿，现在应该可以正常的使用了，有一个面板可以控制，写了一个脚本可以添加订阅地址，更新文件。

顺便提一下，我现在用的是deepin的系统，电脑上有Python的环境，还有nodejs，我相信看到这篇文章的大概都会安装吧。

## 软件本体

去[clash](https://github.com/Dreamacro/clash/releases)的github网站上下载linux那个压缩包，解压之后放在一个你能找到的地方，给解压出来的clash-linux赋予权限能够以软件方式运行，在deepin中倒是好做，右键之后勾选就可以了，之后运行一次，之后可以发现在/home/viewv/.config/clash有了相关的东西，这个文件夹就是默认放config.yml文件的地方，理论上你现在可以把自己的config.yml放进去，之后操作就可以用了，不过没有一个友好的管理环境，这里按照作者在github项目页面上面的推荐，安装[pm2](https://github.com/Unitech/pm2)，这是一个nodejs的玩意，应该是控制软件的，按照网站上的说明安装好之后，我直接杀掉系统里面正在运行的clash，之后回到我存放clash的地方，在终端中运行：

```bash
pm2 start clash-linux
```

之后就可以看到运行的情况了，这个pm2还是蛮好用的，这次运行之后，在其他文件夹下也可以运行这条指令来控制clash-linux的开关，非常方便，这个pm2我用到的主要命令就是start,restart,stop,启动，重启，关闭。

## 面板

我们linux也想有一个图形化的本地客户端：

![](https://i.loli.net/2019/02/25/5c73b170af1ec.jpg)

可是我没发现，如果有好使的评论务必给我留一个，这里我便采用面板的方式来解决问题。

首先去config的文件夹修改config.yml里面的external-controller选项，修改成你想要的一个地址和接口，格式就是地址:接口，我在这个地方配置成了127.0.0.1的ip地址，因为我使用switchomega这个浏览器插件，这个插件会自动忽略掉120.0.0.1的代理请求，我懒得写其他的就用这个ip了，顺便一提，蛮推荐这个插件的，在有很多代理情况下很好用，当然你可以选择你想要的地址和端口，之后打开一个面板网站，这里有一个[yacd](https://github.com/haishanh/yacd)面板，感觉不错，有一个提供的网址，直接点开之后输入你刚才修改的地址和端口，就可以看到你的配置文件和代理信息了，感谢大佬的操作，我还推荐大家直接fork走或者是下载clone什么的库中的代码，本质上还是一个静态网站，你可以托管它成为一个你的面板，就像github page一样的东西，我使用了netlify+github的方式操作，我感觉netlify比github page好用，直接在我域名的CNAME解析到他们提供的那个一长串网址就可以了，很方便，推荐大家自己给自己托管一个这样的面板，到时候别人的网站挂了也可以用自己的，其实如果懒可以直接本地打开。

话说回来，能够本地面板，诶，要是我会electron之类的就可以封装一个完整的应用了，可惜我不会，我学electron三进三出，都没入门，每次卡在奇怪的地方，算了算了不学了。

## 订阅地址

面板里面没有提供订阅地址的选项，这也正常，不过这还是不方便，每次手动去操作下载config，手动重启软件，配置代理，太烦了，所以我就自己用Python写了一个自动更新配置文件的代码，[下载地址](https://www.jianguoyun.com/p/Df6xCF0QivupBxiQkJsB)，这个代码需要你按照这篇文章中写的一样安装pm2运行一遍clash-linux，还需要python3的支持，而且依赖几个库，requests，ruamel.yaml，tqdm，其中ruamel那个的安装代码如下：

```bash
pip install ruamel.yaml
```

这些库中，request就是网络相关的，ruamel是处理yaml文件的，tqdm是一个进度条软件，显示下载进度，在这个代码中需要修改的地方有标注，根据自己的需要修改相关的代码来运行就可以，菜鸡代码，大家见谅。

这些就是全部的内容了，这样就有了一个说的过去的环境来使用clash代理，相比起来Windows和Mac的客户端还是要不方便一点，不过这样也不错，有Linux的风格。