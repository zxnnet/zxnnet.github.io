---
layout: article
title: 使用 Project Croissant 在普通电脑上使用 Chrome OS
tags: Chrome-OS Croissant System
mode: immersive
key: o11
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
    src: https://raw.githubusercontent.com/viewv/Pico/master/img/20190827165404.jpg
---

# Project Croissant 在普通电脑上使用 Chrome OS

Chrome OS 的确有开源的 Chromium OS 可以使用，比较起来区别和 ASOP 与 Google Android 的区别类似，Chrome OS 有 Google Play 支持，可以运行 Play 商店上的应用，使用 Google 账户同步之类的，Chrome OS 现在到时支持了使用 Android App，也支持运行一些 Linux 应用，听起来还蛮强，所以就想安装试一下。

国产的已经有 Fyde OS 了，基于Chromium OS，也做到了使用 Fyde 账户同步，也可以使用 Linux 应用与 Android 应用，但是我还是希望用原生的 Chrome OS 体验一下，看一看这个系统是什么样子，之后发现了这个项目：[Project Croissant](https://github.com/imperador/chromefy) 。这个项目可以“转化”一个 Chromium OS 的安装镜像到 Chrome OS 镜像，之后烧录到USB盘上面就可就可以开机选择启动来体验了，里面加载了谷歌的各种服务，听起来很棒。现在就开始本废文旅程，写一写跟官方说明差不多的安装步骤。

![Chrome OS Desktop](https://i.loli.net/2019/08/27/k8d7Bl6rHx5m9Yy.jpg)

## 准备1：一份 Chromium OS 镜像

首先要准备一份 Chromium OS 系统的镜像，在这里官方说明给了一个网站下载，并且"strongly recommend"这个网站上的镜像，那么就用这个，[ArnoldTheBats Chromium](https://chromium.arnoldthebat.co.uk/index.php?dir=special&order=modified&sort=desc) 。进入这个网站之后，根据你的电脑情况来选择其中一个下载，应该大部分人和我的电脑一样是 Intel 或者 AMD 64位的处理器，选择带 amd64 的，找个最新的 Build 下载就可以了。

建议准备一个单独的文件夹保存需要下载的所有文件，下载完上述说的 Chromium OS 之后解压就可以了。

## 准备2：Project Croissant 的脚本和swtqm.tar文件

就是去这个项目的 github 到 release 里面下载里面的 chromefy.sh 与 swtqm.tar 文件，这里的 swtqm 不用解压，同样放到与 Chromium OS 镜像同一个文件夹下面。

## 准备3：一份 Chrome OS 官方的恢复镜像

首先到这个[列表](https://www.chromium.org/chromium-os/developer-information-for-chrome-os-devices)，根据你的电脑主要是CPU的型号来选择一个类似的官方 Chromebook 型号出来，比如我的笔记本是那个渣渣 i5-7200U 根据这个找一个差不多用相同 CPU 的 Chromebook 型号出来，我当时没有多想，看见 Pixelbook 写着 kabylake ，就选择它，后来倒是也启动起来了，不过后来仔细看看搜索好像不是最合适的，不管这么多了，又不是不能用。

![嘿嘿](https://i.loli.net/2019/08/27/RSq2JyfNY5OlAsj.png)

之后根据你选择到的信号，到这个这个[地方](https://cros-updates-serving.appspot.com/)，下载官方的恢复镜像，根据官方说明，建议下载 eve 或者是 pyro 版本的镜像，是最完整的，我选择了下载 eve 版本的，官方也说是 best 。下载下来应该是一个 zip 文件，解压到一直的那个文件夹就行。

## 制作 Chrome OS 镜像

这样就准备好了，之后随便找个 Linux 的环境应该就行，之后开始操作：

- 使用 root 权限

     我也不知道为啥要这么高的权限，就跟着指令打吧

    ```bash
    sudo su
    ```

- 进入文件夹里面

    假设你的文件夹路径是 path 那么 cd 到里面

    ```bash
    cd path
    ```

- 开始使用  chromefy.sh 脚本

    注意命令中的 chromium.img 就是下载到的 chromium os 的镜像，但是一般会有很长的版本号跟在后面，用好 tab 或者 重命名一下，recovery.bin 就是下载到的官方恢复镜像，一般名字也不叫这个，注意变化，与官方说明有点不一样的是，chromefy 脚本实际上就是官方说明中的 croissant.sh，这样就键入下面的命令来工作。

    ```bash
    bash  chromefy.sh  chromium.img  recovery.bin  caroline.bin
    ```

之后回到目录下面，就会发现一个 chromium.img 或者其他以这个开头的 img ，似乎没变化？仔细一看比以前那个变大了太多了，我这里生成完之后居然有8.3GB之巨大，这也太恐怖了，但是是正确结果。

之后使用工具，推荐使用 Etcher 这个工具，将这个 img 镜像烧录到一个U盘上去，完成之后使用这个U盘进入系统就可以了，没什么时间研究什么安装之类的，我想也没几个人打算真的安装它到电脑硬盘中去，比较感觉不算能够支撑工作，而且网络不好了在国内，我怕我连那天开机都有问题。

## 备注

在进入系统之后，用不一会就会说系统空间不足，这很奇怪，明明U盘很大，这个时候回到 Linux 系统下面，把U盘插入电脑里面，我使用 Gparted 那个图形化分区工具打开，就可以看到这个U盘已经被一堆我看不懂的分区占据了，还有一大块空闲空间，这个时候把位于末尾的分区扩大吃完剩余空间，执行之后再进入 Chrome OS，就可以有充足的空间了。

有时间写一下在 Chrome OS 里面使用 Archlinux 替代原本的 Debian 的废文，现在差不多我还可以在 Chrome OS 里面使用几个 Linux 应用。

![zsh arch in Chrome OS](https://i.loli.net/2019/08/27/Ndr7Jls4GX8FQ21.jpg)

