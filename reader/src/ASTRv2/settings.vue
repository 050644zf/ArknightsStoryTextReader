<template>
    <n-button text class="SettingsBtn" @click="showsettings=true">
        <n-icon size="24">
            <SettingsIcon/>
        </n-icon>
    </n-button>
    <n-drawer v-model:show="showsettings" placement="top">
        <n-drawer-content closable >
            <template #header>
                <n-space item-style="display:flex;" align="center">
                    <n-icon>
                        <SettingsIcon/>
                    </n-icon>
                    <span>{{i18n.setting[currentLang]}}</span>
                </n-space>
            </template>
            <n-space item-style="display:flex;" align="center">
                <n-icon>
                    <LangIcon/>
                </n-icon>
                {{i18n.currentLang[currentLang]}}: 
                <n-radio-group v-model:value="currentLang">
                    <n-radio-button v-for="lang in langOpts" :key="lang" :value="lang">
                        {{lang}}
                    </n-radio-button>
                </n-radio-group>
            </n-space>
            <n-space item-style="display:flex;" align="center">
                <n-icon>
                    <DrNameIcon/>
                </n-icon>
                {{i18n.dr[currentLang]}}: 
                <n-space item-style="display:flex;" align="center" justify="end">
                    Dr.
                    <n-input v-model:value="doctor" type="text" placeholder="{@nickname}"/>
                </n-space>
                
            </n-space>
            <n-space item-style="display:flex;" align="center">
                <n-icon>
                    <BlankIcon/>
                </n-icon>
                {{i18n.showDelay[currentLang]}}: 
                <n-switch v-model:value="showDelay" checked-value="y" unchecked-value="n"/>
            </n-space>

            <template #footer>
                <n-space item-style="display:flex;" align="center" justify="end">
                    <n-button strong secondary type="error" @click="clearSetting()">
                        <template #icon>
                        <n-icon>
                            <ResetIcon/>
                        </n-icon>                            
                        </template>
                        {{i18n.clear[currentLang]}}
                    </n-button>
                    <n-button strong type="primary" @click="save()">
                        <template #icon>
                        <n-icon>
                            <SaveIcon/>
                        </n-icon>                            
                        </template>
                        {{i18n.save[currentLang]}}
                    </n-button>
                </n-space>
            </template>
        </n-drawer-content>
    </n-drawer>
</template>

<script>
import { SettingsOutlined, PublicFilled, DriveFileRenameOutlineRound, VerticalDistributeOutlined, SaveAltOutlined, DeleteOutlineFilled } from "@vicons/material";
import i18n from './i18n.json';
import func from './func.js';
export default {
    data(){
       return{
           i18n: i18n,
           currentLang: func.l,
           langOpts: func.langList,
           doctor: func.doctor,
           showDelay: func.showDelay,
           hideName: func.hideName,
       }
    },
    props:{
        showsettings: {
            type: Boolean,
            default: false,
        },
    },
    components:{
        SettingsIcon: SettingsOutlined,
        LangIcon: PublicFilled,
        DrNameIcon: DriveFileRenameOutlineRound,
        BlankIcon: VerticalDistributeOutlined,
        SaveIcon: SaveAltOutlined,
        ResetIcon: DeleteOutlineFilled,
    },
    methods:{
        save(){
            window.localStorage.setItem('doctor',this.doctor);
            window.localStorage.setItem('showDelay', this.showDelay);
            window.localStorage.setItem('hideName', this.hideName);
            window.localStorage.setItem('lang', this.currentLang);
            window.location.reload(true);
        },
        clearSetting(){
            window.localStorage.clear();
            window.location.reload(true);
        },
    }
}
</script>