import { createApp } from 'vue'
import naive from 'naive-ui'
import { createRouter,createWebHashHistory } from 'vue-router'
import { createMetaManager, plugin as metaPlugin } from 'vue-meta'
import { createI18n } from 'vue-i18n';


import ASTR from './ASTRv2/ASTR.vue'
import server from './ASTRv2/server.vue'
import menupage from './ASTRv2/menupage.vue'
import eventpage from './ASTRv2/eventpage.vue'
import contentpage from './ASTRv2/contentpage.vue'
import exportpage from './ASTRv2/export.vue'
import analysis from './ASTRv2/misc/analysis.vue'
import stats from './ASTRv2/misc/stats.vue'
import stats2023 from './ASTRv2/misc/stats2023.vue'
import isrecords from './ASTRv2/misc/isrecords.vue'
import act17side_log from './ASTRv2/misc/act17side_log.vue'
import act25side_log from './ASTRv2/misc/act25side_log.vue'
import extra from './ASTRv2/misc/extra.vue'
import opcard from './ASTRv2/components/opcard.vue'

import en_US from './ASTRv2/astr-i18n/en_US.json'
import zh_CN from './ASTRv2/astr-i18n/zh_CN.json'
import ja_JP from './ASTRv2/astr-i18n/ja_JP.json'
import ko_KR from './ASTRv2/astr-i18n/ko_KR.json'
import zh_TW from './ASTRv2/astr-i18n/zh_TW.json'

import func from './ASTRv2/func.js'

const messages = {
    en_US: en_US,
    zh_CN: zh_CN,
    ja_JP: ja_JP,
    ko_KR: ko_KR,
    zh_TW: zh_TW,
}

const routes = [
    { 
        path: '/:server', 
        component: server,
        children: [
            { path: 'menu/:selected?', name:'menu', component: menupage,
                children: [
                    { path: 'char/:cid', name:'opcard', component: opcard },
                ]
            },
            { path: 'event/:event',name:'event', component: eventpage },
            { path: 'content',name:'content', component: contentpage },
            { path: 'export',name:'export', component: exportpage },
            { path: 'analysis',name:'analysis', component: analysis },
            { path: 'stats',name:'stats', component: stats },
            { path: 'stats2023', name:'stats2023', component: stats2023},
            { path: 'isrecords',name:'isrecords', component: isrecords },
            { path: 'act17side_log',name:'act17side_log', component: act17side_log },
            { path: 'act25side_log',name:'act25side_log', component: act25side_log },
            { path: 'extra',name:'extra', component: extra },
        ]
    },
    {path:'/',redirect:'/zh_CN/menu'}
]

const router = createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: createWebHashHistory(),
    routes, // `routes: routes` 的缩写
  })
const metaManager = createMetaManager();

const i18n = createI18n({
    locale: func.l,
    fallbackLocale: 'en_US',
    messages: messages
})

const app = createApp(ASTR);
app.use(naive);
app.use(router);
app.use(metaManager);
app.use(metaPlugin);
app.use(i18n);
app.mount('#ASTR');


