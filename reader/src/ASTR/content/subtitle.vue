<template>
<div :class="line.prop" :style="{'text-align': line.attributes.alignment}" v-html="parseContent(line.attributes.text)"></div>
</template>

<script>
import func from "../func";

export default {
    data(){
        return{
            line: this.inputline
        }
    },
    props:{
        inputline: Object
    },
    methods:{
        parseContent(content){
            return func.parseContent(content);
        }
    }
}
</script>

<style>
.Subtitle{
    background-color: unset;
    margin: 4px;
    padding-top: 20px;
    padding-bottom: 20px;
    padding: 10px;
    clear: both;
}
</style>