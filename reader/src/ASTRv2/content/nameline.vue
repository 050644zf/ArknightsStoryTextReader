<script>
import func from "../func";
export default {
    data(){
        return{
            line: this.inputline,
            hideName: false
        }
    },
    mounted(){
        this.hideName = this.isHideName();
    },
    props:{
        inputline: Object,
        story: Object,
        lidx: Number
    },
    methods:{
        parseContent(content){
            return func.parseContent(content);
        },
        isHideName(){
            if(this.lidx=='0' || func.hideName == 'n' || !this.line){
                return false
            }
            else{
                var lastLine = this.story[this.lidx-1];
                
                if(lastLine.prop=='name' && lastLine.attributes && this.line.attributes){
                    //console.log(lastLine);
                    if(lastLine.attributes.name == this.line.attributes.name){
                        return true;
                    }
                }

                return false;
            }
        }
    }
}
</script>

<template>
    <div class="textblock">
        <div :class="{nameblock:true, hideName:hideName}">{{line.attributes.name}}</div>
        <div class="contentblock" v-html="parseContent(line.attributes.content)"></div>
    </div>
</template>

<style>
.textblock{
    margin: 4px;
    display: flex;
}
.nameblock{
    display: flex;
    flex: 1 70px;
    justify-content: flex-end;
    background-color: unset;
    float: left;
    margin: 2px;
    margin-right: 10px;
    text-align: right;
    font-weight: bold;
}
.contentblock{
    display: flex;
    flex: 6 300px;
    background-color: unset;
    float: left;
    margin: 2px;
}
.hideName{
    color:rgba(0,0,0,0);
}
</style>