<template>
  <div>
  <top-bar></top-bar>
        <scroller class="item-container" :style="{ height: contentHeight + 'px' }">
        <div v-if="!openAttr">
        <div>
            <slider class="slider" auto-play="true" interval="5000" infinite="false" >
                <div class="frame" @click="previewImg">
                    <image class="image" resize="stretch" :src="goodsInfo.primaryPicUrl"></image>
                </div>
                <div class="frame" @click="previewImg">
                    <image class="image" resize="stretch" :src="goodsInfo.listPicUrl"></image>
                </div>
                <div class="frame" v-for="img in gallerys" @click="previewImg">
                    <image class="image" resize="stretch" :src="img.imgUrl"></image>
                </div>
                <indicator class="indicator"></indicator>
            </slider>
         </div>
        <three-tag></three-tag>
        <div class="three-info">
            <text class="three-info-txt-a three-info-hidden">{{goodsInfo.name}}</text>
            <text class="three-info-txt-b three-info-hidden">{{goodsInfo.goodsBrief}}</text>
            <text class="three-info-txt-c three-info-hidden">￥{{goodsInfo.retailPrice}}</text>
        </div>
        <div>
             <wxc-cell title="请选择规格数量"
                :has-arrow="true"
                @wxcCellClicked="switchAttrPop"
                :has-top-border="true"></wxc-cell>
        </div>
        <div style="height:20px;"></div>
        <div v-if="!!comments&&comments.length>0">
            <wxc-cell title="评价"
                    :has-arrow="true"
                    @wxcCellClicked="gotoComments"
                    :has-bottom-border="true"></wxc-cell>
            <div class="comments-box">
             <div class="com-box-a">
                 <div class="com-box-a-left">
                     <image style="height:80px;width:80px;border-radius: 130px;margin-left:20px" resize="stretch" :src="comments[0].headimgurl"></image>
                     <text style="margin-left:20px;" class="three-info-hidden">{{comments[0].nickname}}</text>
                 </div>
                 <div class="com-box-a-right">
                     <text class="three-info-hidden">{{comments[0].addTime}}</text>
                 </div>
             </div>
             <div class="com-box-b">
                <div class="com-box-a-right">
                 <text class="three-info-hidden" style="margin-left:20px;">{{comments[0].remark}}</text>
                </div>
             </div>
             <div class="com-box-b" v-if="!!comments[0].picList&&comments[0].picList.length > 0">
                 <image style="height:80px;width:80px;margin-left:10px;" v-for="i in comments[0].picList" resize="stretch" :src="i.picUrl"></image>
             </div>
            </div>
        </div>
        <div>
                    <wxc-cell title="商品详情"
                        :has-arrow="true"
                        @wxcCellClicked="showGoodsDetail"
                        :has-top-border="true" :has-bottom-border="false"></wxc-cell>
                </div>
        <div class="goods-attr" v-if="!!goodsAttributes&&goodsAttributes.length>0">
            <wxc-cell title="商品参数"
                :has-arrow="false"
                @wxcCellClicked="wxcCellClicked"
                :has-top-border="true" :has-bottom-border="false"></wxc-cell>
                <div class="goodsAttributes" v-for="item in goodsAttributes">
                    <div class="goodsAttLayout">
                        <div style="flex:1;"><text class="goodsAttText" style="color:#999;">{{item.name}}</text></div>
                        <div style="flex:3;"><text style="color:#333;" class="goodsAttText">{{item.value}}</text></div>
                    </div>
                </div>
        </div>
        
        <div class="issuesLayout">
            <text style="text-align: center;width:750px;height:100px;line-height:100px;">--常见问题--</text>
            <div class="issuesone" v-for="item in issues">
                <div class="question-box"><text>{{item.question}}</text></div>
                <div class="answer" style="color:#787878;"><text style="color:#787878;">{{item.answer}}</text></div>
            </div>
        </div>
        <div>
            <text class="issuesLayout" style="text-align: center;width:750px;height:100px;line-height:100px;">--大家都在看--</text>
            <good-grid v-if="relatedGoods.length>0" :categoryGood="relatedGoods"></good-grid>
        </div>
        </div>
        <div :style="{ height: contentHeight + 'px','background-color':'#fff'}" v-else>
            <div style="padding-left:40px;padding-top:20px;" class="attr-one">
                <image style="width:200px;height:200px;" resize="stretch" :src="proImg"></image>
                <div style="padding-left:20px" class="attr-one-right" >
                    <div class="attr-right-com"><text>价格:</text><text style="padding-left:20px">{{retailPrice}}</text></div>
                    <div class="attr-right-com"><text>已选择:</text><text style="padding-left:20px">{{checkedSpecText}}</text></div>
                    <div class="attr-right-com"><text>库存:</text><text style="padding-left:20px">{{skuNum}}</text></div>
                </div>
            </div>
            <div style="margin-left:40px;margin-top:40px;" v-for="(item,sidx) in specifications">
                <text>{{item.name}}</text>
                <div style="display:flex;flex-direction: row;flex-wrap:wrap;">
                <div :class="[vitem.checked ? 'isselected' : '','selected-box',vitem.canBuy?'':'disable']" v-for="(vitem,idx) in item.valueList" @click="clickSkuValue(sidx,idx)">
                    <text style="text-overflow: ellipsis;" :class="[vitem.checked ? 'isselected' : '']">{{vitem.value}}</text>
                </div>
                </div>
            </div>
            <!-- <div style="padding-left:40px;padding-top:40px;">
                <text>颜色</text>
            </div> -->
            <div style="padding-left:40px;padding-top:40px;">
                <text>数量</text>
                <stepper style="margin-top:20px;margin-left:25px;" :value="sumValue" :read-only="true" min="1"
                             @wxcStepperValueCutNumber="cutNumber" @wxcStepperValueAddNumber="addNumber"></stepper>
            </div>

        </div>
    </scroller>
    
    <div class="bar-bottom" :style="{'height': tabbarHeight}">
        <div style="flex:2;" class="box-o"  @click="closeAttrOrCollect">
            <image class="icon" resize="stretch" :src="collectBackImage"></image>
        </div>
        <div style="flex:2;" class="box-o" @click="goShopPage">
            <div style="width:60px;height:60px;position:relative;">
            <image class="icon" resize="stretch" src="bmlocal://assets/images/ic_menu_shoping_nor.png"></image>
            <text class="cart-count">{{cartGoodsCount}}</text>
            </div>
        </div>
        <div style="flex:3;background-color:#fc0000;" class="box-buy" @click="buyItNow">
            <text class="txt">立即购买</text>
        </div>    
        <div style="flex:3;background-color:#089bf0;" class="box-cantBuy" @click="pingTuanFun">
            <text class="txt" style="text-decoration:line-through;">拼团购买</text>
        </div>
        <div v-if="gbuyGroupId==''" style="flex:3;" :class="[canBuyIt?'canbox-shop':'nobox-shop']" @click="addToCart">
            <text class="txt">{{canBuyIt?'加入购物车':'已售罄'}}</text>
        </div> 
        <div v-if="gbuyGroupId!=''&&AllSpecPass==true&&canBuyIt==false&&canGbuy==false" style="flex:3;" class="nobox-shop">
            <text class="txt">该规格已售罄</text>
        </div> 
        <div v-else-if="gbuyGroupId!=''&&AllSpecPass==true&&canBuyIt==true&&canGbuy==false" style="flex:3;" class="nobox-shop">
            <text class="txt">该规格不支持团购</text>
        </div> 
        <div v-else-if="gbuyGroupId!=''&&AllSpecPass==true&&canBuyIt==true&&canGbuy==true" style="flex:3;" class="canbox-shop" @click="pingTuanFun">
            <text class="txt">团购价￥{{gbuyPrice}}</text>
        </div> 
        <div v-if="gbuyGroupId!=''&&AllSpecPass==false" style="flex:3;" class="canbox-shop">
            <text class="txt">请选择完整规格</text>
        </div>
    </div>
  </div>
</template>

<style lang="sass" scoped>
  .item-container {
    width: 750px;
    background-color: #f2f3f4;
  }
  .bar-bottom{
    position: fixed;
    bottom: 0px;
    width: 750px;
    background-color: #fff;
    display: flex;;
    flex-direction: row;
    flex-wrap:nowrap;
  }
  .box-o{
    border-right-width: 1px;
    border-right-style:solid;
    border-right-color: #f4f4f4;
    display:flex;
    align-items:center;
    justify-content:center;
  }
  .icon{
      width: 50px;
      height: 50px;
  }
  .cart-count{
    height: 28px;
    width: 28px;
    z-index: 10;
    position: absolute;
    top: 0;
    right:0;
    background-color: #b4282d;
    text-align: center;
    font-size: 18px;
    color: #fff;
    line-height: 28px;
    border-radius: 130px;
  }
  .box-buy{
    border-right-width: 1px;
    border-right-style:solid;
    border-right-color: #f13000;
  }
  .box-cantBuy{
    border-right-width: 1px;
    border-right-style:solid;
    border-right-color: #089bf0;
  }
  .txt{
        color:#fff;
        text-align:center;
        line-height:120px;
    }
.indicator {
        width: 750px;
        height: 40px;
        item-color: white;
        item-selected-color: #b4282d;
        item-size: 12px;
        position: absolute;
        bottom: 10px;
        right: 0px;
    }
    .image {
          width: 750px;
          height: 630px;
      }
    .slider {
        width: 750px;
        height: 630px;
    }
    .frame {
        width: 750px;
        height: 630px;
        position: relative;
    }
    .three-info{
        width:750px;
        height:250px;
        background-color:#fff;
        display:flex;
        flex-direction:column;
        flex-wrap:nowrap;
        justify-content:center;
        align-items:center;
    }
    .three-info-txt-a{
        font-size:60px;
        height:60px;
    }
    .three-info-hidden{overflow:hidden;}
    .three-info-txt-b{
        font-size:20px;
        height:20px;
        color:#999;
         margin-top:20px;
    }
    .three-info-txt-c{
        margin-top:20px;
        font-size:40px;
        color:#b4282d;
        height:40px;
    }
    .comments-box{
        background-color:#fff;
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
        height:100px;
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
    }
    .goods-attr{
        width:750px;
        background-color:#fff;
    }
    .goodsAttLayout{
        display: flex;;
    flex-direction: row;
    flex-wrap:nowrap;
        background-color:#f7f7f7;
        height:60px;
        margin-top:20px;
    }
    .goodsAttributes{padding:0px 20px;margin-bottom:20px;}
    .goodsAttText{
        font-size:50px;
    }
    .issuesLayout{
        background-color:#fff;
    }
    .issuesone{
        margin-bottom:10px;
    }
    .question-box{
        padding-left:20px;
    }
    .answer{
        padding-left:40px;
    }
    .attr-one{
        display:flex;
        flex-direction:row;
    }
    .attr-one-right{
        display:flex;
        flex-direction:column;
        justify-content:center;

        height:200px;
    }
    .attr-right-com{
        display:flex;
        flex-direction:row;
        flex-wrap:nowrap;
        height:50px;
    }
    .selected-box{
        width:150px;
        height:80px;
        align-items: center;
        justify-content: center;
        opacity: 1;
        border-width:1px;
        border-style:solid;
        border-color:#333;
        margin-top:30px;
        margin-left:20px;
    }
    .disable{
        border-width:1px;
        border-style:dotted;
        border-color:#424141;
        color: #424141;
    }
    .isselected{
        background-color:red;
        color: #fff;
    }
    .nobox-shop{
        background-color:#b6b6b6;
        border-right-width: 1px;
        border-right-style:solid;
        border-right-color: #b6b6b6;
    }
    .canbox-shop{
        background-color:#4c7903;
        border-right-width: 1px;
        border-right-style:solid;
        border-right-color: #4c7903;
    } 
</style>
<script>
  import {Utils} from 'weex-ui';
  import api from '../../../config/url.apis';
  import TopBar from '../../components/TopBar.vue'
  import ThreeTag from '../../components/ThreeTag.vue'
  import { WxcCell } from 'weex-ui';
  import GoodGrid from '../components/GoodGridTwo.vue'
  import stepper from '../../cart/stepper.vue'
  export default {
    components: {TopBar,ThreeTag,WxcCell,GoodGrid,stepper},
    data: () => ({
      app:{},
      id:'',
      page: 1,
      size: 10,
      goodsInfo:{},
      collectBackImage: "bmlocal://assets/images/icon_collect.png",
      noCollectImage: "bmlocal://assets/images/icon_collect.png",
      hasCollectImage: "bmlocal://assets/images/icon_collect_e.png",
      gallerys:[],
      tabbarHeight: weex.config.eros.tabbarHeight ? weex.config.eros.tabbarHeight : 120,
      contentHeight:weex.config.eros.realDeviceHeight-weex.config.eros.tabbarHeight-weex.config.eros.navBarHeight-weex.config.eros.statusBarHeight,
      comments: [],
      commentsTotal:0,
      goodsAttributes: [],
      issues: [],
      relatedGoods:[],
      openAttr:false,
      checked:false,
      specifications:[],
      productStocks: [],
      sumValue:{numbers:1},
      retailPrice:0,
      checkedSpecText: '请选择规格数量',
      skuNum: '请选择完整规格',
      canBuyIt: true,
      canGbuy: false,
      selectProductId: "", //选中的商品规格编号
      gbuyGoodsDataList: [], //商品拼团活动信息
      priceRange: "", //价格范围，最低规格价~最高规格价，如40~50
      initialImages: "", //初始商品图片，防止被覆盖
      proImg: "http://ac-3yr0g9cz.clouddn.com/6e5176bd6545b72e130a.png",//某规格图片
      number:1,
      cartGoodsCount:0,
      AllSpecPass: false,
      gbuyGroupId: "",//参团(商品活动表ID)
    }),
    created () {
        this.app = this.$storage.getSync('app')
        var that = this;
      this.$router.getParams().then(resData => {
            that.id= resData.item.id;
            that.goodsInfo = resData.item;
            this.getGoodsGallerys();
            this.getGoodsComments();
            this.getGoodsAttributes();
            this.getGoodsIssues();
            this.getGoodsInfo();
            this.getGoodsSpecifications();
            this.getCartGoodsCount();
        })
    },
    mounted(){    
    },
    beforeCreate() {
    },
    methods: {
        previewImg(e){
            var images = [];
            images.push(this.goodsInfo.primaryPicUrl);
            images.push(this.goodsInfo.listPicUrl);
            this.gallerys.forEach(element => {
                images.push(element.imgUrl);
            });
          this.$image.preview({
            index:0,
            images:images,
          });
        },
      getGoodsGallerys: function () {
            var that = this;
            this.$fetch({
                    method: 'GET',    
                    url: api.GoodsGallerys + '?jsessionid=' + that.app.globalData.userInfo.jsessionid +"&authId="+that.app.globalData.authId,
                    data: {
                         goodsId: that.id 
                    }
                }).then(res => {
                    if (res.tips.isOk) {
                        this.gallerys=res.data
                    }
                }, error => {
                })
        },
        getGoodsComments: function () {
            var that = this;
            this.$fetch({
                    method: 'GET',    
                    url: api.GoodsComments + '?jsessionid=' + that.app.globalData.userInfo.jsessionid +"&authId="+that.app.globalData.authId,
                    data: {
                         goodsId: that.id 
                    }
                }).then(res => {
                    if (res.tips.isOk) {
                        this.comments=res.data;
                        this.commentsTotal=res.total;
                    }
                }, error => {
                })
        },
        getGoodsAttributes: function () {
            var that = this;
            this.$fetch({
                    method: 'GET',    
                    url: api.GoodsAttributes + '?jsessionid=' + that.app.globalData.userInfo.jsessionid +"&authId="+that.app.globalData.authId,
                    data: {
                         goodsId: that.id 
                    }
                }).then(res => {
                    if (res.tips.isOk) {
                        this.goodsAttributes=res.data;
                    }
                }, error => {
                })
        },
        getGoodsIssues: function () {
            var that = this;
            this.$fetch({
                    method: 'GET',    
                    url: api.GoodsIssues + '?jsessionid=' + that.app.globalData.userInfo.jsessionid +"&authId="+that.app.globalData.authId,
                    data: {
                         goodsId: that.id 
                    }
                }).then(res => {
                    if (res.tips.isOk) {
                        this.issues=res.data;
                    }
                }, error => {
                })
        },
        getGoodsInfo: function () {
            var that = this;
            this.$fetch({
                    method: 'GET',    
                    url: api.GoodsInfo + '?jsessionid=' + that.app.globalData.userInfo.jsessionid +"&authId="+that.app.globalData.authId,
                    data: {
                         goodsId: that.id 
                    }
                }).then(res => {
                    if (res.tips.isOk) {
                       //console.log(res);
                       let goodsInfo = res.data
                       that.getGoodsRelated(goodsInfo.categoryId, goodsInfo.id); 
                    }
                }, error => {
                })
        },
        getGoodsSpecifications: function () {
            var that = this;
            this.$fetch({
                    method: 'GET',    
                    url: api.GoodsSpecifications + '?jsessionid=' + that.app.globalData.userInfo.jsessionid +"&authId="+that.app.globalData.authId,
                    data: {
                         goodsId: that.id 
                    }
                }).then(res => {
                    if (res.tips.isOk) {
                       var sl = res.data.specifications;
                        var pl = res.data.productStocks;
                        var priceList = [];
                        if (pl.length <= 0) {
                        for (var i = 0; i < sl.length; i++) {
                            var slValues = sl[i].valueList;
                            for (var j = 0; j < slValues.length; j++) {
                            slValues[j].canBuy = false;
                            priceList.push(slValues[j].retailPrice);
                            }
                        }
                        } else {
                        for (var i = 0; i < sl.length; i++) {
                            var slValues = sl[i].valueList;
                            for (var j = 0; j < slValues.length; j++) {
                            slValues[j].canBuy = false;
                            slValues[j].goodsNumber = 0;
                            slValues[j].retailPrice = that.goodsInfo.retailPrice;
                            for (var k = 0; k < pl.length; k++) {
                                if (pl[k].goodsSpecificationIds.indexOf("_") != -1) {
                                if ((pl[k].goodsSpecificationIds + "_").indexOf(slValues[j].id + "_") != -1) {
                                    slValues[j].canBuy = true;
                                    slValues[j].goodsNumber = pl[k].goodsNumber;
                                    slValues[j].retailPrice = pl[k].retailPrice;
                                    priceList.push(slValues[j].retailPrice);
                                    break;
                                }
                                } else if (pl[k].goodsSpecificationIds == slValues[j].id) {
                                slValues[j].canBuy = true;
                                slValues[j].goodsNumber = pl[k].goodsNumber;
                                slValues[j].retailPrice = pl[k].retailPrice;
                                priceList.push(slValues[j].retailPrice);
                                break;
                                }
                            }

                            }
                        }
                        }
                        that.specifications=sl;
                        that.productStocks=res.data.productStocks;
                    }
                }, error => {
                })
        },
        getGoodsRelated: function (categoryId, goodsId) {
            let that = this;
            let indexDataFloorGoods = that.app.indexData.categoryGoodss
            let categoryList = that.app.indexData.categoryTree.children
            categoryList.forEach(c => {
            let children = c.children;
            if (children != null && children.length > 0) {
                if (children.some(ca => ca.id == categoryId)) {
                if (indexDataFloorGoods != null && indexDataFloorGoods.length > 0) {
                    indexDataFloorGoods.forEach(category => {
                    if (c.id == category.id) {
                        that.relatedGoods=category.goodsList;
                    }
                    })
                }
                }
            }
            })   
        },
        clickSkuValue(sidx,idx){
            let that = this;
            let _specifications = this.specifications;
            let vlist = _specifications[sidx].valueList;
            //除了选中的外，其他全部改为false
            for (let i = 0; i < vlist.length; i++) {
                if (i != idx) {
                    vlist[i].checked = false;
                }
            }
            //如果已经选中，则反选
            if (vlist[idx].checked) {
            vlist[idx].checked = false;
            } else {
            vlist[idx].checked = true;
            }
            this.specifications= _specifications;
            this.canBuyIt= vlist[idx].canBuy;
            this.changeSpecInfo();
            if (this.isCheckedAllSpec()) {
            //判断规格是否存在
            if (this.haveGoodsSpecification()) {
                var num = this.getsku();
                //库存不足
                if (!num > 0) {
                    that.canBuyIt= false
                }
            } else {
                that.canBuyIt=false;
                that.showBottomPrice=false;
            }
                that.AllSpecPass= true;
                that.skuNum= num;//某规格库存
                that.retailPrice= this.getRetailPrice();
                that.showBottomPrice= true;
                that.proImg= this.getGoodsSpeImg();
            } else {
                that.AllSpecPass=false;
                that.skuNum='请选择完整规格';//某规格库存
                that.retailPrice=this.priceRange;
                that.showBottomPrice=false;
                that.canGbuy=false;
            }
            this.haveGbuyActivityForSpe();
        },
        changeSpecInfo: function () {
            let checkedNameValue = this.getCheckedSpecValue();
            //设置选择的信息
            let checkedValue = checkedNameValue.filter(function (v) {
            if (v.valueId != 0) {
                return true;
            } else {
                return false;
            }
            }).map(function (v) {
            return v.valueText;
            });
            if (checkedValue.length > 0) {
                this.checkedSpecText= checkedValue.join('　')
            } else {
                this.checkedSpecText='请选择规格数量'
            }
        },
        //判断规格是否选择完整
        isCheckedAllSpec: function () {
            return !this.getCheckedSpecValue().some(function (v) {
            if (v.valueId == 0) {
                return true;
            }
            });
        },
         //判断选中的规格组合是否存在(解决出现6_7和7_6不相等的情况)
        haveGoodsSpecification: function () {
            var that = this
            var res = false;
            //取得选中的规格组合
            let goodsSpeciId = this.getCheckedSpecKey();
            //取得当前存在的规格列表
            let _productStocks = this.productStocks;
            _productStocks.forEach(item => {
            var speList = [];
            var spe = [];
            var temp = item.goodsSpecificationIds;
            spe = temp.split("_");
            speList.push(spe);

            speList.forEach(selectSpeciIds => {
                var goodsSpeciIdArr = [];
                if (goodsSpeciId.indexOf("_") != -1) {
                //如果存在多规格组合情况
                goodsSpeciIdArr = goodsSpeciId.split("_");
                //进行排序之后判断两者是否相同
                var a = goodsSpeciIdArr.sort().toString();
                var b = selectSpeciIds.sort().toString();
                if (a == b) {
                    that.selectProductId=item.id
                    res = true;
                }
                } else {
                goodsSpeciIdArr.push(goodsSpeciId);
                //单规格情况
                //判断两者是否相同
                if (goodsSpeciIdArr.toString() == selectSpeciIds.toString()) {
                    that.selectProductId=item.id
                    res = true;
                }
                }
            })
            })
            return res;
        },
        getCheckedSpecKey: function () {
            let checkedValue = this.getCheckedSpecValue().map(function (v) {
            return v.valueId;
            });
            //排序
            checkedValue = checkedValue.sort();
            return checkedValue.join('_');
        },
        getCheckedSpecValue: function () {
            let checkedValues = [];
            let _specifications = this.specifications;
            for (let i = 0; i < _specifications.length; i++) {
            let _checkedObj = {
                nameId: _specifications[i].specificationId,
                valueId: 0,
                valueText: ''
            };

            for (let j = 0; j < _specifications[i].valueList.length; j++) {
                if (_specifications[i].valueList[j].checked) {
                _checkedObj.valueId = _specifications[i].valueList[j].id;
                _checkedObj.valueText = _specifications[i].valueList[j].value;
                }
            }
            checkedValues.push(_checkedObj);
            }
            return checkedValues;

        },
        getsku: function () {
            var res = 0;
            let selectProductId = this.selectProductId;
            this.productStocks.forEach(item => {
            if (item.id == selectProductId) {
                res = item.goodsNumber;
            }
            })
            return res;
        },
        haveGbuyActivityForSpe: function () {

            //取得选中的规格id集合
            let CheckedSpecKeys = this.getCheckedSpecKey();
            let gbuyGoodsDataList = this.gbuyGoodsDataList;
            if (gbuyGoodsDataList.length > 0) {
            for (var i = 0; i < gbuyGoodsDataList.length; i++) {
                var goodsSpeciId = gbuyGoodsDataList[i].goodsSpeciIds;
                if (goodsSpeciId == CheckedSpecKeys) {
                    this.canGbuy=true,
                    this.gbuyPrice=gbuyGoodsDataList[i].gbuyPrice
                return;
                }
            }
            //该规格不存在团购活动，不能拼团
                this.canGbuy= false;
                this.gbuyPrice= '';
            } else {
            //商品所有规格都不支持拼团
                this.canGbuy= false;
                this.gbuyPrice= '';
            }
        },
        //取得产品价格（规格组合后）
        getRetailPrice: function () {
            var res = '';
            let _productStocks = this.productStocks;
            let selectProductId = this.selectProductId;
            _productStocks.forEach(item => {
            if (item.id == selectProductId) {
                if (item.retailPrice != "" && item.retailPrice != undefined) {
                res = item.retailPrice;
                }
                return;
            }
            })
            return res;
        },
        //取得规格图,没有规格图则返回原图
        getGoodsSpeImg: function () {
            var res = this.initialImages;
            let _productStocks = this.productStocks;
            let selectProductId = this.selectProductId;
            _productStocks.forEach(item => {
            if (item.id == selectProductId) {
                if (item.goodsSpeImg != "" && item.goodsSpeImg != undefined) {
                res = item.goodsSpeImg;
                }
                return;
            }
            })
            return res;
        },
        cutNumber: function (e) {
            //let number= (valObj.number - 1 > 1) ? valObj.number - 1 : 1
            this.number= e.numbers
            console.log(this.number);
        },
        addNumber: function (e) {
            //number: this.data.number + 1
            this.number= e.numbers
            console.log(this.number);
        },
        switchAttrPop: function () {
            if (this.openAttr == false) {
                this.openAttr=!this.openAttr;
            }
        },
        addToCart(){
            let that = this;
            if(!this.canBuyIt){
                return;
            }
            if (this.openAttr == false) {
                this.openAttr=!this.openAttr;
            }else{
                if (!this.isCheckedAllSpec()) {
                    this.$notice.toast({
                        message:'请选择完整规格'
                    });
                    return false;
                }
                let checkedProduct = this.getCheckedProductItem();
                if (checkedProduct.length <= 0 || checkedProduct.goodsNumber < this.number) {
                    this.$notice.toast({
                        message:'没有库存'
                    });
                    return false;
                }
                if(!that.app.globalData.userInfo.userid){
                    this.$notice.toast({
                        message: '请先登陆'
                    })
                    return;
                }
                this.$fetch({
                    method: 'POST',    
                    url: api.CartAdd + '?jsessionid=' + that.app.globalData.userInfo.jsessionid+"&authId="+that.app.globalData.authId,
                    data: {
                         goodsId: that.id,
                         numbers: this.number, 
                         productId: checkedProduct[0].id, 
                         locationId: this.goodsInfo.shopLocationId
                    }
                }).then(res => {
                    if (res.tips.isOk) {
                        this.$notice.toast({message:'添加成功'});
                        this.openAttr=!that.openAttr
                        this.cartGoodsCount=that.number + that.cartGoodsCount
                        // if (that.data.userHasCollect == 1) {
                        //         this.collectBackImage=that.hasCollectImage
                        //     } else {
                        //         this.collectBackImage=that.noCollectImage
                        //     }
                    }else{
                        this.$notice.toast({message:'添加失败'});
                    }
                }, error => {
                })
            }

        },
        buyItNow: function () {
            var that = this;
            if(!that.canBuyIt){
                return;
            }
            if (this.openAttr == false) {
                that.openAttr= !this.openAttr
            }else{
                if (!this.isCheckedAllSpec()) {
                    this.$notice.toast({
                        message:'请填写规格'
                    });
                    return false;
                }
                let checkedProduct = this.getCheckedProductItem();
                //验证库存
                if (checkedProduct.length <= 0 || checkedProduct.goodsNumber < this.number) {
                    //找不到对应的product信息，提示没有库存
                    this.$notice.toast({
                        message:'没有库存'
                    })
                    return false;
                }
                if(!that.app.globalData.userInfo.userid){
                    this.$notice.toast({
                        message: '请先登陆'
                    })
                    return;
                }
                //到购买页面。checkout页面。
                var ids = checkedProduct[0].goodsSpecificationIds;
                var idArr = [];
                if (ids.indexOf("_") != -1) {
                    idArr = ids.split("_");
                } else {
                    idArr.push(ids);
                }
                var values = this.getSpecifiValue(idArr);
                var uc = {
                    goodsId: this.goodsInfo.id,
                    goodsSn: this.goodsInfo.goodsSn,
                    productId: checkedProduct[0].id,
                    goodsName: this.goodsInfo.name,
                    marketPrice: this.goodsInfo.retailPrice,
                    retailPrice: this.goodsInfo.retailPrice,
                    numbers: this.number,
                    goodsSpecifitionIds: checkedProduct[0].goodsSpecificationIds,
                    listPicUrl: this.goodsInfo.listPicUrl,
                    goodsSpecifitionNameValue: values,
                    shopId: this.goodsInfo.shopId,
                    locationId: this.goodsInfo.shopLocationId,
                    locationName: this.goodsInfo.locationName
                }
                var list = [];
                list.push(uc);

                var goodsTotalPrice = this.retailPrice * this.number;
                var bin = {
                    checkedGoodsList: list,
                    goodsTotalPrice: parseInt(goodsTotalPrice * 100) / 100,
                    actualPrice: parseInt(goodsTotalPrice * 100) / 100
                }
                that.app.globalData.buyItNowInfo = bin;
                this.$storage.setSync('app', that.app)
                //跳转到购买页面
                this.$router.open({
                    name: 'pages.home.checkout',
                    navShow : false,
                    params:{}
                })
            }
        },
        pingTuanFun: function () {
            var that = this;
            
            if (this.openAttr == false) {
                that.openAttr= !this.openAttr
            }else{
                
            }
        },
        wxcCellClicked(e){
            console.log(e);
        },
        showGoodsDetail(){
          var that = this;
          this.$router.open({
            name: 'pages.home.goodsDetail',
            navShow : false,
            params:{id:that.id}
        })
        },
        getCartGoodsCount: function () {
            var that = this;
            if(!that.app.globalData.userInfo.userid){
                this.$notice.toast({
                    message: '请先登陆'
                })
                return;
            }
            this.$fetch({
                    method: 'GET',    
                    url: api.CartGoodsCount + '?jsessionid=' + that.app.globalData.userInfo.jsessionid,
                    data: {
                         goodsId: that.id 
                    }
                }).then(res => {
                    if (res.tips.isOk) {
                        let data = res.data
                        if (data == null) {
                        data = 0
                        }
                        this.cartGoodsCount=data;
                    }
                }, error => {
                })
        },
        getCheckedProductItem: function () {
            let selectProductId = this.selectProductId;
            return this.productStocks.filter(function (v) {
            if (v.id == selectProductId) {
                return true;
            } else {
                return false;
            }
            });
        },
        getSpecifiValue: function (ids) {
            var values = "";
            var splist = this.specifications;
            var allList = [];
            for (var i = 0; i < splist.length; i++) {
            var vlist = splist[i].valueList;
            allList = allList.concat(vlist);
            }
            for (var j = 0; j < ids.length; j++) {
            for (var i = 0; i < allList.length; i++) {
                if (allList[i].id == ids[j]) {
                if (j == (ids.length - 1)) {
                    values += allList[i].value;
                } else {
                    values += allList[i].value + ";";
                }
                break;
                }
            }
            }

            return values;
        },
        goShopPage(){
            this.$router.setBackParams({
                name: 'goShop'
            })
            this.$router.back({
                length: 1,
                type: 'PUSH',
                callback() {
                }
            })
        },
        gotoComments(){
           let that = this;
            this.$router.open({
                name: 'pages.home.good.comment',
                navShow : false,
                params:{valueId:that.goodsInfo.id,typeId:0}
            })
        },
        closeAttrOrCollect(){
            var that = this;
            this.$fetch({
                    method: 'POST',    
                    url: api.CollectAddOrDelete + '?jsessionid=' + that.app.globalData.userInfo.jsessionid + "&authId="+that.app.globalData.authId,
                    data: {
                        typeId: "0", 
                        valueId: that.id, 
                        locationId: that.goodsInfo.shopLocationId
                    }
                }).then(res => {
                    if (res.tips.isOk) {
                        if (res.data.type == 'add') {
                                this.collectBackImage= that.hasCollectImage
                            } else {
                                this.collectBackImage= that.noCollectImage
                            }
                    }
                }, error => {
                })
        }
    }
  };
</script>