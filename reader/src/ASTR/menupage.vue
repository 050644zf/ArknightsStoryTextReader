<template>
    <div class="menupage">
        <span class="material-icons">
        arrow_back
        </span>
        <span style="margin-left: 5px;">{{i18n.selectStory[lang]}}</span>
        
    </div>
</template>

<script>
import i18n from './i18n.json';
import func from './func';

export default {
    data(){
        return{
            i18n: i18n,
            lang: func.l
        }
    }
}
</script>

<style>
.menupage{
    margin-left: 10%;
    font-size: 20px;
    display: flex;
    align-items: center;
}
@media (max-width: 1000px) {
    .menupage span{
        font-size: 50px;
    }
}
</style>