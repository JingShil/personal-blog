<template>
	<div class="tag-manage-body">
		<div class="tag-manage-head">
			<input placeholder="请输入" v-model="newTitle">
			<button @click="handleSearch">搜索</button>
		</div>
		<div class="tag-manage-container">
			<div class="tag-manage-add" @click="addTag()">
				<el-icon size="200" style="background-clip: text;color: rgb(250, 250, 250);"><Plus /></el-icon>
			</div>
			<div class="tag-manage-for" v-for="(tag,index) in tags" :key="index">
				<h1>{{ tag.name }}</h1>
				<div class="tag-manage-button">
					<button @click="saveTag(tag)">编辑</button>
					<button @click="deleteT(tag.id)">删除</button>
				</div>
				
			</div>
			
		</div>
	</div>
</template>

<script setup>
import {onMounted, ref} from 'vue'
import { getTagListPrivate,deleteTag,save } from '@/api/tag.js';
import { ElMessage, ElMessageBox } from 'element-plus'
let tags = ref([]); 
let newTitle=null;
let name=null;
onMounted(()=>{
	getTags ()
})
//获取所有tag
function getTags () {
  getTagListPrivate()
    .then(res => {
      tags.value = res.data;
      
     
    })
}
function addTag(){
	let tag={
		"name":null
	}
	saveTag(tag)
}
function saveTag(tag){
	ElMessageBox.prompt('请输入名称', 'Tip', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
  })
    .then(({ value }) => {
			tag.name=value
			save(tag)
			.then(res=>{
				if(res.code==1){
					ElMessage({
						type: 'success',
						message: '保存成功',
					})
					getTags()
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

function deleteT(tagId){
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
      deleteTag(tagId)
			.then(res=>{
				if(res.code==1){
					ElMessage({
						type: 'success',
						message: '删除成功',
					})
					getTags()
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
function handlePublished(newPublished){
	
	
}

function handleSearch() {
	name=newTitle;
	getTagListPrivate(name)
	.then(res=>{
		tags.value=res.data
	})
}

function handlePageChange(newPage) {
	
}
</script>


<style src="@/assets/css/tag_manage.css" scoped>

</style>