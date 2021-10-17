<template>
        <div :class='{navitem:true, itemfocused:focus}' @click="$emit('focusme')">
            <span class="itemicon">{{item.icon}}</span>
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