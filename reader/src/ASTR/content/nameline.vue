<script>
import func from "../func";
export default {
    data(){
        return{
            line: this.inputline,
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

<template>
    <div class="textblock">
        <div class="nameblock">{{line.attributes.name}}</div>
        <div class="contentblock" v-html="parseContent(line.attributes.content)"></div>
    </div>
</template>

<style>
.textblock{
    margin: 4px;
}
.nameblock{
    background-color: unset;
    width: 100px;
    float: left;
    margin: 2px;
    margin-right: 6px;
    text-align: right;
    font-weight: bold;
}
.contentblock{
    background-color: unset;
    max-width: 650px;
    float: left;
    margin: 2px;
}
</style>