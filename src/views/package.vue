<template>
	<div>
		<van-nav-bar title="购买"/>
		
		<van-tabbar route="" style="height: 60px;line-height: 60px;">
			<van-tabbar-item to="/index">
				<span>首页</span>
				<img slot="icon"  :src="icon.inactive1"></img>
			</van-tabbar-item>
			<van-tabbar-item to="/task">
				<span>任务</span>
				<img slot="icon" :src="icon.inactive2"></img>
			</van-tabbar-item>
			<van-tabbar-item>
				<span style="color: #FF3159;">购买</span>
				<img slot="icon" :src="icon.active3"></img>
			</van-tabbar-item>
			<van-tabbar-item to="/me">
				<span>我的</span>
				<img slot="icon"  :src="icon.inactive4"></img>
			</van-tabbar-item>
		</van-tabbar>
	</div>
	
</template>

<script>
	
	export default {
		data() {
			return {
				active: 1,
				icon: {
					inactive1: require('../../public/img/icon_tab_sy_1.png'),
					inactive2: require('../../public/img/icon_tab_rw_1.png'),
					active3: require('../../public/img/icon_tab_gm_2.png'),
					inactive4: require('../../public/img/icon_tab_wd_1.png')
				},
			}
		},
		mounted() {
		},
		methods: {
			
		}
	
	}
</script>

<style>
</style>
