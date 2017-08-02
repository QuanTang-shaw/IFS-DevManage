<template>
	<div class="machineList-mg">
		<delete-pop v-show="showDeletePop" @delete="MachineDelete" :popTitle="deletePopTitle" :contentTxt="deletePopContent"></delete-pop>
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
					<div class="btn-group">
					  <button type="button" class="buttonDown btn btn-default">{{selectedFactory.strFactoryName}}</button>
					  <button type="button" class="buttonDown btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
					    <span class="caret"></span>
					    <span class="sr-only">Toggle Dropdown</span>
					  </button>
					  <ul class="dropdown-menu">
					  	<li v-for="(factory,index) in factoryList" @click="toggleFactory(factory,index)"><a >{{factory.strFactoryName}}</a></li>
					    <li role="separator" class="divider"></li>
					    <li><a>全部工厂</a></li>
					  </ul>
					</div>
				</div>
				<div>
					<div class="btn-group">
					  <button type="button" class="buttonDown btn btn-default">{{selectedWorkshop.strWorkshopName}}</button>
					  <button type="button" class="buttonDown btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
					    <span class="caret"></span>
					    <span class="sr-only">Toggle Dropdown</span>
					  </button>
					  <ul class="dropdown-menu">
					  	<li v-for="(workshop,index) in workshopList" @click="toggleWorkshop(workshop,index)"><a >{{workshop.strWorkshopName}}</a></li>
					    <li role="separator" class="divider"></li>
					    <li><a>全部车间</a></li>
					  </ul>
					</div>
				</div>
			  </div>
			</div>
		</div>
		<div class="machineList">
			<table class="machineList-table" border="0" style="">
				<thead>
					<tr>
						<th></th>
						<th><span>机台编号</span></th>
						<th><span>机台名称</span></th>
						<th><span>机台主管</span></th>
						<th><span>机台类型</span></th>
						<th><span>操作
							<button class="btn btn-default addMachineList" @click="machineEdit(null,'add')">
							<i class="fa fa-plus"></i>添加机台</button>
						</span></th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(machine,index) in machineList">
						<td><input type="checkbox"></td>
						<td><span>{{machine.strWorkstationID}}</span></td>
						<td><span>{{machine.strWorkstationName}}</span></td>
						<td><span>{{machine.manager}}</span></td>
						<td><span>{{machine.strWorkstationTypeName}}</span></td>
						<td class="machineList-oper">
							<span class="font-icon-btn" @click="machineEdit(index)">
							  <i class="fa fa-edit fa-lg" title="编辑"></i>
							</span>
							<span class="font-icon-btn" @click="MachineDelete(machine)">
							  <i class="fa fa-trash-o fa-lg" title="删除"></i>
							</span>
							<span class="font-icon-btn" title="查看详情">
							  <i class="fa fa-angle-double-down fa-lg"></i>
							</span>
						</td>
					</tr>
				</tbody>
				<tfoot>
					<tr>
						<td><input type="checkbox"></td>
						<td>
							<button class="btn btn-default">
							  <i class="fa fa-trash-o fa-sm">删除</i>
							</button>
						</td>
					</tr>
				</tfoot>
			</table>
			<paging v-if="showPaging" :totalcount="totalCount" :items="pageItems" @togglePage="togglePage"></paging>
		</div>
	</div>
</template>
<script>
  	import store from '@/store/store'
	import deletepop from '@/components/Delete_pop'
  	import paging from '@/components/Paging'
  	import machineEdit from'@/components/MachineListEdit'
	import fetch from '@/fetch/fetch'

	export default{
		name:'machineList',
		data(){
			let	factoryList,
				workshopList,
				machineList;
			return {
			  workshopList,
			  factoryList,
			  machineList,
			  selectedFactory:{},
			  selectedWorkshop:{},
			  showMachineEdit:false,
			  showDeletePop:false,
			  showPaging:false,
			  isAddMachine:false,
			  deletePopContent:'',
			  deletePopTitle:'删除机台',
			  editTypeTxt:'机台',
			  editedMachine:{},
			  totalCount:0,
			  pageItems:5,
			  items:5,
			  currentPage:0
			}
		},
		components:{
			'delete-pop':deletepop,
			'machine-edit':machineEdit,
			paging
		},
		methods:{
			togglePage:function (index) {
				fetch
	  		        .Workstation_ListActive({
	  	              	"nPageIndex":index,
	  	              	"nPageSize":this.items,
	  	              	"uPLineUUID":this.selectedWorkshop.uWorkshopUUID,
	  	              	"uWorkstationTypeUUID":-1,
	  	    			"uWorkstationAdminUUID":-1,
	  	              })
	  		        .then(data=>this.machineList=data.obj.objectlist);
	  		    this.currentPage=index;
			},
			toggleFactory:function (factory,index) {
				this.selectedFactory=factory;
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
			    //更新机台列表
			    /*fetch
		        .Workstation_ListActive({
	              	"nPageIndex": 0,
	              	"nPageSize": -1,
	              	"uPLineUUID":this.selectedWorkshop.uWorkshopUUID,
	              	"uWorkstationTypeUUID":-1,
	    			"uWorkstationAdminUUID":-1,
	              })
		        .then(data=>this.machineList=data.obj.objectlist);*/
			},
			toggleWorkshop:function (workshop,index) {
				if(workshop)  this.selectedWorkshop=workshop;
				this.showPaging=false;
				fetch
			        .Workstation_ListActive({
		              	"nPageIndex": 0,
		              	"nPageSize":this.pageItems,
		              	"uPLineUUID":this.selectedWorkshop.uWorkshopUUID,
		              	"uWorkstationTypeUUID":-1,
		    			"uWorkstationAdminUUID":-1,
		              })
			        .then(data=>{
			        	console.log(data)
			        	console.log(this.machineList=data.obj.objectlist);
			        	this.totalCount=Math.ceil(data.obj.totalcount/this.items);
			        	this.showPaging=true;
			        });
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
			EditSubmit:function (str) {
				if(str=='confirm'){
					// alert(this.currentPage)
					fetch
					      .Workstation_ListActive({
					      	"nPageIndex":this.currentPage,
		              		"nPageSize":this.pageItems,
		              		"uPLineUUID":this.selectedWorkshop.uWorkshopUUID,
		              		"uWorkstationTypeUUID":-1,
		    				"uWorkstationAdminUUID":-1,})
					      .then(data=>console.log(this.machineList=data.obj.objectlist));
				}
				else if(str=='cancel'||str=='close'){

				}
				this.showMachineEdit=!this.showMachineEdit;
			},
			MachineDelete:function (obj,str) {
				let _this=this;
				this.showDeletePop=!this.showDeletePop;
				if (str) {
				  if(str=='close'||str=='cancel');
				    else if(str=='confirm'){
					  this.showPaging=false;
				      fetch.Workstation_Inactive({uWorkstationUUID:this.DelWorkstationID})
				           .then(function () {
				             fetch
				                   .Workstation_ListActive({
				                   	 "nPageIndex":_this.currentPage,
					              	 "nPageSize":_this.pageItems,
					              	 "uPLineUUID":_this.selectedWorkshop.uWorkshopUUID,
					              	 "uWorkstationTypeUUID":-1,
					    			 "uWorkstationAdminUUID":-1,
		    						})
				                   .then(data=>{
				                   		console.log(_this.machineList=data.obj.objectlist);
				                   		_this.totalCount=Math.ceil(data.obj.totalcount/_this.items);
			        					_this.showPaging=true;
				                   });
				            });
				    }
				}
				else {
				  this.deletePopContent=obj.strWorkstationName;
				  this.DelWorkstationID=obj.uWorkstationUUID;
				}
			}
		},
		beforeCreate:function () {
		/*  fetch
		        .Workstation_ListActive({
	              	"nPageIndex": 0,
	              	"nPageSize": -1,
	              	"uPLineUUID": 1,
	              	"uWorkstationTypeUUID":-1,
	    			"uWorkstationAdminUUID":-1,
	              })
		        .then(data=>console.log(this.machineList=data.obj.objectlist));
		  fetch
		        .Factory_ListActive()
		        .then(data=>{
		        	console.log(this.factoryList=data.obj.objectlist);
		        	this.selectedFactory=this.factoryList[0];
		        });
		  fetch
		        .Workshop_ListActive({
		        	"nPageIndex": 0,
		            "nPageSize": -1,
		            "uFactoryUUID":1,
		            "uWorkshopTypeUUID":-1,
	  				"uWorkshopAdminUUID":-1
		        })
		        .then(data=>{
		        	console.log(this.workshopList=data.obj.objectlist);
		        	this.selectedWorkshop=this.workshopList[0];
		        });*/

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
				console.log(self.selectedWorkshop);

				let workstationList=await new Promise((resolve,reject)=>{
				  fetch
		  		        .Workstation_ListActive({
		  	              	"nPageIndex": 0,
		  	              	"nPageSize": 5,
		  	              	"uPLineUUID": self.selectedWorkshop.uWorkshopUUID,
		  	              	"uWorkstationTypeUUID":-1,
		  	    			"uWorkstationAdminUUID":-1,
		  	              })
		  		        .then(data=>resolve(data));
				});
				// console.log(workstationList);
				self.machineList=workstationList.obj.objectlist;
				self.totalCount=Math.ceil(workstationList.obj.totalcount/self.items);
    			self.showPaging=true;

			})()

		}
	}
</script>
<style>
	.machineList-mg{
		font-size:.7em;
	}
	.workshopSelect{
		/*font-size:20px;*/
		border:solid 1px #DEDADA;
		padding:5px 10px;
	}
	.machineList-mg,.machineList,.machineList-table{
		width: 100%;
	}
	.machineList{
		padding: 10px;
		box-shadow:2px 2px 5px #c6c5c7;
		margin-top:25px;
	}
	.machineList-table{
		/*border:solid 1px #DFDFDF;*/
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
</style>