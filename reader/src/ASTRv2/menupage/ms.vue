<template>
  <n-flex class="music_score" vertical>
    <n-flex justify="space-around" align="center">
      
    <n-flex justify="center" align="center">
      <n-button
        v-for="(type, idx) in Object.keys(badgeStyle)"
        :key="idx"
        :color="badgeStyle[type].bgcolor"
        :ghost="!eventTypeFilter[type]"
        @click="eventTypeFilter[type] = !eventTypeFilter[type]"
        :style="{color: 'white'}"
        round

      >
        <template #icon>
          <n-icon size="24">
            <div :class="badgeStyle[type].icon"></div>
          </n-icon>
        </template>
        {{ badgeStyle[type].text }}
      </n-button>

    </n-flex>
    <n-radio-group
      v-model:value="viewType"
      size="small"
    >
      <n-radio-button value="calendar">
        <n-flex justify="center" align="center">
          <n-icon size="24"><CalendarIcon /></n-icon>
          {{ $t('menupage.calendar') }}
        </n-flex>  
    </n-radio-button>
      <n-radio-button value="storyline" disabled>
        <n-flex justify="center" align="center">
          <n-icon size="24"><ViewIcon /></n-icon>
          {{ $t('menupage.storyline') }} (WIP)
        </n-flex>
      </n-radio-button>
    </n-radio-group>
  </n-flex>
  <n-divider ></n-divider>

    <n-steps vertical>
      <template #finish-icon></template>
      <TransitionGroup name="list">
      <n-step v-for="(yearGroup, year) in groupedEvents" :key="year">
        <template #icon>
          <n-flex justify="center" align="center">
            <n-text strong style="color: black" v-if="year>=0">
              {{year}}
            </n-text>
            <n-text strong style="color: black" v-else>
              ?
            </n-text>
          </n-flex>
        </template>
        <template #title >
          <n-h3 strong style="margin: 0px" v-if="year>=0">
            YEAR - {{ year }}
          </n-h3>
          <n-h3 strong style="margin: 0px" v-else>
            COLLABRATIONS
          </n-h3>          
        </template>
        <n-flex >
          <n-space item-style="display: flex;" align="center">
            <TransitionGroup name="episode" tag="div" class="episode-container">
              <n-card
                  content-style="padding: 0px;"
                  v-for="event in yearGroup"
                  :key="event.id"
                  size="large"
                  class="episode"
                  @click="showEventCard(event.id)"
                  :bordered="false"
                  embedded
              >
                <template #cover>
                  <n-flex vertical justify="center" align="center">
                    <n-badge :color="badgeStyle[event.entryType].bgcolor" class="mainicon">
                    <n-image
                        v-if="event.entryType == 'MAINLINE'"
                        :src="'https://r2.m31ns.top/img/icons/'+event.id+'.png'"
                        
                        style="height: 100px; width: 100px;"
                        preview-disabled
                        fallback-src="https://r2.m31ns.top/img/banners/404.png"
                        object-fit="cover"
                    />       
                    <n-image
                        v-else
                        :src="'https://r2.m31ns.top/img/banners/'+event.id+'.png'"
                        
                        style="height: 80px;"
                        preview-disabled
                        fallback-src="https://r2.m31ns.top/img/banners/404.png"
                        object-fit="cover"
                    />
                      <template #value>
                        <n-flex align="center">
                          <n-icon size="16">
                            <div :class="badgeStyle[event.entryType].icon"></div>
                          </n-icon>
                        </n-flex>
                      </template>
                    </n-badge>
                    <n-text :class="{eventname: true, banner:event.entryType != 'MAINLINE'}" strong >{{ event.name }}</n-text>
                  </n-flex>
                </template>
                
            </n-card>
            </TransitionGroup>
          </n-space>
        </n-flex>
      </n-step>
      </TransitionGroup>
    </n-steps>
      </n-flex>
      
    <EventCard
      :edata="getEdata"
    />
</template>

<script>
import { CalendarMonthOutlined, ViewTimelineOutlined } from "@vicons/material";

import func from "../func.js";
import EventCard from "./event_card.vue";

export default {
  data() {
    return {
      server: this.$route.params.server,
      eventList: window.sessionStorage.getItem("eventList")
        ? JSON.parse(window.sessionStorage.getItem("eventList"))
        : [],
      mdata: window.sessionStorage.getItem("menudata")
      ? JSON.parse(window.sessionStorage.getItem("menudata"))
      : {},
      wordCount: window.sessionStorage.getItem("wordCountData")
      ? JSON.parse(window.sessionStorage.getItem("wordCountData"))
      : {},
      storylines: window.sessionStorage.getItem("storylines")
        ? JSON.parse(window.sessionStorage.getItem("storylines"))
        : {},
      storylineStorySets: window.sessionStorage.getItem("storylineStorySets")
        ? JSON.parse(window.sessionStorage.getItem("storylineStorySets")):{},
      eventType: this.$route.params.eventType,
      eventID: this.$route.params.eventID,
      eventIdx: this.$route.params.eventIdx,
      serverEpoch: func.server_epoch,
      showEventModal: false,
      currentEventId: null,
      viewType: 'calendar',
      badgeStyle: {
        'MAINLINE': {
          bgcolor: '#3889c5',
          icon: 'terminal-maintheme',
          text: this.$t('eventType.maintheme')
        },
        'ACTIVITY': {
          bgcolor: '#f08a00',
          icon: 'terminal-sidestory',
          text: this.$t('eventType.sidestory')
        },
        'MINI_ACTIVITY':{
          bgcolor: '#2a947d',
          icon: 'terminal-storyset',
          text: this.$t('eventType.storyset')
        }
      },
      eventTypeFilter: {
        'MAINLINE': true,
        'ACTIVITY': true,
        'MINI_ACTIVITY': true,
      }
    };
  },
  methods: {
    showEventCard(eventId) {
      this.$router.push({
        name: "event_card",
        params: { server: this.$route.params.server, selected: "ms", eid: eventId },
      })
    },
    getEid(storyset){
      if(storyset.storySetId == 'setId_mainline_3_1') return "main_15";
      if(storyset.storySetId == 'setId_mainline_3_2') return "main_16";
      if(storyset.storySetId == 'setId_mainline_3_3') return "main_17";
      if(storyset.storySetId == 'setId_mainline_3_4') return "main_18";
      if(storyset.storySetType == 'MAINLINE') return storyset.mainlineData.zoneId;
      return storyset.relevantActivityId;
    },
  },
  computed: {

    groupedEvents() {
      let allEvents = {};
      for (const eventType in this.eventList) {
        if (Array.isArray(this.eventList[eventType])) {
          for (const event of this.eventList[eventType]) {
              allEvents[event.id] = event;
          }
        }
      }
      let storysetgroups = {};
      for(const storysetid in this.storylineStorySets) {
        var storyset = this.storylineStorySets[storysetid];
        const year = storyset.sortByYear;
        if (!storysetgroups[year]) {
          storysetgroups[year] = [];
        }
        storysetgroups[year].push(storyset);
      }
      // Sort events within each year by sortWithinYear

      let groups = {};
      for (const year in storysetgroups) {
        storysetgroups[year].sort((a, b) => {
          const aSort = a.sortWithinYear || 0;
          const bSort = b.sortWithinYear || 0;
          return aSort - bSort;
        });
        for (const storyset of storysetgroups[year]) {
          
          const edata = allEvents[this.getEid(storyset)];
          if (this.eventTypeFilter[edata.entryType]) {
            if (!groups[year]) {
              groups[year] = [];
            }
            groups[year].push(edata);
          }
        }
      }

      
      for(const collab_event of func.collab){
        const collab_event_data = allEvents[collab_event];
        if (this.eventTypeFilter[collab_event_data.entryType]) {
          if (!groups[-1]) {
            groups[-1] = [];
          }
          groups[-1].push(collab_event_data);
        }
      }
      console.log(groups)
      return groups;
    },
    getEdata(){
      if(this.$route.params.eid) {
        console.log(this.mdata[this.$route.params.eid])
        return this.mdata[this.$route.params.eid]
      } else {
        return null;
      }
    }
  },
  components: {
    CalendarIcon: CalendarMonthOutlined,
    ViewIcon: ViewTimelineOutlined,
    EventCard
  },
};
</script>

<style lang="scss">
.music_score {
  width: 80vw;
  max-width: 1200px;
}

.music_score .episode {
  text-align: center;
  font-weight: bold;
  background-color: rgba(0, 0, 0, 0) !important;
  padding-top: 10px;
  z-index: 1;
  width: max-content;
  // position: relative;
}

.music_score .episode .mainicon{
  margin: 5px;
  margin-top: 18px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: all 0.3s cubic-bezier(0.2, 0.8, 0.4, 1);
  transform: translateY(0) scale(1);
  z-index: 1;
  position: relative;


  &:hover {
    transform: translateY(-8px) scale(1.05);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
    z-index: 2;
  }
}

.music_score .episode .n-badge-sup {
  left: 90%;
  bottom: 85%;
  width: max-content;
  z-index: 10;
}


.music_score .episode .eventname {
  position: relative; 
  top:-10px;
  background-color: rgba(0, 0, 0, 0.581);
  padding: 0px 10px 0px 10px;
}

.music_score .episode .banner {
  top:-20px;

}

.episode-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
  align-items: center;
  gap: 16px;
}

.episode-enter-active,
.episode-leave-active {
  position: relative;
  transition: all 0.5s ease;
}

.episode-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.episode-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

.episode-move {
  transition: transform 0.5s ease;
}
</style>
