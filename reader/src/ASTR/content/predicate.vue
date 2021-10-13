<template>
    <div :class="line.prop">
        <div v-if="!line.endOfOpt" class="optText">Options: {{line.attributes.references.replaceAll(';',' ')}}</div>
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
    }
}
</script>

<style>
.Predicate{
    font-size: 50%;
    margin: 4px;
    transition: background-color 0.5s;
    color: rgba(255, 255, 255, 0.8);
    background-color: rgba(0, 0, 0, 0.4);
}
.optText{
    float: left;
    padding: 4px;
}
.PredicateFocused{
    background-color: rgba(255, 255, 255, 0.4);
}
</style>