import request from '@/utils/request'

export function getCommentList(articleId,pageNumber, pageSize){
	return request({
		url:'/comment/get',
		method:'get',
		params:{
			articleId,pageNumber, pageSize
		}
	})
}

export function addComment(comment){
	return request({
		url:'/comment/add/comment',
		method:'post',
		data:comment
	})
}

export function addReply(reply){
	return request({
		url:'/comment/add/reply',
		method:'post',
		data:reply
	})
}