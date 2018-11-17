<template>
  <div>
    <top-bar></top-bar>
    <wxc-cell v-if="!!checkedAddress"  :has-top-border="false"
                :auto-accessible="false"
                :has-arrow="true"
                :cell-style="cell"
                @wxcCellClicked="selectAddress">
                <text slot="label" class="cell-label-one" v-if="checkedAddress.isDefault =='1'">默认</text>
                <text class="cell-content-one" slot="title">{{checkedAddress.province+checkedAddress.city+checkedAddress.district + checkedAddress.address}}</text>
                </wxc-cell>
    <wxc-cell v-else :has-top-border="false"
    :auto-accessible="false"
    :has-arrow="true"
    :cell-style="cell"
    @wxcCellClicked="addAddress">
    <text slot="label" class="cell-label-two">还没有收货地址,去添加</text>
    </wxc-cell>
    <wxc-cell style="margin-top:20px;margin-bottom:20px;" label="请选择优惠卷"
              :has-arrow="true"
              :extraContent="canUseCardCount+'张优惠卷'"
              @wxcCellClicked="chooseCards">
              </wxc-cell>
    <wxc-cell title="商品合计"
    :has-arrow="false"
    @wxcCellClicked="wxcCellClicked">
    <text class="extra-content-right">￥{{goodsTotalPrice}}</text>
    </wxc-cell>
    <wxc-cell title="运费"
    :has-arrow="false"
    @wxcCellClicked="wxcCellClicked">
    <text class="extra-content-right">￥{{freightPrice}}</text>
    </wxc-cell>
    <wxc-cell title="优惠卷"
    :has-arrow="false"
    @wxcCellClicked="wxcCellClicked">
    <text class="extra-content-right">-￥{{normalPrice}}</text>
    </wxc-cell>
    <wxc-cell style="margin-bottom:20px;" title="会员卡"
    :has-arrow="false"
    @wxcCellClicked="wxcCellClicked">
    <text class="extra-content-right">-￥{{merberPrice}}</text>
    </wxc-cell>
    <div class="cartGood-layout pub-layout" v-for="item in checkedGoodsList">
          <div style="flex:40;" class="pub-layout">
              <div style="flex:1;" class="cartGood-center pub-layout">
                  <image class="cartGood-image" resize="stretch" :src="item.listPicUrl"></image>
              </div>
              <div style="flex:3;justify-content: center;padding-left:12px;" class="pub-layout-two">
                  <text class="cartGood-center-font" style="height: 35px;overflow:hidden;">{{item.goodsName}}</text>
                  <text class="cartGood-center-font" style="color:#666;font-size:25px;">{{item.goodsSpecifitionNameValue}}</text>
                  <text class="cartGood-center-font">￥{{item.retailPrice}}</text>
              </div>
          </div>
          <div style="flex:5;justify-content: center;" class="pub-layout-two">
                        <text class="cartGood-center-font">x{{item.numbers}}</text>
          </div>
    </div>

    <div class="bottom-bar">
      <div style="flex:3;flex-wrap:nowrap;display: flex;justify-content: center;">
        <text style="color:#b4282d;">
          实付￥{{actualPrice}}
        </text>
      </div>
      <div style="flex:1;justify-content: center;align-items: center;background-color:#b4282d;">
        <text style="color:#fff;">去付款</text>
      </div>
    </div>
  </div>
</template>

<style scoped>
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
  .extra-content-right {
    font-size: 28px;
    margin-right: 4px;
  }
  .pub-layout{
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
}
.cartGood-center{
    align-items: center;
    justify-content: center;
}
.cartGood-center-font{
    color:#333;
    margin-bottom: 5px;
}
.pub-layout-two{
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
}
.cartGood-image{
    width: 120px;
    height: 120px;
    background-color:#f4f4f4;
}
.cartGood-layout{
    width: 750px;
    height: 140px;
    background-color:#fff;
    border-bottom-width:1px;
    border-bottom-style:solid;
    border-bottom-color:#d9d9d9;
}
.bottom-bar{
  width: 750px;
  height: 100px;
  position: fixed;
  bottom: 0px;
  display: flex;
  flex-direction: row;
  background-color:#fff;
}
.cell-label-two{
  color: #999999;
  font-size: 30px;
}
</style>
<script>
  import api from '../../../config/url.apis';
  import TopBar from '../../components/TopBar.vue'
  var util = require('../../util.js');
  import { WxcCell } from 'weex-ui';
  var status="0";
  export default {
    components: {TopBar,WxcCell},
    data: () => ({
      contentHeight:weex.config.eros.realDeviceHeight-weex.config.eros.navBarHeight-weex.config.eros.statusBarHeight,
      app:{},
      checkedGoodsList: [],
      checkedAddress: {},
      goodsTotalPrice: 0.00, //商品总价
      freightPrice: 0.00,    //快递费
      actualPrice: 0.00,     //实际需要支付的总价:商品总价-折扣+运费
      addressId: "",
      checkedNormalCard: {},//被选中 的优惠券
      checkedMemberCard: {},//被选中 的会员卡
      merbertext:"",//会员卡的优惠描述
      merberPrice:0,//会员卡共减少多少钱
      normaltext: "",//优惠券的优惠描述
      normalPrice: 0,//优惠券共减少多少钱
      canUseCardCount:0,
      remark:"",
      isGbuy:"",
      isGbuyNum:'0',
      cell:{
        height:150
      }
    }),
    created () {
      this.app = this.$storage.getSync('app')
      let that = this;
      // 页面显示
        var address=that.app.globalData.addressInfo;
        if (!util.isEmptyObject(address)){
              this.checkedAddress= address;
              this.addressId= address.id;
        }
        var info=that.app.globalData.orderCardInfo;
        if (!util.isEmptyObject(info)){
            this.actualPrice= info.actualPrice;     //实际需要支付的总价:商品总价-折扣+运费
            this.checkedNormalCard= info.checkedNormalCard;//被选中 的优惠券
            this.checkedMemberCard= info.checkedMemberCard;//被选中 的会员卡
            this.merbertext= info.merbertext;//会员卡的优惠描述
            this.merberPrice= info.merberPrice;//会员卡共减少多少钱
            this.normaltext= info.normaltext;//优惠券的优惠描述
            this.normalPrice= info.normalPrice;//优惠券共减少多少钱
        }
      this.$router.getParams().then(resData => {
           if (!!resData.isGbuy){
             //团购
           }else{
            //普通购买
              //获取商品信息。有则是立即购买。没有则是从购物车下单
              var buyItNow = that.app.globalData.buyItNowInfo;
              if (!util.isEmptyObject(buyItNow)) {
                status = "1";
                this.nowBuyGoodsInfo(buyItNow);
              } else {
                status = "0";
                //this.getCheckoutInfo();
              }
              //记得在data里面赋值
           }
        })
    },
    mounted(){
    },
    beforeCreate() {
    },
    methods: {  
      nowBuyGoodsInfo:function(buyItNow){
          let that = this;
          //获取商品信息。
          var checkedGoodsList = buyItNow.checkedGoodsList;
          var goodsTotalPrice = buyItNow.goodsTotalPrice;
          var actualPrice = buyItNow.actualPrice;
          this.checkedGoodsList= checkedGoodsList;
          this.goodsTotalPrice=goodsTotalPrice;
          this.actualPrice=goodsTotalPrice;
          this.$fetch({
                    method: 'GET',    
                    url: api.GetAddressAndPrice + '?jsessionid=' + that.app.globalData.userInfo.jsessionid,
                    data: {
                         addressId: that.addressId
                    }
                }).then(res => {
                    if (res.tips.isOk) {
                        that.checkedAddress= res.data.address;
                        that.freightPrice= res.data.freightPrice;
                        that.addressId= res.data.address == null ? '' : res.data.address.id;
                        that.app.globalData.addressInfo = res.data.address;
                        console.log(buyItNow);
                        console.log(res);
                    }
                }, error => {
                })
                //that.getCard(userInfo);
      },
      //开始团购商品
      nowGbuyGoodsInfo: function (gbuyData) {
          let that = this;
          //获取商品信息。
          var checkedGoodsList = gbuyData.checkedGoodsList;
          var goodsTotalPrice = gbuyData.goodsTotalPrice;
          var actualPrice = gbuyData.actualPrice;
          this.checkedGoodsList=checkedGoodsList;
          this.goodsTotalPrice=goodsTotalPrice;
          this.actualPrice=goodsTotalPrice;
          //获取地址信息，及运费
          this.$fetch({
                    method: 'GET',    
                    url: api.GetAddressAndPrice + '?jsessionid=' + that.app.globalData.userInfo.jsessionid,
                    data: {
                         addressId: that.addressId
                    }
                }).then(res => {
                    if (res.tips.isOk) {
                        this.checkedAddress=res.data.address,
                        this.freightPrice=res.data.freightPrice,
                        this.addressId= res.data.address == null ? '' : res.data.address.id
                        that.app.globalData.addressInfo = res.data.address;
                    }
                }, error => {
                })
                 that.getCard(that.app.globalData.userInfo);
        },
        getCard: function (user) {
            //默认使用会员卡。如果会员卡可与其他优惠同享。就选一张优惠券
            var that = this;
            var info = { sysId: that.app.globalData.sysId };
            this.$fetch({
                    method: 'GET',    
                    url: api.GetUserActiveCard + '?jsessionid=' + that.app.globalData.userInfo.jsessionid,
                    data: info
                }).then(res => {
                    if (res.tips.isOk) {
                        console.log("allCards");
                        console.log(res.data);
                        var allcards = res.data.data.resultCardList;
                        var noGetCards = res.data.data.noGetCards;
                        var normal = [];
                        var member = [];
                        var goodsList = that.checkedGoodsList;
                        var price = that.goodsTotalPrice;
                        //判断卡券是否可用（是否受分类、商品限制）
                        for (var i = 0; i < allcards.length; i++) {
                          var flag = 0;
                          if (price <(allcards[i].leastCost /100)){
                            allcards[i].canUse = false;
                            allcards[i].leastCostDisable = "订单金额需满" + allcards[i].leastCost / 100;
                            continue;
                          }
                          for (var j = 0; j < goodsList.length;j++) {
                            if (allcards[i].canUse) {
                              if (allcards[i].cardInfo.canUseCateloryIds != null && allcards[i].cardInfo.canUseCateloryIds.length > 0) {
                                //指定可用商品
                                if (allcards[i].cardInfo.acceptGoodsIds != null) {
                                  if ((allcards[i].cardInfo.acceptGoodsIds + "_").indexOf(goodsList[j].goodsId + "_") != -1) {
                                    flag = 0;
                                    break;
                                  } else {
                                    flag = 1;
                                  }
                                } else {
                                  //限制不可用商品以及分类的。
                                  var cate = allcards[i].cardInfo.canUseCateloryIds.map(function (item) { return item; }).join("_");
                                  if ((cate + "_").indexOf(goodsList[j].categoryId + "_") != -1) {
                                    //在可用分类中
                                    if (allcards[i].cardInfo.acceptGoodsIds != null) {
                                      if ((goodsList[j].goodsId + "_").indexOf(allcards[i].cardInfo.acceptGoodsIds) != -1) {
                                        flag = 2;
                                      } else {
                                        flag = 0;
                                        break;
                                      }
                                    }else{
                                        flag = 0;
                                        break;
                                    }

                                  } else {
                                    flag = 2;
                                  }

                                }
                              }
                            }
                          }
                          if (flag == 1) {
                            //console.log(allcards[i]);
                            allcards[i].canUse=false;
                            if (allcards[i].acceptGoods != null) {
                              allcards[i].goodsDisabled = "指定" + allcards[i].acceptGoods + "商品可用";
                            }
                          }
                          if (flag == 2) {
                            allcards[i].canUse = false;
                            var t = "";
                            if (allcards[i].acceptCategory != null) {
                              t += "指定" + allcards[i].acceptCategory + "分类可用；"
                            }
                            if (allcards[i].rejectCategory != null) {
                              t += "指定" + allcards[i].rejectCategory + "分类不可用；"
                            }
                            if (allcards[i].rejectGoods != null) {
                              t += "指定" + allcards[i].rejectGoods + "商品不可用；"
                            }
                            allcards[i].cateloryDisabled = t;
                          }
                        }

                        for (var i = 0; i < allcards.length; i++) {
                          if (allcards[i].cardInfo.cardType == 'MEMBER_CARD' && allcards[i].cardInfo.flowState == '1') {//会员卡
                            if (allcards[i].canUse && allcards[i].cardInfo.flowState == '1') {
                              member.push(allcards[i]);
                            }
                          } else if (allcards[i].cardInfo.cardType == 'CASH') {
                            //现金券
                            if (allcards[i].canUse) {
                              normal.push(allcards[i]);
                            }
                          } else if (allcards[i].cardInfo.cardType == 'DISCOUNT') {
                            //折扣券
                            if (allcards[i].canUse) {
                              normal.push(allcards[i]);
                            }
                          }
                        }
                        // console.log("可用");
                        // console.log(member);
                        // console.log(normal);
                        if (member.length > 0) {
                            this.checkedMemberCard=member[0]
                        }
                        if (normal.length > 0) {
                            this.canUseCardCount= normal.length
                          if (member.length<=0){
                              this.checkedNormalCard= normal[0]
                          }
                        }
                      
                    }
                }, error => {
                })
                that.getActualPrice();
          },
          getActualPrice: function () {
              // actualPrice=商品价格-折扣+运费；
              var that = this;
              //计算。所选优惠券省了多少钱
              //卡券
              var member = that.checkedMemberCard;
              var normal = that.checkedNormalCard;
              var goodsList = that.checkedGoodsList;
              var aprice = that.goodsTotalPrice;
              //console.log(that.checkedMemberCard);
              //console.log(that.checkedNormalCard);
              //先计算折扣。再计算会员卡

              if (!util.isEmptyObject(normal)) {
                this.useRuleFun(normal,aprice);
                let discount = (100 - normal.cardInfo.discount)/10;
                  this.normaltext= normal.cardInfo.reduceCost == null ? discount+ "折" : "减" + normal.cardInfo.reduceCost / 100 + "元",
                  this.normalPrice= parseInt((this.goodsTotalPrice - this.actualPrice)* 100) / 100
              }
              if (!util.isEmptyObject(member)) {
                this.useRuleFun(member,aprice);
                let mdiscount = (100 - member.cardInfo.discount) / 10;
                  this.merbertext= member.cardInfo.reduceCost == null ? mdiscount+"折":"减"+member.cardInfo.reduceCost/100+"元",
                  this.merberPrice= parseInt((this.goodsTotalPrice - this.actualPrice - this.normalPrice) * 100) / 100 
              }
                this.actualPrice= parseInt((this.actualPrice + this.freightPrice) * 100) / 100
            },
            getCheckoutInfo: function () {
              let that = this;
              this.$fetch({
                    method: 'GET',    
                    url: api.CartCheckout + '?jsessionid=' + that.app.globalData.userInfo.jsessionid,
                    data: {
                         addressId: that.addressId
                    }
                }).then(res => {
                    if (res.tips.isOk) {
                        this.checkedGoodsList= res.data.checkedGoodsList,
                        this.checkedAddress= res.data.checkedAddress,
                        this.freightPrice= res.data.freightPrice,
                        this.goodsTotalPrice= res.data.goodsTotalPrice,
                        this.addressId= res.data.checkedAddress== null ? '' : res.data.checkedAddress.id,
                        this.actualPrice= res.data.goodsTotalPrice
                    }
                }, error => {
                })
                that.app.globalData.addressInfo = res.data.checkedAddress;
                that.getCard(userInfo);
            },
            selectAddress(){
                this.$router.open({
                    name: 'pages.home.good.address',
                    navShow : false,
                    params:{}
                })
            },
            addAddress(){

            },
            chooseCards:function(){
              let that = this;
      this.app.globalData.orderCardInfo = {
      goodsTotalPrice: that.goodsTotalPrice,
      freightPrice: that.freightPrice,
      actualPrice: that.actualPrice,
      checkedNormalCard: that.checkedNormalCard,
      checkedMemberCard: that.checkedMemberCard,
      merbertext: that.merbertext,
      merberPrice: that.merberPrice,
      normaltext: that.normaltext,
      normalPrice: that.normalPrice,
      checkedGoodsList: that.checkedGoodsList
    }
    this.$router.open({
                    name: 'pages.home.good.useTicket',
                    navShow : false,
                    params:{}
                })
  },
            
    }
  };
</script>