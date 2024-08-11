<template>
    <Header></Header>
    <div class="exportpage">
            <button class="homepage lt" @click="home()">
                <span class="material-icons">
                menu_open
                </span>
                <span class="home nt">返回上一页/Return to Last Page</span>
            </button>
        <div class="nt">当前导出列表/Current Exporting List: </div>
        <div class="exportList st">
            <table>
                <tr v-for="(item, iidx) in exportList" :key="iidx" class="exportItem">
                    <td>{{item.server}}</td>
                    <td>{{item.storyCode}} {{item.avgTag}}</td>
                    <td>{{item.storyName}}</td>
                    <td>{{item.path}}</td>
                </tr>
            </table>
        </div>

        <div class="filename lt">
            <span>导出文件名 / Export File Name: </span>
            <input type="text" v-model="filename" placeholder="请输入文件名/Please input file name"/>
            <span>.xlsx</span>
        </div>
        <div>
            <button class="removeAll nt" @click="removeAll()">
                <span class="material-icons">
                    clear_all
                </span>
                <span>清空/Clear</span>
            </button>
            <button class="exportBtn nt" @click="exportAll()">
                <span class="material-icons">
                    file_download
                </span>
                <span>导出所有/Export All</span>
            </button>
        </div>

        <div class="logArea xst" v-html="logs"></div>
    </div>
</template>

<script>
import xlsx from 'xlsx';
import $ from 'jquery';
import headerVue from '../ASTR/header.vue';
import func from '../ASTR/func';

export default {
    data(){
        return{
            exportList:[],
            filename: 'export',
            exportFile:null,
            logs: '',
            lang: func.l,
        }
    },
    created(){
        this.exportList = window.localStorage.getItem("exportList") ? JSON.parse(window.localStorage.getItem("exportList")) : [];
        this.filename = window.localStorage.getItem("filename") ? window.localStorage.getItem("filename") : 'export';
    },
    methods:{
        removeAll(){
            this.exportList = [];
            window.localStorage.setItem("exportList", JSON.stringify(this.exportList));
            this.filename = 'export';
            window.localStorage.setItem("filename", this.filename);
        },
        async exportAll(){
            this.logs = 'Export Process Start...<br/>';
            this.logs += 'Export List Length: '+this.exportList.length+'<br/>';
            this.exportFile = xlsx.utils.book_new();
            this.exportFile.Props = {
                Title: "Exported Data",
                Subject: "Exported from Arknights Story Text Reader. https://050644zf.github.io/ArknightsStoryTextReader/",
                };
            this.logs += 'Workbook Created.<br/>';
            //this.exportStories().then(xlsx.writeFile(this.exportFile, 'export.xlsx',{type: 'file'}));
            //this.logs += 'Export Finished.<br/>';
            /*{
                this.logs += 'Exporting Story: '+story.storyCode + ' ' + story.avgTag + ' ' + story.storyName + '<br/>';
                var storyData = null;
                $.getJSON('https://raw.githubusercontent.com/050644zf/ArknightsStoryJson/main/'+story.server+'/gamedata/story/'+story.path+'.json').done(s => {
                    storyData = s;
                    var storyList = this.reader(storyData);
                    var sheet = xlsx.utils.aoa_to_sheet(storyList);
                    await this.book_append_sheet(this.exportFile, sheet, story.path.split('/')[2]);
                    if(story == this.exportList.length - 1){
                        xlsx.writeFile(this.exportFile, 'export.xlsx',{type: 'file'});
                        this.logs += 'Export Process Finished.<br/>';
                        }
                    });

            }*/
            await new Promise(resolve => {
                this.exportStories().then(resolve);
            }).then(() => {
                xlsx.writeFile(this.exportFile, this.filename+'.xlsx',{type: 'file'});
                this.logs += 'Export Process Finished.<br/>';
            });
        },
        async exportStories(){
            for(const story of this.exportList){
                    await this.exportStory(story);
                }
        },
        async exportStory(story){
            this.logs += 'Exporting Story: '+story.storyCode + ' ' + story.avgTag + ' ' + story.storyName + '<br/>';
            let storyData = await fetch('https://raw.githubusercontent.com/050644zf/ArknightsStoryJson/main/'+story.server+'/gamedata/story/'+story.path+'.json');
            storyData = await storyData.json();
            let storyList = this.reader(storyData);
            let sheet = xlsx.utils.aoa_to_sheet(storyList);
            sheet['!cols'] = [];
            sheet['!cols'][0] = {hidden: true,wch:15};
            sheet['!cols'][1] = {wch:25};
            sheet['!cols'][2] = {wch:70};
            return await new Promise((resolve, reject) => {
                xlsx.utils.book_append_sheet(this.exportFile, sheet, this.getsheetname(story.path));
                resolve();
            });
        },
        getsheetname(path){
            const len = path.split('/').length;
            return path.split('/')[len-1];
        },
        reader(storyJson){
            var storyList = [];
            for(var lidx in storyJson['storyList']){
                var line = storyJson['storyList'][lidx];
                var index = line.id;
                var prop = line.prop;
                var attrs = line.attributes;

                if(prop == 'Comment'){
                    storyList.push([index, '--Comment--', attrs.value]);
                }
                if(prop == 'name'){
                    storyList.push([index, attrs.name, attrs.content]);
                }
                if(prop == 'Dialog'){
                    storyList.push([index, '----', '----']);
                }
                if(prop == 'Decision'){
                    storyList.push([index, '--Decision--', '----']);
                    var options = attrs.options.split(';');
                    var values = attrs.values.split(';');
                    for(let i = 0; i < Math.min(options.length, values.length); i++){
                        storyList.push([index, 'Option_'+values[i], options[i]]);
                    }
                    storyList.push([index, '--Decision End--', '----']);
                }
                if(prop == 'Predicate'){
                    if(line.endOfOpt){
                        storyList.push([index, '--Branch--', 'End of Options']);
                    }
                    else{
                        storyList.push([index, '--Branch--', '>Options_'+attrs.references.replaceAll(';', '&')]);
                    }
                }
                if(prop == 'Subtitle'){
                    storyList.push(['']);
                    storyList.push([index, '', attrs.text]);
                    storyList.push(['']);
                }
                if(Object.keys(attrs).indexOf('image') != -1){
                    prop = prop.toLowerCase();
                    if(prop == 'backgroundtween'){
                        prop == 'background';
                    }
                    else if(prop == 'showitem'){
                        prop == 'item';
                    }
                    storyList.push([index, '--'+prop+'--', 'https://raw.githubusercontent.com/Aceship/Arknight-Images/main/avg/'+prop+'s/'+attrs.image+'.png']);
                }
            }
            return storyList;
        },
        async book_append_sheet(wb, ws, sheet_name){
            xlsx.utils.book_append_sheet(wb, ws, sheet_name);
            return await Promise.resolve('done');
        },
        home(){
            history.back();
        }
    },
    components:{
        Header: headerVue
    }
}

</script>

<style>
.exportpage{
    margin: 20px;
}
.exportpage .homepage{
    width: max-content;
    padding: 5px;
    display: flex;
    align-items: center;
    margin: 10px 0px;
    font-weight: bold;
    background-color: rgba(0,0,0,0.1);
    border: 1px solid #ccc;
    border-radius: 5px;
}
.exportpage .homepage:hover{
    background-color: rgba(255, 255, 255, 0.2);
}

.exportpage button{
    margin: 5px;
    padding: 5px;
    background-color: rgba(0,0,0,0);
    border: 1px solid #ccc;
    border-radius: 5px;
    color: #fff;
}
.exportpage button:hover{
    background-color: rgba(255, 255, 255, 0.2);
}

.logArea{
    width: 80%;
    height: 200px;
    overflow-y: scroll;
    margin: 10px;
    padding: 5px;
    background-color: rgba(0,0,0,0.1);
    display: flex;
    flex-direction: column-reverse;
}
.exportList{
    width: 80%;
    max-height: 200px;
    overflow-y: scroll;
    background-color: rgba(0,0,0,0.1);
}
.exportList table{
    margin: 10px;
    padding: 5px;
}

.exportItem *{
    padding: 5px;
    border-bottom: 2px solid rgba(255, 255, 255, 0.2);
}
.filename{
    margin: 10px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
}
.filename input{
    font-size: unset;
    text-align: right;
    background-color: rgba(0,0,0,0);
    margin-bottom: -2px;
    border-radius: 0px;
    border-width: 0px;
    border-bottom: 2px solid rgba(255, 255, 255, 0.5);
    color:rgb(255, 255, 255);
    transition: border-color 0.5s;
}
.filename input:hover{
    border-bottom: 2px solid rgba(255, 255, 255, 1);
}
.filename input:active{
    border-bottom: 2px solid rgba(255, 255, 255, 1);
}
.filename input:focus-visible{
    outline: none;
    border-bottom: 2px solid rgba(255, 255, 255, 1);
}
.exportBtn{
    font-weight: bold;
}
@media(max-width:1000px){
    .logArea{
        width: 100%;
        height: 300px;
    }
    .exportList{
        width: 100%;
        max-height: 600px;
    }
}
</style>
