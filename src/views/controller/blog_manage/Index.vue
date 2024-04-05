<template>
	<div class="blog-manage-body">
		<div class="manage-blogs-head">
			<el-select
				class="manage-select"
				v-model="articleStatus"
				placeholder="全部"
				size="large"
				style="width: 100px"
			>
				<el-option value="全部" @click="handlePublished(null)"/>
				<el-option value="可见" @click="handlePublished(1)"/>
				<el-option value="不可见" @click="handlePublished(0)"/>
			</el-select>
			
			<input placeholder="请输入" v-model="newTitle">
			<button @click="handleSearch">搜索</button>
		</div>
		<div class="manage-blogs">
			<div class="manage-blog" v-for="(blog,index) in blogs.records" :key="index">
				<div class="manage-blog-title">
					<h4>{{ blog.title }}</h4>
					<span>{{ blog.updateTime }}</span>
				</div>
				<div class="manage-blog-published">
					<div class="manage-blog-published-true" v-if="blog.published">可见</div>
					<div class="manage-blog-published-false" v-else>不可见</div>
				</div>
				<div class="manage-blog-info">
					<div class="manage-blog-data">
						<div class="manage-blog-data-item">
							<span>阅读</span>
							<span>{{ blog.commentNum }}</span>
						</div>
						<div class="manage-blog-data-item">
							<span>点赞</span>
							<span>{{ blog.likeNum }}</span>
						</div>
						<div class="manage-blog-data-item">
							<span>收藏</span>
							<span>{{ blog.collectNum }}</span>
						</div>
					</div>

					<div class="manage-blog-operation">
						<router-link :to="{path:'/blog',query:{articleId:blog.id}}"><button>查看</button></router-link>
						<router-link :to="{path:'/edit',query:{articleId:blog.id}}"><button>编辑</button></router-link>
						
						<button @click="deleteA(blog.id)">删除</button>
					</div>
					
				</div>
			</div>
		</div>
		<div class="manage-pagination">
			<el-pagination layout="prev, pager, next" 
			@current-change="handlePageChange" :current-page="articleListElement.pageNumber" :total="blogs.total" :page-size="articleListElement.pageSize"></el-pagination>
		</div>
	</div>
</template>

<script setup>
import {onMounted, ref} from 'vue'
import {getArticles,getArticlePrivate} from "@/api/article.js";
import {deleteArticle} from "@/api/article.js";
import { ElMessage, ElMessageBox } from 'element-plus'
let drafted=ref(false);


let blogs=ref([])
let articleStatus=ref()


let newTitle=null;


let articleListElement={
	"pageNumber":1,
	"pageSize":4,
	"userId":1,
	"tagId":null,
	"title":null,
	"published":null,
	"order":1,
}
onMounted(()=>{
	getList()
})

function handlePublished(newPublished){
	articleListElement.published=newPublished;
	getList();
}

function handleSearch() {
	articleListElement.title=newTitle;
	getList();
}

function handlePageChange(newPage) {
	articleListElement.pageNumber = newPage; // 更新pageNumber的值
	getList(); // 调用getList方法
}

function getList(){

	// getArticleList(pageNumber, pageSize, userId, tagId, title, published, order)
	// 	.then(res=>{
	// 		blogs.value=res.data;
			
			
	// 	})
	
	getArticlePrivate(articleListElement)
	.then(res=>{
		blogs.value=res.data;
	})
	.catch(error=>{
		
	})
}

function deleteA(articleId){
	ElMessageBox.confirm(
    '确定删除吗？',
    'Warning',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(() => {
			deleteArticle(articleId)
			.then(res=>{
				getList();
				if(res.code==1){
					ElMessage({
						type: 'success',
						message: '删除成功',
					})
					
				}else{
					ElMessage({
						type: 'info',
						message: '删除失败',
					})
				}
			})
			
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消',
      })
    })
	
}


function openDrafted(){
	drafted.value=true;
}

function closeDrafted(){
	drafted.value=false;
}
</script>

<style src="@/assets/css/blog_manage.css" scoped>

</style>