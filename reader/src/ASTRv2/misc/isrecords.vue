<template>
  <n-layout-content>
    <n-space vertical class="isrecords">
      <n-breadcrumb class="breadcrumb">
        <n-breadcrumb-item
          @click="$router.push('/' + $route.params.server + '/menu')"
        >
          <n-icon><MenuIcon /></n-icon>
          {{ i18n.menu[currentLang] }}
        </n-breadcrumb-item>
        <n-breadcrumb-item
          >月度小队记录 | Monthly Team Records</n-breadcrumb-item
        >
      </n-breadcrumb>
      <n-collapse>
        <n-collapse-item v-for="(topic, tpidx) in topics" :key="tpidx">
          <template #header>
            <n-h2>{{ topic.name }}</n-h2>
          </template>
          <n-space vertical>
            <n-card
              v-for="(team, tid, tidx) in idata[topic.id]"
              :key="tidx"
              :header-style="{ 'border-top': '5px solid #' + team.teamColor }"
            >
              <template #header>
                <n-space
                  justify="space-between"
                  item-style="display:flex"
                  align="center"
                >
                  <n-h2 style="margin: 0px"
                    >{{ team.teamYear }}-{{ team.teamMonth }}
                    {{ team.teamName }}</n-h2
                  >
                  <n-space>
                    <img
                      v-for="(charId, cidx) in team.teamChars"
                      :key="cidx"
                      :src="getCharAvatar(charId)"
                      style="width: 48px"
                    />
                  </n-space>
                </n-space>
              </template>
              <n-text>{{ team.teamDes }}</n-text>
              <template #action>
                <IsDialog
                  :chatid="team.chatId"
                  :adata="archiveCompData"
                  :topic="topic"
                />
              </template>
            </n-card>
          </n-space>
        </n-collapse-item>
      </n-collapse>
    </n-space>
  </n-layout-content>
</template>

<script>
import { MenuOpenFilled, MessageRound } from "@vicons/material";
import { useLoadingBar, useDialog } from "naive-ui";
import i18n from "../i18n.json";
import func from "../func.js";
import source from "../source.js";
import isdialog from "./isdialog.vue";
export default {
  data() {
    return {
      idata: {},
      archiveCompData: {},
      topics: [],
      idata_loaded: false,
      loadingbar: useLoadingBar(),
      server: this.$route.params.server,
      i18n: i18n,
      currentLang: func.l,
    };
  },
  created() {
    this.loadingbar.start();
    this.loadIsData();
  },
  methods: {
    async loadIsData() {
      try {
        let idata = await fetch(
          "https://raw.githubusercontent.com/Kengxxiao/ArknightsGameData/master/" +
            this.server +
            "/gamedata/excel/roguelike_topic_table.json"
        ).then((res) => res.json());
        for (var topic in idata.topics) {
          this.topics.push({
            id: topic,
            name: idata.topics[topic].name,
          });
          this.idata[topic] = idata.details[topic].monthSquad;
          this.archiveCompData[topic] = idata.details[topic].archiveComp;
        }
        // console.log(this.archiveCompData);
        this.idata_loaded = true;
        this.loadingbar.finish();
      } catch (e) {
        console.log(e);
      }
    },
    getCharAvatar(char_code) {
      //get the avatar of the character
      return source.getAvatarUrl('fexli', char_code);
    },
  },
  components: {
    MenuIcon: MenuOpenFilled,
    MsgIcon: MessageRound,
    IsDialog: isdialog,
  },
};
</script>

<style>
.isrecords {
  margin: 2% 15%;
}
</style>
