import openpyxl as xl
import re
import argparse
from pathlib import Path
import os
from func import getFile
import func
from openpyxl.worksheet.hyperlink import Hyperlink
import json

prRe = r"^(?:\[(?P<prop>\w+).*?\])?(?P<content>.*)$"
pmRe = r"(?:(?P<attr>\w+)=(?P<value>\".+?\"|[\d\.]+|\w+),?\s{,3})"
characters = []
codes = []
characterFlag = False
commentFlag = False
infoFlag = False

def reader(rawstorytext:str):
    OPTIONTRACE = True
    rawstorylist = rawstorytext.split('\n')
    storylines = len(rawstorylist)
    rawlist = []
    currentOptions = {}
    usedOptions = {}
    for (index, line) in enumerate(rawstorylist):
        d = {}
        d['id'] = index
        if '//' in line:
            d['prop'] = 'Comment'
            d['attributes']['value'] = line.lstrip('//')
            continue
        prop,content = re.match(prRe, line).group('prop','content')
        d['prop'] = prop
        d['attributes'] = {}
        parameters = re.findall(pmRe, line)
        if prop == 'name' or prop == '' or prop == None:
            d['prop'] = 'name'
            d['attributes']['content'] = content




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

        if prop == 'Decision':
            d['targetLine'] = {}
            options = d['attributes']['options'].split(';')
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
                except KeyError:
                    print(f'Disable Optiontrace From Line {index}!')
                    OPTIONTRACE = False
                


                

                    
        
        rawlist.append(d)

    return rawlist


if __name__=='__main__':
    langs = [i.stem for i in Path('ArknightsGameData').iterdir() if i.is_dir() and not '.' in i.name]
    dataPath = Path('ArknightsGameData')
    jsonDataPath = Path('ArknightsStoryJson')

    for lang in langs:
        events = func.getEvents(dataPath, lang)
        for event in events:
            for story in event:
                storyPath = Path(story.storyTxt)
                try:
                    with open(storyPath, encoding='utf-8') as storyText:
                        try:
                            storyJson = reader(storyText.read())
                        except:
                            print(f'Erron on reading: {str(storyPath)}')
                except FileNotFoundError:
                    continue

                jsonPath = jsonDataPath/storyPath.relative_to(dataPath).parent/Path(str(storyPath.stem)+'.json')
                jsonPath.parent.mkdir(exist_ok=True, parents=True)
                with open(jsonPath, 'w', encoding='utf-8') as jsonFile:
                    json.dump(storyJson,jsonFile, indent=4)
    
                

