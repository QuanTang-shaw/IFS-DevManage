<template>
	<div class="workshopManagement">
		<workshop-edit v-if='showWSEdit'  @Edit="EditSubmit" :editType="editTypeTxt" :isAdd="isAdd" :edited="editedWorkshop" :factoryList="factoryList" :selectedFactory="selectedPlant"></workshop-edit>
		<Modal
		    v-model="modal1"
		    title="删除车间"
		    @on-ok="ok"
		    @on-cancel="cancel">
		    <Alert type="warning" show-icon>
		      <template slot="desc">
		        删除工厂后,工厂所属的车间、机台、设备等信息都将删除
		      </template>
		      您确定要删除<span class="warmTitle" style="color:#FA0E0E;font-weight: bolder;">{{deletePopContent}}</span>吗?
		    </Alert>
		</Modal>
		<div class="workshop-plantSelect">
			<div class="row">
			  <div class="col-md-2 selectedPlant-pic">
			    <img src="../pic/plant1.jpg" alt="" >
			  </div>
			  <div class="col-md-5 selectedPlant-info">
			    <p><span>名称:</span> {{selectedPlant.strFactoryName}}</p>
			    <p><span>地址:</span> {{selectedPlant.strFactoryAddress}}</p>
			  </div>
			  <div class="col-md-5 selectedPlant-oper">
				<label>切换工厂:
					<Dropdown style="margin-left: 20px" @on-click="togglePlant">
				        <Button type="primary">
				            {{selectedPlant.strFactoryName}}
				            <Icon type="arrow-down-b"></Icon>
				        </Button>
				        <Dropdown-menu slot="list" >
				            <Dropdown-item :name="index" :key="factory.uFactoryUUID" v-for="(factory,index) in factoryList">{{factory.strFactoryName}}</Dropdown-item>
				        </Dropdown-menu>
				    </Dropdown>
				</label>
			  </div>
			</div>
		</div>
		<div class="workshopManagement-table">
			<table class="workshopTable" border="0">
				<thead>
					<tr>
						<!-- <th></th> -->
						<th>车间编号</th>
						<th>车间名称</th>
						<th>车间主管</th>
						<th>车间类型</th>
						<th> <span>操作</span>
							<!-- <button class="btn btn-default addWorkshop" @click="WsEdit(null,'add')">
							<i class="fa fa-plus"></i>添加车间</button> -->
							<Button class="addWorkshop" type="primary" icon="plus-round" @click="WsEdit(null,'add')">添加车间</Button>
						</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(workshop,index) in workshopList">
						<!-- <td><input type="checkbox"></td> -->
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
								{{workshop.strWorkshopTypeName}}
							</span>
						</td>
						<td class="workshop-oper">
							<span class="font-icon-btn" @click="WsEdit(index)">
							  <i class="fa fa-edit fa-lg" title="编辑"></i>
							</span>
							<span class="font-icon-btn" @click="wsDeletePop(workshop)">
							  <i class="fa fa-trash-o fa-lg" title="删除"></i>
							</span>
							<!-- <span class="font-icon-btn" title="查看详情">
							  <i class="fa fa-angle-double-down fa-lg"></i>
							</span> -->
						</td>
					</tr>
				</tbody>
			</table>
			<!-- <paging v-if="showPaging" :totalcount="totalCount" :items="pageItems" @togglePage="togglePage"></paging> -->
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
	import workshopEdit from '@/modalEdit/WorkshopEdit'
	import {
    	FactoryListActive,
    	Workshop_ListActive,
    	WorkshopInactive,
    	WorkstationListActive,
    	DevModelListActive,
    	DevcategoryListActive,
    	DeviceListActive
    } from '@/api/getData'
	export default{
		name:'workshoplist',
		data () {
			return {
			    workshopList:[],
			    factoryList:[],
			    selectedPlant:{},
			    editedWorkshop:{},
			    showWSEdit:false,
			    showDeletePop:false,
			    isAdd:false,
			    showPaging:false,
			    editTypeTxt:'车间',
			    deletePopContent:'',
			    totalCount:0,
			    pageSize:5,
			    pageSizeOpts:[5,10,15],
			    currentPage:0,
			    modal1:false
			}
		},
		components:{
			'workshop-edit':workshopEdit
		},
		methods:{
			ok (){
			  	let self=this;
			  	WorkshopInactive({uWorkshopUUID:this.DelWorkshopID})
		           .then(async function(a) {
			            let list=await Workshop_ListActive({
					              "nPageIndex":self.currentPage,
	    			              "nPageSize":self.pageSize,
	    			              "uFactoryUUID":self.selectedPlant.uFactoryUUID,
	    			              "uWorkshopTypeUUID":-1,
	    		  				  "uWorkshopAdminUUID":-1});
                   		self.workshopList=list.obj.objectlist;
			        	self.totalCount=list.obj.totalcount;
			        	if(self.workshopList.length==0) {
			        		// self.togglePage(self.currentPage);
			        	}
	  					self.$Message.info('删除成功');
		            });
			},
			cancel () {
			  this.$Message.info('点击了取消');
			},
			async togglePlant(index) {
		  	 	this.selectedPlant=this.factoryList[index];
    			this.showPaging=false;
		  	 	//获取选中的厂房列表
		  	 	let list=await Workshop_ListActive({
		              "nPageIndex": 0,
		              "nPageSize":this.pageSize,
		              "uFactoryUUID":this.selectedPlant.uFactoryUUID,
		              "uWorkshopTypeUUID":-1,
	  				  "uWorkshopAdminUUID":-1
  				  });
		        this.workshopList=list.obj.objectlist;
			    this.totalCount=list.obj.totalcount;
			},
			async togglePage(index) {
			    this.currentPage=index-1;
				let list=await Workshop_ListActive({
			              "nPageIndex": index-1,
			              "nPageSize": this.pageSize,
			              "uFactoryUUID":this.selectedPlant.uFactoryUUID,
			              "uWorkshopTypeUUID":-1,
		  				  "uWorkshopAdminUUID":-1
	  				  });
				this.workshopList=list.obj.objectlist;
	        	this.totalCount=list.obj.totalcount;
			},
			async togglePageNum(sizeNum){
				this.pageSize=sizeNum;
				let list=await Workshop_ListActive({
			              "nPageIndex": this.currentPage,
			              "nPageSize": this.pageSize,
			              "uFactoryUUID":this.selectedPlant.uFactoryUUID,
			              "uWorkshopTypeUUID":-1,
		  				  "uWorkshopAdminUUID":-1
	  				  });
				this.workshopList=list.obj.objectlist;
	        	this.totalCount=list.obj.totalcount;
			},
			wsDeletePop:function (obj,str) {
				this.modal1 = true;
				this.deletePopContent=obj.strWorkshopName;
				this.DelWorkshopID=obj.uWorkshopUUID;
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
			async EditSubmit(str) {
				if(str=='confirm'){
					let list=await Workshop_ListActive({
					      	  "nPageIndex":this.currentPage,
    			              "nPageSize":this.pageSize,
    			              "uFactoryUUID":this.selectedPlant.uFactoryUUID,
    			              "uWorkshopTypeUUID":-1,
    		  				  "uWorkshopAdminUUID":-1});
					this.workshopList=list.obj.objectlist;
		        	this.totalCount=list.obj.totalcount;
				}
				else if(str=='cancel'||str=='close') ;
				this.showWSEdit=!this.showWSEdit;
			}
		},
		async beforeCreate() {
			//初始化,获取工厂一下面的车间
		  	this.factoryList=await FactoryListActive();
			this.selectedPlant=this.factoryList[0];
			let list=await Workshop_ListActive({
		              "nPageIndex": 0,
		              "nPageSize": this.pageSize,
		              "uFactoryUUID":this.selectedPlant.uFactoryUUID,
		              "uWorkshopTypeUUID":-1,
	  				  "uWorkshopAdminUUID":-1
  				});
        	this.workshopList=list.obj.objectlist;
        	this.totalCount=list.obj.totalcount;
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