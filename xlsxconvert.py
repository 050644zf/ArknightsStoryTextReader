import openpyxl as xl
import re
import argparse
from pathlib import Path
import os

optre=r"^\[Decision\(.*options=\"(?P<options>.+)\","
indre=r"^\[Predicate\(.*references=\"(?P<index>.+)\""
imgre=r"\[(?P<type>.+)\(.*image=\"(?P<image>.*?)\""
namere=r"^\[name=\"(?P<name>.*?)\"\]\s+(?P<text>.+)"

def getFile(p): #获取p路径下所有文件路径
    return [x for x in p.iterdir() if not x.is_dir()]

def reader(sheet,rawstorypath):
    with open(rawstorypath,encoding='utf-8') as rawstory:
        rawstorytext=rawstory.read()
        rawstorylist=rawstorytext.split('\n')[2:-3]
        rawlist=[]
        for line in rawstorylist:
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
                    line='[name="--'+imgtype+'--"]  https://aceship.github.io/AN-EN-Tags/img/avg/'+imgtype.lower()+'s/'+image+'.png'
                if '[name' in line:
                    rawlist.append(line)

    for line in rawlist:
        [name,text]=re.match(namere,line).group('name',"text")
        sheet.append([name,text])

    

        
        


if __name__ == "__main__":
    parser=argparse.ArgumentParser(description='Convert arknights story raw data into xlsx file.')
    parser.add_argument('rawpath',metavar='path',nargs=1,type=str,help='The folder path of raw story files')
    args=parser.parse_args()
    #rawpath=['.//en05']

    if Path(args.rawpath[0]).is_dir():
        txtList=[]
        for txtFile in getFile(Path(args.rawpath[0])):
            if txtFile.suffix=='.txt':
                txtList.append(txtFile)

        wb=xl.Workbook()

        for txtFile in txtList:
            ws=wb.create_sheet(title=txtFile.stem)
            reader(ws,txtFile)

        wb.save(filename=str(Path(args.rawpath[0])/'story.xlsx'))

        print("Exported to {}".format(str(Path(args.rawpath[0])/'story.xlsx')))

        



