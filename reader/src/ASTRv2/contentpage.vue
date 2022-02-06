<template>
    <n-layout>
        
        <n-layout-content class="content" ref="content">
            <n-affix :top="20" :trigger-top="20" position="fixed">
            <n-skeleton v-if="loading" class="breadcrumb"></n-skeleton>
            <n-breadcrumb class="breadcrumb" v-else>
                <n-breadcrumb-item  @click="$router.push('/'+$route.params.server+'/menu')">
                    <n-icon><MenuIcon/></n-icon>
                    {{i18n.menu[currentLang]}}
                </n-breadcrumb-item>
                <n-breadcrumb-item @click="$router.push('/'+$route.params.server+'/event/'+data.eventid)">
                {{data.eventName}}
                </n-breadcrumb-item>
                <n-breadcrumb-item>
                    <n-dropdown :options="storyOpts" @select="pushStory" trigger="click" class="storydropdown">
                        <n-text type="info">
                            {{data.storyCode}}  {{data.storyName}} - {{data.avgTag}}
                            <n-icon>
                                <ArrowDropDown/>
                            </n-icon>                            
                        </n-text>

                    </n-dropdown>
                </n-breadcrumb-item>
            </n-breadcrumb>
            </n-affix>

            <n-h4 prefix="bar" type="warning" v-if="!data.OPTIONTRACE && !loading">
                {{i18n.optionTraceDisabled[currentLang]}}
            </n-h4>

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
import {MenuOpenFilled, ArrowDropDownSharp} from "@vicons/material"
import {useLoadingBar,useDialog } from 'naive-ui'

export default {
    data(){
        return{
            path: this.$route.query.f,
            data: {},
            eventid: '',
            server: this.$route.params.server,
            i18n: i18n,
            currentLang: func.l,
            showDelay: func.showDelay,
            loading: true,
            loadingbar: useLoadingBar(),
            dialog: useDialog(),
            mdata: window.sessionStorage.getItem('menudata')?JSON.parse(window.sessionStorage.getItem('menudata')):{},
            storyOpts: []
        }
    },
    created(){
        this.loadingbar.start();
        this.getStoryData();
        this.$watch(
            () => this.$route.query,
            (toQuery, previousQuery) => {
                if(previousQuery.f != toQuery.f && toQuery.f){
                    this.loadingbar.start();
                    this.path = toQuery.f;
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
        ArrowDropDown: ArrowDropDownSharp
    },
    methods:{
        async getStoryData(){
            this.loading = true;
            fetch('https://raw.githubusercontent.com/050644zf/ArknightsStoryJson/main/'+this.server+'/gamedata/story/'+this.path+'.json').then(res => res.json()).then(s => {this.data = s;this.eventid = s.eventid;}).then(() => {this.storyOpts=this.getStoryOpts();this.loading = false; this.loadingbar.finish();}).catch(e => {
                this.loadingbar.error();
                console.log(e);
                this.dialog.error({
                    title: 'Fail to Load Story Data',
                    content: 'This maybe because the story is not availble in this server or the story is not exist. If you sure the story is exist in this server, please summit a issue. ',
                    });
            });
        },
        getStoryOpts(){
            var opts = [];
            for(var story of this.mdata[this.eventid]['infoUnlockDatas']){
                opts.push({
                    key: story.storyTxt,
                    label: story.storyCode+' '+story.storyName+' - '+story.avgTag,
                    disabled: story.storyTxt == this.path,
                });
            }
            return opts;
        },
        pushStory(storyTxt){
            this.$router.push({path:'/'+this.server+'/content', query:{f:storyTxt}});
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
    margin:10px;
    background-color: rgba(0, 0, 0, 1);
    padding:5px 10px;
    box-shadow: 5px 5px 5px rgba(0,0,0,0.2);
}
.storydropdown{
    max-height: 500px;
    overflow-y: scroll;
}
</style>
