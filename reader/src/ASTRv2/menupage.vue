<template>
    <n-layout-content class="menupage">
        <n-tabs type="line" justify-content="space-evenly">
            <n-tab-pane name="home">
                <template v-slot:tab>
                    <n-icon><InfoIcon/></n-icon>&nbsp;{{i18n.homepage[currentLang]}}
                </template>
                <Homepage></Homepage>
            </n-tab-pane>

            <n-tab-pane v-for="(item,itemName,iidx) in navi" :name="itemName" :key="iidx">
                <template v-slot:tab>
                    <n-icon>
                        <img :src="item.icon" :alt="item.title"/>
                    </n-icon>&nbsp;
                    {{i18n[item.title][currentLang]}}
                </template>
                <div class="menucontent">
                    <Maintheme v-if="itemName == 'maintheme'"></Maintheme>
                    <Events :eventype="itemName" v-else></Events>
                </div>
                
            </n-tab-pane>
            <n-tab-pane name="search">
                <template v-slot:tab>
                    <n-icon><SearchIcon/></n-icon>&nbsp;{{i18n.search[currentLang]}}
                </template>
                <Search></Search>
            </n-tab-pane>
        </n-tabs>
        <router-view></router-view>
    </n-layout-content>
</template>

<script>
import {InfoOutlined, SearchOutlined} from "@vicons/material";
import i18n from './i18n.json';
import func from './func.js';
import maintheme from './menupage/maintheme.vue';
import events from "./menupage/events.vue";
import homepage from "./menupage/homepage.vue";
import search from "./menupage/search.vue";
import inter_icon from './icons/Intermezzi.svg';
import is_icon from './icons/IS.svg';
import m_icon from './icons/Maintheme.svg';
import or_icon from './icons/Record.svg';
import ss_icon from './icons/Sidestory.svg';
import set_icon from './icons/Storyset.svg';


export default {
    data(){
        return{
            navi:{
                maintheme:{icon:m_icon, title:'main'},
                intermezzi:{icon:inter_icon, title:'intermezzi'},
                sidestory:{icon:ss_icon, title:'ss'},
                storyset:{icon:set_icon, title:'mini'},
                or:{icon:or_icon, title:"or"},
                is:{icon:is_icon, title:"is"},
            },
            i18n: i18n,
            currentLang: func.l
        }
    },
    created(){
        //console.log(intermezzi)
    },
    components:{
        InfoIcon:InfoOutlined,
        SearchIcon:SearchOutlined,
        Maintheme: maintheme,
        Events: events,
        Homepage: homepage,
        Search: search,
    }
}
</script>

<style>
.menupage{
    min-height: 600px;
}
.menucontent{
    margin-left:15%;
}
</style>