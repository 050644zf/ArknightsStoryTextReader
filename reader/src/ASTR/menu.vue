<template>
    <div id="sidebar">
        <div :class="{menuButton:true,'material-icons':true,menuButtonR:showMenu}" @click="showMenu=!showMenu;">chevron_right</div>
        <div :class="{sidebar:true, sidebarhidden:!showMenu}" >
            <div id="currentLang" class="currentLang">
                {{i18n.currentLang[lang]}}: {{i18n.langs[lang]}}
                <div id="langSelect" class="langSelect">
                    <div  v-for="(langtext,langCode,lidx) in i18n.langs" @click="langSwitch(langCode)" :key="lidx">
                        {{langtext}}
                    </div>
                </div>
            </div>
            
            <div v-for="(events, eventType, ETidx) in eventList" class="eventType" :id="eventType" :key="ETidx">
                <div class="eventtype" >{{i18n[eventType][lang]}}</div>
                
                <Eventmenu v-for="(event, Eidx) in events" class="event" :id="event.id" :event="event" :lang="lang" @hidemenu="showMenu=false" :key="Eidx"></Eventmenu>
            </div>
        </div>
    </div>
</template>

<script>
import eventmenu from "./menu/eventmenu.vue";
import func from "./func";
import i18n from "./i18n.json";
import $ from 'jquery';
export default {
data(){
    return{
        data: {},
        chardict: {},
        eventList: {},
        lang: func.l,
        i18n: i18n,
        showMenu: true
    }
},
created(){
    $.getJSON('https://raw.githubusercontent.com/Kengxxiao/ArknightsGameData/master/'+this.lang+'/gamedata/excel/story_review_table.json').done(s => {this.data = s;$.getJSON("https://raw.githubusercontent.com/050644zf/ArknightsStoryJson/main/"+this.lang+'/chardict.json').done(t => {this.chardict = t;this.eventList = this.getEventList(this.data, this.chardict);})});
},
mounted(){
    func.focus();
},
methods:{
    langSwitch(langCode){
        var req = 'l='+langCode;
        window.location.search = req;
    },
    getEventList(reviewData, chardict){
        var eventList = {main:[], ss:[], mini:[], or:[]};
        var eventid;
        for(eventid in reviewData){
            if(reviewData[eventid].entryType == 'MAINLINE'){
                eventList.main.push(reviewData[eventid]);
            }
            else if(reviewData[eventid].entryType == 'ACTIVITY'){
                eventList.ss.push(reviewData[eventid]);
            }
            else if(reviewData[eventid].entryType == 'MINI_ACTIVITY'){
                eventList.mini.push(reviewData[eventid]);
            }
            else if(reviewData[eventid].entryType == 'NONE'){
                var cin = eventid.split('_')[1];
                var set = eventid.split('_')[3];
                reviewData[eventid].name = chardict[cin] + ' - ' + set;
                eventList.or.push(reviewData[eventid]);
            }
        }
        eventList.ss.sort(function(a,b){return a.startTime - b.startTime;});
        eventList.mini.sort(function(a,b){return a.startTime - b.startTime;});
        return eventList;
    },
    focusStory(){
        func.focus();
    }
},
components:{
    Eventmenu: eventmenu
}
}

</script>

<style>
.sidebar{
    /*background-color: darkslategray;*/
    background-color: rgb(22, 22, 22);
    width: 50%;
    margin-right: 4px;
    padding: 4px;
    padding-top: 20px;
    padding-bottom: 1800px;
    max-height: 90%; 
    overflow-y: scroll; 
    overflow-x: clip;
    word-wrap: normal;
    position: fixed;
    top: 50px;
    transition: transform 0.5s;
    z-index: 1;
    /*box-shadow: 2px 2px 2px #000000;*/
}
.sidebarhidden{
    transform: translateX(-100%);
}
.currentLang{
    text-align: center;
    background-color: rgb(36, 54, 153);
    font-weight: bold;
    padding: 5px 0px;
}
.langSelect{
    display: none;
    position: absolute;
    margin: auto;
    width: 100%;
    text-align: center;
    border-radius: 4px;
}
.langSelect div{
    text-align: center;
    background-color: rgb(57, 61, 87);
    
}
.langSelect div:hover{
    background-color: rgb(114, 122, 173);
}
.currentLang:hover .langSelect{
    display: block;
}
.eventtype{
    text-align: center;
    font-weight: bolder;
    color: #ffc4c4;
    background-color: #383838;
    padding: 4px;
}
.menuButton{
    position: fixed;
    font-size: 64px;
    background-color: #3f51b500;
    transition: background-color 0.5s;
    left: 0%;
    padding-left: 10px;
    padding-top: 30px;
    padding-bottom: 30px;
    top: 50%;
    transform: rotate(0deg);
    transition: background-color 0.5s, left 0.5s, transform 0.5s;
}
.menuButton:hover{
    background-color: #3f51b580;
}
.menuButtonR{
    left: 50%;
    transform: rotate(180deg);
    background-color: #3f51b5ff;
}
@media(max-width: 1000px){
    .sidebar{
    width: 80%;
    transition: none;
    }
    .sidebarhidden{
        width: 0%;
    }
    .menuButton{
    font-size: 100px !important;
    background-color: rgba(0,128,128,0.2);
    transition: none;
    }
    .menuButtonR{
        left: 80%;
    }
    .eventtype{
      font-size: 40px;
    }
    .eventname{
        font-size: 40px;
    }
    .story{
        font-size: 30px;
    }
    .storycode{
        font-size: 20px;
    }
    .currentLang{
        font-size: 40px;
    }
    .langSelect{
        font-size: 40px;
    }
}
</style>