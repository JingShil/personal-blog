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
			<router-link v-if="token" to="/edit" style="text-decoration: none;color: inherit;" class="head-menu-item" 
			>
				<div>新建</div>
			</router-link>
			<div v-else style="text-decoration: none;color: inherit;" class="head-menu-item">
					<div class="head-menu-item-forbid">新建</div>
			</div>
			<router-link v-if="token" to="/controller" style="text-decoration: none;
					color: inherit;" class="head-menu-item" 
			>
				<div>控制台</div>
			</router-link> 
			<div v-else style="text-decoration: none;color: inherit;" class="head-menu-item">
					<div class="head-menu-item-forbid">控制台</div>
			</div>
			<!-- <div class="head-menu-item">链接</div>
			<div class="head-menu-item">说明</div> -->
		</div>
		<div v-if="token" class="head-exit" @click="exit">
			<img src="@/assets/imgs/退出.svg">
			<span>退出登录</span>
		</div>
		<div v-else class="head-login" @click="login">
			<img src="@/assets/imgs/登陆.svg">
			<span>登录</span>
		</div>
	</div>
</template>

<script setup>
import {ref} from "vue"
import { useRouter } from "vue-router";
import { ElMessage, ElMessageBox } from 'element-plus'
const router = useRouter();
const token = ref(localStorage.getItem("token"));

//登陆
function login(){
	router.push(({ path: "/login" }));
}

function exit(){
	ElMessageBox.confirm(
    '确定退出吗？',
    'Warning',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(() => {
			localStorage.removeItem("token");
			localStorage.removeItem("userInfo");
     	location.reload();
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消',
      })
    })
}
</script>


<style src="../../../assets/css/head.css" scoped>

</style>