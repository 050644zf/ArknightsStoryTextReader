<template>
  <n-card style="width: 600px">
    <template #header>
      <n-h2 prefix="bar">Changelog</n-h2>
    </template>
    <n-h4>v1.10.2</n-h4>
    <n-oi>
      <n-li>Fix the alt language misalignment issue, thanks to a322655's <n-a href="https://github.com/050644zf/ArknightsStoryTextReader/issues/81">PR</n-a></n-li>
    </n-oi>
    <n-h4>v1.10.1</n-h4>
    <n-oi>
      <n-li>Adding connection of FriendLink API provided by Ceobe Canteen.</n-li>
      <n-li>Fix some layout issue in homepage.</n-li>
      <n-li>Fix the index of Main theme chapters.</n-li>
    </n-oi>
    <n-h4>v1.10</n-h4>
    <n-oi>
      <n-li>Migrate the ArknightsJson repo to Cloudflare R2 service. If the R2 is unavailable will fallback to githubusercontent.</n-li>
    </n-oi>
    <n-h4>v1.9.2</n-h4>
    <n-oi>
      <n-li> Adding i18n keys for homepage. 
        <n-a href="https://github.com/050644zf/ArknightsStoryTextReader/issues/74">#74</n-a></n-li>
    </n-oi>
    <n-h4>v1.9.1</n-h4>
    <n-oi>
      <n-li>Enable horizontal centering of img. Thanks to RieLCho's
        <n-a href="https://github.com/050644zf/ArknightsStoryTextReader/pull/63">PR</n-a></n-li>
    </n-oi>
    <n-h4>v1.9</n-h4>
    <n-oi>
      <n-li>New Feature that can display alternative language when reading story.
        Now available in settings.</n-li>
      <n-li>Add i18n keys for error.</n-li>
    </n-oi>
    <n-h4>v1.8.1</n-h4>
    <n-oi>
      <n-li>Add support for new property <n-text code>animtext</n-text>.
        <n-a href="https://github.com/050644zf/ArknightsStoryTextReader/issues/64">#64</n-a></n-li>
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
      <n-li>Migrate the data visualization framework from d3 to echarts in
        wordcount.</n-li>
      <n-li>Adding navigation of frequent use features in homepage</n-li>
      <n-li>Prettify the codes</n-li>
    </n-oi>
    <n-h4>v1.6.2</n-h4>
    <n-oi>
      <n-li>New feature: Open in google tl.</n-li>
    </n-oi>
    <n-h4>v1.6.1</n-h4>
    <n-oi>
      <n-li>Fixed display issue of white background & black color font
        subtitle.</n-li>
      <n-li>Using
        <n-a href="https://github.com/fexli/ArknightsResource/tree/main">fexli/ArknightsResource</n-a>
        as new image source</n-li>
    </n-oi>
    <n-h4>v1.6</n-h4>
    <n-oi>
      <n-li>Add event start time and sort by time feature in intermezzi and
        sidestory, thank's to
        <n-a href="https://github.com/Tsuk1ko">Tsuk1ko</n-a>'s assistance.</n-li>
      <n-li>
        New Operators' Data page that shows the operators' archive, modules and
        records.
      </n-li>
    </n-oi>
    <n-h4>v1.5.1</n-h4>
    <n-oi>
      <n-li>Add aria roles for accessibility tools and main menu selection qol ,
        thank's to hanss314's
        <n-a href="https://github.com/050644zf/ArknightsStoryTextReader/pull/53">PR</n-a></n-li>
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
      <n-li>Add mirror accerlation support. Currently support Source serif
        loading.</n-li>
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
        <n-a href="https://github.com/050644zf/ArknightsStoryTextReader/pull/36">c-stella's PR</n-a></n-li>
    </n-oi>
    <n-h4>v0.99.1</n-h4>
    <n-oi>
      <n-li>Fix Monthly Team Records</n-li>
    </n-oi>
    <n-h4>v0.99</n-h4>
    <n-oi>
      <n-li>UI overhaul.</n-li>
      <n-li>Add animation in list selection and story introdution switch</n-li>
      <n-li>Add more option to background image display in settings</n-li>
      <n-li>(Under development) Add some responsiveness on some UI components</n-li>
      <n-li>Fix the image source, thanks to
        <n-a href="https://github.com/050644zf/ArknightsStoryTextReader/pull/32">Fryze's PR</n-a>
      </n-li>
    </n-oi>
    <n-h4>v0.98.1</n-h4>
    <n-oi>
      <n-li>
        Fix the wrong language issue in Monthly Squad Records, Integrated
        Stratgies</n-li>
      <n-li> Add animation in Event Characters/Words analysis</n-li>
      <n-li>
        Fix the en_US terms, thanks to
        <n-a href="https://github.com/050644zf/ArknightsStoryTextReader/pull/25">jaywyeee's PR</n-a>
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
  </n-card>
</template>
