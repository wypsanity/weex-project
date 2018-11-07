<template>
        <div class="slogan">
          <div class="head-box pub-layout">
              <image class="head-image" src="bmlocal://assets/images/red-icon.png"></image>
              <text class="i-slg">30天无忧退换货</text>
          </div>
          <div class="head-box pub-layout">
              <image class="head-image" src="bmlocal://assets/images/red-icon.png"></image>
              <text class="i-slg">48小时快速退款</text>
          </div>
          <div class="head-box pub-layout">
              <image class="head-image" src="bmlocal://assets/images/red-icon.png"></image>
              <text class="i-slg">满88元免邮费</text>
          </div>
        </div>
</template>
<script>
  export default {
  props:{
    },
  	watch: {
  	},
   computed:{
   },
   data () {
        return {
        
        }
    },
    components: {},
    methods:{
        
    }
  }
</script>
<style scoped>
   .slogan {
    width: 750px;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    background-color:#f4f4f4
}
.head-box{
height: 66px;
padding-top: 16px;
flex:1;
justify-content: center;
align-items: center;
}
.pub-layout{
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
}
.head-image{
  width:10px;
  height:10px
}
.i-slg {
    font-size: 26px;
    text-align: center;
    color: #b4282d;
}
</style>
