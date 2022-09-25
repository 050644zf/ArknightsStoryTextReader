<template>
    <n-image  :class="{images: imgtype=='images' || bgMode=='full', backgrounds:imgtype=='backgrounds'&&bgMode=='stripe'}" :src="`https://raw.githubusercontent.com/Aceship/Arknight-Images/main/avg/${imgtype}/${line.attributes.image}.png`"/>
</template>

<script>
import func from '../func'
export default {
    data(){
        return{
            line: this.inputline,
            imgtype: this.background?'backgrounds':'images',
            bgMode: func.bgMode
        }
    },
    props:{
        inputline: Object,
        background:{
            type: Boolean,
            default: false
        }
    }
}
</script>

<style>
.line .images img{
    max-width: 500px;
    max-height: 300px;
    margin: 4px;
    margin-left: 114px;
}
.line .backgrounds img{
    margin: 10px;
    margin-left: 100px;
    height: 150px;
    width: 700px;
    object-fit: none !important;
}


</style>