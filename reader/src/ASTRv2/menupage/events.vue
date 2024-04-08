<template>
    <n-flex class="events" justify="center">

    <!-- <n-space vertical>
            
            <n-space  item-style="display: flex;" align="center" >
                <n-card content-style="padding: 0px;" v-for="(edata, eidx) in eventList[eventype]" :key="eidx" size="large" class="episode" @click="$router.push('/'+$route.params.server+'/event/'+eid)">
                    <template #cover>
                        <img v-if="eventype != 'or'" :src="'https://raw.githubusercontent.com/050644zf/ArknightsStoryJson/main/img/banners/'+edata.id+'.png'"/>
                        <img v-else :src="'https://raw.githubusercontent.com/Aceship/Arknight-Images/main/avatars/char_'+edata.cid+'_'+edata.cin+'.png'" style="height: 64px;"/>
                    </template>
                    <n-text style="padding:0px;margin:0px;font-size:24px;text-align: center;">{{edata.name}}</n-text>
                    <n-text depth="3" v-if="eventype=='or'">#{{edata.set}}</n-text>
                </n-card>
                
            </n-space>
        </n-space> -->


        <n-list class="list" hoverable clickable>
            <template #header v-if="eventype != 'or'">
                <n-space item-style="display:flex;" align="center" justify="end">
                    <n-text>
                        <n-icon size="24px"><SortOutlined /></n-icon>
                    </n-text>
                    <n-radio-group v-model:value="sortType" size="small" @change="sortEvent" >
                        <n-radio-button value="ascend">{{i18n.timeasc[currentLang]}}</n-radio-button>
                        <n-radio-button value="descend">{{i18n.timedesc[currentLang]}}</n-radio-button>
                    </n-radio-group>
                </n-space>
            </template>


            <TransitionGroup name="list">
            <div v-for="(edata, eidx) in getEventList" :key="edata.id">
            <n-list-item >
                <n-flex align="center" class="eventtitle" @click="$router.push('/'+$route.params.server+'/event/'+edata.id)">
                    <n-image v-if="eventype != 'or'" :src="'https://raw.githubusercontent.com/050644zf/ArknightsStoryJson/main/img/banners/'+edata.id+'.png'"
                    fallback-src="https://raw.githubusercontent.com/050644zf/ArknightsStoryJson/main/img/banners/404.png"
                    preview-disabled/>
                    <n-image v-else :src="'https://raw.githubusercontent.com/Aceship/Arknight-Images/main/avatars/char_'+edata.cid+'_'+edata.cin+'.png'" style="height: 64px;"
                    fallback-src="https://raw.githubusercontent.com/050644zf/ArknightsStoryJson/main/img/icons/404.png"
                    preview-disabled
                    />
                    <n-flex vertical justify="space-around">
                        <n-flex  align="baseline" >
                            <n-text style="padding:0px;margin:0px;font-size:24px;text-align: center;">{{edata.name}}</n-text>
                            <n-text depth="3" v-if="eventype=='or'">#{{edata.set}}</n-text>
                        </n-flex>
                        <n-space class="eventstat">
                            <n-statistic  v-if="eventype != 'or'"  >
                                <template #label>
                                    <n-icon ><AccessTimeFilled /></n-icon>
                                    {{i18n.startTime[currentLang]}}
                                </template>
                                <template #default>
                                    <n-time :time="edata.startTime" format="yyyy-MM" unix />
                                </template>
                            </n-statistic>
                            <n-statistic >
                                <template #label>
                                    <n-icon ><ArticleRound /></n-icon>
                                    {{i18n.length[currentLang]}}
                                </template>
                                <template #suffix>
                                    <n-text style="font-size:medium;color:rgba(255,255,255,0.5)">{{i18n[unit][currentLang]}}</n-text>
                                </template>
                                <template #default>
                                    <!-- <n-text>{{getEventWordCount(edata.id)}}</n-text> -->
                                    <n-number-animation
                                    :to="getEventWordCount(edata.id)"
                                    show-separator
                                    />
                                </template>
                            </n-statistic>
                        </n-space>
                    </n-flex>


                </n-flex>
                <template #suffix>
                    <OpenInNew :link="'/'+$route.params.server+'/event/'+edata.id"/>
                </template>
            </n-list-item>
            </div>
            </TransitionGroup>
        </n-list>
    </n-flex>
</template>

<script>
import { ArrowForwardOutlined, OpenInNewOutlined,AccessTimeFilled,ArticleRound, SortOutlined } from '@vicons/material'
import i18n from '../i18n.json'
import func from '../func'
import openInNew from "../components/openInNewBtn.vue"
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
            unit: this.$route.params.server == "en_US"?'wordCount':'charCount',
            sortType: 'ascend',
        }
    },
    computed:{
        getEventList(){
            return this.eventList[this.eventype];
        }
    },
    components: {
        OpenInNew: openInNew,
        AccessTimeFilled,
        ArticleRound,
        SortOutlined
    },
    methods:{
        getEventWordCount(eventid){
            var counter = 0;
            for(var story in this.wordCount[eventid]){
                counter += this.wordCount[eventid][story];
            }
            return counter;
        },
        sortByTime(a, b){
            return a.startTime - b.startTime;
        },
        sortEvent(){
            let events = this.eventList[this.eventype].slice();
            if(this.sortType == 'ascend'){
                events.sort(this.sortByTime);
            }else{
                events.sort(this.sortByTime).reverse();
            }
            this.eventList[this.eventype] = events;
        },  
    }
}
</script>

<style>
.events .list{
    width: 80vw;
    max-width: 1200px;
}
.list-move, /* 对移动中的元素应用的过渡 */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* 确保将离开的元素从布局流中删除
  以便能够正确地计算移动的动画。 */
.list-leave-active {
  position: absolute;
}
@media(max-width: 700px){
    .eventstat{
        display: none !important;
    }
    .eventtitle{
        flex-direction: column !important;
    }
    .eventwarp{
        display: none !important;
    }
}
</style>
