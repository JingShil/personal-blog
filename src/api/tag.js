import request from '@/utils/request.js'

export function getTagList(name){
	return request({
		url:'/tag/list',
		method:'get',
		params:{
			name
		}
	})
}

export function getTagListPrivate(name){
	return request({
		url:'/tag/list/private',
		method:'get',
		params:{
			name
		}
	})
}

export function save(tag){
	return request({
		url:'/tag/save',
		method:'post',
		data:tag
	})
}

export function deleteTag(tagId){
	return request({
		url:'/tag/delete',
		method:'delete',
		params:{
			tagId
		}
	})
}