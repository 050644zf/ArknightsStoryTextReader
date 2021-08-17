import json
import openpyxl as xl

with open('ArknightsGameData/zh_CN/gamedata/excel/uniequip_table.json', encoding='utf-8') as jsonFile:
    data = json.load(jsonFile)

wb = xl.Workbook()
ws = wb.active

atype = data['subProfDict']

ws.append(['subProfessionCatagory','subProfessionName','subProfessionId'])

for t in atype:
    at = atype[t]
    ws.append([at['subProfessionCatagory'],at['subProfessionName'],at['subProfessionId']])

wb.save('archetype')