<template>
    <div class="menupage">
        <div id="currentLang lt" class="currentLang">
            <div style="display: flex;align-items: center;justify-content:center;" @click="showLangSelect = !showLangSelect">
                <span class="material-icons lt" style="margin-right: 5px;">language</span>
                <span class="lt"> {{i18n['server'][server]}}</span>
            </div>

            <div id="langSelect" class="langSelect lt" v-show="showLangSelect">
                <div  v-for="(langtext,langCode,lidx) in i18n['server']" @click="serverSwitch(langCode)" :key="lidx">
                    {{langtext}}
                </div>
            </div>
        </div>
        <br/>
        <Navibar :focus="focus" @focuson="focus=$event"></Navibar>
        <Maintheme :eventList="eventList['maintheme']" v-show="focus==0"></Maintheme>
        <Intermezzi :eventList="eventList['intermezzi']" v-show="focus==1"></Intermezzi>
        <Sidestory :eventList="eventList['sidestory']" v-show="focus==2"></Sidestory>
        <Storyset :eventList="eventList['storyset']" v-show="focus==3"></Storyset>
        <Or :eventList="eventList['or']" v-show="focus==4"></Or>
        <Search :eventList="eventList" v-show="focus==5"></Search>
    </div>
</template>

<script>
import $ from 'jquery';
import i18n from './i18n.json';
import func from './func';
import navibar from './menupage/navibar.vue'
import or from './menupage/or.vue';
import maintheme from './menupage/maintheme.vue';
import intermezzi from './menupage/intermezzi.vue';
import sidestory from './menupage/sidestory.vue';
import storyset from './menupage/storyset.vue';
import search from './menupage/search.vue';

export default {
    data(){
        return{
            focus: 0,
            i18n: i18n,
            lang: func.l,
            server: func.server,
            chardict: {},
            intermezzi: func.intermezzi,
            eventList:{},
            data: {},
            showLangSelect: false
        }
    },
    created(){
    $.getJSON('https://raw.githubusercontent.com/Kengxxiao/ArknightsGameData/master/'+this.server+'/gamedata/excel/story_review_table.json').done(s => {this.data = s;$.getJSON("https://raw.githubusercontent.com/050644zf/ArknightsStoryJson/main/"+this.server+'/chardict.json').done(t => {this.chardict = t;this.eventList = this.getEventList(this.data, this.chardict);})});
    },
    components:{
        Navibar: navibar,
        Maintheme: maintheme,
        Intermezzi: intermezzi,
        Sidestory: sidestory,
        Storyset: storyset,
        Or: or,
        Search: search
    },
    methods:{
        serverSwitch(langCode){
            var req = 's='+langCode;
            window.location.search = req;
        },
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
        }
    }
}
</script>

<style>
.menupage{
    margin: 0 10%;
    font-size: 20px;
}
.menupage .currentLang{
    text-align: center;
    background-color: rgb(36, 54, 153);
    font-weight: bold;
    padding: 5px 0px;
    border-radius: 4px;
    transition: background-color 0.5s;
}
.menupage .currentLang:hover{
    background-color: rgb(59, 73, 155);
}
.menupage .langSelect{
    display: block;
    position: absolute;
    margin: auto;
    text-align: center;
    width: 80%;
}
.menupage .langSelect div{
    text-align: center;
    background-color: rgb(57, 61, 87);
    padding: 4px;
}
.menupage .langSelect div:hover{
    background-color: rgb(114, 122, 173);
}
</style>