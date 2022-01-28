<template>
    <div id="setting">
        <div class="warmtip" style="background-color: rgb(255, 255, 0);color: #000; padding: 5px;" v-show="!hidetip">
            <span style="float: left;margin-left: 20px;">If you like this project, please give me a star <a href="https://github.com/050644zf/ArknightsStoryTextReader" style="color: rgb(32, 32, 184);">here</a>!<br/>If you have any issues or feedbacks please summit them <a href="https://github.com/050644zf/ArknightsStoryTextReader/issues" style="color: rgb(32, 32, 184);">here</a>.</span>
            <span class="material-icons" style="float: right;" @click="hide()">clear</span>
            <div style="clear: both;"></div>
        </div>
        <div class="warmtip" style="background-color: rgb(43 118 61); padding: 5px;" v-show="isOldversion">
            <span style="float: left;margin-left: 20px;">
                Arknights Story Text Reader has been updated! Click the version number on the top right corner to see the changelog.<br/>
                明日方舟剧情文本阅读器已更新！点击右上角的版本号可查看更新日志。
            </span>
            <span class="material-icons" style="float: right;" @click="hide2()">clear</span>
            <div style="clear: both;"></div>
        </div>
        <div :class="{setting:true,settingshow:show}">
            <span :class="{'material-icons':true}" @click="show = !show"  id="settingbutton">
                settings
            </span>
            <span class="settingtitle nt">{{i18n.setting[lang]}}</span>
            
            <div class="clear" @click="clearSetting()">
                <span class="material-icons clearbutton" style="float: right;padding: 4px;" >delete</span>
                <span class="settingtitle nt" style="float: right; font-weight: normal;">{{i18n.clear[lang]}} </span>                
            </div>
            <div style="clear: both;"></div>
            <div :class="{settingoptions:true, nt:true}" v-show="show">
                <span class="material-icons">public</span>
                <select v-model="targetLang">
                    <option v-for="langCode in langList" :key="langCode">{{langCode}}</option>
                </select>
                <div style="clear:both;"></div>
                <span style="float: left;">{{i18n.dr[lang] }}: </span>
                <input class="textbox" v-model="doctor" style="float: left;"/>
                <div style="clear: both;"></div>
                <span style="float: left;">{{i18n.showDelay[lang]}}: </span>
                <input class="checkbox" type="checkbox" v-model="showDelay" true-value="y" false-value="n" style="float:left"/>
                <div style="clear:both;"></div>
                <span style="float: left;">{{i18n.hideName[lang]}}(beta): </span>
                <input class="checkbox" type="checkbox" v-model="hideName" true-value="y" false-value="n" style="float:left"/>
                <div style="clear:both;"></div>
                <div class="save" @click="save()"> 
                    <span style="float: left; font-weight: bold;">{{i18n.save[lang] }} </span>
                    <span class="material-icons"  style="float: left;">save_alt</span>
                    <div style="clear: both;"></div>
                </div>

                <span class="xxst" style="font-weight: bold; color: dimgray;">
                    Developer Info/Options (Please attach these info with your issues)
                </span>
                <div class="xxst" style="color: dimgray;">
                    Current JsonFile:<br/> {{getJSONFile()}}<br/>
                    Browser Info:<br/> {{getUserAgent()}}<br/>
                    Browser width: {{getWidth()}}<br/>

                </div>

            </div>
        </div>
        
        
    </div>
</template>

<script>
import $ from 'jquery';
import i18n from './i18n.json';
import func from './func';

export default {
data(){
    return{
        doctor: func.doctor,
        i18n:i18n,
        lang:func.l,
        targetLang: func.l,
        show: this.doctor == "{@nickname}",
        hidetip: func.hidetip,
        showDelay: func.showDelay,
        hideName: func.hideName,
        langList: func.langList,
        isOldversion: func.isOldversion
    }
},
methods:{
    save(){
        window.localStorage.setItem('doctor',this.doctor);
        window.localStorage.setItem('showDelay', this.showDelay);
        window.localStorage.setItem('hideName', this.hideName);
        window.localStorage.setItem('lang', this.targetLang);
        window.location.href = window.location.href;
    },
    clearSetting(){
        window.localStorage.clear();
        window.location.href = window.location.href;
    },
    hide(){
        this.hidetip = true;
        window.localStorage.setItem('hidetip', true);
    },
    hide2(){
        this.isOldversion = false;
        window.localStorage.setItem('isOldversion', false);
    },
    getJSONFile(){
        return "https://raw.githubusercontent.com/050644zf/ArknightsStoryJson/main/"+this.lang+'/gamedata/story/'+func.storyFile+'.json'
    },
    getUserAgent(){
        return window.navigator.userAgent
    },
    getWidth(){
        return $(window).width()
    }
}
}


</script>

<style>
.setting{
    margin: 4px 20px;
    transition: background-color 0.5s;    
}
.setting *{
    margin: 4px;
    
}
.setting select{
    font-size: 15px;
}

.setting .material-icons{
    font-size: 24px;
}
.settingshow{
    background-color: rgba(0, 0, 0, 0.2);
}
#settingbutton{
    padding: 4px;
    float: left;
    font-size: 24px;
}
#settingbutton:hover{
    background-color: rgba(255, 255, 255, 0.2);
}
#settingbutton:hover ~ #settingtitle{
    color:rgba(255, 255, 255, 1);
}
.settingtitle{
    font-weight: bold; 
    padding: 4px;
    float: left;
    color: rgba(255, 255, 255, 0);
    transition: color 0.5s;
}
.settingshow .settingtitle{
    color:rgba(255, 255, 255, 1);
}

.clear{
    background-color: #FF000000;
    margin: 4px;
    padding: 0px 5px;
    width: fit-content;
    transition: background-color 0.5s;
    float: right;
}
.clear:hover{
    background-color: #FF0000FF;
}

.clearbutton{
    color: rgba(255, 255, 255, 0);
    transition: color 0.5s;
}
.settingshow .clearbutton{
    color: rgba(255, 255, 255, 1);
}

.textbox{
    font-size: unset;
    background-color: rgba(0,0,0,0);
    margin-bottom: -2px;
    border-radius: 0px;
    border-width: 0px;
    border-bottom: 2px solid rgba(255, 255, 255, 0.5);
    color:rgb(255, 255, 255);
    transition: border-color 0.5s;
}
.textbox:hover{
    border-bottom: 2px solid rgba(255, 255, 255, 1);
}
.textbox:active{
    border-bottom: 2px solid rgba(255, 255, 255, 1);
}

.checkbox{
    width:20px;
    height: 20px;
    margin: 4px;
}

.save{
    width: fit-content;
    margin: 4px;
    padding: 0px 5px;
    background-color: #00808088;
    transition: background-color 0.5s;
}
.save:hover{
    background-color: #008080FF;
}

@media(max-width: 1000px){
    .settingtitle{
        margin: 10px 0;
    }
    input{
        font-size: 30px;
    }
    .checkbox{
        width: 30px;
        height: 30px;
        margin: 4px;
    }
    .setting select{
        font-size: 35px;
    }
}

</style>