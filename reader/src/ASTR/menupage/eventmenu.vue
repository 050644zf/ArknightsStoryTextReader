<template>
    <div class="event">
        <div :class="{eventname:true, eventnamehl:!collapsed, lt:true}" @click="collapsed = !collapsed" >{{event.name}}</div>
        <div class="stories" v-show="!collapsed">
            <div class="exportBar">
                <div @click="exportAll()">
                    <span class="material-icons">
                        file_download
                    </span>
                    <span>{{i18n.export2excel[lang]}}</span>
                </div>
            </div>
            <Storymenu v-for="(story, STidx) in event.infoUnlockDatas" :story="story" @unfoldevent="collapsed = false;$emit('focusStory')" :key="STidx"></Storymenu>
        </div>
    </div>
</template>

<script>
import storymenu from "./storymenu.vue";
import i18n from '../i18n.json';
import func from "../func";

export default {
    props:['event','eventid'],
    emits:['hidemenu','focusStory'],
    data(){
        return{
            collapsed: true,
            i18n: i18n,
            lang: func.l,
            server: func.server,
        }
    },
    methods:{
        exportAll(){
            let data = this.event.infoUnlockDatas;
            let eventname = this.event.name;
            let eventid = this.eventid;
            window.localStorage.setItem("filename", eventid+"_"+eventname);
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
        }
    },
    components:{
        Storymenu: storymenu
    }
}

</script>

<style>
.eventname{
    font-weight: bold;
    background-color: rgba(42,186,255,0);
    margin: 4px;
    margin-left: 10px;
    padding: 2px;
    padding-left: 5px;
    transition: padding 0.2s, background-color 0.2s, border 0.2s;
    border-radius: 4px;
    border-left: 5px solid rgba(0,0,0,0);
}
.eventnamehl{
    margin-bottom: 0px;
    background-color: rgba(42,186,255,0.1);
    border-radius: 4px 4px 0px 0px;
    border-left: 5px solid rgba(42,186,255,0.2);
    padding: 5px;
}
.eventname:hover{
    background-color: rgba(42,186,255,0.2);
    border-left: 5px solid rgba(42,186,255,0.2);
}
.exportBar{
    margin: 10px;
    margin-top: 0px;
    padding: 2px;
    display: flex;
    align-items: center;
    justify-content: center;
}
.exportBar div{
    padding: 10px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
}
.exportBar div:hover{
    background: rgba(255,255,255,0.2);
}
.stories{
    margin-left: 10px;
    /*border-left: 5px solid rgba(42,186,255,0.2);*/
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 0px 0px 4px 4px;

}
.stories:first-child{
    margin-top: 0px;
}
</style>