from ast import arg
from itertools import count
import re
import argparse
from pathlib import Path
import os
import func
import json

prRe = r"^(?:\[(?P<prop>\w+).*?\])?(?P<content>.*)$"
pmRe = r"(?:(?P<attr>\w+)=(?P<value>\".+?\"|[\d\.]+|\w+),?\s{,3})"
characters = []
codes = []
characterFlag = False
commentFlag = False
infoFlag = False



def reader(story):
    
    if isinstance(story,func.Story):
        with open(story.storyTxt, encoding='utf-8') as txtFile:
            rawstorytext = txtFile.read()
        storydict = {}
        storydict['lang'] = story.lang
        storydict['eventid'] = story.eventid
        storydict['eventName'] = story.eventName
        storydict['entryType'] = story.entryType
        storydict['storyCode'] = story.storyCode
        storydict['avgTag'] = story.avgTag
        storydict['storyName'] = story.storyName
        counter = 0
        COUNTER_FLAG = True
        with open(story.storyInfo, encoding='utf-8') as txtFile:
            storydict['storyInfo'] = txtFile.read()
    if isinstance(story, str):
        rawstorytext = story
        storydict = {}
        COUNTER_FLAG = False

    OPTIONTRACE = True
    rawstorylist = rawstorytext.split('\n')
    storylines = len(rawstorylist)
    rawlist = []
    currentOptions = {}
    usedOptions = {}
    multiline_buffer = []
    last_multiline = None

    for (index, line) in enumerate(rawstorylist):
        d = {}
        d['id'] = index
        if '//' in line:
            d['prop'] = 'Comment'
            d['attributes'] = {}
            d['attributes']['value'] = line.lstrip('//')
            continue
        prop,content = re.match(prRe, line).group('prop','content')
        d['prop'] = prop
        d['attributes'] = {}
        parameters = re.findall(pmRe, line)
        if prop == 'name' or prop == '' or prop == None:
            d['prop'] = 'name'
            d['attributes']['content'] = content
            if COUNTER_FLAG:
                counter += len(content.split()) if story.lang == 'en_US' else len(content)
        

            


        if len(parameters):
            for (attr, value) in parameters:
                try:
                    value = float(value)
                except ValueError:
                    if value[0] == '"':
                        value = value[1:-1]
                d['attributes'][attr] = value
                if attr == 'image':
                    imgtype = prop.lower()
                    if imgtype == "backgroundtween":
                        imgtype = "background"
                    elif imgtype == 'showitem':
                        imgtype = 'item'
        
        if prop == 'multiline':
            d['attributes']['content'] = content
            multiline_buffer.append(content)
            if COUNTER_FLAG:
                counter += len(content.split()) if story.lang == 'en_US' else len(content)
            last_multiline = d
            if d['attributes'].get('end') == 'true':
                joined_line = ''.join(multiline_buffer)
                multiline_buffer = []
                d['attributes']['joined'] = joined_line


        if prop == 'Decision':
            d['targetLine'] = {}
            options = d['attributes']['options'].split(';')
            if COUNTER_FLAG:
                for option in options:
                    counter += len(content.split()) if story.lang == 'en_US' else len(content)
            values = [f"option{value}" for value in d['attributes']['values'].split(';')]
            if OPTIONTRACE:
                for idx,value in enumerate(values[:len(options)]):
                    currentOptions[value] = {'option':options[idx], 'Decision':index}
                    d['targetLine'][value] = ''

        if prop == 'Predicate':
            if not d['attributes'].get('references'):
                d['attributes']['references'] = ';'.join([i.lstrip('option') for i in usedOptions.keys()])
            if OPTIONTRACE:
                try:
                    for ref in d['attributes']['references'].split(';'):
                        if f'option{ref}' in currentOptions:
                            dec = currentOptions[f'option{ref}']['Decision']
                            rawlist[dec]['targetLine'][f'option{ref}'] = f'line{index}'
                            del currentOptions[f'option{ref}']
                            usedOptions[f'option{ref}'] = f'line{index}'
                            d['endOfOpt'] = False
                        else:
                            lastPredicate = int(usedOptions[f'option{ref}'].lstrip('line'))
                            rawlist[lastPredicate]['targetLine'] = f'line{index}'
                            d['endOfOpt'] = True
                            del usedOptions[f'option{ref}']
                except:
                    print(f'Disable Optiontrace From Line {index}!')
                    OPTIONTRACE = False

        if d['attributes'].get('text'):
            if COUNTER_FLAG:
                counter += len(content.split()) if story.lang == 'en_US' else len(content)
        
        
        rawlist.append(d)

    storydict['storyList'] = rawlist
    storydict['OPTIONTRACE'] = OPTIONTRACE
    if COUNTER_FLAG:
        return storydict, counter
    else:
        return storydict


if __name__=='__main__':

    parser = argparse.ArgumentParser()
    parser.add_argument('--all',action='store_true',help="Update all json file or not")

    args = parser.parse_args()

    UPDATE_ALL = args.all



    import subprocess
    import time
    import urllib.request
    subprocess.run('git config --global user.email "050644zf@outlook.com"',shell=True)
    subprocess.run('git config --global user.name "Nightsky"', shell=True)
    if not Path('ArknightsStoryJson').is_dir():
        subprocess.run('git clone https://github.com/050644zf/ArknightsStoryJson.git', shell=True)

    with open('ArknightsStoryJson/log.json', encoding='utf-8') as logFile:
        logData = json.load(logFile)

    
    if not UPDATE_ALL:
        with urllib.request.urlopen('https://api.github.com/repos/Kengxxiao/ArknightsGameData/commits') as f:
            content = f.read()
        content = json.loads(content)
        latest = content[0]["commit"]["author"]["date"]
        latest = time.mktime(time.strptime(latest,"%Y-%m-%dT%H:%M:%SZ"))
        if latest>logData["latestCommitTime"]:
            logData["latestCommitTime"] = latest
            with open('ArknightsStoryJson/log.json','w', encoding='utf-8') as logFile:
                json.dump(logData,logFile)
        else:
            print("No new commit detected from ArknightsGameData, skip the update.")
            exit()


    # if not Path('ArknightsGameData').is_dir():
    #     subprocess.run('git clone https://github.com/Kengxxiao/ArknightsGameData.git', shell=True)

    # else:
    #     os.chdir('ArknightsGameData')
    #     subprocess.run('git fetch', shell=True)
    #     subprocess.run('git pull', shell=True)
    
    #     os.chdir('..')


    langs = [i.stem for i in Path('ArknightsGameData').iterdir() if i.is_dir() and not '.' in i.name]
    dataPath = Path('ArknightsGameData')
    jsonDataPath = Path('ArknightsStoryJson')

    for lang in langs:
        print(f'Server: {lang}')
        events = func.getEvents(dataPath, lang)
        with open(f'ArknightsStoryJson/{lang}/storyinfo.json',encoding='utf-8') as jsonFile:
            storyInfo = json.load(jsonFile)

        with open(f'ArknightsStoryJson/{lang}/wordcount.json',encoding='utf-8') as jsonFile:
            wordCount = json.load(jsonFile)
        
        for event in events:
            if not wordCount.get(event.eventid):
                wordCount[event.eventid] = {}

            for story in event:
                storyPath = Path(story.storyTxt)
                jsonPath = jsonDataPath/storyPath.relative_to(dataPath).parent/Path(str(storyPath.stem)+'.json')
                if jsonPath.exists() and not UPDATE_ALL:
                    continue


                jsonPath.parent.mkdir(exist_ok=True, parents=True)
                try:
                    storyJson,counter = reader(story)
                    storyInfo[str(story.f)] = storyJson['storyInfo']
                except FileNotFoundError:
                    continue

                
                with open(jsonPath, 'w', encoding='utf-8') as jsonFile:
                    json.dump(storyJson,jsonFile, indent=4, ensure_ascii=False)
                    print(f'File {jsonPath} exported!')
                
                wordCount[event.eventid][str(story.f)] = counter

        with open(f'ArknightsGameData/{lang}/gamedata/excel/character_table.json', encoding='utf-8') as jsonFile:
            characterData = json.load(jsonFile)

        charDict = {}
        for cid in characterData:
            if cid.split('_')[0] == 'char':
                cidx = cid.split('_')[1]
                cin = cid.split('_')[2]
                charDict[cin] = {'name':characterData[cid]['name'],'id':cidx}

        with open(f'ArknightsStoryJson/{lang}/chardict.json','w',encoding='utf-8') as jsonFile:
            json.dump(charDict, jsonFile, indent=4, ensure_ascii=False)
            print(f'Character Data exported!')



        with open(f'ArknightsStoryJson/{lang}/storyinfo.json','w',encoding='utf-8') as jsonFile:
            json.dump(storyInfo, jsonFile, indent=4, ensure_ascii=False)
            print(f'StoryInfo Data exported!')

        with open(f'ArknightsStoryJson/{lang}/wordcount.json','w',encoding='utf-8') as jsonFile:
            json.dump(wordCount, jsonFile, indent=4, ensure_ascii=False)
            print(f'WordCount Data exported!')


    
    

    os.chdir('ArknightsStoryJson')
    subprocess.run('git fetch', shell=True)
    subprocess.run('git pull', shell=True)
    subprocess.run('git add -A', shell=True)
    subprocess.run(f'git commit -m {time.strftime("%Y%m%d")}', shell=True)
    print(f'Commit {time.strftime("%Y%m%d")} has created!')
    #subprocess.run('git push')
    os.chdir('..')

    print('Update Success!')


    
                

