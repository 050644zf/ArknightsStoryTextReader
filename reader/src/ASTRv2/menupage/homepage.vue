<template>
  <n-flex vertical class="homepage" justify="center">
    <n-alert type="error" title="FIREFOX BROWSER ISSUE" v-if="isFirefox()">
      We noticed there is a compatibility issue with Firefox browser. Please use
      Chrome, Edge or any Chronium based browser for better experience.
      <br /><br />
      我们注意到火狐浏览器存在兼容性问题，请使用Chrome、Edge或任何基于Chromium的浏览器以获得更好的体验。
    </n-alert>
    <n-alert type="info">
      欢迎访问我们的新域名 / Welcome to our new domain:
      <n-a href="https://astr.pages.dev">astr.pages.dev</n-a>
    </n-alert>
    <br />

    <n-flex justify="center">
      <n-grid x-gap="12" y-gap="12" cols="2 800:4" class="recommend-bar">
        <n-gi>
          <n-card :title="$t('homepage.recommend.latest')" class="recommend-card" v-if="latestEvents.length" hoverable
            @click="
              $router.push({
                name: 'event',
                params: { event: latestEvents[0].id },
              })
              ">
            <template #cover>
              <n-image :src="'https://r2.m31ns.top/img/banners/' +
                latestEvents[0].id +
                '.png'
                " fallback-src="https://r2.m31ns.top/img/banners/404.png" preview-disabled />
            </template>
            <template #header-extra>
              <n-icon size="32">
                <ArrowForward />
              </n-icon>
            </template>
          </n-card>
        </n-gi>
        <n-gi>
          <n-card :title="$t('homepage.recommend.maintheme')" class="recommend-card" hoverable @click="
            $router.push({ name: 'menu', params: { selected: 'maintheme' } })
            ">
            <template #cover>
              <n-image :src="maintheme_png" preview-disabled />
            </template>
            <template #header-extra>
              <n-icon size="32">
                <ArrowForward />
              </n-icon>
            </template>
          </n-card>
        </n-gi>
        <n-gi>
          <n-card :title="$t('homepage.recommend.operator_data')" class="recommend-card" hoverable
            @click="$router.push({ name: 'menu', params: { selected: 'or' } })">
            <template #cover>
              <n-image :src="op_png" preview-disabled />
            </template>
            <template #header-extra>
              <n-icon size="32">
                <ArrowForward />
              </n-icon>
            </template>
          </n-card>
        </n-gi>
        <n-gi>
          <n-card :title="$t('homepage.recommend.analysis')" class="recommend-card" hoverable
            @click="$router.push({ name: 'analysis' })">
            <template #cover>
              <n-image :src="analysis_png" preview-disabled />
            </template>
            <template #header-extra>
              <n-icon size="32">
                <ArrowForward />
              </n-icon>
            </template>
          </n-card>
        </n-gi>
      </n-grid>
    </n-flex>
    <n-divider />

    <n-h1 prefix="bar" v-t="'homepage.welcome'"></n-h1>
    <n-text>
      <n-button @click="showChangelog = true">
        <template #icon>
          <n-icon>
            <InfoOutlined />
          </n-icon>
        </template>
        {{ $t("homepage.changelog") }}
      </n-button>

      <n-modal v-model:show="showChangelog">
        <changelog />
      </n-modal>

      <p v-t="'homepage.intro'"></p>

      <i18n-t keypath="homepage.issue" tag="p" for="homepage.here">
        <n-a href="https://github.com/050644zf/ArknightsStoryTextReader/issues/new">{{ $t("homepage.here") }}</n-a>
      </i18n-t>

      <p> {{ $t('homepage.star') }} &nbsp;&nbsp; <n-a href="https://github.com/050644zf/ArknightsStoryTextReader">
          <n-icon>
            <img src="https://img.shields.io/github/stars/050644zf/ArknightsStoryTextReader?style=social" />
          </n-icon>
        </n-a>
      </p>


      <i18n-t keypath="homepage.sponsoring" tag="p" for="homepage.patreon">
        <n-a href="https://www.patreon.com/m31nightsky">
          {{ $t("homepage.patreon") }}
        </n-a>
      </i18n-t>

      <p v-t="'homepage.i18n_help'"></p>
      <a href="https://hosted.weblate.org/engage/astr-i18n/">
        <img src="https://hosted.weblate.org/widget/astr-i18n/multi-auto.svg" alt="翻译状态" />
      </a>
      <br /><br />
      <i18n-t keypath="homepage.progress" tag="p" for="homepage.roadmap">
        <n-a href="https://github.com/users/050644zf/projects/1">{{
          $t("homepage.roadmap")
        }}</n-a>
      </i18n-t>

      <n-text strong type="warning">
        {{ $t("homepage.copyright_claim") }}
      </n-text>
    </n-text>
    <n-hr />
    <n-h2 prefix="bar" type="info"> {{ $t("homepage.credits.credits") }} </n-h2>
    <n-text>
      {{ $t("homepage.credits.contributors") }}
    </n-text>
    <n-card @click="getContributor()" hoverable>
      <n-image width="200" src="https://contributors-img.web.app/image?repo=050644zf/ArknightsStoryTextReader"
        preview-disabled /></n-card>

    <n-text>
      {{ $t("homepage.credits.sponsors") }}
    </n-text>
    <n-card>
      <n-badge value="$1" type="info">Thymewarp &nbsp;</n-badge>, &nbsp;&nbsp;
      <n-badge value="$7" type="warning">Bo Yi-bo &nbsp;</n-badge>, &nbsp;&nbsp;
      <n-badge value="$4" type="warning">wangxu &nbsp;</n-badge>, &nbsp;&nbsp;
      <n-badge value="$1" type="info">Syegen &nbsp;</n-badge>, &nbsp;&nbsp;
      <n-badge value="$3" type="warning">Hikari Leafs &nbsp;</n-badge>,
      &nbsp;&nbsp; <n-badge value="$50" type="error">Elaine &nbsp;</n-badge>,
      &nbsp;&nbsp; <n-badge value="$3" type="warning">Leonard &nbsp;</n-badge>,
      &nbsp;&nbsp; <n-badge value="$2" type="warning">Leon &nbsp;</n-badge>,
      &nbsp;&nbsp; <n-badge value="$7" type="warning">Haser &nbsp;</n-badge>,
      &nbsp;&nbsp;
    </n-card>

    <n-text>
      {{ $t("homepage.credits.projects") }}
    </n-text>
    <n-ul>
      <n-li>数据资源&更新自动化支持 / Data Source & Auto Update Support:
        <n-a href="https://github.com/Kengxxiao/ArknightsGameData">Kengxxiao/ArknightsGameData</n-a>
      </n-li>
      <n-li>
        剧情&干员图片资源 / Stories&Operators' Images Source:
        <n-a href="https://github.com/Aceship/AN-EN-Tags">
          Aceship/AN-EN-Tags</n-a>
        ,
        <n-a href="https://github.com/fexli/ArknightsResource/tree/main">fexli/ArknightsResource</n-a>
      </n-li>
      <n-li>活动封面资源 / Event Banners Source:
        <n-a href="https://prts.wiki/">PRTS Wiki</n-a>
      </n-li>
      <n-li>UI 框架 / UI Framework:
        <n-a href="https://www.naiveui.com/">Naive UI</n-a>
      </n-li>
      <n-li>图标 / Icon: <n-a href="https://www.xicons.org/#/">xicons</n-a>
      </n-li>
      <n-li>表格工具 / Spreadsheet Toolkit:
        <n-a href="https://github.com/SheetJS/sheetjs">Sheetjs</n-a>
      </n-li>
      <n-li>数据可视化 / Data Visualization:
        <n-text delete><n-a href="https://github.com/d3/d3">D3.js</n-a></n-text>&nbsp;
        <n-a href="https://echarts.apache.org/zh/index.html">ECharts</n-a>
      </n-li>
      <n-li>Adobe Fonts 镜像 / Adobe Fonts Mirror:
        <n-a href="https://mirrors.sustech.edu.cn/">南方科技大学开源镜像站 / SUSTech Open Source Mirrors</n-a>
      </n-li>
    </n-ul>
    <n-hr />
    <n-h2 prefix="bar" type="info"> {{ $t("homepage.friendly_link") }}</n-h2>
    <!-- <n-grid x-gap="12" y-gap="12" cols="1 800:2" class="recommend-bar">
       -->
      <VueFlexWaterfall col="2" :break-at="{800:1}" class="recommend-bar">
        <friend-link v-for="item in friend_data" :key="item.id" :data="item" />
      </VueFlexWaterfall>
    <!-- </n-grid> -->
    <n-ul>
      <n-li><n-a href="https://aceship.github.io/AN-EN-Tags/">Arknights Toolbox</n-a>
        by Aceship</n-li>
      <n-li><n-a href="https://theteamfuture.github.io/">Team Future</n-a> a.k.a.
        Future 攻坚组</n-li>
    </n-ul>
  </n-flex>
</template>

<script>
import { ArrowForwardOutlined, InfoOutlined } from "@vicons/material";
import { VueFlexWaterfall } from 'vue-flex-waterfall';
import analysis_png from "./banners/analysis.png";
import maintheme_png from "./banners/maintheme.png";
import op_png from "./banners/op.png";
import changelog from "./changelog.vue";
import friendlink from "./friendlink.vue";

export default {
  data() {
    return {
      eventType: ["maintheme", "sidestory", "intermezzi", "storyset"],
      eventList: window.sessionStorage.getItem("eventList")
        ? JSON.parse(window.sessionStorage.getItem("eventList"))
        : [],
      latestEvents: [],
      analysis_png: analysis_png,
      maintheme_png: maintheme_png,
      op_png: op_png,
      showChangelog: false,
      friend_data: []
    };
  },
  mounted() {
    this.loadData();
    this.loadFriendLinksData();
  },
  components: {
    ArrowForward: ArrowForwardOutlined,
    InfoOutlined: InfoOutlined,
    Changelog: changelog,
    FriendLink: friendlink,
    VueFlexWaterfall
  },
  methods: {
    isFirefox() {
      return navigator.userAgent.toLowerCase().indexOf("firefox") > -1;
    },
    loadData() {
      var data = [];
      for (var etype in this.eventList) {
        for (var idx in this.eventList[etype]) {
          var event = this.eventList[etype][idx];
          var eventid = event.id;
          data.push({
            name: etype == "or" ? event.name + " #" + event.set : event.name,
            id: event.id,
            type: etype,
            time: event.startTime,
          });
        }
      }
      data = data.slice().sort((a, b) => {
        return b.time - a.time;
      });
      this.latestEvents = data.slice(0, 5);
      console.log(this.latestEvents);
    },
    async loadFriendLinksData() {
      var myHeaders = new Headers();
      myHeaders.append("User-Agent", "Apifox/1.0.0 (https://apifox.com)");

      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      let response = await fetch("https://server-cdn.ceobecanteen.top/api/v1/cdn/operate/toolLink/list", requestOptions);
      let data = await response.json();
      console.log(data);
      this.friend_data = data.data;
    },
    getContributor() {
      window.open("https://github.com/050644zf/ArknightsStoryTextReader/graphs/contributors", "_blank");
    }
  },
};
</script>

<style>
.homepage {
  margin: 3% 15%;
  min-width: 800px;
  width: 100%;
}

.recommend-bar {
  max-width: 1200px;
}

.recommend-card {
  height: 100%;
}

@media screen and (max-width: 768px) {
  .homepage {
    margin: 3% 5%;
    min-width: unset;
  }
}
</style>
