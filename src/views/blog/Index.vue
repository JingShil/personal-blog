<template>
	<div class="blog-body">
		<div class="blog-left">
			<div class="blog-catalog">
				<div class="blog-catalog-head">
					<img src="@/assets/imgs/目录2.svg">
					<h1>目录</h1>
					<div class="blog-catalog-progress">{{ progress }}</div>
				</div>
				<div class="blog-catalog-main">
					<div class="blog-catalog-for"
								v-for="(catalog, index) in catalogs"
								:key="index">
						<div class="blog-catalog-margin" :style="{ marginLeft: catalog.level * 15 + 'px'}"></div>
						<div class="blog-catalog-line"></div>
						<span @click="scrollTo(catalog.id)" :style="{backgroundImage:catalog.color}" style="transition: 0.3s;">{{ catalog.title }}</span>

					</div>
				</div>
			</div>
		</div>
		<div class="blog-center">
			<h1 class="blog-title">{{ article.title }}</h1>
			<div id="vditor" class="blog-content" ></div>
			<div class="blog-comment"><Comment></Comment></div>
		</div>
		<div class="blog-right">
			<div class="blog-user">
				<div class="blog-user-basic">
					<img v-if="authorInfo!=null" :src="imgDownload+authorInfo.avatar" style="height: 50px;">
					<span style="margin-top:10px">{{ adminInfo.name }}</span>
				</div>
				<div class="blog-user-link">
					<div class="blog-user-link-item">
						<img src="../../assets/imgs/微信.svg">
					</div>
					<div class="blog-user-link-item">
						<img src="../../assets/imgs/QQ.svg">
					</div>
					<div class="blog-user-link-item">
						<img src="../../assets/imgs/github.svg">
					</div>
					<div class="blog-user-link-item">
						<img src="../../assets/imgs/邮箱.svg">
					</div>
				</div>
				<div class="blog-data">
					<div class="blog-data-item">
						<el-icon><View /></el-icon>
						<span>1</span>
					</div>
					<div class="blog-data-item">
						<el-icon><Pointer /></el-icon>
						<span>1</span>
					</div>
					<div class="blog-data-item">
						<el-icon><Star /></el-icon>
						<span>1</span>
					</div>
					<div class="blog-data-item">
						<el-icon><ChatLineSquare /></el-icon>
						<span>1</span>
					</div>
				</div>
			</div>
			<div class="blog-tag">
				<div class="blog-tag-head">
					<img src="@/assets/imgs/标签2.svg">
					<h1>标签</h1>
				</div>
				<div class="blog-tag-main">
					<div class="blog-tag-for"
								v-for="(tag, index) in articleTagList"
								:key="index">
						<span class="blog-tag-item">{{ tag.name }}</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
// 1.1 引入Vditor 构造函数
import Vditor from 'vditor'
// 1.2 引入样式
import 'vditor/dist/index.css';
import { ref, onMounted,onBeforeUnmount,inject } from 'vue';
import { useRoute } from 'vue-router';
import {getArticleOne} from '@/api/article.js'
import {getAdminUserInfo,download,getArticleUserInfo} from '@/api/user.js'
import Comment from '../comment/Index.vue'
// import VditorPreview from 'vditor/dist/method.min.js';
// 2. 获取DOM引用
const route = useRoute();
const progress = ref(0);
const vditor = ref();
const imgDownload = inject('globalImgDownload');

let articleId=null;
let articleTagList = ref([]);
let catalogs = ref([])
let tags = ref([]);
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
let adminInfo=ref({
	"name":null,
	"birthday":null,
	"avatar":null,
	"sex":null,
	"location":null,
	"college":null
});
let authorInfo=ref(null)
let avatar=ref()
let isLogin=ref(false);
if(route.query.articleId != null){
  // console.log(route.query.article)
  articleId=route.query.articleId
  // console.log(article);
}
// 3. 在组件初始化时，就创建Vditor对象，并引用
onMounted(() => {
	
	getAdmin();
	if(articleId != null)
	getArticle()
	window.addEventListener("scroll", handleScroll,true);
	

})
onBeforeUnmount(()=>{
	window.removeEventListener("scroll", handleScroll);
})

function handleScroll() {
  let catalog = catalogs.value;
	let i=catalogs.value.length-1;
	let flag=0;
	for(i;i>=0;i--){
		if(catalog[i].scrollTop<=window.scrollY && flag==0){
			progress.value=parseInt(
									(window.scrollY / document.documentElement.scrollHeight) *
											100
							) + "%";
			flag=1;
			catalog[i].color="linear-gradient(to top,#f1214e,#6989e0,#43c6ee,#7ff121)";
		}else{
			catalog[i].color="linear-gradient(to right, #0e0d0d, #020202)";
		}
	}
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
    // downloadAvatar()
  })
}

function getArticleUser(){

	getArticleUserInfo(article.value.userId)
		.then(res=>{
			authorInfo.value=res.data;
		})
}


// //获取所有tag
// function getTags () {
//   getTagList()
//     .then(res => {
//       tags.value = res.data;
      
     
//     })
// }

//获取文章
function getArticle(){
  
  if(articleId!=null)
    getArticleOne(articleId)
    .then(res=>{
     
      articleTagList.value=res.data.tagList;
      
      article.value=res.data.article;
			const vditorSpan = document.getElementById("vditor");
			Vditor.preview(vditorSpan,article.value.content,{
				hljs:{style:"manni"},
				after(){
					getCatalog();
				}
			});
			getArticleUser();
			
     
    })
  
}

//生成目录
function getCatalog () {
  let ma = document.getElementById("vditor");
	const titleTag = ["H1", "H2", "H3", "H4", "H5", "H6"];
	let titles=[];
	let pre = 1;
  let now = 0;
  let count = 1;
  let num = 0;
	let parent=1;
  ma.childNodes.forEach((e, index) => {
    if (titleTag.includes(e.nodeName)) {
      // const id = ids[num++];
			let id = 'ma-' + index;
			ma.childNodes[index].id = id
      now = Number(e.nodeName.substring(1, 2));
      // if (pre > now) {
      //   count=parent;
			// 	parent=now;
      // } else if (pre < now) {
      //   count++;
      // }
      // pre = now;
      titles.push({
        id: id,
        title: e.innerHTML,
        level: now,
        nodeName: e.nodeName,
				scrollTop: e.offsetTop,
				color:"linear-gradient(to right, #0e0d0d, #020202)"
      });
    }
  });
	catalogs.value=titles;
	
	
}

//点击目录，自动追寻文章相应位置
function scrollTo (sectionId) {

  const element = document.getElementById(sectionId);
  if (element) {
    console.log(sectionId)
    element.scrollIntoView({ behavior: 'instant' });
  }
}

</script>



<style src="../../assets/css/blog.css" scoped>

</style>