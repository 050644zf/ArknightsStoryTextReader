import openpyxl as xl
import re
import argparse
from pathlib import Path
import os
from func import getFile
import func
from openpyxl.worksheet.hyperlink import Hyperlink

optre = r"^\[Decision\(.*options=\"(?P<options>.+)\","
indre = r"^\[Predicate\(.*references=\"(?P<index>.+)\""
imgre = r"\[(?P<type>.+)\(.*image=\"(?P<image>.*?)\""
namere = r"^\[name=\"(?P<name>.*?)\"\]\s*(?P<text>.+)"
charre = r"^\[Character.*\(.*name=\"(?P<name>[^\"]+)\"(?!,name2=)"
char2re = r"^\[Character\((name|nameage)=\"(?P<name>[^\"]+)\".?\s?name2=\"(?P<name2>[^\"]+)\".?\s?(focus=(?P<focus>\d?))?.?"
subre = r"^\[Subtitle\(text=\"(?P<subtitle>.*?)\".*size=(?P<size>\d+)"
characters = []
codes = []
characterFlag = False
commentFlag = False
infoFlag = False

bold = xl.styles.Font(b=True)
underline = xl.styles.Font(u='single')



def reader(sheet,rawstorypath:Path):
    with open(rawstorypath,encoding='utf-8') as rawstory:
        rawstorytext=rawstory.read()
        rawstorylist=rawstorytext.split('\n')[2:-3]
        storylines = len(rawstorylist)
        rawlist=[]
        for (index,line) in enumerate(rawstorylist):
            print(f"\rExporting {rawstorypath.name} : Line {index+3}/{storylines+3} ... ".format(rawstorypath.name,index+3,storylines+3),end='')
            if '//' in line and commentFlag:
                line=f'[name="//Comment//"]  {line}'
                rawlist.append(line)

            if '//' not in line and line!='':
                if '[' not in line:
                    line=f'[name=""]  {line}'
                if '[Dialog]' in line:
                    line='[name="----"]  ----'
                if '[Decision' in line:
                    options=re.match(optre,line).group('options').split(';')
                    i=1
                    rawlist.append('[name="--Decision--"]  ----')
                    for option in options:
                        rawlist.append(f'[name="Option_{i}"]  {option}')
                        i=i+1
                    rawlist.append('[name="--Decision End--"]  ----')
                    continue
                if '[Subtitle(' in line:
                    if 'text=' in line:
                        if not rawlist[-1]=='[name=""]  ':
                            rawlist.append('[name=""]  ')
                        subtitle = re.match(subre,line).group('subtitle')
                        size = re.match(subre,line).group('size')
                        rawlist.append(f'[name="--Subtitle--{size}"]  {subtitle}')
                        rawlist.append('[name=""]  ')


                try:
                    if '[Predicate' in line:
                        index=re.match(indre,line).group('index').replace(';','&')
                        line=f'[name="--Branch--"]  >Option_{index}'
                except AttributeError:
                    if '[Predicate]' in line:
                        line='[name="--Branch--"]  >Option_All'
                if 'image=' in line:
                    [imgtype,image]=re.match(imgre,line).group('type','image')
                    if imgtype=="BackgroundTween":
                        imgtype="Background"
                    elif imgtype=='showitem':
                        imgtype='item'
                    line=f'[name="--{imgtype}--"]  https://aceship.github.io/AN-EN-Tags/img/avg/{imgtype.lower()}s/{image}.png'
                if '[Character' in line and 'name' in line and characterFlag:
                    if 'focus=' in line and 'name2' in line:
                        [cg1,cg2,focus]=re.match(char2re,line).group('name','name2','focus')
                        if focus=='1':
                            line=f'[name="--Character--"]  {cg1}'
                        elif focus=='2':
                            line=f'[name="--Character--"]  {cg2}'
                    else:
                        try:
                            cg=re.match(charre,line).group('name')
                            line=f'[name="--Character--"]  {cg}'
                        except AttributeError:
                            [cg1,cg2]=re.match(char2re,line).group('name','name2')
                            line=f'[name="--Character--"]  {cg1}'
                            rawlist.append(line)
                            line=f'[name="--Character--"]  {cg2}'
                            rawlist.append(line)
                            continue

                        

                
                if '[name' in line:
                    rawlist.append(line)

    for index,line in enumerate(rawlist):
        try:
            [name,text]=re.match(namere,line).group('name',"text")
            if '--Subtitle--' in name:
                sheet.append(['',text])
                size = int(re.match(r"^--Subtitle--(?P<size>\d+)",name).group('size'))
                cell = sheet[f'B{1+index}']
                cell.font = bold
                cell.font.size = size-24+11
            else:
                sheet.append([name,text])
            if (not name in characters) and (not name in codes):
                if '--' in name or '//' in name or 'Option_' in name:
                    if not 'Subtitle' in name:
                        codes.append(name)
                else:
                    characters.append(name)
                
        except AttributeError:
            pass

    

        
        


if __name__ == "__main__":

    os.system("")

    parser=argparse.ArgumentParser(description='\033[1mConvert arknights story raw data into xlsx file.\033[m',epilog='\033[1mBy Nightsky#3319 in RIHQ: discord.gg/rihq\033[m')
    parser.add_argument('path',metavar='path',nargs='?',type=str,default='ArknightsGameData', help='The file path or folder path. If no -E or -e option provided, convert all file in path or selected path to xlsx file')
    parser.add_argument('-C','--Character',action='store_const',const=True,default=False,help='\033[31;1m(beta, may not work properly)\033[m Show Character CG file name')
    parser.add_argument('-c','--comment',action='store_const',const=True,default=False,help='Show Code Comment in raw story file')
    parser.add_argument('-L','--Lang',metavar='Langcode', nargs=1, default=['zh_CN'],help='Config the language of the following command, default is zh_CN')
    parser.add_argument('-E', '--EventList',action='store_const',const=True,default=False, help='Show available index: eventid in corresponding language, config the path to change the ArknightsGameData path from default (./ArknightsGameData)')
    parser.add_argument('-e', '--event', metavar='Eventid',nargs=1, help='Export all stories in corresponding index or eventid, config the path to change the ArknightsGameData path from default (./ArknightsGameData). You can get available index or eventid from --EventList command.')
    parser.add_argument('-r', '--records',action='store_const',const=True,default=False,help="Export all Operators' Records into one xlsx file.")
    parser.add_argument('-m', '--main',action='store_const',const=True,default=False,help="Export all mainline story")
    parser.add_argument('-i', '--info',action='store_const',const=True,default=False,help="Show story info in menu")
    args=parser.parse_args()
    #args=parser.parse_args(['-e','story_prove_set_1','-c'])

    try:
        if args.EventList:
            print(f'\033[1mList of Events in {args.Lang[0]}:\033[m (Index: Eventid Eventname)')
            for idx,event in enumerate(func.getEvents(Path(args.path), args.Lang[0])):
                print(f'{idx:<2}: {event.eventid:<20} {event.name:<}')
            exit()
    except IndexError:
        pass

    characterFlag = args.Character
    commentFlag = args.comment
    infoFlag = args.info


    print("==========================")
    print("Status:")
    print("     Character CG output: \033[{}m{}\033[m".format('33;1' if characterFlag else '90',str(characterFlag)))
    print("     Code Comment output: \033[{}m{}\033[m".format('33;1' if commentFlag else '90',str(commentFlag)))
    print("     Story Info output: \033[{}m{}\033[m".format('33;1' if infoFlag else '90',str(infoFlag)))
    print("==========================")


    if Path(args.path).is_dir():

        if args.main:   #Mainline stories

            records = func.getMainline(Path(args.path), args.Lang[0])

            filename = 'Mainline.xlsx'

            storyList = []
            txtList=[]
            for event in records:
                for story in event:
                    storyList.append(story)
                    txtList.append(story.storyTxt)

            wb=xl.Workbook()
            ws = wb.active
            ws.title = 'Menu'
            ws.column_dimensions['A'].width = 20
            ws.column_dimensions['B'].width = 20
            ws.column_dimensions['D'].width = 25
            ws.column_dimensions['E'].width = 80

            ws.append([None,"Mainline"])
            ws['B1'].font = bold
            ws.append([])
            ws.append(['storyCode','storyName','avgTag','storyTxt.stem', 'storyInfo' if infoFlag else None])
            for cell in ws['A3':'E3'][0]:
                cell.font = bold

            for idx,story in enumerate(storyList):
                if infoFlag:
                    with open(story.storyInfo, encoding='utf-8') as storyInfoFile:
                        storyInfo = storyInfoFile.read()
                else:
                    storyInfo = None

                ws.append([story.storyCode, story.storyName, story.avgTag, story.storyTxt.stem, storyInfo])
                loc = f"'{story.storyTxt.stem}'!A1"
                cell = ws.cell(idx+4,4)
                cell.font = underline
                cell.hyperlink = Hyperlink(ref='', location=loc, display=story.storyTxt.stem)
                for i in range(1,5):
                    ws.cell(idx+3,i).alignment = xl.styles.Alignment(vertical='center')
                if ws.cell(idx+3,1).value == story.storyCode:
                    ws.merge_cells(start_column=1, end_column=1, start_row=idx+3, end_row=idx+4)
                    ws.merge_cells(start_column=2, end_column=2, start_row=idx+3, end_row=idx+4)

                for row in ws[ws.dimensions]:
                    row[4].alignment = xl.styles.Alignment(wrap_text=True)

        elif args.records:    #Operators' Records

            records = func.getRecords(Path(args.path), args.Lang[0])

            filename = 'Operators_Records.xlsx'

            storyList = []
            txtList=[]
            for event in records:
                for story in event:
                    storyList.append(story)
                    txtList.append(story.storyTxt)

            wb=xl.Workbook()
            ws = wb.active
            ws.title = 'Menu'
            ws.column_dimensions['A'].width = 20
            ws.column_dimensions['B'].width = 20
            ws.column_dimensions['D'].width = 25
            ws.column_dimensions['E'].width = 80

            ws.append([None,"Operactors' Records"])
            ws['B1'].font = bold
            ws.append([])
            ws.append(['eventid','storyName','avgTag','storyTxt.stem', 'storyInfo' if infoFlag else None])
            for cell in ws['A3':'E3'][0]:
                cell.font = bold

            for idx,story in enumerate(storyList):
                if infoFlag:
                    with open(story.storyInfo, encoding='utf-8') as storyInfoFile:
                        storyInfo = storyInfoFile.read()
                else:
                    storyInfo = None

                ws.append([story.eventid, story.storyName, story.avgTag, story.storyTxt.stem, storyInfo])
                loc = f"'{story.storyTxt.stem}'!A1"
                cell = ws.cell(idx+4,4)
                cell.font = underline
                cell.hyperlink = Hyperlink(ref='', location=loc, display=story.storyTxt.stem)

                for i in range(1,5):
                    ws.cell(idx+3,i).alignment = xl.styles.Alignment(vertical='center') 
                if ws.cell(idx+3,1).value == story.eventid:
                    ws.merge_cells(start_column=1, end_column=1, start_row=idx+3, end_row=idx+4)
                    ws.merge_cells(start_column=2, end_column=2, start_row=idx+3, end_row=idx+4)

                for row in ws[ws.dimensions]:
                    row[4].alignment = xl.styles.Alignment(wrap_text=True)
 
        elif args.event:    #Single Event
            try:
                eventid = list(func.getEvents(Path(args.path), args.Lang[0]))[int(args.event[0])].eventid
            except ValueError:
                eventid = args.event[0]

            event = func.Event(Path(args.path), args.Lang[0], eventid)

            filename = f'{event.eventid}_{event.name}.xlsx'

            txtList=[]
            for story in event:
                txtList.append(story.storyTxt)
            

            wb=xl.Workbook()
            ws = wb.active
            ws.title = 'Menu'
            ws.column_dimensions['A'].width = 10
            ws.column_dimensions['B'].width = 20
            ws.column_dimensions['D'].width = 25
            ws.column_dimensions['E'].width = 80

            ws.append([event.eventid,event.name])
            ws['B1'].font = bold
            ws.append([])
            ws.append(['storyCode','storyName','avgTag','storyTxt.stem', 'storyInfo' if infoFlag else None])
            for cell in ws['A3':'E3'][0]:
                cell.font = bold

            for idx,story in enumerate(event):
                if infoFlag:
                    with open(story.storyInfo, encoding='utf-8') as storyInfoFile:
                        storyInfo = storyInfoFile.read()
                else:
                    storyInfo = None

                ws.append([story.storyCode, story.storyName, story.avgTag, story.storyTxt.stem, storyInfo])
                loc = f"'{story.storyTxt.stem}'!A1"
                cell = ws.cell(idx+4,4)
                cell.font = underline
                cell.hyperlink = Hyperlink(ref='', location=loc, display=story.storyTxt.stem)

                for i in range(1,5):
                    ws.cell(idx+3,i).alignment = xl.styles.Alignment(vertical='center')
                if ws.cell(idx+3,1).value == story.storyCode:
                    ws.merge_cells(start_column=1, end_column=1, start_row=idx+3, end_row=idx+4)
                    ws.merge_cells(start_column=2, end_column=2, start_row=idx+3, end_row=idx+4)


                for row in ws[ws.dimensions]:
                    row[4].alignment = xl.styles.Alignment(wrap_text=True)
        else:
            filename = 'story.xlsx'
            print("Target path type: \033[33;1mFolder\033[m")
            wb=xl.Workbook()
            txtList=[]
            for txtFile in getFile(Path(args.path)):
                if txtFile.suffix=='.txt':
                    txtList.append(txtFile)
        
        print("{} txt files dectected".format(str(len(txtList))))

        for (txtindex,txtFile) in enumerate(txtList):
            ws=wb.create_sheet(title=txtFile.stem)
            ws.column_dimensions['A'].width = 15
            ws.column_dimensions['B'].width = 70
            reader(ws,txtFile)

            for row in ws[ws.dimensions]:
                for cell in row:
                    cell.alignment = xl.styles.Alignment(wrap_text=True)
            print("\rTxt file {} exported \033[1m({}/{})\033[m                 ".format(txtFile.name,txtindex+1,str(len(txtList))))

        ws=wb.create_sheet(title='Characters')
        ws.append(['<Characters>'])
        for name in characters:
            ws.append([name])

        ws.append(['<Codes>'])
        for name in codes:
            ws.append([name])

        print("Character sheet exported")


        wb.save(filename=filename)

        print(f"\033[92mExported to \033[1m{filename}\033[m")
    else:
        print("Target path type: \033[33;1mFile\033[m")
        wb=xl.Workbook()
        ws=wb.active
        ws.title=Path(args.path).stem
        reader(ws,Path(args.path))
        wb.save(filename=args.path.replace('.txt','.xlsx'))
        print("\033[92mExported to \033[1m{}\033[m".format(args.path.replace('.txt','.xlsx')))

        



