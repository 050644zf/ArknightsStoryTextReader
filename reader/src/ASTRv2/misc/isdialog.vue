<template>
<n-space v-if="!rec_loaded">
    <n-button strong secondary type="info" @click="loadDialog()" :loading="loading">
        <template #icon><MsgIcon/></template>
        {{i18n.loadDialog[currentLang]}}
    </n-button>    
</n-space>
<n-space vertical v-if="rec_loaded">
    <n-button strong secondary type="info" @click="show = !show">
        <template #icon>
            <UnfoldIcon v-if="!show"/>
            <FoldIcon v-else/>
        </template>
        <n-text v-if="!show">{{i18n.unfold[currentLang]}}</n-text>
        <n-text v-else>{{i18n.fold[currentLang]}}</n-text>
    </n-button>
    <n-collapse-transition v-show="show">    
    <n-tabs type="segment">
        <n-tab-pane v-for="(rec, rid, ridx) in records" :key="ridx" :tab="rid" :name="rid">
            <n-space vertical>
                <div v-for="(line, lidx) in rec" :key="lidx">
                    <n-text v-if="line.prop=='Title'">{{line.content}}</n-text>
                    <n-text v-if="line.prop=='Div'">{{line.content}}</n-text>
                    <n-space v-if="line.prop=='Dialog'" item-style="display:flex" align="center">
                        <img :src="getCharAvatar(line.attributes.head)" style="width:40px" class="avatar"/>
                        <n-card content-style="padding:10px" class="chatbox">{{line.content}}</n-card>
                    </n-space>
                    
                </div>
            </n-space>
        </n-tab-pane>
    </n-tabs>
    </n-collapse-transition>       

</n-space>


</template>

<script>
import {MenuOpenFilled, MessageRound, UnfoldMoreOutlined , UnfoldLessOutlined} from "@vicons/material";
import i18n from '../i18n.json'
import func from '../func.js'
export default {
    data(){
        return{
            records:{},
            rec_loaded:false,
            i18n: i18n,
            currentLang: func.l,
            show: false,
            loading: false            
        }
    },
    props: ['chatid'],
    methods:{
        async loadDialog(){
            this.loading = true;
            var path = 'https://raw.githubusercontent.com/Kengxxiao/ArknightsGameData/master/zh_CN/gamedata/story/obt/rogue/'+this.chatid+'/';
            var i = 1;
            while(true){
                try{
                    let res = await fetch(path+this.chatid+'_'+i+'.txt');
                    let text = await res.text();
                    if(text == '404: Not Found'){
                        break;
                    }
                    this.records["Record_"+i] = this.parseDialog(text);
                    i++;
                }
                catch(e){
                    break;
                }
            }
            this.rec_loaded = true;
            this.show = true;
            this.loading = false;
        },
        parseDialog(text){
            var dialog = text.split('\n');
            var dialog_parsed = [];
            const prRe = /^(?:\[(\w+)(?:\((.+)\))?\])?(.*)$/m;
            const pmRe = /(\w+)=(\".+?\"|[\d\.]+|\w+),?/m
            for(var line of dialog){
                if(line=='') {continue;}
                var result = line.match(prRe);
                var attrs = result[2];
                var lineData = {
                    prop: result[1],
                    content: result[3],
                    attributes: {}
                }
                if(attrs){
                    for(var attr of attrs.split(',')){
                        var attr_result = attr.match(pmRe);
                        //Remove the \" from the string
                        attr_result[2] = attr_result[2].replace(/\"/g, '');
                        lineData.attributes[attr_result[1]] = attr_result[2];
                    }
                }
                dialog_parsed.push(lineData);
            }
            return dialog_parsed;
        },
        getCharAvatar(char_code){
            //get the avatar of the character
            return 'https://aceship.github.io/AN-EN-Tags/img/avatars/'+char_code+'.png'
        },
    },
    components:{
        MsgIcon:MessageRound,
        MenuOpen:MenuOpenFilled,
        UnfoldIcon:UnfoldMoreOutlined,
        FoldIcon:UnfoldLessOutlined
    },
}
</script>

<style>
.avatar{
    background-color: black;
    border: 1px solid #777;
    border-radius: 10%;
    /*Add shadow to southeast*/ 
    box-shadow: 5 5 5px black;
}
</style>