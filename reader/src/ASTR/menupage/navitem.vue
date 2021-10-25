<template>
        <div :class='{navitem:true, itemfocused:focus}' @click="$emit('focusme');">
            <div :class="[item.icon, 'itemicon']"></div>
            <span class=itemname>{{item.title}}</span>
        </div>
</template>

<script>
export default {
    props:{
        item: Object,
        iidx: Number,
        focus: Boolean
    },
    emits:['focusme']
}
</script>

<style>
.navitem{
    display:flex;
    flex-direction: column;
    justify-items: center;
    align-items: center;
    flex: 1;
    height: 100%;
    background-color: rgba(255,255,255,0);
    transition: flex 0.5s, background-color 0.5s;
}
.navitem:hover{
    background-color: rgba(255,255,255,0.1);
}
.itemicon{
    flex: 1;
    height: max-content;
    font-size: 32px;
    text-shadow: none;
    transition: font-size 0.5s, text-shawdow 0.5s;
}
.itemname{
    flex: 1;
    color: rgba(255,255,255,0);
    font-size: 15px !important; 
    transition: color 0.5s;
}
.itemfocused{
    background-color: rgba(255,255,255,0.1);
    flex: 3;
}
.itemfocused .itemicon{
    font-size: 48px;
    text-shadow: 0px 0px 5px black;
}
.itemfocused .itemname{
    color: rgba(255,255,255,1);
}
@media(max-width:1000px){
    .itemname{
        font-size: 25px;
    }
    .itemicon{
        font-size: 40px;
    }
}
</style>