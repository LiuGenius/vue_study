<template>
	<div>
		<van-sticky>
			<van-nav-bar title="购买" right-text="升级记录" @click-right="updataHistory()"/>
		</van-sticky>


		<van-list>
			<van-cell v-if="data.isShow" style="padding: 16px;" v-for="data in list">
				<div>
					<van-image height="175" :src="data.img"></van-image>
					<div style="position: absolute;top: 0px;color: #ffffff;font-size: 13px;width: 100%;padding-top: 10px;">
						<span style="font-weight: bold;margin-left: 10px;;">{{data.name}}</span>
						<span style="position: absolute;right: 10px;">会员费: {{data.price}}元</span>
						<p style="margin-left: 20px;margin-top: 8px;margin-bottom: 12px;">每天可做任务: {{data.task_count}}个</p>
						<p style="margin-left: 20px;margin-top: -8px;margin-bottom: 12px;">{{data.description}}</p>
						<p style="margin-left: 20px;margin-top: -8px;margin-bottom: 12px;">直接邀请同伴奖励: {{data.direct_rate}} %</p>
						<!-- 		<p style="width: 100%;margin-top: -4px;">&nbsp;</p> -->
						<div style="width: 100%;text-align: center;">
							<van-button size="small" @click="pay(data.name,data.price,data.ID)" type="default">立即升级(剩余:{{data.surplus}})</van-button>
						</div>
						<p>&nbsp;</p>
					</div>
				</div>

			</van-cell>
		</van-list>
		<div style="height: 60px;">&nbsp;</div>

		<van-tabbar route="" style="height: 60px;line-height: 60px;">
			<van-tabbar-item to="/index">
				<span>首页</span>
				<img slot="icon" :src="icon.inactive1"></img>
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
	import {
		Dialog
	} from 'vant'

	Vue.use(post_).use(Dialog);
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
				list: [],
				imgArrays: [
					require("../../public/img/level_1.png"),
					require("../../public/img/level_2.png"),
					require("../../public/img/level_3.png")
				],
				isDq: false,
				level_name: '',
				lastPayMoney: 0,
				isShowTips: true,
				level: 0
			}
		},
		mounted() {
			var that = this;
			post_('member/info?access-token=' + localStorage.getItem('access-token'), {},
				res => {
					if (res.success) {
						var level_expire = res.data.level_expire == '无' ? "1999-12-12" : res.data.level_expire;
						that.isDq = new Date(level_expire).getTime() < new Date().getTime();
						that.level_name = res.data.level_name;
						that.lastPayMoney = res.data.lastPayMoney;
						that.level = res.data.level;
						that.getData();
					}
				})
		},
		methods: {
			getData() {
				var that = this;
				post_('level/level-list?access-token=' + localStorage.getItem('access-token'), {},
					res => {
						if (res.success) {
							for (var i = 0; i < res.data.length; i++) {
								var packge = res.data[i];
								that.list.push(that.Packge(
									packge.ID,
									packge.add_time,
									packge.description,
									packge.name,
									packge.price,
									packge.sort,
									packge.status,
									packge.max,
									packge.type,
									that.imgArrays[i % 3],
									packge.count,
									packge.direct_rate
								));
							}
							if (that.isShowTips) {
								// alert('');
								Dialog.alert({
									title: '全民乐派',
									message: '您当前已经是最高级别,到期后可续费'
								}).then(() => {
								});
							}
						}
					})

			},
			Packge(ID, add_time, description, name, price, sort, status, task_count, type, img, surplus, direct_rate) {
				var data = new Object();
				data.ID = ID;
				data.add_time = add_time;
				data.description = description;
				data.name = name;
				data.price = price;
				data.sort = sort;
				data.status = status;
				data.task_count = task_count;
				data.type = type;
				data.img = img;
				data.surplus = surplus;
				data.direct_rate = direct_rate;


				if (this.isDq) {
					data.isShow = true;
				} else {
					data.isShow = parseInt(data.ID) > this.level;
				}
				if (data.isShow) {
					this.isShowTips = false;
				}
				return data;
			},
			updataHistory(){
				this.$router.push('/updata_history');
			}
		}

	}
</script>

<style>
</style>
