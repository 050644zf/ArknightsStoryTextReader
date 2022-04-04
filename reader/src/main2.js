import { createApp } from 'vue'
import naive from 'naive-ui'
import { createRouter,createWebHashHistory } from 'vue-router'
import { createMetaManager, plugin as metaPlugin } from 'vue-meta'
import ASTR from './ASTRv2/ASTR.vue'
import server from './ASTRv2/server.vue'
import menupage from './ASTRv2/menupage.vue'
import eventpage from './ASTRv2/eventpage.vue'
import contentpage from './ASTRv2/contentpage.vue'
import exportpage from './ASTRv2/export.vue'

const routes = [
    { 
        path: '/:server', 
        component: server,
        children: [
            { path: 'menu', name:'menu', component: menupage },
            { path: 'event/:event',name:'event', component: eventpage },
            { path: 'content',name:'content', component: contentpage },
            { path: 'export',name:'export', component: exportpage },
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

const app = createApp(ASTR);
app.use(naive);
app.use(router);
app.use(metaManager);
app.use(metaPlugin);
await router.isReady();
app.mount('#ASTR');


