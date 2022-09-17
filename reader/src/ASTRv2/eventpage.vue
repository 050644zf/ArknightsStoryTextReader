<template>
    <n-layout-content>
        <n-space vertical class="eventpage" >
            <n-affix :top="40" :trigger-top="40" position="fixed">
            <n-breadcrumb class="breadcrumb">
                <n-breadcrumb-item  @click="$router.push('/'+$route.params.server+'/menu')">
                    <n-icon><MenuIcon/></n-icon>
                    {{i18n.menu[currentLang]}}
                </n-breadcrumb-item>
                <n-breadcrumb-item>{{mdata[eventid]["name"]}}</n-breadcrumb-item>
            </n-breadcrumb>
            </n-affix>
            <n-space item-style="display:flex;" align="center">
                <n-space>
                    <n-text>{{i18n.showIntro[currentLang]}}</n-text>
                    <n-switch v-model:value="showIntro"></n-switch>
                </n-space>
                <n-divider vertical />
                <n-space>
                    <n-button strong secondary type="primary" @click="exportAll">
                        <template #icon>
                        <n-icon>
                            <ExportIcon/>
                        </n-icon>
                        </template>

                        {{i18n.export2excel[currentLang]}}
                    </n-button>
                </n-space>
            </n-space>
            <n-alert type="info" v-if="eventid=='act17side'">
                <n-space justify="space-between" align="center" item-style="display:flex;">
                    <n-text>
                        查看愚人号活动行动日志<br/>
                        Check Operation Log in Stultifera Navis
                    </n-text>
                    <n-button text @click="$router.push('/'+$route.params.server+'/act17side_log')">
                        <n-icon size="32">
                            <ForwardIcon/>
                        </n-icon>
                    </n-button>
                </n-space>

            </n-alert>
            <n-list>
                <n-list-item v-for="(story, sidx) in mdata[eventid]['infoUnlockDatas']" :key="sidx">
                    <n-space vertical>
                        <n-space item-style="display:flex;" align="end">
                            <n-h3 style="margin:0px;" prefix="bar">{{story.storyName}}</n-h3>
                            <n-text depth="3">{{story.storyCode}} {{story.avgTag}}</n-text>
                        </n-space>
                        <n-text depth="2" v-show="showIntro">
                            {{infodata[story['storyTxt']]}}
                        </n-text>
                    </n-space>
                    <template #suffix>
                        <n-button text @click="$router.push({path:'/'+$route.params.server+'/content', query:{f:story['storyTxt']}})">
                            <n-icon size="32">
                                <ForwardIcon/>
                            </n-icon>
                        </n-button>
                    </template>
                </n-list-item>
            </n-list>

        </n-space>
    </n-layout-content>
</template>

<script>
import {MenuOpenFilled, ArrowForwardOutlined, DownloadOutlined} from "@vicons/material"
import i18n from "./i18n.json"
import func from "./func.js"
export default {
    data(){
        return{
            eventid: this.$route.params.event,
            mdata: window.sessionStorage.getItem('menudata')?JSON.parse(window.sessionStorage.getItem('menudata')):{},
            infodata: window.sessionStorage.getItem('infodata')?JSON.parse(window.sessionStorage.getItem('infodata')):{},
            i18n: i18n,
            currentLang: func.l,
            showIntro: false,
            server: this.$route.params.server,
        }
    },
    metaInfo(){
        //using event name as title
        return{
            title: this.mdata[this.eventid]["name"] + ' | Arknights Story Text Reader',
            meta:[
                {vmid: 'og:title', property: 'og:title',content: this.mdata[this.eventid]["name"] + ' | Arknights Story Text Reader'},
                {vmid: 'og:image', propoty:'og:image',content: '/src/assets/favicon.png'},
            ]
        }
    },
    created(){
        //Watch if the server data is loaded, if not reload the page
        this.$watch(
            () => this.mdata,
            (toParams, previousParams) => {
                if(previousParams != toParams){
                    window.location.reload();
                }
            }
        )


    },
    components:{
        MenuIcon: MenuOpenFilled,
        ForwardIcon: ArrowForwardOutlined,
        ExportIcon: DownloadOutlined,
    },
    methods:{
        exportAll(){
            let data = this.mdata[this.eventid]['infoUnlockDatas'];
            let eventname = this.mdata[this.eventid].name;
            let eventid = this.eventid;
            window.localStorage.setItem("filename", eventid+"_"+eventname);
            let server = this.server;
            let exportList = [];
            data.forEach(story => {
                exportList.push({
                    key: story.storyTxt,
                    server: server,
                    path: story.storyTxt,
                    storyCode: story.storyCode,
                    avgTag: story.avgTag,
                    storyName: story.storyName
                });
            });
            window.localStorage.setItem("exportList", JSON.stringify(exportList));
            this.$router.push({path:'/'+this.server+'/export'});
        }
    }
}
</script>

<style>
.eventpage{
    margin:0% 15%;
}
.eventpage .breadcrumb{
    margin: 10px;
    background: #000;
    padding:5px 10px;
    box-shadow: 5px 5px 5px rgba(0,0,0,0.2);
    border-radius: 4px;
}
</style>
