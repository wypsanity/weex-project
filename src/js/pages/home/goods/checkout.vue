<template>
  <div>
    <top-bar></top-bar>
    <text>付款页面</text>
  </div>
</template>

<style scoped>
</style>
<script>
  import api from '../../../config/url.apis';
  import TopBar from '../../components/TopBar.vue'
  var util = require('../../util.js');
  export default {
    components: {TopBar},
    data: () => ({
      contentHeight:weex.config.eros.realDeviceHeight-weex.config.eros.navBarHeight-weex.config.eros.statusBarHeight,
      app:{},

    }),
    created () {
      this.app = this.$storage.getSync('app')
      let that = this;
      this.$router.getParams().then(resData => {
          console.log(resData);
           if (!!resData.isGbuy){
             //团购
           }else{
            //普通购买
              //获取商品信息。有则是立即购买。没有则是从购物车下单
              var buyItNow = that.app.globalData.buyItNowInfo;
              if (!util.isEmptyObject(buyItNow)) {
                //status = "1";
                //this.nowGbuyGoodsInfo(gbuyData);
                console.log(buyItNow);
              } else {
                console.log("为空");
                console.log(buyItNow);
                //status = "0";
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
    }
  };
</script>