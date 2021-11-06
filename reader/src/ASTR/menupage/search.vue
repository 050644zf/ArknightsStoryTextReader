<template>
    <div class="search">
        <div class="searchbar">
            <input v-model="searchvalue">
            <span class="material-icons" @click="searchRequest()">search</span>
        </div>

        <div class="searchresult">
            {{resultNumber}} Results<br/>
            <div v-for="(event, eventid, eidx) in result" :key='eidx' style="font-weight: bold;margin: 5px;">
                {{eventid}}
                <div v-for="(story,sidx) in event" :key='sidx' style="font-weight: normal;">
                    {{story.storyCode}} {{story.avgTag}} {{story.storyName}}
                    <div class="textmatch" v-for="(match,midx) in story.text_matches" :key="midx" v-html="parseFrag(match['fragment'],match['matches'])"></div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import func from "../func";
import $ from 'jquery';

export default {
    data(){
        return{
            searchvalue: '',
            result: {},
            server: func.server,
            resultNumber: 0,
            isIncomplete: false
        }
    },
    props:{
        eventList:Object
    },
    methods:{
        searchRequest(){
            var requestURL = 'https://api.github.com/search/code?q='+this.searchvalue+'+repo:050644zf/ArknightsStoryJson+path:'+this.server+'/gamedata';
            $.ajaxSetup({headers : {'Accept':'application/vnd.github.v3.text-match+json'}});
            $.getJSON(requestURL).done(s => {
                this.result = {};
                const ptre = /.+\/gamedata\/story\/(.+)\./;
                this.resultNumber = s['total_count'];
                this.isIncomplete = s['incomplete_results'];
                var resultitem = [];
                var resultlist = [];
                var r;
                for(r in s['items']){
                    console.log(s['items'][r]['path'].match(ptre)[1]);
                    resultlist.push(s['items'][r]['path'].match(ptre)[1]);
                    resultitem.push(s['items'][r]['text_matches']);
                }
                console.log(resultitem);
                var storytype, eventid, storyidx;
                
                for(storytype in this.eventList){
                    var ctype = this.eventList[storytype];
                    for(eventid in ctype){
                        var cevent = ctype[eventid];
                        var eventResult = [];
                        for(storyidx in cevent['infoUnlockDatas']){
                            var idx = resultlist.indexOf(cevent['infoUnlockDatas'][storyidx]['storyTxt']);
                            
                            if(idx>-1){
                                console.log(idx);
                                
                                resultlist.splice(idx,1);
                                eventResult.push({
                                    storyCode: cevent['infoUnlockDatas'][storyidx]['storyCode'],
                                    avgTag: cevent['infoUnlockDatas'][storyidx]['avgTag'],
                                    storyName: cevent['infoUnlockDatas'][storyidx]['storyName'],
                                    storyPath: cevent['infoUnlockDatas'][storyidx]['storyTxt'],
                                    text_matches: resultitem[idx]
                                })
                                resultitem.splice(idx,1);
                            }
                        }
                        if(eventResult.length){
                            this.result[cevent['name']] = eventResult;
                        }
                    }
                }
            })
            
        },
        parseFrag(content,matches){
            if(content){
                var i;
                for(i in matches){
                    content = content.replaceAll(matches[i]['text'], `<span style="color:yellow">`+matches[i]['text']+`</span>`)
                }
                content = content.replaceAll('\\n','<br/>')
            }
            return content;
        },
    }
}
</script>

<style>
.searchbar{
    display: flex;
    justify-content: center;
    align-items: center;
}
.searchbar input{
    font-size: unset;
    background-color: rgba(0,0,0,0);
    margin-bottom: -2px;
    border-radius: 0px;
    border-width: 0px;
    border-bottom: 2px solid rgba(255, 255, 255, 0.5);
    color:rgb(255, 255, 255);
    transition: border-color 0.5s;
}
.searchbar input:hover{
    border-bottom: 2px solid rgba(255, 255, 255, 1);
}
.searchbar input:active{
    border-bottom: 2px solid rgba(255, 255, 255, 1);
}
.searchbar input:focus-visible{
    outline: none;
    border-bottom: 2px solid rgba(255, 255, 255, 1);
}
.textmatch{
    background-color: rgba(0,0,0,0.2);
    color: gray;
    font-size: small;
}
</style>