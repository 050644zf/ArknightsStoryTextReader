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
    currentDecision = 0
    currentOptions = []
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
            currentDecision = index
            d['targetLine'] = {}
            currentOptions = [f'option{value}' for value in d['attributes']['values'].split(';')]
            for value in currentOptions:
                d['targetLine'][value] = ''

        if prop == 'Predicate':
            for ref in d['attributes']['references'].split(';'):
                if f'option{ref}' in currentOptions:
                    rawlist[currentDecision]['targetLine'][f'option{ref}'] = f'line{index}'
                    currentOptions.remove(f'option{ref}')
                    d['endOfOpt'] = False
                else:
                    lastPredicate = int(rawlist[currentDecision]['targetLine'][f'option{ref}'].lstrip('line'))
                    rawlist[lastPredicate]['targetLine'] = f'line{index}'
                    d['endOfOpt'] = True

                

                    
        
        rawlist.append(d)

    return rawlist

                

