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
        style="color: white;"
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
      <n-radio-button value="storyline">
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
            <n-text strong style="color: black">{{
              year - serverEpoch
            }}</n-text>
          </n-flex>
        </template>
        <template v-slot:title>
          <n-h3 strong style="margin: 0px">
            YEAR - {{ year - serverEpoch }}
          </n-h3>
        </template>
        <n-flex vertical>
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
    }
  },
  computed: {
    sortedEvents() {
      // Flatten all events from different types
      let allEvents = [];
      for (const eventType in this.eventList) {
        if (Array.isArray(this.eventList[eventType])) {
          allEvents = allEvents.concat(this.eventList[eventType]);
        }
      }
      // Sort by startTime
      return allEvents.sort((a, b) => a.startTime - b.startTime);
    },
    groupedEvents() {
      const groups = {};
      this.sortedEvents.forEach((event) => {
        if (!event.startTime || !this.eventTypeFilter[event.entryType]) return;
        const date = new Date(event.startTime * 1000);
        const year = date.getFullYear();
        if (!groups[year]) {
          groups[year] = [];
        }
        groups[year].push(event);
      });
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
  background-color: rgba(0, 0, 0, 0.5);
}

.music_score .episode .banner {
  top:-20px;
  padding: 0px 10px 0px 10px;
}

.episode-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
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
