#This Program convert .txt form story data into .csv


import re
import csv
import argparse

def reader(rawstorypath):
    optre=r"^\[Decision\(.*options=\"(?P<options>.+)\","
    indre=r"^\[Predicate\(.*references=\"(?P<index>.+)\""
    imgre=r"\[(?P<type>.+)\(.*image=\"(?P<image>.*?)\""
    namere=r"^\[name=\"(?P<name>.*?)\"\]\s+(?P<text>.+)"
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
                if '[Predicate' in line:
                    index=re.match(indre,line).group('index').replace(';','&')
                    line='[name="--Branch--"]  >Option_'+index
                if 'image=' in line:
                    [imgtype,image]=re.match(imgre,line).group('type','image')
                    line='[name="--'+imgtype+'--"]  '+image+'.png'
                if '[name' in line:
                    rawlist.append(line)

    outputlist=[]
    for line in rawlist:
        [name,text]=re.match(namere,line).group('name',"text")
        outputlist.append([name,text])

    with open(rawstorypath.replace('.txt','.csv'),'w',newline='') as csvfile:
        writer=csv.writer(csvfile,dialect='excel')
        writer.writerows(outputlist)
        
        


if __name__ == "__main__":
    parser=argparse.ArgumentParser(description='Convert arknights story raw data into csv file.')
    parser.add_argument('rawpath',metavar='p',type=str,help='The path of raw story file')
    args=parser.parse_args()
    reader(args.rawpath)