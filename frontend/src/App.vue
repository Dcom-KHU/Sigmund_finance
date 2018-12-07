<template>
  <div id="app">
    <div id="system_alert" v-bind:class="{'on':alertState}">
      <div id="stop_button" v-on:click="onoffAlert(false)">
        <i class="fas fa-times"></i>
      </div>
      <div id="text_wrapper">
        <i class="fas fa-exclamation-triangle"></i>
        <div>{{text}}</div>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
import eventBus from './components/event/eventBus';
export default {
  name: 'App',
  data(){
    return{
      alertState: false,
      text: '',
      timeoutObj: null,
    }
  },
  created(){
    eventBus.$on('alert', (obj)=>{
      this.alertError(obj.message);
    });
  },
  methods:{
    onoffAlert(state){
      clearTimeout(this.timeoutObj);
      this.alertState = state;
    },
    alertError(message){
      this.text = message;
      this.onoffAlert(true);
  
      this.timeoutObj = setTimeout(()=>{
        this.onoffAlert(false);
      }, 3000);
    }
  }
}
</script>

<style>
@import url(http://fonts.googleapis.com/earlyaccess/notosanskr.css);
*{
  box-sizing: border-box;
}
#app {
  overflow: hidden;
  font-family: 'Noto Sans KR', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  height: 100vh;
}
#system_alert{
  position: absolute;
  right: 30px;
  bottom: 30px;
  width: 350px;
  height: 150px;
  background-color: #ddd;
  opacity: 0;
  transition: 0.25s;
}
#stop_button{
  float: right;
  margin-top: 8px;
  margin-right: 15px;
}
#stop_button :hover{
  color: #fc2a7b;
}
#text_wrapper > i{
  margin-right: 15px;
  font-size: 18px;
  color: #fc2a7b;
}
#text_wrapper{
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 65px;
  font-size: 18px;
}
.on{
  opacity: 1 !important;
}
</style>
