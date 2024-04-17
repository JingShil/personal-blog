<template>
  <div class="home-body">


    <div class="home-line">
      <div class="home-line-content">
        <el-icon size="30px"><Memo /></el-icon>
        <span>文章列表</span>
      </div>
      <div class="home-search">
        <input placeholder="请输入" v-model="newTitle">
        <button @click="handleSearch">搜索</button>
      </div>
    </div>

    <div class="home-container">

      <div class="home-main">
        <div class="home-classify">
          

          <div class="home-classify-item">
            <span style="width: 50px;">标签</span>
 
            <div class="home-classify-for">
              <div 
                  v-for="(tag, index) in tags"
                  :key="index">
                <span class="home-classify-for-item"
                      type="primary"
                      :class="{ 'home-tag-select': isSelected(tag.id) }"
                      @click="selectTag(tag.id)">{{ tag.name }}</span>
              </div>
            </div>
            
          </div>
          <div class="home-classify-item">
            <span style="width: 50px;">排序</span>
            <div class="home-classify-for">
              <div  v-for="(sort,index) in sorts" 
                  :key="index">
                <span class="home-classify-for-item" 
                :class="{ 'home-tag-select': isSelectedOrder(sort.value) }"
                @click="selectedOrder(sort.value)">{{ sort.name }}</span>
              </div>
            </div>
            
            
          </div>
        </div>

        <div class="home-content">
          <div class="home-content-for"
               v-for="(blog,index) in blogs.records"
               :key="index">
            <div class="home-content-item">

              <div class="home-content-item-right">
                <div class="home-content-item-article">
                    <router-link :to="{path:'/blog',query:{articleId:blog.id}}" class="home-link"></router-link>
                    <div class="home-content-item-title"><span>{{ blog.title }}</span></div>
                    <div class="home-content-item-content">
                      <span style="margin-top:10px;white-space: pre-wrap;overflow: hidden;" 
                      v-html="parseMarkdown(blog.content)"></span>
                    </div>
                </div>
                <!-- <div class="home-content-item-bottom">
                  <img class="home-content-item-avatar"
                       src="../../assets/imgs/fufu.jpg">
                  <div class="home-content-item-author">op</div>
                  <div class="home-content-item-time">今天</div>
                </div> -->
              </div>
            </div>
          </div>
        </div>

        <div class="home-content-pagination">
					<el-pagination layout="prev, pager, next" 
					@current-change="handlePageChange" :current-page="articleListElement.pageNumber" :total="blogs.total" :page-size="articleListElement.pageSize"></el-pagination>
				</div>

      </div>

      <div class="home-user">
        <div class="home-user-cover"></div>
        <img v-if="adminInfo!=null" :src="imgDownload + adminInfo.avatar" class="home-user-avatar">
        <h1 class="home-user-name">{{ adminName }}</h1>
        <span class="home-user-name-lite">欢迎来到我的博客</span>
        <!-- <div class="home-user-link">

        </div> -->
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeMount,defineComponent,inject } from 'vue';
import {getArticles} from "@/api/article.js";
import { getTagList } from '@/api/tag.js';
import {getAdminUserInfo,download} from '@/api/user.js'
import Vditor from 'vditor';
import MarkdownIt from 'markdown-it';
import markdownItHeadingAnchor from 'markdown-it-headinganchor';

// import { ElPagination } from 'element-plus'
// components: {
// 	ElPagination
// }
let labels=ref(['java', 'css', 'html', 'java', 'css', 'html', 'java', 'css', 'html', 'java', 'css', 'html', 'java', 'css', 'html',]);
let sorts= ref([
  {
    "name":"升序",
    "value":"0"
  },
  {
    "name":"降序",
    "value":"1"
  }

]);
const imgDownload = inject('globalImgDownload');
let tags = ref([]); 

let articleTag = ref();
let blogs=ref([])
let ordered=ref();
let newTitle=null;
let articleListElement={
	"pageNumber":1,
	"pageSize":4,
	"tagId":null,
	"title":null,
	"published":null,
	"order":1,
}
const adminInfo=ref()
let avatar=ref()
let adminName=ref()
onMounted(()=>{
	getList();
  getTags();
  getAdmin();
  
})



function getAdmin(){

  getAdminUserInfo()
  .then(res=>{
    adminInfo.value=res.data
    adminName=adminInfo.value.name
    // downloadAvatar()
  })
}

//选择排序
function isSelectedOrder(orderId) {

return ordered.value==orderId
}

function selectedOrder(orderId){
  if(ordered.value!=orderId){
    ordered.value=orderId
    
    
  }else{
    ordered.value=null;
  }
  articleListElement.order=ordered.value;
  getList();
}
function setBackground_url(url){
  background_url.value=url;
}
//选择标签
function isSelected(tagId) {

  return articleTag.value==tagId
}

//选择tag
function selectTag (tagId) {
  
  if(articleTag.value!=tagId){
    articleTag.value=tagId
    
    
  }else{
    articleTag.value=null;
  }
  articleListElement.tagId=articleTag.value;
  getList();
}

//获取所有tag
function getTags () {
  getTagList()
    .then(res => {
      tags.value = res.data;
      
     
    })
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
  
	getArticles(articleListElement)
	.then(res=>{
		blogs.value=res.data;

    
    
	})
}

function parseMarkdown(content) {
  const md = new MarkdownIt();

  const result = md.render(content).replace(/<h[1-6]>.*?<\/h[1-6]>\n?/g, '')
 
  return result;
}


</script>


<style src="../../assets/css/home.css" scoped>
</style>