<template>
  <n-layout-content class="eventpage">
    <n-breadcrumb class="breadcrumb">
      <n-breadcrumb-item
        @click="$router.push('/' + $route.params.server + '/menu')"
      >
        <n-icon>
          <MenuIcon />
        </n-icon>
        {{ $t('eventpage.menu') }}
      </n-breadcrumb-item>
      <n-breadcrumb-item>{{ mdata[eventid]["name"] }}</n-breadcrumb-item>
    </n-breadcrumb>

    <n-space
      vertical
      justify="center"
      item-style="display:flex;"
      align="center"
    >
      <n-space vertical class="content">
        <n-space item-style="display:flex;" align="center">
          <n-space>
            <n-text>{{ $t('eventpage.showIntro') }}</n-text>
            <n-switch v-model:value="showIntro"></n-switch>
          </n-space>
          <n-divider vertical />
          <n-space>
            <n-button strong secondary type="primary" @click="exportAll">
              <template #icon>
                <n-icon>
                  <ExportIcon />
                </n-icon>
              </template>

              {{ $t('eventpage.export2excel') }}
            </n-button>
            <OpenInGTL v-if="server == 'zh_CN'" />
          </n-space>
        </n-space>
        <n-alert type="info" v-if="eventid == 'act17side'">
          <n-space
            justify="space-between"
            align="center"
            item-style="display:flex;"
          >
            <n-text>
              {{ $t('eventpage.act17side_log') }}
            </n-text>
            <n-button
              text
              @click="
                $router.push('/' + $route.params.server + '/act17side_log')
              "
            >
              <n-icon size="32">
                <ForwardIcon />
              </n-icon>
            </n-button>
          </n-space>
        </n-alert>
        <n-alert type="info" v-if="eventid == 'act25side'">
          <n-space
            justify="space-between"
            align="center"
            item-style="display:flex;"
          >
            <n-text>
              {{ $t('eventpage.act25side_log') }}
            </n-text>
            <n-button
              text
              @click="
                $router.push('/' + $route.params.server + '/act25side_log')
              "
            >
              <n-icon size="32">
                <ForwardIcon />
              </n-icon>
            </n-button>
          </n-space>
        </n-alert>
        <n-alert type="info" v-if="eventid == 'act13side'">
          <n-space
            justify="space-between"
            align="center"
            item-style="display:flex;"
          >
            <n-text>
              {{ $t('eventpage.extra') }}
            </n-text>
            <n-button
              text
              @click="$router.push('/' + $route.params.server + '/extra')"
            >
              <n-icon size="32">
                <ForwardIcon />
              </n-icon>
            </n-button>
          </n-space>
        </n-alert>
        <n-list hoverable clickable>
          <n-list-item
            v-for="(story, sidx) in mdata[eventid]['infoUnlockDatas']"
            :key="sidx"
          >
            <n-space
              vertical
              @click="
                $router.push({
                  path: '/' + $route.params.server + '/content',
                  query: { f: story['storyTxt'] },
                })
              "
              role="link"
            >
              <n-space item-style="display:flex;" align="end">
                <n-h3 style="margin: 0px" prefix="bar">{{
                  story.storyName
                }}</n-h3>
                <n-text depth="3"
                  >{{ story.storyCode }} {{ story.avgTag }}</n-text
                >
              </n-space>
              <n-collapse-transition :show="showIntro">
                <n-text depth="2" v-html="parseContent(infodata[story['storyTxt']])">
                </n-text>
              </n-collapse-transition>
            </n-space>
            <template #suffix>
              <OpenInNew
                :link="{
                  path: '/' + $route.params.server + '/content',
                  query: { f: story['storyTxt'] },
                }"
              />
            </template>
          </n-list-item>
        </n-list>
      </n-space>
    </n-space>
  </n-layout-content>
</template>

<script>
import {
  MenuOpenFilled,
  ArrowForwardOutlined,
  DownloadOutlined,
  OpenInNewOutlined,
} from "@vicons/material";
import openInNew from "./components/openInNewBtn.vue";
import openInGTL from "./components/openInGTL.vue";
import func from "./func.js";
export default {
  data() {
    return {
      eventid: this.$route.params.event,
      mdata: window.sessionStorage.getItem("menudata")
        ? JSON.parse(window.sessionStorage.getItem("menudata"))
        : {},
      infodata: window.sessionStorage.getItem("infodata")
        ? JSON.parse(window.sessionStorage.getItem("infodata"))
        : {},
      showIntro: false,
      server: this.$route.params.server,
    };
  },
  metaInfo() {
    //using event name as title
    return {
      title:
        this.mdata[this.eventid]["name"] + " | Arknights Story Text Reader",
      meta: [
        {
          vmid: "og:title",
          property: "og:title",
          content:
            this.mdata[this.eventid]["name"] + " | Arknights Story Text Reader",
        },
        {
          vmid: "og:image",
          propoty: "og:image",
          content: "/src/assets/favicon.png",
        },
      ],
    };
  },
  created() {
    //Watch if the server data is loaded, if not reload the page
    this.$watch(
      () => this.mdata,
      (toParams, previousParams) => {
        if (previousParams != toParams) {
          window.location.reload();
        }
      }
    );
  },
  components: {
    MenuIcon: MenuOpenFilled,
    ForwardIcon: OpenInNewOutlined,
    ExportIcon: DownloadOutlined,
    OpenInNew: openInNew,
    OpenInGTL: openInGTL,
  },
  methods: {
    exportAll() {
      let data = this.mdata[this.eventid]["infoUnlockDatas"];
      let eventname = this.mdata[this.eventid].name;
      let eventid = this.eventid;
      window.localStorage.setItem("filename", eventid + "_" + eventname);
      let server = this.server;
      let exportList = [];
      data.forEach((story) => {
        exportList.push({
          key: story.storyTxt,
          server: server,
          path: story.storyTxt,
          storyCode: story.storyCode,
          avgTag: story.avgTag,
          storyName: story.storyName,
        });
      });
      window.localStorage.setItem("exportList", JSON.stringify(exportList));
      this.$router.push({ path: "/" + this.server + "/export" });
    },
    parseContent(content) {
      return func.parseContent(content);
    },
  },
};
</script>

<style>
.eventpage {
  display: flex;
}
.eventpage .breadcrumb {
  margin: 0px 0px 16px 0px;
  background: #3b3830;
  padding: 8px 50px;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.2);
  /* border-radius: 4px; */
  width: 100vw;
}

.eventpage .content {
  width: 80vw;
  max-width: 1000px;
}
</style>
