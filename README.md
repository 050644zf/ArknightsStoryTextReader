# Arknights Story Text Reader

[中文README](https://github.com/050644zf/ArknightsStoryReader/blob/master/README_cn.md)

A simple python program that help you convert Arknights raw story data into other readable format like Excel or csv.

### ***New:*** **Access the webpage application of ASTR [here](https://050644zf.github.io/ArknightsStoryTextReader/index2.html)!**

Web Version Build Status ![](https://api.travis-ci.com/050644zf/ArknightsStoryTextReader.svg)

You can find raw story data in [Kengxxiao/ArknightsGameData](https://github.com/Kengxxiao/ArknightsGameData)

**CN/JP/EN/KR** server files tested

Only support story. Guides, tutorial and pop-up msg in battle are not supported yet.

## Tutorial

Read the tutorial about the script here: [Tutorial](https://github.com/050644zf/ArknightsStoryReader/blob/master/Tutorial.md)

## usage of story reader

### **New: Method 1 (Recommended, require openpyxl module)**

```bash
py xlsxconvert.py [-h] [-c] [-L Langcode] [-E] [-e Eventid] [path]
```

Convert arknights story raw data into xlsx file.

**positional arguments:**
  `path`             The file path or folder path. If no -E or -e option provided, convert all file in path or selected path to xlsx file.

**optional arguments:**

  `-h`, `--help`       show this help message and exit
  
  `-c`, `--comment`    Show Code Comment in raw story file

  `-L Langcode`, `--Lang Langcode`    Config the language of the following command, default is zh_CN

  `-E`, `--EventList`       Show available index: eventid in corresponding language, config the path to change the ArknightsGameData path from default (./ArknightsGameData)

  `-e Eventid`, `--event Eventid`   Export all stories in corresponding index or eventid, config the path to change the ArknightsGameData path from default (./ArknightsGameData). You can get available index or eventid from --EventList command.

  `-i`, `--info`            Show story info in menu

**Require openpyxl module**, if you haven't installed openpyxl, run the following command first

```bash
pip install openpyxl
```

====

### **Method 2 (No extra module required, deprecated)**

```bash
py csvconvert.py path [path ...]
```


Convert arknights story raw data into csv file.

positional arguments:
  `path`        The filepaths or folder of raw story file, separate with space, if the path is folder path, it will try to convert all .txt files into csv

## usage of relic reader

config the `path` in the `relic.py` and the properties you want to export and run the program directly

## v2.3.1

- Add `multiline` property support in EP10
- Fix a bug that fail to export file

## v2.3

- Add `Sticker` property support in EP10

## v2.2

- Test the auto updater

## v2.1.1

- Fixed some issues

## v2.1.0

- Add disable tracing option feature when exception occured to handle those story file that don't have a "correct" option predicate.

## v2.0.3

- Fixed some issues

## v2.0.2

- Fixed some issues
- Enable pytest for `xlsxconvert.py` to prevent from making stupid mistake and pushing buggy code again

## v2.0.1

- Fixed some issues

## v2.0.0

- Add Converting into Json Feature (under development) in `jsonconvert.py`
- Rewrote the code of `xlsxconvert.py` based on the new json feature, completely get rid of a bunch of shitty regular expressions
- Add a column of line index before each line, the index column is hidden in sheets

## v1.12.1

Replace all backslash in program with slash to allow code work on Linux system

## v1.12.0

Add square bracket in option text to match the ingame log style

## v1.11.6

Fix the incorrect cells merging in menu of storyset

## v1.11.5

Fix the issue that missing heading or ending lines

Fix the issue that can't recognize storyset event in event list

## v1.11.4

Update tutorial and CN version README

Fix the hyperlink properties (credit: VaDiM#5824)

Remove unnecessary codes

Some minor bug fixes

## v1.11.1

Add an option to export all mainline stories at once

Add an option to show story info in menu

## v1.11.0

Add new feature to export story with given eventid and sorted in ingame order.

Add new option to switch to different language server

Automatically generate menu (didn't work for googlesheet currently)

Automatically apply text warpping and column width adjustment

## v1.10.1

Fix an issue of single file mode

## v1.10.0

Now support `Subtitle` type text in ch8, presented as bold text with blank rows around in sheet

Add `news.py` to export rawtext of Rosebud News in Maria Nearl event

## v1.9.3

Add colored font in command line output (Based on Powershell scheme on Windows 10)

## v1.9.2

Fix the issue that the regex can't match line without space

## v1.9.1

Add command line output to help user locate the problem

## v1.9.0

Add a new python program `relic.py` to export the info about the relics in Integrated Strategies

## v1.8.7

Fix the issue that the regex can't match other Character syntax

Change the CG source of csvconvert.py to aceship toolbox

## v1.8

Fix the issue that the regex misread `BackgroundTween` as an image type (Credit: Biscuits#4183)

Add single file support to `xlsxconvert.py`

Add optional args to show Character CG file names or Code Comment in raw story files (Some comments in CN chapter 7 are very interesting you know)

## v1.7

Fix the issue that a syntax error in raw story txt cause an unhandled exception

Now automatically record all characters' name appear in the whole textsheet and append them to the end of the textsheet named "Characters" (Method 1 only)

## v1.6

New command to convert all raw story files into one xlsx file.

Now automatically link the image and background to the [Aceship Toolbox CG Gallery](https://aceship.github.io/AN-EN-Tags/akgallery.html)
  
## v1.5

Now automatically link the image and background to the mooncell wiki (doesn't support for earlier event like Grani)

Now support folder path, which will convert all .txt file in the folder

## v1.4

Fix some issues

## v1.3

Now support multiple arguments

## v1.2

Fix the encoding issue, now will force encode with utf-8 if UnicodeEncodeError orrured, so there may have some decoding problem when open the csv files with Microsoft Excel.

## v1.1

Fix the regex to fully match the image in EN server

## v1.0 CSV Convertor

initial release

**To-do list:** (maybe never)

- Prettify the output into html or anything looks better.
