<template>
    <Header :server="$route.params.server"></Header> 
    <n-loading-bar-provider><router-view></router-view></n-loading-bar-provider>   
    
</template>

<script>
import Header from "./header.vue"
import func from "./func.js"
import {computed} from "vue"

export default {
    data() {
        return {
            server: this.$route.params.server,
            intermezzi: func.intermezzi,
        };
    },
    created(){
        this.initServerData();
        this.$watch(
            () => this.$route.params,
            (toParams, previousParams) => {
                if(previousParams.server != toParams.server){
                    window.location.reload();
                }
            }
        );
    },
    components: {
        Header,
    },
    methods:{
        async initServerData(){
            let menudata = await fetch('https://raw.githubusercontent.com/Kengxxiao/ArknightsGameData/master/'+this.server+'/gamedata/excel/story_review_table.json').then(res => res.json());
            let chardict = await fetch('https://raw.githubusercontent.com/050644zf/ArknightsStoryJson/main/'+this.server+'/chardict.json').then(res => res.json());
            let infodata = await fetch('https://raw.githubusercontent.com/050644zf/ArknightsStoryJson/main/'+this.server+'/storyinfo.json').then(res => res.json());
            let chapterdata = await fetch('https://raw.githubusercontent.com/Kengxxiao/ArknightsGameData/master/'+this.server+'/gamedata/excel/chapter_table.json').then(res => res.json());
            let eventList = await this.getEventList(menudata, chardict);
            chapterdata = await this.getMainthemeData(chapterdata, eventList);
            window.sessionStorage.setItem('server', this.server);
            window.sessionStorage.setItem('menudata', JSON.stringify(menudata));
            window.sessionStorage.setItem('chardict', JSON.stringify(chardict));
            window.sessionStorage.setItem('infodata', JSON.stringify(infodata));
            window.sessionStorage.setItem('eventList', JSON.stringify(eventList));
            window.sessionStorage.setItem('chapterdata', JSON.stringify(chapterdata));
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
                    reviewData[eventid].name = chardict[cin]['name'];
                    reviewData[eventid].cid = chardict[cin]['id'];
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
        }
    }
};
</script>