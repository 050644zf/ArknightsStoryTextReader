<template>
    <div class="navibar">
        <Navitem v-for="(item, itemName, iidx) in navi" :key="itemName" :item="item" @focusme="focus = iidx" :focus="focus == iidx"></Navitem>
    </div>
</template>

<script>
import func from '../func';
import i18n from '../i18n.json';
import navitem from './navitem.vue';
export default {
    data(){
        return{
            navi:{
                maintheme:{icon:'terminal-maintheme', title:'Maintheme'},
                intermezzi:{icon:'terminal-intermezzi', title:'Intermezzi'},
                sidestory:{icon:'terminal-sidestory', title:'Sidestory'},
                storyset:{icon:'terminal-storyset', title:'Storyset'},
                or:{icon:'terminal-record', title:"Records"}
            }
        }
    },
    props:{
        focus: Number
    },
    components:{
        Navitem: navitem
    }
}
</script>

<style>
.navibar{
    display: flex;
    justify-content: space-evenly;
    align-items: baseline;
    transition: flex 0.5s;
}
</style>