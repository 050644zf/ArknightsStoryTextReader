<template>
    <n-space vertical class="homepage">
        <n-h1 prefix="bar">
            欢迎访问明日方舟剧情文本阅读器！<br/>
            Welcome to Arknights Story Text Reader!
        </n-h1>
        <n-text>
            这是新版ASTR的beta测试，尚未还原旧版ASTR的所有功能，且暂未优化移动端网页。<br/>
            This is the beta version of ASTR, and it is not yet fully supporting the features in the old version of ASTR, and it is not optimized for mobile.<br/>
            <br/>
            你可以<n-a href="https://050644zf.github.io/ArknightsStoryTextReader/?s=zh_CN">单击此处</n-a>访问旧版ASTR。<br/>
            You can <n-a href="https://050644zf.github.io/ArknightsStoryTextReader/?s=zh_CN">click here</n-a> to visit the old version of ASTR.<br/><br/>
            如果在使用过程中遇到任何问题，或者有改进ASTR的好点子，请在<n-a href="https://github.com/050644zf/ArknightsStoryTextReader/issues/new">这里</n-a>提交issue。<br/>
            If you have any questions or feedbacks, please submit an issue <n-a href="https://github.com/050644zf/ArknightsStoryTextReader/issues/new">here</n-a>.<br/><br/>

            如果你喜欢本项目，可以考虑给一个star资瓷一下。<br/>
            If you like this project, please give me a star!<br/>
            <n-a href="https://github.com/050644zf/ArknightsStoryTextReader">
                <n-icon>
                    <img src="https://img.shields.io/github/stars/050644zf/ArknightsStoryTextReader?style=social"/>
                </n-icon>
            </n-a>
            <br/><br/>


            <n-text strong type="warning"> 
                网站内使用的游戏图片和文本原文，仅用于更好地表现游戏资料，其版权属于上海鹰角网络科技有限公司。<br/>
                The images and text used in the website are only for better representation of the game data, and their copyright belongs to Shanghai Hypergryph Network Technology Co., Ltd.<br/>
            </n-text>
        </n-text>
        <n-hr/>
        <n-h3 prefix="bar" type="info">
            致谢 / Credits:
        </n-h3>
        <n-text>
            本项目的实现离不开以下项目的支持：<br/>
            The implementation of this project is not without the support of the following projects:
        </n-text>
        <n-ul>
            <n-li>数据资源&更新自动化支持 / Data Source & Auto Update Support: <n-a href="https://github.com/Kengxxiao/ArknightsGameData">Kengxxiao/ArknightsGameData</n-a></n-li>
            <n-li>剧情图片资源 / Story Images Source: <n-a href="https://github.com/Aceship/AN-EN-Tags">Aceship/AN-EN-Tags</n-a></n-li>
            <n-li>活动封面资源 / Event Banners Source: <n-a href="https://prts.wiki/">PRTS Wiki</n-a></n-li>
            <n-li>UI 框架 / UI Framework: <n-a href="https://www.naiveui.com/">Naive UI</n-a></n-li>
            <n-li>图标 / Icon: <n-a href="https://www.xicons.org/#/">xicons</n-a></n-li>
            <n-li>表格工具 / Spreadsheet Toolkit: <n-a href="https://github.com/SheetJS/sheetjs">Sheetjs</n-a></n-li>
        </n-ul>
        <n-hr/>

        <n-h3 prefix="bar" type="info">
            更新日志 / Changelog: 
        </n-h3>          
        <n-collapse arrow-placement="right">
            <n-collapse-item>
                <template #header>
                    点击展开 / Click to Unfold
                </template>
                <n-h4>wv 0.92</n-h4>
                <n-ol>
                    <n-li>Add return to home feature on icon.</n-li>
                    <n-li>Add zoom in feature on story CGs.</n-li>
                </n-ol>
            </n-collapse-item>
        </n-collapse>
        <n-hr/>
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
.homepage{
    margin: 3% 15%;
}
</style>