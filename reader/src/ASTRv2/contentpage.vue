<template>
  <n-layout-content
    class="contentpage"
    :style="{ 'font-size': fontsize + 'px' }"
    ref="contentpage"
  >
    <n-skeleton v-if="loading" class="breadcrumb"></n-skeleton>

    <n-space v-else>
      <!-- <n-affix
            :top="0"
            :trigger-top="0"> -->
      <n-breadcrumb class="breadcrumb">
        <n-breadcrumb-item
          @click="$router.push('/' + $route.params.server + '/menu')"
          role="link"
        >
          <n-icon><MenuIcon /></n-icon>
          {{ $t('eventpage.menu') }}
        </n-breadcrumb-item>
        <n-breadcrumb-item
          @click="
            $router.push('/' + $route.params.server + '/event/' + data.eventid)
          "
          v-if="data.eventid"
          role="link"
        >
          {{ data.eventName }}
        </n-breadcrumb-item>
        <n-breadcrumb-item
          @click="$router.push('/' + $route.params.server + '/extra')"
          v-else
          role="link"
        >
          {{ $t('contentpage.extra') }}
        </n-breadcrumb-item>
        <br class="breadcrumbbreak" />
        <n-breadcrumb-item role="button">
          <n-popselect
            :options="storyOpts"
            v-model:value="path"
            scrollable
            :node-props="
              () => {
                return { role: 'link' };
              }
            "
          >
            <n-text type="info" v-if="data.eventid">
              {{ data.storyCode }} {{ data.storyName }} - {{ data.avgTag }}
              <n-icon>
                <ArrowDropDown />
              </n-icon>
            </n-text>
            <n-text type="info" v-else>
              {{ data.storyName }}
            </n-text>
          </n-popselect>
        </n-breadcrumb-item>
      </n-breadcrumb>
      <!-- </n-affix> -->
      <!-- <n-divider vertical />
            <n-button-group>
                <n-button secondary round type="info" v-show="storyIdx != 0" @click="paging(-1)">
                    <n-icon size="24">
                        <LastStory/>
                    </n-icon>
                </n-button>
                <n-button secondary round type="info" v-show="storyIdx!=storyOpts.length-1" @click="paging(1)">
                    <n-icon size="24">
                        <NextStory/>
                    </n-icon>
                </n-button>
            </n-button-group> -->
    </n-space>

    <n-space veritical class="content" justify="center" warp="false">
      <!-- <n-h4 prefix="bar" type="warning" v-if="!data.OPTIONTRACE && !loading">
                {{$t('contentpage.optionTraceDisabled')}}
            </n-h4> -->
      <n-skeleton v-if="loading" :repeat="5"></n-skeleton>
      <div v-else class="lines">
        <!-- <OpenInGTL v-if="server=='zh_CN'"/> -->
        <Paging
          :storyIdx="storyIdx"
          :storyOpts="storyOpts"
          v-if="!loading"
        ></Paging>
        <div
          v-for="(line, lidx) in data.storyList"
          :key="line.id"
          class="line"
          :id="'line' + line.id"
          :style="{ 'margin-bottom': margin + 'px' }"
        >
          <Nameline
            v-if="strMatch(line.prop, 'name')"
            :inputline="line"
            :lidx="lidx"
            :story="data.storyList"
          ></Nameline>
          <Nameline
            v-if="strMatch(line.prop, 'multiline')"
            :inputline="line"
            :lidx="lidx"
            :story="data.storyList"
          ></Nameline>
          <Subtitle
            v-if="
              strMatch(line.prop, 'subtitle') || strMatch(line.prop, 'sticker')
            "
            :inputline="line"
          ></Subtitle>
          <Decision
            v-if="strMatch(line.prop, 'decision')"
            :inputline="line"
          ></Decision>
          <Predicate
            v-if="strMatch(line.prop, 'predicate')"
            :inputline="line"
          ></Predicate>
          <Delay
            v-if="strMatch(line.prop, 'delay') && showDelay == 'y'"
            :inputline="line"
          ></Delay>
          <Showimg
            v-if="strMatch(line.prop, 'image') && line.attributes.image"
            :inputline="line"
          ></Showimg>
          <Showimg
            v-if="
              strMatch(line.prop, 'background') &&
              line.attributes.image &&
              bgMode != 'off'
            "
            :inputline="line"
            background
          ></Showimg>
          <Animtext
            v-if="strMatch(line.prop, 'animtext')"
            :inputline="line"
          ></Animtext>
          <div class="blank" v-if="strMatch(line.prop, '__blank')" style="height: 15px"></div>

          <!-- <div style="clear: both;"></div> -->
        </div>
        <Paging
          :storyIdx="storyIdx"
          :storyOpts="storyOpts"
          v-if="!loading"
        ></Paging>
      </div>
    </n-space>
  </n-layout-content>
</template>

<script>
import menuVue from "./menu.vue";
import func from "./func.js";
import nameline from "./content/nameline.vue";
import subtitle from "./content/subtitle.vue";
import decision from "./content/decision.vue";
import predicate from "./content/predicate.vue";
import delay from "./content/delay.vue";
import img from "./content/img.vue";
import animtext from "./content/animtext.vue";

import paging from "./content/paging.vue";

import openInGTL from "./components/openInGTL.vue";

import {
  MenuOpenFilled,
  ArrowDropDownSharp,
  ChevronLeftOutlined,
  ChevronRightOutlined,
} from "@vicons/material";
import { useLoadingBar, useDialog, useMessage, messageDark } from "naive-ui";
import { defineComponent, ref } from "vue";

export default {
  data() {
    return {
      path: this.$route.query.f,
      data: {},
      eventid: "",
      server: this.$route.params.server,
      showDelay: func.showDelay,
      bgMode: func.bgMode,
      fontsize: func.fontsize,
      margin: func.margin,
      loading: true,
      loadingbar: useLoadingBar(),
      dialog: useDialog(),
      message: useMessage(),
      mdata: window.sessionStorage.getItem("menudata")
        ? JSON.parse(window.sessionStorage.getItem("menudata"))
        : {},
      storyOpts: [],
      storyIdx: -1,
      storyCount: 0,
      contentpageRef: (ref < HTMLElement) | (null > null),
    };
  },
  metaInfo() {
    return {
      title: this.data.storyCode
        ? `${this.data.storyCode} ${this.data.storyName} - ${this.data.avgTag} | Arknights Story Text Reader`
        : `${this.data.storyName} - ${this.data.avgTag} | Arknights Story Text Reader`,
    };
  },
  created() {
    this.loadingbar.start();
    this.getStoryData();
    this.$watch(
      () => this.$route.query,
      (toQuery, previousQuery) => {
        if (previousQuery.f != toQuery.f && toQuery.f) {
          this.loadingbar.start();
          this.path = toQuery.f;
          this.getStoryData();
        }
      }
    );
    this.$watch(
      () => this.path,
      (toPath, previousPath) => {
        //console.log(toPath, previousPath);
        if (previousPath != toPath) {
          this.$router.push({
            path: "/" + this.server + "/content",
            query: { f: toPath },
          });
        }
      }
    );
  },
  components: {
    Menu: menuVue,
    Nameline: nameline,
    Subtitle: subtitle,
    Decision: decision,
    Predicate: predicate,
    Delay: delay,
    Showimg: img,
    Animtext: animtext,
    Paging: paging,
    OpenInGTL: openInGTL,
    MenuIcon: MenuOpenFilled,
    ArrowDropDown: ArrowDropDownSharp,
    LastStory: ChevronLeftOutlined,
    NextStory: ChevronRightOutlined,
  },
  methods: {
    async getStoryData() {
      this.loading = true;
      // using await
      try{
        let res = await fetch(
          "https://raw.githubusercontent.com/050644zf/ArknightsStoryJson/main/" +
            this.server +
            "/gamedata/story/" +
            this.path +
            ".json"
        );
        let s = await res.json();
        let altserver = func.alt;
        if (altserver != "none"){
        try{
          
          let res2 = await fetch(
            "https://raw.githubusercontent.com/050644zf/ArknightsStoryJson/main/" +
              altserver +
              "/gamedata/story/" +
              this.path +
              ".json"
          );
          this.altserverdata = await res2.json();


          // merge the alt server data into the main data in data.storyList
          let newStoryList = [];
          for (let i in s.storyList.length > this.altserverdata.storyList.length ? s.storyList : this.altserverdata.storyList) {
            if (s.storyList[i]) {
              newStoryList.push(s.storyList[i]);
            }
            // merge if prop is 'nameline' or 'subtitle'
            if (this.altserverdata.storyList[i]) {
              const prop = this.altserverdata.storyList[i].prop;
              if (this.strMatch(prop, 'name') || this.strMatch(prop, 'subtitle')|| this.strMatch(prop, 'sticker') || this.strMatch(prop, 'multiline') || this.strMatch(prop, 'decision') || this.strMatch(prop, 'animtext')) {
                newStoryList.push(this.altserverdata.storyList[i]);
                newStoryList.push({ id: -1, prop: '__blank' });
              }
            }

          }
          let newStoryList2 = newStoryList.filter(e => e );
          s.storyList = newStoryList2;
          } catch (e) {
            this.message.error(this.$t("contentpage.altLangLoadFail"));
          }
        }
        this.data = s;

        this.eventid = s.eventid;
        this.storyOpts = this.getStoryOpts();
        this.loading = false;
        this.loadingbar.finish();
        this.scrollToHash();
      } catch (e) {
        this.loadingbar.error();
        console.log(e);
        this.dialog.error({
          title: this.$t("contentpage.dataLoadFail"),
          content:
            this.$t("contentpage.dataLoadFailDesc"),
        });
      }

    },
    getStoryOpts() {
      var opts = [];
      var sidx = 0;
      try {
        this.storyCount = this.mdata[this.eventid]["infoUnlockDatas"].length;
        console.log(this.storyCount);
        for (var story of this.mdata[this.eventid]["infoUnlockDatas"]) {
          opts.push({
            value: story.storyTxt,
            label: story.storyCode
              ? `${story.storyCode} ${story.storyName} - ${story.avgTag}`
              : `${story.storyName} - ${story.avgTag}`,
          });
          if (story.storyTxt == this.path) {
            this.storyIdx = sidx;
          }
          sidx++;
        }
      } catch (e) {
        console.log(e);
      }
      return opts;
    },
    pushStory(storyTxt) {
      this.$router.push({
        path: "/" + this.server + "/content",
        query: { f: storyTxt },
      });
    },
    paging(inc) {
      //console.log(this.storyIdx, this.storyOpts.length);
      this.pushStory(this.storyOpts[this.storyIdx + inc].value);
    },
    calcjustify() {
      if (!this.storyIdx) {
        return "end";
      } else if (this.storyIdx == this.storyOpts.length - 1) {
        return "start";
      } else {
        return "space-between";
      }
    },
    strMatch(str1, str2) {
      return str1.toLowerCase() == str2.toLowerCase();
    },
    scrollToHash() {
      if (this.$route.hash) {
        var hash = this.$route.hash;
        // remove the # character
        hash = hash.replace("#", "");
        setTimeout(() => {
          var el = document.getElementById(hash);
          // add highlight class to the element
          el.classList.add("highlight");
          if (el) {
            // scroll into center
            el.scrollIntoView({
              behavior: "smooth",
              block: "center",
              inline: "nearest",
            });
          }
        }, 1000);
      }
    },
  },
};
</script>

<style>
.contentpage {
  padding-bottom: 50px;
}

.contentpage > .n-layout-scroll-container {
  overflow-y: hidden;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: center;
}

.contentpage .content {
  width: 80vw;
  max-width: 1200px;
  /* display: flex;
    justify-content: flex-end; */
}

.contentpage .breadcrumb {
  margin: 0px -64px 16px 0px !important;
  background: #3b3830;
  padding: 5px 50px;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.2);
  /* border-radius: 4px; */
  width: 100vw;
}
.breadcrumbbreak {
  display: none;
}

.contentpage .highlight {
  background-color: rgb(85, 85, 0);
}

@media (max-width: 700px) {
  .breadcrumbbreak {
    display: block;
  }
}
</style>
