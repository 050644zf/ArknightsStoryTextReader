<template>
    <div id="sidebar">
        <div :class="{menuButton:true,'material-icons':true,menuButtonR:showMenu}" @click="showMenu=!showMenu;">chevron_right</div>

        <div :class="{sidebar:true, sidebarhidden:!showMenu}" >

            <div id="currentLang" class="currentLang lt">
                <div style="display: flex;align-items: center;justify-content:center;" @click="showLangSelect = !showLangSelect">
                    <span class="material-icons" style="margin-right: 5px;">language</span>
                    <span> {{i18n['server'][server]}}</span>
                </div>

                <div id="langSelect" class="langSelect lt" v-show="showLangSelect">
                    <div  v-for="(langtext,langCode,lidx) in i18n['server']" @click="serverSwitch(langCode)" :key="lidx">
                        {{langtext}}
                    </div>
                </div>
            </div>
            <div class="homepage nt" @click="home()">
                <span class="material-icons">
                menu_open
                </span>
                <span class="home">{{i18n.home[lang]}}</span>
            </div>            
                
            <Eventmenu v-for="(event, Eidx) in eventList" class="event" :id="event.id" :event="event" :lang="lang" @hidemenu="showMenu=false" :key="Eidx"></Eventmenu>
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
        server: func.server,
        i18n: i18n,
        showMenu: true,
        showLangSelect: false
    }
},
created(){
    $.getJSON('https://raw.githubusercontent.com/Kengxxiao/ArknightsGameData/master/'+this.server+'/gamedata/excel/story_review_table.json').done(s => {this.data = s;$.getJSON("https://raw.githubusercontent.com/050644zf/ArknightsStoryJson/main/"+this.server+'/chardict.json').done(t => {this.chardict = t;this.eventList = this.getEventList(this.data, this.chardict);})});
},
mounted(){
    func.focus();
},
methods:{
    serverSwitch(langCode){
        var req = 's='+langCode;
        window.location.search = req;
    },
    getEventList(reviewData, chardict){
        var eventList = [];
        var eventid;
        for(eventid in reviewData){
            if(reviewData[eventid].entryType == 'MAINLINE'){
                eventList.push(reviewData[eventid]);
            }
            else if(reviewData[eventid].entryType == 'ACTIVITY'){
                eventList.push(reviewData[eventid]);
            }
            else if(reviewData[eventid].entryType == 'MINI_ACTIVITY'){
                eventList.push(reviewData[eventid]);
            }
            else if(reviewData[eventid].entryType == 'NONE'){
                var cin = eventid.split('_')[1];
                var set = eventid.split('_')[3];
                reviewData[eventid].name = chardict[cin]['name'] + ' - ' + set;
                eventList.push(reviewData[eventid]);
            }
        }
        return eventList;
    },
    focusStory(){
        func.focus();
    },
    home(){
        window.location.search = '?s=' + this.server;
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
    border-radius: 4px;
    transition: background-color 0.5s;
}
.currentLang:hover{
    background-color: rgb(59, 73, 155);
}
.langSelect{
    display: block;
    position: absolute;
    margin: auto;
    margin-top: 4px;
    width: 100%;
    text-align: center;
    
}
.langSelect div{
    text-align: center;
    background-color: rgb(57, 61, 87);
    padding: 4px;
}
.langSelect div:hover{
    background-color: rgb(114, 122, 173);
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
.homepage{
    display: flex;
    align-items: center;
    padding: 5px 0px;
}
.homepage:hover{
    background-color: rgba(255,255,255,0.2);
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
}
</style>