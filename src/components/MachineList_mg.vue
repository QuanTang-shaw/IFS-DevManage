<template>
	<div class="machineList-mg">
		<machine-edit v-if="showMachineEdit" @Edit="EditSubmit" :editType="editTypeTxt" :edited="editedMachine" :isAdd="isAddMachine" :factoryList="factoryList" :selectedFactory="selectedFactory" :selectedWorkshop="selectedWorkshop"></machine-edit>
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
		    title="机台编辑"
		    @on-cancel="cancel"
		    :footer-hide="true">
		    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
		            <Form-item label="编号" prop="numbering">
		                <Input v-model="formValidate.numbering" placeholder="请输入机台编号"></Input>
		            </Form-item>
		            <Form-item label="名称" prop="name">
		                <Input v-model="formValidate.name" placeholder="请输入机台名称"></Input>
		            </Form-item>
		            <Form-item label="主管" prop="mail">
		                <Select v-model="formValidate.charge" placeholder="请选择机台主管">
	                        <Option value="1" >主管1</Option>
	                        <Option value="2" >主管2</Option>
	                        <Option value="3" >主管3</Option>
	                        <Option value="4" >主管4</Option>
	                        <Option value="5" >主管5</Option>
		                </Select>
		            </Form-item>
		            <Form-item label="类型" prop="workstationType">
		                <Select v-model="formValidate.workstationType" placeholder="请选择机台类型">
	                        <Option :key="machineType.uWorkstationTypeUUID" :value="machineType.uWorkstationTypeUUID" v-for="machineType in machineTypeList">{{machineType.strWorkstationTypeName}}</Option>
		                </Select>
		            </Form-item>
		            <Form-item label="所属车间" prop="OwnedWorkstation">
			            <Cascader :data="cascadeData" v-model="formValidate.OwnedWorkstation"></Cascader>
		            </Form-item>
		            <Form-item label="机台描述" prop="desc">
		                <Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..."></Input>
		            </Form-item>
		            <Form-item label="图片" >
		              <div class="fileUpload">
		                <img src="../assets/plant1.jpg" alt="图片" @click="upPic">
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
		<div class="workshopSelect" >
			<div class="row">
			  <div class="col-md-2 selectedWorkshop-pic">
			    <img src="../pic/plant1.jpg" alt="" width="120">
			  </div>
			  <div class="col-md-5 selectedWorkshop-info">
			    <p><span>名称:</span> {{selectedFactory.strFactoryName}}</p>
			    <p><span>地址:</span> {{selectedFactory.strFactoryAddress}}</p>
			  </div>
			  <div class="col-md-5 selectedWorkshop-oper">
				<div>
					<label>切换工厂:
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
					</label>
				</div>
				<div>
					<label>切换车间:
						<Dropdown style="margin-left: 20px" @on-click="toggleWorkshop">
					        <Button >
					            {{selectedWorkshop.strWorkshopName}}
					            <Icon type="arrow-down-b"></Icon>
					        </Button>
					        <Dropdown-menu slot="list" >
					            <Dropdown-item :name="index" :key="workshop.uWorkshopUUID" v-for="(workshop,index) in workshopList">
					            	{{workshop.strWorkshopName}}
					            </Dropdown-item>
					            <Dropdown-item divided>
					            	所有车间
					            </Dropdown-item>
					        </Dropdown-menu>
					    </Dropdown>
					</label>
				</div>
			  </div>
			</div>
		</div>
		<div style="margin-top:20px;">
			<Row type="flex" justify="space-around">
		        <Col span="15">
					<Button class="addMachineList" type="primary" icon="plus-round" @click="machineEdit(null,'add')">添加机台</Button>
		        </Col>
		        <Col span="4">
		        	<Input v-model="searchTxt"  placeholder="请输入..."></Input>
		        </Col>
		        <Col span="2">
					<Button type="ghost" shape="circle" icon="ios-search">搜索</Button>
		        </Col>
			</Row>
		</div>
		<div class="machineList">
			<table class="machineList-table" border="0" style="">
				<thead style="background-color:#F0EDED">
					<tr>
						<!-- <th></th> -->
						<th><span>机台编号</span></th>
						<th><span>机台名称</span></th>
						<th><span>机台主管</span></th>
						<th><span>机台类型</span></th>
						<th><span>操作
							<!-- <Button class="addMachineList" type="primary" icon="plus-round" @click="machineEdit(null,'add')">添加机台</Button> -->
							</span>
						</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(machine,index) in computedList">
						<!-- <td><input type="checkbox"></td> -->
						<td><span>{{machine.strWorkstationID}}</span></td>
						<td><span>{{machine.strWorkstationName}}</span></td>
						<td><span>{{machine.manager}}</span></td>
						<td><span>{{machine.strWorkstationTypeName}}</span></td>
						<td class="machineList-oper">
							<Button shape="circle" size="small" icon="edit" @click="machineEdit(machine)">编辑</Button>
			                <Button shape="circle" size="small" icon="trash-a" @click="MachineDelete(machine)">删除</Button>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
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
</template>
<script>
  	import machineEdit from'@/modalEdit/MachineListEdit'
	import {
    	FactoryListActive,
    	Workshop_ListActive,
    	WorkstationListActive,
    	WorkstationTypeListActive,
    	Workstation_Inactive,
    	Workstation_Add,
    	Workstation_Update,
    	DevcategoryListActive,
    	DeviceListActive
    } from '@/api/getData'

	export default{
		name:'machineList',
		data(){
			return {
				workshopList:[],
				factoryList:[],
				machineList:[],
				machineTypeList:[],
				selectedFactory:{},
				selectedWorkshop:{},
				editedMachine:{},
				searchTxt:'',
				deletePopContent:'',
				editTypeTxt:'机台',
				showMachineEdit:false,
				showPaging:false,
				isAddMachine:false,
				totalCount:0,
				pageSize:10,
				pageSizeOpts:[10,15,20],
				currentPage:0,
				modal1:false,
				modal2:false,
				cascadeData:[],
			  	formValidate: {
				    numbering:'',
				    name: '',
				    charge:'',
				    workstationType:'',
				    OwnedWorkstation:[],
				    desc: ''
			  	},
			  	ruleValidate: {
			    	numbering: [
			          { required: true, message: '地址不能为空', trigger: 'blur' },
			        ],
			    	name: [
			          { required: true, message: '名称不能为空', trigger: 'blur' }
			        ],
			    	workstationType: [
			          { required: true, message: '请选择车间类型', trigger: 'blur' }
			        ],
			    	OwnedWorkstation: [
			          { required: true,type:'array', message: '请选择所属车间', trigger: 'blur' }
			        ],
			    	desc: [
			          // { required: true, message: '请输入工厂详细信息', trigger: 'blur' },
			          { type: 'string', min: 5, message: '介绍不能少于5字', trigger: 'blur' }
			        ]
			  	}
			}
		},
		components:{
			'machine-edit':machineEdit,
		},
		methods:{
			ok (){
			  	let self=this;
			  	Workstation_Inactive({uWorkstationUUID:this.DelWorkstationID})
		           .then(async function () {
			            let list=await WorkstationListActive({
			                   	 "nPageIndex":self.currentPage,
				              	 "nPageSize":self.pageSize,
				              	 "uPLineUUID":self.selectedWorkshop.uWorkshopUUID,
				              	 "uWorkstationTypeUUID":-1,
				    			 "uWorkstationAdminUUID":-1,
	    					});
                   		self.machineList=data.obj.objectlist;
                   		self.totalCount=data.obj.totalcount;
						self.$Message.info('删除成功');
    					// self.showPaging=true;
		            });
			},
			cancel () {
			  this.$Message.info('点击了取消');
			},
			close(){
				this.modal2=false;
				this.$Message.info('点击了取消');
			},
			handleSubmit(name){
				this.$refs[name].validate(async(valid) => {
                    if (valid) {
                        this.$Message.success('提交成功!');
                        if(this.isAddMachine){
                        	await Workstation_Add({
    							uPLineUUID: this.formValidate.OwnedWorkstation[1],
    							uWorkstationTypeUUID:this.formValidate.workstationType,
    							uWorkstationAdminUUID:1,
    							strWorkstationName:this.formValidate.name,
    							strWorkstationID:this.formValidate.numbering
                        	});
                        }
                        else{
                        	await Workstation_Update({
								uWorkstationUUID: this.editedMachine.uWorkstationUUID,
								uPLineUUID:this.formValidate.OwnedWorkstation[1],
								uWorkstationTypeUUID:this.formValidate.workstationType,
								uWorkstationAdminUUID:1,
								strWorkstationName:this.formValidate.name,
								strWorkstationID:this.formValidate.numbering,
								strWorkstationDesc:this.formValidate.desc,
								strWorkstationNote:""
							});
                        }
                        let list=await WorkstationListActive({
					      	"nPageIndex":this.currentPage,
		              		"nPageSize":this.pageSize,
		              		"uPLineUUID":this.selectedWorkshop.uWorkshopUUID,
		              		"uWorkstationTypeUUID":-1,
		    				"uWorkstationAdminUUID":-1,});
						this.machineList=list.obj.objectlist;
						this.totalCount=list.obj.totalcount;
						this.modal2=false;
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
			async togglePage(index) {
	  		    this.currentPage=index-1;
				let list=await WorkstationListActive({
	  	              	"nPageIndex":index-1,
	  	              	"nPageSize":this.pageSize,
	  	              	"uPLineUUID":this.selectedWorkshop.uWorkshopUUID,
	  	              	"uWorkstationTypeUUID":-1,
	  	    			"uWorkstationAdminUUID":-1,
	  	              });
	  		    this.machineList=list.obj.objectlist;
			},
			async togglePageNum(sizeNum){
				this.pageSize=sizeNum;
				let workstationList=await WorkstationListActive({
	  	              	"nPageIndex": this.currentPage,
	  	              	"nPageSize": this.pageSize,
	  	              	"uPLineUUID": this.selectedWorkshop.uWorkshopUUID,
	  	              	"uWorkstationTypeUUID":-1,
	  	    			"uWorkstationAdminUUID":-1,
		  	    	});
				this.machineList=workstationList.obj.objectlist;
				this.totalCount=workstationList.obj.totalcount;
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
			    this.toggleWorkshop(-1);
			},
			async toggleWorkshop(index) {
				let UUID=null,
					list=[];
					// alert(typeof index)
				if(index!=undefined)  {
					if(index!=-1) {console.log('-1');this.selectedWorkshop=this.workshopList[index];}
					// this.selectedWorkshop=this.workshopList[index];
					UUID=this.selectedWorkshop.uWorkshopUUID;
				}
				else {
					UUID=-1;
					this.selectedWorkshop={
						strWorkshopName:"所有车间",
						uWorkshopUUID:-1,
						// uFactoryUUID:-1
					}
				}
				list=await WorkstationListActive({
		              	"nPageIndex": 0,
		              	"nPageSize":this.pageSize,
		              	"uPLineUUID":UUID,
		              	"uWorkstationTypeUUID":-1,
		    			"uWorkstationAdminUUID":-1,
		            });
	        	this.machineList=list.obj.objectlist;
	        	this.totalCount=list.obj.totalcount;
			},
			machineEdit:function (obj,add) {
				if(add){
					this.isAddMachine=true;
					this.editedMachine={};
					this.formValidate.numbering='';
					this.formValidate.name='';
					this.formValidate.workstationType='';
					this.formValidate.desc='';
					this.formValidate.OwnedWorkstation=[];
				}
				else{
					this.isAddMachine=false;
					this.editedMachine=obj;
					this.formValidate.numbering=obj.strWorkstationID;
					this.formValidate.name=obj.strWorkstationName;
					this.formValidate.workstationType=obj.uWorkstationTypeUUID;
					this.formValidate.desc=obj.strWorkstationDesc;
					let FID=this.selectedFactory.uFactoryUUID;
					let WSID=this.selectedWorkshop.uWorkshopUUID;
					this.formValidate.OwnedWorkstation=[FID,WSID];
				}
				this.modal2=true;
			},
			async EditSubmit(str) {
				if(str=='confirm'){
					let list=await WorkstationListActive({
					      	"nPageIndex":this.currentPage,
		              		"nPageSize":this.pageSize,
		              		"uPLineUUID":this.selectedWorkshop.uWorkshopUUID,
		              		"uWorkstationTypeUUID":-1,
		    				"uWorkstationAdminUUID":-1,});
					this.machineList=list.obj.objectlist;
				}
				else if(str=='cancel'||str=='close');
				this.showMachineEdit=!this.showMachineEdit;
			},
			MachineDelete:function (obj,str) {
				this.modal1 = true;
				this.deletePopContent=obj.strWorkstationName;
				this.DelWorkstationID=obj.uWorkstationUUID;
			}
		},
		async beforeCreate() {
		    let self=this;
		    this.factoryList=await FactoryListActive();
			this.selectedFactory=this.factoryList[0];
			let workshoplist=await Workshop_ListActive({
		        	"nPageIndex": 0,
		            "nPageSize": -1,
		            "uFactoryUUID":this.selectedFactory.uFactoryUUID,
		            "uWorkshopTypeUUID":-1,
	  				"uWorkshopAdminUUID":-1
				});
			this.workshopList=workshoplist.obj.objectlist;
			this.machineTypeList=await WorkstationTypeListActive({
				"nPageIndex":0,
				"nPageSize":-1
			});
			this.factoryList.forEach(async(ele,index)=>{
				let obj1={};
				obj1.value=ele.uFactoryUUID;
				obj1.label=ele.strFactoryName;
				obj1.children=[];
				let wslist=await Workshop_ListActive({
		        	"nPageIndex": 0,
		            "nPageSize": -1,
		            "uFactoryUUID":ele.uFactoryUUID,
		            "uWorkshopTypeUUID":-1,
	  				"uWorkshopAdminUUID":-1
				});
				let list=wslist.obj.objectlist;
				list.forEach((ele,index)=>{
					let obj2={};
					obj2.value=ele.uWorkshopUUID;
					obj2.label=ele.strWorkshopName;
					obj1.children.push(obj2);
				});
				this.cascadeData.push(obj1);
			});
		},
		async created(){
			// this.selectedWorkshop=this.workshopList[0];
			this.selectedWorkshop={
				strWorkshopName:"所有车间",
				uWorkshopUUID:-1
			}
			let workstationList=await WorkstationListActive({
	              	"nPageIndex": 0,
	              	"nPageSize": this.pageSize,
	              	"uPLineUUID": -1,
	              	"uWorkstationTypeUUID":-1,
	    			"uWorkstationAdminUUID":-1,
		  	    });
			this.machineList=workstationList.obj.objectlist;
			this.totalCount=workstationList.obj.totalcount;
		},
		computed:{
			computedList(){
				const self=this;
				self.searchTxt=self.searchTxt.trim();
				return this.machineList.filter(function(ele,index) {
					if((ele.strWorkstationName.indexOf(self.searchTxt) > -1 ||
                        ele.strWorkstationTypeName.indexOf(self.searchTxt) > -1)
                        ){
                        return ele;
                    }
				});
			}
		}

	}
</script>
<style>
	.machineList-mg{
		font-size:.7em;
	}
	.workshopSelect{
		/*font-size:20px;*/
		border-radius:5px;
		border:solid 1px #DEDADA;
		padding:5px 10px;
	}
	.machineList-mg,.machineList,.machineList-table{
		width: 100%;
	}
	.machineList{
		/*padding: 10px;*/
		box-shadow:2px 2px 5px #c6c5c7;
		margin-top:25px;
	}
	.machineList-table{
		/*border:solid 1px #DFDFDF;*/
	}
	.machineList-table tbody tr:hover{
		background-color: #D6ECFA;
	}
	.machineList-table tr{
		border-bottom:solid 1px #E3E1E1;
	}
	.machineList-table tfoot tr{border:none;}
	.machineList-table th,.machineList-table td{
		padding:10px 15px;
	}
	.machineList-oper span{
		margin-left:30px;
	}
	.addMachineList{
		margin-left:30px;
		/*float: right;*/
	}
	.selectedWorkshop-info p{
		margin:0;
	}
	.selectedWorkshop-info,.selectedWorkshop-oper{
		display: inline-flex;
		/*border: solid 1px;*/
	}
	.selectedWorkshop-info{
		flex-direction: column;
		justify-content:space-around;
	}
	.selectedWorkshop-oper{
		flex-direction: column;
		justify-content:space-around;
		/*align-items:center;*/
	}
	.workshopSelect .row{
		display: flex;
	}
	.selectedWorkshop-pic img{
		width:100%;
		max-width:120px;
	}
	.page{
        margin:30px 10px;
    }
</style>