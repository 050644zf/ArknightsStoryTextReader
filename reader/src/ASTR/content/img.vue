<template>
<img  class="Image" :src="'https://aceship.github.io/AN-EN-Tags/img/avg/images/'+line.attributes.image+'.png'">
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