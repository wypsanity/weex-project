<template>
  <div>
    <top-bar></top-bar>
                <div style="height:100px;width:750px;display:flex;flex-direction:row;background-color:#fff;border-bottom-style:solid;border-bottom-width:1px;border-bottom-color:#f4f4f4;">
                  <div style="flex:1;justify-content:center;align-items:center;" @click="leftButt"><text :class="[isone ? '' : 'twotwo']">全部{{'('+allCount+')'}}</text></div>
                  <div style="flex:1;justify-content:center;align-items:center;" @click="rightButt"><text :class="[isone?'twotwo':'']">有图{{'('+hasPicCount+')'}}</text></div>
                </div>
              <list class="item-container" ref="list" :showLoadMore="true" @loadMore="showload" :style="{ height: contentHeight + 'px' }">
              <cell style="border-bottom-width:1px;border-bottom-style:solid;border-bottom-color:#d9d9d9;" v-if="!!comments" v-for="com in comments">
              <div class="comments-box">
             <div class="com-box-a">
                 <div class="com-box-a-left">
                     <image style="height:80px;width:80px;border-radius: 130px;margin-left:20px" resize="stretch" :src="com.headimgurl"></image>
                     <text style="margin-left:20px;" class="three-info-hidden">{{com.nickname}}</text>
                 </div>
                 <div class="com-box-a-right">
                     <text class="three-info-hidden" style="color:#7f7f7f">{{com.time}}</text>
                 </div>
             </div>
             <div>
                <div>
                 <text style="margin-left:40px;margin-top:20px;margin-bottom: 20px;">{{com.remark}}</text>
                </div>
             </div>
             <div class="com-box-b" v-if="!!com.picList&&com.picList.length > 0">
                 <image style="height:150px;width:150px;margin-left:20px;" v-for="i in com.picList" resize="stretch" :src="i.picUrl"></image>
             </div>
             <div>
                 <text style="margin-left:40px;margin-top:20px;margin-bottom: 20px;color:#999;" v-if="!!com.product">{{item.product.dec}}</text>
                <div style="background-color:#F0F8FF;padding:20px;" v-if="!!com.commentReplyVO">
                    <text style="color:#333;margin-left:20px;">小选回复:</text>
                    <text style="margin-left:20px;color:#999;">{{item.commentReplyVO.replyContent}}</text>
                </div>
             </div>
            </div>
            </cell>
          </list>
  </div>
</template>

<style scoped>
.item-container {
    width: 750px;
    background-color:#fff;
  }
.comments-box{     
        width:750px;
        display:flex;
        flex-direction:column;
        flex-wrap:nowrap;
    }
  .com-box-a{
      height:100px;
      display:flex;
      flex-direction:row;
  }
  .com-box-b{
        display:flex;
        flex-direction:row;
        align-items:center;
        margin-left: 20px;
        margin-top: 20px;
        margin-bottom: 20px;
    }
    .com-box-a-left{
        flex:1;
        display:flex;
        flex-direction:row;
        align-items:center;
    }
    .com-box-a-right{
        flex:2;
        display:flex;
        flex-direction:row;
        align-items:center;
        justify-content: center;
    }
    .three-info-hidden{overflow:hidden;}
    .twotwo{color:#666666 }
</style>
<script>
  import api from '../../../config/url.apis';
  import TopBar from '../../components/TopBar.vue'
  export default {
    components: {TopBar},
    data: () => ({
      id:'',
      contentHeight:weex.config.eros.realDeviceHeight-weex.config.eros.navBarHeight-weex.config.eros.statusBarHeight-100,
      tabTitles: [{title:'全部'},{title:'有图'}],
      tabStyles: {
        bgColor: '#FFFFFF',
        titleColor: '#666666',
        activeTitleColor: '#3D3D3D',
        activeBgColor: '#FFFFFF',
        isActiveTitleBold: true,
        iconWidth: 70,
        iconHeight: 70,
        width: 375,
        height: 120,
        fontSize: 24,
        hasActiveBottom: true,
        activeBottomColor: '#FFC900',
        activeBottomHeight: 6,
        activeBottomWidth: 120,
        textPaddingLeft: 10,
        textPaddingRight: 10
      },
      needSlider: true,
      isTabView: true,
      valueId:0,
      allCount:0,
      hasPicCount:0,
      allPage: 1,
      picPage: 1,
      size:10,
      allCommentList:[],
      comments:[],
      typeId:0,
      showType: "0",
      isone:true,
    }),
    created () {
      this.$router.getParams().then(resData => {
           this.valueId=resData.valueId;
           this.typeId=resData.typeId;
           this.getCommentCount();
           this.getCommentList();
        })
    },
    mounted(){
    },
    beforeCreate() {
    },
    methods: {  
      wxcTabPageCurrentTabSelected (e) {
        const self = this;
        const index = e.page;   
      },
      getCommentCount: function () {
            var that = this;
            this.$fetch({
                    method: 'GET',    
                    url: api.CommentCount,
                    data: {
                         goodsId: that.valueId 
                    }
                }).then(res => {
                    if (res.tips.isOk) {
                        this.allCount=res.data.allCount,
                        this.hasPicCount=res.data.hasPicCount
                    }
                }, error => {
                })
        },
        getCommentList: function () {
            var that = this;
            let num = 0;
            if(that.showType == "0"){
                num=that.allPage
            }else{
                num=that.picPage
            }
            this.$fetch({
                    method: 'GET',    
                    url: api.CommentList,
                    data: {
                         goodsId: that.valueId,
                         pageSize:that.size,
                         pageNum: num,
                         showType:that.showType 
                    }
                }).then(res => {
                    if (res.tips.isOk) {
                         if (that.showType == "0") {
                          if (that.allPage==1){
                              this.comments=res.data
                          }else{
                              this.comments= that.comments.concat(res.data)
                          }
                        } else {
                          if (that.picPage==1){
                              this.comments=res.data
                          }else{
                              this.comments= that.comments.concat(res.data)
                          }
                        }   
                    }
                }, error => {
                })
        },
        showload(){             
          if ( this.showType == "0") {
            if (this.allCount / this.size < this.allPage) {
              this.$refs["list"].loadMoreEnd()
              this.$notice.toast({message:'到底了'});
              return false;
            }
              this.allPage = this.allPage + 1
          } else {
            if (this.hasPicCount / this.size < this.picPage) {
              this.$refs["list"].loadMoreEnd()
              this.$notice.toast({message:'到底了'});
              return false;
            }
              this.picPage=this.picPage + 1
          }
          var that = this;
            let num = 0;
            if(that.showType == "0"){
                num=that.allPage
            }else{
                num=that.picPage
            }
            this.$fetch({
                    method: 'GET',    
                    url: api.CommentList,
                    data: {
                         goodsId: that.valueId,
                         pageSize:that.size,
                         pageNum: num,
                         showType:that.showType 
                    }
                }).then(res => {
                    if (res.tips.isOk) {
                         if (that.showType == "0") {
                          if (that.allPage==1){
                              this.comments=res.data
                          }else{
                              this.comments= that.comments.concat(res.data)
                          }
                        } else {  
                          if (that.picPage==1){
                              this.comments=res.data
                          }else{
                              this.comments= that.comments.concat(res.data)
                          }
                        }  
                        this.$refs["list"].loadMoreEnd() 
                    }
                }, error => {
                  this.$refs["list"].loadMoreEnd()
                })
        },
        leftButt(){
            this.isone=true;
            this.switchTab();
        },
        rightButt(){
            this.isone=false;
            this.switchTab();
        },
        switchTab: function () {
          this.showType= this.showType == "1" ? "0" :"1"
          this.getCommentList();
        },
    }
  };
</script>