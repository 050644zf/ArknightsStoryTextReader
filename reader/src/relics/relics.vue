<template>
    <Header></Header>
    <div class="ItemsList">
        <Item v-for="(iteminfo, itemcode, iidx) in rltable['itemTable']['items']" :key="iidx" :itemInfo="iteminfo"></Item>
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
        $.getJSON('https://raw.githubusercontent.com/Kengxxiao/ArknightsGameData/master/'+this.server+'/gamedata/excel/roguelike_table.json').done(s => this.rltable = s)
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