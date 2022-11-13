<template>
    <n-tooltip>
        <template #trigger>
            <n-button tertiary type="tertiary" class="openinnew" tag="div">
                <template #icon>
                    <n-icon @click="openInNew(link)">
                        <OpenInNewIcon />
                    </n-icon>
                </template>

            </n-button>              
        </template>
        {{i18n.openInNew[currentLang]}}
    </n-tooltip>

</template>

<script>
import i18n from '../i18n.json';
import func from '../func.js';
import {OpenInNewOutlined} from "@vicons/material"
export default {
    props: ['link'],
    data(){
        return{
            i18n: i18n,
            server: this.$route.params.server,
            currentLang: func.l,
        }
    },
    methods:{
        openInNew(link){
            let route = this.$router.resolve(link);
            window.open(route.href, '_blank');
        }
    },
    components:{
        OpenInNewIcon: OpenInNewOutlined
    }
}

</script>