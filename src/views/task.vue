<template>
	<div style="text-align: center;">
		<van-nav-bar title="任务" />
		<van-tabs swipeable="" v-model="active" sticky>
			<van-tab title="未完成">
				<van-pull-refresh v-model="isLoading" @refresh="onRefresh">
					<van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
						<van-cell style="padding: 16px;" v-for="data in list">
							<div style="background: #fff;font-size: 13px;">
								<van-image :src="data.img" class="item_image" style="float: left;margin-top: 17px;margin-left: 8px;"></van-image>
								<!-- <img :src="data.img" style="float: left;height: 60px;margin-left: 10px;margin-top: 15px;width: 60px;"> -->
								<div style="display: inline-block;margin-left: 20px;">
									<p style="margin-top: 0px;margin-bottom: 8px;">任务要求: {{data.task_name}}<span style="float: right;font-weight: bold;color: #FF3159;font-size: 15px;">¥{{data.integral}}</span></p>
									<p style="margin-top: 4px;margin-bottom: 8px;">发布时间: {{data.add_time}}</p>
									<div style="font-size: 12px;">
										<van-button @click="openVideo(data.link)" size="small" type="primary">打开链接</van-button>
										<van-button @click="copyUrl(data.link)" style="margin-left: 12px;" size="small" type="primary">复制链接</van-button>
										<van-button @click="submitTask(data.ID,data.task_name,data.integral)" style="margin-left: 12px;" size="small"
										 type="primary">提交任务</van-button>
									</div>
								</div>
							</div>
						</van-cell>
					</van-list>
				</van-pull-refresh>

			</van-tab>
			<van-tab title="已完成">
				<div v-for="data in list" style="padding: 2%;" class="item_bg">
					<span>{{data.task_name}} ({{data.org}})</span> <span style='float: right;'>已完成</span>
					<p style='color: #bbbbbb;margin-top: 8px;'>任务收益: ¥{{data.integral}}</p>
					<p style='color: #bbbbbb;'>申请时间: {{data.add_time}}</p>
				</div>
			</van-tab>
		</van-tabs>


		<van-tabbar route="" style="height: 60px;line-height: 60px;">
			<van-tabbar-item to="/index">
				<span>首页</span>
				<img slot="icon" :src="icon.inactive1"></img>
			</van-tabbar-item>
			<van-tabbar-item to="/task">
				<span style="color: #FF3159;">任务</span>
				<img slot="icon" :src="icon.active2"></img>
			</van-tabbar-item>
			<van-tabbar-item to="/package">
				<span>购买</span>
				<img slot="icon" :src="icon.inactive3"></img>
			</van-tabbar-item>
			<van-tabbar-item to="/me">
				<span>我的</span>
				<img slot="icon" :src="icon.inactive4"></img>
			</van-tabbar-item>
		</van-tabbar>
	</div>

</template>

<script>
	import Vue from 'vue'
	import {
		post_
	} from '../../public/js/utilHelper'

	Vue.use(post_);
	export default {
		data() {
			return {
				active: 0,
				icon: {
					inactive1: require('../../public/img/icon_tab_sy_1.png'),
					active2: require('../../public/img/icon_tab_rw_2.png'),
					inactive3: require('../../public/img/icon_tab_gm_1.png'),
					inactive4: require('../../public/img/icon_tab_wd_1.png')
				},
				list: [],
				loading: false,
				finished: false,
				isLoading: false,
				page: 0,
				pageSize: 15,
				lastIndex: 0,
				firstLoad: true,
				lastStatus: 0
			}
		},
		mounted() {
			this.getData(0)
		},
		methods: {
			Task: function(ID, add_time, img, link, name, task_name, weixin, integral, status, platform) {
				var task = new Object();
				task.ID = ID;
				task.add_time = add_time;
				task.img = img;
				task.link = link;
				task.name = name;
				task.task_name = task_name;
				task.weixin = weixin;
				task.integral = integral;

				if (status == "1") {
					task.state = '审核中';
				} else if (status == "2") {
					task.state = '已完成';
				}

				switch (platform) {
					case "1":
						task.org = "抖音任务"
						break;
					case "2":
						task.org = "快手任务"
						break;
					case "3":
						task.org = "微视任务"
						break;
					case "4":
						task.org = "火山任务"
						break;
				}

				return task;
			},
			getData(status) {
				var that = this;
				that.lastStatus = status
				post_('task/my-task-list?access-token=' + localStorage.getItem('access-token'), {
					status: status,
					page: that.page,
					pageSize: that.pageSize
				}, res => {
					if (res.success) {
						if (that.page == 0) {
							that.list.splice(0, that.list.length);
						}
						for (var i = 0; i < res.data.length; i++) {
							var task = res.data[i];
							that.list.push(that.Task(
								task.ID,
								task.add_time,
								task.img,
								task.link,
								task.name,
								task.task_name,
								task.weixin,
								task.integral,
								task.status,
								task.platform
							));
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
					this.getData(this.lastStatus);
				}
			},
			onRefresh() {
				this.page = 0;
				this.getData(this.lastStatus);
			},
		}

	}
</script>

<style>
	.item_image {
		width: 60px;
		height: 60px;
	}
</style>
