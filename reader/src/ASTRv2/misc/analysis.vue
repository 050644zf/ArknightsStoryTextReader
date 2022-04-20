<template>
    <n-layout-content>
    <svg id="chart">
        <g id="barChart"></g>
        <g id="xAxis"></g>
        <g id="yAxis"></g>
    </svg>
    </n-layout-content>

</template>

<script>
import * as d3 from 'd3';
import i18n from '../i18n.json';
import func from '../func';

export default{
    data(){
        return{
            wordCount: window.sessionStorage.getItem('wordCountData')?JSON.parse(window.sessionStorage.getItem('wordCountData')):{},
            data: [{name:'测试',id:'test',type:'maintheme',value:15}],
            i18n: i18n,
            mdata: window.sessionStorage.getItem('menudata')?JSON.parse(window.sessionStorage.getItem('menudata')):{},
            eventList: window.sessionStorage.getItem('eventList')?JSON.parse(window.sessionStorage.getItem('eventList')):[],
            filter: {
                maintheme: true,
                sidestory: true,
                intermezzi: true,
                storyset: true,
                or: true
            },
            barChartWidth: 800,
            barChartHeight: 40,
            barChartPadding: {
                top: 20,
                right: 20,
                bottom: 20,
                left: 20
            }
        }
    },
    created(){
        this.draw();
    },
    methods:{
        draw(){
            this.barChartHeight = this.barChartPadding.top + this.barChartPadding.bottom + this.data.length * 40;
            d3.select('#chart').attr('height', this.barChartHeight+this.barChartPadding.top+this.barChartPadding.bottom).attr('width', this.barChartWidth+this.barChartPadding.left+this.barChartPadding.right);
            d3.select('#barChart').attr('height', this.barChartHeight).attr('width', this.barChartWidth);

            var bind = d3.select('#barChart').selectAll('rect').data(this.data);
            var updateRects = bind;
            var enterRects = bind.enter();
            var exitRects = bind.exit();

            //find max value among data
            var maxValue = d3.max(this.data, (d) => d.value);

            var xRange = d3.scaleLinear().domain([0, maxValue]).range([0, this.barChartWidth - this.barChartPadding.left - this.barChartPadding.right]);

            var yRange = d3.scaleBand().domain(this.data.map((d) => d.name)).range([0, this.barChartHeight - this.barChartPadding.top - this.barChartPadding.bottom]).paddingInner(0.1);

            enterRects.append('rect')
                .attr('x', (d) => this.barChartPadding.left)
                .attr('y', (d) => yRange(d.name))
                .attr('width', (d) => xRange(d.value))
                .attr('height', yRange.bandwidth())
                .attr('fill', (d) => d.type == 'maintheme'?'#ff0000':d.type == 'sidestory'?'#00ff00':d.type == 'intermezzi'?'#0000ff':d.type == 'storyset'?'#ffff00':'#ffffff');

            updateRects.attr('x', (d) => this.barChartPadding.left)
                .attr('y', (d) => yRange(d.name))
                .attr('width', (d) => xRange(d.value))
                .attr('height', yRange.bandwidth())
            
            exitRects.remove();

            var xAxis = d3.axisBottom(xRange).ticks(5);
            var yAxis = d3.axisLeft(yRange);
            d3.select('#xAxis').call(xAxis);
            d3.select('#yAxis').call(yAxis);

        }
    }
}

</script>