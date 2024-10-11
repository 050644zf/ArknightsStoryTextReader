<template>
  <n-button text class="SettingsBtn" @click="showsettings = true">
    <n-icon size="24">
      <SettingsIcon />
    </n-icon>
  </n-button>
  <n-drawer v-model:show="showsettings" placement="top" height="700">
    <n-drawer-content :closable="inited">
      <template #header>
        <n-space item-style="display:flex;" align="center">
          <n-icon>
            <SettingsIcon />
          </n-icon>
          <span>{{ $t('settings.setting') }}</span>
        </n-space>
      </template>
      <n-space vertical item-style="display: flex" justify="space-between">
        <n-space item-style="display:flex;" align="center">
          <n-icon>
            <LangIcon />
          </n-icon>
          {{ $t('settings.currentLang') }}:
          <n-radio-group v-model:value="currentLang">
            <n-radio-button v-for="lang in langOpts" :key="lang" :value="lang">
              {{ lang }}
            </n-radio-button>
          </n-radio-group>
        </n-space>

        <n-space vertical item-style="display: flex" justify="space-between">
        <n-space item-style="display:flex;" align="center">
          <n-icon>
            <LangIcon />
          </n-icon>
          {{ $t('settings.altLang') }}:
          <n-radio-group v-model:value="altLang">
            <n-radio-button :key="NULL" value="none">
              {{ $t('settings.none') }}
            </n-radio-button>
            <n-radio-button v-for="lang in langOpts" :key="lang" :value="lang">
              {{ lang }}
            </n-radio-button>
          </n-radio-group>
        </n-space>
        </n-space>

        <n-space item-style="display:flex;" align="center">
          <n-icon>
            <MirrorIcon />
          </n-icon>
          {{ $t('settings.mirror') }}:
          <n-switch
            v-model:value="mirror"
            checked-value="mirror"
            unchecked-value="origin"
          />
        </n-space>

        <n-space item-style="display:flex;" align="center">
          <n-icon>
            <DrNameIcon />
          </n-icon>
          {{ $t('settings.dr') }}:
          <n-space item-style="display:flex;" align="center" justify="end">
            Dr.
            <n-input
              v-model:value="doctor"
              type="text"
              placeholder="{@nickname}"
            />
          </n-space>
        </n-space>
        <n-space item-style="display:flex;" align="center">
          <n-icon>
            <BlankIcon />
          </n-icon>
          {{ $t('settings.showDelay') }}:
          <n-switch
            v-model:value="showDelay"
            checked-value="y"
            unchecked-value="n"
          />
        </n-space>

        <n-space item-style="display:flex;" align="center">
          <n-icon>
            <BGIcon />
          </n-icon>
          {{ $t('settings.showbg') }}:
          <n-radio-group v-model:value="bgMode">
            <n-radio-button v-for="mode in bgModes" :key="mode" :value="mode">
              {{ $t('settings.bg_'+mode) }}
            </n-radio-button>
          </n-radio-group>
        </n-space>

        <n-space item-style="display:flex;" align="center">
          <n-icon>
            <FontSizeIcon />
          </n-icon>
          {{ $t('settings.fontsize') }}:

          <n-slider
            :default-value="14"
            :marks="fontmarks"
            :min="12"
            :max="30"
            v-model:value="fontsize"
            style="width: 40vw"
          />
        </n-space>

        <n-space item-style="display:flex;" align="center">
          <n-icon>
            <MarginIcon />
          </n-icon>
          {{ $t('settings.margin') }}:

          <n-slider
            :default-value="4"
            :marks="marginmarks"
            :min="0"
            :max="20"
            v-model:value="margin"
            style="width: 40vw"
          />
        </n-space>

        <n-card>
          <div
            :style="{
              'margin-bottom': margin + 'px',
              'font-size': fontsize + 'px !important',
            }"
          >
            明日方舟剧情文本阅读器
          </div>
          <div
            :style="{
              'margin-bottom': margin + 'px',
              'font-size': fontsize + 'px !important',
            }"
          >
            Arknights Story Text Reader
          </div>
        </n-card>
      </n-space>

      <template #footer>
        <n-space item-style="display:flex;" align="center" justify="end">
          <n-button strong secondary type="error" @click="clearSetting()">
            <template #icon>
              <n-icon>
                <ResetIcon />
              </n-icon>
            </template>
            {{ $t('settings.clear') }}
          </n-button>
          <n-button strong type="primary" @click="save()">
            <template #icon>
              <n-icon>
                <SaveIcon />
              </n-icon>
            </template>
            {{ $t('settings.save') }}
          </n-button>
        </n-space>
      </template>
    </n-drawer-content>
  </n-drawer>
</template>

<script>
import {
  SettingsOutlined,
  PublicFilled,
  DriveFileRenameOutlineRound,
  VerticalDistributeOutlined,
  SaveAltOutlined,
  DeleteOutlineFilled,
  WallpaperOutlined,
  LibraryAddOutlined,
  FormatSizeOutlined,
  HeightOutlined,
} from "@vicons/material";
import func from "./func.js";
export default {
  data() {
    return {
      currentLang: func.l,
      altLang: func.alt,
      langOpts: func.langList,
      doctor: func.doctor,
      showDelay: func.showDelay,
      mirror: func.mirror,
      hideName: func.hideName,
      bgMode: func.bgMode,
      bgModes: func.bgModes,
      inited: func.inited == "true",
      fontsize: func.fontsize * 1,
      margin: func.margin * 1,
      showsettings: !func.inited,
      fontmarks: {
        14: "14px",
        20: "20px",
        26: "26px",
      },
      marginmarks: {
        4: "4px",
        8: "8px",
        16: "16px",
      },
    };
  },
  components: {
    SettingsIcon: SettingsOutlined,
    LangIcon: PublicFilled,
    DrNameIcon: DriveFileRenameOutlineRound,
    BlankIcon: VerticalDistributeOutlined,
    SaveIcon: SaveAltOutlined,
    ResetIcon: DeleteOutlineFilled,
    BGIcon: WallpaperOutlined,
    MirrorIcon: LibraryAddOutlined,
    FontSizeIcon: FormatSizeOutlined,
    MarginIcon: HeightOutlined,
  },
  methods: {
    save() {
      window.localStorage.setItem("inited", true);
      window.localStorage.setItem("doctor", this.doctor);
      window.localStorage.setItem("showDelay", this.showDelay);
      window.localStorage.setItem("mirror", this.mirror);
      window.localStorage.setItem("hideName", this.hideName);
      window.localStorage.setItem("lang", this.currentLang);
      window.localStorage.setItem("alt", this.altLang);
      window.localStorage.setItem("bgMode", this.bgMode);
      window.localStorage.setItem("fontsize", this.fontsize);
      window.localStorage.setItem("margin", this.margin);
      window.location.reload(true);
    },
    clearSetting() {
      window.localStorage.clear();
      window.location.reload(true);
    },
  },
};
</script>
