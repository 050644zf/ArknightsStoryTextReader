<template>
    <div :class="{oritem: true, orfocused:showStory, lt:true}">
        <div class="orcard" @click="$emit('focusme')">
            <img :src="getAvatar()">
            <div class="operatorname">{{eventData.name}}</div>
            <div class="setnumber">#{{eventData.set}}</div>
        </div>
        <div class="orstories" v-show="showStory">
            <div class="exportBar nt">
                <div @click="exportAll()">
                    <span class="material-icons">
                        file_download
                    </span>
                    <span>{{i18n.export2excel[lang]}}</span>
                </div>
            </div>
            <div class="orstory" v-for="(story,sidx) in eventData.infoUnlockDatas" :key="sidx" @click="loadStory(story.storyTxt)">
                {{sidx}}. {{story.storyName}}
            </div>
        </div>
    </div>
</template>

<script>
import func from "../func"
import i18n from '../i18n.json';
export default {
    data(){
        return{
            server: func.server,
            i18n: i18n,
            lang: func.l,
        }
    },
    emits: ['focusme'],
    props:{
        eventData: Object,
        showStory: Boolean
    },
    methods:{
            exportAll(){
                let data = this.eventData.infoUnlockDatas;
                let eventname = this.eventData.name;
                let setnumber = this.eventData.set;
                window.localStorage.setItem("filename", eventname+'_'+setnumber);
                let server = this.server;
                let exportList = [];
                data.forEach(story => {
                    exportList.push({
                        server: server,
                        path: story.storyTxt,
                        storyCode: story.storyCode,
                        avgTag: story.avgTag,
                        storyName: story.storyName
                    });
                });
                window.localStorage.setItem("exportList", JSON.stringify(exportList));
                window.location.href = "export.html";
        },
        getAvatar(){
            return 'https://raw.githubusercontent.com/Aceship/Arknight-Images/main/avatars/char_'+this.eventData.cid+'_'+this.eventData.cin+'.png'
        },
        loadStory(path){
            var req = 's='+ this.server;
            req = req + '&f=' + path;
            window.location.search = req;
        }
    }
}
</script>

<style>
.oritem{
    width: auto;
    height: min-content;
    flex: 0 1 45%;
    margin: 10px;
    border-radius: 6px;
    background-color: rgba(50,50,50,1);
    box-shadow: 0px 0px 0px rgba(0,0,0,0);
    transition: box-shadow 0.1s, height 0.5s, all 0.5s;
}
.oritem:hover{
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
}
.orfocused{
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
}
.orcard{
    display: flex;
    align-items: center;
}
.operatorname{
    margin-left: 5px;
    font-weight: bold;
}
.setnumber{
    color: gray;
    margin-left: 5px;
}
.orcard img{
    height: 40px;
    width: 40px;
}
.orstories{
    background-color: rgba(0,0,0,0.2);
}
.orstory{
    padding: 5px;
    transition: all 0.5s;
}
.orstory:hover{
    background-color: rgba(255,255,255,0.2);
}
.orstory .exportBar{
    margin: 2px;
}
@media(max-width: 1000px){
    .orcard img{
        height: 80px;
        width: 80px;
    }
}
</style>
