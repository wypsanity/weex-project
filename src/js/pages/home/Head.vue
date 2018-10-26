<template>
    <div class="wrapper">
        <text class="line-height">{{title}}</text>
    </div>
</template>
<script>
  export default {
    props:{
        title:{
            type: String,
            default: ''
        }
    },
   computed:{
   },
   data () {
        return {
        }
    },
    components: {},
    methods: {
    }
  }
</script>

<style scoped>
 .wrapper{
        height: 90px;
        flex-wrap: nowrap;
        flex-direction: row;
        justify-content: space-around;
        background-color:#ffffff;
        
        width: 750px;
    }
.line-height{
    line-height: 70px;
    color:#000000;
}
</style>