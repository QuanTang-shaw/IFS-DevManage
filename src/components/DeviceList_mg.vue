<template>
	<div class="deviceList-mg">
		<Modal
		    v-model="modal1"
		    title="删除机台"
		    @on-ok="ok"
		    @on-cancel="cancel">
		    <Alert type="warning" show-icon>
		      <template slot="desc">
		        删除机台后,机台所属的工位设备等信息都将删除哦
		      </template>
		      您确定要删除<span class="warmTitle" style="color:#FA0E0E;font-weight: bolder;">{{deletePopContent}}</span>吗?
		    </Alert>
		</Modal>
		<device-edit v-if='showDeviceEdit' @submit="deviceEditSub" :editDevice="editDevice" :isAddDevice="isAddDevice" :selectedFactory="selectedFactory" :selectedWorkshop="selectedWorkshop" :selectedMachine="selectedMachine" :factoryList="factoryList"></device-edit>
		<div class="Filtering">
			<div class="row">
				<div class="col-md-10">
					<div class="InsLocation">
						<!-- <div>安装位置:
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
						</div> -->
						<label>安装位置:
							<Dropdown style="margin-left: 20px" @on-click="toggleFactory">
						        <Button type="primary">
						            {{selectedFactory.strFactoryName}}
						            <Icon type="arrow-down-b"></Icon>
						        </Button>
						        <Dropdown-menu slot="list" >
						            <Dropdown-item :name="index" :key="factory.uFactoryUUID" v-for="(factory,index) in factoryList">
						            	{{factory.strFactoryName}}
						            </Dropdown-item>
						        </Dropdown-menu>
						    </Dropdown>
						    <Dropdown style="margin-left: 20px" @on-click="toggleWorkshop">
						        <Button type="primary">
						            {{selectedWorkshop.strWorkshopName}}
						            <Icon type="arrow-down-b"></Icon>
						        </Button>
						        <Dropdown-menu slot="list" >
						            <Dropdown-item :name="index" :key="workshop.uWorkshopUUID" v-for="(workshop,index) in workshopList">
						            	{{workshop.strWorkshopName}}
						            </Dropdown-item>
						        </Dropdown-menu>
						    </Dropdown>
						    <Dropdown style="margin-left: 20px" @on-click="toggleMachine">
						        <Button type="primary">
						            {{selectedMachine.strWorkstationName}}
						            <Icon type="arrow-down-b"></Icon>
						        </Button>
						        <Dropdown-menu slot="list" >
						            <Dropdown-item :name="index" :key="machine.uWorkstationUUID" v-for="(machine,index) in machineList">
						            	{{machine.strWorkstationName}}
						            </Dropdown-item>
						        </Dropdown-menu>
						    </Dropdown>
						</label>
					</div>
					<div class="ProModel">
						<!-- <div>产品型号:
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
						</div> -->
					</div>
				</div>
				<div class="col-md-2">
        			<Button  type="primary" icon="plus-round" @click="deviceEdit(null,true)">添加设备</Button>
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
							<p><span>名称:</span>{{device.strDeviceName}}</p>
							<p><span>品牌:</span>{{device.strVendorShortName}}</p>
							<p><span>型号:</span>{{device.strDevModelName}}</p>
							<p>编号: <strong></strong> {{device.strDeviceID}}</p>
						</div>
						<div class="model col-md-5">
							<p>序列号: <strong></strong> {{device.strDeviceSN}}</p>
							<!-- <strong><span></span>{{device.strDevModelName}}</strong> -->
							<span><strong></strong>{{device.strWorkshopName}}</span>
							<span><strong>{{device.strWorkstationName}}</strong></span>
						</div>
						<div class="operating col-md-2">
							<span>
								<i class="fa fa-edit fa-lg" @click="deviceEdit(device,null)"></i>
							</span>
							<span>
								<i class="fa fa-trash-o fa-lg" @click="deviceDelete(device)"></i>
							</span>
							<span>
								<!-- <i class="fa fa-list-alt fa-lg"></i> -->
							</span>
						</div>
					</div>
				</li>
			</ul>
			<div class="page">
				<Page
					@on-change="togglePage"
					@on-page-size-change="togglePageNum"
					:total="totalCount"
					:page-size="pageSize"
					:page-size-opts="pageSizeOpts"
					show-sizer>
				</Page>
			</div>
		</div>
	</div>
</template>
<script>
    import deviceEdit from '@/modalEdit/DeviceEdit'
    import {
    	FactoryListActive,
    	Workshop_ListActive,
    	WorkstationListActive,
    	DevModelListActive,
    	DevcategoryListActive,
    	DeviceListActive,
    	vice_Inactive
    } from '@/api/getData'
	export default{
		name:'machineList',
		data(){
			return {
				factoryList:[],
				deviceList:[],
				workshopList:[],
				machineList:[],
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
          		pageSize:5,
          		pageSizeOpts:[5,10,15],
          		items:5,
          		currentPage:0,
			    modal1:false
			}
		},
		components:{
			"device-edit":deviceEdit,
		},
		methods:{
			ok (){
			  	let self=this;
			  	Device_Inactive({uDeviceUUID:this.DelDeviceID})
		           .then(async function () {
			            let list=await DeviceListActive({
					      	"nPageIndex": self.currentPage,
					      	"nPageSize": self.pageSize,
					      	"uDevModelUUID": -1,
					      	"uWorkstationUUID":self.selectedMachine.uWorkstationUUID
						});
				      	self.deviceList=list.obj.objectlist;
			      		self.totalCount=list.obj.totalcount;
						self.$Message.info('删除设备成功');
					});
			},
			cancel () {
			  this.$Message.info('点击了取消');
			},
			async togglePage(index) {
				if(index) this.currentPage=index-1;
				let list=await DeviceListActive({
				      	"nPageIndex": this.currentPage,
				      	"nPageSize":this.pageSize,
				      	"uDevModelUUID":-1,
				      	"uWorkstationUUID":this.selectedMachine.uWorkstationUUID
					});
				this.deviceList=list.obj.objectlist;
			},
			async togglePageNum(pageSizeNum){
				this.pageSize=pageSizeNum;
				this.togglePage();
			},
			async toggleFactory(index) {
				this.selectedFactory=this.factoryList[index];
				//更新车间列表
				let list=await Workshop_ListActive({
		        	"nPageIndex": 0,
		            "nPageSize": -1,
		            "uFactoryUUID":this.selectedFactory.uFactoryUUID,
		            "uWorkshopTypeUUID":-1,
	  				"uWorkshopAdminUUID":-1
			    });
	        	this.workshopList=list.obj.objectlist;
	        	this.selectedWorkshop=this.workshopList[0];
			    this.toggleWorkshop();
			},
			async toggleWorkshop(index) {
				if(index>=0)  this.selectedWorkshop=this.workshopList[index];
				let list=await WorkstationListActive({
		              	"nPageIndex": 0,
		              	"nPageSize":-1,
		              	"uPLineUUID":this.selectedWorkshop.uWorkshopUUID,
		              	"uWorkstationTypeUUID":-1,
		    			"uWorkstationAdminUUID":-1,
		              });
			    this.machineList=list.obj.objectlist;
	        	this.selectedMachine=this.machineList[0];
	        	this.toggleMachine();
			},
			async toggleMachine(index) {
				if(index>=0) this.selectedMachine=this.machineList[index];
				let list=await DeviceListActive({
			      	"nPageIndex": 0,
			      	"nPageSize":this.pageSize,
			      	"uDevModelUUID":-1,
			      	"uWorkstationUUID":this.selectedMachine.uWorkstationUUID
			      });
		      	this.deviceList=list.obj.objectlist;
		      	this.totalCount=list.obj.totalcount;
			},
			deviceEdit(obj,addDevice) {
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
			    this.editDevice=obj;
			  }
			  	this.showDeviceEdit=true;
			},
			async deviceEditSub(str) {
				this.showDeviceEdit=false;
				let list=await Device_ListActive({
			      	"nPageIndex": this.currentPage,
			      	"nPageSize": this.pageSize,
			      	"uDevModelUUID": -1,
			      	"uWorkstationUUID":this.selectedMachine.uWorkstationUUID
				});
				this.deviceList=list.obj.objectlist;
				if(str=='close'||str=='cancel');
				else if(str=='confirm'){
				}
			},
			deviceDelete(obj,str) {
				this.modal1 = true;
				this.deletePopContent=obj.strDeviceName;
				this.DelDeviceID=obj.uDeviceUUID;
			}
		},
		async beforeCreate() {
		    let self=this;
			this.factoryList=await FactoryListActive();
			this.selectedFactory=this.factoryList[0];
			let wsList=await Workshop_ListActive({
		        	"nPageIndex": 0,
		            "nPageSize": -1,
		            "uFactoryUUID":this.selectedFactory.uFactoryUUID,
		            "uWorkshopTypeUUID":-1,
	  				"uWorkshopAdminUUID":-1
	        	});
			this.workshopList=wsList.obj.objectlist;
			this.selectedWorkshop=this.workshopList[0];
			let list=await WorkstationListActive({
	              	"nPageIndex": 0,
	              	"nPageSize": -1,
	              	"uPLineUUID": this.selectedWorkshop.uWorkshopUUID,
	              	"uWorkstationTypeUUID":-1,
	    			"uWorkstationAdminUUID":-1,
		        });
			this.machineList=list.obj.objectlist;
			this.selectedMachine=this.machineList[0];
			let DevList=await DeviceListActive({
			      	"nPageIndex": 0,
			      	"nPageSize":this.pageSize,
			      	"uDevModelUUID": -1,
			      	"uWorkstationUUID":this.selectedMachine.uWorkstationUUID
				});
	      	this.deviceList=DevList.obj.objectlist;
	      	this.totalCount=DevList.obj.totalcount;
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