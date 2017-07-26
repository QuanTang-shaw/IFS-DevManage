<template>
	<div class="manufaEdit">
	  <div class="manufaEditCover">
	    <div class="manufaEditPop">
	      <header class="manufaEdit-header">
	        <span class="poptitle">厂商编辑</span>
	        <span class="manufaEditclose" @click='closePop'>
	          <i class="fa fa-close fa-sm" title="关闭"></i>
	        </span>
	      </header>
	      <section class="manufaEdit-section">
	        <form class="form-horizontal">
	          <div class="form-group">
	            <label for="inputEmail3" class="col-sm-2 control-label">名称</label>
	            <div class="col-sm-10">
	              <input type="text" class="form-control" id="inputEmail3" placeholder="请输入厂商名称" v-model="edited.strVendorShortName">
	            </div>
	          </div>
	          <div class="form-group">
	            <label for="inputPassword3" class="col-sm-2 control-label">英文</label>
	            <div class="col-sm-10">
	              <input type="text" class="form-control" id="inputPassword3" placeholder="请输入厂商英文" v-model="edited.strVendorShortName_EN">
	            </div>
	          </div>
	          <div class="form-group">
	            <label for="inputPassword3" class="col-sm-2 control-label">全称</label>
	            <div class="col-sm-10">
	              <input type="text" class="form-control" id="inputPassword3" placeholder="请输入厂商全称" v-model="edited.strVendorName">
	            </div>
	          </div>
	          <div class="form-group">
	            <label for="inputPassword3" class="col-sm-2 control-label">所在地</label>
	            <div class="col-sm-10">
	              <input type="text" class="form-control" id="inputPassword3" placeholder="请输入厂商所在地" v-model="edited.strVendorAddress">
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
	      <footer class="manufaEdit-footer">
	        <div class="manufaEdit-btn">
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
		name:'manufaEdit',
		props:['edited','isAdd'],
		data(){
			return{
				// editmanufa
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
					fetch.Vendor_Add({
						uUserUUID: 1,
						strVendorName:this.edited.strVendorName,
						strVendorID:"VND001",
						strVendorShortName:this.edited.strVendorShortName,
						strVendorShortName_EN:this.edited.strVendorShortName_EN,
						strVendorName_EN:-1,
						strVendorAddress:this.edited.strVendorAddress,
					}).then(()=>this.$emit('Edit','confirm'));
				}
				else{
					fetch.Vendor_Update({
						uVendorUUID: this.edited.uVendorUUID,
						uUserUUID: 1,
						strVendorName:this.edited.strVendorName,
						strVendorID:"PHK005T",
						strVendorNote:"Note PHKT 05",
						strVendorShortName:this.edited.strVendorShortName,
						strVendorShortName_EN:this.edited.strVendorShortName_EN,
						strVendorName_EN:-1,
						strVendorAddress:this.edited.strVendorAddress,
						strVendorDesc:-1
					}).then(()=>this.$emit('Edit','confirm'));

				}
			},
			upFile:function () {
				event.target.nextSibling.nextSibling.click();
			}
		},
		created:function () {

		}
	}
</script>
<style>
	.manufaEditCover{
	  position: fixed;
	  left: 0;
	  right: 0;
	  top: 0;
	  bottom: 0;
	  background-color: rgba(43, 43, 43, 0.41);
	  z-index: 100;
	}
	.manufaEditPop{
	  position:absolute;
	  padding:10px 8px;
	  width:50%;
	  background-color: #FFFFFF;
	  top:15%;
	  left:50%;
	  transform:translateX(-50%);
	}
	.manufaEditclose{
		cursor: pointer;
		float:right;
	}
	.manufaEdit-section{
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
	.manufaEdit-btn{
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