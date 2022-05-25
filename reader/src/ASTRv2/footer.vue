<template>
    <n-layout-footer >
        <n-space justify="space-around" class="footer">
            <n-space justify="space-around" class="links" item-style="display:flex" align="center">
                <n-button text @click="load('https://github.com/050644zf/ArknightsStoryTextReader')">
                    <n-icon size="32">
                        <Github/>
                    </n-icon>
                </n-button>
                <n-divider vertical />
                <n-button text @click="load('https://discord.gg/rihq')">
                    <n-icon size="32">
                        <Discord/>
                    </n-icon>
                </n-button>
                <n-divider vertical />
                <n-button text @click="load('https://www.patreon.com/m31nightsky/membership?')">
                    <n-icon size="32">
                        <Patreon/>
                    </n-icon>
                </n-button>
            </n-space>
            <n-text>
                最后更新 / Last Update (UTC) : {{dateFormatter(latestUpdate)}}<br/>
                当前状态 / Current Status: <br/>
                <img src="https://github.com/050644zf/ArknightsStoryTextReader/actions/workflows/build.yml/badge.svg">&nbsp;
                <img src="https://github.com/050644zf/ArknightsStoryTextReader/actions/workflows/ASTRAutoUpdater.yml/badge.svg"><br/>
            </n-text>
        </n-space>

    </n-layout-footer>
</template>

<script>
import {Github, Discord, Patreon} from "@vicons/fa";

export default {
    data(){
        return{
            latestUpdate: 0
        }
    },
    components:{
        Github,
        Discord,
        Patreon
    },
    created(){
        fetch('https://raw.githubusercontent.com/050644zf/ArknightsStoryJson/main/log.json').then(r=>r.json()).then(s=>{this.latestUpdate=s['latestCommitTime']});
    },
    methods:{
        dateFormatter(t){
            var d = new Date(t*1000);
            var s = '';
            s = d.getUTCFullYear() +'-'+(d.getUTCMonth()+1)+'-'+d.getUTCDate()+' '+this.add0(d.getUTCHours())+':'+this.add0(d.getUTCMinutes())+':'+this.add0(d.getUTCSeconds());
            return s;
        },
        add0(t){
            //add 0 before single digit
            return t<10?'0'+t:t;
        },
        load(site){
            window.location = site;
        }
    }
}
</script>

<style>
.footer{
    margin: 5%;
    padding: 20px;
}

</style>