<template>
    <span class="material-icons topButton" @click="scrollToTop()">vertical_align_top</span>
</template>

<script>
export default {
    methods:{
        scrollToTop(){
            document.getElementById('storydata').scrollIntoView({behavior: 'smooth', block:'center'});
        }
    }
}
</script>

<style>
.topButton{
    font-size: 24px;
    position: fixed;
    right: 5%;
    bottom: 15%;
    font-weight: bold;
    background-color: rgba(0,128,128,0.2);
    transition: background-color 0.5s;
    padding: 10px;
}
.topButton:hover{
    background-color: rgba(0,128,128,1);
}
</style>