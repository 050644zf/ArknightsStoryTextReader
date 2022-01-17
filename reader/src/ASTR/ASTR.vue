<script>
import header from './header.vue';
import menu from './menu.vue';
import settings from './settings.vue';
import content from './content.vue';
import topbtn from './topbtn.vue';
import menupage from './menupage.vue';
import func from './func';
import $ from 'jquery';


export default {
    data(){
        return{
            storyData: {},
            storyFile: func.storyFile,
            lang: func.l,
            server: func.server,
            latestUpdate: 0
        }
    },
    created(){
        $.getJSON("https://raw.githubusercontent.com/050644zf/ArknightsStoryJson/main/log.json").done(s=>{console.log(s);this.latestUpdate=s['latestCommitTime']})
    },
    components:{
        Header: header,
        Menu: menu,
        Content: content,
        Settings: settings,
        Topbtn: topbtn,
        Menupage: menupage
    },
    methods:{
        dateFormatter(t){
            var d = new Date(t*1000);
            var s = '';
            s = d.getUTCFullYear() +'-'+(d.getUTCMonth()+1)+'-'+d.getUTCDate()+' '+d.getUTCHours()+':'+d.getUTCMinutes()+':'+d.getUTCSeconds();
            return s;
        }
    }
}
</script>


<template>
<Header></Header>
<Menu v-if="storyFile"></Menu>
<Settings></Settings>
<Menupage v-if="!storyFile"></Menupage>
<Content v-if="storyFile"></Content>
<Topbtn></Topbtn>
<div class="info st">
    <hr/>
    Last Update (UTC): {{dateFormatter(latestUpdate)}}<br/>
    Auto Updater scheduled at 08:30 UTC everyday. <br/><br/>
    Current Status: <br/>
    <img src="https://app.travis-ci.com/050644zf/ArknightsStoryTextReader.svg?branch=master">
    <img src="https://github.com/050644zf/ArknightsStoryTextReader/actions/workflows/ASTRAutoUpdater.yml/badge.svg">
</div>
</template>

<style>
.info{
    margin: 20px;
    margin-top: 50px;
    text-align: right;
    color: rgba(255,255,255,0.5);
}
</style>