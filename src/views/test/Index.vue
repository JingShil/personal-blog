<template>
  <el-form
    :ref="ruleForm"
    style="max-width: 600px"
    :model="ruleForm"
    status-icon
    :rules="rules"
    label-width="auto"
    class="demo-ruleForm"
  >
		<el-form-item label="手机号" prop="phone">
      <el-input v-model.number="ruleForm.phone" maxlength="11"/>
    </el-form-item>
    <el-form-item label="密码" prop="pass" >
      <el-input v-model="ruleForm.pass" type="password" autocomplete="off"  maxlength="12"/>
    </el-form-item>
    <el-form-item label="确认密码" prop="checkPass">
      <el-input
        v-model="ruleForm.checkPass"
        type="password"
        autocomplete="off"
        maxlength="12"
      />
    </el-form-item>
    <el-form-item label="验证码" prop="code">
      <el-input v-model.number="ruleForm.code"  maxlength="4"/>
    </el-form-item>
    
  </el-form>
</template>

<script setup>
import { reactive, ref } from 'vue'


const ruleForm = reactive(
	{
		"phone":"",
		"pass":"",
		"checkPass":"",
		"code":""
	}
)

const validatePhone = (rule, value, callback) => {
  if(!value){
    callback(new Error('请输入手机号'));
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
  if(!value || value != ruleForm.pass){
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

const rules = {
	phone: [{ validator: validatePhone, trigger: 'blur' }],
	pass: [{  validator: validatePass, trigger: 'blur' }],
	checkPass: [{  validator: validateCheckPass, trigger: 'blur' }],
	code: [{  validator: validateCode, trigger: 'blur' }]
};




</script>
