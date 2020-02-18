---
layout: article
title: 自制 Fido key 第一期 使用 Google OpenSK
tags: fido fido2 opensk google
mode: immersive
key: q16
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
    src: https://cdn.jsdelivr.net/gh/viewv/Pico/img/20200218221059.png
---

# 自制 Fido key 第一期 使用 Google OpenSK

早就关注Fido key这种东西，就是感觉很帅，但是一搜索，一个Yubikey好贵啊，几百块，这我想着吃饭感觉都比这个香啊，而且也不知道到底多有用，于是想着有没有什么方案解决这个问题，能够简单一点，廉价的解决这个问题。

如果你也想体验一下，我觉得我的这个路线还是值得参考的，首先来说一下这玩意能干啥，在我看来最大的应用场景目前还是二次验证用，表面说的我们Fido覆盖广泛，但是在我看了几个之后发现大多数情况下，它就负责二次验证，什么事二次验证？这个大家都应该知道，比如你登陆谷歌的时候又没有让你手机点是？（如果你开了二步验证），这个时候这个设备就有用了，当然看着大家都叫安全密钥。遇到二次验证的时候把usb一插入就验证成功了。

在我爬楼查了很多东西之后，发现实际上你甚至不用这个usb小设备也能获得这样的体验，下面就来说一下这些个方法，这些方法应该都能用，但是我不是专家，不保证说的对，也不保证这些方案安全。

## SoftU2F 及其类似项目

github有个给Mac系统的叫[SoftU2F](https://github.com/github/SoftU2F)的项目，打开看看，细心的话你会发现它居然有fido的U2F认证，github还是厉害，自己也说了这个项目其非常关注安全性。

![softu2f](https://user-images.githubusercontent.com/1144197/28190263-470a80d2-67e7-11e7-81e6-17895d70bf75.png)

<center>发现那个黑色认证标志了吗？</center>

所以如果你也是用Mac，那么你就可以下载安装，体验一下这种二步验证的方式，safari现在也有限的支持了U2F，所以不需要再去装什么插件，你可以把你的谷歌账号github账号等等添加一种二步验证方式是用安全密钥，而且说实话这是今天我要介绍乃至所有我能写的自制方案中最安全的，因为它过了认证。

windows不知道内置还是也有类似的项目，linux也有类似的一个项目，大家大可去搜索一下，这些方案就是Soft的实现方法。

## 系统自带的安全认证

实际上啊，你的安卓手机指纹呀，水果的touchid啊，之类的应该也能当作一种认证这点谷歌做的不错，我感觉Chrome算是支持fido最完善的浏览器，谷歌应该很重视这个也积极推广，至于那个苹果吗，这里就不说了，在chrome中在我这里是能使用Mac自带的touchid来进行二步验证之类的任务的，safari好像不想。

实际上谷歌还支持你的安卓手机作为一个key，目前我看着闲鱼自家服务或者是chrome之类的。

## 本次主角-OpenSK

[OpenSK](https://github.com/google/OpenSK) 是谷歌开源的，使用rust实现了一个fido2设备，研究性质，官方使用了[Nordic nRF52840-DK](https://www.nordicsemi.com/Software-and-Tools/Development-Kits/nRF52840-DK) 或者 [Nordic nRF52840-dongle](https://www.nordicsemi.com/Software-and-Tools/Development-Kits/nRF52840-Dongle) 这两个板子实现，其中有实用价值的是dongle也就是想U盘一样的板子，这个dongle淘宝上能买到，价格也不算贵，读一下readme，还有人给提供了一个3D打印的外壳文件，你可以选择跟随官方，使用那个蓝色的板子，我在这里当时考虑到我咋给你打印个外壳，目前风雨飘摇之际，共体时艰克服疫情，而且看着那个蓝色的东西玄乎，官方给的刷写方案是使用Jlink，这玩意嵌入式的时候碰过，不过也是淘宝破解那种10块一个的，他们官方用的设备我一搜，妈耶，这么多针脚，这个连接线也有够贵的，所以我把目光投向了这个：[nRF52840 MDK USB Dongle](https://store.makerdiary.com/collections/frontpage/products/nrf52840-mdk-usb-dongle-w-case) ，有壳子，不过这个有壳子的一搜淘宝带壳比不带也贵太多了，虽然我买了带壳子的，但是大家感觉要是干，可以不用这个，用便宜的那个不带壳子的，寻思保护好也坏不了，黑色pcb还挺帅。

## 准备

一开始打算也学官方使用Jlink刷入的，还去淘宝没了那种便宜货jlink，主要是看着这个板子有下面这个接口结构：

![nRF52840 MDK USB Dongle pcb](https://cdn.jsdelivr.net/gh/viewv/Pico/img/20200218221147.png)

我看到了有这几个熟悉的身影：GND，RST，SWDCLK，SWDIO，3.3v，嗯上道，还问了客服壳子能拆吗，他告诉能但是容易坏不建议拆，但是内心中我已经准备好对付它了。

但是这不是共体时艰，jlink就是不到，我便开始爬楼，想着也许有个办法解决这个问题，他们的店铺官网看着这么好看，应该是有正经人维护，果不其然被我发现不用拆壳子的方法，直接USB解决问题的方法了，官方行动真迅速，也就是这里：[OpenSK ](https://wiki.makerdiary.com/nrf52840-mdk-usb-dongle/opensk/) 我看到了都笑了出来，这肯定稳了，于是这里有两种办法实现，请在这里根据自己的期望选择，想直接刷官方的请继续读，想编译操作的目录跳转到后面。当然最推荐直接读wiki，我认为是最好的方法：

### 直接安装wiki给的固件

#### nrfutil 

首先安装[nrfutil](https://infocenter.nordicsemi.com/pdf/nrfutil_v1.3.pdf) 点击这里有详细的说明具体就是：

```python
pip install nrfutil
```

之后按照wiki中所写去下载正确的bootloader，https://github.com/makerdiary/nrf52840-mdk-usb-dongle/tree/master/firmware/open_bootloader ，wiki和我告诉你目前就那一个对的或者说就是这个nosd_signed的版本，用错了就不对了，目前是这样，我试过，之后到下载下来的文件夹下面输入：

```bash
nrfutil dfu usb-serial -pkg uf2_bootloader-0.2.13-44-gb2b4284-nosd_signed.zip -p <your-serial-port-name>
```

这个后面的`<your-serial-port-name>` 端口要根据自己情况更换，建议安装[nRF connect](https://www.nordicsemi.com/Software-and-tools/Development-Tools/nRF-Connect-for-desktop) ，之后打开软件，按住板子上的按钮插入电脑，这就是进入DFU模式，选择下图中的Programmer，打开之后在左上角选择设备就可以看到大致的端口位置，mac上tab过去就行了。

![nRF connect](https://cdn.jsdelivr.net/gh/viewv/Pico/img/20200218223448.png) 

不出意外就刷入bootloader了，之后拔下来不要按着按钮插进去，之后就可以发现有一个盘，就像U盘一下，之后下载wiki给的[固件](https://github.com/makerdiary/nrf52840-mdk-usb-dongle/tree/master/firmware/OpenSK) 只需要那个u2f版本的，直接拷贝放到这个盘下面就可以了，会自动加载，就成功了，可以去 https://webauthn.io 测试一下，需要的时候就会闪多彩光，之后按一下就认证成功了，这种办法真的好简单，想着要是没有这个jlink感觉爆炸。

### 编译一个固件再刷

这里Mac有很多暗坑，真的烦，Linux想会稳很多，Linux直接敲命令就行了，这里顺便给出跳坑的信息。

本部分不保证成功，硬件这玩意还可怕在可能会玩坏，小心啊各位，我实际上到最后一步刷怂了，用的官方的固件。不过体验这个过程还是好的。

#### 准备

针对Mac，首先你要干下面这几个事情：

```bash
brew install coreutils
brew install bash
```

之后打开你的大概率zshrc或者其他shell的环境配置文件将：

`PATH="/usr/local/opt/coreutils/libexec/gnubin:$PATH"`

差不多这样的增加到你的PATH里面。

做完了上面的工作应该就没啥问题了。

之后安装rust的环境：

```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

很简单是不是？

#### 开始

这里是他们修改过的[OpenSK](https://github.com/makerdiary/OpenSK) clone 到本地，进去目录之后开始尝试输入：

```bash
./setup.sh
```

我是遇到错误了，找不到版本，nightly那个报错，之后回去看了一眼上游是怎么啥样，上游发现是已经修改成了nightly-2020-02-03，于是我搜索了所有报错版本在vscode中，替换成nightly-2020-02-03，rust更新看着很快，以后固件还会变，这样第一个问题解决了，应该也就成功了。

之后开始build Tock OS

```bash
board=nrf52840_mdk_usb_dongle ./deploy.sh os
```

应该不会有什么大问题，之后去：

third_party/tock/boards/nordic/nrf52840_mdk_usb_dongle/target/thumbv7em-none-eabi/release/

这个位置把后缀为hex的文件拷贝出来到一个方便的地方放着，改名字叫tock-os.hex。

之后build OpenSK application

```bash
board=nrf52840_mdk_usb_dongle ./deploy.sh app	
```

成功之后去target/tab/文件夹下面找到padding.bin和cortex-m4.tbf这两个文件拷贝到你选择哪个方便的地方。

#### 制作固件

搜索 [IntelHex](https://wiki.makerdiary.com/nrf52840-mdk-usb-dongle/opensk/building/) ，讲整个库clone下来，在里面应该能找到那几个python文件，拷贝出来放到你的方便的地方，之后就可以运行wiki下面的那两条python指令：

```bash
python bin2hex.py --offset=0x30000 padding.bin padding.hex
python bin2hex.py --offset=0x40000 cortex-m4.tbf cortex-m4.hex
```

之后合并：

```python
python hexmerge.py -o opensk_all_in_one.hex tock-os.hex padding.hex cortex-m4.hex
```

下一步就稍微有点迷惑，什么是uf2conv.py，这个没找到后来就上网搜到了一个uf2conv.py，看着像，之后运行了也没事，我就认为是对的：

```bash
python uf2conv.py -c -f 0xada52840 -o opensk_all_in_one.uf2 opensk_all_in_one.hex
```

#### 刷入

这个地方实际上你还是需要上面的部分，将bootloader修改成上文说的u什么bootloader，之后插上去就会发现这个盘，把opensk_all_in_one.uf2拷贝进去就可了，如果成功的话，你会发现下图所示的OpenSK设备：

![OpenSK USB In System info](https://cdn.jsdelivr.net/gh/viewv/Pico/img/20200218230419.png)

这样你就成功了。

## 总结

这样你就有一个设备了，可惜到是虽然这个板子其实支持蓝牙，nfc啥的，但是实际上目前也就能用个usb，有时候不知道是fido本身现状就这样还是啥的有时候不爽，要说价格可能还是有优势，其实过程还是好玩的，对了，这是第一期，后面如果东西到手可能会有第二期，更低成本实现个U2F啥的，不过我忙又懒。