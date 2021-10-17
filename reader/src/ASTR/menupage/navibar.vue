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
                maintheme:{icon:'/src/assets/icons/icon_mainline.png', title:'Maintheme'},
                intermezzi:{icon:'/src/assets/icons/icon_branchline.png', title:'Intermezzi'},
                sidestory:{icon:'/src/assets/icons/icon_ss.png', title:'Sidestory'},
                storyset:{icon:'/src/assets/icons/icon_ministory.png', title:'Storyset'},
                or:{icon:'src/assets/icons/icon_default.png', title:"Operators' Records"}
            },
            focus: 0
        }
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
}
</style>