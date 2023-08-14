<template>
    <n-button text class="SettingsBtn" @click="showsettings=true">
        <n-icon size="24">
            <SettingsIcon/>
        </n-icon>
    </n-button>
    <n-drawer v-model:show="showsettings" placement="top" height="400">
        <n-drawer-content :closable="inited" >
            <template #header>
                <n-space item-style="display:flex;" align="center">
                    <n-icon>
                        <SettingsIcon/>
                    </n-icon>
                    <span>{{i18n.setting[currentLang]}}</span>
                </n-space>
            </template>
            <n-space vertical item-style="display: flex" justify="space-between">

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
                        <MirrorIcon/>
                    </n-icon>
                    {{i18n.mirror[currentLang]}}: 
                    <n-switch v-model:value="mirror" checked-value="mirror" unchecked-value="origin"/>
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

                <n-space item-style="display:flex;" align="center">
                    <n-icon>
                        <BGIcon/>
                    </n-icon>
                    {{i18n.showbg[currentLang]}}: 
                    <n-radio-group v-model:value="bgMode">
                        <n-radio-button v-for="mode in bgModes" :key="mode" :value="mode">
                            {{i18n['bg_'+mode][currentLang]}}
                        </n-radio-button>
                    </n-radio-group>
                </n-space>
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
import { SettingsOutlined, PublicFilled, DriveFileRenameOutlineRound, VerticalDistributeOutlined, SaveAltOutlined, DeleteOutlineFilled, WallpaperOutlined,LibraryAddOutlined } from "@vicons/material";
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
           mirror: func.mirror,
           hideName: func.hideName,
           bgMode: func.bgMode,
           bgModes: func.bgModes,
           showsettings: !func.inited,
       }
    },
    components:{
        SettingsIcon: SettingsOutlined,
        LangIcon: PublicFilled,
        DrNameIcon: DriveFileRenameOutlineRound,
        BlankIcon: VerticalDistributeOutlined,
        SaveIcon: SaveAltOutlined,
        ResetIcon: DeleteOutlineFilled,
        BGIcon: WallpaperOutlined,
        MirrorIcon: LibraryAddOutlined,
    },
    methods:{
        save(){
            window.localStorage.setItem('inited',true);
            window.localStorage.setItem('doctor',this.doctor);
            window.localStorage.setItem('showDelay', this.showDelay);
            window.localStorage.setItem('mirror', this.mirror);
            window.localStorage.setItem('hideName', this.hideName);
            window.localStorage.setItem('lang', this.currentLang);
            window.localStorage.setItem('bgMode', this.bgMode);
            window.location.reload(true);
        },
        clearSetting(){
            window.localStorage.clear();
            window.location.reload(true);
        },
    }
}
</script>