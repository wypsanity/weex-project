<template>
    <div>
        <!-- <bui-header
                title="富文本(bui-richcell)"
                :leftItem="leftItem"
                @leftClick="back">
        </bui-header>
        <div style="padding:10px;">
            <bui-richcell :content='content' @click="richClick"></bui-richcell>
        </div> -->
        <!-- <bmrichtext class="hd-txt flex">
            {{img}}
        </bmrichtext> -->
        <!-- <div v-for="item in [1,2,3]">
   <bmrichtext class="hd-txt flex">
      <bmspan value="已提交" v-if="true"></bmspan>
      <bmspan class="f-green" value="18"></bmspan>
      <bmspan  value="天"></bmspan>
      <bmspan class="f-green" value="3"></bmspan>
      <bmspan  value="小时"></bmspan>
      <bmspan class="f-green" value="1"></bmspan>
      <div v-for="item in [1,2,3]">
          <bmspan value="分"></bmspan>
      </div>
   </bmrichtext>
</div> -->
    <web style="wdith:750px;height:700px" src="https://www.qingqinkj.com/api/mall/mall/goods/goods/showGood?goodsId=1036002"></web>
    </div>
</template>

<script>
import { buiRichcell,buiHeader } from 'bui-weex'
    export default {
        components: {buiRichcell,buiHeader},
        data: function () {
            return {
                leftItem: {
                    icon: 'ion-chevron-left'
                },
                content:[],
                img:'<p><img src="http://yanxuan.nosdn.127.net/698e2a2252d9d4227f17f9d88a6e87ef.jpg"></p>',
            }
        },
        methods: {
            back() {
                this.$pop();
            },
            richClick(e,obj){
                this.$toast(JSON.stringify(obj));
            }
        },
        mounted(){
            var content=[];
            //第一段
            content.push({
                        type: 'text',
                        value: '@张指导',
                        theme: 'blue',
            });
            //第二段
            var text="今天去深圳市局开会,与会人数近30人";
            for(var i=0;i<text.length;i++){
                var obj={
                    type:'text',
                    value:text.charAt(i)
                }
                content.push(obj);
            }
            //第三段
            content.push({
                type:'text',
                value:"@张无忌",
                theme:"red"
            });
            //第四段
            text="务必在年前抓紧完成云智慧系统的建设";
            for(var i=0;i<text.length;i++){
                var obj={
                    type:'text',
                    value:text.charAt(i)
                }
                content.push(obj);
            }
            content.push({
                type:'image',
                width: 100,
                height: 100,
                src:"http://yanxuan.nosdn.127.net/698e2a2252d9d4227f17f9d88a6e87ef.jpg",
            });
            this.content=content;
        }
    }
</script>