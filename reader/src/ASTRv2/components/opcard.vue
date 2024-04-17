<template>
    <n-modal class="opcard font"
    :show="show"
    @mask-click="close" 
    >   
        <n-card v-if="show" closable @close="close">
            <template #header>
                <n-flex align="center">
                <n-image 
                :src="'https://raw.githubusercontent.com/Aceship/Arknight-Images/main/avatars/'+cdata.charID+'.png'"
                style="height: 72px;"
                preview-disabled
                />
                <n-flex vertical>
                    <n-flex align="baseline">
                        <n-h2 strong style="margin: 0px">{{cdata.name}}</n-h2>
                        <n-text depth="3" italic >{{cdata.appellation}}</n-text>
                    </n-flex>
                    <n-flex>
                        <n-tag v-if="cdata.displayNumber">{{cdata.displayNumber}} </n-tag>
                    </n-flex>
                </n-flex>


                </n-flex>
            </template>

            <n-tabs type="line" animated>
                <n-tab-pane name="archive" :tab="i18n.archive[currentLang]">
                    <n-scrollbar style="max-height: 70vh;">
                    <div v-for="(aline, aidx) in cdata.storyTextAudio" :key="aidx">
                        <n-divider>{{aline.storyTitle}}</n-divider>
                        <n-text v-for="(story, sidx) in aline.stories" :key="sidx"
                        v-html="parseContent(story.storyText)"
                        />
                    </div>
                    </n-scrollbar>
                </n-tab-pane>
                <n-tab-pane name="equip" :disabled="cdata.equips.length<1">
                    <template #tab>
                        <n-badge :value="cdata.equips.length" :offset="[6,0]" class="font">{{i18n.module[currentLang]}}</n-badge>
                    </template>
                    <n-collapse accordion :default-expanded-names="[0]">
                        <n-collapse-item v-for="(equip, eidx) in cdata.equips" :key="eidx" :name="eidx">
                        <template #header>
                            <n-text strong>{{equip.uniEquipName}}</n-text>
                        </template>
                        <template #header-extra>
                            <n-tag v-if="equip.type=='ADVANCED'" :color="tagColor(equip.equipShiningColor)">
                                {{equip.typeName1}} - {{equip.typeName2}}
                            </n-tag>
                            <n-tag v-else>{{equip.typeName1}}</n-tag>
                        </template>
                            <n-scrollbar style="max-height: 50vh;">
                                <n-flex vertical align="center">
                                    <n-image v-if="equip.type=='ADVANCED'" :src="getEquipUrl(equip.uniEquipId)" height="200"/>
                                <n-text v-html="parseContent(equip.uniEquipDesc)"></n-text>
                                </n-flex>

                            </n-scrollbar>
                        </n-collapse-item>
                    </n-collapse>
                </n-tab-pane>

                <n-tab-pane name="record" :disabled="cdata.handbookAvgList.length<1">
                    <template #tab>
                        <n-badge :value="cdata.handbookAvgList.length" :offset="[6,0]" class="font">{{i18n.or[currentLang]}}</n-badge>
                    </template>
                    <div v-for="(recs, ridx) in cdata.handbookAvgList" :key="ridx">
                        <n-divider>{{recs.storySetName}}</n-divider>
                        <n-list hoverable clickable>

                            <n-list-item v-for="(rec, reidx) in recs.avgList" :key="reidx" @click="warpToStory(rec.storyTxt)">
                                <template #prefix>
                                    <n-icon size="32" color="#FFF">
                                        <div class="terminal-record"></div>
                                    </n-icon>
                                </template>
                                <n-text>{{rec.storyIntro}}</n-text>
                                <template #suffix>
                                    <n-icon size="32" color="#FFF">
                                        <ArrowForwardOutlined />
                                    </n-icon>
                                </template>
                            </n-list-item>
                        </n-list>
                    </div>
                </n-tab-pane>

            </n-tabs>


        </n-card>
        <n-space v-else></n-space>
    </n-modal>
</template>

<script>
import func from '../func.js'
import source from '../source.js'
import {ArrowForwardOutlined} from "@vicons/material"
import i18n from '../i18n.json'
export default {
    props: ['cdata'],
    data(){
        return{
            parseContent: func.parseContent,
            currentLang: func.l,
            i18n: i18n,
        }
    },
    computed:{
        show(){
            // console.log(this.cdata);
            return this.cdata?true:false;
        },
    },
    methods:{
        close(){
            let server = this.$route.params.server;
            this.$router.push({name:'menu', params:{server:server,selected:'or'}});
        },
        warpToStory(storyTxt){
            this.$router.push({name:'content', params:{server:this.$route.params.server},query:{f:storyTxt}});
        },
        tagColor(color){
            var fontcolor = "white";
            if(color=="yellow") fontcolor = "black";
            return {color:color, textColor:fontcolor};
        },
        getEquipUrl(uniEquipId){
            return source.getEquipUrl(func.imageRepo, uniEquipId)
        }
    },
    components:{
        ArrowForwardOutlined
    }

}

</script>

<style>
.opcard{
    max-width: 800px;
}
.opcard .n-tabs-nav {
    background: #00000000;
    /* --n-bar-color: #ffcd43;
    --n-tab-text-color-active: #ffcd43;
    --n-tab-text-color-hover: #ffcd43; */

}

.opcard .n-card__content{
    background-color: rgba(0,0,0,0.2);
}



.n-tag{
    font-family: sans-serif;
    font-weight: bold;
}
</style>