<template>
	<div class="machineList-mg">
		<delete-pop v-show="showDeletePop" @delete="MachineDelete" :popTitle="deletePopTitle" :contentTxt="deletePopContent"></delete-pop>
		<machine-edit v-show="showMachineEdit" @Edit="EditSubmit" :editType="editTypeTxt" :edited="editedMachine" :isAdd="isAddMachine"></machine-edit>
		<div class="workshopSelect" >
			<div class="row">
			  <div class="col-md-2 selectedWorkshop-pic">
			    <img src="../pic/plant1.jpg" alt="" width="120">
			  </div>
			  <div class="col-md-5 selectedWorkshop-info">
			    <p>{{selectedPlant.name}}</p>
			    <p>{{selectedPlant.address}}</p>
			    <p>{{selectedPlant.Contact}}</p>
			  </div>
			  <div class="col-md-5 selectedWorkshop-oper">
				<!-- <label for="">厂区:
					<select name="selectPlant" id="" v-model="plantIndex" @change="togglePlant">
						<option :value="index" v-for="(plant,index) in plantList">{{plant.name}}</option>
					</select>
				</label></br>
				<label for="">车间:
					<select name="selectworkshop" id="" v-model="plantIndex" @change="togglePlant">
						<option :value="index" v-for="(wp,index) in workshopList">{{wp.name}}</option>
					</select>
				</label> -->
				<div>
					<div class="btn-group">
					  <button type="button" class="buttonDown btn btn-default">A厂区</button>
					  <button type="button" class="buttonDown btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
					    <span class="caret"></span>
					    <span class="sr-only">Toggle Dropdown</span>
					  </button>
					  <ul class="dropdown-menu">
					  	<li v-for="(plant,index) in plantList"><a >{{plant.name}}</a></li>
					    <!-- <li><a href="#">Action</a></li>
					    <li><a href="#">Another action</a></li>
					    <li><a href="#">Something else here</a></li> -->
					    <li role="separator" class="divider"></li>
					    <li><a href="#">Separated link</a></li>
					  </ul>
					</div>
				</div>
				<div>
					<div class="btn-group">
					  <button type="button" class="buttonDown btn btn-default">注塑一车间</button>
					  <button type="button" class="buttonDown btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
					    <span class="caret"></span>
					    <span class="sr-only">Toggle Dropdown</span>
					  </button>
					  <ul class="dropdown-menu">
					  	<li v-for="(workshop,index) in workshopList"><a >{{workshop.name}}</a></li>
					    <!-- <li><a href="#">Action</a></li>
					    <li><a href="#">Another action</a></li>
					    <li><a href="#">Something else here</a></li> -->
					    <li role="separator" class="divider"></li>
					    <li><a href="#">Separated link</a></li>
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
			<nav aria-label="Page navigation">
			  <ul class="pagination">
			    <li>
			      <a href="#" aria-label="Previous">
			        <span aria-hidden="true">&laquo;</span>
			      </a>
			    </li>
			    <li><a href="#">1</a></li>
			    <li><a href="#">2</a></li>
			    <li><a href="#">3</a></li>
			    <li><a href="#">4</a></li>
			    <li><a href="#">5</a></li>
			    <li>
			      <a href="#" aria-label="Next">
			        <span aria-hidden="true">&raquo;</span>
			      </a>
			    </li>
			  </ul>
			</nav>
		</div>
	</div>
</template>
<script>
  	import store from '@/store/store'
	import deletepop from '@/components/Delete_pop'
  	import machineEdit from'@/components/MachineListEdit'
	import fetch from '@/fetch/fetch'

	export default{
		name:'machineList',
		data(){
			let	plantList=store.obtain('plantList'),
				workshopList=store.obtain('workshopList'),
				machineList,
				plantIndex=0,
				workshopIndex=0,
				selectedPlant=plantList[plantIndex],
				showMachineEdit=false,
				showDeletePop=false,
				editTypeTxt='机台',
				deletePopTitle='删除机台',
				deletePopContent='';
			return {
			  workshopList,
			  plantList,
			  machineList,
			  selectedPlant,
			  plantIndex,
			  showMachineEdit,
			  showDeletePop,
			  deletePopTitle,
			  deletePopContent,
			  editTypeTxt,
			  editedMachine:{},
			  isAddMachine:false
			}
		},
		components:{
			'delete-pop':deletepop,
			'machine-edit':machineEdit
		},
		methods:{
			togglePlant:function () {
				this.selectedPlant=this.plantList[this.plantIndex];
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
					fetch
					      .Workstation_ListActive()
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
				      fetch.Workstation_Inactive({uWorkstationUUID:this.DelWorkstationID})
				           .then(function () {
				             fetch
				                   .Workstation_ListActive()
				                   .then(data=>console.log(_this.machineList=data.obj.objectlist));
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
		  fetch
		        .Workstation_ListActive()
		        .then(data=>console.log(this.machineList=data.obj.objectlist));
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