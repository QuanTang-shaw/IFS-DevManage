<template>
	<div class="plantEdit">
	  <div class="plantEditCover">
	    <div class="plantEditPop">
	      <header class="plantEdit-header">
	        <span class="poptitle">{{editType}}编辑</span>
	        <span class="plantEditclose" @click='closePop'>
	          <i class="fa fa-close fa-sm" title="关闭"></i>
	        </span>
	      </header>
	      <section class="plantEdit-section">
	        <form class="form-horizontal">
	          <div class="form-group">
	            <label for="inputEmail3" class="col-sm-2 control-label">编号</label>
	            <div class="col-sm-10">
	              <input type="text" class="form-control" id="inputEmail3" :placeholder="`请输入${editType}编号`" v-model="edited.strWorkshopID">
	            </div>
	          </div>
	          <div class="form-group">
	            <label for="inputPassword3" class="col-sm-2 control-label">名称</label>
	            <div class="col-sm-10">
	              <input type="text" class="form-control" id="inputPassword3"  :placeholder="`请输入${editType}名称`" v-model="edited.strWorkshopName">
	            </div>
	          </div>
	          <div class="form-group">
	            <label for="inputPassword3" class="col-sm-2 control-label">主管</label>
	            <div class="col-sm-10">
	              <input type="text" class="form-control" id="inputPassword3" :placeholder="`请输入${editType}主管`" >
	            </div>
	          </div>
	          <div class="form-group">
	            <label for="inputPassword3" class="col-sm-2 control-label">类型</label>
	            <div class="col-sm-10">
	              <input type="password" class="form-control" id="inputPassword3" :placeholder="`请输入${editType}类型`">
	            </div>
	          </div>
	          <div class="form-group">
	            <label for="inputPassword3" class="col-sm-2 control-label">图片</label>
	            <div class="col-sm-10">
	            	<div class="fileUpload">
		              <img src="../assets/plant1.jpg" alt="图片" @click="upFile">
		              <input type="file" style="display:none;">
	            	</div>
	            </div>
	          </div>
	        </form>
	      </section>
	      <footer class="plantEdit-footer">
	        <div class="plantEdit-btn">
	          <button type="button" class="btn btn-default" @click="cancel">取消</button>
	          <button type="button" class="btn btn-primary" @click="confirm">确认</button>
	        </div>
	      </footer>
	    </div>
	  </div>
	</div>
</template>

<script>
    import fetch from '@/fetch/fetch'
	export default{
		name:'plantEdit',
		props:['editType','isAdd','edited'],
		data(){
			return{
				// editPlant
			}
		},
		methods:{
			closePop:function () {
				this.$emit('Edit','close');
			},
			cancel:function () {
				this.$emit('Edit','cancel');
			},
			confirm:function () {
				if(this.isAdd){
					fetch.Workshop_Add({
						uFactoryUUID: 1,
						strWorkshopID: this.edited.strWorkshopID,
						strWorkshopName: this.edited.strWorkshopName,
						uWorkshopAdminUUID: 1
					}).then(()=>this.$emit('Edit','confirm'));
				}
				else{
					fetch.Workshop_Update({
						uWorkshopUUID: this.edited.uWorkshopUUID,
						uFactoryUUID: 1,
						strWorkshopName:this.edited.strWorkshopName,
						strWorkshopID :this.edited.strWorkshopID,
						strWorkshopDesc: "装配车间一 DESC",
						strWorkshopNote: "装配车间一 NOTE",
						uWorkshopTypeUUID: 10,
						uWorkshopAdminUUID : 10001
					}).then(()=>this.$emit('Edit','confirm'));
				}
			},
			upFile:function () {
				event.target.nextSibling.nextSibling.click();
			}
		}
	}
</script>
<style>
	.plantEditCover{
	  position: fixed;
	  left: 0;
	  right: 0;
	  top: 0;
	  bottom: 0;
	  background-color: rgba(43, 43, 43, 0.41);
	  z-index: 100;
	}
	.plantEditPop{
	  position:absolute;
	  padding:10px 8px;
	  width:50%;
	  background-color: #FFFFFF;
	  top:15%;
	  left:50%;
	  transform:translateX(-50%);
	}
	.plantEditclose{
		cursor: pointer;
		float:right;
	}
	.plantEdit-section{
		font-size:0.9em;
		padding:15px;
	}
	.plantEdit-section label{
		/*color:#8C8686;*/
		font-weight:initial;
	}
	.poptitle{
		font-weight:bolder;
	}
	.plantEdit-btn{
	  display: inline-block;
	  float: right;
	  margin-right:15px;
	  margin-top:15px;
	}
	.fileUpload img{
		width:120px;
	}
	.fileUpload{
		border: dotted 1px #FAAFAF;
		border-radius:3px;
		display: inline-block;
		cursor:pointer;
	}
	.fileUpload:hover{border:dotted 1px #FB4242;}
</style>