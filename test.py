import json
import glob

ep9 = glob.glob('ArknightsStoryJson\zh_CN\gamedata\story\obt\main\level_main_09-*.json')

alltext = ''

for storyPath in ep9:
    with open(storyPath, encoding='utf-8') as storyFile:
        storyLines = json.load(storyFile)['storyList']
        for line in storyLines:
            if line['prop'] == 'name':
                alltext = alltext + line['attributes']['content']
            if line['prop'] == 'Subtitle':
                alltext = alltext + line['attributes']['text']
            if line['prop'] == 'Decision':
                alltext = alltext + line['attributes']['options']

with open('ep9.txt','w',encoding='utf-8') as f:
    f.write(alltext)
