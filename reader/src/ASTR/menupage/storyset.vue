<template>
    <div class="storyset">
        <Eventmenu  v-for="(event, eidx) in eventList" :key="eidx" :event="event" :eventid="event.id"></Eventmenu>
    </div>
</template>

<script>
import eventmenu from "./eventmenu.vue"
export default {
    props:{
        eventList: Object
    },
    components:{
        Eventmenu: eventmenu
    }
}
</script>