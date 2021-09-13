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
        if prop == 'name' or prop == '':
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
            for idx,value in enumerate(values):
                currentOptions[value] = {'option':options[idx], 'Decision':index}
                d['targetLine'][value] = ''

        if prop == 'Predicate':
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

                

                    
        
        rawlist.append(d)

    return rawlist


if __name__=='__main__':

    with open(Path('ArknightsGameData/zh_CN/gamedata/story/activities/act10d5/level_act10d5_st06.txt'),encoding='utf-8') as rawStoryFile:
        rawStoryText = rawStoryFile.read()
        rd = reader(rawStoryText)

    with open('testing.json','w', encoding='utf-8') as jsonFile:
        json.dump(rd,jsonFile,indent=4)
                

