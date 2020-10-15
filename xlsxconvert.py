import openpyxl as xl
import re
import argparse
from pathlib import Path
import os

optre=r"^\[Decision\(.*options=\"(?P<options>.+)\","
indre=r"^\[Predicate\(.*references=\"(?P<index>.+)\""
imgre=r"\[(?P<type>.+)\(.*image=\"(?P<image>.*?)\""
namere=r"^\[name=\"(?P<name>.*?)\"\]\s*(?P<text>.+)"
charre=r"^\[Character.*\(.*name=\"(?P<name>[^\"]+)\"(?!,name2=)"
char2re=r"^\[Character\((name|nameage)=\"(?P<name>[^\"]+)\".?\s?name2=\"(?P<name2>[^\"]+)\".?\s?(focus=(?P<focus>\d?))?.?"
characters=[]
codes=[]
characterFlag=False
commentFlag=False

def getFile(p): #获取p路径下所有文件路径
    return [x for x in p.iterdir() if not x.is_dir()]

def reader(sheet,rawstorypath):
    with open(rawstorypath,encoding='utf-8') as rawstory:
        rawstorytext=rawstory.read()
        rawstorylist=rawstorytext.split('\n')[2:-3]
        storylines = len(rawstorylist)
        rawlist=[]
        for (index,line) in enumerate(rawstorylist):
            print("\rExporting {} : Line {}/{} ... ".format(rawstorypath.name,index+3,storylines+3),end='')
            if '//' in line and commentFlag:
                line='[name="//Comment//"]  '+line
                rawlist.append(line)

            if '//' not in line and line!='':
                if '[' not in line:
                    line='[name=""]  '+line
                if '[Dialog]' in line:
                    line='[name="----"]  ----'
                if '[Decision' in line:
                    options=re.match(optre,line).group('options').split(';')
                    i=1
                    rawlist.append('[name="--Decision--"]  ----')
                    for option in options:
                        rawlist.append('[name="Option_'+str(i)+'"]  '+option)
                        i=i+1
                    rawlist.append('[name="--Decision End--"]  ----')
                    continue
                try:
                    if '[Predicate' in line:
                        index=re.match(indre,line).group('index').replace(';','&')
                        line='[name="--Branch--"]  >Option_'+index
                except AttributeError:
                    if '[Predicate]' in line:
                        line='[name="--Branch--"]  >Option_All'
                if 'image=' in line:
                    [imgtype,image]=re.match(imgre,line).group('type','image')
                    if imgtype=="BackgroundTween":
                        imgtype="Background"
                    elif imgtype=='showitem':
                        imgtype='item'
                    line='[name="--'+imgtype+'--"]  https://aceship.github.io/AN-EN-Tags/img/avg/'+imgtype.lower()+'s/'+image+'.png'
                if '[Character' in line and 'name' in line and characterFlag:
                    if 'focus=' in line and 'name2' in line:
                        [cg1,cg2,focus]=re.match(char2re,line).group('name','name2','focus')
                        if focus=='1':
                            line='[name="--Character--"]  {}'.format(cg1)
                        elif focus=='2':
                            line='[name="--Character--"]  {}'.format(cg2)
                    else:
                        try:
                            cg=re.match(charre,line).group('name')
                            line='[name="--Character--"]  {}'.format(cg)
                        except AttributeError:
                            [cg1,cg2]=re.match(char2re,line).group('name','name2')
                            line='[name="--Character--"]  {}'.format(cg1)
                            rawlist.append(line)
                            line='[name="--Character--"]  {}'.format(cg2)
                            rawlist.append(line)
                            continue

                        

                
                if '[name' in line:
                    rawlist.append(line)

    for line in rawlist:
        try:
            [name,text]=re.match(namere,line).group('name',"text")
            sheet.append([name,text])
            if (not name in characters) and (not name in codes):
                if '--' in name or '//' in name or 'Option_' in name:
                    codes.append(name)
                else:
                    characters.append(name)
                
        except AttributeError:
            pass

    

        
        


if __name__ == "__main__":

    os.system("")

    parser=argparse.ArgumentParser(description='\033[1mConvert arknights story raw data into xlsx file.\033[m',epilog='\033[1mBy Nightsky#3319 in RIHQ: discord.gg/rihq\033[m')
    parser.add_argument('rawpath',metavar='path',nargs=1,type=str,help='The file path or folder path of raw story files')
    parser.add_argument('-C','--Character',action='store_const',const=True,default=False,help='\033[31;1m(beta, may not work properly)\033[m Show Character CG file name')
    parser.add_argument('-c','--comment',action='store_const',const=True,default=False,help='Show Code Comment in raw story file')
    args=parser.parse_args()
    #args=parser.parse_args(['.\\ArknightsGameData\\en_US\\gamedata\\story\\activities\\act6d5','-C'])

    characterFlag=args.Character
    commentFlag=args.comment


    print("==========================")
    print("Status:")
    print("     Character CG output: \033[{}m{}\033[m".format('33;1' if characterFlag else '90',str(characterFlag)))
    print("     Code Comment output: \033[{}m{}\033[m".format('33;1' if commentFlag else '90',str(commentFlag)))
    print("==========================")

    if Path(args.rawpath[0]).is_dir():
        print("Target path type: \033[33;1mFolder\033[m")
        txtList=[]
        for txtFile in getFile(Path(args.rawpath[0])):
            if txtFile.suffix=='.txt':
                txtList.append(txtFile)
        
        print("{} txt files dectected".format(str(len(txtList))))

        wb=xl.Workbook()

        for (txtindex,txtFile) in enumerate(txtList):
            ws=wb.create_sheet(title=txtFile.stem)
            reader(ws,txtFile)
            print("\rTxt file {} exported \033[1m({}/{})\033[m                 ".format(txtFile.name,txtindex+1,str(len(txtList))))

        ws=wb.create_sheet(title='Characters')
        ws.append(['<Characters>'])
        for name in characters:
            ws.append([name])

        ws.append(['<Codes>'])
        for name in codes:
            ws.append([name])

        print("Character sheet exported")


        wb.save(filename=str(Path(args.rawpath[0])/'story.xlsx'))

        print("\033[92mExported to \033[1m{}\033[m".format(str(Path(args.rawpath[0])/'story.xlsx')))
    else:
        print("Target path type: \033[33;1mFile\033[m")
        wb=xl.Workbook()
        ws=wb.active
        ws.title=Path(args.rawpath[0]).stem
        reader(ws,args.rawpath[0])
        wb.save(filename=args.rawpath[0].replace('.txt','.xlsx'))
        print("\033[92mExported to \033[1m{}\033[m".format(args.rawpath[0].replace('.txt','.xlsx')))

        



