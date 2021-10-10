<script>
import Content from "./content.vue";
import func from "./func";
import $ from 'jquery'



export default {
    data(){
        return{
            storyData: null,
            storyFile: func.urlParams.get('f'),
            lang: func.l,
        }
    },
    mounted(){
        if(this.storyFile){
                $.getJSON("https://raw.githubusercontent.com/050644zf/ArknightsStoryJson/main/"+this.lang+'/gamedata/story/'+this.storyFile+'.json').done(function(s){this.storyData = s;}).fail(function(){this.storyData = {eventName: 'Error on loading json file: '+ urlParams.get('f') + '! If this is a new story, please contact the developer in github issue or discord to update the database.'};});
            }
    },
    components:{
        Content:Content
    }
}
</script>


<template>
<Content :data="storyData"></Content>
</template>