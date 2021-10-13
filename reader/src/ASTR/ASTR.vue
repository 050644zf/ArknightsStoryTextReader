<script>
import header from './header.vue';
import menu from './menu.vue';
import settings from './settings.vue';
import content from './content.vue';
import topbtn from './topbtn.vue';


export default {
    data(){
        return{
            storyData: {},
            storyFile: [],
            lang: [],
        }
    },
    created(){
        fetch('https://raw.githubusercontent.com/050644zf/ArknightsStoryJson/main/zh_CN/gamedata/story/obt/guide/beg/0_welcome_to_guide.json').then(function(s){s.json();}).then(s => {this.storyData =s;this.$forceUpdate();console.log(this.storyData)});
    },
    components:{
        Header: header,
        Menu: menu,
        Content: content,
        Settings: settings,
        Topbtn: topbtn
    },
    methods:{
    }
}
</script>


<template>
<Header></Header>
<Menu></Menu>
<Settings></Settings>
<Content></Content>
<Topbtn></Topbtn>
</template>

<style>

</style>