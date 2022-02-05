<template>
    <n-layout>
        
        <n-layout-content class="content" ref="content">
            <n-affix :top="20" :trigger-top="20" position="fixed">
            <n-skeleton v-if="loading" class="breadcrumb"></n-skeleton>
            <n-breadcrumb class="breadcrumb" v-else>
                <n-breadcrumb-item>
                    <n-icon><MenuIcon/></n-icon>
                    {{i18n.menu[currentLang]}}
                </n-breadcrumb-item>
                <n-breadcrumb-item @click="$router.push('/'+$route.params.server+'/event/'+data.eventid)">{{data.eventName}}</n-breadcrumb-item>
                <n-breadcrumb-item>{{data.storyCode}}  {{data.storyName}} - {{data.avgTag}}</n-breadcrumb-item>
            </n-breadcrumb>
            </n-affix>

            <div v-for="(line, lidx) in data.storyList" :key="line.id" class="line" :id="'line'+line.id">
            
                <Nameline v-if="line.prop == 'name'" :inputline="line" :lidx="lidx" :story="data.storyList"></Nameline>
                <Subtitle v-if="line.prop == 'Subtitle'" :inputline="line"></Subtitle>
                <Decision v-if="line.prop == 'Decision'" :inputline="line"></Decision>
                <Predicate v-if="line.prop == 'Predicate'" :inputline="line"></Predicate>
                <Delay v-if="line.prop == 'Delay' && showDelay == 'y'" :inputline="line"></Delay>
                <Showimg v-if="line.prop == 'Image' && line.attributes.image" :inputline="line"></Showimg>
                
                <div style="clear: both;"></div>
            </div>        
        </n-layout-content>
        
    </n-layout>

</template>

<script>
import menuVue from "./menu.vue"
import func from "./func.js"
import i18n from "./i18n.json"
import nameline from './content/nameline.vue';
import subtitle from './content/subtitle.vue';
import decision from './content/decision.vue';
import predicate from './content/predicate.vue';
import delay from './content/delay.vue';
import img from './content/img.vue';
import {MenuOpenFilled} from "@vicons/material"
import {useLoadingBar } from 'naive-ui'

export default {
    data(){
        return{
            path: this.$route.query.f,
            data: {},
            server: this.$route.params.server,
            i18n: i18n,
            currentLang: func.l,
            showDelay: func.showDelay,
            loading: true,
            loadingbar: useLoadingBar(),
        }
    },
    created(){
        this.loadingbar.start();
        this.getStoryData();
        this.$watch(
            () => this.$route.params,
            (toParams, previousParams) => {
                if(previousParams.server == toParams.server && previousParams.path != toParams.path){
                    this.getStoryData();
                }
            }
        );
    },
    components:{
        Menu: menuVue,
        Nameline: nameline,
        Subtitle: subtitle,
        Decision: decision,
        Predicate: predicate,
        Delay: delay,
        Showimg: img,
        MenuIcon: MenuOpenFilled,
    },
    methods:{
        async getStoryData(){
            this.loading = true;
            fetch('https://raw.githubusercontent.com/050644zf/ArknightsStoryJson/main/'+this.server+'/gamedata/story/'+this.path+'.json').then(res => res.json()).then(s => {this.data = s; this.loading = false; this.loadingbar.finish();}).catch();
        }
    }
}
</script>

<style>
.content{
    margin-left: 15%;
    max-width: 800px;
    min-height: 600px;
}
.content .breadcrumb{
    background-color: rgba(0, 0, 0, 1);
    padding:5px 10px;
    box-shadow: 5px 5px 5px rgba(0,0,0,0.2);
}
</style>
