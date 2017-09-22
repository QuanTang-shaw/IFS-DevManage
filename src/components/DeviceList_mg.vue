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
		<Modal
		    v-model="modal2"
		    title="设备编辑"
		    @on-cancel="cancel"
		    :footer-hide="true">
		    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
	            <Form-item label="名称" prop="name">
	                <Input v-model="formValidate.name" placeholder="请输入厂商名称"></Input>
	            </Form-item>
	            <Form-item label="编号" prop="numbering">
	                <Input v-model="formValidate.numbering" placeholder="请输入设备编号"></Input>
	            </Form-item>
	            <Form-item label="序列号" prop="serialNumber">
	                <Input v-model="formValidate.serialNumber" placeholder="请输入设备序列号"></Input>
	            </Form-item>
	            <Form-item label="设备类型" prop="DevType">
		            <Cascader :data="casDataCategory" v-model="formValidate.DevType" @on-change="changeCategory"></Cascader>
	            </Form-item>
	            <Form-item label="设备型号" prop="DevModel">
		            <Cascader :data="casDataModel" v-model="formValidate.DevModel" placeholder="请先选择设备类型"></Cascader>
	            </Form-item>
	            <Form-item label="设备所属机台" prop="OwnedMachine">
		            <Cascader :data="casDataMachine" v-model="formValidate.OwnedMachine"></Cascader>
	            </Form-item>
	            <Form-item label="设备描述" prop="desc">
	                <Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入设备描述信息..."></Input>
	            </Form-item>
	            <Form-item label="图片" >
	              <div class="fileUpload">
	                <img src="../assets/topstart/mtm-water.jpg" alt="图片" @click="upPic">
	                <input type="file" style="display:none;">
	              </div>
	            </Form-item>
	            <Form-item>
	                <Button type="ghost" @click="close" >取消</Button>
	                <Button type="primary" @click="handleSubmit('formValidate')" style="margin-left: 8px">提交</Button>
	                <Button type="primary" @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
	            </Form-item>
		    </Form>
		</Modal>
		<div class="Filtering">
			<div class="row">
				<div class="col-md-10">
					<div class="InsLocation">
						<div>安装位置:
							<Dropdown style="margin-left: 20px" @on-click="toggleFactory">
						        <Button >
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
						        <Button >
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
						        <Button >
						            {{selectedMachine.strWorkstationName}}
						            <Icon type="arrow-down-b"></Icon>
						        </Button>
						        <Dropdown-menu slot="list" >
						            <Dropdown-item :name="index" :key="machine.uWorkstationUUID" v-for="(machine,index) in machineList">
						            	{{machine.strWorkstationName}}
						            </Dropdown-item>
						            <Dropdown-item devided>
						            	全部机台
						            </Dropdown-item>
						        </Dropdown-menu>
						    </Dropdown>
						</div>
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
					<!-- <div class="deviceInfo row">
						<div class="device-pic col-md-1">
							<img src="../assets/topstart/mtm-water.jpg" alt="设备图片">
						</div>
						<div class="specification col-md-3">
							<p><span>名称:</span>{{device.strDeviceName}}</p>
							<p><span>品牌:</span>{{device.strVendorShortName}}</p>
							<p><span>型号:</span>{{device.strDevModelName}}</p>
						</div>
						<div class="model col-md-5">
							<p>序列号: <strong></strong> {{device.strDeviceSN}}</p>
							<p>编号: <strong></strong> {{device.strDeviceID}}</p>
							<span><strong></strong>{{device.strWorkshopName}}</span>
							<span><strong>{{device.strWorkstationName}}</strong></span>
						</div>
						<div class="operating col-md-2">
							<Button shape="circle" size="small" icon="edit" @click="deviceEdit(device,null)">编辑</Button>
								                <Button shape="circle" size="small" icon="trash-a" @click="deviceDelete(device)">删除</Button>
						</div>
					</div> -->
					<div class="deviceInfo">
						<Row class="deviceInfo-Row" type="flex" align="middle">
					        <Col span="3" style="border:solid 0px;height:100%;padding:8px;">
								<img src="../assets/topstart/mtm-water.jpg" alt="设备图片" style="height:100%;">
					        </Col>
					        <Col span="6" style="border:solid 0px;">
						        <p><span>名称:</span>{{device.strDeviceName}}</p>
						        <p><span>品牌:</span>{{device.strVendorShortName}}</p>
						        <p><span>型号:</span>{{device.strDevModelName}}</p>
					        </Col>
					        <Col span="6" style="border:solid 0px;">
					        	<p>设备信息</p>
						        <p>序列号: <strong></strong> {{device.strDeviceSN}}</p>
						        <p>编号: <strong></strong> {{device.strDeviceID}}</p>
					        </Col>
					        <Col span="6" style="border:solid 0px;">
					        	<p>安装位置</p>
						        <p>车间:<strong></strong>{{device.strWorkshopName}}</p>
						        <p>机台:<strong></strong>{{device.strWorkstationName}}</p>
					        </Col>
					        <Col span="3" style="border:solid 0px;">
		        				<Button shape="circle" size="small" icon="edit" @click="deviceEdit(device,null)">编辑</Button>
		                        <Button shape="circle" size="small" icon="trash-a" @click="deviceDelete(device)">删除</Button>
					        </Col>
						</Row>
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
    	DevcategoryListActive,
    	DevModelListActive,
    	DeviceListActive,
    	Device_Inactive,
    	Device_Add,
    	Device_Update
    } from '@/api/getData'
	export default{
		name:'machineList',
		data(){
			return {
				factoryList:[],
				deviceList:[],
				workshopList:[],
				machineList:[],
				DevModelList:[],
				editDevice:{},
				selectedFactory:{},
				selectedWorkshop:{},
				selectedMachine:{},
				currentCategory:'',
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
			    modal1:false,
			    modal2:false,
			    casDataMachine:[],
			    casDataCategory:[],
			    casDataModel:[],
			    formValidate: {
				    name: '',
				    numbering:'',
				    serialNumber:'',
				    DevType:[],
				    DevModel:[],
				    OwnedMachine:[],
				    desc:''
			  	},
			  	ruleValidate: {
			    	name: [
			          { required: true, message: '名称不能为空', trigger: 'blur' }
			        ],
			    	numbering: [
			          { required: true, message: '英文不能为空', trigger: 'blur' },
			        ],
			    	serialNumber: [
			          { required: true, message: '请选择设备序列号', trigger: 'blur' }
			        ],
			        DevType: [
			          { required: true,type:'array', message: '请选择设备类型', trigger: 'blur' }
			        ],
			        DevModel: [
			          { required: true,type:'array', message: '请选择设备型号', trigger: 'blur' }
			        ],
			        OwnedMachine: [
			          { required: true,type:'array', message: '请选择所属机台', trigger: 'blur' }
			        ],
			    	desc: [
			          // { type: 'string', min: 5, message: '介绍不能少于5字', trigger: 'blur'}
			        ]
			  	}
			}
		},
		components:{
			"device-edit":deviceEdit,
		},
		computed(){
			
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
			close(){
				this.modal2=false;
				this.$Message.info('点击了取消');
			},
			handleSubmit (name) {
                this.$refs[name].validate(async(valid) => {
                    if (valid) {
                        if(this.isAddDevice){
                        	await Device_Add({
    							uDevModelUUID:this.formValidate.DevModel[1],
    							uWorkstationUUID:this.formValidate.OwnedMachine[1],
    							strDeviceName:this.formValidate.name,
    							strDeviceID:this.formValidate.numbering,
    							strDeviceSN:this.formValidate.serialNumber,
    						});
                        }
                        else{
                        	await Device_Update({
    							uDeviceUUID: this.editDevice.uDeviceUUID,
    							uDevModelUUID:this.formValidate.DevModel[1],
    							uWorkstationUUID:this.formValidate.OwnedMachine[1],
    							strDeviceName:this.formValidate.name,
    							strDeviceID:this.formValidate.numbering,
    							strDeviceSN:this.formValidate.serialNumber,
    							strDeviceDesc:this.formValidate.desc,
    							strDeviceNote:''
    						});
                        }
                    	let list=await DeviceListActive({
                          	"nPageIndex": this.currentPage,
                          	"nPageSize": this.pageSize,
                          	"uDevModelUUID": -1,
                          	"uWorkstationUUID":this.selectedMachine.uWorkstationUUID
                    	});
                    	this.deviceList=list.obj.objectlist;
				      	this.totalCount=list.obj.totalcount;
                        this.modal2=false;
                        this.$Message.success('提交成功!');
                    }
                    else {
                        this.$Message.error('表单验证失败!');
                    }
                })
            },
			handleReset (name) {
                this.$refs[name].resetFields();
            },
			upPic(){
              event.target.nextSibling.nextSibling.click();
            },
            changeCategory(category){
            	// alert(category)
            	this.getModalList(category[1]);
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
	        	this.toggleMachine(-1);
			},
			async toggleMachine(index) {
				let UUID=null,
					list=[];
				// if(index>=0) this.selectedMachine=this.machineList[index];
				if(index!=undefined){
					if(index!=-1){this.selectedMachine=this.machineList[index];}
					UUID=this.selectedMachine.uWorkstationUUID;
				}
				else{
					UUID=-1;
					this.selectedMachine={
						strWorkstationName:"所有机台",
						uWorkstationUUID:-1
					}
				}
				list=await DeviceListActive({
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
				    this.editDevice={};
				    this.formValidate.name='';
				    this.formValidate.numbering='';
				    this.formValidate.serialNumber='';
				    this.formValidate.DevType=[];
				    this.formValidate.DevModel=[];
				    this.formValidate.OwnedMachine=[];
				    this.casDataModel=[];
				}
				else{
				    this.isAddDevice=false;
				    this.editDevice=obj;
				    this.formValidate.name=obj.strDeviceName;
				    this.formValidate.numbering=obj.strDeviceID;
				    this.formValidate.serialNumber=obj.strDeviceSN;
				    this.formValidate.DevType=[obj.uDevCategoryParentUUID,obj.uDevCategoryUUID];
				    this.formValidate.DevModel=[obj.uVendorUUID,obj.uDevModelUUID];
				    this.formValidate.OwnedMachine=[
				    	this.selectedFactory.uFactoryUUID,
				    	this.selectedWorkshop.uWorkshopUUID,
				    	this.selectedMachine.uWorkstationUUID
				    	];
				    let curCategory=obj.uDevCategoryUUID;
				    this.casDataModel=[];
				    this.getModalList(curCategory);
				}
			  	this.modal2=true;
			  	// console.log(obj);
			},
			async getModalList(curCategory){
			    let List=[],
			    	curList=[],
			    	vendorList=[],
			    	modelList=[],
			    	hash={};
			    	List=await DevModelListActive({
				    	"nPageIndex": 0,
						"nPageSize": -1,
						"uDevTypeUUID": -1,
						"uDevCategoryUUID":curCategory,
						"uVendorUUID":-1,
						"uUserUUID":-1,
			    	});
			    curList=List.obj.objectlist;
			    vendorList=curList.reduce(function (item,ele) {
		    		hash[ele.uVendorUUID] ? '' : hash[ele.uVendorUUID] = true && item.push(ele);
		    		return item;
			    },[]);
		        modelList=vendorList.map((ele0,index0)=>{
			    	let curArr=[];
			    	curArr=curList.filter((ele1,index1,arr)=>{
			    		if (ele1.uVendorUUID==ele0.uVendorUUID){
			    			return ele1;
			    		}
			    	});
		    		return curArr;
		    	});
			    vendorList.forEach((ele0,index0)=>{
			    	let obj1={};
			    	obj1.value=ele0.uVendorUUID;
			    	obj1.label=ele0.strVendorShortName;
			    	obj1.children=[];
			    	modelList[index0].forEach((ele1,index1)=>{
			    		let obj2={};
			    		obj2.value=ele1.uDevModelUUID;
			    		obj2.label=ele1.strDevModelName;
			    		obj1.children.push(obj2);
			    	});
			    	this.casDataModel.push(obj1);
			    });
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

		    let DevList=await DeviceListActive({
			      	"nPageIndex": 0,
			      	"nPageSize":this.pageSize,
			      	"uDevModelUUID": -1,
			      	"uWorkstationUUID":-1
			});
	      	this.deviceList=DevList.obj.objectlist;
	      	this.totalCount=DevList.obj.totalcount;

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
			// this.selectedMachine=this.machineList[0];
			this.selectedMachine={
				strWorkstationName:"未指定机台",
				uWorkstationUUID:-1
			}
		},
		async created(){
			this.factoryList=await FactoryListActive();
			this.factoryList.forEach(async(ele,index)=>{
				let obj1={};
				obj1.value=ele.uFactoryUUID;
				obj1.label=ele.strFactoryName;
				obj1.children=[];
			  	let list1=await Workshop_ListActive({
			        	"nPageIndex": 0,
			            "nPageSize": -1,
			            "uFactoryUUID":ele.uFactoryUUID,
			            "uWorkshopTypeUUID":-1,
		  				"uWorkshopAdminUUID":-1
		        });
		        let wsList=list1.obj.objectlist;
		        wsList.forEach(async(ele,index)=>{
		        	let obj2={};
		        	obj2.value=ele.uWorkshopUUID;
		        	obj2.label=ele.strWorkshopName;
		        	obj2.children=[];
		        	let list2=await WorkstationListActive({
		              	"nPageIndex": 0,
		              	"nPageSize": -1,
		              	"uPLineUUID": ele.uWorkshopUUID,
		              	"uWorkstationTypeUUID":-1,
		    			"uWorkstationAdminUUID":-1,
		    		});
				    let machineList=list2.obj.objectlist;
				    machineList.forEach((ele,index)=>{
				    	let obj3={};
				    	obj3.value=ele.uWorkstationUUID;
				    	obj3.label=ele.strWorkstationName;
				    	obj2.children.push(obj3);
				    });
			    	obj1.children.push(obj2);
		        });
		        this.casDataMachine.push(obj1);
			});
			let ParCategoryList=await DevcategoryListActive({
	              	"nPageIndex": 0,
	              	"nPageSize": -1,
	              	"uDevCategoryParentUUID":0,
	              	"uUserUUID":-1
	            });
			ParCategoryList.forEach(async(ele,index)=>{
				let obj1={};
				obj1.value=ele.uDevCategoryUUID;
				obj1.label=ele.strDevCategoryName;
				obj1.children=[];
				let SubCategoryList=await DevcategoryListActive({
                	"nPageIndex": 0,
                	"nPageSize": -1,
                	"uDevCategoryParentUUID":ele.uDevCategoryUUID,
                	"uUserUUID":-1
                });
                SubCategoryList.forEach((ele,index)=>{
                	let obj2={};
                	obj2.value=ele.uDevCategoryUUID;
					obj2.label=ele.strDevCategoryName;
					obj1.children.push(obj2);
                });
                this.casDataCategory.push(obj1);
			});
		}
	}
</script>
<style>
	.Filtering{
		border:solid 1px #CFCCCC;
		border-radius:5px;
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
		/*padding:10px;*/
		height:80px;
		position:relative;
		margin: 0;
		list-style: none;
		border:solid 1px #E7E6E6;
		margin-bottom:10px;
	}
	.device{
		padding: 0;
	}
	.deviceInfo,.deviceInfo-Row{
		/*margin: 0;*/
		height: 100%;
	}
	/* .deviceInfo,.deviceInfo>div{
		display: flex;
	} */
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
		flex-direction: column;
		justify-content:space-between;
		align-items:flex-start;
	}
	.operating{
		/*border:solid 1px;*/
		justify-content:space-between;
		align-items:center;
	}
	/*p{margin: 0;}*/
</style>