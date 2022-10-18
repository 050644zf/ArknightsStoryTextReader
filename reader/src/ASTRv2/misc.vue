<template>
    <n-space class="misc" item-style="display:flex;" justify="center">
        <n-list class="list">
            <n-list-item @click="$router.push('/'+$route.params.server+'/extra')">
                <n-space item-style="display:flex;" align="center">
                    <n-space item-style="display:flex;" align="baseline">
                        <n-h2 prefix="bar">
                            {{i18n.extra[currentLang]}}
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
            <n-list-item @click="$router.push('/'+$route.params.server+'/analysis')">
                <n-space item-style="display:flex;" align="center">
                    <n-space item-style="display:flex;" align="baseline">
                        <n-h2 prefix="bar">
                            {{i18n.analysis[currentLang]}}
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
                            {{i18n.stats[currentLang]}}
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
                            {{i18n.isrecords[currentLang]}}
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
                            {{i18n.act17side_log[currentLang]}}
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
import i18n from './i18n.json'
import func from './func.js'
export default{
    props: ['eventype'],
    data(){
        return{
            i18n: i18n,
            currentLang: func.l
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