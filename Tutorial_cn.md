# 教程

假设您已经从 [Kengxxiao/ArknightsGameData](https://github.com/Kengxxiao/ArknightsGameData) 下载了GameData文件夹并放置于： `D:\ArknightsGameData` 

在本repo文件夹打开 Powershell (推荐) 或 CMD

## 得到帮助消息：

第一个路径是程序路径

```bash
py .\xlsxconvert.py -h
```

## 列出en_US服务器下的所有 event ：

第二个路径是 GameData 的路径

使用 `-E` 来列出对应服务器下的所有 event

使用 `-L [语言代码]` 来配置对应的服务器 (默认值为 `zh_CN`，所以你可以不写这个来选择国服)

```bash
 py .\xlsxconvert.py D:\ArknightsGameData -E -L en_US
```

可能的输出：

```bash
List of Events in en_US:
| Index: Eventid        Eventname
===ACTIVITY===
| 0 : 1stact               Grani and the Knights' Treasure
...
===MAINLINE===
| 5 : main_0               Evil Time, Part 1
...
```

## 导出特定活动的剧情，并启用代码注释输出和故事简介输出

从上述活动列表我们可以找到对应的 eventid ，例如 `1stact` 是活动 `Grani and the Knights' Treasure` 的 eventid ，所以我们将它放在 `-e` 指令的后面

`-c` 启用代码注释输出

`-i` 启用故事简介输出

```bash
py .\xlsxconvert.py D:\ArknightsGameData -e 1stact -L en_US -c -i
```

或者你可以用对应活动的索引，但切记索引是会变的

```bash
py .\xlsxconvert.py D:\ArknightsGameData -e 0 -L en_US -c -i
```

可能的输出：

```bash
==========================
Status:
     Character CG output: False
     Code Comment output: True
     Story Info output: True
==========================
27 txt files dectected
...
Exported to 1stact_Grani and the Knights' Treasure.xlsx
```

接下来您就可以在相同文件夹下找到名为 `1stact_Grani and the Knights' Treasure.xlsx` 的导出文件了

## 导出给定路径的文件/文件夹

有时您并不需要将整个 GameData 下载下来，您可能只需要导出一个特定的文件：

```bash
py .\xlsxconvert.py D:\ArknightsGameData\en_US\gamedata\story\activities\act6d5\level_act6d5_st03.txt
```

或者一个文件夹下的所有文件：

```bash
py .\xlsxconvert.py D:\ArknightsGameData\en_US\gamedata\story\activities\act6d5\
```

**直接指定路径的方式并不能生成目录和故事简介**
