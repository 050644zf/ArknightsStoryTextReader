<template>
    <n-layout-sider>
        {{eventList}}
    </n-layout-sider>
</template>

<script>
export default {
    data(){
        return{
            data: {},
            chardict: {},
            eventList: {},
            lang: "zh_CN",
            server: "zh_CN",
            i18n: {},
            showMenu: true,
            showLangSelect: false
        }
    },
    created(){
        this.loadData();
    },
    methods:{
        async loadData(){
            this.data = await fetch('https://raw.githubusercontent.com/Kengxxiao/ArknightsGameData/master/'+this.server+'/gamedata/excel/story_review_table.json').then(res => res.json());
            this.chardict = await fetch('https://raw.githubusercontent.com/050644zf/ArknightsStoryJson/main/'+this.server+'/chardict.json').then(res => res.json());
            this.eventList = await this.getEventList(this.data, this.chardict);
        },
        async getEventList(reviewData, chardict){
            var eventList = [];
            var eventid;
            for(eventid in reviewData){
                if(reviewData[eventid].entryType == 'MAINLINE'){
                    eventList.push(reviewData[eventid]);
                }
                else if(reviewData[eventid].entryType == 'ACTIVITY'){
                    eventList.push(reviewData[eventid]);
                }
                else if(reviewData[eventid].entryType == 'MINI_ACTIVITY'){
                    eventList.push(reviewData[eventid]);
                }
                else if(reviewData[eventid].entryType == 'NONE'){
                    var cin = eventid.split('_')[1];
                    var set = eventid.split('_')[3];
                    reviewData[eventid].name = chardict[cin]['name'] + ' - ' + set;
                    eventList.push(reviewData[eventid]);
                }
            }
            return eventList;
        },
    }
}
</script>