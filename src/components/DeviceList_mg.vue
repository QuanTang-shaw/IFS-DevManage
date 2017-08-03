<template>
	<div class="deviceList-mg">
		<device-edit v-if='showDeviceEdit' @submit="deviceEditSub" :editDevice="editDevice" :isAddDevice="isAddDevice" :selectedFactory="selectedFactory" :selectedWorkshop="selectedWorkshop" :selectedMachine="selectedMachine" :factoryList="factoryList"></device-edit>
		<delete-pop v-show='showDeletePop' @delete="deviceDelete" :popTitle="deletePopTitle" :contentTxt="deletePopContent"></delete-pop>
		<div class="Filtering">
			<div class="row">
				<div class="col-md-10">
					<div class="InsLocation">
						<div>安装位置:
							<div class="btn-group">
							  <button type="button" class="btn btn-default">{{selectedFactory.strFactoryName}}</button>
							  <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
							    <span class="caret"></span>
							    <span class="sr-only">Toggle Dropdown</span>
							  </button>
							  <ul class="dropdown-menu">
							  	<li v-for="(factory,index) in factoryList" @click="toggleFactory(factory)"><a >{{factory.strFactoryName}}</a></li>
							    <li role="separator" class="divider"></li>
							    <li><a href="#">全部工厂</a></li>
							  </ul>
							</div>
							<div class="btn-group">
							  <button type="button" class="btn btn-default">{{selectedWorkshop.strWorkshopName}}</button>
							  <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
							    <span class="caret"></span>
							    <span class="sr-only">Toggle Dropdown</span>
							  </button>
							  <ul class="dropdown-menu">
							  	<li v-for="(workshop,index) in workshopList"  @click="toggleWorkshop(workshop)"><a>{{workshop.strWorkshopName}}</a></li>
							    <li role="separator" class="divider"></li>
							    <li><a href="#">全部厂房</a></li>
							  </ul>
							</div>
							<div class="btn-group">
							  <button type="button" class="btn btn-default">{{selectedMachine.strWorkstationName}}</button>
							  <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
							    <span class="caret"></span>
							    <span class="sr-only">Toggle Dropdown</span>
							  </button>
							  <ul class="dropdown-menu">
							  	<li v-for="(machine,index) in machineList" @click="toggleMachine(machine)"><a >{{machine.strWorkstationName}}</a></li>
							    <li role="separator" class="divider"></li>
							    <li><a href="#">全部机台</a></li>
							  </ul>
							</div>
						</div>
					</div>
					<div class="ProModel">
						<div>产品型号:
							<div class="btn-group">
							  <button type="button" class="btn btn-default">所有类型</button>
							  <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
							    <span class="caret"></span>
							    <span class="sr-only">Toggle Dropdown</span>
							  </button>
							  <ul class="dropdown-menu">
							  	<li v-for="(plant,index) in factoryList"><a >{{plant.name}}</a></li>
							    <!-- <li><a href="#">Action</a></li>
							    <li><a href="#">Another action</a></li>
							    <li><a href="#">Something else here</a></li> -->
							    <li role="separator" class="divider"></li>
							    <li><a href="#">Separated link</a></li>
							  </ul>
							</div>
							<div class="btn-group">
							  <button type="button" class="btn btn-default">拓斯达</button>
							  <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
							    <span class="caret"></span>
							    <span class="sr-only">Toggle Dropdown</span>
							  </button>
							  <ul class="dropdown-menu">
							  	<li v-for="(plant,index) in factoryList"><a >{{plant.name}}</a></li>
							    <!-- <li><a href="#">Action</a></li>
							    <li><a href="#">Another action</a></li>
							    <li><a href="#">Something else here</a></li> -->
							    <li role="separator" class="divider"></li>
							    <li><a href="#">Separated link</a></li>
							  </ul>
							</div>
							<div class="btn-group">
							  <button type="button" class="btn btn-default">TTW1210A</button>
							  <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
							    <span class="caret"></span>
							    <span class="sr-only">Toggle Dropdown</span>
							  </button>
							  <ul class="dropdown-menu">
							  	<li v-for="(plant,index) in factoryList"><a >{{plant.name}}</a></li>
							    <li role="separator" class="divider"></li>
							    <li><a href="#">Separated link</a></li>
							  </ul>
							</div>
						</div>
					</div>
				</div>
				<div class="col-md-2">
					<button class="btn btn-default addPlant" @click="deviceEdit(null,true)">
        			<i class="fa fa-plus"></i>添加设备</button>
				</div>
			</div>
		</div>
		<div class="deviceList">
			<ul class="deviceList-ul">
				<li class="device" v-for="(device,index) in deviceList">
					<div class="deviceInfo row">
						<div class="device-pic col-md-1">
							<img src="../assets/topstart/mtm-water.jpg" alt="设备图片">
						</div>
						<div class="specification col-md-3">
							<p>{{device.strDeviceName}}</p>
							<p><span>品牌:</span>{{device.strVendorShortName}}</p>
							<p>序列号: <strong></strong> {{device.strDeviceSN}}</p>
							<p>编号: <strong></strong> {{device.strDeviceID}}</p>
						</div>
						<div class="model col-md-5">
							<strong><span></span>{{device.strDevModelName}}</strong>
							<span><strong></strong>{{device.strWorkshopName}}</span>
							<span><strong>{{device.strWorkstationName}}</strong></span>
						</div>
						<div class="operating col-md-2">
							<span>
								<i class="fa fa-edit fa-lg" @click="deviceEdit(index)"></i>
							</span>
							<span>
								<i class="fa fa-trash-o fa-lg" @click="deviceDelete(device)"></i>
							</span>
							<span>
								<i class="fa fa-list-alt fa-lg"></i>
							</span>
						</div>
					</div>
				</li>
			</ul>
			<paging v-if="showPaging" :totalcount="totalCount" :items="pageItems" @togglePage="togglePage"></paging>
		</div>
	</div>
</template>

<script>
  	import store from '@/store/store'
	import fetch from '@/fetch/fetch'
	import deletepop from '@/components/Delete_pop'
    import deviceEdit from '@/components/DeviceEdit'
  	import paging from '@/components/Paging'

	export default{
		name:'machineList',
		data(){
			let	deviceList,
				factoryList,
				workshopList,
				machineList;
			return {
				deviceList,
				workshopList,
				factoryList,
				machineList,
				editDevice:{},
				selectedFactory:{},
				selectedWorkshop:{},
				selectedMachine:{},
				showDeletePop:false,
				showDeviceEdit:false,
				showPaging:false,
				isAddDevice:false,
				deletePopTitle:'删除工厂',
          		deletePopContent:'',
          		totalCount:0,
          		pageItems:5,
          		items:5,
          		currentPage:0
			}
		},
		components:{
			"delete-pop":deletepop,
			"device-edit":deviceEdit,
			paging
		},
		methods:{
			togglePage:function (index) {
				this.currentPage=index;
				fetch
				      .Device_ListActive({
				      	"nPageIndex": index,
				      	"nPageSize":5,
				      	"uDevModelUUID":-1,
				      	"uWorkstationUUID":this.selectedMachine.uWorkstationUUID
				      })
				      .then(data=>{
				      	console.log(this.deviceList=data.obj.objectlist);
				      });
			},
			toggleFactory:function (obj) {
				this.selectedFactory=obj;
				//更新车间列表
				fetch
			        .Workshop_ListActive({
			        	"nPageIndex": 0,
			            "nPageSize": -1,
			            "uFactoryUUID":this.selectedFactory.uFactoryUUID,
			            "uWorkshopTypeUUID":-1,
		  				"uWorkshopAdminUUID":-1
			        })
			        .then(data=>{
			        	this.workshopList=data.obj.objectlist;
			        	this.selectedWorkshop=this.workshopList[0];
					    this.toggleWorkshop();
			        },()=>alert('没有查到车间!'));
			},
			toggleWorkshop:function (obj) {
				if(obj)  this.selectedWorkshop=obj;
				// this.showPaging=false;
				fetch
			        .Workstation_ListActive({
		              	"nPageIndex": 0,
		              	"nPageSize":-1,
		              	"uPLineUUID":this.selectedWorkshop.uWorkshopUUID,
		              	"uWorkstationTypeUUID":-1,
		    			"uWorkstationAdminUUID":-1,
		              })
			        .then(data=>{
			        	console.log(this.machineList=data.obj.objectlist);
			        	this.selectedMachine=this.machineList[0];
			        	this.toggleMachine();
			        	// console.log(data)
			        	// this.totalCount=Math.ceil(data.obj.totalcount/this.items);
			        	// this.showPaging=true;
			        });
			},
			toggleMachine:function (obj) {
				if(obj) this.selectedMachine=obj;
			    this.showPaging=false;
				fetch
			      .Device_ListActive({
			      	"nPageIndex": 0,
			      	"nPageSize":5,
			      	"uDevModelUUID":-1,
			      	"uWorkstationUUID":this.selectedMachine.uWorkstationUUID
			      })
			      .then(data=>{
			      	console.log(this.deviceList=data.obj.objectlist);
			      	// console.log(data);
			      	this.totalCount=Math.ceil(data.obj.totalcount/this.items);
			      	this.showPaging=true;
			      });

			},
			deviceEdit:function (index,addDevice) {
			  if (addDevice){
			    this.isAddDevice=true;
			    this.editDevice={
			    	uDevModelUUID:1,
			     	uWorkstationUUID:1,
			      	strDeviceName:'',
			      	strDeviceID:'',
			      	strDeviceSN:''
			    };
			  }
			  else{
			    this.isAddDevice=false;
			    this.editDevice=this.deviceList[index];
			    console.log(this.editDevice)
			  }
			  	this.showDeviceEdit=true;
			},
			deviceEditSub:function (str) {
			  this.showDeviceEdit=false;
			   fetch
			      .Device_ListActive({
			      	"nPageIndex": this.currentPage,
			      	"nPageSize": 5,
			      	"uDevModelUUID": -1,
			      	"uWorkstationUUID":this.selectedMachine.uWorkstationUUID
			      })
			      .then(data=>console.log(this.deviceList=data.obj.objectlist));
			  if(str=='close'||str=='cancel');
			    else if(str=='confirm'){
			    }
			},
			deviceDelete:function (obj,str) {
				let _this=this;
				this.showDeletePop=!this.showDeletePop;
				if (str) {
				  if(str=='close'||str=='cancel');
				    else if(str=='confirm'){
				      fetch.Device_Inactive({uDeviceUUID:this.DelDeviceID})
				           .then(function () {
				             fetch
							      .Device_ListActive({
							      	"nPageIndex": _this.currentPage,
							      	"nPageSize": 5,
							      	"uDevModelUUID": -1,
							      	"uWorkstationUUID":_this.selectedMachine.uWorkstationUUID
							      	})
							      .then(data=>console.log(_this.deviceList=data.obj.objectlist));
							});
					}
				}
				else {
				  this.deletePopContent=obj.strDeviceName;
				  this.DelDeviceID=obj.uDeviceUUID;
				}
			}
		},
		beforeCreate:function () {
		    let self=this;
			(async function () {
				let factorylist=await
				 new Promise((resolve,reject)=>{
				 	fetch
				        .Factory_ListActive()
				        .then(data=>resolve(data));
				});
				// console.log(factorylist);
				self.factoryList=factorylist.obj.objectlist;
				self.selectedFactory=self.factoryList[0];

				let workshoplist=await new Promise((resolve,reject)=>{
				  fetch
				        .Workshop_ListActive({
				        	"nPageIndex": 0,
				            "nPageSize": -1,
				            "uFactoryUUID":self.selectedFactory.uFactoryUUID,
				            "uWorkshopTypeUUID":-1,
			  				"uWorkshopAdminUUID":-1
				        })
				        .then(data=>resolve(data));
				});
				self.workshopList=workshoplist.obj.objectlist;
				self.selectedWorkshop=self.workshopList[0];
				// console.log(self.selectedWorkshop);

				let workstationList=await new Promise((resolve,reject)=>{
				  fetch
		  		        .Workstation_ListActive({
		  	              	"nPageIndex": 0,
		  	              	"nPageSize": -1,
		  	              	"uPLineUUID": self.selectedWorkshop.uWorkshopUUID,
		  	              	"uWorkstationTypeUUID":-1,
		  	    			"uWorkstationAdminUUID":-1,
		  	              })
		  		        .then(data=>resolve(data));
				});
				return workstationList;
			})()
				.then(data=>{
					self.machineList=data.obj.objectlist;
					self.selectedMachine=self.machineList[0];
					fetch
					      .Device_ListActive({
					      	"nPageIndex": 0,
					      	"nPageSize":5,
					      	"uDevModelUUID": -1,
					      	"uWorkstationUUID":self.selectedMachine.uWorkstationUUID
					      })
					      .then(data=>{
					      	self.deviceList=data.obj.objectlist;
					      	console.log(data);
					      	self.totalCount=Math.ceil(data.obj.totalcount/self.items);
					      	self.showPaging=true;
					      });
				});

			/*let _this=this;
				function *obtain () {
					yield
						fetch
				            .Factory_ListActive()
				            .then(data=>{
				            console.log(_this.factoryList=data.obj.objectlist);
				            	_this.selectedFactory=_this.factoryList[0];
				            });
		            yield
			            fetch
					        .Workshop_ListActive({
					              "nPageIndex": 0,
					              "nPageSize": -1,
					              "uFactoryUUID":_this.selectedFactory.uFactoryUUID,
					              "uWorkshopTypeUUID":-1,
				  				  "uWorkshopAdminUUID":-1
			  				  })
					        .then(data=>{
					        	console.log(_this.workshopList=data.obj.objectlist);
					        	_this.selectedWorkshop=_this.workshopList[0];
					        });
					yield
					    fetch
					        .Workstation_ListActive({
				              	"nPageIndex": 0,
				              	"nPageSize": -1,
				              	"uPLineUUID": _this.selectedWorkshop.uWorkshopUUID,
				              	"uWorkstationTypeUUID":-1,
				    			"uWorkstationAdminUUID":-1,
				              })
					        .then(data=>{
					        	console.log(_this.machineList=data.obj.objectlist);
					        	_this.selectedMachine=_this.machineList[0];
					        });
				}
				var t=obtain(),
					timer=null;
				timer=setInterval(()=>{
					console.log('t.next()');
					if(t.next().done) clearInterval(timer);
				},150);
			*/
		}
	}
</script>
<style>
	.Filtering{
		border:solid 1px #CFCCCC;
		font-size:.7em;
		padding: 15px 15px;
	}
	.Filtering>select option{
		padding:35px 10px;
	}
	.deviceList{
		/*width: 100%;*/
		font-size:.7em;
	}
	.deviceList ul{
		padding:20px 0;
	}
	.deviceList-ul li{
		padding:10px;
		position:relative;
		margin: 0;
		list-style: none;
		border:solid 1px #E7E6E6;
		margin-bottom:10px;
	}
	.device{
		padding: 0;
	}
	.deviceInfo{
		margin: 0;
	}
	.deviceInfo,.deviceInfo>div{
		display: flex;
	}
	.device-pic{padding: 0;}
	.device-pic img{
		/*position: absolute;*/
		/*top:100%;*/
		/*transform: translateY(-50%);*/
		/*border:solid 1px;*/
		width:100%;
		max-width:90px;
		max-height:90px;
	}
	.device-pic{
		justify-content: center;
		align-items: center;
	}
	.specification{
		/*border:solid 1px;*/
		flex-direction: column;
		justify-content:space-between;
		align-items:flex-start;
	}
	.model{
		/*border:solid 1px;*/
		justify-content:space-between;
		align-items:center;
	}
	.operating{
		/*border:solid 1px;*/
		justify-content:space-between;
		align-items:center;
	}
	p{margin: 0;}
</style>