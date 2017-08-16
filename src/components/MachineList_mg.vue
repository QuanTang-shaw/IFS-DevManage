<template>
	<div class="machineList-mg">
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
		<machine-edit v-if="showMachineEdit" @Edit="EditSubmit" :editType="editTypeTxt" :edited="editedMachine" :isAdd="isAddMachine" :factoryList="factoryList" :selectedFactory="selectedFactory" :selectedWorkshop="selectedWorkshop"></machine-edit>
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
		        	<Input  placeholder="请输入..."></Input>
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
					<tr v-for="(machine,index) in machineList">
						<!-- <td><input type="checkbox"></td> -->
						<td><span>{{machine.strWorkstationID}}</span></td>
						<td><span>{{machine.strWorkstationName}}</span></td>
						<td><span>{{machine.manager}}</span></td>
						<td><span>{{machine.strWorkstationTypeName}}</span></td>
						<td class="machineList-oper">
							<Button shape="circle" size="small" icon="edit" @click="machineEdit(index)">编辑</Button>
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
    	Workstation_Inactive,
    	DevModelListActive,
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
			  selectedFactory:{},
			  selectedWorkshop:{},
			  editedMachine:{},
			  deletePopContent:'',
			  editTypeTxt:'机台',
			  showMachineEdit:false,
			  showPaging:false,
			  isAddMachine:false,
			  totalCount:0,
			  pageSize:10,
			  pageSizeOpts:[10,15,20],
			  currentPage:0,
			  modal1:false
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
			    this.toggleWorkshop();
			},
			async toggleWorkshop(index) {
				if(index>=0)  this.selectedWorkshop=this.workshopList[index];
				this.showPaging=false;
				let list=await WorkstationListActive({
		              	"nPageIndex": this.currentPage,
		              	"nPageSize":this.pageSize,
		              	"uPLineUUID":this.selectedWorkshop.uWorkshopUUID,
		              	"uWorkstationTypeUUID":-1,
		    			"uWorkstationAdminUUID":-1,
		              });
	        	this.machineList=list.obj.objectlist;
	        	this.totalCount=list.obj.totalcount;
			},
			machineEdit:function (index,add) {
				if(add){
					this.isAddMachine=true;
					this.editedMachine={};
				}
				else{
					this.isAddMachine=false;
					this.editedMachine=this.machineList[index];

				}
				this.showMachineEdit=!this.showMachineEdit;
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
			this.selectedWorkshop=this.workshopList[0];
			let workstationList=await WorkstationListActive({
		  	              	"nPageIndex": 0,
		  	              	"nPageSize": this.pageSize,
		  	              	"uPLineUUID": this.selectedWorkshop.uWorkshopUUID,
		  	              	"uWorkstationTypeUUID":-1,
		  	    			"uWorkstationAdminUUID":-1,
		  	    });
			this.machineList=workstationList.obj.objectlist;
			this.totalCount=workstationList.obj.totalcount;
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