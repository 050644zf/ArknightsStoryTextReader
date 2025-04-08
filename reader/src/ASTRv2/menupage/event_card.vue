<template>
  <n-modal class="eventcard font" :show="show" @mask-click="close">
    <n-card
      v-if="show"
      closable
      @close="close"
      :style="{ width: '800px', maxWidth: '90vw' }"
    >
      <template #header>
        <n-flex align="center">
          <n-image
            v-if="edata.entryType == 'MAINLINE'"
            :src="'https://r2.m31ns.top/img/icons/' + edata.id + '.png'"
            class="mainicon"
            style="height: 100px; width: 100px"
            preview-disabled
            fallback-src="https://r2.m31ns.top/img/icons/404.png"
            object-fit="cover"
          />
          <n-image
            v-else
            :src="'https://r2.m31ns.top/img/banners/' + edata.id + '.png'"
            class="mainicon"
            style="height: 80px"
            preview-disabled
            fallback-src="https://r2.m31ns.top/img/banners/404.png"
            object-fit="cover"
          />
          <n-flex vertical>
            <n-h2 strong style="margin: 0px">{{ edata.name }}</n-h2>
            <n-flex>
              <n-statistic>
                    <template #label>
                      <n-icon><AccessTimeFilled /></n-icon>
                      {{ $t('eventpage.startTime') }}
                    </template>
                    <template #default>
                      <n-time :time="edata.startTime" format="yyyy-MM" unix />
                    </template>
                  </n-statistic>
                  <n-statistic>
                    <template #label>
                      <n-icon><ArticleRound /></n-icon>
                      {{ $t('eventpage.length') }}
                    </template>
                    <template #suffix>
                      <n-text
                        style="
                          font-size: medium;
                          color: rgba(255, 255, 255, 0.5);
                        "
                        v-if="server == 'en_US'"
                        >{{ $t('eventpage.wordCount') }}</n-text>
                        <n-text
                        style="
                          font-size: medium;
                          color: rgba(255, 255, 255, 0.5);
                        "
                        v-else
                        >{{ $t('eventpage.charCount') }}</n-text>                        
                    </template>
                    <template #default>
                      <!-- <n-text>{{getEventWordCount(edata.id)}}</n-text> -->
                      <n-number-animation
                        :to="getEventWordCount()"
                        show-separator
                      />
                    </template>
                  </n-statistic>
            </n-flex>
          </n-flex>
        </n-flex>
      </template>

      <n-tabs type="line" animated>
        <n-tab-pane name="stories" :tab="$t('eventpage.menu')">
          <n-flex justify="center" align="center">
            <n-text>{{ $t('eventpage.showIntro') }}</n-text>
            <n-switch v-model:value="showIntro"></n-switch>
          </n-flex>
          <n-divider></n-divider>
          <n-list hoverable clickable>
            <n-scrollbar style="max-height: 70vh">
            <n-list-item
              v-for="(story, sidx) in edata['infoUnlockDatas']"
              :key="sidx"
              @click="warpToStory(story.storyTxt)"
            >
              <n-space vertical>
                <n-space item-style="display:flex;" align="end">
                  <n-h3 style="margin: 0px" prefix="bar">{{
                    story.storyName
                  }}</n-h3>
                  <n-text depth="3"
                    >{{ story.storyCode }} {{ story.avgTag }}</n-text
                  >
                </n-space>
                <n-collapse-transition :show="showIntro">
                  <n-text depth="2">{{ infodata[story["storyTxt"]] }}</n-text>
                </n-collapse-transition>
              </n-space>
              <template #suffix>
                <n-icon size="32" color="#FFF">
                  <ArrowForwardOutlined />
                </n-icon>
              </template>
            </n-list-item>
          </n-scrollbar>
          </n-list>
        </n-tab-pane>
      </n-tabs>
    </n-card>
    <n-space v-else></n-space>
  </n-modal>
</template>

<script>
import {
  ArrowForwardOutlined,
  DownloadOutlined as ExportIcon,
  AccessTimeFilled,
  ArticleRound,
  SortOutlined,
} from "@vicons/material";
import func from "../func.js";
import source from "../source.js";

export default {
  props: {
    edata:Object,
  },
  data() {
    return {
      parseContent: func.parseContent,
      currentLang: func.l,
      infodata: window.sessionStorage.getItem("infodata")
        ? JSON.parse(window.sessionStorage.getItem("infodata"))
        : {},
      wordCount: window.sessionStorage.getItem("wordCountData")
      ? JSON.parse(window.sessionStorage.getItem("wordCountData"))
      : {},
      server: this.$route.params.server,
      showIntro: false,
    };
  },
  computed: {
    show() {
      return this.edata ? true : false;
    },
  },
  methods: {
    close() {
      let server = this.$route.params.server;
      this.$router.push({
        name: "menu",
        params: { server: server, selected: "ms" },
      });    
    },
    warpToStory(storyTxt) {
      this.$router.push({
        path: "/" + this.server + "/content",
        query: { f: storyTxt },
      });
    },
    getEventWordCount() {
      var counter = 0;
      for (var story in this.wordCount[this.edata.id]) {
        counter += this.wordCount[this.edata.id][story];
      }
      return counter;
    },
  },
  components: {
    ArrowForwardOutlined,
    ExportIcon,
    AccessTimeFilled,
    ArticleRound,
    SortOutlined,
  },
};
</script>

<style>
.eventcard .n-card__content {
  background-color: rgba(0, 0, 0, 0.2);
}

.eventcard .n-tabs-nav {
  background: transparent;
}

.eventcard .n-list-item {
  background-color: rgba(0, 0, 0, 0.2)!important;
  transition: all 0.3s ease;
}

.eventcard .n-list-item:hover {
  background-color: rgba(255, 255, 255, 0.1)!important;
}
</style>
