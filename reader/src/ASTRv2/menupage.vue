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
                    <n-icon><div :class="item.icon"></div></n-icon>&nbsp;{{i18n[item.title][currentLang]}}
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
                To Be Done
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
export default {
    data(){
        return{
            navi:{
                maintheme:{icon:'terminal-maintheme', title:'main'},
                intermezzi:{icon:'terminal-intermezzi', title:'intermezzi'},
                sidestory:{icon:'terminal-sidestory', title:'ss'},
                storyset:{icon:'terminal-storyset', title:'mini'},
                or:{icon:'terminal-record', title:"or"},
            },
            i18n: i18n,
            currentLang: func.l
        }
    },
    components:{
        InfoIcon:InfoOutlined,
        SearchIcon:SearchOutlined,
        Maintheme: maintheme,
        Events: events,
        Homepage: homepage
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