<template>
  <n-layout-content class="menupage">
    <n-tabs
      type="line"
      justify-content="space-evenly"
      class="tabs"
      v-model:value="selected"
      animated
      @update:value="
        $router.replace('/' + $route.params.server + '/menu/' + selected)
      "
    >
      <n-tab-pane name="home" role="button" :tab-props="{ role: 'button' }">
        <template v-slot:tab>
          <n-icon>
            <InfoIcon />
          </n-icon>
          <n-text class="titletext">
            &nbsp;{{ $t('menupage.homepage') }}
          </n-text>
        </template>
        <n-space
          vertical
          justify="center"
          item-style="display:flex"
          align="center"
        >
          <Homepage></Homepage>
        </n-space>
      </n-tab-pane>

      <n-tab-pane
        v-for="(item, itemName, iidx) in navi"
        :name="itemName"
        :key="iidx"
        :tab-props="{ role: 'button' }"
      >
        <template v-slot:tab>
          <n-icon>
            <div :class="item.icon"></div>
          </n-icon>
          <n-text class="titletext">
            &nbsp;{{ $t('menupage.'+item.title) }}
          </n-text>
        </template>
        <n-divider title-placement="center" class="eventtypetitle" dashed>
          <n-icon size="32">
            <div :class="item.icon"></div>
          </n-icon>
          <n-text style="font-size: 24px" strong>
            &nbsp;{{ $t('menupage.'+item.title) }}
          </n-text>
        </n-divider>
        <n-space
          vertical
          class="menucontent"
          justify="center"
          item-style="display:flex"
          align="center"
        >
          <Maintheme v-if="itemName == 'maintheme'"></Maintheme>
          <Or v-else-if="itemName == 'or'"></Or>
          <MusicScore v-else-if="itemName == 'ms'"></MusicScore>
          <Events :eventype="itemName" v-else></Events>
        </n-space>
      </n-tab-pane>

      <n-tab-pane name="others" :tab-props="{ role: 'button' }">
        <template v-slot:tab>
          <n-icon>
            <AnalyticsIcon />
          </n-icon>
          <n-text class="titletext">
            &nbsp;{{ $t('menupage.misc') }}
          </n-text>
        </template>
        <Misc class="menucontent"></Misc>
      </n-tab-pane>

      <n-tab-pane name="search" :tab-props="{ role: 'button' }">
        <template v-slot:tab>
          <n-icon>
            <SearchIcon />
          </n-icon>
          <n-text class="titletext">
            &nbsp;{{ $t('menupage.search') }}
          </n-text>
        </template>
        <Search></Search>
      </n-tab-pane>
    </n-tabs>
    <router-view></router-view>
  </n-layout-content>
</template>

<script>
import {
  InfoOutlined,
  SearchOutlined,
  AnalyticsOutlined,
} from "@vicons/material";
import func from "./func.js";
import maintheme from "./menupage/maintheme.vue";
import events from "./menupage/events.vue";
import or from "./menupage/or.vue";
import homepage from "./menupage/homepage.vue";
import search from "./menupage/search.vue";
import misc from "./misc.vue";
import ms from "./menupage/ms.vue";

export default {
  data() {
    return {
      server: this.$route.params.server,
      navi_old: {
        maintheme: { icon: "terminal-maintheme", title: "main" },
        intermezzi: { icon: "terminal-intermezzi", title: "intermezzi" },
        sidestory: { icon: "terminal-sidestory", title: "ss" },
        storyset: { icon: "terminal-storyset", title: "mini" },
        or: { icon: "terminal-record", title: "operator_data" },
      },
      navi_new: {
        ms: { icon: "terminal-maintheme", title: "music_score" },
        or: { icon: "terminal-record", title: "operator_data" },
      },
      

      currentLang: func.l,
      selected: this.$route.params.selected || "home",
    };
  },
  created() {
    this.$watch(
      () => this.$route.params,
      (toParams, previousParams) => {
        if (previousParams.selected != toParams.selected) {
          this.selected = toParams.selected || "home";
        }
      }
    );
  },
  computed: {
    navi() {
      return this.server == "zh_CN"
        ? this.navi_new
        : this.navi_old;
    },
  },
  components: {
    InfoIcon: InfoOutlined,
    SearchIcon: SearchOutlined,
    AnalyticsIcon: AnalyticsOutlined,
    Maintheme: maintheme,
    Events: events,
    Or: or,
    Homepage: homepage,
    Search: search,
    Misc: misc,
    MusicScore: ms,
  },
};
</script>

<style>
.menupage {
  min-height: 600px;
}

.menupage > .n-layout-scroll-container {
  overflow-y: hidden;
}

.n-tabs-nav {
  background: #3b3830;
  /* --n-bar-color: #ffcd43;
    --n-tab-text-color-active: #ffcd43;
    --n-tab-text-color-hover: #ffcd43; */
}

.menucontent {
  /* margin: 0% 0% 2% 15%; */
}

.eventtypetitle .n-divider__line {
  background-color: #7f7f7f !important;
}
@media (max-width: 1000px) {
  .titletext {
    display: none;
  }
}
</style>
