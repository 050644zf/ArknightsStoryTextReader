# 明日方舟剧情文本阅读器

一个用于将明日方舟原始剧情数据转换为其它可读格式如Excel表格、csv等的简单Python程序

***New:*** 在 [这里](https://050644zf.github.io/ArknightsStoryTextReader/index2.html) 查看ASTR的网页应用！

您可以在[Kengxxiao/ArknightsGameData](https://github.com/Kengxxiao/ArknightsGameData)找到原始数据

已在**国服/日服/EN服/韩服**进行测试

仅支持剧情，教程、教学关卡以及战斗中的弹出对话暂时不受支持

## 教程

在[这里](https://github.com/050644zf/ArknightsStoryReader/blob/master/Tutorial_cn.md)查看关于本程序的教程

## 使用方法

### **New: 方式 1 (推荐, 需要 openpyxl 模块)**

```bash
py xlsxconvert.py [-h] [-C] [-c] [-L Langcode] [-E] [-e Eventid] [path]
```

将原始剧情文件转xlsx格式

**位置变量:**
  `path`             文件路径或文件夹路径，如果没有提供`-E`或`-e`选项，导出对应文件或对应文件夹下的所有文件

**可选变量:**

  `-h`, `--help`       显示帮助信息并退出
  
  `-c`, `--comment`    显示原文件代码注释（yj可能会藏一些东西进去）

  `-L Langcode`, `--Lang Langcode`    配置目标服务器, 默认为 zh_CN （国服）

  `-E`, `--EventList`       显示对应服务器下的可用活动，以 索引: eventid 的形式列出, 配置 path 来修改 ArknightsGameData 的路径 (默认为./ArknightsGameData)

  `-e Eventid`, `--event Eventid`   导出对应活动下所有剧情, 配置 path 来修改 ArknightsGameData 的路径 (默认为./ArknightsGameData)。 可以从 --EventList 命令获得可用的 eventid 或索引

  `-i`, `--info`            在目录中显示剧情简介

**依赖 openpyxl 模块**, 如果您还未安装 openpyxl，请先运行以下命令

```bash
pip install openpyxl
```
