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
	            <label for="inputPassword3" class="col-sm-2 control-label">编号</label>
	            <div class="col-sm-10">
	              <input type="text" class="form-control" id="inputPassword3" placeholder="请输入工厂地址" v-model="editDevice.strDeviceID">
	            </div>
	          </div>
	          <div class="form-group">
	            <label for="inputPassword3" class="col-sm-2 control-label">序列号</label>
	            <div class="col-sm-10">
	              <input type="text" class="form-control" id="inputPassword3" placeholder="请输入工厂地址" v-model="editDevice.strDeviceSN">
	            </div>
	          </div>
	          <div class="form-group">
	            <label for="inputPassword3" class="col-sm-2 control-label">设备位置</label>
	            <div class="col-sm-10">
					<div class="btn-group">
					  <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
					    {{currentFactory.strFactoryName}}<span class="caret"></span>
					  </button>
					  <div class="Multistage-menu"  style="solid 1px #FB1616;">
						  <ul class="dropdown-menu" style="solid 1px #584EF0;">
						    <li v-for="factory in factoryList" @click="toggleFactory(factory)"><a>{{factory.strFactoryName}}</a></li>
						  </ul>
						  <ul class="dropdown-menu" style="solid 1px #D13E3E;">
						    <li v-for="workshop in workshopList" @click="toggleWorkshop(workshop)"><a>{{workshop.strWorkshopName}}</a></li>
						  </ul>
						  <ul class="dropdown-menu">
						    <li v-for="workstation in workstationList" @click="toggleWorkstation(workstation)"><a>{{workstation.strWorkstationName}}</a></li>
						  </ul>
					  </div>
					</div>
					<!-- <div class="btn-group">
					  <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
					  {{currentWorkshop.strWorkshopName}} <span class="caret"></span>
					  </button>
					  <ul class="dropdown-menu">
					    <li v-for="workshop in workshopList" @click="toggleWorkshop(workshop)"><a>{{workshop.strWorkshopName}}</a></li>
					  </ul>
					</div>
					<div class="btn-group">
					  <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
					  {{currentMachine.strWorkstationName}} <span class="caret"></span>
					  </button>
					  <ul class="dropdown-menu">
					    <li v-for="workstation in workstationList" @click="toggleWorkstation(workstation)"><a>{{workstation.strWorkstationName}}</a></li>
					  </ul>
					</div> -->
	            </div>
	          </div>
	          <div class="form-group">
	            <label for="inputPassword3" class="col-sm-2 control-label">设备型号</label>
	            <div class="col-sm-10">

	            </div>
	          </div>
	          <div class="form-group">
	            <label for="inputPassword3" class="col-sm-2 control-label">设备图片</label>
	            <div class="col-sm-10">
	            	<div class="fileUpload">
		              <img src="../assets/topstart/mtm-water.jpg" alt="图片" @click="upFile">
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
		props:['editDevice','isAddDevice','selectedFactory','selectedWorkshop','selectedMachine'],
		data(){
			return{
				DeviceName:'',
				DeviceAddress:'',
				currentFactory:this.selectedFactory,
				currentWorkshop:this.selectedWorkshop,
				currentMachine:this.selectedMachine,
				factoryList:[],
				workshopList:[],
				workstationList:[]
			}
		},
		methods:{
			toggleFactory:function (obj) {
				this.currentFactory=obj;
				//更新车间列表
				fetch
			        .Workshop_ListActive({
			        	"nPageIndex": 0,
			            "nPageSize": -1,
			            "uFactoryUUID":this.currentFactory.uFactoryUUID,
			            "uWorkshopTypeUUID":-1,
		  				"uWorkshopAdminUUID":-1
			        })
			        .then(data=>{
			        	this.workshopList=data.obj.objectlist;
			        	this.currentWorkshop=this.workshopList[0];
					    this.toggleWorkshop();
			        },()=>alert('没有查到车间!'));
			},
			toggleWorkshop:function (obj) {
				if(obj)  this.currentWorkshop=obj;
				// this.showPaging=false;
				fetch
			        .Workstation_ListActive({
		              	"nPageIndex": 0,
		              	"nPageSize":-1,
		              	"uPLineUUID":this.currentWorkshop.uWorkshopUUID,
		              	"uWorkstationTypeUUID":-1,
		    			"uWorkstationAdminUUID":-1,
		              })
			        .then(data=>{
			        	console.log(this.machineList=data.obj.objectlist);
			        	this.currentMachine=this.machineList[0];
			        	this.toggleMachine();
			        	// console.log(data)
			        	// this.totalCount=Math.ceil(data.obj.totalcount/this.items);
			        	// this.showPaging=true;
			        });
			},
			toggleMachine:function (obj) {
				if(obj) this.currentMachine=obj;
			    /*this.showPaging=false;
				fetch
			      .Device_ListActive({
			      	"nPageIndex": 0,
			      	"nPageSize":5,
			      	"uDevModelUUID":-1,
			      	"uWorkstationUUID":this.currentMachine.uWorkstationUUID
			      })
			      .then(data=>{
			      	console.log(this.deviceList=data.obj.objectlist);
			      	// console.log(data);
			      	this.totalCount=Math.ceil(data.obj.totalcount/this.items);
			      	this.showPaging=true;
			      });*/
			},
			closePop:function () {
				this.$emit('submit','close');
			},
			cancel:function () {
				this.$emit('submit','cancel');
			},
			confirm:function () {
				if (this.isAddDevice){
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
			// console.log(this.editDevice);
			fetch
			        .Factory_ListActive()
			        .then(data=>this.factoryList=data.obj.objectlist);

		  	fetch
	        		.Workshop_ListActive({
			        	"nPageIndex": 0,
			            "nPageSize": -1,
			            "uFactoryUUID":this.selectedFactory.uFactoryUUID,
			            "uWorkshopTypeUUID":-1,
		  				"uWorkshopAdminUUID":-1
	        		})
		        	.then(data=>this.workshopList=data.obj.objectlist);

			fetch
			        .Workstation_ListActive({
		              	"nPageIndex": 0,
		              	"nPageSize": -1,
		              	"uPLineUUID": this.selectedWorkshop.uWorkshopUUID,
		              	"uWorkstationTypeUUID":-1,
		    			"uWorkstationAdminUUID":-1,
		              })
			        .then(data=>this.workstationList=data.obj.objectlist);

		}
	}
</script>
<style>
	.deviceEdit{
		font-size:.75em;
	}
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
	.Multistage-menu .dropdown-menu{
		display: inline-block;
	}
	.open>.Multistage-menu{
		display:block;
	}
	.Multistage-menu{
		display: none;
		white-space: nowrap;
	    background: #fff;
	    position: absolute;
	    margin: 5px 0;
	    border: 1px solid #d1dbe5;
	    border-radius: 2px;
	    box-shadow: 0 2px 4px rgba(0,0,0,.12), 0 0 6px rgba(0,0,0,.04);
	}
</style>