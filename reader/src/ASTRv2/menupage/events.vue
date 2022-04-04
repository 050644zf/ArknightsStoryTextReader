<template>
    <n-space class="events" item-style="display:flex;">
        <n-list class="list">
            <n-list-item v-for="(edata, eidx) in eventList[eventype]" :key="eidx">
                <n-space item-style="display:flex;" align="center">
                    <img v-if="eventype != 'or'" :src="'https://raw.githubusercontent.com/050644zf/ArknightsStoryJson/main/img/banners/'+edata.id+'.png'"/>
                    <img v-else :src="'https://aceship.github.io/AN-EN-Tags/img/avatars/char_'+edata.cid+'_'+edata.cin+'.png'" style="height: 64px;"/>
                    <n-space item-style="display:flex;" align="baseline">
                        <n-h2 style="padding:0px;">{{edata.name}}</n-h2>
                        <n-text depth="3" v-if="eventype=='or'">#{{edata.set}}</n-text>
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
export default{
    props: ['eventype'],
    data(){
        return{
            mdata: window.sessionStorage.getItem('menudata')?JSON.parse(window.sessionStorage.getItem('menudata')):{},
            eventList: window.sessionStorage.getItem('eventList')?JSON.parse(window.sessionStorage.getItem('eventList')):[],
        }
    },
    components: {
        ForwardIcon: ArrowForwardOutlined,
    },
    methods:{
    }
}
</script>

<style>
.events .n-list-item{
    min-width: 800px;
}
</style>