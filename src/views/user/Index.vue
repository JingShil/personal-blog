<template>
	<div class="user-body">
		<div class="user-basic">
			<img :src="avatar" class="user-avatar">
			<span class="user-name">{{ adminInfo.name }}</span>
			<div class="user-link">
				<div class="user-link-item">
					<img src="../../assets/imgs/微信.svg">
				</div>
				<div class="user-link-item">
					<img src="../../assets/imgs/QQ.svg">
				</div>
				<div class="user-link-item">
					<img src="../../assets/imgs/github.svg">
				</div>
				<div class="user-link-item">
					<img src="../../assets/imgs/邮箱.svg">
				</div>
			</div>
			<div class="user-detail">
				<div class="user-detail-item">
					<div>毕业院校</div>
					<span>{{ adminInfo.college }}</span>
				</div>
				<div class="user-detail-item">
					<div>所在城市</div>
					<span>{{ adminInfo.location }}</span>
				</div>
			</div>
			
		</div>
		<div class="user-main">
			<div class="user-container">
				<div id="vditor" class="user-content"></div>
			</div>
			
		</div>
		
	</div>
</template>


<script setup>
import {getAdminUserInfo,download} from '@/api/user.js'

import {ref, onMounted} from 'vue'
import Vditor from 'vditor'
// 1.2 引入样式
import 'vditor/dist/index.css';
import { useRoute } from 'vue-router';
import {getArticleOne} from '@/api/article.js'
let managed=ref(false);
const vditor = ref()
let articleId=1;
let adminInfo=ref({
	"name":null,
	"birthday":null,
	"avatar":null,
	"sex":null,
	"location":null,
	"college":null
});
let article=ref({
  "id": null,
  "userId": "1",
  "title": "",
  "content": "",
  "published": null,
  "likeNum": null,
  "collectNum": null,
  "viewNum":null,
  "commentNum": null,
  "createTime": null,
  "updateTime": null
})
// let adminInfoShow=ref();
let avatar=ref()

onMounted(()=>{
	if(articleId != null)
	getArticle()
	getAdmin();
})

//获取文章
function getArticle(){
  
  if(articleId!=null)
    getArticleOne(articleId)
    .then(res=>{
    
      
      article.value=res.data.article;
			const vditorSpan = document.getElementById("vditor");
			Vditor.preview(vditorSpan,article.value.content,{
				hljs:{style:"manni"},
				// theme:{
				// 	current:"wechat"
				// },
			});
			
     
    })
  
}

function downloadAvatar(){
	download(adminInfo.value.avatar)
	.then(res=>{
		// const blob = new Blob([res.data]);
		const reader = new FileReader();
		reader.readAsDataURL(res);
		reader.onload = () => {
			avatar.value = reader.result;
		};
		// avatar.value=res;
	})
}

function getAdmin(){
  
  getAdminUserInfo()
  .then(res=>{
    adminInfo.value=res.data
    // adminName=adminInfo.value.name
    downloadAvatar()
  })
}

</script>

<style src="../../assets/css/user.css" scoped>

</style>
