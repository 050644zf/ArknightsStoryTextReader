<template>
    <n-space class="events" item-style="display:flex;">
        <n-list class="list">
            <n-list-item v-for="(edata, eidx) in eventList[eventype]" :key="eidx">
                <n-space item-style="display:flex;" align="center">
                    <img v-if="eventype != 'or'" :src="'https://raw.githubusercontent.com/050644zf/ArknightsStoryJson/main/img/banners/'+edata.id+'.png'"/>
                    <img v-else :src="'https://aceship.github.io/AN-EN-Tags/img/avatars/char_'+edata.cid+'_'+edata.cin+'.png'" style="height: 64px;"/>
                    <n-space vertical item-style="display:flex;" justify="space-around">
                        <n-space item-style="display:flex;" align="baseline">
                            <n-text style="padding:0px;margin:0px;font-size:24px">{{edata.name}}</n-text>
                            <n-text depth="3" v-if="eventype=='or'">#{{edata.set}}</n-text>
                        </n-space>
                        <n-space>
                            <n-statistic :label="i18n.length[currentLang]" >
                                <template #suffix>
                                    <n-text style="font-size:medium;color:rgba(255,255,255,0.5)">{{i18n[unit][currentLang]}}</n-text>
                                </template>
                                <template #default>
                                    <n-text style="font-size:large">{{getEventWordCount(edata.id)}}</n-text>
                                </template>
                            </n-statistic>
                        </n-space>                                               
                    </n-space>

                  
                </n-space>
                <template #suffix>
                    <n-button text @click="$router.push('/'+$route.params.server+'/event/'+edata.id)">
                        <n-icon size="32">
                            <ForwardIcon/>
                        </n-icon>
                    </n-button>
                </template>  
            </n-list-item>
        </n-list>
    </n-space>
</template>

<script>
import { ArrowForwardOutlined } from '@vicons/material'
import i18n from '../i18n.json'
import func from '../func'
export default{
    props: ['eventype'],
    data(){
        return{
            mdata: window.sessionStorage.getItem('menudata')?JSON.parse(window.sessionStorage.getItem('menudata')):{},
            eventList: window.sessionStorage.getItem('eventList')?JSON.parse(window.sessionStorage.getItem('eventList')):[],
            wordCount: window.sessionStorage.getItem('wordCountData')?JSON.parse(window.sessionStorage.getItem('wordCountData')):{},
            i18n: i18n,
            server: this.$route.params.server,
            currentLang: func.l,
            unit: this.$route.params.server == "en_US"?'wordCount':'charCount'
        }
    },
    components: {
        ForwardIcon: ArrowForwardOutlined,
    },
    methods:{
        getEventWordCount(eventid){
            var counter = 0;
            for(var story in this.wordCount[eventid]){
                counter += this.wordCount[eventid][story];
            }
            return counter;
        }
    }
}
</script>

<style>
.events .n-list-item{
    min-width: 800px;
}
</style>