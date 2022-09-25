<template>
    <n-space class="misc" item-style="display:flex;" justify="center">
        <n-list class="list">
            <n-list-item @click="$router.push('/'+$route.params.server+'/analysis')">
                <n-space item-style="display:flex;" align="center">
                    <n-space item-style="display:flex;" align="baseline">
                        <n-h2 prefix="bar">
                            活动字数/词数统计<br/>
                            Analysis of the Number of characters/words in the Events
                        </n-h2>
                    </n-space>
                </n-space>
                <template #suffix>
                    <n-button text>
                        <n-icon size="32">
                            <ForwardIcon/>
                        </n-icon>
                    </n-button>
                </template>  
            </n-list-item>
            <n-list-item @click="$router.push('/'+$route.params.server+'/stats')">
                <n-space item-style="display:flex;" align="center">
                    <n-space item-style="display:flex;" align="baseline">
                        <n-h2 prefix="bar">
                            明日方舟特别回顾 (仅支持简中服)<br/>
                            Arknight Journey Review (CN server only)
                        </n-h2>
                    </n-space>
                </n-space>
                <template #suffix>
                    <n-button text>
                        <n-icon size="32">
                            <ForwardIcon/>
                        </n-icon>
                    </n-button>
                </template>  
            </n-list-item>
            <n-list-item @click="$router.push('/'+$route.params.server+'/isrecords')">
                <n-space item-style="display:flex;" align="center">
                    <n-space item-style="display:flex;" align="baseline">
                        <n-h2 prefix="bar">
                            集成战略月度小队记录<br/>
                            Monthly Team Records in Integrated Strategies
                        </n-h2>
                    </n-space>
                </n-space>
                <template #suffix>
                    <n-button text >
                        <n-icon size="32">
                            <ForwardIcon/>
                        </n-icon>
                    </n-button>
                </template>  
            </n-list-item>
            <n-list-item @click="$router.push('/'+$route.params.server+'/act17side_log')">
                <n-space item-style="display:flex;" align="center">
                    <n-space item-style="display:flex;" align="baseline">
                        <n-h2 prefix="bar">
                            愚人号行动日志<br/>
                            Operation Log in Stultifera Navis
                        </n-h2>
                    </n-space>
                </n-space>
                <template #suffix>
                    <n-button text >
                        <n-icon size="32">
                            <ForwardIcon/>
                        </n-icon>
                    </n-button>
                </template>                  
            </n-list-item>
        </n-list>
    </n-space>
</template>

<script>
import { ArrowForwardOutlined } from '@vicons/material'
export default{
    props: ['eventype'],
    data(){
        return{
        }
    },
    components: {
        ForwardIcon: ArrowForwardOutlined,
    },
    methods:{
    }
}
</script>

<style>
.misc .list{
    width: 80vw;
    max-width: 1200px;
}
</style>