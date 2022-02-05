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
            你可以<a href="https://050644zf.github.io/ArknightsStoryTextReader/?s=zh_CN">单击此处</a>访问旧版ASTR。<br/>
            You can <a href="https://050644zf.github.io/ArknightsStoryTextReader/?s=zh_CN">click here</a> to visit the old version of ASTR.
        </n-text>
        <n-hr/>
        <n-h3 prefix="bar">
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