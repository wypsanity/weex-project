<template>
	<div class="container">
			<main></main>
	</div>
</template>
<script>
	import main from './main.vue'
	import app from './app'
	export default {
		components:{
			main
		},
		data () {
        	return {
				curHomeBackTriggerTimes: 1,
            	maxHomeBackTriggerTimes: 2,
       		};
    	},
		beforeCreate () {
			var domModule = weex.requireModule('dom');
			// domModule.addRule('fontFace', {
			// 	fontFamily: 'iconfont',
			// 	src: "url('bmlocal://iconfont/iconfont.css')",
			// 	src: "url('bmlocal://iconfont/iconfont.eot')",
			// 	src: "url('bmlocal://iconfont/iconfont.svg')",
			// 	src: "url('bmlocal://iconfont/iconfont.ttf')",
			// 	src: "url('bmlocal://iconfont/iconfont.woff')"
			// });
			domModule.addRule('fontFace', {
            'fontFamily': 'iconfont',
            'src': "url('bmlocal://iconfont/font-404010.ttf')"
        	});
		},
		created () {
			this.androidFinishApp()
			this.$storage.set('info',app)
			.then(resData => {}, error => {})
		},
		methods: {
			androidFinishApp () {
            const globalEvent = weex.requireModule('globalEvent')
            globalEvent.addEventListener('homeBack', options => {
                (this.curHomeBackTriggerTimes === this.maxHomeBackTriggerTimes) && this.$router.finish()
				if(this.curHomeBackTriggerTimes != this.maxHomeBackTriggerTimes){
                this.$notice.toast({ message: `点击返回${this.maxHomeBackTriggerTimes}次之后，会关闭应用，当前点击第${this.curHomeBackTriggerTimes}次` })
				this.curHomeBackTriggerTimes++
				}
            })
        }
		}
	}
</script>
<style scoped>
	.container {
		display: flex;
		flex:1;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
</style>