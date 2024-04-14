<template>
    <n-button @click="openInGTL()" strong secondary type="info" >
        <template #icon>
            <TranslateIcon/>
        </template>
        {{i18n.openInGoogleTL[UILang]}}
    </n-button>
</template>

<script>
import i18n from "../i18n.json";
import func from "../func.js";
import {TranslateOutlined}  from "@vicons/material";

export default {
    data(){
        return{
            i18n: i18n,
            currentLang: this.$route.params.server,
            UILang: func.l
        }
    },
    components:{
        TranslateIcon:TranslateOutlined,
    },
    methods:{
        openInGTL(){
            var target_lang = this.UILang.replace(/_/g, "-");
            if(target_lang== 'zh_CN') target_lang = 'en';
            var url = `https://050644zf-github-io.translate.goog/ArknightsStoryTextReader/?_x_tr_sl=zh-CN&_x_tr_tl=${target_lang}&_x_tr_hl=zh-CN&_x_tr_pto=wapp&_x_tr_hist=true#${this.$route.fullPath}`
            window.open(url, '_blank');
        }
    }
}
</script>