<template>
  <n-layout-content>
    <n-space vertical class="stats" v-if="$route.params.server == 'zh_CN'">
      <n-breadcrumb class="breadcrumb">
        <n-breadcrumb-item
          @click="$router.push('/' + $route.params.server + '/menu')"
        >
          <n-icon><MenuIcon /></n-icon>
          {{ i18n.menu[currentLang] }}
        </n-breadcrumb-item>
        <n-breadcrumb-item
          >明日方舟特别回顾 | Arknight Journey Review</n-breadcrumb-item
        >
      </n-breadcrumb>
      <n-alert title="关于数据安全 / About Data Security" type="info" closable>
        所有访问数据均于本地浏览器处理，不会上传至任何服务器。<br />
        All data is handled locally in the browser, and will not be uploaded to
        any server.
      </n-alert>
      <n-alert type="warning" title="注意！/ Warning!" closable>
        回顾网页可能于2022年5月29日03:59分(UTC+8)关闭，建议保存所需文件以备后期查看<br />
        The review site maybe closed at 2022-05-29 03:59(UTC+8), saving the
        files for later viewing is suggested.
      </n-alert>
      <n-hr></n-hr>
      <n-steps>
        <n-step title="登录 / Login">
          <n-space vertical>
            <n-text>
              访问以下网址登录。<br />
              Access the following URL, click "登录" on the upperright corner to
              log in.
            </n-text>
            <n-button
              @click="
                openNewTab('https://ak.hypergryph.com/activity/journey-review')
              "
            >
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
              从链接下载以下文件。<br />
              Download the following files from link.<br />
              <n-hr />
              注意！请复制链接后，在新页面下载！<br />
              Note! Please download the file in a new tab after copying the
              link!
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
              <n-text code
                >https://ak.hypergryph.com/activity/journey-review/section/data/stats</n-text
              >
              <n-text code
                >https://ak.hypergryph.com/activity/journey-review/section/data/story</n-text
              >
            </n-space>
          </n-space>
        </n-step>
        <n-step title="上传 / Upload">
          <n-space vertical>
            <n-text>
              按文件名上传以下文件。<br />
              Upload the following files by filenames.
            </n-text>
            <n-space vertical>
              <n-upload :on-change="handleStatsFile" :show-file-list="false">
                <n-button :type="this.uploaded.stats ? 'success' : 'default'">
                  <template #icon>
                    <n-icon><UploadIcon></UploadIcon></n-icon>
                  </template>
                  stats
                </n-button>
              </n-upload>
              <n-upload :on-change="handleStoryFile" :show-file-list="false">
                <n-button :type="this.uploaded.story ? 'success' : 'default'">
                  <template #icon>
                    <n-icon><UploadIcon></UploadIcon></n-icon>
                  </template>
                  story
                </n-button>
              </n-upload>
            </n-space>
          </n-space>
        </n-step>
        <n-step
          title="分析 / Analysis"
          :status="
            this.uploaded.stats && this.uploaded.story ? 'process' : 'wait'
          "
        >
          <n-space vertical>
            <n-text>
              点击按钮开始分析。<br />
              Click the button to start analysis.
            </n-text>
            <n-button
              type="info"
              @click="analysis()"
              :disabled="!(this.uploaded.stats && this.uploaded.story)"
            >
              <template #icon>
                <n-icon><AnalysisIcon></AnalysisIcon></n-icon>
              </template>
              开始分析 / Start Analysis
            </n-button>
          </n-space>
        </n-step>
      </n-steps>
      <n-hr />
      <n-space v-if="analysis_enabled" vertical>
        <n-h2 prefix="bar"
          >统计时间 / Statistic Period: 2019/04/30 16:00 - 2022/04/01 00:00
          (UTC+8)</n-h2
        >
        <n-card>
          <template #header> 账户基本数据 / Account Basic Data </template>
          <n-space justify="space-around">
            <n-statistic>
              <template #label
                >账户创建时间 <br />
                Account Creation Time</template
              >
              {{ dateFormatter(parseInt(story.create_role_ts, 10)) }}
            </n-statistic>
            <n-statistic>
              <template #label
                >解锁支线数 <br />
                # of Sidestory Unlocked</template
              >
              <n-number-animation
                from="0"
                :to="story.result_act_engage.act_ss_engage_cnt"
              />
              <!-- {{story.result_act_engage.act_ss_engage_cnt}} -->
            </n-statistic>
            <n-statistic>
              <template #label
                >解锁故事集数 <br />
                # of Storyset Unlocked</template
              >
              <n-number-animation
                from="0"
                :to="story.result_act_engage.act_mini_engage_cnt"
              />
            </n-statistic>
            <n-statistic>
              <template #label
                >经手简历数 <br />
                # of Resumes Handled</template
              >
              <n-number-animation
                from="0"
                :to="stats.result_char_get.char_get_cnt_histroy"
              />
            </n-statistic>
            <n-statistic>
              <template #label
                >贸易站收益 <br />
                Trading Center Revenue</template
              >
              <n-number-animation
                from="0"
                :to="stats.result_gold_delivery.delivery_gold_sum"
                show-separator
              />
              <template #suffix>LMD</template>
            </n-statistic>
          </n-space>
        </n-card>
        <n-card>
          <template #header>在线数据 / Online Data</template>
          <n-space justify="space-around">
            <n-statistic>
              <template #label>在线天数 <br /># of Days Online </template>
              <n-number-animation
                from="0"
                :to="stats.result_user_online_basic.online_day_cnt"
                show-separator
              />
              <template #suffix>Day(s)</template>
            </n-statistic>
            <n-statistic>
              <template #label
                >6点至12点上线次数 <br />Times of Login bewteen 6 to 12:00
              </template>
              <n-number-animation
                from="0"
                :to="stats.result_user_online_basic.login_cnt_06_12"
                show-separator
              />
            </n-statistic>
            <n-statistic>
              <template #label
                >12点至19点上线次数 <br />Times of Login bewteen 12 to 19:00
              </template>
              <n-number-animation
                from="0"
                :to="stats.result_user_online_basic.login_cnt_12_19"
                show-separator
              />
            </n-statistic>
            <n-statistic>
              <template #label
                >19点至6点上线次数 <br />Times of Login bewteen 19 to 6:00
              </template>
              <n-number-animation
                from="0"
                :to="stats.result_user_online_basic.login_cnt_19_06"
                show-separator
              />
            </n-statistic>
          </n-space>
        </n-card>
        <n-card>
          <template #header>作战数据 / Combat Data</template>
          <n-space justify="space-around">
            <n-statistic>
              <template #label
                >作战完成数 <br /># of Battles Finished
              </template>
              <n-number-animation
                from="0"
                :to="stats.result_stage_clear_cnt.battle_finish_cnt_total"
                show-separator
              />
            </n-statistic>
            <n-statistic>
              <template #label
                >作战理智消耗 <br />Sanity Consumed in Combat</template
              >
              <n-number-animation
                from="0"
                :to="stats.result_stage_clear_cnt.ap_battle_use_total"
                show-separator
              />
            </n-statistic>
            <n-statistic>
              <template #label
                >单日作战最高次数 <br />Highest # of Battles Finished in one
                day</template
              >
              <n-number-animation
                from="0"
                :to="stats.result_stage_clear_cnt.battle_one_day_most_cnt"
              />
              <template #suffix>
                Times
                <n-text depth="3">
                  <br />
                  on
                  {{ stats.result_stage_clear_cnt.battle_one_day_most_day }} in
                  {{ stats.result_stage_clear_cnt.battle_one_day_most_stage }}
                </n-text>
              </template>
            </n-statistic>
          </n-space>
        </n-card>
        <n-card>
          <template #header>最佳干员 / Best Operator</template>
          <n-space justify="space-around">
            <n-statistic>
              <template #label>最佳干员 <br />Best Operator</template>
              <img
                :src="
                  getCharAvatar(
                    stats.result_char_best_partner.char_best_partner_list[0]
                      .charId
                  )
                "
                style="width: 64px"
              />
            </n-statistic>
            <n-statistic>
              <template #label>使用次数 <br />Times of Appearance</template>
              <n-number-animation
                from="0"
                :to="
                  stats.result_char_best_partner.char_best_partner_list[0]
                    .char_use_cnt
                "
                show-separator
              />
            </n-statistic>
            <n-statistic>
              <template #label
                >危机合约最佳战绩 <br />Best Score in C.C.</template
              >
              <template #prefix
                >{{
                  stats.result_char_best_partner.char_best_partner_list[0]
                    .season_no
                }}
                Lv.</template
              >
              <n-number-animation
                from="0"
                :to="
                  stats.result_char_best_partner.char_best_partner_list[0]
                    .best_scores
                "
                show-separator
              />
            </n-statistic>
          </n-space>
        </n-card>
        <n-card>
          <template #header>危机合约 / Contingency Contracts</template>
          <n-space vertical>
            <n-card>
              <template #header
                >首次通过危机等级18 / C.C. Level 18 First Clear</template
              >
              <n-space>
                <n-statistic>
                  <template #label
                    >时间 <br />
                    Time</template
                  >
                  {{
                    dateFormatter(
                      stats.result_crisis_clear.first_gt18_scores_ts
                    )
                  }}
                </n-statistic>
                <n-statistic>
                  <template #label
                    >季度 <br />
                    Season</template
                  >
                  {{ stats.result_crisis_clear.first_gt18_scores_act_no }}
                </n-statistic>
                <n-statistic>
                  <template #label
                    >阵容 <br />
                    Team</template
                  >
                  <n-space>
                    <div
                      v-for="char in stats.result_crisis_clear
                        .first_gt18_scores_squad"
                      :key="char.charId"
                    >
                      <img
                        v-if="char.charId != 'EMPTY'"
                        :src="getCharAvatar(char.charId)"
                        style="width: 32px"
                      />
                    </div>
                  </n-space>
                </n-statistic>
              </n-space>
            </n-card>
            <n-card>
              <template #header
                >最高危机等级 / Best C.C. Level Cleared</template
              >
              <n-space>
                <n-statistic>
                  <template #label
                    >时间 <br />
                    Time</template
                  >
                  {{ dateFormatter(stats.result_crisis_clear.best_scores_ts) }}
                </n-statistic>
                <n-statistic>
                  <template #label
                    >赛季 <br />
                    Season</template
                  >
                  {{ stats.result_crisis_clear.best_scores_act_no }}
                </n-statistic>
                <n-statistic>
                  <template #label
                    >危机等级 <br />
                    C.C. Level</template
                  >
                  <template #prefix>Lv.</template>
                  <n-number-animation
                    from="0"
                    :to="stats.result_crisis_clear.best_scores"
                  />
                </n-statistic>
                <n-statistic>
                  <template #label
                    >阵容 <br />
                    Team</template
                  >
                  <n-space>
                    <div
                      v-for="char in stats.result_crisis_clear
                        .best_scores_squad"
                      :key="char.charId"
                    >
                      <img
                        v-if="char.charId != 'EMPTY'"
                        :src="getCharAvatar(char.charId)"
                        style="width: 32px"
                      />
                    </div>
                  </n-space>
                </n-statistic>
              </n-space>
            </n-card>
          </n-space>
        </n-card>
        <n-card>
          <template #header>线索交流 / Clues Exchange</template>
          <n-space justify="space-around">
            <n-statistic>
              <template #label
                >总线索交换数 <br /># of Total Clues Exchanged</template
              >
              <n-number-animation
                from="0"
                :to="stats.result_clue.clue_total_cnt"
              />
            </n-statistic>
            <n-statistic>
              <template #label
                >来自好友的线索数 <br /># of Clues from Friends</template
              >
              <n-number-animation
                from="0"
                :to="stats.result_clue.clue_in_cnt"
              />
            </n-statistic>
            <n-statistic>
              <template #label>送给好友的线索数 <br /># of Clues Sent</template>
              <n-number-animation
                from="0"
                :to="stats.result_clue.clue_out_cnt"
              />
            </n-statistic>
            <n-statistic>
              <template #label
                >给予最多线索的好友 <br />Friend who give you most
                clues</template
              >
              {{ stats.result_clue.friend_clue_in_most_nickname }}
            </n-statistic>
            <n-statistic>
              <template #label
                >收到最多线索的好友 <br />Friend who received most clues from
                you</template
              >
              {{ stats.result_clue.friend_clue_out_most_nickname }}
            </n-statistic>
          </n-space>
        </n-card>
        <n-card>
          <template #header>好友助战数据 / Friend Assist Data</template>
          <n-space justify="space-around">
            <n-statistic>
              <template #label
                >助战被使用次数 <br /># of Times the Assist being Used</template
              >
              <n-number-animation
                from="0"
                :to="stats.result_assist.char_assist_used_cnt"
              />
            </n-statistic>
            <n-statistic>
              <template #label
                >被使用最多的助战干员 <br />Assist Operator being Used the
                most</template
              >
              <img
                :src="
                  getCharAvatar(stats.result_assist.charid_assist_used_most)
                "
                style="width: 64px"
              />
            </n-statistic>
          </n-space>
        </n-card>
        <n-card>
          <template #header>助理数据 / Secretary Data</template>
          <n-space justify="space-around">
            <n-statistic>
              <template #label
                >任命时间最长助理 <br />Secretary Assigned for the Longest
                Time</template
              >
              <img
                :src="getCharAvatar(stats.result_char_secretary_favor.charid)"
                style="width: 64px"
              />
            </n-statistic>
            <n-statistic>
              <template #label>任命时长 <br />Duration Assigned</template>
              <n-number-animation
                from="0"
                :to="stats.result_char_secretary_favor.secretary_use_days"
                show-separator
              />
              <template #suffix> Day(s)</template>
            </n-statistic>
            <n-statistic>
              <template #label
                >历史助理数<br /># of Secretary in History</template
              >
              <n-number-animation
                from="0"
                :to="stats.result_char_secretary_favor.secretary_char_used_cnt"
              />
            </n-statistic>
          </n-space>
          <n-modal v-model:show="showSecretaryHistory">
            <n-card style="width: 800px">
              <template #header>历史助理数据 / Secretary History Data</template>
              <n-data-table
                :columns="SecretaryHistoryCols"
                :data="
                  stats.result_char_secretary_favor.secretary_char_used_list
                "
                size="small"
                class="datatable"
                virtual-scroll
                max-height="500"
              ></n-data-table>
            </n-card>
          </n-modal>
          <template #action>
            <n-button
              secondary
              type="info"
              @click="showSecretaryHistory = true"
            >
              <template #icon><OpenIcon /></template>
              助理详情 / Secretaries Details
            </n-button>
          </template>
        </n-card>
        <n-card>
          <template #header>时装数据 / Costumes Data</template>
          <n-button secondary type="info" @click="showCostumes = true">
            <template #icon><OpenIcon /></template>
            拥有时装的干员列表 / List of Operators with Costumes
          </n-button>
          <n-modal v-model:show="showCostumes">
            <n-card style="width: 800px">
              <template #header
                >拥有时装的干员列表 / List of Operators with Costumes</template
              >
              <n-data-table
                :columns="CostumesCols"
                :data="stats.result_char_skin.char_list_skin_cnt_gt1"
                size="small"
                class="datatable"
                virtual-scroll
                max-height="500"
              ></n-data-table>
            </n-card>
          </n-modal>
        </n-card>
        <n-card>
          <template #header>干员招募 / Operators Recruitment</template>
          <n-button secondary type="info" @click="showMostRecruitment = true">
            <template #icon><OpenIcon /></template>
            各稀有度招募最多次的干员列表 / List of Operators with the Most
            Recruitment in Rarities
          </n-button>
          <n-modal v-model:show="showMostRecruitment">
            <n-card style="width: 800px">
              <template #header
                >各稀有度招募最多次的干员列表 / List of Operators with the Most
                Recruitment in Rarities</template
              >
              <n-data-table
                :columns="RecCols"
                :data="getRecData(stats.result_char_get.char_get_most)"
                size="small"
                class="datatable"
                virtual-scroll
                max-height="500"
              ></n-data-table>
            </n-card>
          </n-modal>
        </n-card>
        <n-card>
          <template #header>集成战略 / Integrated Strategies</template>
          <n-space justify="space-around">
            <n-statistic>
              <template #label>通过节点数<br /># of Nodes Passed</template>
              <n-number-animation
                from="0"
                :to="stats.result_rouge.node_pass_cnt"
                show-seperator
              />
            </n-statistic>
            <n-statistic>
              <template #label
                >获得热水壶数<br /># of Kettles Obtained</template
              >
              <n-number-animation
                from="0"
                :to="stats.result_rouge.kettle_get_cnt"
                show-seperator
              />
            </n-statistic>
          </n-space>
        </n-card>
      </n-space>
    </n-space>
    <n-alert class="stats" v-else type="error">
      该页面仅能通过 简中服(CN) 查看，请在右上角更改服务器。<br />
      This page can only be accessed in 简中服(CN) server, please change the
      server in the upperright corner.
    </n-alert>
  </n-layout-content>
</template>

<script>
import {
  LogInOutlined,
  DownloadOutlined,
  FileUploadOutlined,
  QueryStatsOutlined,
  MenuOpenFilled,
  OpenInNewOutlined,
} from "@vicons/material";
import i18n from "../i18n.json";
import func from "../func";
// import stats from './stats.json'
// import story from './story.json'
import { h } from "vue";

export default {
  data() {
    return {
      i18n: i18n,
      currentLang: func.l,
      stats: {},
      story: {},
      // stats: stats.data,
      // story: story.data,
      uploaded: { stats: false, story: false },
      analysis_enabled: false,
      chardict: window.sessionStorage.getItem("chardict")
        ? JSON.parse(window.sessionStorage.getItem("chardict"))
        : {},
      showSecretaryHistory: false,
      SecretaryHistoryCols: [
        {
          title: "助理 / Secretary",
          key: "char_id",
          render: (row) => {
            return h("img", {
              src: this.getCharAvatar(row.char_id),
              style: { width: "48px" },
            });
          },
        },
        {
          title: "任命时长(天) / Duration(Days)",
          key: "secretary_use_days",
          sorter: (row1, row2) =>
            row1.secretary_use_days - row2.secretary_use_days,
        },
      ],
      showCostumes: false,
      CostumesCols: [
        {
          title: "干员 / Operator",
          key: "char_id",
          render: (row) => {
            return h("img", {
              src: this.getCharAvatar(row.charId),
              style: { width: "48px" },
            });
          },
        },
        {
          title: "时装数 / # of Costumes",
          key: "skin_cnt",
          sorter: (row1, row2) => row1.skin_cnt - row2.skin_cnt,
        },
        {
          title: "首次获得时间 / First Obtained Time",
          key: "char_first_get_ts",
          sorter: (row1, row2) =>
            row1.char_first_get_ts - row2.char_first_get_ts,
          render: (row) => {
            return this.dateFormatter(row.char_first_get_ts);
          },
        },
      ],
      showMostRecruitment: false,
      RecCols: [
        {
          title: "稀有度 / Rarity",
          key: "rarity",
          sorter: (row1, row2) => row1.rarity - row2.rarity,
        },
        {
          title: "干员 / Operator",
          key: "char_id",
          render: (row) => {
            return h("img", {
              src: this.getCharAvatar(row.charId),
              style: { width: "48px" },
            });
          },
        },
        {
          title: "招募次数 / Recruitment Times",
          key: "char_get_cnt_histroy",
          sorter: (row1, row2) =>
            row1.char_get_cnt_histroy - row2.char_get_cnt_histroy,
        },
      ],
    };
  },
  components: {
    LoginIcon: LogInOutlined,
    DownloadIcon: DownloadOutlined,
    UploadIcon: FileUploadOutlined,
    AnalysisIcon: QueryStatsOutlined,
    MenuIcon: MenuOpenFilled,
    OpenIcon: OpenInNewOutlined,
  },
  mounted() {},
  metaInfo() {
    return {
      title: "Arknight Journey Review | Arknights Story Text Reader",
    };
  },
  methods: {
    openNewTab(url) {
      window.open(url);
    },
    handleStatsFile(option) {
      //assign the parsed file to the stats variable

      option.file.file.text().then((data) => {
        var stats = JSON.parse(data);
        if (stats.code == 0) {
          this.uploaded.stats = true;
          this.stats = stats.data;
        }
      });
    },
    handleStoryFile(option) {
      //assign the parsed file to the story variable
      option.file.file.text().then((data) => {
        var story = JSON.parse(data);
        if (story.code == 0) {
          this.uploaded.story = true;
          this.story = story.data;
        }
      });
    },
    analysis() {
      this.analysis_enabled = true;
    },
    dateFormatter(t) {
      var date = new Date(t * 1000);
      return date.toLocaleString();
    },
    add0(t) {
      //add 0 before single digit
      return t < 10 ? "0" + t : t;
    },
    getCharAvatar(char_code) {
      //get the avatar of the character
      return (
        "https://raw.githubusercontent.com/Aceship/Arknight-Images/main/avatars/" +
        char_code +
        ".png"
      );
    },
    getRecData(input) {
      var data = [];
      for (var rarity in input) {
        var row = input[rarity][0];
        row.rarity = rarity;
        data.push(row);
      }
      return data;
    },
  },
};
</script>

<style>
.stats {
  margin: 2% 15%;
}
.datatable {
}
</style>
