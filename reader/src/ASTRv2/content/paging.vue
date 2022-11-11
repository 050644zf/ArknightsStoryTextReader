<template>
    <n-space class="pagingbar" :justify="loc" item-style="display: flex;" align="center">
        <n-space justify="left" item-style="display: flex;" align="center" v-if="storyIdx" class="pagingbtn" @click="paging(-1)">
            <n-icon size="24">
                <LastStory/>
            </n-icon>
            <n-ellipsis style="max-width: 30vw">
                {{storyOpts[storyIdx-1]["label"]}}
            </n-ellipsis>
        </n-space>

        <n-space justify="right" item-style="display: flex;" align="center" v-if="storyIdx!=storyCount-1" class="pagingbtn" @click="paging(1)">
            <n-ellipsis style="max-width: 30vw">
                {{storyOpts[storyIdx+1]["label"]}}
            </n-ellipsis>
            <n-icon size="24">
                <NextStory/>
            </n-icon>
        </n-space>
    </n-space>
</template>

<script>
import {ChevronLeftOutlined,ChevronRightOutlined } from "@vicons/material"
export default {
    props:{
        storyIdx:{
            type:Number,
            default:0
        },
        storyOpts:{
            type:Array,
            default:[]
        }
    },
    data(){return{
        storyCount: 0,        
        server: this.$route.params.server,
        loc:'space-between'
    }},
    created(){
        this.storyCount = this.storyOpts.length;
        this.loc = this.calcjustify();
    },
    methods:{
        calcjustify(){
            if(this.storyIdx==0){
                return "right"
            }else if(this.storyIdx==this.storyCount-1){
                return "left"
            }else{
                return "space-between"
            }
        },
        pushStory(storyTxt){
            this.$router.push({path:'/'+this.server+'/content', query:{f:storyTxt}});
        },
        paging(inc){
            this.pushStory(this.storyOpts[this.storyIdx+inc].value);
        },
    },
    components:{
        LastStory: ChevronLeftOutlined,
        NextStory: ChevronRightOutlined
    }
}
</script>

<style>
.pagingbar{
    padding: 10px 10px;

}
.pagingbar .pagingbtn{
    color: gray;
    transition: color 0.3s;
}
.pagingbar .pagingbtn:hover{
    color: white;
}
</style>