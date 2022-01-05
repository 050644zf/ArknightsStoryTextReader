import openpyxl
import json

#the file path to roguelike_table.json
path = "ArknightsGameData\\zh_CN\\gamedata\\excel\\roguelike_topic_table.json"

#the properties of relics in the out put
#items = ['id','name','usage','description','rarity','unlockCondDesc']
items = ['id', 'taskName', 'taskClass', 'desc', 'tokenRewardNum']

if __name__ == "__main__":
    with open(path, encoding='utf-8') as relicsfile:
        relics = json.load(relicsfile)['details']['rogue_1']['monthMission']

    wb = openpyxl.Workbook()

    sheets=wb.active

    sheets.append(items)
    
    for relic in relics:
        sheet = []
        for item in items:
            sheet.append(relic[item])

        sheets.append(sheet)

    wb.save('is_missions.xlsx')
        
            
