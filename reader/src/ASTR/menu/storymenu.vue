<template>
    <div :class="{story:true, storyFocused:focused,nt:true}" :id="story.storyId" @click="loadStory(story.storyTxt)">
        <div class="storycode xst">{{story.storyCode}}  {{story.avgTag}} </div>
        <div class="storyname nt">{{story.storyName}}</div>
    </div>
</template>

<script>

import func from "../func";

export default {
    props:['story'],
    emits:['hidemenu','focusstory','unfoldevent'],
    data(){
        return{
            focused: false,
            lang: func.l,
            server: func.server
        }
    },
    mounted(){
        if(func.storyFile == this.story.storyTxt){
            this.focused = true;
            this.$emit('unfoldevent');
        }
    },
    methods:{
        loadStory(path){
            var req = 's='+ this.server;
            req = req + '&f=' + path;
            window.location.search = req;
        }
    }
}
</script>

<style>
.story{
    margin: 4px;
    margin-left: 40px;
    transition: padding 0.2s, border 0.2s, background-color 0.2s;
    border-radius: 4px;
    border-left: 5px solid rgba(0,0,0,0);
    padding-left: 5px;
}
.story:hover{
    border-left: 5px solid rgba(255,255,255,0.4);
    background-color: rgba(255, 255, 255, 0.2);
}
.storyFocused{
    border-left: 5px solid rgba(255,255,255,0.4);
    background-color: rgba(255, 255, 255, 0.2);
    padding: 5px;
}
.storycode{
    font-size: x-small;
    color: rgba(255, 255, 255, 0.8);
}
.storyname{
    font-weight: normal;
}
</style>