<template>
    <n-layout-header >
        <n-space item-style="display: flex; " justify="space-between" align="center" class="header" style="flex-warp: nowarp;">
            <n-space item-style="display: flex;" align="center">
                <router-link to="/" #="{ navigate, href }" custom>
                    <n-a :href="href" @click="navigate">
                        <n-image src="https://raw.githubusercontent.com/050644zf/ArknightsStoryTextReader/master/reader/src/assets/favicon.png" style="width:40px;height:40px"  preview-disabled/>
                    </n-a>
                </router-link>


                <n-space item-style="display: flex;" align="baseline" >
                    <n-h2 style="margin: 0px;padding:5px;" strong class="astrtitle">
                        Arknights Story Text Reader
                    </n-h2>
                    <n-text depth="3" class="astrversion">web version 1.1 </n-text>
                </n-space>

            </n-space>

            <n-space justify="space-around" item-style="display: flex;" align="center">
                <Warp v-if="loaded"/>
                <n-dropdown :options="serverOpts" @select="pushServer" class="serverSelect">
                    <n-button text>
                        <template #icon>
                        <n-icon>
                            <LangIcon/>
                        </n-icon>
                        </template>
                            <n-text class="servername">{{i18n.server[$route.params.server]}}</n-text>
                        <n-icon size="24">
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
import warp from './warp.vue';

export default {
    data(){
        return{
            serverOpts: this.getServerOpts(),
            i18n: i18n,
            showsettings: false,
            server: this.$route.params.server,
        }
    },
    props: ['loaded'],
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
        Warp: warp,
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

@media(max-width: 1000px){
    .astrversion{
        display: none;
    }
}

@media(max-width: 820px){
    .astrtitle{
        display: none;
    }
}

@media(max-width: 500px){
    .servername{
        display: none;
    }
}
</style>
