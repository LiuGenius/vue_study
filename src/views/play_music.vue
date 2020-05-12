<template>
	<div id="app" style="height: 100%;width: 100%;">

		<van-nav-bar title="放松" style="left: 0;
			position: fixed; 
			top: 0; 
			width: 100%; 
			z-index: 999;" />

		<van-tabs @click="onClickTab" color="#123456" style="left: 0;
			position: fixed; 
			top: 40px; 
			width: 100%; 
			z-index: 999;">
			<van-tab v-for="tab in tabs" :title="tab"></van-tab>
		</van-tabs>

		<van-grid :gutter="10" :column-num="4" style="position: absolute;
			top: 90px; 
			width: 97%;
			margin-bottom: 171px;">
			<van-grid-item @click="clickItem(music.name,music.url)" v-for="music in musicList" :key="music" :icon="music_icon"
			 :text="music.name" />
		</van-grid>



		<div style="background: #FFFFFF;height: 171px;width: 100%;text-align: center;
        position: fixed; 
        bottom: 0; 
		z-index: 999;">
			<div style="height: 1px;width: 100%;background: #303030;"></div>
			<div style="height: 100px;width: 100%;background: #656668;">
				<div v-for="music in ch_music_list" style="width: 100px;margin-top: 10px;display: inline-block;">
					<img style="width: 50px;margin-top: 10px;display: block;margin-left: 25px;" src="../../public/img/music.png" />
					<span style="display:inline;text-overflow: ellipsis;white-space: nowrap;
							text-overflow: ellipsis;
							overflow: hidden;
							word-break: break-all;font-size: 10px;color: #FFFBE8;">{{music.name}}</span>
				</div>

			</div>
			<img @click="onPlay()" src="../../public/img/icon_play.png" style="height: 50px;margin-top: 10px;" />
			
			<van-overlay :show="show"  style="text-align: center;line-height: 100%;">
				<van-image
				  width="10rem"
				  height="10rem"
				  fit="contain"
				  :src="music_playing"
				  style="margin-top: 20%;"
				/>
				<van-button @click="onStop()" plain hairline type="primary" style="display: block;width: 30%;margin-left: 35%;margin-top: 30%;">停止</van-button>
			</van-overlay>
		
		</div>
	</div>
	
</template>

<script>
	import Vue from 'vue';
	import {
		Toast,
		Divider,
		Overlay,
		Image as VanImage
	} from 'vant';
	

	Vue.use(Toast).use(Divider).use(Overlay).use(VanImage);

	export default {
		mounted() {
			this.getTabItem("禅音")
		},
		methods: {
			onStop(){
				var that = this;
				that.show = false;
				for (var i = 0; i < that.audios.length; i++) {
					that.audios[i].pause();
				}
			},
			onPlay() {
				var that = this;
				if(that.ch_music_list.length == 3){
					for (var i = 0; i < that.ch_music_list.length; i++) {
						that.audios[i].src = that.ch_music_list[i].url;
						that.audios[i].loop = true;
						that.audios[i].play();
					}
					that.show = true;
				}else{
					Toast("请先选择歌曲 ！" );
				}
				
			},
			onClickTab(name, title) {
				this.musicList.splice(0, this.musicList.length); //清空数组 
				this.getTabItem(title);
			},
			clickItem(name, url) {
				Toast("添加一首歌曲：" + name);
				var that = this;
				if (that.ch_music_list.length >= 3) {
					that.ch_music_list.splice(0, that.ch_music_list.length - 2)
				}
				that.ch_music_list.push({
					name: name,
					url: url
				});
			},
			getTabItem(tag) {
				var that = this;
				if (tag == "禅音") {
					that.musicList.push({
						name: "梵音妙道",
						url: "http://129.226.55.71/file/" + tag + "/梵音妙道.mp3"
					})
					that.musicList.push({
						name: "佛门木鱼",
						url: "http://129.226.55.71/file/" + tag + "/佛门木鱼.mp3"
					})
					that.musicList.push({
						name: "古寺钟声",
						url: "http://129.226.55.71/file/" + tag + "/古寺钟声.mp3"
					})
					that.musicList.push({
						name: "寺院钟声",
						url: "http://129.226.55.71/file/" + tag + "/寺院钟声.mp3"
					})
				} else if (tag == "动物") {
					that.musicList.push({
						name: "草原狼嚎",
						url: "http://129.226.55.71/file/" + tag + "/草原狼嚎.mp3"
					})
					that.musicList.push({
						name: "草原御马",
						url: "http://129.226.55.71/file/" + tag + "/草原御马.mp3"
					})
					that.musicList.push({
						name: "耳边蝇声",
						url: "http://129.226.55.71/file/" + tag + "/耳边蝇声.mp3"
					})
					that.musicList.push({
						name: "咕咕鸣鸣",
						url: "http://129.226.55.71/file/" + tag + "/咕咕鸣鸣.mp3"
					})
					that.musicList.push({
						name: "海鸥掠影",
						url: "http://129.226.55.71/file/" + tag + "/海鸥掠影.mp3"
					})
					that.musicList.push({
						name: "群鸭戏水",
						url: "http://129.226.55.71/file/" + tag + "/群鸭戏水.mp3"
					})
					that.musicList.push({
						name: "深夜犬吠",
						url: "http://129.226.55.71/file/" + tag + "/深夜犬吠.mp3"
					})
					that.musicList.push({
						name: "熟睡的猪",
						url: "http://129.226.55.71/file/" + tag + "/熟睡的猪.mp3"
					})
					that.musicList.push({
						name: "小狗喝水",
						url: "http://129.226.55.71/file/" + tag + "/小狗喝水.mp3"
					})
					that.musicList.push({
						name: "小猫喵喵",
						url: "http://129.226.55.71/file/" + tag + "/小猫喵喵.mp3"
					})
				} else if (tag == "放松训练") {
					that.musicList.push({
						name: "放松引导",
						url: "http://129.226.55.71/file/" + tag + "/放松引导.mp3"
					})
				} else if (tag == "交通") {
					that.musicList.push({
						name: "乘坐火车",
						url: "http://129.226.55.71/file/" + tag + "/乘坐火车.mp3"
					})
					that.musicList.push({
						name: "高铁",
						url: "http://129.226.55.71/file/" + tag + "/高铁.mp3"
					})
					that.musicList.push({
						name: "火车飞驰",
						url: "http://129.226.55.71/file/" + tag + "/火车飞驰.mp3"
					})
					that.musicList.push({
						name: "列车运行",
						url: "http://129.226.55.71/file/" + tag + "/列车运行.mp3"
					})
					that.musicList.push({
						name: "邮轮",
						url: "http://129.226.55.71/file/" + tag + "/邮轮.mp3"
					})
					that.musicList.push({
						name: "渔船",
						url: "http://129.226.55.71/file/" + tag + "/渔船.mp3"
					})
					that.musicList.push({
						name: "渔船码头",
						url: "http://129.226.55.71/file/" + tag + "/渔船码头.mp3"
					})
				} else if (tag == "课堂") {
					that.musicList.push({
						name: "吵闹的大教室",
						url: "http://129.226.55.71/file/" + tag + "/吵闹的大教室.mp3"
					})
					that.musicList.push({
						name: "党课",
						url: "http://129.226.55.71/file/" + tag + "/党课.mp3"
					})
					that.musicList.push({
						name: "化学课",
						url: "http://129.226.55.71/file/" + tag + "/化学课.mp3"
					})
					that.musicList.push({
						name: "课前走廊",
						url: "http://129.226.55.71/file/" + tag + "/课前走廊.mp3"
					})
					that.musicList.push({
						name: "课堂粉笔",
						url: "http://129.226.55.71/file/" + tag + "/课堂粉笔.mp3"
					})
					that.musicList.push({
						name: "课堂休息",
						url: "http://129.226.55.71/file/" + tag + "/课堂休息.mp3"
					})
					that.musicList.push({
						name: "空手道课",
						url: "http://129.226.55.71/file/" + tag + "/空手道课.mp3"
					})
					that.musicList.push({
						name: "数学课",
						url: "http://129.226.55.71/file/" + tag + "/数学课.mp3"
					})
					that.musicList.push({
						name: "体育课",
						url: "http://129.226.55.71/file/" + tag + "/体育课.mp3"
					})
					that.musicList.push({
						name: "晚自习",
						url: "http://129.226.55.71/file/" + tag + "/晚自习.mp3"
					})
					that.musicList.push({
						name: "英语课",
						url: "http://129.226.55.71/file/" + tag + "/英语课.mp3"
					})
					that.musicList.push({
						name: "游泳课",
						url: "http://129.226.55.71/file/" + tag + "/游泳课.mp3"
					})
					that.musicList.push({
						name: "哲学课",
						url: "http://129.226.55.71/file/" + tag + "/哲学课.mp3"
					})
				} else if (tag == "乐器") {
					that.musicList.push({
						name: "大漠萧声",
						url: "http://129.226.55.71/file/" + tag + "/大漠萧声.mp3"
					})
					that.musicList.push({
						name: "大提琴曲",
						url: "http://129.226.55.71/file/" + tag + "/大提琴曲.mp3"
					})
					that.musicList.push({
						name: "钢琴曲1",
						url: "http://129.226.55.71/file/" + tag + "/钢琴曲1.mp3"
					})
					that.musicList.push({
						name: "钢琴曲2",
						url: "http://129.226.55.71/file/" + tag + "/钢琴曲2.mp3"
					})
					that.musicList.push({
						name: "钢琴曲3",
						url: "http://129.226.55.71/file/" + tag + "/钢琴曲3.mp3"
					})
					that.musicList.push({
						name: "钢琴曲4",
						url: "http://129.226.55.71/file/" + tag + "/钢琴曲4.mp3"
					})
					that.musicList.push({
						name: "钢琴曲5",
						url: "http://129.226.55.71/file/" + tag + "/钢琴曲5.mp3"
					})
					that.musicList.push({
						name: "钢琴曲6",
						url: "http://129.226.55.71/file/" + tag + "/钢琴曲6.mp3"
					})
					that.musicList.push({
						name: "钢琴曲7",
						url: "http://129.226.55.71/file/" + tag + "/钢琴曲7.mp3"
					})
					that.musicList.push({
						name: "古筝1",
						url: "http://129.226.55.71/file/" + tag + "/古筝1.mp3"
					})
					that.musicList.push({
						name: "古筝2",
						url: "http://129.226.55.71/file/" + tag + "/古筝2.mp3"
					})
					that.musicList.push({
						name: "古筝3",
						url: "http://129.226.55.71/file/" + tag + "/古筝3.mp3"
					})
					that.musicList.push({
						name: "吉他曲1",
						url: "http://129.226.55.71/file/" + tag + "/吉他曲1.mp3"
					})
					that.musicList.push({
						name: "吉他曲2",
						url: "http://129.226.55.71/file/" + tag + "/吉他曲2.mp3"
					})
					that.musicList.push({
						name: "吉他曲3",
						url: "http://129.226.55.71/file/" + tag + "/吉他曲3.mp3"
					})
					that.musicList.push({
						name: "交响乐",
						url: "http://129.226.55.71/file/" + tag + "/交响乐.mp3"
					})
					that.musicList.push({
						name: "马尾胡琴",
						url: "http://129.226.55.71/file/" + tag + "/马尾胡琴.mp3"
					})
					that.musicList.push({
						name: "梦幻风铃",
						url: "http://129.226.55.71/file/" + tag + "/梦幻风铃.mp3"
					})
					that.musicList.push({
						name: "魔幻风铃",
						url: "http://129.226.55.71/file/" + tag + "/魔幻风铃.mp3"
					})
					that.musicList.push({
						name: "清脆鼓声",
						url: "http://129.226.55.71/file/" + tag + "/清脆鼓声.mp3"
					})
					that.musicList.push({
						name: "日式风铃",
						url: "http://129.226.55.71/file/" + tag + "/日式风铃.mp3"
					})
					that.musicList.push({
						name: "竖琴曲",
						url: "http://129.226.55.71/file/" + tag + "/竖琴曲.mp3"
					})
					that.musicList.push({
						name: "水晶八音盒1",
						url: "http://129.226.55.71/file/" + tag + "/水晶八音盒1.mp3"
					})
					that.musicList.push({
						name: "水晶八音盒2",
						url: "http://129.226.55.71/file/" + tag + "/水晶八音盒2.mp3"
					})
					that.musicList.push({
						name: "小提琴曲",
						url: "http://129.226.55.71/file/" + tag + "/小提琴曲.mp3"
					})
					that.musicList.push({
						name: "悠扬萧声",
						url: "http://129.226.55.71/file/" + tag + "/悠扬萧声.mp3"
					})
					that.musicList.push({
						name: "悠悠琵琶",
						url: "http://129.226.55.71/file/" + tag + "/悠悠琵琶.mp3"
					})
					that.musicList.push({
						name: "竹笛",
						url: "http://129.226.55.71/file/" + tag + "/竹笛.mp3"
					})
				} else if (tag == "冥想") {
					that.musicList.push({
						name: "海岸遐想",
						url: "http://129.226.55.71/file/" + tag + "/海岸遐想.mp3"
					})
					that.musicList.push({
						name: "无限遐想",
						url: "http://129.226.55.71/file/" + tag + "/无限遐想.mp3"
					})
					that.musicList.push({
						name: "观呼吸和观情绪",
						url: "http://129.226.55.71/file/" + tag + "/做情绪的主人-观呼吸和观情绪.mp3"
					})
					that.musicList.push({
						name: "不要去批判情绪",
						url: "http://129.226.55.71/file/" + tag + "/做情绪的主人-每一种情绪 都不要去批判.mp3"
					})
					that.musicList.push({
						name: "去爱每一种情绪",
						url: "http://129.226.55.71/file/" + tag + "/做情绪的主人-每一种情绪 都值得你去爱.mp3"
					})
					that.musicList.push({
						name: "深度觉察负面情绪",
						url: "http://129.226.55.71/file/" + tag + "/做情绪的主人-深度觉察负面情绪.mp3"
					})
					that.musicList.push({
						name: "释放被压抑的情绪",
						url: "http://129.226.55.71/file/" + tag + "/做情绪的主人-释放被压抑的情绪.mp3"
					})
				} else if (tag == "脑波") {
					that.musicList.push({
						name: "脑波1",
						url: "http://129.226.55.71/file/" + tag + "/脑波1.mp3"
					})
					that.musicList.push({
						name: "脑波2",
						url: "http://129.226.55.71/file/" + tag + "/脑波2.mp3"
					})
					that.musicList.push({
						name: "脑波3",
						url: "http://129.226.55.71/file/" + tag + "/脑波3.mp3"
					})
					that.musicList.push({
						name: "深度睡眠2.5HZ",
						url: "http://129.226.55.71/file/" + tag + "/深度睡眠2.5HZ.mp3"
					})
					that.musicList.push({
						name: "提高效率20HZ",
						url: "http://129.226.55.71/file/" + tag + "/提高效率20HZ.mp3"
					})
				} else if (tag == "影视剧") {
					that.musicList.push({
						name: "还珠格格",
						url: "http://129.226.55.71/file/" + tag + "/还珠格格.mp3"
					})
				} else if (tag == "自然") {
					that.musicList.push({
						name: "踩落叶",
						url: "http://129.226.55.71/file/" + tag + "/踩落叶.mp3"
					})
					that.musicList.push({
						name: "潮汐海岸",
						url: "http://129.226.55.71/file/" + tag + "/潮汐海岸.mp3"
					})
					that.musicList.push({
						name: "虫鸣鸟叫",
						url: "http://129.226.55.71/file/" + tag + "/虫鸣鸟叫.mp3"
					})
					that.musicList.push({
						name: "春季雷雨",
						url: "http://129.226.55.71/file/" + tag + "/春季雷雨.mp3"
					})
					that.musicList.push({
						name: "从林小屋",
						url: "http://129.226.55.71/file/" + tag + "/从林小屋.mp3"
					})
					that.musicList.push({
						name: "丛林画眉鸟",
						url: "http://129.226.55.71/file/" + tag + "/丛林画眉鸟.mp3"
					})
					that.musicList.push({
						name: "丛林激流",
						url: "http://129.226.55.71/file/" + tag + "/丛林激流.mp3"
					})
					that.musicList.push({
						name: "丛林露营",
						url: "http://129.226.55.71/file/" + tag + "/丛林露营.mp3"
					})
					that.musicList.push({
						name: "丛林猫头鹰",
						url: "http://129.226.55.71/file/" + tag + "/丛林猫头鹰.mp3"
					})
					that.musicList.push({
						name: "大漠风沙",
						url: "http://129.226.55.71/file/" + tag + "/大漠风沙.mp3"
					})
					that.musicList.push({
						name: "大漠露营",
						url: "http://129.226.55.71/file/" + tag + "/大漠露营.mp3"
					})
					that.musicList.push({
						name: "泛舟湖面",
						url: "http://129.226.55.71/file/" + tag + "/泛舟湖面.mp3"
					})
					that.musicList.push({
						name: "风吹麦浪",
						url: "http://129.226.55.71/file/" + tag + "/风吹麦浪.mp3"
					})
					that.musicList.push({
						name: "风铃声声",
						url: "http://129.226.55.71/file/" + tag + "/风铃声声.mp3"
					})
					that.musicList.push({
						name: "寒风凛冽",
						url: "http://129.226.55.71/file/" + tag + "/寒风凛冽.mp3"
					})
					that.musicList.push({
						name: "礁石海岸",
						url: "http://129.226.55.71/file/" + tag + "/礁石海岸.mp3"
					})
					that.musicList.push({
						name: "飓风",
						url: "http://129.226.55.71/file/" + tag + "/飓风.mp3"
					})
					that.musicList.push({
						name: "雷雨",
						url: "http://129.226.55.71/file/" + tag + "/雷雨.mp3"
					})
					that.musicList.push({
						name: "瀑布",
						url: "http://129.226.55.71/file/" + tag + "/瀑布.mp3"
					})
					that.musicList.push({
						name: "泉涌",
						url: "http://129.226.55.71/file/" + tag + "/泉涌.mp3"
					})
					that.musicList.push({
						name: "日出美景",
						url: "http://129.226.55.71/file/" + tag + "/日出美景.mp3"
					})
					that.musicList.push({
						name: "溶洞",
						url: "http://129.226.55.71/file/" + tag + "/溶洞.mp3"
					})
					that.musicList.push({
						name: "熔岩涌动",
						url: "http://129.226.55.71/file/" + tag + "/熔岩涌动.mp3"
					})
					that.musicList.push({
						name: "山谷狂风",
						url: "http://129.226.55.71/file/" + tag + "/山谷狂风.mp3"
					})
					that.musicList.push({
						name: "山间布谷",
						url: "http://129.226.55.71/file/" + tag + "/山间布谷.mp3"
					})
					that.musicList.push({
						name: "山间鸟语",
						url: "http://129.226.55.71/file/" + tag + "/山间鸟语.mp3"
					})
					that.musicList.push({
						name: "山间溪流",
						url: "http://129.226.55.71/file/" + tag + "/山间溪流.mp3"
					})
					that.musicList.push({
						name: "山间溪水",
						url: "http://129.226.55.71/file/" + tag + "/山间溪水.mp3"
					})
					that.musicList.push({
						name: "深山丛林",
						url: "http://129.226.55.71/file/" + tag + "/深山丛林.mp3"
					})
					that.musicList.push({
						name: "深山老林",
						url: "http://129.226.55.71/file/" + tag + "/深山老林.mp3"
					})
					that.musicList.push({
						name: "踏雪寻梅",
						url: "http://129.226.55.71/file/" + tag + "/踏雪寻梅.mp3"
					})
					that.musicList.push({
						name: "托斯卡纳",
						url: "http://129.226.55.71/file/" + tag + "/托斯卡纳.mp3"
					})
					that.musicList.push({
						name: "卧听流水",
						url: "http://129.226.55.71/file/" + tag + "/卧听流水.mp3"
					})
					that.musicList.push({
						name: "夏日",
						url: "http://129.226.55.71/file/" + tag + "/夏日.mp3"
					})
					that.musicList.push({
						name: "夏日风扇",
						url: "http://129.226.55.71/file/" + tag + "/夏日风扇.mp3"
					})
					that.musicList.push({
						name: "夏日田间",
						url: "http://129.226.55.71/file/" + tag + "/夏日田间.mp3"
					})
					that.musicList.push({
						name: "夏日蛙鸣",
						url: "http://129.226.55.71/file/" + tag + "/夏日蛙鸣.mp3"
					})
					that.musicList.push({
						name: "夏日夜晚",
						url: "http://129.226.55.71/file/" + tag + "/夏日夜晚.mp3"
					})
					that.musicList.push({
						name: "夏日悠房",
						url: "http://129.226.55.71/file/" + tag + "/夏日悠房.mp3"
					})
					that.musicList.push({
						name: "小桥流水",
						url: "http://129.226.55.71/file/" + tag + "/小桥流水.mp3"
					})
				}
			}
		},
		data() {
			return {
				tabs: [
					"禅音",
					"动物",
					"放松训练",
					"交通",
					"课堂",
					"乐器",
					"脑波",
					"影视剧",
					"自然",
					"冥想"
				],
				musicList: [],
				ch_music_list: [

				],
				music_icon: require('../../public/img/music.png'),
				music_playing: require('../../public/img/icon_playing.gif'),
				show: false,
				audios:[new Audio(),new Audio(),new Audio()]
			}
		},
	}
</script>

<style>

</style>
