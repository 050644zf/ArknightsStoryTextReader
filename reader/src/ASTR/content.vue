<script>
import $ from 'jquery'
import i18n from './i18n.json'
import func from './func';
import nameline from './content/nameline.vue';
import subtitle from './content/subtitle.vue';
import decision from './content/decision.vue';
import predicate from './content/predicate.vue';
import delay from './content/delay.vue';
import img from './content/img.vue';

export default {
    data(){
        return{
            data: func.storyData,
            path: func.storyFile,
            lang: func.l,
            server: func.server,
            doctor: func.doctor,
            i18n: i18n,
            showDelay: func.showDelay
        }
    },
    created(){
        if(this.path){
            $.getJSON('https://raw.githubusercontent.com/050644zf/ArknightsStoryJson/main/'+this.server+'/gamedata/story/'+this.path+'.json').done(s => this.data = s).fail(s => {this.data = {eventName: 'Error on loading json file: '+ this.path + '! If this is a new story, please contact the developer in github issue or discord to update the database.'}});
        }
        else{
            this.data = {eventName: '< - ' + i18n.selectStory[this.lang]};
        }
        
    },
    updated(){
        if(func.urlParams.get('warp')){
            var tgt = document.getElementById(func.urlParams.get('warp'));
            if(tgt){
                tgt.scrollIntoView({behavior: "smooth", block: "center"});
                tgt.style.setProperty("background-color", '#f4433633');
            }
        };
        func.focus();
    },
    methods:{
        jumpTo(id){
            var optLine = document.getElementById(id);
            optLine.scrollIntoView({behavior: "smooth", block: "center"});
        },
        changeColor(id,color){
            var optLine = document.getElementById(id);
            setInterval(optLine.style.setProperty("background-color", color),500);
        },
        getURL(l,path,line){
            return '?s=' + l + '&f=' + path + '&warp=line' + line;
        },
        parseContent(content){
            return func.parseContent(content);
        }
    },
    components:{
        Nameline: nameline,
        Subtitle: subtitle,
        Decision: decision,
        Predicate: predicate,
        Delay: delay,
        Showimg: img
    }
    
}
</script>

<template>
    <div id="content">
        <div class="storydata" id="storydata">
            {{data.eventName}}  {{data.storyCode}}  {{data.avgTag}}  {{data.storyName}}
        </div>
        <div v-for="(line, lidx) in data.storyList" :key="line.id" class="line" :id="'line'+line.id">
        <a :href="getURL(lang,path,line.id)" class="linkButton material-icons">link</a>
        
            <Nameline v-if="line.prop == 'name'" :inputline="line" :lidx="lidx" :story="data.storyList"></Nameline>
            <Subtitle v-if="line.prop == 'Subtitle'" :inputline="line"></Subtitle>
            <Decision v-if="line.prop == 'Decision'" :inputline="line"></Decision>
            <Predicate v-if="line.prop == 'Predicate'" :inputline="line"></Predicate>
            <Delay v-if="line.prop == 'Delay' && showDelay == 'y'" :inputline="line"></Delay>
            <Showimg v-if="line.prop == 'Image' && line.attributes.image" :inputline="line"></Showimg>
            
            <div style="clear: both;"></div>
        </div>
    </div>
</template>

<style>
.storydata{
    font-weight: bold;
    margin: 10px;
}
#content{
    margin: 8px;
    margin-left: 15%;
    width: 800px;
}
.linkButton{
    display: block;
    position: relative;
    color: #88888800;
    text-decoration: none;
    margin-left: -32px;
    line-height: 0;
    float: left;
    top: 15px;
    right: 0%;
    padding-right: 4px;
    transition: color 0.5s;
    font-size: 24px;
}
.line:hover .linkButton{
    color: #888888FF;
}
</style>