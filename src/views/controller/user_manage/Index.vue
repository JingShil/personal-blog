<template>
	<div class="user-manage-body">
		<el-upload
			class="user-manage-avatar-uploader"
			:action="uploadImgUrl"
			:data="ImageData"
			:show-file-list="false" 
			:headers="headers"
			method="put"
			:on-success="handleAvatarSuccess"
			:before-upload="beforeAvatarUpload"
			@mouseover="showMessage = true" @mouseleave="showMessage = false"
		>
			<img v-if="userInfo.avatar != null" :src="imgDownload + userInfo.avatar" class="user-manage-avatar" />
			<img v-else src="@/assets/imgs/fufu.jpg" class="user-manage-avatar" />
			<div class="user-manage-avatar-cover" v-if="showMessage">
				<img src="@/assets/imgs/controller/头像上传.svg" style="height: 40px;color: rgb(253, 253, 253);" />
			</div>
		</el-upload>
		<div class="user-manage-item">
			<span class="user-manage-item-label">姓名</span>
			<el-input style="width: 260px" placeholder="请输入姓名" v-model="userInfo.name"/>
		</div>
		<div class="user-manage-item">
			<span class="user-manage-item-label">性别</span>
			<el-radio-group v-model="userInfo.sex"  style="width: 260px">
				<el-radio :value="1" size="large">男</el-radio>
				<el-radio :value="2" size="large">女</el-radio>
			</el-radio-group>
		</div>
		<div class="user-manage-item">
			<span class="user-manage-item-label">生日</span>
			<el-date-picker
        v-model="userInfo.birthday"
        type="date"
        placeholder="请输入生日"
				style="width: 260px"

				
      />
		</div>
		<div class="user-manage-item">
			<span class="user-manage-item-label">所在地</span>
			<el-input style="width: 260px" placeholder="请输入所在地" v-model="userInfo.location"/>
		</div>
		<div class="user-manage-item">
			<span class="user-manage-item-label">毕业院校</span>
			<el-input style="width: 260px" placeholder="请输入毕业院校" v-model="userInfo.college"/>
		</div>
		<!-- <div class="user-manage-item">
			<span>密码</span>
			<el-input style="width: 260px" placeholder="请输入新密码" v-model="password"/>
		</div> -->
		<div class="user-manage-button">
			<el-button type="primary" style="width: 80px;" @click="saveUser">确认修改</el-button>
			<el-button type="default" style="width: 80px;" @click="reset">重置</el-button>
		</div>
	</div>
</template>

<script setup>
import {ref,onMounted,inject} from 'vue'
import {save,download,getUserInfo} from '@/api/user'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useRouter } from "vue-router";
 
const router = useRouter();
let showMessage=ref(false)
let userInfo=ref(JSON.parse(localStorage.getItem("userInfo")));
const imgDownload = inject('globalImgDownload');

// let password = ref(null);
let avatar=ref();
//上传头像

const headers = ref({ "Token":localStorage.getItem("token")});

const uploadImgUrl = ref("http://43.129.171.44:8081/user/upload/avatar");

const ImageData = ref()
// 上传之前
onMounted(()=>{
	// userInfo.value.avatar=require(userInfo.value.avatar);
	// getImageUrl();
	// downloadAvatar();
})

const beforeAvatarUpload = (rawFile) => {
  if (rawFile.type !== "image/jpeg"&&rawFile.type !== "image/png"&&rawFile.type !== "image/jpg") {
    ElMessage({
      showClose:true,
      message:'图片只能是JPG或PNG格式！',
      type:'warning'
    });
    return;
  }
  if (rawFile.size / 1024 / 1024 > 5) {
    ElMessage({
      showClose:true,
      message:'图片大小不能超过5MB！',
      type:'warning'
    });
    return;
  }
// 一般是formData格式
  ImageData.value = new FormData();
// 'file'具体是什么字段看项目接口文档
  ImageData.value.append('file',rawFile);
};
function reset(){
	
	ElMessageBox.confirm(
    '确定重置吗？',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(() => {

			userInfo.value=JSON.parse(localStorage.getItem("userInfo"));
      ElMessage({
				type: 'success',
				message: '重置成功',
			})
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消',
      })
    })
}
// 上传成功回调
const handleAvatarSuccess = (res, uploadFile) => {
 avatar.value = URL.createObjectURL(uploadFile.raw);
};

function downloadAvatar(){
	download(userInfo.value.avatar)
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

function getUser(){
	getUserInfo()
	.then(res=>{

		localStorage.setItem("userInfo",JSON.stringify(res.data))
		userInfo.value=res.data
	})
}

function saveUser(){
	ElMessageBox.confirm(
    '确定保存吗？',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(() => {
			
			let user={
				"name":userInfo.value.name,
				"birthday":userInfo.value.birthday,
				"sex":userInfo.value.sex,
				"location":userInfo.value.location,
				"college":userInfo.value.college,
				"createTime":userInfo.value.createTime,
				"updateTime":userInfo.value.updateTime,
				// "password":userInfo.value.password,
			}
			
			// userInfo.value.add({
			// 	"password":password
			// })
			
      save(user)
			.then(res=>{
				if(res.code==1){
					getUser();
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
</script>




<style src="@/assets/css/user_manage.css" scoped>

</style>