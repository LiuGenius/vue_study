<template>
	<div>
		<van-swipe style="height: 200px;" :autoplay="3000" indicator-color="white">
			<van-swipe-item v-for="img in imgs">
				<van-image :src="img" fit="cover" />
			</van-swipe-item>
		</van-swipe>

		<van-icon name="chat-o" info="99+" size="50" style="margin-left: 20px;margin-top: 20px;" />

		<van-tabs @click="onClick">
			<van-tab v-for="index in 8" :title="'标签 ' + index">
				
			</van-tab>
		</van-tabs>
		
		<p style="background: #42B983;height: 400px;width: 100%;text-align: center;line-height: 300px;color: #ffffff;">
			{{sss}}
		</p>
		
	</div>
</template>

<script>
	import Vue from 'vue';
	import {
		Swipe,
		SwipeItem,
		Image,
		Icon,
		Tab,
		Tabs
	} from 'vant';


	import 'vant/lib/swipe/style';
	import 'vant/lib/swipe-item/style';
	import 'vant/lib/tabs/style';
	import 'vant/lib/tab/style';
	Vue.use(Swipe).use(SwipeItem).use(Image).use(Icon).use(Tab).use(Tabs);
	export default {
		data() {
			return {
				imgs: [
					'https://img.yzcdn.cn/vant/cat.jpeg',
					'https://img.yzcdn.cn/vant/cat.jpeg',
					'https://img.yzcdn.cn/vant/cat.jpeg',
					'https://img.yzcdn.cn/vant/cat.jpeg'
				],
				sss:''
			}
		},
		methods: {
			onClick(name, title) {
				// this.$toast(title);
				this.sss = title;
			}
		}

	}
</script>

<style scoped>

</style>
