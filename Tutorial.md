# Tutorial

Assuming you have downloaded the ArknightsGameData repository from [Kengxxiao/ArknightsGameData](https://github.com/Kengxxiao/ArknightsGameData) at a local path: `D:\ArknightsGameData` 

Open powershell (Recommended) or cmd at the folder of this repo

## Get the help message:

The first path is the path to the script

```bash
py .\xlsxconvert.py -h
```

## List all event in en_US:

The second path is the path to the GameData

Use `-E` to list all event in corresponding server.

Use `-L [Langcode]` to config the server (default is `zh_CN`, so you can skip this if you're working on `zh_CN` server)

```bash
 py .\xlsxconvert.py D:\ArknightsGameData -E -L en_US
```

possible output:

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

## Export a specific event, and enable Code Comment & Story Info output

From the event list above we can get the eventid, for example `1stact` is the eventid of  `Grani and the Knights' Treasure`, so we put it after `-e` command

`-c` enable Code Comment output

`-i` enable Story Info output in menu

```bash
py .\xlsxconvert.py D:\ArknightsGameData -e 1stact -L en_US -c -i
```

or you can also use the index instad of eventid, but keep in mind that the index maybe changed

```bash
py .\xlsxconvert.py D:\ArknightsGameData -e 0 -L en_US -c -i
```

possible output:

```bash
==========================
Status:
     Character CG output: False
     Code Comment output: True
     Story Info output: True
==========================
27 txt files dectected
Txt file ui_act5d0_firstenter.txt exported (1/27)
...
Exported to act5d0_Code of Brawl.xlsx
```

Then you can find the file named `act5d0_Code of Brawl.xlsx` under the same folder

## Export file(s) in given path

Sometimes you don't need to download the whole GameData folder, you can also config the second path to the path of raw story file:

```bash
py .\xlsxconvert.py D:\ArknightsGameData\en_US\gamedata\story\activities\act6d5\level_act6d5_st03.txt
```

which will export the file you chose

or config the second path to the folder path of raw story file:

```bash
py .\xlsxconvert.py D:\ArknightsGameData\en_US\gamedata\story\activities\act6d5\
```

which will export all file in this folder

**However, this method won't be able to generate menu and story info.**
