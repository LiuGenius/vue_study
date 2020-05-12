<template>
	<div id="app" style="height: 100%;width: 100%;">

		<van-nav-bar title="冥想" />
		<van-sidebar v-model="activeKey" style="width: 40%;display: inline-block;" @change="onChange">
			<van-sidebar-item v-for="tab in tabs" :title="tab" />
		</van-sidebar>
		<div style="width: 60%;position: absolute;left: 40%;top: 0%;">
			<van-grid :column-num="1" :gutter="10">
				<van-grid-item @click="clickItem(music)" v-for="music in musicList" :icon="music_icon" :text="music" />
			</van-grid>
		</div>

	</div>

</template>

<script>
	import Vue from 'vue';
	import data from '../../public/js/music.json'
	import {

	} from 'vant';



	export default {
		mounted() {
			this.onChange(0);
		},
		methods: {
			onChange(index) {
				var that = this;
				that.musicList.splice(0, that.musicList.length); //清空数组 

				for (var i = 0; i < data[that.tabs[index]].length; i++) {
					var str = data[that.tabs[index]][i]
					that.musicList.push(str.replace(".mp3", ""));
				}


			},
			clickItem(name) {
				this.audio.pause();
				this.audio.src = "http://129.226.55.71/file/冥想放松/" + this.tabs[this.activeKey] + "/" + name + ".mp3";
				this.audio.play();
			}
		},
		data() {
			return {
				activeKey: 0,
				tabs: [
					"7天专注冥想",
					"7日正念 活在当下",
					"自愈安眠",
					"8天修禅冥想",
					"10天幸福冥想",
					"21天进阶冥想",
					"30天缓解抑郁冥想",
					"30天冥想训练营",
					"Stephanie Kakris冥想",
					"爱自己冥想",
					"晨间冥想",
					"乘车冥想",
					"纯音乐冥想",
					"慈心疗愈冥想",
					"大自然的声乐",
					"儿童专注力正念冥想",
					"放松静心",
					"高考冥想",
					"个人魅力",
					"工作冥想",
					"古曲冥想旋律",
					"行走冥想",
					"和平心境",
					"缓解家庭矛盾",
					"缓解焦虑",
					"接纳自我",
					"金颖",
					"聆听内心的声音",
					"玛吉薇蒳",
					"每时每刻冥想生活",
					"冥想纯音乐",
					"冥想放松的音频",
					"冥想学前课",
					"平和心境",
					"情绪紧急救助冥想",
					"如月",
					"身体扫描",
					"睡眠纯音乐",
					"晚间冥想",
					"温宗堃",
					"新年冥想",
					"学生减压",
					"学习冥想",
					"寻找内心的平静",
					"寻找内心的平静VIP",
					"正念·静心之旅",
					"正念·慈心冥想",
					"正念·减肥",
					"做情绪的主人",
					"职场中的正念冥想练习",
					"钟声提示",
					"5天莲花愈疗冥想",
					"5天情绪自调冥想",
					"5天吸引力冥想",
					"6天缓解焦虑",
					"7天改善睡眠冥想",
					"7日正念 活在当下",
					"7天感恩冥想",
					"7天基础冥想",
					"7天舒眠冥想",
					"7天幸福冥想"
				],
				musicList: [],
				ch_music_list: [

				],
				music_icon: require('../../public/img/music.png'),
				music_playing: require('../../public/img/icon_playing.gif'),
				show: false,
				audio:new Audio(),
				
			}
		},
	}
</script>

<style>

</style>
