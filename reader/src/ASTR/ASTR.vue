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
<hr/>
<div class="footer">
    <div class="links st">
        <a href="https://github.com/050644zf/ArknightsStoryTextReader">Project Repo / 项目仓库</a><br/><br/>
        <a href="https://github.com/050644zf/ArknightsStoryTextReader/issues">Bug Report & Feedbacks / 问题反馈和建议</a>
        <br/><br/>
    </div>
    <div class="info st">
    
        Last Update/最后更新 (UTC): {{dateFormatter(latestUpdate)}}<br/><br/>
        Current Status/当前状态: <br/>
        <img src="https://app.travis-ci.com/050644zf/ArknightsStoryTextReader.svg?branch=master">
        <img src="https://github.com/050644zf/ArknightsStoryTextReader/actions/workflows/ASTRAutoUpdater.yml/badge.svg">
        <br/><br/>
        If you like this project, please give me a star <a href="https://github.com/050644zf/ArknightsStoryTextReader">here</a>!<br/>
        如果您喜欢本项目，请在<a href="https://github.com/050644zf/ArknightsStoryTextReader">这里</a>给我一个star！
    </div>
</div>


</template>

<style>
hr{
    margin-top:20px;
}
.footer{
    display: flex;
    justify-content: space-between;
}
.links{
    margin: 10px;
}
.links a{
    color: rgba(190, 213, 255, 0.5);
    text-decoration: none;
}
.info{
    margin: 10px;
    color: rgba(255,255,255,0.5);
}
@media(max-width:1000px){
    .footer{
        flex-direction: column;
        margin: 10px;
    }
    .links{
        margin: 0px;
    }
    .info{
        margin: 0px;
    }
}
</style>