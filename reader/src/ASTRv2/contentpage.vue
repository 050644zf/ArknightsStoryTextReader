<template>
    <n-layout has-sider>
        <Menu></Menu>
        <n-layout-content>
            内容
        </n-layout-content>
    </n-layout>

</template>

<script>
import menuVue from "./menu.vue"

export default {
    data(){
        return{}
    },
    components:{
        "Menu": menuVue
    }
}
</script>
