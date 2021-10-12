<template>
    <div  :class="line.prop">
        <div v-for="(option, index) in line.attributes.values.split(';')" :key="option" class="option" @click="jumpTo(line.targetLine['option'+option])"  v-html="parseContent(line.attributes.options.split(';')[index])">
            
        </div>
    </div>
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
        },
        changeColor(id,color){
            var optLine = document.getElementById(id);
            setInterval(optLine.style.setProperty("background-color", color),500);
        },
        jumpTo(id){
            var optLine = document.getElementById(id);
            optLine.scrollIntoView({behavior: "smooth", block: "center"});
        }
    }
}
</script>

<style>
.Decision{
    margin: 4px;
}
.option{
    text-align: center;
    margin: 4px;
    padding: 4px;
    transition: background-color 0.5s;
    font-weight: bold;
    background-color: rgba(0, 0, 0, 0.4);
}
.option:hover{
    background-color: rgba(255, 255, 255, 0.2);
}
</style>