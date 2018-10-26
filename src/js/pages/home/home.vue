<template>
    <div>
    <slider class="slider" auto-play="true" interval="5000" infinite="false">
        <div class="frame" v-for="img in imageList">
            <image class="image" resize="stretch" :src="img.src"></image>
        </div>
        <indicator class="indicator"></indicator>
    </slider>

    <div :class="['m-menu',channels.length>=5 ? 'm-menuMore' : '']">
              <span class="m-menu-item" v-for="item in channels" @click="jump(item.url)">
                <image class="m-image" :src="item.iconUrl"></image>
                <text class="m-menu-text">{{item.name}}</text>
              </span>
    </div>
    <home-brand></home-brand>
    <new-product></new-product>
    <popular-product></popular-product>
    <shop-selection></shop-selection>
    <good-grid :category-good="item" v-for="(item,index) in categoryGoodss" :key="index"></good-grid>
    </div>
</template>
<script>
  import HomeBrand from './components/HomeBrand.vue';
  import NewProduct from './components/NewProduct.vue';
  import PopularProduct from './components/PopularProduct.vue';
  import ShopSelection from './components/ShopSelection.vue';
  import GoodGrid from './components/GoodGrid.vue';
  var navigator = weex.requireModule('navigator');
  var modal = weex.requireModule('modal');
  export default {
  data () {
        return {
          imageList: [
          { src: 'https://gd2.alicdn.com/bao/uploaded/i2/T14H1LFwBcXXXXXXXX_!!0-item_pic.jpg'},
          { src: 'https://gd1.alicdn.com/bao/uploaded/i1/TB1PXJCJFXXXXciXFXXXXXXXXXX_!!0-item_pic.jpg'},
          { src: 'https://gd3.alicdn.com/bao/uploaded/i3/TB1x6hYLXXXXXazXVXXXXXXXXXX_!!0-item_pic.jpg'}
          ],
          channels: [{"id":"1","name":"居家","url":"/pages/category/category?id=1005000","iconUrl":"https://www.qingqinkj.com/arc/arc/image/mktv4i2u1/bgj991b88/2018/85/15/1bn9ynjr55.png","sortOrder":1,"locationId":"ksvw282f2","shopId":"gy9sc97vk","categoryId":null,"isToUrl":"1","isShow":"1"},
          {"id":"3","name":"配件","url":"/pages/category/category?id=1008000","iconUrl":"https://www.qingqinkj.com/arc/arc/image/mktv4i2u1/bgj991b88/2018/85/15/1bn828dhh2.png","sortOrder":3,"locationId":"ksvw282f2","shopId":"gy9sc97vk","categoryId":null,"isToUrl":"1","isShow":"1"},
          {"id":"4","name":"服装","url":"/pages/category/category?id=1005002","iconUrl":"http://yanxuan.nosdn.127.net/43e57d4208cdc78ac9c088f9b3e798f5.png","sortOrder":4,"locationId":"ksvw282f2","shopId":"gy9sc97vk","categoryId":"1035000","isToUrl":"0","isShow":"1"},
          {"id":"5","name":"志趣","url":"/pages/category/category?id=1019000","iconUrl":"http://yanxuan.nosdn.127.net/d6a7b9a2eb6af92d709429798a4ca3ea.png","sortOrder":5,"locationId":"ksvw282f2","shopId":"gy9sc97vk","categoryId":null,"isToUrl":"1","isShow":"1"}],
          categoryGoodss:[
             {"name":"服装","goodsList":[{"id":"1056002","categoryId":"1010002","goodsSn":"1056002","name":"男式玩色内裤","brandId":"0","goodsNumber":100,"keywords":null,"goodsBrief":"德国工艺，多色随搭","goodsDesc":null,"isOnSale":"1","addTime":null,"sortOrder":7,"isDelete":"0","attributeCategory":"0","isNew":"0","goodsUnit":"条","primaryPicUrl":"http://yanxuan.nosdn.127.net/fee5c31b4010b91ecc88e971b31f85e0.png","listPicUrl":"http://yanxuan.nosdn.127.net/922fdbe007033f7a88f7ebc57c3d1e75.png","primaryProductId":"1057029","promotionDesc":"限时购","promotionTag":null,"isLimited":"0","isHot":"0","shopLocationId":"ksvw282f2","retailPrice":1,"wholesalePrice":0,"purchasePrice":null,"floorPrice":null,"shopId":null,"locationName":null},{"id":"1074001","categoryId":"1010002","goodsSn":"1074001","name":"男式莫代尔无痕内裤","brandId":"0","goodsNumber":100,"keywords":null,"goodsBrief":"Bemis技术，极简无痕","goodsDesc":null,"isOnSale":"1","addTime":null,"sortOrder":8,"isDelete":"0","attributeCategory":"0","isNew":"0","goodsUnit":"件","primaryPicUrl":"http://yanxuan.nosdn.127.net/f8529d85ca41fa84abbad9affb5a071d.png","listPicUrl":"http://yanxuan.nosdn.127.net/73567265b04a9998f64419186ddd8531.png","primaryProductId":"1078001","promotionDesc":"限时购","promotionTag":null,"isLimited":"0","isHot":"0","shopLocationId":"ksvw282f2","retailPrice":1,"wholesalePrice":0,"purchasePrice":null,"floorPrice":null,"shopId":null,"locationName":null},{"id":"1092025","categoryId":"1010002","goodsSn":"1092025","name":"Let it go男式纯棉免洗内裤","brandId":"0","goodsNumber":100,"keywords":null,"goodsBrief":"伽玛射线安心杀菌","goodsDesc":null,"isOnSale":"1","addTime":null,"sortOrder":2,"isDelete":"0","attributeCategory":"0","isNew":"0","goodsUnit":"件","primaryPicUrl":"http://yanxuan.nosdn.127.net/3006cf6f854372683143571d3595dafc.jpg","listPicUrl":"http://yanxuan.nosdn.127.net/56a46e9a4832587471c0f9ad7c1b7d85.png","primaryProductId":"1097153","promotionDesc":"限时购","promotionTag":null,"isLimited":"0","isHot":"0","shopLocationId":"ksvw282f2","retailPrice":1,"wholesalePrice":0,"purchasePrice":null,"floorPrice":null,"shopId":null,"locationName":null}],"id":"1010000"},
             {"name":"婴童","goodsList":[{"id":"1033000","categoryId":"1020003","goodsSn":"1033000","name":"新生彩棉初衣礼盒（婴童）","brandId":"0","goodsNumber":100,"keywords":null,"goodsBrief":"来自天然彩棉的礼物","goodsDesc":null,"isOnSale":"1","addTime":null,"sortOrder":2,"isDelete":"0","attributeCategory":"0","isNew":"0","goodsUnit":"件","primaryPicUrl":"http://yanxuan.nosdn.127.net/d820f03d67e68071d30c922ea87eb023.png","listPicUrl":"http://yanxuan.nosdn.127.net/9aab9a0bf4fef8fe3dc8c732bc22d4b7.png","primaryProductId":"1032000","promotionDesc":"限时购","promotionTag":null,"isLimited":"0","isHot":"0","shopLocationId":"ksvw282f2","retailPrice":1,"wholesalePrice":0,"purchasePrice":null,"floorPrice":null,"shopId":null,"locationName":null},{"id":"1116004","categoryId":"1020003","goodsSn":"1116004","name":"条纹长袖海魂衫（男婴童）","brandId":"0","goodsNumber":100,"keywords":null,"goodsBrief":"A类一等品，无荧光承诺","goodsDesc":null,"isOnSale":"1","addTime":null,"sortOrder":6,"isDelete":"0","attributeCategory":"0","isNew":"0","goodsUnit":"件","primaryPicUrl":"http://yanxuan.nosdn.127.net/69e2463f7fb6b606f29af9f2b85c9562.jpg","listPicUrl":"http://yanxuan.nosdn.127.net/14d3a47ccf52815baf6df308be6db5a6.png","primaryProductId":"1118018","promotionDesc":"限时购","promotionTag":null,"isLimited":"0","isHot":"0","shopLocationId":"ksvw282f2","retailPrice":1,"wholesalePrice":0,"purchasePrice":null,"floorPrice":null,"shopId":null,"locationName":null},{"id":"1116005","categoryId":"1020003","goodsSn":"1116005","name":"条纹长袖海魂衫（女婴童）","brandId":"0","goodsNumber":100,"keywords":null,"goodsBrief":"纯棉亲肤娃娃衫","goodsDesc":null,"isOnSale":"1","addTime":null,"sortOrder":5,"isDelete":"0","attributeCategory":"0","isNew":"0","goodsUnit":"件","primaryPicUrl":"http://yanxuan.nosdn.127.net/24db6b40ecc02d111f136918a3ee0e29.jpg","listPicUrl":"http://yanxuan.nosdn.127.net/71937456c3cd654f936f619201a79c09.png","primaryProductId":"1118030","promotionDesc":"限时购","promotionTag":null,"isLimited":"0","isHot":"0","shopLocationId":"ksvw282f2","retailPrice":1,"wholesalePrice":0,"purchasePrice":null,"floorPrice":null,"shopId":null,"locationName":null}],"id":"1011000"},
             {"name":"杂货","goodsList":[{"id":"1039056","categoryId":"1012003","goodsSn":"1039056","name":"金属亚光钢笔","brandId":"0","goodsNumber":100,"keywords":null,"goodsBrief":"铱金暗尖，超顺书写","goodsDesc":null,"isOnSale":"1","addTime":null,"sortOrder":6,"isDelete":"0","attributeCategory":"0","isNew":"0","goodsUnit":"件","primaryPicUrl":"http://yanxuan.nosdn.127.net/9a98c755c0a5d2a13557eaeddf64930d.png","listPicUrl":"http://yanxuan.nosdn.127.net/3e14e82a44c3a250af63df4c29c572d0.png","primaryProductId":"1038077","promotionDesc":"限时购","promotionTag":null,"isLimited":"0","isHot":"0","shopLocationId":"ksvw282f2","retailPrice":1,"wholesalePrice":0,"purchasePrice":null,"floorPrice":null,"shopId":null,"locationName":null},{"id":"1046001","categoryId":"1012003","goodsSn":"1046001","name":"按动式三角中油笔","brandId":"0","goodsNumber":100,"keywords":null,"goodsBrief":"进口笔尖，无毒油墨","goodsDesc":null,"isOnSale":"1","addTime":null,"sortOrder":8,"isDelete":"0","attributeCategory":"0","isNew":"0","goodsUnit":"支","primaryPicUrl":"http://yanxuan.nosdn.127.net/d43304129d1d77039689b9c116dd2218.png","listPicUrl":"http://yanxuan.nosdn.127.net/74583e585825ecacb11f7c53d2021e00.png","primaryProductId":"1044001","promotionDesc":"限时购","promotionTag":null,"isLimited":"0","isHot":"0","shopLocationId":"ksvw282f2","retailPrice":1,"wholesalePrice":0,"purchasePrice":null,"floorPrice":null,"shopId":null,"locationName":null},{"id":"1046002","categoryId":"1012003","goodsSn":"1046002","name":"直杆三角中性笔","brandId":"0","goodsNumber":100,"keywords":null,"goodsBrief":"合金笔尖，高强度笔身","goodsDesc":null,"isOnSale":"1","addTime":null,"sortOrder":9,"isDelete":"0","attributeCategory":"0","isNew":"0","goodsUnit":"支","primaryPicUrl":"http://yanxuan.nosdn.127.net/c63cfb6cfda3959cb09e3dcfc1eef399.png","listPicUrl":"http://yanxuan.nosdn.127.net/eb486cfe807c4fe5696aa59cbcf1f96a.png","primaryProductId":"1044002","promotionDesc":"限时购","promotionTag":null,"isLimited":"0","isHot":"0","shopLocationId":"ksvw282f2","retailPrice":1,"wholesalePrice":0,"purchasePrice":null,"floorPrice":null,"shopId":null,"locationName":null}],"id":"1012000"},
             {"name":"洗护","goodsList":[{"id":"1006051","categoryId":"1008001","goodsSn":"1006051","name":"皇室御用超柔毛巾","brandId":"0","goodsNumber":100,"keywords":null,"goodsBrief":"至柔至软，热销50万条","goodsDesc":null,"isOnSale":"1","addTime":null,"sortOrder":1,"isDelete":"0","attributeCategory":"0","isNew":"0","goodsUnit":"条","primaryPicUrl":"http://yanxuan.nosdn.127.net/de30c41b94ce203985a228dc787fdcfa.jpg","listPicUrl":"http://yanxuan.nosdn.127.net/ad5a317216f9da495b144070ecf1f957.png","primaryProductId":"1006120","promotionDesc":"限时购","promotionTag":null,"isLimited":"0","isHot":"1","shopLocationId":"ksvw282f2","retailPrice":1,"wholesalePrice":0,"purchasePrice":null,"floorPrice":null,"shopId":null,"locationName":null},{"id":"1009027","categoryId":"1008001","goodsSn":"1009027","name":"皇室御用超柔毛巾80s","brandId":"0","goodsNumber":100,"keywords":null,"goodsBrief":"轻柔舒适不掉毛","goodsDesc":null,"isOnSale":"1","addTime":null,"sortOrder":2,"isDelete":"0","attributeCategory":"0","isNew":"0","goodsUnit":"条","primaryPicUrl":"http://yanxuan.nosdn.127.net/35ad21679dbd30a23a8308287ffd4673.jpg","listPicUrl":"http://yanxuan.nosdn.127.net/71cfd849335c498dee3c54d1eb823c17.png","primaryProductId":"1008061","promotionDesc":"限时购","promotionTag":null,"isLimited":"0","isHot":"0","shopLocationId":"ksvw282f2","retailPrice":1,"wholesalePrice":0,"purchasePrice":null,"floorPrice":null,"shopId":null,"locationName":null},{"id":"1021000","categoryId":"1008001","goodsSn":"1021000","name":"埃及进口长绒棉毛巾","brandId":"0","goodsNumber":100,"keywords":null,"goodsBrief":"厚实舒适","goodsDesc":null,"isOnSale":"1","addTime":null,"sortOrder":7,"isDelete":"0","attributeCategory":"0","isNew":"0","goodsUnit":"条","primaryPicUrl":"http://yanxuan.nosdn.127.net/96c20e15c503ff5e358a150148f2f352.jpg","listPicUrl":"http://yanxuan.nosdn.127.net/7191f2599c7fe44ed4cff7a76e853154.png","primaryProductId":"1122018","promotionDesc":"限时购","promotionTag":null,"isLimited":"0","isHot":"0","shopLocationId":"ksvw282f2","retailPrice":1,"wholesalePrice":0,"purchasePrice":null,"floorPrice":null,"shopId":null,"locationName":null}],"id":"1013001"},
             {"name":"志趣","goodsList":[{"id":"1152004","categoryId":"1032000","goodsSn":"1152004","name":"魔兽世界 蛋盾包 双肩包","brandId":"0","goodsNumber":100,"keywords":null,"goodsBrief":"伊利丹掉落，挤地铁神器","goodsDesc":null,"isOnSale":"1","addTime":null,"sortOrder":3,"isDelete":"0","attributeCategory":"0","isNew":"0","goodsUnit":"件","primaryPicUrl":"http://yanxuan.nosdn.127.net/4aee427a3837db29aa116900a46b1a6a.png","listPicUrl":"http://yanxuan.nosdn.127.net/8c93cef435d888bd79833777df1cd0c2.png","primaryProductId":"1156012","promotionDesc":"限时购","promotionTag":null,"isLimited":"0","isHot":"0","shopLocationId":"ksvw282f2","retailPrice":1,"wholesalePrice":0,"purchasePrice":null,"floorPrice":null,"shopId":null,"locationName":null},{"id":"1152008","categoryId":"1032000","goodsSn":"1152008","name":"魔兽世界 部落 护腕 一只","brandId":"0","goodsNumber":100,"keywords":null,"goodsBrief":"吸汗、舒适、弹性、防护、耐用","goodsDesc":null,"isOnSale":"1","addTime":null,"sortOrder":7,"isDelete":"0","attributeCategory":"0","isNew":"0","goodsUnit":"件","primaryPicUrl":"http://yanxuan.nosdn.127.net/46bcddbc57e70bf5f36bdff9c9195c65.png","listPicUrl":"http://yanxuan.nosdn.127.net/203cb83d93606865e3ddde57b69b9e9a.png","primaryProductId":"1156016","promotionDesc":"限时购","promotionTag":null,"isLimited":"0","isHot":"1","shopLocationId":"ksvw282f2","retailPrice":1,"wholesalePrice":0,"purchasePrice":null,"floorPrice":null,"shopId":null,"locationName":null},{"id":"1152009","categoryId":"1032000","goodsSn":"1152009","name":"魔兽世界 联盟 护腕 一只","brandId":"0","goodsNumber":100,"keywords":null,"goodsBrief":"吸汗、舒适、弹性、防护、耐用","goodsDesc":null,"isOnSale":"1","addTime":null,"sortOrder":8,"isDelete":"0","attributeCategory":"0","isNew":"0","goodsUnit":"件","primaryPicUrl":"http://yanxuan.nosdn.127.net/6df415dbe9b30aa8ae45301a96c18a59.png","listPicUrl":"http://yanxuan.nosdn.127.net/ae6d41117717387b82dcaf1dfce0cd97.png","primaryProductId":"1156017","promotionDesc":"限时购","promotionTag":null,"isLimited":"0","isHot":"1","shopLocationId":"ksvw282f2","retailPrice":1,"wholesalePrice":0,"purchasePrice":null,"floorPrice":null,"shopId":null,"locationName":null}],"id":"1019000"},
             {"name":"居家","goodsList":[{"id":"1021004","categoryId":"1008009","goodsSn":"1021004","name":"澳洲羊羔毛AB面盖毯","brandId":"1001020","goodsNumber":100,"keywords":null,"goodsBrief":"冬暖夏凉，吸湿排汗。","goodsDesc":null,"isOnSale":"1","addTime":null,"sortOrder":32,"isDelete":"0","attributeCategory":"0","isNew":"0","goodsUnit":"件","primaryPicUrl":"http://yanxuan.nosdn.127.net/ee906abd9b2aa273ad28ea544fdac479.png","listPicUrl":"http://yanxuan.nosdn.127.net/654b02045fde802b51d5bbf09a8b75f2.png","primaryProductId":"1019010","promotionDesc":"限时购","promotionTag":null,"isLimited":"0","isHot":"0","shopLocationId":"ksvw282f2","retailPrice":1,"wholesalePrice":0,"purchasePrice":null,"floorPrice":null,"shopId":null,"locationName":null},{"id":"1064002","categoryId":"1017000","goodsSn":"1064002","name":"秋冬加厚条纹宠物窝","brandId":"1015000","goodsNumber":100,"keywords":null,"goodsBrief":"时尚牛仔，加厚温暖","goodsDesc":null,"isOnSale":"1","addTime":null,"sortOrder":6,"isDelete":"0","attributeCategory":"0","isNew":"0","goodsUnit":"件","primaryPicUrl":"http://yanxuan.nosdn.127.net/5e80c410c68ac2663cb886c0434a278d.jpg","listPicUrl":"http://yanxuan.nosdn.127.net/48dbfe207b2203ef45055dcc9cedbe60.png","primaryProductId":"1066002","promotionDesc":"限时购","promotionTag":null,"isLimited":"0","isHot":"0","shopLocationId":"ksvw282f2","retailPrice":1,"wholesalePrice":0,"purchasePrice":null,"floorPrice":null,"shopId":null,"locationName":null},{"id":"1030001","categoryId":"1008002","goodsSn":"1030001","name":"160*230羊毛手工地毯","brandId":"0","goodsNumber":100,"keywords":"羊毛","goodsBrief":"印度进口，手工编织，简约百搭","goodsDesc":null,"isOnSale":"1","addTime":null,"sortOrder":25,"isDelete":"0","attributeCategory":"0","isNew":"0","goodsUnit":"件","primaryPicUrl":"http://yanxuan.nosdn.127.net/ca0d9199db70d7b7f2b9b2ea673c74a4.jpg","listPicUrl":"http://yanxuan.nosdn.127.net/88dc5d80c6f84102f003ecd69c86e1cf.png","primaryProductId":"1029001","promotionDesc":"限时购","promotionTag":null,"isLimited":"0","isHot":"0","shopLocationId":"ksvw282f2","retailPrice":1,"wholesalePrice":0,"purchasePrice":null,"floorPrice":null,"shopId":null,"locationName":null}],"id":"1005000"},
             {"name":"餐厨","goodsList":[{"id":"1038004","categoryId":"1005007","goodsSn":"1038004","name":"100年传世珐琅锅 马卡龙系列","brandId":"0","goodsNumber":100,"keywords":null,"goodsBrief":"均匀导热，释放美味","goodsDesc":null,"isOnSale":"1","addTime":null,"sortOrder":2,"isDelete":"0","attributeCategory":"0","isNew":"0","goodsUnit":"只","primaryPicUrl":"http://yanxuan.nosdn.127.net/293018c87f7a9e8cfe2b3e62ff7f4216.jpg","listPicUrl":"http://yanxuan.nosdn.127.net/4d3d3eaeb872860539d7faa59f9f84e9.png","primaryProductId":"1037022","promotionDesc":"限时购","promotionTag":null,"isLimited":"0","isHot":"0","shopLocationId":"ksvw282f2","retailPrice":1,"wholesalePrice":0,"purchasePrice":null,"floorPrice":null,"shopId":null,"locationName":null},{"id":"1051000","categoryId":"1005007","goodsSn":"1051000","name":"Carat钻石炒锅30cm","brandId":"0","goodsNumber":100,"keywords":null,"goodsBrief":"安全涂层，轻便无烟","goodsDesc":null,"isOnSale":"1","addTime":null,"sortOrder":7,"isDelete":"0","attributeCategory":"0","isNew":"0","goodsUnit":"只","primaryPicUrl":"http://yanxuan.nosdn.127.net/fd939503a33960aea571c9f29d76053b.png","listPicUrl":"http://yanxuan.nosdn.127.net/e564410546a11ddceb5a82bfce8da43d.png","primaryProductId":"1052001","promotionDesc":"限时购","promotionTag":null,"isLimited":"0","isHot":"0","shopLocationId":"ksvw282f2","retailPrice":1,"wholesalePrice":0,"purchasePrice":null,"floorPrice":null,"shopId":null,"locationName":null},{"id":"1051001","categoryId":"1005007","goodsSn":"1051001","name":"Carat钻石煎锅28cm","brandId":"0","goodsNumber":100,"keywords":null,"goodsBrief":"耐磨涂层，导热迅速","goodsDesc":null,"isOnSale":"1","addTime":null,"sortOrder":8,"isDelete":"0","attributeCategory":"0","isNew":"0","goodsUnit":"只","primaryPicUrl":"http://yanxuan.nosdn.127.net/f0c000ef41a6c5d6bffa7cc8cbaf6e95.png","listPicUrl":"http://yanxuan.nosdn.127.net/f53ed57d9e23fda7e24dfd0e0a50c5d1.png","primaryProductId":"1052004","promotionDesc":"限时购","promotionTag":null,"isLimited":"0","isHot":"0","shopLocationId":"ksvw282f2","retailPrice":1,"wholesalePrice":0,"purchasePrice":null,"floorPrice":null,"shopId":null,"locationName":null}],"id":"1005001"},
             {"name":"配件","goodsList":[{"id":"1085019","categoryId":"1012001","goodsSn":"1085019","name":"20寸 纯PC“铝框”（非全铝）登机箱","brandId":"0","goodsNumber":100,"keywords":null,"goodsBrief":"铝质包角，牢固抗摔","goodsDesc":null,"isOnSale":"1","addTime":null,"sortOrder":2,"isDelete":"0","attributeCategory":"0","isNew":"0","goodsUnit":"件","primaryPicUrl":"http://yanxuan.nosdn.127.net/f819d7ddd1287106efea3736817cf25f.png","listPicUrl":"http://yanxuan.nosdn.127.net/65c955a7a98e84d44ca30bb88a591eac.png","primaryProductId":"1090081","promotionDesc":"限时购","promotionTag":null,"isLimited":"0","isHot":"0","shopLocationId":"ksvw282f2","retailPrice":1,"wholesalePrice":0,"purchasePrice":null,"floorPrice":null,"shopId":null,"locationName":null},{"id":"1113019","categoryId":"1012001","goodsSn":"1113019","name":"20寸 PC膜拉链登机箱","brandId":"0","goodsNumber":100,"keywords":null,"goodsBrief":"热卖9万只，网易人手1只","goodsDesc":null,"isOnSale":"1","addTime":null,"sortOrder":1,"isDelete":"0","attributeCategory":"0","isNew":"0","goodsUnit":"件","primaryPicUrl":"http://yanxuan.nosdn.127.net/2687b2a39cd77cf184cf387dc4cbb6af.png","listPicUrl":"http://yanxuan.nosdn.127.net/ad504bb389039ff35c4cd6ae912be87e.png","primaryProductId":"1114089","promotionDesc":"限时购","promotionTag":null,"isLimited":"0","isHot":"0","shopLocationId":"ksvw282f2","retailPrice":1,"wholesalePrice":0,"purchasePrice":null,"floorPrice":null,"shopId":null,"locationName":null},{"id":"1143016","categoryId":"1012001","goodsSn":"1143016","name":"112升 纯PC拉链斜纹拉杆箱","brandId":"0","goodsNumber":100,"keywords":null,"goodsBrief":"容量升级，全家一箱搞定","goodsDesc":null,"isOnSale":"1","addTime":null,"sortOrder":6,"isDelete":"0","attributeCategory":"0","isNew":"0","goodsUnit":"件","primaryPicUrl":"http://yanxuan.nosdn.127.net/122e27c15197386f454f74176183d202.png","listPicUrl":"http://yanxuan.nosdn.127.net/e56c6239ee4a641ce2a4565c6babb43e.png","primaryProductId":"1150007","promotionDesc":"限时购","promotionTag":null,"isLimited":"0","isHot":"0","shopLocationId":"ksvw282f2","retailPrice":1,"wholesalePrice":0,"purchasePrice":null,"floorPrice":null,"shopId":null,"locationName":null}],"id":"1008000"}
          ],

        }
      },
    components: {
     "home-brand":HomeBrand,
     "new-product":NewProduct,
     "popular-product":PopularProduct,
     "shop-selection":ShopSelection,
     "good-grid":GoodGrid
    },
    methods: {
      wxcButtonClicked (e) {
        console.log(e)
        this.$router.push({path: '/Hello'});
      },
      jump (url) {
      this.$router.push({path: '/Hello'});
        /*
          navigator.push({
            url: '/Hello',
            animated: "true"
          }, event => {
            modal.toast({ message: 'callback: ' + event })
          })
          */
        }
    }
  }
</script>
<style scoped>
  .iconfont {
          font-family:iconfont;
      }
      .image {
          width: 750px;
          height: 430px;
      }
      .slider {
          width: 750px;
          height: 430px;
      }
      .frame {
          width: 750px;
          height: 430px;
          position: relative;
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

  .m-menu {
    display: flex;
    min-height: 140px;
    width: 750px;
    flex-direction:row;
    flex-wrap:wrap;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .m-menuMore {
    justify-content: flex-start;
  }

  .m-menu-item {
    width: 150px;
  }

  .m-image {
    display: block;
    width: 68px;
    height: 68px;
    margin: 0 40px;
    margin-bottom: 12px;
  }

  .m-menu-text {
    display: block;
    font-size: 24px;
    line-height: 30px;
    color: #333;
    text-align: center;
  }

</style>