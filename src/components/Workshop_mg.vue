<template>
	<div class="workshopManagement">
		<delete-pop v-show='showDeletePop' @delete="wsDeletePop" :popTitle="deletePopTitle" :contentTxt="deletePopContent"></delete-pop>
		<workshop-edit v-show='showWSEdit'  @Edit="EditSubmit" :editType="editTypeTxt" :isAdd="isAdd" :edited="editedWorkshop"></workshop-edit>
		<div class="workshop-plantSelect">
			<div class="row">
			  <div class="col-md-2 selectedPlant-pic">
			    <img src="../pic/plant1.jpg" alt="" >
			  </div>
			  <div class="col-md-5 selectedPlant-info">
			    <p>{{selectedPlant.name}}</p>
			    <p>{{selectedPlant.address}}</p>
			    <p>{{selectedPlant.Contact}}</p>
			  </div>
			  <div class="col-md-5 selectedPlant-oper">
				<!-- <label for="">切换厂区:
					<select name="selectPlant" id="" v-model="selectedIndex" @change="togglePlant">
						<option :value="index" v-for="(plant,index) in plantList">{{plant.name}}</option>
					</select>
				</label> -->
				<label>切换工厂:
					<div class="btn-group">
					  <button type="button" class="buttonDown btn btn-default">A工厂</button>
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
				</label>
			  </div>
			</div>
		</div>
		<div class="workshopManagement-table">
			<table class="workshopTable" border="0">
				<thead>
					<tr>
						<th></th>
						<th>车间编号</th>
						<th>车间名称</th>
						<th>车间主管</th>
						<th>车间类型</th>
						<th> <span>操作</span>
							<button class="btn btn-default addWorkshop" @click="WsEdit(null,'add')">
							<i class="fa fa-plus"></i>添加车间</button>
						</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(workshop,index) in workshopList">
						<td><input type="checkbox"></td>
						<td>
							<span>
								{{workshop.strWorkshopID}}
							</span>
						</td>
						<td>
							<span>
								{{workshop.strWorkshopName}}
							</span>
						</td>
						<td>
							<span>
								{{workshop.manager}}
							</span>
						</td>
						<td>
							<span>
								{{workshop.workshopType}}
							</span>
						</td>
						<td class="workshop-oper">
							<span class="font-icon-btn" @click="WsEdit(index)">
							  <i class="fa fa-edit fa-lg" title="编辑"></i>
							</span>
							<span class="font-icon-btn" @click="wsDeletePop(workshop)">
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
						<td style="text-align:;"><input type="checkbox">全选</td>
						<td>
							<button class="btn btn-default">
							  <i class="fa fa-trash-o fa-sm">删除</i>
							</button>
						</td>
					</tr>
				</tfoot>
			</table>
			<paging></paging>
		</div>
	</div>
</template>
<script>
  	import store from '@/store/store'
  	import fetch from '@/fetch/fetch'
  	import paging from '@/components/Paging'
	import deletepop from '@/components/Delete_pop'
	import workshopEdit from '@/components/WorkshopEdit'

	export default{
		name:'workshoplist',
		data () {
		  let workshopList,
		  	  plantList=store.obtain('plantList'),
		  	  selectedIndex=0,
		  	  selectedPlant=plantList[selectedIndex],
		  	  showWSEdit=false,
		  	  showDeletePop=false,
		  	  editTypeTxt='车间',
		  	  deletePopTitle='删除车间',
		  	  deletePopContent='';
		  return {
		    workshopList,
		    plantList,
		    selectedPlant,
		    selectedIndex,
		    showWSEdit,
		    showDeletePop,
		    deletePopTitle,
		    editTypeTxt,
		    deletePopContent,
		    isAdd:false,
		    editedWorkshop:{}
		  }
		},
		components:{
			paging,
			'delete-pop':deletepop,
			'workshop-edit':workshopEdit
		},
		methods:{
			togglePlant:function () {
		  	 	this.selectedPlant=this.plantList[this.selectedIndex];
			},
			deleteWs:function (str) {
				this.deletePopContent=str;
				this.showDeletePop=true;
			},
			wsDeletePop:function (obj,str) {
				let _this=this;
				this.showDeletePop=!this.showDeletePop;
				if (str) {
				  if(str=='close'||str=='cancel');
				    else if(str=='confirm'){
				      fetch.Workshop_Inactive({uWorkshopUUID:this.DelWorkshopID})
				           .then(function (a) {
				             fetch
				                   .Workshop_ListActive()
				                   .then(data=>console.log(_this.workshopList=data.obj.objectlist));
				            });
				    }
				}
				else {
				  this.deletePopContent=obj.strWorkshopName;
				  this.DelWorkshopID=obj.uWorkshopUUID;
				}

			},
			WsEdit:function (index,add) {
				if(add){
					this.isAdd=true;
					this.editedWorkshop={};
				}
				else{
					this.isAdd=false;
					this.editedWorkshop=this.workshopList[index];

				}
				this.showWSEdit=!this.showWSEdit;
			},
			EditSubmit:function (str) {
				if(str=='confirm'){
					fetch
					      .Workshop_ListActive()
					      .then(data=>console.log(this.workshopList=data.obj.objectlist));
				}
				else if(str=='cancel'||str=='close'){

				}
				this.showWSEdit=!this.showWSEdit;
			}
		},
		beforeCreate:function () {
		  fetch
		        .Workshop_ListActive()
		        .then(data=>console.log(this.workshopList=data.obj.objectlist));
		}
	}
</script>
<style>
	.workshopManagement{
		margin-top:30px;
		font-size: .7em;
	}
	.workshopManagement,.workshopManagement-table{
		/*font-size:20px;*/
		width:100%;
	}
	.workshop-plantSelect{
		border:solid 1px #DAD2D2;
		padding:5px 10px;
	}
	.workshopManagement-table{
		box-shadow: 2px 2px 5px #c6c5c7;
		padding: 10px;
		margin-top:20px;
	}
	.workshopManagement-table th,.workshopManagement-table td{
		padding:10px 0;
		text-align: center;

	}
	.workshopTable{
		/*border:solid 1px #D9D4D4;*/
		width:100%;
		/*margin-top: 20px;*/
	}
	.workshopTable tr{
		border-bottom:solid 1px #E6E0E0;
	}
	.workshopTable tfoot tr{
		border: none;
		text-align:center;
	}
	.workshop-oper span{
		margin-left:30px;
	}
	.addWorkshop{
		/*font-size:20px;*/
		/*float: right;*/
		margin-left:30px;
	}
	.addWorkshop:hover{
		background-color: #1340F0;
		color: #FFFFFF;
	}
	.selectedPlant-info p{
		margin:0;
	}
	.selectedPlant-info,.selectedPlant-oper{
		display: inline-flex;
	}
	.selectedPlant-info{
		flex-direction: column;
		justify-content:space-around;
	}
	.selectedPlant-oper{
		justify-content:flex-start;
		align-items:center;
	}
	.workshop-plantSelect .row{
		display: flex;
	}
	.selectedPlant-pic img{
		width:100%;
		max-width:120px;
	}
</style>