---
layout: article
title: vscode c++ Debug 设置与问题修复
tags: vscode cpp c++ debug 方法
mode: immersive
key: q11
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
    src: https://cdn.jsdelivr.net/gh/viewv/Pico/img/20200113223203.jpg
---

# vscode c++ Debug 设置与问题修复

既然计划去干一次考验，就要写写cpp，今天写了一个错误的程序，之后想vscode随手调试一下，但是发现，诶，没那么容易啊，就去上网搜了一下，配置了一下文件，顺便又跳了一个坑，最新Mac OS的问题，本质上可能是苹果那里的修改，vscode这里也没有进行bug的修复，让我折腾着了一会儿才算是用个方法修复了。

要想舒服的进行简单的debug在vscode里针对cpp，需要配置好下面三个文件，装那个官方的cpp插件我想看见这篇文章的人都已经装了。

## c_cpp_properties.json

这个文件应该是用来声明头文件等等的地方的，如果你没有，可以到.vscode文件夹下面新建一个，也可以在C++插件到设置里面新建一份配置，还有个我懒得不行的方法，我故意写了一个错误的引用头文件，之后点击灯泡，点配置它就帮我新建了一份，下面是我的这份文件，感觉只要是mac就可以这样用：

```json
{
    "configurations": [{
            "name": "maclang",
            "includePath": [
                "${workspaceFolder}/**"
            ],
            "defines": [],
            "macFrameworkPath": [
                "/System/Library/Frameworks",
                "/Library/Frameworks",
                "${workspaceFolder}/**",
                "/Applications/Xcode.app/Contents/Developer/Platforms/MacOSX.platform/Developer/SDKs/MacOSX.sdk/System/Library/Frameworks"
            ],
            "compilerPath": "/usr/bin/clang",
            "cStandard": "c11",
            "cppStandard": "c++17",
            "intelliSenseMode": "clang-x64",
            "browse": {
                "path": [
                    "${workspaceFolder}"
                ],
                "limitSymbolsToIncludedHeaders": true,
                "databaseFilename": ""
            }
        },
        {
            "name": "macg++",
            "includePath": [
                "${workspaceFolder}/**"
            ],
            "defines": [],
            "macFrameworkPath": [
                "/System/Library/Frameworks",
                "/Library/Frameworks",
                "${workspaceFolder}/**",
                "/Applications/Xcode.app/Contents/Developer/Platforms/MacOSX.platform/Developer/SDKs/MacOSX.sdk/System/Library/Frameworks"
            ],
            "compilerPath": "/usr/bin/g++",
            "cStandard": "c11",
            "cppStandard": "c++17",
            "intelliSenseMode": "clang-x64",
            "browse": {
                "path": [
                    "${workspaceFolder}"
                ],
                "limitSymbolsToIncludedHeaders": true,
                "databaseFilename": ""
            }
        }
    ],
    "version": 4
}
```

我写了两个配置一个是clang一个是g++，感觉就是这样吧，平时也不知道用的是那个。

## launch.json

这个算是启动文件，这个地方就有坑了，按照网上一般的写法（这里我给官方示例），是这样的：

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "(lldb) Launch",
      "type": "cppdbg",
      "request": "launch",
      "program": "${workspaceFolder}/helloworld.out",
      "args": [],
      "stopAtEntry": true,
      "cwd": "${workspaceFolder}",
      "environment": [],
      "externalConsole": true,
      "MIMode": "lldb",
      "logging": {
        "trace": true,
        "traceResponse": true,
        "engineLogging": true
      }
    }
  ]
}
```

之后我也这样写了，发现怎么都进不去断点，程序执行一下过去就过去了，就邪门，于是谷歌了一下为什么进不去断点，限定mac os最近都版本，发现github上面果然有人反应这个[问题](https://github.com/microsoft/vscode-cpptools/issues/3829)。有兴趣大家可以看一下，我读了一下，有些人说装一个叫 `CodeLLDB` 的插件可以解决问题，我就去插件管理那里搜了一下，的确有这个插件，之后安装，怪慢我就去浏览器下载之后手动安装了。

按照插件的说明，我简单修改了一下配置文件，总算能进去断点了：

```json
{
    // 使用 IntelliSense 了解相关属性。 
    // 悬停以查看现有属性的描述。
    // 欲了解更多信息，请访问: https://go.microsoft.com/fwlink/?linkid=830387
    "version": "0.2.0",
    "configurations": [{
            "name": "(lldb) Launch",
            "type": "lldb",
            "request": "launch",
            "program": "${fileDirname}/${fileBasenameNoExtension}.out",
            "args": [],
            "cwd": "${workspaceFolder}",
            //"stopAtEntry": true, // if true then stop at the main entry (function)
            //"environment": [],
            //"externalConsole": true,
            //"MIMode": "lldb",
            "terminal": "integrated",
            "preLaunchTask": "build cpp",
        },
        {
            "name": "Python: Current File",
            "type": "python",
            "request": "launch",
            "stopOnEntry": true,
            "pythonPath": "${config:python.pythonPath}",
            "program": "${file}",
            "cwd": "${workspaceFolder}",
            "env": {},
            "envFile": "${workspaceFolder}/.env",
            // "debugOptions": [
            //     "RedirectOutput"
            // ]
        },
        {
            "name": "Python: Terminal (integrated)",
            "type": "python",
            "request": "launch",
            "stopOnEntry": true,
            "pythonPath": "${config:python.pythonPath}",
            "program": "${file}",
            "cwd": "",
            "console": "integratedTerminal",
            "env": {},
            "envFile": "${workspaceFolder}/.env",
            "internalConsoleOptions": "neverOpen"
        },
        {
            "name": "Python: Terminal (external)",
            "type": "python",
            "request": "launch",
            "stopOnEntry": true,
            "pythonPath": "${config:python.pythonPath}",
            "program": "${file}",
            "cwd": "",
            "console": "externalTerminal",
            "env": {},
            "envFile": "${workspaceFolder}/.env",
            "internalConsoleOptions": "neverOpen"
        }
    ]
}
```

请忽略python那个地方，我懒得删除那些了，主要是看(lldb) Launch这个地方，其实看起来就是`"type": "lldb"	` 这个地方修改了，之后选择终端的地方也需要修改一下，我这里就用内置的终端了。最后一行`"preLaunchTask": "build cpp"`这个地方是在开始之前build一下这个cpp文件，这里这个部分是在tasks.json文件下面配置的。

## tasks.json

这个地方就是把这个cpp文件编译了一下：

```json
{
    // See https://go.microsoft.com/fwlink/?LinkId=733558
    // for the documentation about the tasks.json format
    "version": "2.0.0",
    "tasks": [{
        "type": "shell",
        "label": "build cpp",
        "command": "g++",
        "args": [
            "${file}",
            "-o",
            "${fileDirname}/${fileBasenameNoExtension}.out",
            "-g"
        ],
        "group": {
            "kind": "build",
            "isDefault": true
        },
        "problemMatcher": [
            "$gcc"
        ]
    }]
}
```

这样我就成功的debug起来了，好像官方还没有修改这个问题，按照官方wiki和网上的旧的是不大能进入断点的，写这篇文章来说一下我踩的这个坑。不过我这博客流量小啊，看见都是有缘人。

![zibi](https://i.loli.net/2020/01/13/Lo4GhKQUDE7Nfzd.png)

