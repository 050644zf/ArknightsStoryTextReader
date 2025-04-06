<template>
  <n-space class="maintheme" justify="center">
    <n-steps vertical>
      <template #finish-icon></template>
      <n-step v-for="(chapter, cid, cidx) in cdata" :key="cid">
        <template #icon>
          <n-flex justify="center" align="center">
            <n-text strong style="color: black">{{ cidx }}</n-text>
          </n-flex>
          
          
        </template>
        <template v-slot:title>
          <n-space>
            <n-h3 strong style="margin: 0px">
              {{ chapter.chapterName }}
            </n-h3>
            <n-text depth="3">
              {{ chapter.chapterName2 }}
            </n-text>
          </n-space>
        </template>
        <!-- <n-carousel :slides-per-view="3"> -->
        <n-space vertical>
          <n-space item-style="display: flex;" align="center">
            <n-card
              content-style="padding: 0px;"
              v-for="(eid, eidx) in chapter.events"
              :key="eidx"
              size="large"
              class="episode"
              @click="
                $router.push('/' + $route.params.server + '/event/' + eid)
              "
            >
              <template #cover>
                <n-image
                  :src="
                    'https://r2.m31ns.top/img/icons/' +
                    eid +
                    '.png'
                  "
                  class="mainicon"
                  style="height: 100px; width: 100px; margin: auto"
                  preview-disabled
                  fallback-src="https://r2.m31ns.top/img/icons/404.png"
                />
              </template>
              <n-text strong>{{ mdata[eid].name }}</n-text>
            </n-card>
          </n-space>
        </n-space>
        <!-- </n-carousel> -->
      </n-step>
    </n-steps>
  </n-space>
</template>

<script>
export default {
  data() {
    return {
      server: this.$route.params.server,
      cdata: window.sessionStorage.getItem("chapterdata")
        ? JSON.parse(window.sessionStorage.getItem("chapterdata"))
        : [],
      mdata: window.sessionStorage.getItem("menudata")
        ? JSON.parse(window.sessionStorage.getItem("menudata"))
        : {},
    };
  },
  // created(){
  //     this.cdata = this.chapterdata;
  //     this.mdata = this.menudata;
  // },
  //inject: ['menudata', 'chardict', 'eventList', 'chapterdata'],
};
</script>

<style>
.maintheme {
  margin: 20px 20px;
}
.maintheme .episode {
  text-align: center;
  font-weight: bold;
  box-shadow: 0px 0px 0px rgba(255, 255, 255, 0);
  transition: box-shadow 0.5s;
}
.maintheme .episode:hover {
  box-shadow: 0px 0px 10px rgba(255, 255, 255, 0.5);
}
</style>
