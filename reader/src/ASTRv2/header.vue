<template>
    <n-layout-header >
        <n-space item-style="display: flex;" justify="space-between" align="center" class="header">
            <n-space item-style="display: flex;" align="center" >
                <n-image src="/ArknightsStoryTextReader/src/assets/favicon.png" width="40"/>
                <n-h2 style="margin: 0px;padding:5px;" strong>
                    Arknights Story Text Reader
                </n-h2>
            </n-space>

            <n-space justify="space-around" item-style="display: flex;" align="center">
                <n-dropdown :options="serverOpts" @select="pushServer" class="serverSelect">
                    <n-button text>
                        <n-icon>
                            <LangIcon/>
                        </n-icon>
                            {{i18n.server[$route.params.server]}}
                        <n-icon>
                            <ArrowDropDown/>
                        </n-icon>
                    </n-button>
                </n-dropdown>

                <Settings></Settings>

            </n-space>
        </n-space>

    </n-layout-header>
    
</template>

<script>
import { LanguageRound, ArrowDropDownSharp, SettingsOutlined } from "@vicons/material";
import i18n from './i18n.json';
import func from './func.js';
import settings from './settings.vue';

export default {
    data(){
        return{
            serverOpts: this.getServerOpts(),
            i18n: i18n,
            showsettings: false,
            server: this.$route.params.server,
        }
    },
    created(){
        this.$watch(
            () => this.$route.params,
            (toParams, previousParams) => {
                if(previousParams.server != toParams.server){
                    this.serverOpts = this.getServerOpts();
                }
            }
        );
    },
    components:{
        LangIcon:LanguageRound,
        ArrowDropDown:ArrowDropDownSharp,
        SettingsIcon:SettingsOutlined,
        Settings: settings,
    },
    emits: ['pushServer'],
    methods:{
        getServerOpts(){
            var opts = [];
            for(var s in i18n.server){
                opts.push({
                    label: i18n.server[s],
                    key: s,
                    disabled: s == this.$route.params.server
                });
            };
            console.log(this.$route);
            return opts;
        },
        async pushServer(server){
            this.$emit('pushServer', {server: server});
        },
    }
}
</script>

<style>
.header{
    background-color: #007575;
    font-weight: bold;
    padding: 0px 20px;
}
.SettingsBtn{
    font-size: large;
}
</style>