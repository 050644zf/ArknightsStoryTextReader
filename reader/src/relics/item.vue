<template>
    <div class="itemcard" :style="{'border-left-color':raritycolor[itemInfo.rarity]}">
        <div style="width:64px;margin: 4px;">
            <img :src="'https://raw.githubusercontent.com/Aceship/AN-EN-Tags/master/img/ui/roguelike/item/'+itemInfo.id+'.png'" onerror="this.style.display='none'">
        </div>

        <div class="itemprops">
            <div class="itemname lt">{{itemInfo.name}}</div>
            <div class="itemusage nt">{{itemInfo.usage}}</div>
            <div class="itemdesc nt">{{itemInfo.description}}<br/><br/></div>
            <div class="itemunlock nt" v-if="itemInfo.unlockCond">
                <span class="material-icons">lock_open</span>
                {{itemInfo.unlockCondDesc}}
            </div>
        </div>

    </div>
</template>

<script>
export default {
    data(){
        return{
            raritycolor:{
                NONE:'#00000000',
                BORN:'#FFFFFF',
                NORMAL:'#9DC074',
                RARE:'#FFE599',
                SUPER_RARE:'rgb(255,129,0)'
            }
        }
    },
    props:{
        itemInfo:Object
    }
}
</script>

<style>
.itemcard{
    margin: 4px;
    display: flex;
    flex: 0 1 45%;
    background-color: #FFFFFF10;
    border-radius: 6px;
    border-width: 0px;
    border-left: 5px solid #00000000;
    align-items: center;
}
.itemcard img{
    height: 64px;
    width: 64px;
}
.itemname{
    font-weight: bold;
    margin: 5px 0px;
}
.itemprops *{
    margin: 4px 6px;
}
.itemdesc{
    color: gray;
    font-style: italic;
}
.lt{
    font-size: larger;
}
.nt{
    font-size: medium;
}
@media(max-width:1000px){
    .lt{
        font-size: 35px;
    }
    .nt{
        font-size:30px;
    }
    .itemcard{
        flex: 0 1 90%;
    }
}
</style>