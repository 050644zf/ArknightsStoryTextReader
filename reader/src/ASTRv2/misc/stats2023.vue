<template>
    <n-layout-content>
        <n-space vertical class="stats" v-if="$route.params.server=='zh_CN'">
            <n-breadcrumb class="breadcrumb">
                <n-breadcrumb-item  @click="$router.push('/'+$route.params.server+'/menu')">
                    <n-icon><MenuIcon/></n-icon>
                    {{i18n.menu[currentLang]}}
                </n-breadcrumb-item>
                <n-breadcrumb-item>明日方舟年度工作报告 | Arknight Annual Work Report</n-breadcrumb-item>
            </n-breadcrumb>
            <n-alert title="关于数据安全 / About Data Security" type="info" closable>
                所有访问数据均于本地浏览器处理，不会上传至任何服务器。<br/>
                All data is handled locally in the browser, and will not be uploaded to any server.
            </n-alert>
            <n-alert type="warning" title="注意！/ Warning!" closable>
                回顾网页可能于2023年5月29日03:59分(UTC+8)关闭，建议保存所需文件以备后期查看<br/>
                The review site maybe closed at 2023-05-29 03:59(UTC+8), saving the files for later viewing is suggested.
            </n-alert>
            <n-hr></n-hr>
            <n-steps>
                <n-step title="登录 / Login">
                    <n-space vertical>
                        <n-text>
                            访问以下网址登录。<br/>
                            Access the following URL, click "登录" on the upperright corner to log in.
                        </n-text>
                        <n-button @click="openNewTab('https://ak.hypergryph.com/activity/annual-work-report')">
                            <template #icon>
                                <n-icon><LoginIcon></LoginIcon></n-icon>
                            </template>
                            登录 / Login
                        </n-button>
                    </n-space>
                </n-step>
                <n-step title="下载 / Download">
                    <n-space vertical>
                        <n-text>
                            从链接下载以下文件。<br/>
                            Download the following files from link.<br/>
                            <n-hr/>
                            注意！请复制链接后，在新页面下载！<br/>
                            Note! Please download the file in a new tab after copying the link!
                        </n-text>
                        <n-space>
                            <!-- <n-button @click="openNewTab('https://ak.hypergryph.com/activity/journey-review/section/data/stats')">
                                <template #icon>
                                    <n-icon><DownloadIcon></DownloadIcon></n-icon>
                                </template>
                                stats
                            </n-button>
                            <n-button @click="openNewTab('https://ak.hypergryph.com/activity/journey-review/section/data/story')">
                                <template #icon>
                                    <n-icon><DownloadIcon></DownloadIcon></n-icon>
                                </template>
                                story
                            </n-button>                                             -->
                            <n-text code>https://ak.hypergryph.com/activity/annual-work-report/api/act/data</n-text>
                        </n-space>
                    </n-space>
                </n-step>
                <n-step title="上传 / Upload">
                    <n-space vertical>
                        <n-text>
                            按文件名上传以下文件。<br/>
                            Upload the following files by filenames.
                        </n-text>
                        <n-space vertical>
                            <n-upload :on-change="handleStatsFile" :show-file-list="false">
                                <n-button :type="this.uploaded.stats?'success':'default'">
                                    <template #icon>
                                        <n-icon><UploadIcon></UploadIcon></n-icon>
                                    </template>
                                    data
                                </n-button>
                            </n-upload>
                        </n-space>
                    </n-space>
                </n-step>
                <n-step title="分析 / Analysis" :status="(this.uploaded.stats)?'process':'wait'">
                    <n-space vertical>
                        <n-text>
                            点击按钮开始分析。<br/>
                            Click the button to start analysis.
                        </n-text>
                            <n-button type="info" @click="analysis()" :disabled="!(this.uploaded.stats)">
                                <template #icon>
                                    <n-icon><AnalysisIcon></AnalysisIcon></n-icon>
                                </template>
                                开始分析 / Start Analysis
                            </n-button>
                    </n-space>
                </n-step>
            </n-steps>
            <n-hr/>
            <n-space v-if="analysis_enabled" vertical>
                <n-h2 prefix="bar">统计时间 / Statistic Period: 2022/05/01 10:00 - 2023/04/04 00:00 (UTC+8)</n-h2>
                <n-card>
                    <template #header>
                        账户基本数据 / Account Basic Data
                    </template>
                    <n-space justify="space-around">
                        <n-statistic >
                            <template #label>账户创建时间 <br/> Account Creation Time</template>
                            {{dateFormatter(parseInt(stats.create_role_ts,10))}}
                        </n-statistic>
                        <n-statistic>
                            <template #label>战斗次数 <br/> # of Battles</template>
                            <n-number-animation from="0" :to="stats.result_battle_gacha.battle_times" show-separator/>
                        </n-statistic>
                        <n-statistic>
                            <template #label>寻访次数 <br/> # of Headhunting</template>
                            <n-number-animation from="0" :to="stats.result_battle_gacha.gacha_times" show-separator/>
                        </n-statistic>
                        <n-statistic>
                            <template #label>理智消耗 <br/> # of Sanity Consumed</template>
                            <n-number-animation from="0" :to="stats.result_ap_cost.ap_cost" show-separator/>
                        </n-statistic>
                    </n-space>
                    <n-space justify="space-around">
                        <n-statistic>
                            <template #label>服装总数 <br/> # of Costumes</template>
                            <n-number-animation from="0" :to="stats.result_char_skin.skin_cnt"/>
                        </n-statistic>
                        <n-statistic>
                            <template #label>任命时间最长助理 <br/> Secretary Assigned for the Longest Time</template>
                            <img :src="getCharAvatar(stats.result_char_secretary_favor.charId)" style="width:64px;">
                        </n-statistic>                                                
                    </n-space>
                </n-card>
                <n-card>
                    <template #header>
                        账户活动数据 / Account Activity Data
                    </template>
                    <n-space justify="space-around">
                        <n-statistic>
                            <template #label>在线天数 <br/> Days of Login</template>
                            <n-number-animation from="0" :to="stats.result_user_action_basic.online_day_cnt"/>
                        </n-statistic>
                        <n-statistic>
                            <template #label>最早登录 <br/> Earlist Login</template>
                            {{dateFormatter(parseInt(stats.result_user_action_basic.earliest_login,10))}}
                        </n-statistic>                        
                        <n-statistic>
                            <template #label>最晚抽卡 <br/> Latest Gacha</template>
                            {{dateFormatter(parseInt(stats.result_user_action_basic.last_gacha,10))}}
                        </n-statistic>
                        <n-statistic>
                            <template #label>最短完成周常天数 <br/> Least Day(s) Taken to Finish Weekly Missions</template>
                            <n-number-animation from="0" :to="stats.result_user_action_basic.min_daydiff"/>
                        </n-statistic>
                    </n-space>
                    <n-space justify="space-around">
                        <n-statistic>
                            <template #label>6点至12点上线次数 <br/>Times of Login bewteen 6 to 12 </template>
                            <n-number-animation from="0" :to="stats.result_user_action_basic.login_cnt_06_12" show-separator/>
                        </n-statistic>
                        <n-statistic>
                            <template #label>12点至19点上线次数 <br/>Times of Login bewteen 12 to 19 </template>
                            <n-number-animation from="0" :to="stats.result_user_action_basic.login_cnt_12_19" show-separator/>
                        </n-statistic>
                        <n-statistic>
                            <template #label>19点至6点上线次数 <br/>Times of Login bewteen 19 to 6 </template>
                            <n-number-animation from="0" :to="stats.result_user_action_basic.login_cnt_19_06" show-separator/>
                        </n-statistic>                        
                    </n-space>
                </n-card>
                <n-card>
                    <template #header>
                        基建数据 / Infrastucture Data
                    </template>
                    <n-card>
                        <template #header>
                            最佳员工 / Best Employee
                        </template>
                        <n-space justify="space-around">
                        <n-statistic>
                            <template #label>人力资源室 <br/> HR Room </template>
                            <img :src="getCharAvatar(stats.result_room_char.hire_max_ts_all_char)" style="width:64px;">
                        </n-statistic>
                        <n-statistic>
                            <template #label>制造站 <br/> Production Room </template>
                            <img :src="getCharAvatar(stats.result_room_char.manufacture_max_ts_all_char)" style="width:64px;">
                        </n-statistic>
                        <n-statistic>
                            <template #label>贸易站 <br/> Trading Room </template>
                            <img :src="getCharAvatar(stats.result_room_char.trading_max_ts_all_char)" style="width:64px;">
                        </n-statistic>                                                 
                        </n-space>                    
                    </n-card>                          

                    <n-card>
                        <template #header>
                            宿舍 / Dormitory
                        </template>
                        <n-space justify="space-around">
                            <n-statistic>
                            <template #label>使用次数 <br/> Usages</template>
                            <n-number-animation from="0" :to="stats.result_room_char.dormitory_char_use_cnt" show-separator/>
                        </n-statistic>                          
                        <n-statistic>
                            <template #label>单次休息最久干员 <br/> Operator who has Longest Rest in Dorm</template>
                            <img :src="getCharAvatar(stats.result_room_char.dormitory_max_ts_all_char)" style="width:64px;">
                        </n-statistic>
                        <n-statistic>
                            <template #label>休息时间 <br/> Rest Duration</template>
                            <n-number-animation from="0" :to="stats.result_room_char.dormitory_char_use_max_hour" show-separator/>
                            <template #suffix> 小时 (Hour)</template>
                        </n-statistic>                      
                        </n-space>                    
                    </n-card>

                    <n-card>
                        <template #header>
                            生产&消耗 / Production & Consumption
                        </template>
                        <n-space justify="space-around">
                        <n-statistic>
                            <template #label>源石碎片生产 <br/> # of Orishard Production</template>
                            <n-number-animation from="0" :to="stats.result_goldcost_buildsource.build_Oshard_add" show-separator/>
                        </n-statistic>
                        <n-statistic>
                            <template #label>作战记录生产 <br/> # of Records Production</template>
                            <n-number-animation from="0" :to="stats.result_goldcost_buildsource.build_btrecord_add_2003" show-separator/>
                        </n-statistic>
                        <n-statistic>
                            <template #label>赤金生产 <br/> # of Gold Production</template>
                            <n-number-animation from="0" :to="stats.result_goldcost_buildsource.build_pgold_add" show-separator/>
                        </n-statistic>                                                
                        </n-space>
                        <n-space justify="space-around">
                        <n-statistic>
                            <template #label>基建龙门币收益 <br/> LMB Earned from Infra</template>
                            <n-number-animation from="0" :to="stats.result_goldcost_buildsource.build_gold_add" show-separator/>
                        </n-statistic>
                        <n-statistic>
                            <template #label>总龙门币消耗 <br/> Total LMB Comsumption</template>
                            <n-number-animation from="0" :to="stats.result_goldcost_buildsource.gold_cos_total" show-separator/>
                        </n-statistic>                                           
                        </n-space>                          
                    </n-card>                    
                </n-card>
                <n-card>
                    <template #header>
                        危机合约数据 / Contingency Contract Data
                    </template>
                    <n-space justify="space-around">
                        <n-statistic>
                            <template #label>首次参与危机合约日期 <br/> Date of first C.C.attendance</template>
                            {{ stats.result_crisis.first_attend_time }}
                        </n-statistic>
                        <n-statistic>
                            <template #label>最高合约等级 <br/> Best C.C. Level</template>
                            <n-number-animation from="0" :to="stats.result_crisis.best_score" show-separator/>
                        </n-statistic>
                        <n-statistic>
                            <template #label>最常使用干员 <br/> Most Use Operator</template>
                            <img :src="getCharAvatar(stats.result_crisis_char.mostuse_char)" style="width:64px;">
                        </n-statistic>               
                    </n-space>                      
                </n-card>
                <n-card>
                    <template #header>
                        集成战略数据 / Integrated Strategies Data
                    </template>
                    <n-card>
                    <template #header>
                        干员Pick位前五 / Top 5 Pick
                    </template>
                    <n-space justify="space-around">
                    <n-statistic>
                            <img :src="getCharAvatar(stats.result_rogue_char_pick.char_pick1)" style="width:64px;">
                    </n-statistic>
                    <n-statistic>
                            <img :src="getCharAvatar(stats.result_rogue_char_pick.char_pick2)" style="width:64px;">
                    </n-statistic>
                    <n-statistic>
                            <img :src="getCharAvatar(stats.result_rogue_char_pick.char_pick3)" style="width:64px;">
                    </n-statistic>
                    <n-statistic>
                            <img :src="getCharAvatar(stats.result_rogue_char_pick.char_pick4)" style="width:64px;">
                    </n-statistic>
                    <n-statistic>
                            <img :src="getCharAvatar(stats.result_rogue_char_pick.char_pick5)" style="width:64px;">
                    </n-statistic>
                    </n-space>
                    </n-card>
                    <n-card>
                    <template #header>
                        其他数据 / Other Data
                    </template>
                    <n-space justify="space-around">
                        <n-statistic>
                            <template #label>使用骰子次数 <br/> # of Dice Used</template>
                            <n-number-animation from="0" :to="stats.result_rogue_dice.use_dice_cnt" show-separator/>
                        </n-statistic>
                        <n-statistic>
                            <template #label>掷出6次数 <br/> Times of Getting 6</template>
                            <n-number-animation from="0" :to="stats.result_rogue_dice.dice_6up_cnt" show-separator/>
                        </n-statistic>
                        <n-statistic>
                            <template #label>掷出6概率 <br/> Possibility of Getting 6</template>
                            {{ toPercent(stats.result_rogue_dice.dice_6up_rank) }}
                        </n-statistic>                        
                    </n-space>
                    <n-space justify="space-around">
                        <n-statistic>
                            <template #label>敌人进点次数 <br/> # of Enemies Escaped</template>
                            <n-number-animation from="0" :to="stats.result_rogue_enemy_exit.enemy_exit_cnt_all" show-separator/>
                        </n-statistic>
                        <n-statistic>
                            <template #label>进点最多关卡 <br/> Stages with Most Enemies Escaped </template>
                            <n-a :href=getStageLink(stats.result_rogue_enemy_exit.max_exit_stage) target="_blank">{{ stats.result_rogue_enemy_exit.max_exit_stage }}</n-a>
                        </n-statistic>
                        <n-statistic>
                            <template #label>获得收藏品数 <br/> # of Relics Obtained</template>
                            <n-number-animation from="0" :to="stats.result_rogue_relic_get.get_cnt" show-separator/>
                        </n-statistic>
                        <n-statistic>
                            <template #label>获得热水壶数 <br/> # of Kettle Obtained</template>
                            <n-number-animation from="0" :to="stats.result_rogue_relic_get.kettle_get_cnt" show-separator/>
                        </n-statistic>                                                
                    </n-space>                    
                    </n-card>                    
                </n-card>                
            </n-space>
        </n-space>
        <n-alert class="stats" v-else type="error">
            该页面仅能通过 简中服(CN) 查看，请在右上角更改服务器。<br/>
            This page can only be accessed in 简中服(CN) server, please change the server in the upperright corner.
        </n-alert>
    </n-layout-content>
</template>

<script>
import {LogInOutlined,DownloadOutlined, FileUploadOutlined, QueryStatsOutlined, MenuOpenFilled, OpenInNewOutlined} from "@vicons/material";
import i18n from '../i18n.json';
import func from '../func';
// import stats from './stats.json'
// import story from './story.json'
import { h } from "vue";

export default {
    data(){
        return{
            i18n: i18n,
            currentLang: func.l,
            stats: {},
            // stats: stats.data,
            // story: story.data,
            uploaded: {stats: false},
            analysis_enabled: false,
            chardict: window.sessionStorage.getItem('chardict') ? JSON.parse(window.sessionStorage.getItem('chardict')) : {},
            showSecretaryHistory: false,
            SecretaryHistoryCols: [
                {title: '助理 / Secretary', key:'char_id', render: (row) => {
                    return h('img', {
                            src: this.getCharAvatar(row.char_id),
                            style: {width: '48px'}
                    })
                }},
                {title: '任命时长(天) / Duration(Days)', key:'secretary_use_days',sorter: (row1, row2) => row1.secretary_use_days - row2.secretary_use_days},
            ],
            showCostumes: false,
            CostumesCols:[
                {title: '干员 / Operator', key:'char_id', render: (row) => {
                    return h('img', {
                            src: this.getCharAvatar(row.charId),
                            style: {width: '48px'}
                    })
                }},
                {title: '时装数 / # of Costumes', key:'skin_cnt',sorter: (row1, row2) => row1.skin_cnt - row2.skin_cnt},
                {title: '首次获得时间 / First Obtained Time', key:'char_first_get_ts',sorter: (row1, row2) => row1.char_first_get_ts - row2.char_first_get_ts, render: (row) => {
                    return this.dateFormatter(row.char_first_get_ts)
                }},
            ],
            showMostRecruitment: false,
            RecCols:[
                {title: '稀有度 / Rarity', key: 'rarity', sorter: (row1, row2) => row1.rarity - row2.rarity},
                {title: '干员 / Operator', key:'char_id', render: (row) => {
                    return h('img', {
                            src: this.getCharAvatar(row.charId),
                            style: {width: '48px'}
                    })
                }},
                {title: '招募次数 / Recruitment Times', key:'char_get_cnt_histroy',sorter: (row1, row2) => row1.char_get_cnt_histroy - row2.char_get_cnt_histroy},
            ]
        }
    },
    components:{
        LoginIcon: LogInOutlined,
        DownloadIcon: DownloadOutlined,
        UploadIcon: FileUploadOutlined,
        AnalysisIcon: QueryStatsOutlined,
        MenuIcon: MenuOpenFilled,
        OpenIcon: OpenInNewOutlined,
    },
    mounted(){
    },
    metaInfo(){
        return{
            title: 'Arknight Journey Review | Arknights Story Text Reader',
        }
    },
    methods:{
        openNewTab(url){
            window.open(url);
        },
        handleStatsFile(option){
            //assign the parsed file to the stats variable

            option.file.file.text().then(data => {
                var stats = JSON.parse(data);
                if(stats.code==0){
                    this.uploaded.stats = true;
                    this.stats = stats.data;
                }
                console.log(this.stats);
            });

        },
        analysis(){
            this.analysis_enabled = true;
        },
        dateFormatter(t){
            var date = new Date(t*1000);
            return date.toLocaleString();
        },
        add0(t){
            //add 0 before single digit
            return t<10?'0'+t:t;
        },
        getCharAvatar(char_code){
            //get the avatar of the character
            return 'https://raw.githubusercontent.com/Aceship/Arknight-Images/main/avatars/'+char_code+'.png'
        },
        getRecData(input){
            var data = [];
            for(var rarity in input){
                var row = input[rarity][0];
                row.rarity = rarity;
                data.push(row);
            }
            return data;
        },
        toPercent(point){
            var str=Number(point*100).toFixed(2);
            str+="%";
            return str;
        },
        getStageLink(id){
            return 'https://map.ark-nights.com/map/' + id;
        }
    }
}
</script>

<style>
.stats{
    margin: 2% 15%;
}
.datatable{
}
</style>
