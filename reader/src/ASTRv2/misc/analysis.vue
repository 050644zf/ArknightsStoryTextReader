<template>
  <n-layout-content>
    <n-space vertical class="analysis">
      <n-breadcrumb class="breadcrumb">
        <n-breadcrumb-item
          @click="$router.push('/' + $route.params.server + '/menu')"
        >
          <n-icon><MenuIcon /></n-icon>
          {{ $t('eventpage.menu') }}
        </n-breadcrumb-item>
        <n-breadcrumb-item
          >{{$t('misc.analysis')}}</n-breadcrumb-item
        >
      </n-breadcrumb>
      <n-flex justify="space-between" align="center">
        <n-space>
          <n-checkbox
            v-for="eType in eventType"
            :key="eType"
            v-model:checked="filter[eType]"
            @click="loadData"
          >
            <n-text
              :style="{ 'background-color': colorMap[eType], padding: '2px' }"
            >
              {{ $t('eventType.'+eType) }}
            </n-text>
          </n-checkbox>
        </n-space>
        <n-space>
          <n-button @click="load('https://github.com/050644zf/ASTR-Script/blob/main/parse.md#wordcount-rule')">
            <template #icon>
              <n-icon><InfoOutlined/></n-icon>
            </template>
            计数规则/Counting Rule
          </n-button>
        </n-space>
      </n-flex>


      <v-chart id="main" :option="getOption()" :style="{'height': data.length * 15 + 500 + 'px'}" :autoresize="{'throttle':100}" @dblclick="warp2Event"/>



    </n-space>
  </n-layout-content>
</template>

<script>
// import * as echarts from "echarts";
import func from "../func";
import {
  MenuOpenFilled,
  ArrowForwardOutlined,
  DownloadOutlined,
  InfoOutlined
} from "@vicons/material";
import { ref, provide } from "vue";

import VChart from "vue-echarts";
import { use } from 'echarts/core'
import { BarChart } from 'echarts/charts'
import {
  DatasetComponent,
  VisualMapComponent,
  GridComponent,
  TooltipComponent
} from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'

use([
  DatasetComponent,
  VisualMapComponent,
  GridComponent,
  TooltipComponent,
  BarChart,
  CanvasRenderer
])

export default {
  data() {
    return {
      wordCount: window.sessionStorage.getItem("wordCountData")
        ? JSON.parse(window.sessionStorage.getItem("wordCountData"))
        : {},
      data: [{ name: "测试", id: "test", type: "or", value: 15 }],
      mdata: window.sessionStorage.getItem("menudata")
        ? JSON.parse(window.sessionStorage.getItem("menudata"))
        : {},
      eventList: window.sessionStorage.getItem("eventList")
        ? JSON.parse(window.sessionStorage.getItem("eventList"))
        : [],
      filter: {
        maintheme: true,
        sidestory: true,
        intermezzi: true,
        storyset: true,
        or: false,
      },
      barChartWidth: 800,
      barChartHeight: 40,
      barChartPadding: {
        top: 20,
        right: 20,
        bottom: 20,
        left: 150,
      },
      eventType: ["maintheme", "sidestory", "intermezzi", "storyset", "or"],
      colorMap: {
        maintheme: "#5470c6",
        sidestory: "#fc8452",
        intermezzi: "#3ba272",
        storyset: "#ee6666",
        or: "#73c0de",
      },
      currentLang: func.l,
      server: this.$route.params.server,
      unit: "charCount"
    };
  },
  mounted() {
    this.loadData();
    // this.draw();
    // this.$watch(() => this.data, () => {
    //     document.getElementById("main").
    // })
    // 基于准备好的dom，初始化echarts实例
  },
  components: {
    VChart,
    MenuIcon: MenuOpenFilled,
    InfoOutlined
  },
  methods: {
    loadData() {
      if(this.server=='en_US'){
        this.unit = 'wordCount';
      }
      var data = [];
      for (var etype in this.eventList) {
        if (this.filter[etype]) {
          for (var idx in this.eventList[etype]) {
            var event = this.eventList[etype][idx];
            var eventid = event.id;
            var counter = 0;
            for (var story in this.wordCount[eventid]) {
              counter += this.wordCount[eventid][story];
            }
            data.push({
              name: etype == "or" ? event.name + " #" + event.set : event.name,
              id: event.id,
              type: etype,
              value: counter,
              time: event.startTime,
            });
          }
        }
      }
      this.data = data.slice();
      // console.log(this.data);
    },
    getTooltip(p){
      var name = p[0].data.name;
      var value = p[0].data.value;
      var type = p[0].data.type;
      return `<b>${name}</b> <br/> ${value} ${this.$t('wordCount.'+this.unit)}`;
    },
    getOption() {
      return {
        dataset: {
          source: this.data,
          dimensions: ["name", "value", "type"],
        },
        visualMap: {
          type: "piecewise",
          show: false,
          dimension: 2,
          categories: ["maintheme", "sidestory", "intermezzi", "storyset", "or"],
          inRange: {
            color: [
              this.colorMap.maintheme,
              this.colorMap.sidestory,
              this.colorMap.intermezzi,
              this.colorMap.storyset,
              this.colorMap.or,
            ],
          },
        },
        background: "rgba(0, 0, 0, 0)",
        textStyle: {
          color: "#fff",
        },
        grid:{
          left: '5%',
          containLabel: true,
        },
        xAxis: {
          max: "dataMax",
          position: "top",
          splitLine:{
            lineStyle:{
              color: '#333'
            }
          },
          axisLabel:{
            formatter: (value, index)=>{
              if(index)
                return (value/1000).toFixed(0) + 'K';
              else
                return  this.$t('wordCount.unit') + ': ' + this.$t('wordCount.'+this.unit);
            },
            fontWeight: 'bold',
            fontSize: 14,
          }
        },
        yAxis: {
          // show: false,
          type: "category",
          inverse: true,
          animationDuration: 300,
          animationDurationUpdate: 300,
          // max: 10, // only the largest 3 bars will be displayed
          axisLabel:{
            interval: 0,
            margin: 4,
            width: 90,
            align: "right",
            overflow: "truncate",
      
          },
          axisTick: {
            show: false,
          },

        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
          formatter: this.getTooltip,
          rich:{
            title:{
              color: "#fff",
              fontSize: 16,
              lineHeight: 30,
              fontWeight: "bold",
            }
          }
        },
        series: [
          {
            realtimeSort: true,
            type: "bar",
            label: {
              show: true,
              position: "right",
              valueAnimation: true,
              color: "#fff",
              formatter: (p)=>{return  p.data.value},
            },
          },
        ],
        animationDuration: 300,
        animationDurationUpdate: 300,
      };
    },
    warp2Event(p){
      console.log(p);
      var eventid = p.data.id;
      this.$router.push('/' + this.$route.params.server + '/event/' + eventid);
    },
    load(url){
      window.location = url;
    }
  },
};
</script>

<style>
.analysis {
  margin: 2% 15%;
}

@media screen and (max-width: 768px) {
  .analysis {
    margin: 3% 5%;
  }
}
</style>
