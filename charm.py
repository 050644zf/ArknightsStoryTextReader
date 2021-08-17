import json
import openpyxl as xl

with open('ArknightsGameData/zh_CN/gamedata/excel/charm_table.json', encoding='utf-8') as jsonFile:
    data = json.load(jsonFile)['charmList']

wb = xl.Workbook()
ws = wb.active

prop = ['id', 'name', 'itemUsage', 'itemDesc', 'itemObtainApproach', 'specialObtainApproach', 'desc', 'rarity', 'price', 'rune']

ws.append(prop)

for charm in data:
    c = charm
    info = []
    for p in prop[:-1]:
        info.append(c[p])

    info.append(c['runeData']['description'])
    ws.append(info)

wb.save('charm.xlsx')

