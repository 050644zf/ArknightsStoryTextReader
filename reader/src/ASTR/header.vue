<template>
    <div id="header" class="header">
        <img src="/src/assets/favicon.png" style="padding: 4px;margin-right: 10px;height: 32px;float: left;">
        <span style="float: left;">Arknights Story Text Reader</span> 
        <span style="font-size: medium;font-weight: normal;float: right; text-align: right; margin-right: 20px;">
                <a href="https://github.com/050644zf/ArknightsStoryTextReader/blob/master/ASTR/CHANGELOG.md" style="font-weight: bold;text-decoration: underline;">wv0.9</a><br/>
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
}
#header a{
    text-decoration: none;
    color: white;
}
</style>