<template>
        <div class="status-bar" :style="{'height': statusBarHeight,'background-color':color}"></div>
</template>
<script>
  export default {
  props:{
      color:{
          type:String,
          default:'#ffffff'
      }
    },
  	watch: {
  	},
   computed:{
   },
   data () {
        return {
        statusBarHeight: weex.config.eros.statusBarHeight ? weex.config.eros.statusBarHeight : 40,
        }
    },
    components: {},
    methods:{
        
    }
  }
</script>
<style scoped>
    .status-bar {
    width: 750px;
    height: 40px;
    opacity:0.1;
  }
</style>
