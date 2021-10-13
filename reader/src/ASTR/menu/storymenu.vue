<template>
    <div :class="{story:true, storyFocused:focused}" :id="story.storyId" @click="loadStory(lang, story.storyTxt)">
        <div class="storycode">{{story.storyCode}}  {{story.avgTag}} </div>
        <div class="storyname">{{story.storyName}}</div>
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
            lang: func.l
        }
    },
    mounted(){
        if(func.storyFile == this.story.storyTxt){
            this.focused = true;
            this.$emit('unfoldevent');
        }
    },
    methods:{
        loadStory(lang, path){
            var req = 'l='+lang;
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
    transition: padding 0.2s;
}
.story:hover{
    background-color: rgba(255, 255, 255, 0.2);
    padding: 5px;
}
.storyFocused{
    background-color: #f4433633;
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