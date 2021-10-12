<script>
import $ from 'jquery'
import i18n from './i18n.json'
import func from './func';
import nameline from './content/nameline.vue';
import subtitle from './content/subtitle.vue';
import decision from './content/decision.vue';
import predicate from './content/predicate.vue';

export default {
    data(){
        return{
            data: func.storyData,
            path: func.storyFile,
            lang: func.l,
            doctor: func.doctor,
            i18n: i18n
        }
    },
    created(){
        $.getJSON('https://raw.githubusercontent.com/050644zf/ArknightsStoryJson/main/'+this.lang+'/gamedata/story/'+this.path+'.json').done(s => this.data = s);
        
    },
    updated(){
        if(func.urlParams.get('warp')){
            var tgt = document.getElementById(func.urlParams.get('warp'));
            if(tgt){
                tgt.scrollIntoView({behavior: "smooth", block: "center"});
                tgt.style.setProperty("background-color", '#f4433633');
            }
        };
        focus();
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
            return '?l=' + l + '&f=' + path + '&warp=line' + line;
        },
        parseContent(content){
            return func.parseContent(content);
        }
    },
    components:{
        Nameline: nameline,
        Subtitle: subtitle,
        Decision: decision,
        Predicate: predicate
    }
    
}
</script>

<template>
    <div id="content">
        <div class="storydata" id="storydata">
            {{data.eventName}}  {{data.storyCode}}  {{data.avgTag}}  {{data.storyName}}
        </div>
        <div v-for="line in data.storyList" :key="line.id" class="line" :id="'line'+line.id">
        <a :href="getURL(lang,path,line.id)" class="linkButton material-icons">link</a>
            <Nameline v-if="line.prop == 'name'" :inputline="line"></Nameline>
            <Subtitle v-if="line.prop == 'Subtitle'" :inputline="line"></Subtitle>
            <Decision v-if="line.prop == 'Decision'" :inputline="line"></Decision>
            
            <Predicate v-if="line.prop == 'Predicate'" :inputline="line"></Predicate>
            <div v-if="line.prop == 'Dialog'" :class="line.prop"><hr/> </div>

            <img v-if="line.prop == 'Image' && line.attributes.image" class="Image" :src="'https://aceship.github.io/AN-EN-Tags/img/avg/images/'+line.attributes.image+'.png'">
            
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
}
.line:hover .linkButton{
    color: #888888FF;
}
</style>