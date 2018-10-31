<template>
    <div>
        <class-header></class-header>
        <div style="flex-direction: row;width: 750;flex: 1">
            <div class="class-list">
                <scroller show-scrollbar="true" :style="contentStyle">
                    <div class="j-uline" ref="jcLine"></div>
                    <text class="class-txt" v-for="(item,index) in navList" :class="[actIndex === index ? 'c-act' : '']" @click="chooseClass(index)" :ref="'class_' + index">{{item.name}}</text>
                </scroller>
            </div>
            <scroller class="main-list" :style="contentStyle" append="tree" paging-enabled="true" @scroll="onscroll" offset-accuracy="0" show-scrollbar="false" ref="scroll" id="scroll">
                <div style="min-height: 1131px;">
                    <image class="ad-img" resize="stretch" :src="currentCategory.wapBannerUrl"></image>
                    <text class="sub-tlt"> --- {{currentCategory.name}}分类 --- </text>
                    <div class="sub-box">
                        <div class="sub-i" v-for="i in currentCategory.children">
                            <image class="i-img" resize="stretch" :src="i.imgUrl" v-if="i.imgUrl"></image>
                            <image class="i-img" resize="stretch" src="" v-else="!!i.imgUrl"></image>
                            <text class="i-name">{{i.name}}</text>
                        </div>
                    </div>
                </div>
            </scroller>
        </div> 
    </div>
</template>
<script>
import header from './head';
import { CLASSES, SUBCLASSES } from './config'
import Config from '../common/config'
const dom = weex.requireModule('dom');
const animation = weex.requireModule('animation')
var modal = weex.requireModule('bmModal')
import {Utils} from 'weex-ui';
import api from '../../config/url.apis';
import app from '../app';

export default {
    components: {
        'class-header': header
    },
    created() {
        const tabPageHeight = Utils.env.getPageHeight();
        const { tabStyles } = this;
        this.contentStyle = { height: (tabPageHeight - tabStyles.height - 70) + 'px' };
        this.init();
        this.$event.on('getCatalog', params => {this.getCatalog ()})
    },
    mounted() {
        this.$nextTick(() => {
             //dom.getComponentRect(this.$refs.scroll, (data) => {
             //    this.scrollHeight = data.size.height
             //})
        })
      //this.getCatalog();
    },
    data() {
        return {
            classes: [],
            subclasses: [],
            actIndex: 0,
            scrollHeight: 0,
            tabTitles: Config.tabTitles,
            tabStyles: Config.tabStyles,
            navList:[],
            currentCategory:{}
        }
    },
    methods: {
        jumpWeb(_url){
            this.$router.toWebView({
                url: _url,
                title: '',
                navShow: true,
            })
        },
        init(){

            // console.log('deviceHeight:' + this.$getConfig().env.deviceHeight);
            this.getClasses()
            this.getSubclasses()
        },
        getClasses(){
            // this.$fetch({
            //     method: 'GET',
            //     name: 'yanxuan_class_getClasses',
            //     data: {}
            // }).then(resData => {
            //     this.classes = resData.data
            // }, error => {

            // })

            this.classes = CLASSES
        },
        getSubclasses(){
            
        },
        onscroll(e){
            let formatOffset = Math.abs(e.contentOffset.y)
            // console.log(formatOffset);
            // console.log(this.scrollHeight);
            // if (formatOffset % this.scrollHeight === 0) {
            //     debugger
            //     this.activeIndex = formatOffset / this.scrollHeight
            // }
            // this.actIndex = parseInt(formatOffset / this.scrollHeight)
        },
        chooseClass(index){
            this.actIndex = index;
            animation.transition(this.$refs.jcLine, {
                styles: {
                    transform: 'translateY(' + (92 * index) + 'px)',
                },
                duration: 200,
                timingFunction: 'ease',
                delay: 0
            }, function() {});
            this.currentCategory = this.navList[index];
        },
        getCatalog (){
            var that = this;
            if(!!app.indexData.categoryTree.children){
                if (app.indexData.categoryTree.children.length>0){
                    this.navList=app.indexData.categoryTree.children,
                    this.currentCategory=app.indexData.categoryTree.children[0]
                }
            }else{
                this.$fetch({
                    method: 'GET',    
                    url: api.CatalogList,
                    data: {
                        locationId: '',authId: app.getAuthId()
                    }
                }).then(res => {
                    if (res.tips.isOk) {
                        this.navList = res.data.children;
                        this.currentCategory = res.data.children[0];
                        app.navList = res.data.children;
                    }
                }, error => {
                    this.$notice.alert({
                        title: "查询失败",
                        message: '消息',
                        okTitle: '确认',
                        callback() {
                        }
                    })
                })
            }
            

        }
    }
}
</script>
<style lang="sass" src="./catelog.scss"></style>