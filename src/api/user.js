import request from '@/utils/request.js'

export function login(user){
	return request({
		url:'/user/login',
		method:'post',
		data:user
	})
}

export function register(user){
	return request({
		url:'/user/register',
		method:'post',
		data:user
	})
}

export function save(user){
	return request({
		url:'/user/save',
		method:'post',
		data:user
	})
}

export function download(filePath){
	return request({
		url:'/user/download/avatar',
		method:'get',
		params:{
			filePath
		},
		responseType: 'blob'
	})
}

export function getUserInfo(){
	return request({
		url:'/user/info',
		method:'get'
	})
}

export function getAdminUserInfo(){
	return request({
		url:'/user/admin/info',
		method:'get'
	})
}

export function getArticleUserInfo(articleId){
	return request({
		url:'/user/article/info',
		method:'get',
		params:{
			articleId
		}
	})
}