<template>
    <div class="itemcard" :style="{'border-left-color':raritycolor[itemInfo.rarity]}">
        <div class="imgblock">
            <img :src="'https://raw.githubusercontent.com/Aceship/AN-EN-Tags/master/img/ui/roguelike/item/'+itemInfo.id+'.png'" onerror="this.style.display='none'">
        </div>

        <div class="itemprops">
            <div class="itemname lt">{{itemInfo.name}}</div>
            <div class="itemusage nt">{{itemInfo.usage}}</div>
            <div class="itemdesc nt">{{itemInfo.description}}<br/><br/></div>
            <div class="itemunlock nt" v-if="itemInfo.unlockCondDesc">
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
.imgblock{
    width: 64px;
    height: 100%;
    margin-right: 6px;
    display: flex;
    background-color: rgba(255, 255, 255, 0.2);
    box-shadow: 0px 0px 10px rgb(0,0,0);
}
.itemcard img{
    height: 64px;
    width: 64px;
    margin: auto;
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