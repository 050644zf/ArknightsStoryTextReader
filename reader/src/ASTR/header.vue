<template>
    <div id="header" class="header">
        <div style="display:flex; align-items:center;">
            <img src="/src/assets/favicon.png" style="padding:4px; margin: 4px;height:80%;">
            <span style="display:flex;">Arknights Story Text Reader</span> 
        </div>

        <span style="font-size: medium;font-weight: normal;text-align: right; margin-right: 20px;">
                <a href="https://github.com/050644zf/ArknightsStoryTextReader/blob/master/reader/CHANGELOG.md" style="font-weight: bold;text-decoration: underline;">wv0.10</a><br/>
                by nightsky#3319 on 
                <a href="https://discord.gg/rihq" style="font-weight: bold;text-decoration: underline;">RIHQ</a>
            </span>
    </div>
</template>

<script>
export default {
    data(){
        return{}
    }
}
</script>

<style>
#header{
    font-weight: bold;
    background-color: #007575;
    font-size: 200%;
    padding: 4px;
    padding-top: 8px;
    position: sticky;
    height: 42px;
    top: 0px;
    display: flex;
    justify-content: space-between;
}
#header a{
    text-decoration: none;
    color: white;
}
</style>