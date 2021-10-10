<template>
    <div class="textblock">
        <div class="nameblock">{{line.attributes.name}}</div>
        <div class="contentblock" v-html="parseContent(line.attributes.content)"></div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            line: line,
        }
    },
    props: ['line'],
    methods:{
        parseContent(content){
            if(content){
                content = content.replaceAll('{@nickname}',this.doctor);
                content = content.replaceAll('\\n','<br/>')
                content = content.replace(color_re,color_sub);
            }
            return content;
        }
    }
}
</script>

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