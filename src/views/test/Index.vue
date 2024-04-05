<template>
	<div class="login-body" >
		<div class="login-container">
			<div class="login-left">
				<h1>个人博客</h1>
				<!-- <span>欢迎来到我的博客</span> -->
				<vuetyped :strings="['欢迎来到小何的博客']" :loop="true" :smart-backspace="true">
					<div class="typing" />
				</vuetyped>
			</div>
			<div class="login-right">
				<span class="login-right-background" ></span>

				<div class="login"
					:class="{
						'toLeft':!isLogin
					}"
				>
					<!-- <el-form 
						style="width: 80%"
						:model="ruleForm"
						:rules="rules"
						class="login-form">
						<div>
							<h1>登陆</h1>
						</div>
						<el-form-item prop="phone">
							<span>手机号</span>
							<el-input v-model.number="ruleForm.phone" maxlength="11"/>
						</el-form-item>
					</el-form> -->
					<el-form
						:ref="ruleForm"
						style="width: 80%"

						:model="ruleForm"
						status-icon
						:rules="rules"
						label-width="auto"
						class="login-form"
					>
						<div>
							<h1>登陆</h1>
						</div>
						<el-form-item prop="phone">
							<span>手机号</span>
							<el-input v-model.number="ruleForm.phone" autocomplete=“new-password” maxlength="11"/>
						</el-form-item>
						<el-form-item prop="password" >
							<span>密码</span>
							<el-input v-model="ruleForm.password" type="password" autocomplete="off"  maxlength="12"/>
						</el-form-item>
						<el-form-item prop="code">
							<span>验证码</span>
							<el-input v-model.number="ruleForm.code"  maxlength="4"/>
							
						</el-form-item>
						<div class="login-form-line">
							<span>获取验证码</span>
							<span  @click="closeLogin">去注册</span>
						</div>
						<button class="login-button" @click="loginTo">登陆</button>
					</el-form>


				</div>
				
			</div>
		</div>
	</div>
</template>

<script setup>
import VanillaTilt from 'vanilla-tilt';
import { reactive,onMounted,ref,defineComponent } from "vue";
import {login} from '@/api/user'
import { useRouter } from "vue-router";
import { NForm, NFormItem, NInput} from 'naive-ui'
// import { ElForm,ElFormItem,ElInput } from 'element-plus'
components: {
	NForm, NFormItem, NInput
}
const router = useRouter();

let isLogin = ref(true);
// let backgroundImg = ref(require("@/assets/imgs/3.png"));
// components: {
// 	ElForm,ElFormItem,ElInput
// }
onMounted(() => {
  // VanillaTilt.init(document.querySelector(".card"), {
	// 	max: 50,
	// 	speed: 400
	// });
	
	//It also supports NodeList
	VanillaTilt.init(document.querySelectorAll(".login-left","login-button"));
});

function openLogin(){
	isLogin.value=true;
	// backgroundImg.value=require("@/assets/imgs/3.png");
}

function closeLogin(){
	isLogin.value=false;
	// backgroundImg.value=require("@/assets/imgs/10.jpg");
}


const ruleForm = reactive(
	{
		"phone":"",
		"name":"",
		"password":"",
		"checkPass":"",
		"code":""
	}
)

const user = {
	"phone":null,
	"name":null,
	"password":null
}
function loginTo(){
	user.phone=ruleForm.phone;
	user.password=ruleForm.password;
	if(user.phone && user.password)
	login(user)
	.then(res=>{
		if(res.code==1){
			localStorage.setItem('token', res.token);
			localStorage.setItem('userInfo',JSON.stringify(res.data));
			router.push({ path: "/" });
		}
		
	})
	
}



const validatePhone = (rule, value, callback) => {
  if(!value){
    callback(new Error('请输入手机号'));
  }else{
    callback();
  }
  
};
const validateName = (rule, value, callback) => {
  if(!value){
    callback(new Error('名称不能为空'));
  }else{
		callback();
	}
  
};
const validatePass = (rule, value, callback) => {
  if(!value){
    callback(new Error('请输入密码'));
  }else{
    callback();
  }
};
const validateCheckPass = (rule, value, callback) => {
  if(!value || value != ruleForm.password){
    callback(new Error('与密码不一致'));
  }else{
    callback();
  }
};
const validateCode = (rule, value, callback) => {
  if(!value){
    callback(new Error('请输入验证码'));
  }else if(value < 1000){
    callback(new Error('请输入四位验证码'));
    console.log(value)
  }else{
    callback();
  }
};

const rules = reactive({
	phone: [{ validator: validatePhone, trigger: 'blur' }],
	name: [{ validator: validateName, trigger: 'blur' }],
	password: [{  validator: validatePass, trigger: 'blur' }],
	checkPass: [{  validator: validateCheckPass, trigger: 'blur' }],
	code: [{  validator: validateCode, trigger: 'blur' }]
});
   
                        



</script>

<style src="@/assets/css/login.css" scoped>

</style>