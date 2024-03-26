<template>
	<div class="controller-body">
		<div class="controller-menu">
			<img src="@/assets/imgs/controller/酒吧_icon菜单-01-01.svg" style="height:90px;width: 90px;">
			<div class="controller-menu-item" @click="selectMenu(1)"
				:class="{ 'controller-menu-select': menu==1 }"
			>
				<img src="@/assets/imgs/controller/用户.svg">
				<span>个人信息</span>
			</div>
			<div class="controller-menu-item" @click="selectMenu(2)"
				:class="{ 'controller-menu-select': menu==2 }"
			>
				<img src="@/assets/imgs/controller/博文主题.svg">
				<span>博文管理</span>
			</div>
			<div class="controller-menu-item" @click="selectMenu(3)"
				:class="{ 'controller-menu-select': menu==3 }"
			>
				<img src="@/assets/imgs/controller/标签.svg">
				<span>标签管理</span>
			</div>
		</div>
		<div class="controller-main">
			<div class="controller-head">
				<div class="controller-head-item" v-if="menu==1">
					<img src="@/assets/imgs/controller/用户.svg">
					<h1>个人信息</h1>
				</div>
				<div class="controller-head-item" v-if="menu==2">
					<img src="@/assets/imgs/controller/博文主题.svg">
					<h1>博文管理</h1>
				</div>
				<div class="controller-head-item" v-if="menu==3">
					<img src="@/assets/imgs/controller/标签.svg">
					<h1>标签管理</h1>
				</div>
			</div>
			<div class="controller-container">
				<UserManage v-if="menu==1"></UserManage>
				<BlogManage v-if="menu==2"></BlogManage>
				<TagManage v-if="menu==3"></TagManage>
			</div>
		</div>
	</div>
	
</template>

<script setup>
import {ref,defineComponent} from 'vue'
import BlogManage from './blog_manage/Index'
import TagManage from './tag_manage/Index'
import UserManage from './user_manage/Index'
components: {
	BlogManage,TagManage,UserManage  // 局部注册组件
}

let menu = ref(1);

function selectMenu(index){
	menu.value=index;
}
</script>




<style src="@/assets/css/controller.css" scoped>

</style>