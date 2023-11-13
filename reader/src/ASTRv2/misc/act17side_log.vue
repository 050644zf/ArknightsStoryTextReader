<template>
<n-layout-content>
    <n-space vertical class="isrecords">
        <n-breadcrumb class="breadcrumb">
            <n-breadcrumb-item  @click="$router.push('/'+$route.params.server+'/menu')">
                <n-icon><MenuIcon/></n-icon>
                {{i18n.menu[currentLang]}}
            </n-breadcrumb-item>
            <n-breadcrumb-item>愚人号行动日志 | Stultifera Navis Operation Log</n-breadcrumb-item>
        </n-breadcrumb>
        <n-layout has-sider v-if="is_mdata_loaded">
            <n-layout-sider bordered width="240" style="height: 80vh" :native-scrollbar="false" collapse-mode="width" show-trigger :collapsed-width="20">
                <n-menu :options="menu_options" @update:value="loadLog" ></n-menu>
            </n-layout-sider>
            <n-layout-content style="height: 80vh" :native-scrollbar="false">
                <n-empty v-if="current_Opt == {}"></n-empty>
                <n-space v-else vertical >
                    <n-h2 prefix="bar">{{current_Opt.id}} {{current_Opt.label}}</n-h2>

                    <n-space v-for="(log, index) in current_Log" :key="index" item-style="display:flex;" style="flex-wrap: nowrap" align="center">
                        <n-icon>
                            <BarIcon/>
                        </n-icon>
                        <n-text v-html="parseContent(log.logDesc)"></n-text>
                    </n-space>

                    
                </n-space>
            </n-layout-content>
        </n-layout>
    </n-space>
</n-layout-content>
</template>

<script>
import {MenuOpenFilled, MessageRound, MinusOutlined} from "@vicons/material";
import {useLoadingBar,useDialog } from 'naive-ui'
import i18n from '../i18n.json'
import func from '../func.js'

export default {
    data(){
        return{
            mdata : {},
            is_mdata_loaded: false,
            loadingbar: useLoadingBar(),
            server: this.$route.params.server,
            log_entries: {},
            menu_options: [],
            log_data: {},
            i18n: i18n,
            currentLang: func.l,
            current_Opt: {},
            current_Log: [],
            parseContent: func.parseContent
        }
    },
    created(){
        this.loadingbar.start();
        this.loadLogData();
    },
    methods:{
        async loadLogData(){
            try{
                var mdata = {};
                if(this.server == 'zh_CN'){
                    mdata = await fetch('https://raw.githubusercontent.com/Kengxxiao/ArknightsGameData/master/'+this.server+'/gamedata/excel/story_review_meta_table.json').then(res => res.json());                    
                }
                else
                {
                    mdata = await fetch('https://raw.githubusercontent.com/Kengxxiao/ArknightsGameData_YoStar/main/'+this.server+'/gamedata/excel/story_review_meta_table.json').then(res => res.json());
                }

                this.mdata = mdata;
                this.log_entries = this.mdata.actArchiveData.components.act17side.log;
                this.log_data = this.mdata.actArchiveResData.logs;
                Object.keys(this.log_entries).forEach(key => {
                    this.menu_options.push({
                        key: key,
                        label: this.log_entries[key].chapterName,
                        logs: this.log_entries[key].logs,
                        id: this.log_entries[key].displayId
                    })
                });
                this.is_mdata_loaded = true;
                this.loadingbar.finish();
            }
            catch(e){
                console.log(e);
            }
        },
        loadLog(key,opt){
            this.current_Opt = opt;
            this.current_Log = [];
            for(var log in opt.logs){
                var logid = opt.logs[log];
                this.current_Log.push(this.log_data[logid])
            }
        }
    },
    components:{
        MenuIcon: MenuOpenFilled,
        MsgIcon: MessageRound,
        BarIcon: MinusOutlined
    }
}
</script>

<style>

</style>