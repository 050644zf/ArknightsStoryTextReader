import { createApp } from 'vue'
import ASTR from './ASTR/ASTR.vue'
import func from './ASTR/func'
import $ from 'jquery'



createApp(ASTR).mount('#ASTR');






console.log(func.urlParams.get('f'));

