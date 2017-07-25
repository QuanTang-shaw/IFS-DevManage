<template>
	<div class="plantEdit">
	  <div class="plantEditCover">
	    <div class="plantEditPop">
	      <header class="plantEdit-header">
	        <span class="poptitle">工厂编辑</span>
	        <span class="plantEditclose" @click='closePop'>
	          <i class="fa fa-close fa-sm" title="关闭"></i>
	        </span>
	      </header>
	      <section class="plantEdit-section">
	        <form class="form-horizontal">
	          <div class="form-group">
	            <label for="inputEmail3" class="col-sm-2 control-label">名称</label>
	            <div class="col-sm-10">
	              <input type="text" class="form-control" id="inputEmail3" placeholder="请输入工厂名称"  v-model="editPlant.strFactoryName">
	            </div>
	          </div>
	          <div class="form-group">
	            <label for="inputPassword3" class="col-sm-2 control-label">地址</label>
	            <div class="col-sm-10">
	              <input type="text" class="form-control" id="inputPassword3" placeholder="请输入工厂地址" v-model="editPlant.strFactoryAddress">
	            </div>
	          </div>
	          <div class="form-group">
	            <label for="inputPassword3" class="col-sm-2 control-label">联系方式</label>
	            <div class="col-sm-10">
	              <input type="text" class="form-control" id="inputPassword3" placeholder="请输入联系方式">
	            </div>
	          </div>
	          <!-- <div class="form-group">
	            <label for="inputPassword3" class="col-sm-2 control-label">经度</label>
	            <div class="col-sm-10">
	              <input type="password" class="form-control" id="inputPassword3" placeholder="请输入工厂经度">
	            </div>
	          </div>
	          <div class="form-group">
	            <label for="inputPassword3" class="col-sm-2 control-label">维度</label>
	            <div class="col-sm-10">
	              <input type="password" class="form-control" id="inputPassword3" placeholder="请输入工厂维度">
	            </div>
	          </div>
	          <div class="form-group">
	            <label for="inputPassword3" class="col-sm-2 control-label">海拔</label>
	            <div class="col-sm-10">
	              <input type="password" class="form-control" id="inputPassword3" placeholder="请输入工厂海拔">
	            </div>
	          </div> -->
	          <div class="form-group">
	            <label for="inputPassword3" class="col-sm-2 control-label">工厂图片</label>
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
		props:['editPlant','isAddPlant'],
		data(){
			return{
				plantName:'',
				plantAddress:''
			}
		},
		methods:{
			closePop:function () {
				this.$emit('submit','close');
			},
			cancel:function () {
				this.$emit('submit','cancel');
			},
			confirm:function () {
				if (this.isAddPlant){
					console.log(typeof this.editPlant.strFactoryAddress)
					fetch.Factory_Add({
						uParkUUID        : 1,     //从属园区编码
						strFactoryName   : this.editPlant.strFactoryName,    //工厂名称
						strFactoryID     : this.editPlant.strFactoryID,    //工厂ID
						strFactoryAddress: this.editPlant.strFactoryAddress     //工厂地址
					}).then(()=>this.$emit('submit','confirm'));
				}
				else{
					fetch.Factory_Update({
						uFactoryUUID     : this.editPlant.uFactoryUUID,
						uParkUUID        : 1,     //从属园区编码
						strFactoryName   : this.editPlant.strFactoryName,    //工厂名称
						strFactoryID     : this.editPlant.strFactoryID,    //工厂ID
						uFactoryAdminUUID:  1,
					    strFactoryDesc:"Desc HK LEE 1",
					    strFactoryNote:"Note HK LEE 1"
					}).then(()=>this.$emit('submit','confirm'));
				}
			},
			upFile:function () {
				event.target.nextSibling.nextSibling.click();
			}
		},
		created:function () {
			console.log(this.editPlant)
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