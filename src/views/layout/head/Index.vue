<template>
	<div class="head-body">
		<div class="head-title">
			<img src="../../../assets/imgs/fufu.jpg" class="head-title-avatar">
			<h1 class="head-title-text">
				OP大本营
			</h1>
		</div>
		<div class="head-menu">
			<!-- <router-link to="edit">首页</router-link> -->
			<router-link to="/" style="text-decoration: none;
					color: inherit;" class="head-menu-item"
			>
				<div>首页</div>
			</router-link> 
			<router-link to="/user" style="text-decoration: none;
					color: inherit;" class="head-menu-item"
			>
				<div>站长介绍</div>
			</router-link> 
			<router-link to="/edit" style="text-decoration: none;color: inherit;" class="head-menu-item"
			>
				<div>新建</div>
			</router-link>
			<router-link to="/controller" style="text-decoration: none;
					color: inherit;" class="head-menu-item"
			>
				<div>控制台</div>
			</router-link> 
			<!-- <div class="head-menu-item">链接</div>
			<div class="head-menu-item">说明</div> -->
		</div>
		<!-- <div class="head-search">
			<el-input style="width: 250px" placeholder="请输入"/>
			<el-button type="primary"><el-icon><Search /></el-icon></el-button>
		</div> -->
	</div>
</template>

<style src="../../../assets/css/head.css" scoped>

</style>