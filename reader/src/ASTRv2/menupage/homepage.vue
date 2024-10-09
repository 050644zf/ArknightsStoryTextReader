<template>
  <n-space vertical class="homepage" justify="center">
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

    <n-grid x-gap="12" y-gap="12" cols="2 800:4">
      <n-gi>
      <n-card title="Latest Event" 
        v-if="latestEvents.length" 
        hoverable
        @click="$router.push({name: 'event', params: {event: latestEvents[0].id}})"
      >
        <template #cover>
          <n-image
            :src="
              'https://raw.githubusercontent.com/050644zf/ArknightsStoryJson/main/img/banners/' +
              latestEvents[0].id +
              '.png'
            "
            fallback-src="https://raw.githubusercontent.com/050644zf/ArknightsStoryJson/main/img/banners/404.png"
            preview-disabled
          />
        </template>
        <template #header-extra>
          <n-icon size="32"><ArrowForward /></n-icon>
        </template>
        最新活动
      </n-card>        
      </n-gi>
      <n-gi>
      <n-card title="Main theme" hoverable @click="$router.push({name:'menu',params:{selected:'maintheme'}})">
        <template #cover>
          <n-image :src="maintheme_png" preview-disabled/>
        </template>
        <template #header-extra>
          <n-icon size="32"><ArrowForward /></n-icon>
        </template>
        主题曲
      </n-card>        
      </n-gi>
      <n-gi>
      <n-card title="Operators" hoverable @click="$router.push({name:'menu',params:{selected:'or'}})">
        <template #cover>
          <n-image :src="op_png" preview-disabled/>
        </template>
        <template #header-extra>
          <n-icon size="32"><ArrowForward /></n-icon>
        </template>        
        干员信息
      </n-card>        
      </n-gi>      
      <n-gi>
      <n-card title="Wordcount" hoverable @click="$router.push({name:'analysis'})">
        <template #cover>
          <n-image :src="analysis_png" preview-disabled/>
        </template>
        <template #header-extra>
          <n-icon size="32"><ArrowForward /></n-icon>
        </template>
        字数统计
      </n-card>        
      </n-gi> 
    </n-grid>

    <n-divider/>

    <n-h1 prefix="bar">
      欢迎访问ASTR！<br />
      Welcome to ASTR!
    </n-h1>
    <n-text>
      如果在使用过程中遇到任何问题，或者有改进ASTR的好点子，请在<n-a
        href="https://github.com/050644zf/ArknightsStoryTextReader/issues/new"
      >
        这里</n-a
      >提交issue。<br />
      If you have any questions or feedbacks, please submit an issue
      <n-a
        href="https://github.com/050644zf/ArknightsStoryTextReader/issues/new"
        >here</n-a
      >.<br /><br />

      如果您喜欢本项目，可以考虑给一个star资瓷一下。<br />
      If you like this project, please give me a star!<br />
      <n-a href="https://github.com/050644zf/ArknightsStoryTextReader">
        <n-icon>
          <img
            src="https://img.shields.io/github/stars/050644zf/ArknightsStoryTextReader?style=social"
          />
        </n-icon>
      </n-a>
      <br /><br />
      如果您觉得ASTR有帮到您，欢迎通过转账支付宝账户: 050644zf@outlook.com 或
      <n-a href="https://www.patreon.com/m31nightsky">Patreon</n-a>
      给我买杯咖啡！<br />
      If you find ASTR helpful, consider buy me a coffee on
      <n-a href="https://www.patreon.com/m31nightsky">Patreon</n-a>!
      <br /><br />
      如果您熟悉下方列出的语言，欢迎参与ASTR的本地化工作！<br />
      If you are familiar with the languages listed below, welcome to join the localization of ASTR!
      <a href="https://hosted.weblate.org/engage/astr-i18n/">
      <img src="https://hosted.weblate.org/widget/astr-i18n/multi-auto.svg" alt="翻译状态" />
      </a>
      <br /><br />
      如果您想了解ASTR的开发进展，或者想要为ASTR贡献代码（万分感谢🙏），请访问
      <n-a href="https://github.com/users/050644zf/projects/1">ASTR路线图</n-a
      >查看最新的开发进展。<br />
      If you want to know about the development progress of ASTR, or want to
      contribute to ASTR (Much Appreciated🙏), check out
      <n-a href="https://github.com/users/050644zf/projects/1">
        ASTR Roadmap</n-a
      >
      for latest development progress. <br /><br />
      <n-text strong type="warning">
        网站内使用的游戏图片和文本原文，仅用于更好地表现游戏资料，其版权属于上海鹰角网络科技有限公司。<br />
        The images and text used in the website are only for better
        representation of the game data, and their copyright belongs to Shanghai
        Hypergryph Network Technology Co., Ltd.<br />
      </n-text>
    </n-text>
    <n-hr />
    <n-h3 prefix="bar" type="info"> 致谢 / Credits: </n-h3>
    <n-text>
      感谢以下贡献者对ASTR的鼎力支持！<br />
      Thanks to the following contributors for building better ASTR!
    </n-text>
    <n-card
      ><n-image
        width="200"
        src="https://contributors-img.web.app/image?repo=050644zf/ArknightsStoryTextReader"
        preview-disabled
    /></n-card>

    <n-text>
      感谢以下赞助者的大力支持！<br />
      Thanks to the generous support from the following sponsors!
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
      本项目的实现离不开以下项目的支持：<br />
      The implementation of this project is not without the support of the
      following projects:
    </n-text>
    <n-ul>
      <n-li
        >数据资源&更新自动化支持 / Data Source & Auto Update Support:
        <n-a href="https://github.com/Kengxxiao/ArknightsGameData"
          >Kengxxiao/ArknightsGameData</n-a
        >
      </n-li>
      <n-li>
        剧情&干员图片资源 / Stories&Operators' Images Source:
        <n-a href="https://github.com/Aceship/AN-EN-Tags">
          Aceship/AN-EN-Tags</n-a
        >
        ,
        <n-a href="https://github.com/fexli/ArknightsResource/tree/main"
          >fexli/ArknightsResource</n-a
        >
      </n-li>
      <n-li
        >活动封面资源 / Event Banners Source:
        <n-a href="https://prts.wiki/">PRTS Wiki</n-a>
      </n-li>
      <n-li
        >UI 框架 / UI Framework:
        <n-a href="https://www.naiveui.com/">Naive UI</n-a>
      </n-li>
      <n-li
        >图标 / Icon: <n-a href="https://www.xicons.org/#/">xicons</n-a>
      </n-li>
      <n-li
        >表格工具 / Spreadsheet Toolkit:
        <n-a href="https://github.com/SheetJS/sheetjs">Sheetjs</n-a>
      </n-li>
      <n-li
        >数据可视化 / Data Visualization: <n-text delete
          ><n-a href="https://github.com/d3/d3">D3.js</n-a></n-text
        >&nbsp;
        <n-a href="https://echarts.apache.org/zh/index.html">ECharts</n-a>
      </n-li>
      <n-li
        >Adobe Fonts 镜像 / Adobe Fonts Mirror:
        <n-a href="https://mirrors.sustech.edu.cn/"
          >南方科技大学开源镜像站 / SUSTech Open Source Mirrors</n-a
        >
      </n-li>
    </n-ul>
    <n-hr />
    <n-h3 prefix="bar" type="info"> 友情链接 / Friendly Links</n-h3>
    <n-ul>
      <n-li><n-a href="https://arkntools.app/"> 明日方舟工具箱</n-a> by Tsuk1ko </n-li>
      <n-li><n-a href="https://aceship.github.io/AN-EN-Tags/">Arknights Toolbox</n-a> by Aceship</n-li>
      <n-li><n-a href="https://theteamfuture.github.io/">Team Future</n-a> a.k.a. Future 攻坚组</n-li>
    </n-ul>
    <n-hr/>
    <n-h3 prefix="bar" type="info"> 更新日志 / Changelog: </n-h3>
    <n-collapse arrow-placement="right">
      <n-collapse-item>
        <template #header> 点击展开 / Click to Unfold </template>
        <n-h4>v1.8.1</n-h4>
        <n-oi>
          <n-li>Add support for new property <n-text code>animtext</n-text>. <n-a href="https://github.com/050644zf/ArknightsStoryTextReader/issues/64">#64</n-a></n-li>
        </n-oi>
        <n-h4>v1.8</n-h4>
        <n-oi>
          <n-li>Using Vue-i18n as i18n module.</n-li>
        </n-oi>
        <n-h4>v1.7.1</n-h4>
        <n-oi>
          <n-li>Fixed the is#4 monthly squad text.</n-li>
        </n-oi>
        <n-h4>v1.7</n-h4>
        <n-oi>
          <n-li>Migrate the data visualization framework from d3 to echarts in wordcount.</n-li>
          <n-li>Adding navigation of frequent use features in homepage</n-li>
          <n-li>Prettify the codes</n-li>
        </n-oi>
        <n-h4>v1.6.2</n-h4>
        <n-oi>
          <n-li>New feature: Open in google tl.</n-li>
        </n-oi>
        <n-h4>v1.6.1</n-h4>
        <n-oi>
          <n-li
            >Fixed display issue of white background & black color font
            subtitle.</n-li
          >
          <n-li
            >Using
            <n-a href="https://github.com/fexli/ArknightsResource/tree/main"
              >fexli/ArknightsResource</n-a
            >
            as new image source</n-li
          >
        </n-oi>
        <n-h4>v1.6</n-h4>
        <n-oi>
          <n-li
            >Add event start time and sort by time feature in intermezzi and
            sidestory, thank's to
            <n-a href="https://github.com/Tsuk1ko">Tsuk1ko</n-a>'s
            assistance.</n-li
          >
          <n-li>
            New Operators' Data page that shows the operators' archive, modules
            and records.
          </n-li>
        </n-oi>
        <n-h4>v1.5.1</n-h4>
        <n-oi>
          <n-li
            >Add aria roles for accessibility tools and main menu selection qol
            , thank's to hanss314's
            <n-a
              href="https://github.com/050644zf/ArknightsStoryTextReader/pull/53"
              >PR</n-a
            ></n-li
          >
        </n-oi>
        <n-h4>v1.5</n-h4>
        <n-oi>
          <n-li>Adapt to the major changes of game data.</n-li>
        </n-oi>
        <n-h4>v1.4.3</n-h4>
        <n-oi>
          <n-li>Add copy permalink to line and line warpping feature.</n-li>
        </n-oi>
        <n-h4>v1.4.2</n-h4>
        <n-oi>
          <n-li>Optimize the Predicate line.</n-li>
          <n-li>Add line margin adjustment.</n-li>
        </n-oi>
        <n-h4>v1.4.1</n-h4>
        <n-oi>
          <n-li>Add initialization guidance when launch ASTR first time.</n-li>
          <n-li
            >Add mirror accerlation support. Currently support Source serif
            loading.</n-li
          >
          <n-li>Add fontsize adjustment.</n-li>
        </n-oi>
        <n-h4>v1.4</n-h4>
        <n-oi>
          <n-li>Using Source Han Serif in the content of ASTR.</n-li>
        </n-oi>
        <n-h4>v1.3.1</n-h4>
        <n-oi>
          <n-li>Fix line break in subtitle class.</n-li>
        </n-oi>
        <n-h4>v1.3</n-h4>
        <n-oi>
          <n-li>Fix the search issue.</n-li>
        </n-oi>
        <n-h4>v1.2.4</n-h4>
        <n-oi>
          <n-li>Revert changes for new json format.</n-li>
        </n-oi>
        <n-h4>v1.2.3</n-h4>
        <n-oi>
          <n-li>Add new property support for excel export.</n-li>
          <n-li>Add Lone Trail Investigation Reports.</n-li>
          <n-li>Disable the search feature until available.</n-li>
        </n-oi>
        <n-h4>v1.2.2</n-h4>
        <n-oi>
          <n-li>Rhine Theme for Rhine Event!</n-li>
        </n-oi>
        <n-h4>v1.2.1</n-h4>
        <n-oi>
          <n-li> Fix missing space before & after html tag in content</n-li>
          <n-li> Change the alignment to center in content page</n-li>
        </n-oi>
        <n-h4>v1.2</n-h4>
        <n-oi>
          <n-li> Add Arknights Annual Report 2023</n-li>
        </n-oi>
        <n-h4>v1.1.1</n-h4>
        <n-oi>
          <n-li> Add "open in new tab" feature in menus.</n-li>
        </n-oi>
        <n-h4>v1.1</n-h4>
        <n-oi>
          <n-li> Bring back the paging feature</n-li>
          <n-li> Tweak the size of option button</n-li>
        </n-oi>
        <n-h4>v1.0.1</n-h4>
        <n-oi>
          <n-li> Add extra story in misc</n-li>
        </n-oi>
        <n-h4>v1.0</n-h4>
        <n-oi>
          <n-li> Add layout responsiveness for different scrren.</n-li>
          <n-li> Add "Scroll to the Top" button</n-li>
          <n-li> Add tab swap animation on menupage.</n-li>
          <n-li>
            Add Japanese UI support. Thanks to
            <n-a
              href="https://github.com/050644zf/ArknightsStoryTextReader/pull/36"
              >c-stella's PR</n-a
            ></n-li
          >
        </n-oi>
        <n-h4>v0.99.1</n-h4>
        <n-oi>
          <n-li>Fix Monthly Team Records</n-li>
        </n-oi>
        <n-h4>v0.99</n-h4>
        <n-oi>
          <n-li>UI overhaul.</n-li>
          <n-li
            >Add animation in list selection and story introdution switch</n-li
          >
          <n-li>Add more option to background image display in settings</n-li>
          <n-li
            >(Under development) Add some responsiveness on some UI
            components</n-li
          >
          <n-li
            >Fix the image source, thanks to
            <n-a
              href="https://github.com/050644zf/ArknightsStoryTextReader/pull/32"
              >Fryze's PR</n-a
            >
          </n-li>
        </n-oi>
        <n-h4>v0.98.1</n-h4>
        <n-oi>
          <n-li>
            Fix the wrong language issue in Monthly Squad Records, Integrated
            Stratgies</n-li
          >
          <n-li> Add animation in Event Characters/Words analysis</n-li>
          <n-li>
            Fix the en_US terms, thanks to
            <n-a
              href="https://github.com/050644zf/ArknightsStoryTextReader/pull/25"
              >jaywyeee's PR</n-a
            >
          </n-li>
        </n-oi>
        <n-h4>v0.98</n-h4>
        <n-oi>
          <n-li> Add Backgroud Support</n-li>
        </n-oi>
        <n-h4>v0.97</n-h4>
        <n-oi>
          <n-li>Optimized the style of website</n-li>
          <n-li>Optimized some content in misc</n-li>
          <n-li>Add "Stultifera Navis Operation Log" in misc</n-li>
          <n-li>Add Warp to Story Feature</n-li>
        </n-oi>
        <n-h4>v0.96</n-h4>
        <n-oi> </n-oi>
        <n-h4>v0.95</n-h4>
        <n-oi>
          <n-li>Add "Arknights Journey Review" in misc</n-li>
          <n-li>Add loading screen</n-li>
        </n-oi>
        <n-h4>v0.94</n-h4>
        <n-oi>
          <n-li>Add support for new "Sticker" property</n-li>
          <n-li>Add analysis for word/characters number in events</n-li>
          <n-li>Add support for new "multiline" property</n-li>
        </n-oi>
        <n-h4>v0.93</n-h4>
        <n-oi>
          <n-li>Add meta data for social media embeddings.</n-li>
          <n-li>Fix the issue of loading data error in event page.</n-li>
        </n-oi>
        <n-h4>v0.92</n-h4>
        <n-oi>
          <n-li>Add return to home feature on icon.</n-li>
          <n-li>Add zoom in feature on story CGs.</n-li>
        </n-oi>
      </n-collapse-item>
    </n-collapse>
    <n-hr />

  </n-space>
</template>

<script>
import {ArrowForwardOutlined} from '@vicons/material'
import analysis_png from './banners/analysis.png'
import maintheme_png from './banners/maintheme.png'
import op_png from './banners/op.png'

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
    };
  },
  mounted() {
    this.loadData();
  },
  components: {
    ArrowForward: ArrowForwardOutlined,
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
  },
};
</script>

<style>
.homepage {
  margin: 3% 15%;
}

.carocard {
  width: 300px;
}

@media screen and (max-width: 768px) {
  .homepage {
    margin: 3% 5%;
  }
}
</style>
