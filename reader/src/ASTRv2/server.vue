<template>
    <Header :server="$route.params.server"></Header>    
    <router-view></router-view>
</template>

<script>
import Header from "./header.vue"
export default {
    data() {
        return {};
    },
    components: {
        Header,
    },
};
</script>