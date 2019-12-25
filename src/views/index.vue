<template>
	<div>
		
		<van-nav-bar style="height: 45px;" title="首页"/>
		<van-sticky>
			
			<van-swipe style="height: 150px;" :autoplay="3000" indicator-color="white">
				<van-swipe-item style="height: 150px;" v-for="banner in banners">
					<van-image :src="banner.img" fit="cover" height="150" />
				</van-swipe-item>
			</van-swipe>
		</van-sticky>

		<van-image width="40" height="40" :src="icon.news_img" style="margin-left: 20px;margin-top: 20px;"></van-image>

		<van-sticky :offset-top="150">
			<van-tabs animated @click="onClick" title-active-color="#FF3159">
				<van-tab v-for="title in titles" :title="title.name">
					<div slot="title" style="text-align: center;">
						{{title.name}}
						<van-image style="padding-top: 4px;" width="12" height="12" :src="title.logo"></van-image>

					</div>
				</van-tab>
			</van-tabs>
		</van-sticky>

		<van-pull-refresh v-model="isLoading" @refresh="onRefresh">
			<van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
				<van-cell v-for="(data,index) in list">
					<div style="background: #fff;">
						<van-image :src="data.img" class="item_image"></van-image>
						<!-- <img :src="data.img" style="float: left;height: 60px;margin-left: 10px;margin-top: 15px;width: 60px;"> -->
						<div style="display: inline-block;margin-left: 12px;">
							<p style="margin-left: 10px;margin-top: 10px;font-size: 12px;">要求: {{data.task_name}}</p>
							<p style="margin-left: 10px;margin-top: -4px;font-size: 12px;">需方: {{data.name}}</p>
							<p style="margin-left: 10px;margin-top: -4px;border: #FF3159 solid 1px; border-radius: 12px;color: #FF3159;text-align: center;font-size: 12px;width: 100px;">剩余:
								{{data.count}}</p>
						</div>
						<div style="display: inline-block;margin-left: 10px;float: right;margin-right: 20px;">
							<p style="height: 20px;line-height: 45px;font-size: 14px;font-weight: bold;color: #FF3159;text-align: center;">¥{{data.money}}元</p>
							<p @click="receiveTask(data.ID,index)" style="float: inherit;height: 30px;color: #FFFFFF;background: #FF3159;font-size: 12px;width: 60px;margin-top: 15px;text-align: center;line-height: 30px;border-radius: 6px;">接单</p>
						</div>
					</div>
				</van-cell>
			</van-list>
		</van-pull-refresh>


		<van-tabbar route="" style="height: 60px;line-height: 60px;">
			<van-tabbar-item to="/index">
				<span style="color: #FF3159;">首页</span>
				<img slot="icon"  :src="icon.active1"></img>
			</van-tabbar-item>
			<van-tabbar-item to="/task">
				<span>任务</span>
				<img slot="icon"  :src="icon.inactive2"></img>
			</van-tabbar-item>
			<van-tabbar-item to="/package">
				<span>购买</span>
				<img slot="icon"  :src="icon.inactive3"></img>
			</van-tabbar-item>
			<van-tabbar-item to="/me">
				<span>我的</span>
				<img slot="icon"  :src="icon.inactive4"></img>
			</van-tabbar-item>
		</van-tabbar>


	</div>
</template>

<script>
	import Vue from 'vue'
	import {
		Notify
	} from 'vant';

	import 'vant/lib/notify/style';
	import {
		post_
	} from '../../public/js/utilHelper'

	Vue.use(post_).use(Notify);
	export default {
		data() {
			return {
				banners: [],
				list: [],
				loading: false,
				finished: false,
				isLoading: false,
				titles: [],
				page: 0,
				pageSize: 15,
				lastIndex: 0,
				firstLoad: true,
				active: 0,
				icon: {
					active1: require('../../public/img/icon_tab_sy_2.png'),
					inactive2: require('../../public/img/icon_tab_rw_1.png'),
					inactive3: require('../../public/img/icon_tab_gm_1.png'),
					inactive4: require('../../public/img/icon_tab_wd_1.png'),
					news_img: require('../../public/img/icon_news.png')
				},
			}
		},
		mounted() {
			this.getHomeData();
		},
		methods: {
			onClick(name, title) {
				var that = this;

				if (title == 'onLoad') {} else if (title != '') {
					that.page = 0;
				}
				that.lastIndex = name;
				post_('home/task-list?access-token=' + localStorage.getItem('access-token'), {
					platform: that.titles[name].ID,
					name: '',
					page: that.page,
					pageSize: that.pageSize
				}, res => {
					if (res.success) {
						if (that.page == 0) {
							that.list.splice(0, that.list.length);
						}
						for (var i = 0; i < res.data.length; i++) {
							var dataitem = res.data[i];
							that.list.push(that.DataItem(
								dataitem.ID,
								dataitem.add_time,
								dataitem.img,
								dataitem.count,
								dataitem.link,
								dataitem.phone,
								dataitem.task_name,
								dataitem.integral
							))
						}
						if (res.data.length < that.pageSize) {
							that.finished = true;
						} else {
							that.finished = false;
						}
						that.loading = false;
						that.isLoading = false;
					}
				})
			},
			onLoad() {
				if (this.list.length >= this.pageSize) {
					this.page = this.page + 1;
					this.onClick(this.lastIndex, "onLoad");
				}
			},
			onRefresh() {
				this.page = 0;
				this.onClick(this.lastIndex, "");
			},
			getHomeData() {
				var that = this;
				post_('home/task-home?access-token=' + localStorage.getItem('access-token'), {}, res => {
					//初始化title
					for (var i = 0; i < res.data.platform.length; i++) {
						var title = res.data.platform[i];
						that.titles.push(that.Title(
							title.ID,
							title.name,
							title.logo,
							title.logo_2,
							title.status,
							title.sort
						))


					};

					//初始化轮播图
					for (var i = 0; i < res.data.banner.length; i++) {
						var data = res.data.banner[i];
						that.banners.push(that.banner(data.image, data.link))
					}

					if (that.firstLoad) {
						that.onClick(0, 'firstLoad')
					}

					that.isLoading = false;
					that.loading = false;
					that.finished = true;
				})
			},
			Title(ID, name, logo, logo_2, status, sort) {
				var title = new Object();
				title.ID = ID;
				title.name = name;
				title.logo = logo;
				title.logo_2 = logo_2;
				title.status = status;
				title.sort = sort;
				return title;
			},
			banner(img, url) {
				var banner = new Object();
				banner.img = img;
				banner.url = url;
				return banner;
			},
			DataItem(ID, add_time, img, count, link, name, task_name, money) {
				var data = new Object();
				data.ID = ID;
				data.add_time = add_time;
				data.img = img;
				data.count = count;
				data.link = link;
				data.name = name;
				data.task_name = task_name;
				data.money = money;
				return data;
			},
			receiveTask(id, index) {
				var that = this;
				post_('task/receive-task?access-token=' + localStorage.getItem('access-token'), {
					task_id: id
				}, res => {
					if (res.success) {
						Notify({
							type: 'success',
							message: '任务接取成功'
						});
						that.list.splice(index, 1)
					} else {
						Notify({
							type: 'danger',
							message: res.message
						});
					}
				})
			},
			
		}

	}
</script>

<style scoped>
	.item_image {
		width: 60px;
	}
</style>
