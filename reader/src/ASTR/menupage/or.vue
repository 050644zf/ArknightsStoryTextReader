<template>
    <div class="record">
        <Oritem v-for="(event, eidx) in eventList" :key="eidx" :eventData="event" :show-story="focus==eidx" @focusme="focuson(eidx)"></Oritem>
    </div>
</template>

<script>
import oritem from "./oritem.vue"
export default {
    data(){
        return{
            focus: -1
        }
    },
    props:{
        eventList: Array
    },
    components:{
        Oritem: oritem
    },
    methods:{
        focuson(eidx){
            if(this.focus == eidx){
                this.focus = -1;
            }
            else{
                this.focus = eidx;
            }
        }
    }
}
</script>

<style>
.record{
    display: flex;
    flex-wrap: wrap;
    transition: all 0.5s;
    justify-content: space-evenly;
}
</style>