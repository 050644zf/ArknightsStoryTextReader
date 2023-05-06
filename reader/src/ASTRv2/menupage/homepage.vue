<template>
    <n-space vertical class="homepage" justify="center">
        <!-- <n-alert type="error" title="ASTR 已停止更新 / ASTR has stopped updating">
                由于数据资源 <n-a href="https://github.com/Kengxxiao/ArknightsGameData">Kengxxiao/ArknightsGameData</n-a> 已经停止更新，ASTR数据将不再更新直到找到新可用数据源。<br/>
                如果有新可用数据源欢迎在 github issue 中反馈！感谢大家的支持！<br/><br/>
                Due to the archiving of game datasource <n-a href="https://github.com/Kengxxiao/ArknightsGameData">Kengxxiao/ArknightsGameData</n-a>, ASTR will not be updated until a new datasource is found. <br/>
                If you find a new datasource, please submit an issue on github! Thank you for your support! 
        </n-alert> -->
        <br/>
        <n-h1 prefix="bar">
            欢迎访问明日方舟剧情文本阅读器！<br />
            Welcome to Arknights Story Text Reader!
        </n-h1>
        <n-text>
            如果在使用过程中遇到任何问题，或者有改进ASTR的好点子，请在<n-a href="https://github.com/050644zf/ArknightsStoryTextReader/issues/new">
                这里</n-a>提交issue。<br />
            If you have any questions or feedbacks, please submit an issue <n-a
                href="https://github.com/050644zf/ArknightsStoryTextReader/issues/new">here</n-a>.<br /><br />

            如果您喜欢本项目，可以考虑给一个star资瓷一下。<br />
            If you like this project, please give me a star!<br />
            <n-a href="https://github.com/050644zf/ArknightsStoryTextReader">
                <n-icon>
                    <img src="https://img.shields.io/github/stars/050644zf/ArknightsStoryTextReader?style=social" />
                </n-icon>
            </n-a>
            <br /><br />
            如果您觉得ASTR有帮到您，欢迎通过 <n-a href="https://www.patreon.com/m31nightsky">Patreon</n-a> 给我买杯咖啡！<br />
            If you find ASTR helpful, consider buy me a coffee on <n-a href="https://www.patreon.com/m31nightsky">Patreon</n-a>!
            <br /><br />
            <n-text strong type="warning">
                网站内使用的游戏图片和文本原文，仅用于更好地表现游戏资料，其版权属于上海鹰角网络科技有限公司。<br />
                The images and text used in the website are only for better representation of the game data, and their
                copyright belongs to Shanghai Hypergryph Network Technology Co., Ltd.<br />
            </n-text>
        </n-text>
        <n-hr />
        <n-h3 prefix="bar" type="info">
            致谢 / Credits:
        </n-h3>
        <n-text>
        感谢以下赞助者的大力支持！<br/>
        Thanks to the generous support from the following sponsors!
        </n-text>
        <n-ul>
            <n-li>Thymewarp</n-li>
        </n-ul>
        <n-text>
            本项目的实现离不开以下项目的支持：<br />
            The implementation of this project is not without the support of the following projects:
        </n-text>
        <n-ul>
            <n-li>数据资源&更新自动化支持 / Data Source & Auto Update Support: <n-a
                    href="https://github.com/Kengxxiao/ArknightsGameData">Kengxxiao/ArknightsGameData</n-a>
            </n-li>
            <n-li>剧情&干员图片资源 / Stories&Operators' Images Source: <n-a href="https://github.com/Aceship/AN-EN-Tags">
                    Aceship/AN-EN-Tags</n-a>
            </n-li>
            <n-li>活动封面资源 / Event Banners Source: <n-a href="https://prts.wiki/">PRTS Wiki</n-a>
            </n-li>
            <n-li>UI 框架 / UI Framework: <n-a href="https://www.naiveui.com/">Naive UI</n-a>
            </n-li>
            <n-li>图标 / Icon: <n-a href="https://www.xicons.org/#/">xicons</n-a>
            </n-li>
            <n-li>表格工具 / Spreadsheet Toolkit: <n-a href="https://github.com/SheetJS/sheetjs">Sheetjs</n-a>
            </n-li>
            <n-li>数据可视化 / Data Visualization: <n-a href="https://github.com/d3/d3">D3.js</n-a>
            </n-li>
        </n-ul>
        <n-hr />

        <n-h3 prefix="bar" type="info">
            更新日志 / Changelog:
        </n-h3>
        <n-collapse arrow-placement="right">
            <n-collapse-item>
                <template #header>
                    点击展开 / Click to Unfold
                </template>
                <n-h4>wv 1.2.4</n-h4>
                <n-oi>
                    <n-li>Revert changes for new json format.</n-li>
                </n-oi>
                <n-h4>wv 1.2.3</n-h4>
                <n-oi>
                    <n-li>Add new property support for excel export.</n-li>
                    <n-li>Add Lone Trail Investigation Reports.</n-li>
                    <n-li>Disable the search feature until available.</n-li>
                </n-oi> 
                <n-h4>wv 1.2.2</n-h4>
                <n-oi>
                    <n-li>Rhine Theme for Rhine Event!</n-li>
                </n-oi> 
                <n-h4>wv 1.2.1</n-h4>
                <n-oi>
                    <n-li> Fix missing space before & after html tag in content</n-li>
                    <n-li> Change the alignment to center in content page</n-li>
                </n-oi>                
                <n-h4>wv 1.2</n-h4>
                <n-oi>
                    <n-li> Add Arknights Annual Report 2023</n-li>
                </n-oi>
                <n-h4>wv 1.1.1</n-h4>
                <n-oi>
                    <n-li> Add "open in new tab" feature in menus.</n-li>
                </n-oi>                
                <n-h4>wv 1.1</n-h4>
                <n-oi>
                    <n-li> Bring back the paging feature</n-li>
                    <n-li> Tweak the size of option button</n-li>
                </n-oi>
                <n-h4>wv 1.0.1</n-h4>
                <n-oi>
                    <n-li> Add extra story in misc</n-li>
                </n-oi>
                <n-h4>wv 1.0</n-h4>
                <n-oi>
                    <n-li> Add layout responsiveness for different scrren.</n-li>
                    <n-li> Add "Scroll to the Top" button</n-li>
                    <n-li> Add tab swap animation on menupage.</n-li>
                    <n-li> Add Japanese UI support. Thanks to <n-a href="https://github.com/050644zf/ArknightsStoryTextReader/pull/36">c-stella's PR</n-a></n-li>
                </n-oi>
                <n-h4>wv 0.99.1</n-h4>
                <n-oi>
                    <n-li>Fix Monthly Team Records</n-li>
                </n-oi>
                <n-h4>wv 0.99</n-h4>
                <n-oi>
                    <n-li>UI overhaul.</n-li>
                    <n-li>Add animation in list selection and story introdution switch</n-li>
                    <n-li>Add more option to background image display in settings</n-li>
                    <n-li>(Under development) Add some responsiveness on some UI components</n-li>
                    <n-li>Fix the image source, thanks to <n-a
                            href="https://github.com/050644zf/ArknightsStoryTextReader/pull/32">Fryze's PR</n-a>
                    </n-li>
                </n-oi>
                <n-h4>wv 0.98.1</n-h4>
                <n-oi>
                    <n-li> Fix the wrong language issue in Monthly Squad Records, Integrated Stratgies</n-li>
                    <n-li> Add animation in Event Characters/Words analysis</n-li>
                    <n-li> Fix the en_US terms, thanks to <n-a
                            href="https://github.com/050644zf/ArknightsStoryTextReader/pull/25">jaywyeee's PR</n-a>
                    </n-li>
                </n-oi>
                <n-h4>wv 0.98</n-h4>
                <n-oi>
                    <n-li> Add Backgroud Support</n-li>
                </n-oi>
                <n-h4>wv 0.97</n-h4>
                <n-oi>
                    <n-li>Optimized the style of website</n-li>
                    <n-li>Optimized some content in misc</n-li>
                    <n-li>Add "Stultifera Navis Operation Log" in misc</n-li>
                    <n-li>Add Warp to Story Feature</n-li>
                </n-oi>
                <n-h4>wv 0.96</n-h4>
                <n-oi>

                </n-oi>
                <n-h4>wv 0.95</n-h4>
                <n-oi>
                    <n-li>Add "Arknights Journey Review" in misc</n-li>
                    <n-li>Add loading screen</n-li>
                </n-oi>
                <n-h4>wv 0.94</n-h4>
                <n-oi>
                    <n-li>Add support for new "Sticker" property</n-li>
                    <n-li>Add analysis for word/characters number in events</n-li>
                    <n-li>Add support for new "multiline" property</n-li>
                </n-oi>
                <n-h4>wv 0.93</n-h4>
                <n-oi>
                    <n-li>Add meta data for social media embeddings.</n-li>
                    <n-li>Fix the issue of loading data error in event page.</n-li>
                </n-oi>
                <n-h4>wv 0.92</n-h4>
                <n-oi>
                    <n-li>Add return to home feature on icon.</n-li>
                    <n-li>Add zoom in feature on story CGs.</n-li>
                </n-oi>
            </n-collapse-item>
        </n-collapse>
        <n-hr />
        <n-h3 prefix="bar" type="info">
            Todo List:
        </n-h3>
        <n-ol>
            <n-li>Implement the export, search feature.</n-li>
            <n-li>Optimize the UI in events menu & Operators' Records menu </n-li>
            <n-li>Optimize the warpping logic in menu page</n-li>
            <n-li>Improve the content page</n-li>
        </n-ol>
    </n-space>
</template>

<style>
.homepage {
    margin: 3% 15%;
}
</style>
