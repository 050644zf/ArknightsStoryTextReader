<template>
<metainfo/>
<n-layout class="site">
    <n-config-provider :theme="darkTheme">
        <n-loading-bar-provider>
        <n-dialog-provider>
            <router-view></router-view>
            
        </n-dialog-provider>
        </n-loading-bar-provider>
        <Footer></Footer>
    </n-config-provider>
</n-layout>    
</template>

<script>
import { darkTheme } from "naive-ui"
import headerVue from "./header.vue"
import footerVue from "./footer.vue"
import { useMeta } from "vue-meta"

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

<style>
.n-layout .n-layout-scroll-container{
    overflow-y: hidden;
}
@font-face {
    font-family: 'ak_terminal';
    src:url('ak_terminal.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
    font-display: block;
}

[class^="terminal-"], [class*=" terminal-"] {
    /* use !important to prevent issues with browser extensions that change fonts */
    font-family: 'ak_terminal' !important;
    speak: never;
    font-style: normal;
    font-weight: normal;
    font-variant: normal;
    text-transform: none;
    line-height: 1;

    /* Better Font Rendering =========== */
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

.terminal-intermezzi:before {
    content: "\e900";
}
.terminal-maintheme:before {
    content: "\e901";
}
.terminal-record:before {
    content: "\e902";
}
.terminal-sidestory:before {
    content: "\e903";
}
.terminal-storyset:before {
    content: "\e904";
}

</style>