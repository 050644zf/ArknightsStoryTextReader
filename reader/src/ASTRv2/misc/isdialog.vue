<template>
  <n-space v-if="!rec_loaded">
    <n-button
      strong
      secondary
      type="info"
      @click="loadDialog()"
      :loading="loading"
    >
      <template #icon><MsgIcon /></template>
      {{ $t('isrecords.loadDialog') }}
    </n-button>
  </n-space>
  <n-space vertical v-if="rec_loaded">
    <n-button strong secondary type="info" @click="show = !show">
      <template #icon>
        <UnfoldIcon v-if="!show" />
        <FoldIcon v-else />
      </template>
      <n-text v-if="!show">{{ $t('isrecords.unfold') }}</n-text>
      <n-text v-else>{{ $t('isrecords.fold') }}</n-text>
    </n-button>
    <n-collapse-transition v-show="show">
      <n-tabs type="segment">
        <n-tab-pane
          v-for="(rec, rid, ridx) in records"
          :key="ridx"
          :tab="rid"
          :name="rid"
        >
          <n-space vertical v-if="topic.id == 'rogue_1'">
            <div v-for="(line, lidx) in rec" :key="lidx">
              <n-text v-if="line.prop == 'Title'">{{ line.content }}</n-text>
              <n-text v-if="line.prop == 'Div'">{{ line.content }}</n-text>
              <n-space
                v-if="line.prop == 'Dialog'"
                item-style="display:flex;"
                align="center"
                style="flex-wrap: nowrap"
              >
                <img
                  :src="getCharAvatar(line.attributes.head)"
                  style="width: 40px"
                  class="avatar"
                />
                <n-card content-style="padding:10px" class="chatbox">{{
                  line.content
                }}</n-card>
              </n-space>
            </div>
          </n-space>
          <n-space
            vertical
            v-else
          >
            <n-text v-html="rec"></n-text>
          </n-space>
        </n-tab-pane>
      </n-tabs>
    </n-collapse-transition>
  </n-space>
</template>

<script>
import {
  MenuOpenFilled,
  MessageRound,
  UnfoldMoreOutlined,
  UnfoldLessOutlined,
} from "@vicons/material";
import func from "../func.js";
export default {
  data() {
    return {
      records: {},
      rec_loaded: false,
      currentLang: func.l,
      show: false,
      loading: false,
      server: this.$route.params.server,
    };
  },
  props: ["chatid", "adata", "topic"],
  methods: {
    async loadDialog() {
      this.loading = true;
      // console.log(this.topic);
      var chatData = this.adata[this.topic.id]["chat"]["chat"][this.chatid];
      console.log(chatData);
      var i = 1;
      for (var chatItem of chatData.clientChatItemData) {
        var path =
          "https://raw.githubusercontent.com/Kengxxiao/ArknightsGameData/master/" +
          this.server +
          "/gamedata/story/" +
          chatItem.chatStoryId.toLowerCase() +
          ".txt";
        var res = await fetch(path);
        var text = await res.text();
        if (text == "404: Not Found") {
          console.log("Not Found");
          break;
        }
        if (this.topic.id == "rogue_1") {
          this.records["Record_" + i] = this.parseDialog(text);
        } else {
          this.records["Record_" + i] = text.replaceAll("\n", "<br/><br/>");
        }
        i++;
      }
      console.log(this.records);

      this.rec_loaded = true;
      this.show = true;
      this.loading = false;
    },
    parseDialog(text) {
      var dialog = text.split("\n");
      var dialog_parsed = [];
      const prRe = /^(?:\[(\w+)(?:\((.+)\))?\])?(.*)$/m;
      const pmRe = /(\w+)=(\".+?\"|[\d\.]+|\w+),?/m;
      for (var line of dialog) {
        if (line == "") {
          continue;
        }
        var result = line.match(prRe);
        var attrs = result[2];
        var lineData = {
          prop: result[1],
          content: result[3],
          attributes: {},
        };
        if (attrs) {
          for (var attr of attrs.split(",")) {
            var attr_result = attr.match(pmRe);
            //Remove the \" from the string
            attr_result[2] = attr_result[2].replace(/\"/g, "");
            lineData.attributes[attr_result[1]] = attr_result[2];
          }
        }
        dialog_parsed.push(lineData);
      }
      return dialog_parsed;
    },
    getCharAvatar(char_code) {
      //get the avatar of the character
      return (
        "https://raw.githubusercontent.com/Aceship/Arknight-Images/main/avatars/" +
        char_code +
        ".png"
      );
    },
  },
  components: {
    MsgIcon: MessageRound,
    MenuOpen: MenuOpenFilled,
    UnfoldIcon: UnfoldMoreOutlined,
    FoldIcon: UnfoldLessOutlined,
  },
};
</script>

<style>
.avatar {
  background-color: black;
  border: 1px solid #777;
  border-radius: 10%;
  /*Add shadow to southeast*/
  box-shadow: 5 5 5px black;
}
</style>
