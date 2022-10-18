<template>
    <n-layout-content class="eventpage">

            <n-breadcrumb class="breadcrumb">
                <n-breadcrumb-item @click="$router.push('/'+$route.params.server+'/menu')">
                    <n-icon>
                        <MenuIcon />
                    </n-icon>
                    {{i18n.menu[currentLang]}}
                </n-breadcrumb-item>
                <n-breadcrumb-item>{{i18n.extra[currentLang]}}</n-breadcrumb-item>
            </n-breadcrumb>

            <n-space vertical justify="center" item-style="display:flex;" align="center">
            <n-space vertical class="content">
                <n-space item-style="display:flex;" align="center">
                    <n-space>
                        <n-text>{{i18n.showIntro[currentLang]}}</n-text>
                        <n-switch v-model:value="showIntro"></n-switch>
                    </n-space>
                    <n-divider vertical />
                </n-space>

                <n-list v-if="isExtraInfoLoaded">
                    <n-list-item v-for="(story, sidx) in extraInfo" :key="sidx" @click="$router.push({path:'/'+$route.params.server+'/content', query:{f:story['storyTxt']}})">
                        <n-space vertical>
                            <n-space item-style="display:flex;" align="end">
                                <n-h3 style="margin:0px;" prefix="bar">{{story.storyName}}</n-h3>
                            </n-space>
                            <n-collapse-transition :show="showIntro">
                                <n-text depth="2">
                                    {{infodata[story['storyTxt']]}}
                                </n-text>
                            </n-collapse-transition>

                        </n-space>
                        <template #suffix>
                            <n-button text>
                                <n-icon size="32">
                                    <ForwardIcon />
                                </n-icon>
                            </n-button>
                        </template>
                    </n-list-item>
                </n-list>
            </n-space>
        </n-space>
    </n-layout-content>
</template>

<script>
import { MenuOpenFilled, ArrowForwardOutlined, DownloadOutlined } from "@vicons/material"
import {useLoadingBar,useDialog } from 'naive-ui'
import i18n from "../i18n.json"
import func from "../func.js"
export default {
    data() {
        return {
            i18n: i18n,
            currentLang: func.l,
            extraInfo: {},
            infodata: window.sessionStorage.getItem('infodata') ? JSON.parse(window.sessionStorage.getItem('infodata')) : {},
            isExtraInfoLoaded: false,
            showIntro: true,
            server: this.$route.params.server,
            loadingbar: useLoadingBar()
        }
    },
    metaInfo() {
        //using event name as title
        return {
            title: this.i18n.extra[this.currentLang] + ' | Arknights Story Text Reader',
            meta: [
                { vmid: 'og:title', property: 'og:title', content: this.i18n.extra[this.currentLang] + ' | Arknights Story Text Reader' },
                { vmid: 'og:image', propoty: 'og:image', content: '/src/assets/favicon.png' },
            ]
        }
    },
    created() {
        this.loadingbar.start()
        this.loadExtraInfo()

    },
    components: {
        MenuIcon: MenuOpenFilled,
        ForwardIcon: ArrowForwardOutlined,
        ExportIcon: DownloadOutlined,
    },
    methods: {
        async loadExtraInfo(){
            try{
                let mdata = await fetch('https://raw.githubusercontent.com/050644zf/ArknightsStoryJson/master/'+this.server+'/extrastory.json').then(res => res.json());
                this.extraInfo = mdata.extra;
                this.isExtraInfoLoaded = true
                console.log(this.extraInfo);
                this.loadingbar.finish();
            }
            catch(e){
                console.log(e);
            }
        },
    }
}
</script>

<style>
.eventpage{
    display: flex;
}
.eventpage .breadcrumb {
    margin: 0px 0px 16px 0px;
    background: rgb(0, 65, 65);
    padding: 8px 50px;
    box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.2);
    /* border-radius: 4px; */
    width: 100vw;
}

.eventpage .content {
    width: 80vw;
    max-width: 1000px;
}
</style>
