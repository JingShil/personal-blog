<template>
	<div class="comment-body" v-if="isLogin">
		<div class="comment-head">
			<div class="comment-input">
				<!-- <img class="comment-user-avatar" src="@/assets/imgs/fufu.jpg" style="margin-right: 5px;"> -->
				<img class="comment-user-avatar" :src="imgDownload + userInfo.avatar" style="margin-right: 5px;">
				<textarea v-model="commentInput" maxlength="1000"></textarea>
				<div class="comment-input-button"  @click="setComment()">评论</div>
			</div>
		</div>
		<div class="comment-main">
			<div class="comment-for" v-for="comment in commentList" :key="comment.commentDto.comment.id">
				<div class="comment">
					<div class="comment-content">
						<div class="comment-content-left">
							<img class="comment-user-avatar" :src="imgDownload + comment.commentDto.userAvatar">
						</div>
						<div class="comment-content-right">
							<div class="comment-user-name">{{ comment.commentDto.userName }}</div>
							<div class="comment-time">{{ comment.commentDto.comment.createTime }}</div>
							<div class="comment-text">{{ comment.commentDto.comment.content }}</div>
							<div class="comment-info">
								<div class="comment-info-item" v-if="!comment.isReply" @click="toComment(comment.commentDto.comment.id)">
									<img src="@/assets/imgs/blog/评论.svg">
									<span>回复</span>
								</div>
								<div class="comment-info-item" v-else @click="cancelComment(comment.commentDto.comment.id)">
									<img src="@/assets/imgs/blog/评论.svg">
									<span>收起</span>
								</div>
								<div class="comment-info-item">
									<span>1</span>
									<img src="@/assets/imgs/blog/点赞.svg">
								</div>
							</div>
						</div>
					</div>
					<div class="comment-input" style="width: 90%;" v-if="comment.isReply">
						<textarea v-model="replyInput" maxlength="1000" style="height: 120px;"></textarea>
						<div class="comment-input-button" @click="setReply(comment.commentDto.comment.id)">评论</div>
					</div>
					<div class="comment-item-for"  v-for="replyDto in comment.replyDtoList" :key="replyDto.reply.id">
						<div class="comment-content">
							<div class="comment-content-left">
								<img class="comment-user-avatar" :src="imgDownload + replyDto.userAvatar">
							</div>
							<div class="comment-content-right">
								<div class="comment-user-name">{{replyDto.userName}}</div>
								<div class="comment-time">{{ replyDto.reply.createTime }}</div>
								<div class="comment-text">
									<div v-if="replyDto.reply.parentId!='0'">回复<span>{{ findParentUserName(comment, replyDto.reply.parentId) }}：</span></div>
									<div>{{ replyDto.reply.content }}</div>
								</div>
								<div class="comment-info">
									<div class="comment-info-item" v-if="!replyDto.isReply" @click="toReply(comment.commentDto.comment.id,replyDto.reply.id)">
										<img src="@/assets/imgs/blog/评论.svg">
										<span>回复</span>
									</div>
									<div class="comment-info-item" v-else @click="cancelReply(comment.commentDto.comment.id,replyDto.reply.id)">
										<img src="@/assets/imgs/blog/评论.svg">
										<span>收起</span>
									</div>
									<div class="comment-info-item">
										<span>1</span>
										<img src="@/assets/imgs/blog/点赞.svg">
									</div>
								</div>
							</div>
						</div>
						<div class="comment-input" style="width: 90%;" v-if="replyDto.isReply">
							<textarea v-model="replyInput" maxlength="1000" style="height: 120px;"></textarea>
							<div class="comment-input-button" @click="setReply(comment.commentDto.comment.id)">评论</div>
						</div>
					</div>
					
				</div>
			</div>
		</div>
		
	</div>
</template>

<script setup>
import {ref,onMounted,inject} from 'vue'
import {getCommentList,addComment,addReply} from '@/api/comment.js'
import { useRoute } from 'vue-router';
import { ElMessage } from 'element-plus'
let isReply = ref(false);
const route = useRoute();
let articleId=route.query.articleId;
let commentListTemp=null;
let commentList=ref(null);
let total = ref(0);
let userInfo = JSON.parse(localStorage.getItem("userInfo"));
let isLogin=ref(false);
let beforeCommentId=null;
let beforeReplyId=null;
let commentInput=ref('');
let replyInput=ref('');
let parentId="0";
const imgDownload = inject('globalImgDownload');

onMounted(()=>{
	getComments(1,5);
	if(userInfo!=null){
		isLogin.value=true;
		// console.log(userInfo);
	}
})

function getComments(pageNumber, pageSize){
	getCommentList(articleId,pageNumber, pageSize)
		.then(res=>{
			if(res.data==null){
				return;
			}
			
			total.value=res.data.total;
			commentList.value=res.data.records;
			commentList.value.forEach(comment=>{
				//为每个对象添加新属性
				Object.assign(comment, { isReply: false });
				// 如果replyDtoList不为null，则为每个对象添加新属性
				if (comment.replyDtoList) {
					comment.replyDtoList.forEach(reply => {
						Object.assign(reply, { isReply: false });
					});
				}
			})
			// commentListTemp=[...commentList.value];
			
		})
}

function findParentUserName(comment, parentId) {
	const parentComment = comment.replyDtoList.find(replyDto => replyDto.reply.id === parentId);
	return parentComment ? parentComment.userName : '';
}

function toComment(commentId){
	// commentList.value=commentListTemp;
	// console.log(commentListTemp)
	// commentList.value=Object.assign([], commentListTemp);
	if(beforeCommentId!=null){
		if(beforeReplyId!=null){
			cancelReply()
		}else{
			cancelComment()
		}
		
	}
	parentId="0"
	replyInput.value='';
	beforeCommentId=commentId
	commentList.value.find(comment=>comment.commentDto.comment.id===commentId).isReply=true;
	// if(comment){
	// 	comment.isReply=true;
	// }
}

function cancelComment(){
	
	commentList.value.find(comment=>comment.commentDto.comment.id===beforeCommentId).isReply=false;
	beforeCommentId=null;
	// commentList.value.find(comment=>comment.commentDto.comment.id===commentId).isReply=false;

}

function toReply(commentId,replyId){
	replyInput.value='';
	if(beforeCommentId!=null){
		if(beforeReplyId!=null){
			cancelReply()
		}else{
			cancelComment()
		}
		
	}
	parentId=replyId;
	beforeCommentId=commentId;
	beforeReplyId=replyId;
	commentList.value.find(comment=>comment.commentDto.comment.id===commentId).replyDtoList.find(replyDto=>replyDto.reply.id===replyId).isReply=true;

}

function cancelReply(){

	// commentList.value.find(comment=>comment.commentDto.comment.id===commentId).replyDtoList.find(replyDto=>replyDto.reply.id===replyId).isReply=false;
	commentList.value.find(comment=>comment.commentDto.comment.id===beforeCommentId).replyDtoList.find(replyDto=>replyDto.reply.id===beforeReplyId).isReply=false;
	beforeReplyId=null;
	beforeCommentId=null;
}
function setComment(){
	let co = {
		"articleId":articleId,
		"userId":userInfo.id,
		"content":commentInput.value
	}
	addComment(co)
	.then(res=>{
		ElMessage({
			message: '评论成功',
			type: 'success',
		})
		getComments(1,5);
	})
}

function setReply(commentId){
	let re = {
		"commentId":commentId,
		"userId":userInfo.id,
		"parentId":parentId,
		"content":replyInput.value
	}
	addReply(re)
	.then(res=>{
		ElMessage({
			message: '评论成功',
			type: 'success',
		})
		getComments(1,5);
	})
}
</script>


<style src="@/assets/css/comment.css" scoped>

</style>