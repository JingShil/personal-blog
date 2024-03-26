import request from '@/utils/request'

export function getArticleList(pageNumber, pageSize, userId, tagId, title, published, order){
	return request({
		url:'/article/list',
		method:'get',
		params:{
			pageNumber,pageSize,userId,tagId,title,published,order
		}
	})
}

export function getArticles(articleListElement){
	return request({
		url:'/article/list',
		method:'post',
		data:articleListElement
	})
}

export function getArticlePrivate(articleListElement){
	return request({
		url:'/article/list/private',
		method:'post',
		data:articleListElement
	})
}

export function save(articleTags){
	return request({
		url:'/article/save',
		method:'post',
		data:articleTags
	})
}

export function getArticleOne(articleId){
	return request({
		url:'/article/get-one',
		method:'get',
		params:{
			articleId
		}
	})
}

export function deleteArticle(articleId){
	return request({
		url:'/article/delete',
		method:'delete',
		params:{
			articleId
		}
	})
}