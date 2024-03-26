<template>
  <div class="edit-body">
    <div class="edit-head">
      <div class="edit-title-input">
        <input placeholder="请输入标题"
               maxlength="100"
               v-model="article.title" />
        <span>0/100</span>
      </div>
      <el-button class="edit-save"
                 >保存</el-button>
      <el-button type="primary"
                 @click="saveArticle(1)">发布</el-button>
      <img src="../../assets/imgs/fufu.jpg"
           style="height: 40px;margin-left: 20px;border-radius: 30px;">
    </div>
    <div class="edit-container">
      <div class="edit-left">
        <div class="edit-content"
             id="vditor"></div>
      </div>
      <div class="edit-right">
        <div class="edit-help">
          <div class="edit-help-item" @click="setMenu(0)">
            <img src="../../assets/imgs/目录.svg">
            <span>目录</span>
          </div>
          <div class="edit-help-item" @click="setMenu(1)">
            <img src="../../assets/imgs/标签.svg">
            <span>标签</span>
          </div>
          
          
          <div class="edit-help-item">
            <img src="../../assets/imgs/AI-chat.svg">
            <span>AI助手</span>
          </div>
          <div class="edit-help-item">
            <img src="../../assets/imgs/帮助与说明.svg">
            <span>语法</span>
          </div>
        </div>
        <div class="edit-help-content">

          <div class="edit-help-content-item"
               v-if="menu==0">
            <div class="edit-help-content-head">
              <span>文章目录</span>
            </div>
            <div class="edit-help-catalog">
              <div class="edit-help-catalog-for"
                   v-for="(catalog, index) in catalogs"
                   :key="index">
                <span :id="catalog.id"
                      :style="{ marginLeft: catalog.level * 20 + 'px'}"
                      @click="scrollTo(catalog.id)">{{ catalog.title }}</span>

              </div>
            </div>

          </div>

          <div class="edit-help-content-item"
               v-if="menu==1">
            <div class="edit-help-content-head">
              <span>标签</span>
            </div>
            <div class="edit-help-tag">
              <div class="edit-help-tag-for"
                   v-for="(tag, index) in tags"
                   :key="index">
                <span class="edit-tag"
                      type="primary"
                      :class="{ 'edit-tag-select': isSelected(tag.id) }"
                      @click="selectTag(tag)">{{ tag.name }}</span>
              </div>
            </div>
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
import { ref, onMounted, onBeforeMount } from 'vue';
import { getTagList } from '@/api/tag.js';
import { save } from '@/api/article.js'
import {getArticleOne} from '@/api/article.js'
import { useRoute } from 'vue-router';
import { ElMessage, ElMessageBox } from 'element-plus'
const route = useRoute();
const vditor = ref()
let catalogs = ref([])
const uploadUrl = "http://localhost:8081/img/upload"
let menu = ref(0);
let tags = ref([]);
let articleTags = {};
let articleTagList = ref([]);
let articleId = null;
const timer = ref(null);
let article=ref({
  "id": null,
  // "userId": "1",
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
if(route.query.articleId != null){
  // console.log(route.query.article)
  articleId=route.query.articleId
  // console.log(article);
}

// console.log(route.query.article);
// let article= this.$route.query.article
// 3. 在组件初始化时，就创建Vditor对象，并引用

onMounted(() => {
  vditor.value = new Vditor('vditor', {
    // height: '200px',
    width: '100%',
    height: '80vh',
    tab: "\t",
    // "outline": {
    // 	"enable": true
    // },
    toolbar: [
      'emoji', 'headings', 'bold', 'italic', 'strike', '|', 'line', 'quote', 'list', 'ordered-list', 'check',
      'code', 'inline-code', 'insert-after', 'insert-before', 'undo', 'redo', 'link', 'table', 'edit-mode',
      'both', 'content-theme', 'export','upload'


    ],
    hljs:{style:"manni"},
   

    input (value) {
      getCatalog();
      console.log(value.length)
    },
    after () {
      
      
      
      vditor.value.setValue("");
      getArticle();
      autosave();
      
    },
    upload:{
      multiple:false,
      url:uploadUrl,
      accept:'image/jpg, image/jpeg, image/png',
      fieldName: 'file',
      max: 10 * 1024 * 1024,
      headers:{"Token":localStorage.getItem("token")},
     
    }


  })
  getTags();
  
})

onBeforeMount(() => {
  clearInterval(timer.value); // 在组件销毁前清除定时器
});
//设置help
function setMenu(index){
  menu.value=index;
}
function isSelected(tagId) {
  for(let tagOne of articleTagList.value){
    if(tagOne.id==tagId){
      return true;
    }
  }
  return false;
}
//获取文章
function getArticle(){
  
  if(articleId!=null)
    getArticleOne(articleId)
    .then(res=>{
     
      articleTagList.value=res.data.tagList;
      
      article.value=res.data.article;
      vditor.value.setValue(article.value.content);
      getCatalog();
    })
  
}


//选择tag
function selectTag (tag) {
  
  
  for(let tagOne of articleTagList.value){
    if(tagOne.id==tag.id){
      articleTagList.value = articleTagList.value.filter(tagOne => tagOne.id !== tag.id);
      return;
    }
  }
  articleTagList.value.push(tag);

}
function autosave () {
  if(article.value.id != null){
    timer.value = setInterval(() => {
      
        saveArticle(article.value.published);
      
    }, 30000);
  }
}
//保存文章
function saveArticle (published) {

  let markdown = vditor.value.getValue();
  if (markdown == null) {
    markdown = "";
  }
  if (article.value.title == null) {
    article.value.title = "无标题";
  }
  article.value.content = markdown;
  article.value.published = published;
  articleTags = {
    "article": article.value,
    "tagList": articleTagList.value
  };
  // console.log(articleTags);
  ElMessageBox.confirm(
    '确定保存吗？',
    // 'Warning',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(() => {
			save(articleTags)
			.then(res=>{
				
				if(res.code==1){
					ElMessage({
						type: 'success',
						message: '保存成功',
					})
					
				}else{
					ElMessage({
						type: 'info',
						message: '保存失败',
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

//获取所有tag
function getTags () {
  getTagList()
    .then(res => {
      tags.value = res.data;
      
     
    })
}

//生成目录
function getCatalog () {
  //给标题附上id
  const vditorModel = vditor.value.getCurrentMode();

  const article_contents = document.getElementsByClassName("vditor-reset");
  const titleTag = ["H1", "H2", "H3", "H4", "H5", "H6"];
  let article_content = null;
  let article_content2 = null;
  let model = 'ir';
  article_content = article_contents[2];
  if (vditorModel === 'wysiwyg') {
    article_content2 = article_contents[0];
    model = 'wysiwyg';
  } else if (vditorModel === 'sv') {
    article_content2 = article_contents[1];
    model = 'sv';
  } else if (vditorModel === 'ir') {
    article_content2 = article_contents[2];
    model = 'ir';
  }
  // console.log(article_content)
  let i = 0;
  let ids = []
  article_content.childNodes.forEach((e, index) => {
    // console.log(e);
    // console.log(article_content2.childNodes[index]);
    if (titleTag.includes(e.nodeName)) {
      const id = model + "-" + index;
      ids.push(id)

      article_content2.childNodes[index].id = id
    }
  })

  //根据HTML内容，生成树
  const article_content1 = new DOMParser().parseFromString(vditor.value.getHTML(), "text/html");
  const titleTag1 = ["H1", "H2", "H3", "H4", "H5", "H6"];

  let titles = [];
  // 将childNodes转换为数组
  const childNodesArray = Array.from(article_content1.body.childNodes);
  let pre = 1;
  let now = 0;
  let count = 1;
  let num = 0;
  childNodesArray.forEach((e, index) => {
    if (titleTag.includes(e.nodeName)) {
      const id = ids[num++];
      now = Number(e.nodeName.substring(1, 2));
      // if (pre > now) {
      //   count=pre-now;
      // } else if (pre < now) {
      //   count++;
      // }
      // pre = now;
      // console.log(count)
      titles.push({
        id: id,
        title: e.innerHTML,
        level: now,
        nodeName: e.nodeName
      });
    }
  });

  catalogs.value = titles;



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


<style src="../../assets/css/edit.css" scoped>
</style>