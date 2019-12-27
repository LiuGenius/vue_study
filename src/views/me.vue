<template>
	<div>
		<van-sticky>
			<van-nav-bar title="我的" right-text="设置" />
			<div>
				<van-image :src="me_bg"></van-image>
				<div style="position: absolute;top: 60px;height: 160px;font-size: 13px;">
					<van-image style="margin-left: 20px;margin-top: 30px;" round fit="cover" width="60" height="60" :src="app_logo"></van-image>
					<div style="display: inline;height: 60px;position: absolute;top: 30px;margin-left: 20px;color: #ffffff;width: 200px;">
						<span style="font-weight: bolder;font-size: 15px;">{{username}}</span>
						<span style="margin-left: 15px;border: #FFFFFF solid 1px; border-radius: 12px;padding:2px 8px 2px 8px;margin-top: 2px;">{{levelName}}</span>
						<p style="margin-top: 4px;margin-bottom: 4px;">{{userPhone}}</p>
						<p style="margin-top: 4px;margin-bottom: 4px;">到期时间: {{endTime}}</p>
					</div>
				</div>
			</div>
		</van-sticky>




		<div class="data_view_style">
			<div v-for="data in datas" class="item_style">
				<span style="color: red;">{{data.value}}</span>
				<p style="margin-top: 4px;">{{data.key}}</p>
			</div>
		</div>


		<div class="menu_view_style">
			<div @click="onclickMenu(data.router)" v-for="data in menus" class="item_style">
				<van-image width="20" height="20" :src="data.img"></van-image>
				<p style="margin-top: 4px;">{{data.name}}</p>
			</div>
		</div>


		<van-tabbar route="" style="height: 60px;line-height: 60px;">
			<van-tabbar-item to="/index">
				<span>首页</span>
				<img slot="icon" :src="icon.inactive1"></img>
			</van-tabbar-item>
			<van-tabbar-item to="/task">
				<span>任务</span>
				<img slot="icon" :src="icon.inactive2"></img>
			</van-tabbar-item>
			<van-tabbar-item to="/package">
				<span>购买</span>
				<img slot="icon" :src="icon.inactive3"></img>
			</van-tabbar-item>
			<van-tabbar-item>
				<span style="color: #FF3159;">我的</span>
				<img slot="icon" :src="icon.active4"></img>
			</van-tabbar-item>
		</van-tabbar>
	</div>

</template>

<script>
	import Vue from 'vue'
	import {
		post_,StringToFloat
	} from '../../public/js/utilHelper'
	import {
		Dialog
	} from 'vant'
	export default {
		data() {
			return {
				active: 1,
				ID:'',
				sex:'',
				address:'',
				icon: {
					inactive1: require('../../public/img/icon_tab_sy_1.png'),
					inactive2: require('../../public/img/icon_tab_rw_1.png'),
					inactive3: require('../../public/img/icon_tab_gm_1.png'),
					active4: require('../../public/img/icon_tab_wd_2.png')
				},
				app_logo: require("../../public/img/app_logo.png"),
				me_bg: require("../../public/img/me_bg.png"),
				username: "",
				levelName: "",
				userPhone: "",
				endTime: "",
				datas: [{
						key: '任务收益',
						value: '¥ -'
					},
					{
						key: '可用余额',
						value: '¥ -'
					},
					{
						key: '团队收益',
						value: '¥ -'
					},
					{
						key: '今日收益',
						value: '¥ -'
					},
					{
						key: '推荐奖励',
						value: '¥ -'
					},
					{
						key: '团队人数',
						value: '- 个'
					},
					{
						key: '今日完成任务',
						value: '- 个'
					},
					{
						key: '可做任务',
						value: '- 个'
					}
				],
				menus: [{
						name: '升级记录',
						img: require("../../public/img/menu_icon_level.png"),
						router:"/updata_history"
					},
					{
						name: '我的团队',
						img: require("../../public/img/menu_icon_team.png"),
						router:"/my_team"
					},
					// {name:'发布任务',img:require("../../public/img/menu_icon_rel_task.png"},
					{
						name: '我的任务',
						img: require("../../public/img/menu_icon_my_task.png"),
						router:"/task"
					},
					{
						name: '新闻公告',
						img: require("../../public/img/menu_icon_news.png"),
						router:"/news"
					},
					{
						name: '提现账户',
						img: require("../../public/img/menu_icon_account.png")
					},
					{
						name: '提现记录',
						img: require("../../public/img/menu_icon_txjl.png")
					},
					{
						name: '资金明细',
						img: require("../../public/img/menu_icon_zjmx.png")
					},
					{
						name: '推广赚钱',
						img: require("../../public/img/menu_icon_tgzq.png")
					},
					// {name:'修改密码',img:require("../../public/img/menu_icon_xgmm.png"},
					{
						name: '申请提现',
						img: require("../../public/img/icon_menu_sqtx.png")
					},
				],
			}
		},
		mounted() {
			this.getUserInfo();
		},
		methods: {
			getUserInfo() {
				var that = this;
				post_('member/info?access-token=' + localStorage.getItem('access-token'), {}, 
				res => {
					if (res.success) {
						var data = res.data;
						that.username = data.name;
						that.levelName = data.level_name; //等级名
						that.datas[0].value = '¥ ' + StringToFloat(data.integral_total); //任务收益
						that.datas[1].value = '¥ ' + StringToFloat(data.integral_last); //可用余额
						that.datas[2].value = '¥ ' + StringToFloat(data.direct_task); //团队收益
						that.datas[3].value = '¥ ' + StringToFloat(data.integral_same_day); //今日收益
						that.datas[7].value = data.task_last_count + ' 个'; //可做任务
						that.datas[4].value = '¥ ' + StringToFloat(data.direct_share); //推荐奖励
						that.datas[5].value = data.team_count + ' 个'; //团队人数
						that.datas[6].value = data.task_count_same_day + ' 个'; //今日完成任务
						that.userPhone = data.phone; //手机号码
						that.endTime = (that.vip_level == '普通会员') ? "无" : data.level_expire //data.time;//到期时间
					
						that.ID = data.ID;
						that.sex = (data.sex == "0") ? '男' : '女';
						that.address = (data.address + "") == 'null' ? '' : data.address;
						
					}
				})
			},
			onclickMenu(path){
				this.$router.push(path);
			}
		}

	}
</script>

<style>
	body {
		background: #f7f7f7;
	}

	.item_style {
		width: 33.333%;
		display: inline-block;
		text-align: center;
	}

	.data_view_style {
		background: #FFFFFF;
		width: 90%;
		margin-left: 5%;
		margin-right: 5%;
		position: absolute;
		top: 180px;
		border-radius: 8px;
		padding-top: 10px;
		font-size: 14px;
		z-index: 999;
	}

	.menu_view_style {
		background: #FFFFFF;
		width: 90%;
		margin-left: 5%;
		margin-right: 5%;
		border-radius: 8px;
		position: absolute;
		top: 380px;
		padding-top: 10px;
		font-size: 14px;
		z-index: 999;
	}
</style>
