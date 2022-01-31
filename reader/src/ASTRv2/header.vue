<template>
    <n-layout-header class="header">
        <n-space justify="space-between" align="center">
            <n-h1 style="margin: 0px;">
                <n-image src="/src/assets/favicon.png" width="40"/>
                Arknights Story Text Reader
            </n-h1>
            <n-space justify="end">
                <n-dropdown :options="serverOpts" @select="$router.push(key)">
                    <n-space align="center" inline=true><n-h2>
                        <n-icon>
                            <LangIcon/>
                        </n-icon>
                        {{i18n.server[server]}}
                        <n-icon>
                            <ArrowDropDown/>
                        </n-icon>
                    </n-h2></n-space>
                </n-dropdown>
            </n-space>
        </n-space>

    </n-layout-header>
</template>

<script>
import { LanguageRound, ArrowDropDownSharp } from "@vicons/material";
import i18n from './i18n.json';
import func from './func.js';

export default {
    data(){
        return{
            serverOpts: this.getServerOpts(),
            i18n: i18n,
        }
    },
    props: {
        server: {
            type: String,
        },
    },
    components:{
        LangIcon:LanguageRound,
        ArrowDropDown:ArrowDropDownSharp
    },
    methods:{
        getServerOpts(){
            var opts = [];
            for(var s in i18n.server){
                opts.push({
                    label: i18n.server[s],
                    key: s,
                    disabled: s == this.server
                });
            };
            console.log(opts);
            return opts;
        },
    }
}
</script>

<style>
.header{
    background-color: #007575;
    font-weight: bold;
}
</style>