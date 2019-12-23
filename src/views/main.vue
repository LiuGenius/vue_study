<template>
	<div>

		<van-sticky>
			<van-swipe style="height: 180px;" :autoplay="3000" indicator-color="white">
				<van-swipe-item style="height: 180px;" v-for="banner in banners">
					<van-image :src="banner.img" fit="fill" />
				</van-swipe-item>
			</van-swipe>
		</van-sticky>


		<van-icon name="chat-o" info="99+" size="50" style="margin-left: 20px;margin-top: 20px;" />
		<van-sticky :offset-top="180">
			<van-tabs animated @click="onClick">
				<van-tab v-for="title in titles">
					<div slot="title" style="text-align: center;">
						{{title.name}}
						<van-image style="padding-top: 4px;" width="12" height="12" :src="title.logo"></van-image>

					</div>
				</van-tab>
			</van-tabs>
		</van-sticky>

		<van-pull-refresh v-model="isLoading" @refresh="onRefresh">
			<van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
				<van-cell v-for="data in list">
					<div style="height: 90px;background: #fff;">
						<img :src="data.img" style="float: left;height: 60px;margin-left: 10px;margin-top: 15px;width: 60px;">
						<div style="display: inline-block;margin-left: 4px;">
							<p style="margin-left: 10px;margin-top: 10px;font-size: 12px;">要求: {{data.task_name}}</p>
							<p style="margin-left: 10px;margin-top: -4px;font-size: 12px;">需方: {{data.name}}</p>
							<p style="margin-left: 10px;margin-top: -4px;border: #FF3159 solid 1px; border-radius: 12px;color: #FF3159;text-align: center;font-size: 12px;width: 100px;">剩余:
								{{data.count}}</p>
						</div>
						<div style="display: inline-block;margin-left: 10px;height: 90px;float: right;margin-right: 20px;">
							<p style="height: 20px;line-height: 45px;font-size: 14px;font-weight: bold;color: #FF3159;text-align: center;">¥{{data.money}}元</p>
							<p @click="receiveTask(data.ID,index)" style="float: inherit;height: 30px;color: #FFFFFF;background: #FF3159;font-size: 12px;width: 60px;margin-top: 15px;text-align: center;line-height: 30px;border-radius: 6px;">接单</p>
						</div>
					</div>
				</van-cell>
			</van-list>
		</van-pull-refresh>




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
				titles: []
			}
		},
		mounted() {
			this.getHomeData();
		},
		methods: {
			onClick(name, title) {
				var that = this;
				post_('home/task-list?access-token=' + localStorage.getItem('access-token'), {
					platform: that.titles[name].ID,
					name: ''
				}, res => {
					if (res.success) {
						that.list.splice(0, that.list.length);
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
								"0.5"
							))
						}

					}

				})

			},
			onLoad() {
				// 加载状态结束
				this.loading = false;
				// 数据全部加载完成
				this.finished = true;
				// // 异步更新数据
				// setTimeout(() => {
				// 	for (let i = 0; i < 10; i++) {
				// 		this.list.push(this.list.length + 1);
				// 	}
				// 	// 加载状态结束
				// 	this.loading = false;

				// 	// 数据全部加载完成
				// 	if (this.list.length >= 40) {
				// 		this.finished = true;
				// 	}
				// }, 500);
			},
			onRefresh() {
				setTimeout(() => {
					Notify({
						type: 'success',
						message: '刷新成功'
					});
					this.isLoading = false;
					this.list.splice(15, this.list.length - 1)
					this.finished = false;
				}, 500);
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
					console.log(that.banners)

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
			}
		}

	}
</script>

<style scoped>

</style>
