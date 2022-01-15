<template>
    <div class="event">
        <div :class="{eventname:true, eventnamehl:!collapsed, lt:true}" @click="collapsed = !collapsed" >{{event.name}}</div>
        <div class="stories" v-show="!collapsed">
            <Storymenu v-for="(story, STidx) in event.infoUnlockDatas" :story="story" @unfoldevent="collapsed = false;$emit('focusStory')" :key="STidx"></Storymenu>
        </div>
    </div>
</template>

<script>
import storymenu from "./storymenu.vue";

export default {
    props:['event','eventid'],
    emits:['hidemenu','focusStory'],
    data(){
        return{
            collapsed: true
        }
    },
    components:{
        Storymenu: storymenu
    }
}

</script>

<style>
.eventname{
    font-weight: bold;
    background-color: rgba(42,186,255,0);
    margin: 4px;
    margin-left: 10px;
    padding: 2px;
    transition: padding 0.2s;
    border-radius: 4px;
}
.eventnamehl{
    background-color: rgba(42,186,255,0.4);
    padding: 5px;
}
.eventname:hover{
    padding: 10px;
    background-color: rgba(42,186,255,0.2);
}
</style>