<template>
    <n-layout-content class="act25side">
        <n-space vertical class="isrecords">
            <n-breadcrumb class="breadcrumb">
                <n-breadcrumb-item  @click="$router.push('/'+$route.params.server+'/menu')">
                    <n-icon><MenuIcon/></n-icon>
                    {{i18n.menu[currentLang]}}
                </n-breadcrumb-item>
                <n-breadcrumb-item>孤星调查报告 | Lone Trail Investigation Report</n-breadcrumb-item>
            </n-breadcrumb>

            <n-collapse default-expanded-names="1" accordion >
                <n-collapse-item v-for="(report,idx) in menu_options" :key="report.key" :name="idx" :class="{'log':true,'expanded':menu_options[idx].expanded}">
                    <template #header>
                        <n-space>
                            <n-icon><ArchiveIcon/></n-icon>
                            <n-text style="font-weight:bold !important;">{{report.label}}</n-text>
                        </n-space>
                    </template>
                    <n-space justify="center" >
                        <n-text v-html="parseContent(report.item)" class="log_text"></n-text>
                    </n-space>
                    
                </n-collapse-item>
            </n-collapse>

        </n-space>
    </n-layout-content>
</template>
    
<script>
import {MenuOpenFilled, MessageRound, MinusOutlined} from "@vicons/material";
import {Archive} from "@vicons/fa";
import {useLoadingBar,useDialog,NIcon,NText} from 'naive-ui'
import i18n from '../i18n.json'
import func from '../func.js'
import {h} from 'vue';

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
            current_Text: "",
            parseContent: func.parseContent,
            crtKey: ""
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
                this.log_entries = this.mdata.actArchiveData.components.act25side.story.stories;
                this.log_data = this.mdata.actArchiveResData.stories;

                Object.keys(this.log_entries).forEach(key => {
                    var t = this.log_data[key].text;
                    t = this.parseContent(t);
                    this.menu_options.push({
                        key: key,
                        label: this.log_data[key].desc,
                        item: t,
                        id: this.log_data[key].id,
                        expanded: false
                    })
                });
                this.is_mdata_loaded = true;
                this.loadingbar.finish();
            }
            catch(e){
                console.log(e);
            }
        },
        renderIcon(icon) {
            return () => h(NIcon, null, { default: () => h(icon) });
        },
        renderText(text){
            return () => h(NText, null, { default: () => h(text) });
        },
        loadLog(key,opt){
            this.current_Text = opt;
        },
        handleClick(name,expanded){
            this.menu_options[name].expanded = expanded;
        },
    },
    components:{
        MenuIcon: MenuOpenFilled,
        MsgIcon: MessageRound,
        BarIcon: MinusOutlined,
        ArchiveIcon: Archive
    }
}
</script>
    
<style>

.isrecords .log .n-space{
    display: flex;
    align-items: center;
}
.isrecords .log .log_text{
    display: block;
    max-width: 800px;
}
.expanded{
    background-color: antiquewhite;
    color: black;
}
</style>