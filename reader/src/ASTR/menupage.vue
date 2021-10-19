<template>
    <div class="menupage">
        <div style="display: flex;align-items: center;">
            <span class="material-icons">
            arrow_back
            </span>
            <span style="margin-left: 5px;">{{i18n.selectStory[lang]}}</span>
        </div>
        <br/>
        <Navibar :focus="focus"></Navibar>  
    </div>
</template>

<script>
import $ from 'jquery'
import i18n from './i18n.json';
import func from './func';
import navibar from './menupage/navibar.vue'

export default {
    data(){
        return{
            focus: 0,
            i18n: i18n,
            lang: func.l,
            server: func.server,
            intermezzi: func.intermezzi,
            data: {}
        }
    },
    created(){
    $.getJSON('https://raw.githubusercontent.com/Kengxxiao/ArknightsGameData/master/'+this.server+'/gamedata/excel/story_review_table.json').done(s => {this.data = s;$.getJSON("https://raw.githubusercontent.com/050644zf/ArknightsStoryJson/main/"+this.server+'/chardict.json').done(t => {this.chardict = t;this.eventList = this.getEventList(this.data, this.chardict);})});
    },
    components:{
        Navibar: navibar
    },
    methods:{
        getEventList(reviewData, chardict){
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
                    reviewData[eventid].name = chardict[cin] + ' - ' + set;
                    eventList.or.push(reviewData[eventid]);
                }
            }
            eventList.intermezzi.sort(function(a,b){return a.startTime - b.startTime;});
            eventList.sidestory.sort(function(a,b){return a.startTime - b.startTime;});
            eventList.storyset.sort(function(a,b){return a.startTime - b.startTime;});
            return eventList;
        }
    }
}
</script>

<style>
.menupage{
    margin-left: 10%;
    font-size: 20px;
    width: 60%
}
@media (max-width: 1000px) {
    .menupage span{
        font-size: 50px;
    }
}
</style>