<template>
    <div id="nav_wrapper">
        <div id="list_name">{{this.$props.list}}</div>
    </div>
</template>
<script>
import eventBus from '../event/eventBus'

export default {
    props:['list'],
    data(){
        return{
        }
    }
}
</script>
<style scoped>
#nav_wrapper{
    align-items: center;
}
#nav_wrapper > *{
    color: #999;
}
#list_name{
    font-size: 35px;
    margin: 30px 0px;
}
</style>
