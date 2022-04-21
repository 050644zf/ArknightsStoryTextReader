<template>
    <n-layout-content >
    <n-space vertical class="analysis">
        <n-breadcrumb class="breadcrumb">
            <n-breadcrumb-item  @click="$router.push('/'+$route.params.server+'/menu')">
                <n-icon><MenuIcon/></n-icon>
                {{i18n.menu[currentLang]}}
            </n-breadcrumb-item>
            <n-breadcrumb-item>活动字/词数统计 | Event Characters/Words Analysis</n-breadcrumb-item>
        </n-breadcrumb>
            <n-space>
                <n-checkbox v-for="eType in eventType" :key="eType" :label="i18n[eType][currentLang]" v-model:checked="filter[eType]" @click="loadData"></n-checkbox>
            </n-space>

        <svg id="chart" >
            <g id="rects"></g>
            <g id="xAxis"></g>
            <g id="yAxis"></g>
        </svg>
    </n-space>

    </n-layout-content>

</template>

<script>
import * as d3 from 'd3';
import i18n from '../i18n.json';
import func from '../func';
import {MenuOpenFilled, ArrowForwardOutlined, DownloadOutlined} from "@vicons/material";

export default{
    data(){
        return{
            wordCount: window.sessionStorage.getItem('wordCountData')?JSON.parse(window.sessionStorage.getItem('wordCountData')):{},
            data: [{name:'测试',id:'test',type:'or',value:15}],
            i18n: i18n,
            mdata: window.sessionStorage.getItem('menudata')?JSON.parse(window.sessionStorage.getItem('menudata')):{},
            eventList: window.sessionStorage.getItem('eventList')?JSON.parse(window.sessionStorage.getItem('eventList')):[],
            filter: {
                maintheme: true,
                sidestory: true,
                intermezzi: true,
                storyset: true,
                or: false
            },
            barChartWidth: 800,
            barChartHeight: 40,
            barChartPadding: {
                top: 20,
                right: 20,
                bottom: 20,
                left: 150
            },
            eventType: ['maintheme','sidestory','intermezzi','storyset','or'],
            currentLang: func.l,
        }
    },
    mounted(){
        this.loadData();
        this.draw();
        this.$watch(() => this.data, () => {
            this.draw();
        })
    },
    components:{
        MenuIcon: MenuOpenFilled,
    },
    methods:{
        loadData(){
            var data = [];
            for(var etype in this.eventList){
                if(this.filter[etype]){
                    for(var idx in this.eventList[etype]){
                        var event = this.eventList[etype][idx];
                        var eventid = event.id;
                        var counter = 0;
                        for(var story in this.wordCount[eventid]){
                            counter += this.wordCount[eventid][story];
                        }
                        data.push({
                            name: event.name,
                            id: event.id,
                            type: etype,
                            value: counter
                        });
                    }
                }

            }
            this.data = data.slice().sort((a,b) => d3.descending(a.value, b.value));
        },

        draw(){
            this.barChartHeight = this.barChartPadding.top + this.barChartPadding.bottom + this.data.length * 40;
            var barChart = d3.select('#chart').attr('height', this.barChartHeight).attr('width', this.barChartWidth);

            var bind = d3.select('#rects').selectAll('rect').data(this.data);
            var updateRects = bind;
            var enterRects = bind.enter();
            var exitRects = bind.exit();

            //find max value among data
            var maxValue = d3.max(this.data, (d) => d.value);

            var xRange = d3.scaleLinear().domain([0, maxValue]).range([0, this.barChartWidth - this.barChartPadding.left - this.barChartPadding.right]);

            var yRange = d3.scaleBand().domain(this.data.map((d) => d.name)).range([0, this.barChartHeight - this.barChartPadding.top - this.barChartPadding.bottom]).paddingInner(0.1);

            var typeIdx = d3.scaleOrdinal().domain(this.eventType).range([0, 1, 2, 3, 4]);

            var colorFunc = d3.schemeDark2;

            enterRects.append('rect')
                .attr('x', (d) => this.barChartPadding.left)
                .attr('y', (d) => yRange(d.name) + this.barChartPadding.top)
                .attr('width', (d) => xRange(d.value))
                .attr('height', yRange.bandwidth())
                .attr('fill', (d) => colorFunc[typeIdx(d.type)]);

            updateRects.attr('x', (d) => this.barChartPadding.left)
                .attr('y', (d) => yRange(d.name) + this.barChartPadding.top)
                .attr('width', (d) => xRange(d.value))
                .attr('height', yRange.bandwidth())
            
            exitRects.remove();

            var xAxis = d3.axisTop(xRange).ticks(5);
            var yAxis = d3.axisLeft(yRange);
            d3.select('#xAxis').call(xAxis).attr('transform', 'translate(' + this.barChartPadding.left + ',' + this.barChartPadding.top + ')');
            d3.select('#yAxis').call(yAxis).attr('transform', 'translate(' + this.barChartPadding.left + ',' + this.barChartPadding.top + ')')
            d3.select('#xAxis').selectAll('line').attr('y2', this.barChartHeight - this.barChartPadding.bottom).attr('stroke', 'rgba(255,255,255,0.2');

        }
    },

}

</script>

<style>
.analysis{
    margin-left: 15%;
}

</style>