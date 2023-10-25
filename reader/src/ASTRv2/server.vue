<template>
    <Header @push-server="pushServer" :loaded="isDataLoaded"></Header>
    <router-view v-slot="{ Component }" style="min-height: 80vh">
    <transition name="fade">
        <component :is="Component" v-if="isDataLoaded" 
        class="font"/>
        <n-layout-content v-else >
            <n-space vertical align="center" class="loading" item-style="display:flex;" justify="center">
                <n-spin size="large" style="padding:5px"/>
                <n-progress type="line" :percentage="loadingProgress" :indicator-placement="'inside'" :status="isDataLoaded?'success':isError?'error':'info'" :processing="!isDataLoaded" style="width: 500px"/>
            </n-space>
        </n-layout-content>
    </transition>
    </router-view>
    <n-back-top :right="50"></n-back-top>
    
</template>

<script>
import Header from "./header.vue"
import func from "./func.js"
import i18n from "./i18n.json"
import {computed} from "vue"
import {useLoadingBar,useDialog } from 'naive-ui'

export default {
    data() {
        return {
            server: this.$route.params.server,
            serverName: i18n.server[this.server],
            intermezzi: func.intermezzi,
            loadingbar: useLoadingBar(),
            dialog: useDialog(),
            i18n: i18n,
            isDataLoaded: false,
            loadingProgress: 0,
            isError: false,
            inited: func.inited,
            mirror: func.mirror,
        };
    },
    metaInfo(){
        return{
            title: this.i18n.server[this.server]+ ' | Arknights Story Text Reader',  
            meta:[
                {propoty: 'og:type', content: 'website'},
                {vmid: 'og:title', property: 'og:title',content: 'Arknights Story Text Reader'},
                {vmid: 'og:description', property: 'og:description',content: 'Viewing Arknights Stories Texts from different server.'},
                {vmid: 'og:image', property:'og:image',content: '/src/assets/favicon.png'},
                {vmid: 'og:url', property:'og:url',content:location.href},
                {name:'theme-color', content:'#007575'},
            ] 
        }
    },
    created(){
        this.isDataLoaded = false;
        if(this.inited){
            this.initServerData();
        }
        this.$watch(
            () => this.$route.params,
            (toParams, previousParams) => {
                if(previousParams.server != toParams.server){
                    window.location.reload();
                }
            }
        );
    },
    beforeUpdate(){
        if(this.server != window.sessionStorage.getItem("server")){
            this.initServerData();
        }
    },
    components: {
        Header,
    },
    methods:{
        async pushServer({server}){
            
            const currentServer = this.server;
            this.server = server;

            await this.initServerData();

            window.location.href = window.location.href.replace(currentServer, server);
        },
        async initServerData(){
            this.loadingbar.start();
            this.loadingProgress = 0;
            var gamedata = 'https://raw.githubusercontent.com/Kengxxiao/ArknightsGameData/master/';
            const gamejson = 'https://raw.githubusercontent.com/050644zf/ArknightsStoryJson/main/'
            if(this.server!='zh_CN'){
                gamedata = 'https://raw.githubusercontent.com/Kengxxiao/ArknightsGameData_YoStar/main/';
            }
            try{
                this.loadFont();
                let menudata = await fetch(gamedata+this.server+'/gamedata/excel/story_review_table.json').then(res => {this.loadingProgress = 10;return res.json()});
                let chardict = await fetch(gamejson+this.server+'/chardict.json').then(res => {this.loadingProgress = 20;return res.json()});
                let infodata = await fetch(gamejson+this.server+'/storyinfo.json').then(res => {this.loadingProgress = 30;return res.json()});
                let chapterdata = await fetch(gamedata+this.server+'/gamedata/excel/chapter_table.json').then(res => {this.loadingProgress = 40;return res.json()});
                let wordCountData = await fetch(gamejson+this.server+'/wordcount.json').then(res => {this.loadingProgress = 50;return res.json()});
                let eventList = await this.getEventList(menudata, chardict);
                chapterdata = await this.getMainthemeData(chapterdata, eventList);
                window.sessionStorage.setItem('server', this.server);
                window.sessionStorage.setItem('menudata', JSON.stringify(menudata));
                window.sessionStorage.setItem('chardict', JSON.stringify(chardict));
                window.sessionStorage.setItem('infodata', JSON.stringify(infodata));
                window.sessionStorage.setItem('eventList', JSON.stringify(eventList));
                window.sessionStorage.setItem('chapterdata', JSON.stringify(chapterdata));
                window.sessionStorage.setItem('wordCountData', JSON.stringify(wordCountData));
                this.loadingProgress = 100;
                this.loadingbar.finish();
                this.isDataLoaded = true;                
            }catch(e){
                this.loadingbar.error();
                this.isError = true;
                console.log(e);
                this.dialog.warning({
                    title: 'Fail to Load Event Data',
                    content: 'This maybe because of the server is not supported or the data is not available.If you are sure the server is supported, please summit a issue.',
                    positiveText: 'Return to Home Page / 返回主页',
                    negativeText: 'Return to Last Page / 返回上一页',
                    onPositiveClick: () => {
                        this.$router.push('/');
                    },
                    onNegativeClick: () => {
                        this.$router.back();
                    },
                })
            }

            
        },
        async getEventList(reviewData, chardict){
            var eventList = {maintheme:[], intermezzi:[],sidestory:[], storyset:[], or:[]};
            var eventid;
            for(eventid in reviewData){
                if(reviewData[eventid].entryType == 'MAINLINE'){
                    eventList.maintheme.push(reviewData[eventid]);
                }
                else if(reviewData[eventid].entryType == 'ACTIVITY'){
                    if(this.intermezzi.indexOf(eventid) == -1){
                        eventList.sidestory.push(reviewData[eventid]);
                    }
                    else{
                        eventList.intermezzi.push(reviewData[eventid]);
                    }
                }
                else if(reviewData[eventid].entryType == 'MINI_ACTIVITY'){
                    eventList.storyset.push(reviewData[eventid]);
                }
                else if(reviewData[eventid].entryType == 'NONE'){
                    var cin = eventid.split('_')[1];
                    var set = eventid.split('_')[3];
                    reviewData[eventid].name = chardict[cin].name;
                    reviewData[eventid].cid = chardict[cin].id;
                    reviewData[eventid].cin = cin;
                    reviewData[eventid].set = set;
                    eventList.or.push(reviewData[eventid]);
                }
            }
            eventList.intermezzi.sort(function(a,b){return a.startTime - b.startTime;});
            eventList.sidestory.sort(function(a,b){return a.startTime - b.startTime;});
            eventList.storyset.sort(function(a,b){return a.startTime - b.startTime;});
            return eventList;
        },
        async getMainthemeData(chapterdata, eventList){
            for(var chapter in chapterdata){
                var events = [];
                var flag = false;
                for(var event of eventList.maintheme){
                    if(event.id == chapterdata[chapter].startZoneId){
                        flag = true;
                    }
                    if(flag){
                        events.push(event.id);
                    }
                    if(event.id == chapterdata[chapter].endZoneId){
                        flag = false;
                    }
                }
                chapterdata[chapter].events = events;
            }
            return chapterdata;
        },
        async loadFont(){

            var l = this.server[3] + this.server[4];
            if(l == 'US') l = 'CN';

            const mirror = {
                origin:"https://raw.githubusercontent.com/adobe-fonts/source-han-serif/release/",
                mirror: "https://mirrors.sustech.edu.cn/adobe-fonts/source-han-serif/"
            };

            // Create a new @font-face rule
            var fontFaceRule = "@font-face {\n" +
            "  font-family: 'source-serif-l';\n" +
            "  font-display: block;\n" +
            "  src: url('"+mirror[this.mirror]+"Variable/WOFF2/OTF/Subset/SourceHanSerif"+l+"-VF.otf.woff2') format('woff');\n" +
            "}";

            // Get the document's stylesheets
            var styleSheets = document.styleSheets;

            // Find the first stylesheet
            var styleSheet = styleSheets[0];

            // Insert the @font-face rule
            styleSheet.insertRule(fontFaceRule, styleSheet.cssRules.length);
        }
    }
}
</script>

<style>
.loading{
    /*Center the loading spin */
    margin: 2% 15%;
    min-height: 90vh;
}


.font{
    font-family: "source-serif-l", sans-serif;
}
</style>