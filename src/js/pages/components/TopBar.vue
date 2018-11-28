<template>
    <div>
        <status-bar :color="color"></status-bar>
        <Wxc-minibar :style="{'height': navBarHeight}" class="border-bottom" :title="title"
                :background-color="backgroundColor"
                :text-color="textColor"
                :right-text="rightText"
                @wxcMinibarLeftButtonClicked="minibarLeftButtonClick"
                @wxcMinibarRightButtonClicked="minibarRightButtonClick"></Wxc-minibar>
    </div>
</template>
<script>
import {WxcMinibar} from 'weex-ui';
import StatusBar from './StatusBar.vue';
  export default {
  props:{
      title:{
          type:String,
          default:'德多多'
      },
      backgroundColor:{
          type:String,
          default:'#ffffff'
      },
      textColor:{
          type:String,
          default:'#000000'
      },
      color:{
          type:String,
          default:'#ffffff'
      },
      rightText:{
          type:String,
          default:''
      },
      leftCall:{
          type:Boolean,
          default:false
      }
    },
   data () {
        return {
            navBarHeight: weex.config.eros.navBarHeight ? weex.config.eros.navBarHeight : 120,
        }
    },
    components: {WxcMinibar,StatusBar},
    methods:{
        minibarLeftButtonClick(){
          this.$router.back({
            type: 'PUSH',
            callback() {
                if(this.leftCall){
                this.$emit('callback','');
                }
            }
          })
        },
        minibarRightButtonClick(){
            if(!!this.rightText){
            this.$emit('callRight','');
            }
        }
    }
  }
</script>
<style scoped>
   .border-bottom {
    border-bottom-width: 1px;
    border-bottom-color: #f3f3f3;
  }
</style>
