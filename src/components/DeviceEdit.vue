<template>
	<div class="deviceEdit">
	  <div class="deviceEditCover">
	    <div class="deviceEditPop">
	      <header class="deviceEdit-header">
	        <span class="poptitle">设备编辑</span>
	        <span class="deviceEditclose" @click='closePop'>
	          <i class="fa fa-close fa-sm" title="关闭"></i>
	        </span>
	      </header>
	      <section class="deviceEdit-section">
	        <form class="form-horizontal">
	          <div class="form-group">
	            <label for="inputEmail3" class="col-sm-2 control-label">名称</label>
	            <div class="col-sm-10">
	              <input type="text" class="form-control" id="inputEmail3" placeholder="请输入工厂名称"  v-model="editDevice.strDeviceName">
	            </div>
	          </div>
	          <div class="form-group">
	            <label for="inputPassword3" class="col-sm-2 control-label">序列号</label>
	            <div class="col-sm-10">
	              <input type="text" class="form-control" id="inputPassword3" placeholder="请输入工厂地址" v-model="editDevice.strDeviceSN">
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
	      <footer class="deviceEdit-footer">
	        <div class="deviceEdit-btn">
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
		name:'deviceEdit',
		props:['editDevice','isAddDevice'],
		data(){
			return{
				DeviceName:'',
				DeviceAddress:''
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
				if (this.isAddDevice){
					console.log(typeof this.editDevice.strFactoryAddress)
					fetch.Device_Add({
						uDevModelUUID:this.editDevice.uDevModelUUID,
						uWorkstationUUID:this.editDevice.uWorkstationUUID,
						strDeviceName:this.editDevice.strDeviceName,
						strDeviceID:'',
						strDeviceSN:this.editDevice.strDeviceSN,
					}).then(()=>this.$emit('submit','confirm'));
				}
				else{
					fetch.Device_Update({
						uDeviceUUID: this.editDevice.uDeviceUUID,
						uDevModelUUID:this.editDevice.uDevModelUUID,
						uWorkstationUUID:this.editDevice.uWorkstationUUID,
						strDeviceName:this.editDevice.strDeviceName,
						strDeviceID:this.editDevice.strDeviceID,
						strDeviceSN:this.editDevice.strDeviceSN,
						strDeviceDesc:'',
						strDeviceNote:''
					}).then(()=>this.$emit('submit','confirm'));
				}
			},
			upFile:function () {
				event.target.nextSibling.nextSibling.click();
			}
		},
		created:function () {
			console.log(this.editDevice)
		}
	}
</script>
<style>
	.deviceEditCover{
	  position: fixed;
	  left: 0;
	  right: 0;
	  top: 0;
	  bottom: 0;
	  background-color: rgba(43, 43, 43, 0.41);
	  z-index: 100;
	}
	.deviceEditPop{
	  position:absolute;
	  padding:10px 8px;
	  width:50%;
	  background-color: #FFFFFF;
	  top:15%;
	  left:50%;
	  transform:translateX(-50%);
	}
	.deviceEditclose{
		cursor: pointer;
		float:right;
	}
	.deviceEdit-section{
		font-size:0.9em;
		padding:15px;
	}
	.deviceEdit-section label{
		/*color:#8C8686;*/
		font-weight:initial;
	}
	.poptitle{
		font-weight:bolder;
	}
	.deviceEdit-btn{
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