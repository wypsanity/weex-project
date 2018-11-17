<template>
  <div>
    <top-bar></top-bar>
     <scroller class="item-container" :style="{ height: contentHeight + 'px' }">
    <wxc-cell v-if="addressList.length > 0" v-for="(item,index) in addressList" :has-top-border="false"
                :auto-accessible="false"
                :has-arrow="true"
                :cell-style="cell"
                extraContent="编辑"
                @wxcCellClicked="selectAddress(item.id,index)">
                <text slot="label" class="cell-label-one" v-if="item.isDefault =='1'">默认</text>
                <text class="cell-content-one" slot="title">{{item.province+item.city+item.district + item.address}}</text>
                </wxc-cell>
    <wxc-cell v-else :has-top-border="false"
    :auto-accessible="false"
    :has-arrow="fales"
    :cell-style="cell">
    <text slot="label" class="cell-label-two">还没有收货地址,去添加</text>
    </wxc-cell>
    <div style="background-color:#b4282d;position:fixed;bottom:0px;height:100px;width:750px;justify-content:center;align-items:center;" @click="addressAddOrUpdate"><text style="color:#fff;">新建</text></div>
    </scroller>
  </div>
</template>

<style scoped>
.item-container {
    width: 750px;
    background-color: #f2f3f4;
  }
  .cell-content-one {
    color: #333333;
    font-size: 30px;
    line-height: 40px;
  }
  .cell-label-one {
    margin-right: 20px;
    font-size: 30px;
    color: #C3413D;
    border-radius:5px;
    border-width:1px;
    border-style:solid;
    border-color:#C3413D;
  }
  .cell-label-two{
  color: #999999;
  font-size: 30px;
}
</style>
<script>
  import api from '../../../config/url.apis';
  import TopBar from '../../components/TopBar.vue'
  import { WxcCell } from 'weex-ui';
  export default {
    components: {TopBar,WxcCell},
    data: () => ({
      app:{},
      contentHeight:weex.config.eros.realDeviceHeight-weex.config.eros.navBarHeight-weex.config.eros.statusBarHeight-100,
      cell:{
        height:150
      },
      addressList:[]
    }),
    created () {
      this.app = this.$storage.getSync('app')
      this.$router.getParams().then(resData => {
        })
        this.getAddressList();
    },
    mounted(){
    },
    beforeCreate() {
    },
    methods: {  
        getAddressList (){
          let that = this;
          this.$fetch({
                method: 'GET',    
                url: api.AddressList + '?jsessionid=' + that.app.globalData.userInfo.jsessionid,
                data: {
                }
            }).then(res => {
                if (res.tips.isOk) {
                    this.addressList=res.data
                }
            }, error => {
            })
        },
        addressAddOrUpdate(){
            
        },
        selectAddress(id,index){
            this.app.globalData.addressInfo = this.addressList[index];
            this.$router.open({
                    name: 'pages.home.good.addressAdd',
                    navShow : false,
                    params:{}
                })
        }
    }
  };
</script>