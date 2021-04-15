<template>
    <div id="article">
        <router-view />
    </div>
</template>
<script>
</script>

<style scoped>
        *{
        margin: 0;
        padding: 0;
        }
    #article{
        position: fixed;
        top: 7%;
        left: 10%;
        width:90%;
        height: 87%;
        /* border: 1px solid blue; */
        overflow: auto;
    }
</style>