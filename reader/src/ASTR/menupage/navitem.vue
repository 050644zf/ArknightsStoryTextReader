<template>
        <div :class='{navitem:true, itemfocused:focus}' @click="$emit('focusme');">
            <img :src="item.icon" class="itemicon"/>
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
    background-color: rgba(255,255,255,0);
    transition: flex 0.5s, background-color 0.5s;
}
.itemname{
    display: none;
    font-size: 15px;
}
.itemfocused{
    background-color: rgba(255,255,255,0.1);
    flex: 3;
}
.itemfocused .itemname{
    display: block !important;
}
</style>