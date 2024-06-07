<template>
  <n-layout-header>
    <n-space
      item-style="display: flex; "
      justify="space-between"
      align="center"
      class="header"
      style="flex-warp: nowarp"
    >
      <n-space item-style="display: flex;" align="center">
        <router-link to="/" #="{ navigate, href }" custom>
          <n-a :href="href" @click="navigate">
            <n-image
              :src="favicon"
              style="width: 40px; height: 40px"
              preview-disabled
            />
          </n-a>
        </router-link>

        <n-space item-style="display: flex;" align="center">
          <!-- <n-h2 style="margin: 0px;padding:5px;" strong class="astrtitle">
                        Arknights Story Text Reader
                    </n-h2> -->
          <router-link to="/" #="{ navigate, href }" custom>
            <n-a :href="href" @click="navigate">
              <n-image
                :src="ASTReader"
                style="height: 30px"
                preview-disabled
                class="astrtitle"
              />
            </n-a>
          </router-link>
          <n-text depth="3" class="astrversion">
            Arknights Story Text Reader <br />
            Version 1.7
          </n-text>
        </n-space>
      </n-space>

      <n-space
        justify="space-around"
        item-style="display: flex;"
        align="center"
      >
        <Warp v-if="loaded" />
        <n-tooltip trigger="hover" v-if="server != UILang">
          <template #trigger>
            <n-button quaternary @click="openInGTL()">
              <n-icon size="24">
                <TranslateIcon />
              </n-icon>
            </n-button>
          </template>
          {{ i18n.openInGoogleTL[UILang] }}
        </n-tooltip>

        <n-dropdown
          :options="serverOpts"
          @select="pushServer"
          class="serverSelect"
          role="button"
          :node-props="
            () => {
              return { role: 'button' };
            }
          "
        >
          <n-button text>
            <template #icon>
              <n-icon>
                <LangIcon />
              </n-icon>
            </template>
            <n-text class="servername">{{
              i18n.server[$route.params.server]
            }}</n-text>
            <n-icon size="24">
              <ArrowDropDown />
            </n-icon>
          </n-button>
        </n-dropdown>

        <Settings></Settings>
      </n-space>
    </n-space>
  </n-layout-header>
</template>

<script>
import {
  LanguageRound,
  ArrowDropDownSharp,
  SettingsOutlined,
  TranslateOutlined,
} from "@vicons/material";
import i18n from "./i18n.json";
import func from "./func.js";
import settings from "./settings.vue";
import warp from "./warp.vue";

import favicon from './assets/favicon.png'
import ASTReader from './assets/ASTReader.png'

export default {
  data() {
    return {
      serverOpts: this.getServerOpts(),
      i18n: i18n,
      showsettings: false,
      server: this.$route.params.server,
      UILang: func.l,
      favicon: favicon,
      ASTReader: ASTReader,
    };
  },
  props: ["loaded"],
  created() {
    this.$watch(
      () => this.$route.params,
      (toParams, previousParams) => {
        if (previousParams.server != toParams.server) {
          this.serverOpts = this.getServerOpts();
        }
      }
    );
  },
  components: {
    LangIcon: LanguageRound,
    ArrowDropDown: ArrowDropDownSharp,
    SettingsIcon: SettingsOutlined,
    TranslateIcon: TranslateOutlined,
    Settings: settings,
    Warp: warp,
  },
  emits: ["pushServer"],
  methods: {
    getServerOpts() {
      var opts = [];
      for (var s in i18n.server) {
        opts.push({
          label: i18n.server[s],
          key: s,
          disabled: s == this.$route.params.server,
        });
      }
      console.log(this.$route);
      return opts;
    },
    async pushServer(server) {
      this.$emit("pushServer", { server: server });
    },
    openInGTL() {
      var target_lang = this.UILang.replace(/_/g, "-");
      var server_lang = this.$route.params.server.replace(/_/g, "-");
      if (target_lang == "zh_CN") target_lang = "en";
      var url = `https://astr-pages-dev.translate.goog/?_x_tr_sl=${server_lang}&_x_tr_tl=${target_lang}&_x_tr_hl=${server_lang}&_x_tr_pto=wapp&_x_tr_hist=true#${this.$route.fullPath}`;
      window.open(url, "_blank");
    },
  },
};
</script>

<style>
.header {
  background-color: #615c4f;
  font-weight: bold;
  padding: 0px 20px;
}
.SettingsBtn {
  font-size: large;
}
.astrtitle {
  font-family: v-mono, SFMono-Regular, Menlo, Consolas, Courier, monospace;
  font-weight: bold;
}
.cls-1 {
  fill: #f3f0e7;
}

@media (max-width: 1000px) {
  .astrversion {
    display: none;
  }
}

@media (max-width: 820px) {
  .astrtitle {
    display: none;
  }
}

@media (max-width: 500px) {
  .servername {
    display: none;
  }
}
</style>
