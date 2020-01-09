# Arknights Story Reader

A simple python program that help you convert Arknights raw story data into other readable format.

You can find raw story data in [Kengxxiao/ArknightsGameData](https://github.com/Kengxxiao/ArknightsGameData)

**CN/JP/EN server files tested**, UnicodeEncodeError occoured when converting KR server files. Waiting for fixing.
Only support story. Guides, tutorial and pop-up msg in battle are not supported yet.

## v1.2
Fix the encoding issue, now will force encode with utf-8 if UnicodeEncodeError orrured, so there may have some coding problem when open the csv files with Microsoft Excel.

## v1.1 
Fix the regex to fully match the image in EN server

## v1.0 CSV Convertor 
usage:
```
py csvconvert.py p
```

Convert arknights story raw data into csv file.

positional arguments:
  `p`           The path of raw story file



**To-do list: (maybe never)**
- json convertor
- link the cg or background image to [Mooncell Wiki](http://ak.mooncell.wiki/w/%E5%89%A7%E6%83%85%E8%B5%84%E6%BA%90%E4%B8%80%E8%A7%88) or [Aceship Toolbox](https://aceship.github.io/AN-EN-Tags/akgallery.html)
- Prettify the output into html or anything looks better.
