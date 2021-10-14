<script>
import header from './header.vue';
import menu from './menu.vue';
import settings from './settings.vue';
import content from './content.vue';
import topbtn from './topbtn.vue';
import menupage from './menupage.vue';
import func from './func';


export default {
    data(){
        return{
            storyData: {},
            storyFile: func.storyFile,
            lang: func.lang,
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
        Topbtn: topbtn,
        Menupage: menupage
    },
    methods:{
    }
}
</script>


<template>
<Header></Header>
<Menu></Menu>
<Settings></Settings>
<Menupage v-if="!storyFile"></Menupage>
<Content v-if="storyFile"></Content>
<Topbtn></Topbtn>
</template>

<style>

</style>