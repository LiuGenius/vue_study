import Vue from 'vue'
import App from './App.vue'
import router from './router'


//引入文件

import {
	Toast,
	Divider,
	Overlay,
	Image as VanImage,
	Sidebar,
	SidebarItem,
	Grid, GridItem,
	NavBar,
	Tab,Tabs,
	Button
} from 'vant';




import 'vant/lib/image/style';
import 'vant/lib/tabs/style';
import 'vant/lib/tab/style';
import 'vant/lib/nav-bar/style';
import 'vant/lib/toast/style';
import 'vant/lib/grid/style';
import 'vant/lib/grid-item/style';
import 'vant/lib/button/style';
import 'vant/lib/sidebar-item/style';
import 'vant/lib/sidebar/style';

Vue.use(Toast).use(Divider).use(Overlay).use(VanImage)
.use(Sidebar).use(SidebarItem).use(GridItem).use(Grid).use(NavBar).use(Tab).use(Tabs).use(Button);

Vue.config.productionTip = false

new Vue({
	router,
	render: h => h(App)
}).$mount('#app')
