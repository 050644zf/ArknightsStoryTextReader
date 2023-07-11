<template>
    <n-space vertical class="searchpage">
        <n-space item-style="display:flex;margin:10px;" align="center" justify="center" style="flex-wrap: nowrap;">
            <n-input v-model:value="searchvalue" type="text" :loading="isSearching" @keyup.enter="searchRequest" default-value="keywords here...">
            </n-input>
            <n-button type="info" @click="searchRequest">
                <n-icon size="24">
                    <SearchIcon />
                </n-icon>
            </n-button>
        </n-space>
        <n-collapse arrow-placement="right" :default-expanded-names="[0]">
            <n-collapse-item v-for="(event, eventid, eidx) in result" :key='eidx' :name="eidx">
                <template #header>
                    <n-h2 prefix="bar" style="margin:0px;">{{eventid}}</n-h2>&nbsp;&nbsp;&nbsp;
                    <n-text depth="3">{{event.length}} result(s)</n-text>
                </template>
                <n-list>
                <n-list-item v-for="(story,sidx) in event" :key='sidx'>
                <n-thing>
                    <template #header>
                        <n-text strong>{{story.storyCode}} {{story.storyName}} </n-text>&nbsp;
                        <n-text depth="3">{{story.avgTag}}</n-text>
                    </template>
                    <template #header-extra>
                        <n-button secondary type="info" @click="loadStory(story.storyPath)">
                            <n-icon size="24">
                                <OpenIcon />
                            </n-icon>
                        </n-button>
                    </template>
                    <template #description>
                        <n-blockquote class="textmatch" v-for="(match,midx) in story.text_matches" :key="midx"
                            v-html="parseFrag(match['fragment'],match['matches'])"></n-blockquote>
                    </template>
                </n-thing>
            </n-list-item>
                </n-list>
            </n-collapse-item>
        </n-collapse>

        <n-text v-if="!isSearched">
            <n-h3 prefix="bar">
                关于搜索 / About Search:
            </n-h3>
            ASTR提供基于Github API的搜索功能。由于Github API的限制，<n-text type="warning">每个文件只能展示两条结果</n-text><br /><br />
            ASTR provides search feature based on Github API. Due to the limitation of Github API, <n-text
                type="warning">each file can only
                show two results</n-text><br /><br />
            <n-text depth="3" delete>归根结底还是没钱搭服务器，只能靠嫖Github过日子。</n-text>
        </n-text>
    </n-space>
</template>

<script>
import { SearchOutlined, OpenInNewOutlined } from "@vicons/material";
import $ from 'jquery';
export default {
    data() {
        return {
            searchvalue: '',
            result: {},
            server: this.$route.params.server,
            resultNumber: 0,
            isIncomplete: false,
            isSearching: false,
            isSearched: false,
            eventList: window.sessionStorage.getItem('eventList') ? JSON.parse(window.sessionStorage.getItem('eventList')) : [],
        }
    },
    components: {
        SearchIcon: SearchOutlined,
        OpenIcon: OpenInNewOutlined,
    },
    methods: {
        searchRequest() {
            this.isSearched = true;
            this.isSearching = true;
            this.result = {};
            this.resultNumber = 'Searching';
            var requestURL = 'https://astr-search.azurewebsites.net/api/search?q=' + this.searchvalue + '&server=' + this.server + '/gamedata';
            $.getJSON(requestURL).done(s => {
                this.result = {};
                const ptre = /.+\/gamedata\/story\/(.+)\./;
                this.resultNumber = s['total_count'];
                this.isIncomplete = s['incomplete_results'];
                var resultitem = [];
                var resultlist = [];
                var r;
                for (r in s['items']) {
                    console.log(s['items'][r]['path'].match(ptre)[1]);
                    resultlist.push(s['items'][r]['path'].match(ptre)[1]);
                    resultitem.push(s['items'][r]['text_matches']);
                }
                // console.log(resultitem);
                var storytype, eventid, storyidx;

                for (storytype in this.eventList) {
                    var ctype = this.eventList[storytype];
                    for (eventid in ctype) {
                        var cevent = ctype[eventid];
                        var eventResult = [];
                        for (storyidx in cevent['infoUnlockDatas']) {
                            var idx = resultlist.indexOf(cevent['infoUnlockDatas'][storyidx]['storyTxt']);

                            if (idx > -1) {

                                resultlist.splice(idx, 1);
                                eventResult.push({
                                    storyCode: cevent['infoUnlockDatas'][storyidx]['storyCode'],
                                    avgTag: cevent['infoUnlockDatas'][storyidx]['avgTag'],
                                    storyName: cevent['infoUnlockDatas'][storyidx]['storyName'],
                                    storyPath: cevent['infoUnlockDatas'][storyidx]['storyTxt'],
                                    text_matches: resultitem[idx]
                                })
                                resultitem.splice(idx, 1);
                            }
                        }
                        if (eventResult.length) {
                            this.result[cevent['name']] = eventResult;
                        }
                    }
                }
            }).then(() => {
                this.isSearching = false;
                console.log(this.result);
            });
        },
        parseFrag(content) {
            if (content) {
                var keyword = this.searchvalue;
                var re = new RegExp(keyword, 'g');
                content = content.replaceAll(re, '<span class="highlight">' + keyword + '</span>');
                content = content.replaceAll('\\n', '<br/>')
            }
            return content;
        },
        loadStory(storyTxt) {
            this.$router.push({ path: '/' + this.server + '/content', query: { f: storyTxt } });
        },
    }
}
</script>

<style>
.searchpage {
    margin: 3% 15%;
}

.searchpage .n-input {
    min-width: 500px;
}

.searchpage .highlight {
    background-color: #ffff0036;
}

@media(max-width: 820px) {
    .searchpage .n-input {
        min-width: 300px;
    }
}

@media(max-width: 500px) {
    .searchpage .n-input {
        min-width: 200px;
    }
}
</style>