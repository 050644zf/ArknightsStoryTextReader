<script>
export default {
    data(){
        return{
            data: {eventName: '< - ' + i18n.selectStory[l]},
            path: urlParams.get('f'),
            lang: l,
            doctor: doctor,
            i18n: i18n
        }
    },
    updated(){
        if(urlParams.get('warp')){
            var tgt = document.getElementById(urlParams.get('warp'));
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
            if(content){
                content = content.replaceAll('{@nickname}',this.doctor);
                content = content.replaceAll('\\n','<br/>')
                content = content.replace(color_re,color_sub);
            }
            return content;
        }
    }
}
</script>

<template>
<div class="storydata" id="storydata">
    {{data.eventName}}  {{data.storyCode}}  {{data.avgTag}}  {{data.storyName}}
</div>
    <div v-for="line in data.storyList" :key="line.id" class="line" :id="'line'+line.id">
    <a :href="getURL(lang,path,line.id)" class="linkButton material-icons">link</a>
        <div v-if="line.prop == 'name'" class="textblock">
            <div class="nameblock">{{line.attributes.name}}</div>
            <div class="contentblock" v-html="parseContent(line.attributes.content)"></div>
        </div>
        <div v-if="line.prop == 'Subtitle'" :class="line.prop" :style="{'text-align': line.attributes.alignment}" v-html="parseContent(line.attributes.text)">
        </div>
        <div v-if="line.prop == 'Decision'" :class="line.prop">
            <div v-for="(option, index) in line.attributes.values.split(';')" class="option" @click="jumpTo(line.targetLine['option'+option])" @mouseover="changeColor(line.targetLine['option'+option],'rgba(255,255,255,0.4)')" @mouseout="changeColor(line.targetLine['option'+option],'rgba(0,0,0,0.4)')" v-html="parseContent(line.attributes.options.split(';')[index])">
                
            </div>
        </div>
        <div v-if="line.prop == 'Predicate'" :class="line.prop">
            <div v-if="!line.endOfOpt" class="optText">Options: {{line.attributes.references.replaceAll(';',' ')}}</div>
            <div v-if="!line.endOfOpt" class="toEnd" @click="jumpTo(line.targetLine)" @mouseover="changeColor(line.targetLine,'rgba(255,255,255,0.4)')" @mouseout="changeColor(line.targetLine,'rgba(0,0,0,0.4)')">End of options</div>
            <div v-else class="optText">End of Options</div>
        </div>
        <div v-if="line.prop == 'Dialog'" :class="line.prop"><hr/> </div>

        <img v-if="line.prop == 'Image' && line.attributes.image" class="Image" :src="'https://aceship.github.io/AN-EN-Tags/img/avg/images/'+line.attributes.image+'.png'">
        
        <div style="clear: both;"></div>
    </div>
</template>

<style>
</style>