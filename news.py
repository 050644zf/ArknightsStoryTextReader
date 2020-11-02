import json

newsPath = 'ArknightsGameData\\zh_CN\\gamedata\\excel\\activity_table.json'

savePath = 'news.txt'

newtext = []

with open(newsPath,encoding='utf-8') as rawnewsfile:
    rawnews = json.load(rawnewsfile)['activity']['TYPE_ACT9D0']['act13d5']['newsInfoList']
    for article in rawnews:
        newtext.append(article)
        newtext.append(rawnews[article]["styleInfo"]["typeId"]+' '+rawnews[article]["styleInfo"]["typeName"])
        newtext.append(rawnews[article]["newsTitle"])
        newtext.append(rawnews[article]["newsFrom"]+'\n')
        newtext.append(rawnews[article]["newsText"]+'\n\n')


with open(savePath,'w',encoding='utf-8') as newstextfile:
    newstextfile.write('\n'.join(newtext))