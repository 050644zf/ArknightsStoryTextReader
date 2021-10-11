<script>
import content from './content.vue';



export default {
    data(){
        return{
            storyData: {},
            storyFile: [],
            lang: [],
        }
    },
    created(){
        fetch('https://raw.githubusercontent.com/050644zf/ArknightsStoryJson/main/zh_CN/gamedata/story/obt/guide/beg/0_welcome_to_guide.json').then(function(s){s.json();}).then(s => {this.storyData =s;this.$forceUpdate();console.log(this.storyData)});
        
    },
    components:{
        Content:content
    },
    methods:{
        loadJson(){
            
        }
    }
}
</script>


<template>
<Content :story-data="storyData"></Content>
</template>