<template>
	<div class="deletePop">
		<div class="deleteCover">
			<div class="deletePopBox">
				<header>
					<span class="poptitle">{{popTitle}}</span>
					<span class="popclose" @click='closePop'>
					  <i class="fa fa-close fa-sm" title="关闭"></i>
					</span>
				</header>
				<section class="deletePopBox-section">
					<p>您确定要删除<span class="contentName">{{contentTxt}}</span>吗?</p>
				</section>
				<footer>
					<div class="plantEdit-btn">
					  <button type="button" class="btn btn-default" @click="cancel">取消</button>
					  <button type="button" class="btn btn-primary" @click="confirm">确定</button>
					</div>
				</footer>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		props:['popTitle','contentTxt'],
		methods:{
			closePop:function () {
				this.$emit('delete',null,'close');
			},
			cancel:function () {
				this.$emit('delete',null,'cancel');
			},
			confirm:function () {
				this.$emit('delete',null,'confirm');
			}
		}

	}
</script>
<style>
	.deleteCover{
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		background-color: rgba(43, 43, 43, 0.41);
		z-index: 100;
	}
	.popclose{
		cursor: pointer;
		float:right;
	}
	.deletePopBox{
		position:absolute;
		padding:10px 8px;
		width:350px;
		border-radius:8px;
		background-color: #FFFFFF;
		top:35%;
		left:50%;
		transform:translateX(-50%);
	}
	.deletePopBox-section{
		/*border: solid 1px;*/
		height:100px;
		padding:30px 15px;
	}
	.contentName{
		color: #F80707;
		font-weight:bolder;
		font-size:18px;
	}
</style>