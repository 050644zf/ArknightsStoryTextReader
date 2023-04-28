<template>
    <n-layout-content class="menupage">
        <n-tabs type="line" justify-content="space-evenly" class="tabs" v-model:value="selected" animated>
            <n-tab-pane name="home">
                <template v-slot:tab>
                    <n-icon>
                        <InfoIcon />
                    </n-icon>
                    <n-text class="titletext">
                        &nbsp;{{i18n.homepage[currentLang]}}
                    </n-text>
                </template>
                <n-space vertical justify="center" item-style="display:flex" align="center">

                    <Homepage></Homepage>
                </n-space>

            </n-tab-pane>

            <n-tab-pane v-for="(item,itemName,iidx) in navi" :name="itemName" :key="iidx">
                <template v-slot:tab>
                    <n-icon>
                        <div :class="item.icon"></div>
                    </n-icon>
                    <n-text class="titletext">
                        &nbsp;{{i18n[item.title][currentLang]}}
                    </n-text>
                </template>                    
                <n-divider title-placement="center" class="eventtypetitle" dashed>

                        <n-icon size="32">
                            <div :class="item.icon"></div>
                        </n-icon>
                        <n-text style="font-size: 24px" strong>
                            &nbsp;{{i18n[item.title][currentLang]}}
                        </n-text>
                </n-divider>
                <n-space vertical class="menucontent" justify="center" item-style="display:flex" align="center">

                    <Maintheme v-if="itemName == 'maintheme'"></Maintheme>
                    <Events :eventype="itemName" v-else></Events>
                </n-space>

            </n-tab-pane>

            <n-tab-pane name="others">
                <template v-slot:tab>
                    <n-icon>
                        <AnalyticsIcon />
                    </n-icon>
                    <n-text class="titletext">
                        &nbsp;{{i18n.misc[currentLang]}}
                    </n-text>
                </template>
                <Misc class="menucontent"></Misc>
            </n-tab-pane>

            <n-tab-pane name="search">
                <template v-slot:tab>
                    <n-icon>
                        <SearchIcon />
                    </n-icon>
                    <n-text class="titletext">
                        &nbsp;{{i18n.search[currentLang]}}
                    </n-text>
                </template>
                <Search></Search>
            </n-tab-pane>
        </n-tabs>
        <router-view></router-view>
    </n-layout-content>
</template>

<script>
import {InfoOutlined, SearchOutlined, AnalyticsOutlined} from "@vicons/material";
import i18n from './i18n.json';
import func from './func.js';
import maintheme from './menupage/maintheme.vue';
import events from "./menupage/events.vue";
import homepage from "./menupage/homepage.vue";
import search from "./menupage/search.vue";
import misc from './misc.vue'


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
            currentLang: func.l,
            selected: 'home',
        }
    },
    components:{
        InfoIcon:InfoOutlined,
        SearchIcon:SearchOutlined,
        AnalyticsIcon:AnalyticsOutlined,
        Maintheme: maintheme,
        Events: events,
        Homepage: homepage,
        Search: search,
        Misc: misc,
    }
}
</script>

<style>
.menupage {
    min-height: 600px;
}

.menupage>.n-layout-scroll-container {
    overflow-y: hidden;
}

.n-tabs-nav {
    background: #3b3830;
    /* --n-bar-color: #ffcd43;
    --n-tab-text-color-active: #ffcd43;
    --n-tab-text-color-hover: #ffcd43; */

}

.menucontent {
    /* margin: 0% 0% 2% 15%; */
}

.eventtypetitle .n-divider__line{
    background-color: #7f7f7f !important;
}
@media(max-width: 1000px) {
    .titletext {
        display: none;
    }
}
</style>