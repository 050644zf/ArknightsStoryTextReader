<template>
    <div class="navibar">
        <Navitem v-for="(item, itemName, iidx) in navi" :key="itemName" :item="item" @focusme="focus = iidx" :focus="focus == iidx"></Navitem>
    </div>
</template>

<script>
import func from '../func';
import navitem from './navitem.vue'
export default {
    data(){
        return{
            navi:{
                maintheme:{icon:'M', title:'Maintheme'},
                interlude:{icon:'I', title:'Interlude'},
                sidestory:{icon:'S', title:'Sidestory'},
                storyset:{icon:'Ss', title:'Storyset'},
                or:{icon:'O', title:"Operators' Records"}
            },
            focus: 0
        }
    },
    components:{
        Navitem: navitem
    }
}
</script>