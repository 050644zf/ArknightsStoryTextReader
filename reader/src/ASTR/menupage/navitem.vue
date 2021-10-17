<template>
        <div :class='{navitem:true, itemfocused:focus}' @click="$emit('focusme')">
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
}
.itemname{
    display: none;
}
.itemfocus .itemname{
    display: block;
}
</style>