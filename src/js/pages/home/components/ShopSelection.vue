<template>
    <!-- 店铺精选 -->
         <div class="newproduct-section" v-if="locationList.length>0">
            <div>
            <text class="type-title font-md">店铺精选</text>
            </div>
            <div class="shop-box" v-for="(item,index) in locationList" v-if="index < 4">
                <div class="box-left">
                    <image class="box-image" :src="item.imgs[0].url" resize="stretch" v-if="item.imgs!=null"></image>
                    <text v-if="item.imgs==null" style="text-align:center">暂无图片</text>
                </div>
                <div class="box-right">
                    <text class="shopName">{{item.businessName}}</text>
                    <div class="bottomInfo">
                        <text class="font-Info">类别：{{item.categories}}</text>
                        <div class="row-info">
                            <text class="yellowStar" v-if="item.locationScore!=null&&floatToInt(item.locationScore)<6" v-for="i in floatToInt(item.locationScore)">★</text>
                            <text class="white" v-for="x in getOver(item.locationScore)">☆</text>
                            <text class="font-size-Info">月售：{{item.sale.monthlySale==null || item.sale.monthlySale==''? '0': item.sale.monthlySale}}笔</text>
                        </div>
                        <text class="font-size-Info font-info-margin">{{item.province}}{{item.city}}{{item.district}}{{item.address}}</text>
                         <div class="special-layout">
                             <text class='specials' v-if="item.specialList.length>0" v-for="val in item.specialList"> {{val}} </text>
                        </div>
                    </div>
                </div>
            </div>
         </div>
</template>
<script>
  export default {
   computed:{
   },
   data () {
        return {
         locationList:[
         {"courierScore":null,"businessName":"优衣库中心店","specialList":["免费wifi","免费停车","送货上门"],"isonline":"1","province":"广东省","showProdSty":"新页面显示","staPrice":12,"serviceScore":null,"isorder":"1","storeAnn":"<p>123</p>","id":"i8fi87886","goodsScore":null,"showServPro":"1","haveSpe":true,"custPho":"不进行短信验证","isdeliver":"1","imgs":[{"remoteUrl":null,"id":"1czfk88td4","url":"https://gss0.bdstatic.com/94o3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike80%2C5%2C5%2C80%2C26/sign=ba4de5d8788b4710da22f59ea2a7a898/a1ec08fa513d2697590215a45ffbb2fb4216d871.jpg","shopLocationId":"i8fi87886"},{"remoteUrl":null,"id":"1czfkfa2ia","url":"https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1854831445,3007361011&fm=27&gp=0.jpg","shopLocationId":"i8fi87886"}],"isdeal":"0","offlineMes":"21","maxRange":21,"busUrl":"arc/archiveAttachment/2018/7sejvhm12/2018/7sf3g1y/2018/415/11/i8f7k2tc1.jpg","showSaleNum":"1","district":"番禺区","disFreePrice":null,"orderMes":"12","foodUrl":null,"week":"星期一-星期三-星期日","city":"广州市","showPhone":"1","avgPrice":2,"pageAnn":"321","firstImg":null,"openAddSer":"0","showStyle":"中图标展示","sortId":"ge6gx847e","categories":"服装,玩具","deliModel":"固定配送费、起送价","ordersMess":"如：不要辣、12点前送到","address":"南村镇番禺大道(原迎宾路)万博中心A2栋1-2层","openCom":"1","locationScore":null,"remarksLabel":"232","disPrice":12,"freePrice":2,"secondImg":null,"serviceName":null,"hotGoodsList":null,"thirdImg":null,"showUnit":"0","special":"免费wifi-免费停车-送货上门","sale":{"annualSale":"","dailySale":"","monthlySale":""},"showBus":"1","openPageAnn":"1","addressPro":"如：XX小区5号楼318","oredePrefix":"3232","ispickup":"1"},
         {"courierScore":4,"businessName":"泮溪服装店","specialList":["免费wif"],"isonline":null,"province":"广东省","showProdSty":null,"staPrice":null,"serviceScore":3,"isorder":null,"storeAnn":null,"id":"ksvw282f2","goodsScore":5,"showServPro":null,"haveSpe":true,"custPho":null,"isdeliver":null,"imgs":[{"remoteUrl":null,"id":"1drdaa374r","url":"http://img1.nz86.com/upload/picture/system/17/16/9/1298497508174647.jpg","shopLocationId":"ksvw282f2"}],"isdeal":null,"offlineMes":null,"maxRange":null,"busUrl":null,"showSaleNum":null,"district":"荔湾区","disFreePrice":null,"orderMes":null,"foodUrl":null,"week":null,"city":"广州市","showPhone":null,"avgPrice":20,"pageAnn":null,"firstImg":null,"openAddSer":null,"showStyle":null,"sortId":null,"categories":"服装,玩具","deliModel":null,"ordersMess":null,"address":"龙津西路151","openCom":null,"locationScore":4.5,"remarksLabel":null,"disPrice":null,"freePrice":null,"secondImg":null,"serviceName":null,"hotGoodsList":[{"id":"1036002","categoryId":"1008008","goodsSn":"1036002","name":"高山苦荞麦枕","brandId":"0","goodsNumber":100,"keywords":null,"goodsBrief":"原生苦荞，健康护颈","goodsDesc":null,"isOnSale":"1","addTime":null,"sortOrder":5,"isDelete":"0","attributeCategory":"1008008","isNew":"0","goodsUnit":"件","primaryPicUrl":"https://www.qingqinkj.com/arc/arc/image/mktv4i2u1/bgj991b88/2018/85/15/1bnskvd4e1.jpg","listPicUrl":"https://www.qingqinkj.com/arc/arc/image/mktv4i2u1/bgj991b88/2018/85/15/1bnsb23b2t.png","primaryProductId":"1035005","promotionDesc":"限时购","promotionTag":null,"isLimited":"0","isHot":"1","shopLocationId":"ksvw282f2","retailPrice":1,"wholesalePrice":0,"purchasePrice":null,"floorPrice":null,"shopId":null,"locationName":null},{"id":"1006051","categoryId":"1008001","goodsSn":"1006051","name":"皇室御用超柔毛巾","brandId":"0","goodsNumber":100,"keywords":null,"goodsBrief":"至柔至软，热销50万条","goodsDesc":null,"isOnSale":"1","addTime":null,"sortOrder":1,"isDelete":"0","attributeCategory":"0","isNew":"0","goodsUnit":"条","primaryPicUrl":"http://yanxuan.nosdn.127.net/de30c41b94ce203985a228dc787fdcfa.jpg","listPicUrl":"http://yanxuan.nosdn.127.net/ad5a317216f9da495b144070ecf1f957.png","primaryProductId":"1006120","promotionDesc":"限时购","promotionTag":null,"isLimited":"0","isHot":"1","shopLocationId":"ksvw282f2","retailPrice":1,"wholesalePrice":0,"purchasePrice":null,"floorPrice":null,"shopId":null,"locationName":null},{"id":"1009012","categoryId":"1008008","goodsSn":"1009012","name":"可水洗舒柔丝羽绒枕","brandId":"0","goodsNumber":100,"keywords":null,"goodsBrief":"超细纤维，蓬松轻盈回弹","goodsDesc":null,"isOnSale":"1","addTime":null,"sortOrder":2,"isDelete":"0","attributeCategory":"0","isNew":"0","goodsUnit":"件","primaryPicUrl":"http://yanxuan.nosdn.127.net/3f2cc7a7e4472aa40c997e70efe6aeed.jpg","listPicUrl":"http://yanxuan.nosdn.127.net/a196b367f23ccfd8205b6da647c62b84.png","primaryProductId":"1008022","promotionDesc":"限时购","promotionTag":null,"isLimited":"0","isHot":"1","shopLocationId":"ksvw282f2","retailPrice":1,"wholesalePrice":0,"purchasePrice":null,"floorPrice":null,"shopId":null,"locationName":null},{"id":"1011004","categoryId":"1036000","goodsSn":"1011004","name":"色织精梳AB纱格纹空调被","brandId":"1001000","goodsNumber":100,"keywords":null,"goodsBrief":"加大加厚，双色精彩","goodsDesc":null,"isOnSale":"1","addTime":null,"sortOrder":2,"isDelete":"0","attributeCategory":"0","isNew":"0","goodsUnit":"件","primaryPicUrl":"http://yanxuan.nosdn.127.net/4de19773ac86263bc5f474c1351c6df4.png","listPicUrl":"http://yanxuan.nosdn.127.net/0984c9388a2c3fd2335779da904be393.png","primaryProductId":"1010014","promotionDesc":"限时购","promotionTag":null,"isLimited":"0","isHot":"1","shopLocationId":"ksvw282f2","retailPrice":1,"wholesalePrice":0,"purchasePrice":null,"floorPrice":null,"shopId":null,"locationName":null},{"id":"1019006","categoryId":"1008008","goodsSn":"1019006","name":"植物填充护颈夜交藤枕","brandId":"0","goodsNumber":100,"keywords":null,"goodsBrief":"健康保护枕","goodsDesc":null,"isOnSale":"1","addTime":null,"sortOrder":7,"isDelete":"0","attributeCategory":"0","isNew":"0","goodsUnit":"件","primaryPicUrl":"http://yanxuan.nosdn.127.net/8d6f1d95b4e15bfda45410be6a9d83c2.jpg","listPicUrl":"http://yanxuan.nosdn.127.net/60c3707837c97a21715ecc3986a744ce.png","primaryProductId":"1017014","promotionDesc":"限时购","promotionTag":null,"isLimited":"0","isHot":"1","shopLocationId":"ksvw282f2","retailPrice":1,"wholesalePrice":0,"purchasePrice":null,"floorPrice":null,"shopId":null,"locationName":null},{"id":"1084003","categoryId":"1008009","goodsSn":"1084003","name":"纯棉美式绞花针织盖毯","brandId":"1001020","goodsNumber":100,"keywords":null,"goodsBrief":"美式提花，温暖舒适","goodsDesc":null,"isOnSale":"1","addTime":null,"sortOrder":31,"isDelete":"0","attributeCategory":"0","isNew":"0","goodsUnit":"件","primaryPicUrl":"http://yanxuan.nosdn.127.net/e27258c0f82c96459326abd61c38c69b.jpg","listPicUrl":"http://yanxuan.nosdn.127.net/cf40c167e7054fe184d49f19121f63c7.png","primaryProductId":"1089017","promotionDesc":"限时购","promotionTag":null,"isLimited":"0","isHot":"1","shopLocationId":"ksvw282f2","retailPrice":1,"wholesalePrice":0,"purchasePrice":null,"floorPrice":null,"shopId":null,"locationName":null},{"id":"1092026","categoryId":"1010002","goodsSn":"1092026","name":"let it go女式纯棉免洗内裤","brandId":"0","goodsNumber":100,"keywords":null,"goodsBrief":"100%纯棉，出行必备","goodsDesc":null,"isOnSale":"1","addTime":null,"sortOrder":1,"isDelete":"0","attributeCategory":"0","isNew":"1","goodsUnit":"件","primaryPicUrl":"http://yanxuan.nosdn.127.net/3006cf6f854372683143571d3595dafc.jpg","listPicUrl":"http://yanxuan.nosdn.127.net/56a46e9a4832587471c0f9ad7c1b7d85.png","primaryProductId":"1097157","promotionDesc":"限时购","promotionTag":null,"isLimited":"0","isHot":"1","shopLocationId":"ksvw282f2","retailPrice":1,"wholesalePrice":0,"purchasePrice":null,"floorPrice":null,"shopId":null,"locationName":null},{"id":"1152008","categoryId":"1032000","goodsSn":"1152008","name":"魔兽世界 部落 护腕 一只","brandId":"0","goodsNumber":100,"keywords":null,"goodsBrief":"吸汗、舒适、弹性、防护、耐用","goodsDesc":null,"isOnSale":"1","addTime":null,"sortOrder":7,"isDelete":"0","attributeCategory":"0","isNew":"0","goodsUnit":"件","primaryPicUrl":"http://yanxuan.nosdn.127.net/46bcddbc57e70bf5f36bdff9c9195c65.png","listPicUrl":"http://yanxuan.nosdn.127.net/203cb83d93606865e3ddde57b69b9e9a.png","primaryProductId":"1156016","promotionDesc":"限时购","promotionTag":null,"isLimited":"0","isHot":"1","shopLocationId":"ksvw282f2","retailPrice":1,"wholesalePrice":0,"purchasePrice":null,"floorPrice":null,"shopId":null,"locationName":null},{"id":"1152009","categoryId":"1032000","goodsSn":"1152009","name":"魔兽世界 联盟 护腕 一只","brandId":"0","goodsNumber":100,"keywords":null,"goodsBrief":"吸汗、舒适、弹性、防护、耐用","goodsDesc":null,"isOnSale":"1","addTime":null,"sortOrder":8,"isDelete":"0","attributeCategory":"0","isNew":"0","goodsUnit":"件","primaryPicUrl":"http://yanxuan.nosdn.127.net/6df415dbe9b30aa8ae45301a96c18a59.png","listPicUrl":"http://yanxuan.nosdn.127.net/ae6d41117717387b82dcaf1dfce0cd97.png","primaryProductId":"1156017","promotionDesc":"限时购","promotionTag":null,"isLimited":"0","isHot":"1","shopLocationId":"ksvw282f2","retailPrice":1,"wholesalePrice":0,"purchasePrice":null,"floorPrice":null,"shopId":null,"locationName":null},{"id":"1152031","categoryId":"1032000","goodsSn":"1152031","name":"魔兽世界-伊利丹颈枕眼罩套装","brandId":"0","goodsNumber":100,"keywords":null,"goodsBrief":"差旅好伴侣","goodsDesc":null,"isOnSale":"1","addTime":null,"sortOrder":4,"isDelete":"0","attributeCategory":"0","isNew":"0","goodsUnit":"件","primaryPicUrl":"http://yanxuan.nosdn.127.net/06c4dae19c2a229ca1819a7b8e8efddd.png","listPicUrl":"http://yanxuan.nosdn.127.net/fd6e78a397bd9e9804116a36f0270b0a.png","primaryProductId":"1156059","promotionDesc":"限时购","promotionTag":null,"isLimited":"0","isHot":"1","shopLocationId":"ksvw282f2","retailPrice":1,"wholesalePrice":0,"purchasePrice":null,"floorPrice":null,"shopId":null,"locationName":null},{"id":"1152101","categoryId":"1012001","goodsSn":"1152101","name":"魔兽世界 部落 奥格瑞玛 拉杆箱 可登机","brandId":"0","goodsNumber":100,"keywords":null,"goodsBrief":"18寸，可携带登机","goodsDesc":null,"isOnSale":"1","addTime":null,"sortOrder":9,"isDelete":"0","attributeCategory":"0","isNew":"0","goodsUnit":"件","primaryPicUrl":"http://yanxuan.nosdn.127.net/864c62b7ba8a128a79dc9d69fe425528.png","listPicUrl":"http://yanxuan.nosdn.127.net/c1c62211a17b71a634fa0c705d11fb42.png","primaryProductId":"1156139","promotionDesc":"限时购","promotionTag":null,"isLimited":"0","isHot":"1","shopLocationId":"ksvw282f2","retailPrice":1,"wholesalePrice":0,"purchasePrice":null,"floorPrice":null,"shopId":null,"locationName":null},{"id":"1153006","categoryId":"1032000","goodsSn":"1153006","name":"魔兽世界 纪念版 麻将套装","brandId":"0","goodsNumber":100,"keywords":null,"goodsBrief":"十年经典，纪念麻将套装","goodsDesc":null,"isOnSale":"1","addTime":null,"sortOrder":2,"isDelete":"0","attributeCategory":"0","isNew":"0","goodsUnit":"件","primaryPicUrl":"http://yanxuan.nosdn.127.net/4f4010a4146054df0aa4e01afb4274e5.png","listPicUrl":"http://yanxuan.nosdn.127.net/2743921b945a6c71fcdc3c5282a03413.png","primaryProductId":"1158031","promotionDesc":"限时购","promotionTag":null,"isLimited":"0","isHot":"1","shopLocationId":"ksvw282f2","retailPrice":1,"wholesalePrice":0,"purchasePrice":null,"floorPrice":null,"shopId":null,"locationName":null},{"id":"1","categoryId":"1010001","goodsSn":"1","name":"澳洲羊羔毛内衣","brandId":"0","goodsNumber":100,"keywords":null,"goodsBrief":"冬暖夏凉，吸湿排汗。","goodsDesc":null,"isOnSale":"1","addTime":null,"sortOrder":1,"isDelete":"0","attributeCategory":"0","isNew":"1","goodsUnit":"件","primaryPicUrl":"http://yanxuan.nosdn.127.net/ee906abd9b2aa273ad28ea544fdac479.png","listPicUrl":"http://yanxuan.nosdn.127.net/654b02045fde802b51d5bbf09a8b75f2.png","primaryProductId":"1","promotionDesc":"限时购","promotionTag":null,"isLimited":"0","isHot":"1","shopLocationId":"ksvw282f2","retailPrice":1,"wholesalePrice":0,"purchasePrice":null,"floorPrice":null,"shopId":null,"locationName":null},{"id":"1cmkk239z7","categoryId":"1011001","goodsSn":"1cmkk239z7","name":"333","brandId":"1001000","goodsNumber":0,"keywords":"4444","goodsBrief":"3","goodsDesc":null,"isOnSale":"1","addTime":"2018-08-08 08:54:11","sortOrder":2,"isDelete":"0","attributeCategory":"0","isNew":"1","goodsUnit":"3","primaryPicUrl":"https://www.qingqinkj.com/arc/arc/image/mktv4i2u1/bgj991b88/2018/88/8/1cmjtw18me.png","listPicUrl":"https://www.qingqinkj.com/arc/arc/image/mktv4i2u1/bgj991b88/2018/88/8/1cmjq54r9d.png","primaryProductId":"0","promotionDesc":"444","promotionTag":"444","isLimited":"0","isHot":"1","shopLocationId":"ksvw282f2","retailPrice":3,"wholesalePrice":null,"purchasePrice":null,"floorPrice":null,"shopId":null,"locationName":null}],"thirdImg":null,"showUnit":null,"special":"免费wif","sale":{"annualSale":"","dailySale":"","monthlySale":""},"showBus":null,"openPageAnn":null,"addressPro":null,"oredePrefix":null,"ispickup":null},
         {"courierScore":null,"businessName":"朝阳服装店","specialList":["免费wif"],"isonline":null,"province":"北京市","showProdSty":null,"staPrice":null,"serviceScore":null,"isorder":null,"storeAnn":null,"id":"pvjnex377","goodsScore":null,"showServPro":null,"haveSpe":true,"custPho":null,"isdeliver":null,"imgs":null,"isdeal":null,"offlineMes":null,"maxRange":null,"busUrl":null,"showSaleNum":null,"district":"朝阳区","disFreePrice":null,"orderMes":null,"foodUrl":null,"week":null,"city":"北京市","showPhone":null,"avgPrice":null,"pageAnn":null,"firstImg":null,"openAddSer":null,"showStyle":null,"sortId":null,"categories":"服装,玩具","deliModel":null,"ordersMess":null,"address":"北京市朝阳区农展南路1号","openCom":null,"locationScore":null,"remarksLabel":null,"disPrice":null,"freePrice":null,"secondImg":null,"serviceName":null,"hotGoodsList":null,"thirdImg":null,"showUnit":null,"special":"免费wif","sale":{"annualSale":"","dailySale":"","monthlySale":""},"showBus":null,"openPageAnn":null,"addressPro":null,"oredePrefix":null,"ispickup":null},
         {"courierScore":null,"businessName":"汕头服装店","specialList":["免费wifi","免费停车","送货上门"],"isonline":null,"province":"广东省","showProdSty":null,"staPrice":null,"serviceScore":null,"isorder":null,"storeAnn":null,"id":"kxf6stv8t","goodsScore":null,"showServPro":null,"haveSpe":true,"custPho":null,"isdeliver":null,"imgs":null,"isdeal":null,"offlineMes":null,"maxRange":null,"busUrl":null,"showSaleNum":null,"district":"天河区","disFreePrice":null,"orderMes":null,"foodUrl":null,"week":null,"city":"广州市","showPhone":null,"avgPrice":null,"pageAnn":null,"firstImg":null,"openAddSer":null,"showStyle":null,"sortId":null,"categories":"服装,玩具","deliModel":null,"ordersMess":null,"address":"广州市体育西横街68号首层","openCom":null,"locationScore":null,"remarksLabel":null,"disPrice":null,"freePrice":null,"secondImg":null,"serviceName":null,"hotGoodsList":null,"thirdImg":null,"showUnit":null,"special":"免费wifi-免费停车-送货上门","sale":{"annualSale":"","dailySale":"","monthlySale":""},"showBus":null,"openPageAnn":null,"addressPro":null,"oredePrefix":null,"ispickup":null},
         {"courierScore":null,"businessName":"点都德服装","specialList":["免费wifi","免费停车","送货上门"],"isonline":null,"province":"广东省","showProdSty":null,"staPrice":null,"serviceScore":null,"isorder":null,"storeAnn":null,"id":"kx8rqnz8u","goodsScore":null,"showServPro":null,"haveSpe":true,"custPho":null,"isdeliver":null,"imgs":[{"remoteUrl":"1","id":"kxkw2y5y8","url":"http://www.qingqinkj.com/arc/arc/image/wzjg/bgiu6wm6x/2018/512/16/seqv21zaa.jpg","shopLocationId":"kx8rqnz8u"},{"remoteUrl":"2","id":"kxkwd4785","url":"http://www.qingqinkj.com/arc/arc/image/wzjg/bgiu6wm6x/2018/512/16/seqv21zaa.jpg","shopLocationId":"kx8rqnz8u"}],"isdeal":null,"offlineMes":null,"maxRange":null,"busUrl":null,"showSaleNum":null,"district":"越秀区","disFreePrice":null,"orderMes":null,"foodUrl":null,"week":null,"city":"广州市","showPhone":null,"avgPrice":null,"pageAnn":null,"firstImg":null,"openAddSer":null,"showStyle":null,"sortId":null,"categories":"服装,玩具","deliModel":null,"ordersMess":null,"address":"惠福东路470号","openCom":null,"locationScore":null,"remarksLabel":null,"disPrice":null,"freePrice":null,"secondImg":null,"serviceName":null,"hotGoodsList":null,"thirdImg":null,"showUnit":null,"special":"免费wifi-免费停车-送货上门","sale":{"annualSale":"","dailySale":"","monthlySale":""},"showBus":null,"openPageAnn":null,"addressPro":null,"oredePrefix":null,"ispickup":null},
         {"courierScore":null,"businessName":"吴财服装店","specialList":["免费wifi","免费停车","送货上门"],"isonline":"1","province":"广东省","showProdSty":"新页面显示","staPrice":9,"serviceScore":null,"isorder":"1","storeAnn":"<p>456</p>","id":"e3zaqis4p","goodsScore":null,"showServPro":"1","haveSpe":true,"custPho":"选项2","isdeliver":"1","imgs":null,"isdeal":"1","offlineMes":"321","maxRange":9,"busUrl":null,"showSaleNum":"1","district":"荔湾区","disFreePrice":9,"orderMes":"321","foodUrl":null,"week":"星期一-星期三-星期二-星期四-星期五-星期六-星期日","city":"广州市","showPhone":"1","avgPrice":35,"pageAnn":"456","firstImg":null,"openAddSer":"1","showStyle":"大图标展示","sortId":null,"categories":"服装,玩具","deliModel":"按区域","ordersMess":"如：不要辣、12点前送到","address":"大同路和隆里20号(十甫名都)","openCom":"1","locationScore":null,"remarksLabel":"456","disPrice":9,"freePrice":9,"secondImg":null,"serviceName":"456","hotGoodsList":null,"thirdImg":null,"showUnit":"1","special":"免费wifi-免费停车-送货上门","sale":{"annualSale":"","dailySale":"","monthlySale":""},"showBus":"0","openPageAnn":"1","addressPro":"如：XX小区5号楼318","oredePrefix":"456","ispickup":"1"}
         ]
        }
    },
    components: {},
    methods:{
        floatToInt(num){
            var exam = Number(num);
            var result = Math.round(exam);
           return result;
        },
        getOver(num){
            if(num==null){
                num = 0;
            }else{
                var exam = Number(num);
                num = Math.round(exam);
            }
            return 5-num;
        }

    }
  }
</script>
<style scoped>
    .font-md{
		font-family: -apple-system-font, "Helvetica Neue", sans-serif;
		font-size:32px;
	}
	/*以上为全局app无法使用全局*/
    .newproduct-section{
        width:750px;
        background-color:#ffffff;
        margin-top: 10px;
    }
    .type-title{
        text-align:center;
        height: 100px;
        line-height: 100px;
    }
    .shop-box{
        border-top-width:1px;
        border-top-style:solid;
        border-top-color:#d9d9d9;
        width:750px;
        height:300px;
        display:flex;
        flex-direction: row;
        flex-wrap:wrap;
        padding: 20px
    }
    .box-left{
        width:280px;
        height:280px;
        padding: 5px 0 0 18px;
    }
    .box-image{
        width:230px;
        height:150px;
    }
    .box-right{
        height:280px;
        width:430px;
        display:flex;
        flex-direction:column;
        flex-wrap:nowrap;
    }
    .shopName{
        width:430px;
        font-size:30px;
        color:#373737;
    }
    .bottomInfo{
        width:430px;
        height:230px;
        display:flex;
        flex-direction:column;
        flex-wrap:nowrap;
    }
    .font-Info{
        font-size:23px;
        line-height:35px;
        color:#777;
        margin-top: 10px;
    }
    .white{
    font-size:23px;
    }
    .yellowStar{
        color:yellow;
        font-size:23px;
    }
    .font-size-Info{
        font-size:23px;
        color:#777;
    }
    .font-info-margin{
        margin-top: 10px;
    }
    .row-info{
        display:flex;
        flex-direction:row;
        flex-wrap:nowrap;
        margin-top: 10px;
    }
    .special-layout{
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        margin-top: 10px;
    }
    .specials{
      margin: 10px;
      margin-left: 0px;
      padding: 5px;
      background-color: #eff4f8;
      color:#95b9d1;
      font-size:23px;
      border-radius: 10px;
      line-height: 35px;
      height: 35px;
    }
</style>
