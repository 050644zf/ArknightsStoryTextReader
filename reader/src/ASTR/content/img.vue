<template>
<img class="Image" :src="'https://raw.githubusercontent.com/Aceship/Arknight-Images/main/avg/images/'+line.attributes.image+'.png'">
</template>

<script>
export default {
    data(){
        return{
            line: this.inputline
        }
    },
    props:{
        inputline: Object
    }
}
</script>

<style>
.line img{
    max-width: 500px;
    max-height: 300px;
    margin: 4px;
    margin-left: 114px;
}
</style>