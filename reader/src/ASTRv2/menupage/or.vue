<template>
  <n-spin v-if="!loaded" size="large" />
  <n-flex v-else class="or" justify="center" vertical align="center">
    <n-flex vertical justify="center" align="center">
      <n-flex align="center">
        <n-radio-group v-model:value="filters.profession">
          <n-radio-button value="ALL"> All </n-radio-button>

          <n-radio-button
            v-for="(prof, pidx) in professions"
            :key="prof"
            :value="prof"
          >
            <n-image
              :src="
                'https://raw.githubusercontent.com/Aceship/Arknight-Images/main/classes/class_' +
                professions_aceship[pidx].toLowerCase() +
                '.png'
              "
              width="32"
              preview-disabled
            />
          </n-radio-button>
        </n-radio-group>
      </n-flex>
      <n-rate
        clearable
        :count="6"
        v-model:value="filters.rarity"
        :color="rarity_colors[filters.rarity]"
      />
    </n-flex>
    <n-divider />
    <n-flex class="oplist" justify="center" align="top">
      <TransitionGroup name="list">
        <div v-for="(cdata, cidx) in getCharList" :key="cdata.charID">
          <n-card
            class="optile"
            content-style="padding: 0px;"
            style="display: flex; justify: center; align-items: center"
            hoverable
            @click="showCard(cdata.charID)"
          >
            <template #cover>
              <n-image
                :src="getAvatarUrl(cdata.charID)"
                style="height: 72px"
                preview-disabled
              />
            </template>
            <n-ellipsis
              class="opcard-name"
              :tooltip="{ placement: 'bottom' }"
              >{{ cdata.name }}</n-ellipsis
            >
          </n-card>
        </div>
      </TransitionGroup>
    </n-flex>

    <Opcard :cdata="getSelectedCdata"></Opcard>
  </n-flex>
</template>

<script>
import {
  ArrowForwardOutlined,
  OpenInNewOutlined,
  AccessTimeFilled,
  ArticleRound,
  SortOutlined,
} from "@vicons/material";
import func from "../func";
import source from "../source";
import openInNew from "../components/openInNewBtn.vue";
import opcard from "../components/opcard.vue";
import { filter } from "lodash-es";
export default {
  data() {
    return {
      eventype: "or",
      mdata: window.sessionStorage.getItem("menudata")
        ? JSON.parse(window.sessionStorage.getItem("menudata"))
        : {},
      eventList: window.sessionStorage.getItem("eventList")
        ? JSON.parse(window.sessionStorage.getItem("eventList"))
        : [],
      wordCount: window.sessionStorage.getItem("wordCountData")
        ? JSON.parse(window.sessionStorage.getItem("wordCountData"))
        : {},
      charinfo: {},
      loaded: false,
      server: this.$route.params.server,
      currentLang: func.l,
      professions: func.professions,
      professions_aceship: func.professions_aceship,
      rarity_colors: func.rarity_colors,
      unit: this.$route.params.server == "en_US" ? "wordCount" : "charCount",
      sortType: "ascend",
      filters: {
        profession: "ALL",
        rarity: null,
        hasRecord: false,
        hasModule: false,
      },
    };
  },
  computed: {
    getCharList() {
      let charlist = [];
      for (var char in this.charinfo) {
        var cdata = this.charinfo[char];
        if (cdata.profession == "NONE" || char.split("_")[0] == "npc") continue;
        if (
          this.filters.profession != "ALL" &&
          this.filters.profession != cdata.profession
        )
          continue;
        if (
          this.filters.rarity &&
          "TIER_" + this.filters.rarity != cdata.rarity
        )
          continue;
        if (this.filters.hasRecord && cdata.records.length < 1) continue;
        if (this.filters.hasModule && cdata.module.length < 1) continue;
        charlist.push(this.charinfo[char]);
      }
      return charlist;
    },
    showOpcard() {
      return this.$route.params.cid ? true : false;
    },
    getSelectedCdata() {
      if (this.$route.params.cid) {
        console.log(this.charinfo[this.$route.params.cid]);
        return this.charinfo[this.$route.params.cid];
      }
      return null;
    },
  },
  created() {
    this.loaded = false;
    this.loadCharInfo();
  },
  components: {
    OpenInNew: openInNew,
    Opcard: opcard,
    AccessTimeFilled,
    ArticleRound,
    SortOutlined,
  },
  methods: {
    async loadCharInfo() {
      try {
        let cdata = await source.getData(this.server,'/charinfo.json').then(
          (res) => {
            return res.json();
          }
        );
        this.charinfo = cdata;
        this.loaded = true;
      } catch (e) {
        console.log(e);
      }
    },
    getEventWordCount(eventid) {
      var counter = 0;
      for (var story in this.wordCount[eventid]) {
        counter += this.wordCount[eventid][story];
      }
      return counter;
    },
    sortByTime(a, b) {
      return a.startTime - b.startTime;
    },
    sortEvent() {
      let events = this.eventList[this.eventype].slice();
      if (this.sortType == "ascend") {
        events.sort(this.sortByTime);
      } else {
        events.sort(this.sortByTime).reverse();
      }
      this.eventList[this.eventype] = events;
    },
    showCard(charID) {
      this.$router.push({
        name: "opcard",
        params: { server: this.server, selected: "or", cid: charID },
      });
    },
    getAvatarUrl(char_code) {
      if (char_code == "char_1001_amiya2" || char_code == "char_1037_amiya3")
        return source.getAvatarUrl(func.imageRepo, char_code + "_2");
      return source.getAvatarUrl(func.imageRepo, char_code);
    },
  },
};
</script>

<style>
.events .list {
  width: 80vw;
  max-width: 1200px;
}
.list-move, /* 对移动中的元素应用的过渡 */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* 确保将离开的元素从布局流中删除
  以便能够正确地计算移动的动画。 */
.list-leave-active {
  position: absolute;
}

.oplist {
  max-width: 1200px;
  /* transition: flex-basis 500ms ease-in-out; */
}

.optile {
  width: 72px;
}

.optile .n-card-cover {
  display: flex;
  justify-content: center;
  align-items: center;
}

.optile:hover {
  box-shadow: 0px 0px 10px rgba(255, 255, 255, 0.5);
}

.optile .opcard-name {
  max-width: 72px;
}

@media (max-width: 700px) {
  .eventstat {
    display: none !important;
  }
  .eventtitle {
    flex-direction: column !important;
  }
  .eventwarp {
    display: none !important;
  }
}
</style>
