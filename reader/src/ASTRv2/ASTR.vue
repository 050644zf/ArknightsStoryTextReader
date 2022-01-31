<template>
<n-layout>
    <n-config-provider :theme="darkTheme">
        <router-view></router-view>
        <Footer></Footer>
    </n-config-provider>
</n-layout>    
</template>

<script>
import { darkTheme } from "naive-ui"
import headerVue from "./header.vue"
import footerVue from "./footer.vue"

export default {
    data(){
        return{
            darkTheme:darkTheme
        }
    },
    components:{
        "Header":headerVue,
        "Footer":footerVue,
    }
}
</script>