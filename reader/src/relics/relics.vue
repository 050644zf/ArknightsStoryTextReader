<template>
    <Header></Header>
    <div class="ItemsList">
        <Item v-for="(iteminfo, itemcode, iidx) in rltable" :key="iidx" :itemInfo="iteminfo"></Item>
    </div>
</template>

<script>
import $ from 'jquery'
import header from '../ASTR/header.vue'
import item from './item.vue'
import func from '../ASTR/func'
export default {
    data(){
        return{
            rltable: {},
            server: func.server
        }
    },
    created(){
        if(this.server=='zh_CN'){
            $.getJSON('https://raw.githubusercontent.com/Kengxxiao/ArknightsGameData/master/'+this.server+'/gamedata/excel/roguelike_topic_table.json').done(s => this.rltable = s['details']['rogue_1']['items'])
        }
        else{
            $.getJSON('https://raw.githubusercontent.com/Kengxxiao/ArknightsGameData/master/'+this.server+'/gamedata/excel/roguelike_table.json').done(s => this.rltable = s['itemTable']['items'])
        }
    },
    components:{
        Header: header,
        Item: item
    }
}
</script>

<style>
.ItemsList{
    margin: 0px 20px;
    display: flex;
    flex-wrap: wrap;
}
</style>