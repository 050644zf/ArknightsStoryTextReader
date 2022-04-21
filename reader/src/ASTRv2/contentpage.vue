<template>
    <n-layout>
        
        <n-layout-content class="content" ref="content">
            <n-affix :top="30" :trigger-top="30" position="fixed">
            <n-skeleton v-if="loading" class="breadcrumb"></n-skeleton>
            <n-space justify="space-between" v-else item-style="display: flex;" align="center" class="breadcrumb">
                <n-breadcrumb >
                    <n-breadcrumb-item  @click="$router.push('/'+$route.params.server+'/menu')">
                        <n-icon><MenuIcon/></n-icon>
                        {{i18n.menu[currentLang]}}
                    </n-breadcrumb-item>
                    <n-breadcrumb-item @click="$router.push('/'+$route.params.server+'/event/'+data.eventid)">
                    {{data.eventName}}
                    </n-breadcrumb-item>
                    <n-breadcrumb-item>
                        <n-popselect :options="storyOpts" v-model:value="path" scrollable>
                            <n-text type="info">
                                {{data.storyCode}}  {{data.storyName}} - {{data.avgTag}}
                                <n-icon>
                                    <ArrowDropDown/>
                                </n-icon>                            
                            </n-text>
                        </n-popselect>
                    </n-breadcrumb-item>
                </n-breadcrumb>
                <n-divider vertical />
                <n-button-group>
                    <n-button secondary round type="info" v-show="storyIdx != 0" @click="paging(-1)">
                        <n-icon size="24">
                            <LastStory/>
                        </n-icon>
                    </n-button>
                    <n-button secondary round type="info" v-show="storyIdx!=storyOpts.length-1" @click="paging(1)">
                        <n-icon size="24">
                            <NextStory/>
                        </n-icon>
                    </n-button>
                </n-button-group>
            </n-space>
            </n-affix>

            <n-h4 prefix="bar" type="warning" v-if="!data.OPTIONTRACE && !loading">
                {{i18n.optionTraceDisabled[currentLang]}}
            </n-h4>
            <n-skeleton v-if="loading" :repeat="5"></n-skeleton>

            <div v-for="(line, lidx) in data.storyList" :key="line.id" class="line" :id="'line'+line.id" v-else>
            
                <Nameline v-if="line.prop == 'name'" :inputline="line" :lidx="lidx" :story="data.storyList"></Nameline>
                <Subtitle v-if="line.prop == 'Subtitle' || line.prop == 'Sticker'" :inputline="line"></Subtitle>
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
import {MenuOpenFilled, ArrowDropDownSharp,ChevronLeftOutlined,ChevronRightOutlined } from "@vicons/material"
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
            storyOpts: [],
            storyIdx: -1,
        }
    },
    metaInfo(){
        return{
            title: this.data.storyCode?this.data.storyCode+' '+this.data.storyName + ' - ' + this.data.avgTag + ' | Arknights Story Text Reader':this.data.storyName + ' - ' + this.data.avgTag + ' | Arknights Story Text Reader',
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
        this.$watch(
            () => this.path,
            (toPath, previousPath) => {
                //console.log(toPath, previousPath);
                if(previousPath != toPath){
                    this.$router.push({path:'/'+this.server+'/content', query:{f:toPath}});
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
        ArrowDropDown: ArrowDropDownSharp,
        LastStory: ChevronLeftOutlined,
        NextStory: ChevronRightOutlined,
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
            var sidx = 0;
            for(var story of this.mdata[this.eventid]['infoUnlockDatas']){
                opts.push({
                    value: story.storyTxt,
                    label: story.storyCode+' '+story.storyName+' - '+story.avgTag,
                });
                if(story.storyTxt == this.path){
                    this.storyIdx = sidx;
                }
                sidx++;
            }
            return opts;
        },
        pushStory(storyTxt){
            this.$router.push({path:'/'+this.server+'/content', query:{f:storyTxt}});
        },
        paging(inc){
            //console.log(this.storyIdx, this.storyOpts.length);
            this.pushStory(this.storyOpts[this.storyIdx+inc].value);
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

</style>
