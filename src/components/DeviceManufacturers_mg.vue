<template>
	<div class="companyList">
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
		<mf-edit v-show="showManufaEdit" @Edit="EditSubmit" :edited="editedManufa" :isAdd="isAddManufa"></mf-edit>
		<div style="margin:20px 0;">
			<Row type="flex" justify="space-around">
		        <Col span="15">
					<Button  type="primary" icon="plus-round" @click="ManufaEdit(null,'add')">添加厂商</Button>
		        </Col>
		        <Col span="4">
		        	<Input  placeholder="请输入..."></Input>
		        </Col>
		        <Col span="2">
					<Button type="ghost" shape="circle" icon="ios-search">搜索</Button>
		        </Col>
			</Row>
		</div>
		<div class="vendorList">
			<table border="0" class="companyList-table" >
				<thead>
					<tr>
						<th>LOGO</th>
						<th>名称</th>
						<th>英文</th>
						<th>全称</th>
						<th>所在地</th>
						<th>
							<span>操作
								<!-- <Button  type="primary" icon="plus-round" @click="ManufaEdit(null,'add')">添加厂商</Button> -->
							</span>
						</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(company,index) in companyList">
						<td><img src="../../static/img/TOP-STAR-LOGO.png" height="25px;" alt=""></td>
						<td>{{company.strVendorShortName}}</td>
						<td>{{company.strVendorShortName_EN}}</td>
						<td>{{company.strVendorName}}</td>
						<td>{{company.strVendorAddress}}</td>
						<td class="companyList-oper">
							<!-- <span title="编辑" @click="ManufaEdit(index)">
								<i class="fa fa-edit fa-lg"></i>
							</span>
							<span title="删除" @click="Delete(company)">
								<i class="fa fa-trash-o fa-lg"></i>
							</span> -->
							<Button shape="circle" size="small" icon="edit" @click="ManufaEdit(index)">编辑</Button>
			                <Button shape="circle" size="small" icon="trash-a" @click="Delete(company)">删除</Button>
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
	import manufaEdit from '@/modalEdit/ManufacturersEdit'
	import {Vendor_Inactive,Vendor_ListActive } from '@/api/getData'

	export default{
		name:'devicManufacturers',
		data(){
			return {
				companyList:[],
				editedManufa:{},
				editTypeTxt:'机台',
				deletePopContent:'',
				showManufaEdit:false,
				showPaging:false,
				isAddManufa:false,
				totalCount:0,
				pageSize:10,
				pageSizeOpts:[10,15,20],
				currentPage:0,
				modal1:false
			}
		},
		methods:{
			ok (){
			  	let self=this;
			  	Vendor_Inactive({uVendorUUID:this.DelVendorID})
		           .then(async function () {
	            		let list=await Vendor_ListActive({
	            			"nPageIndex": self.currentPage,
	            			"nPageSize":self.pageSize,
	            			"uUserUUID":-1});
			        	self.companyList=list.obj.objectlist;
			        	self.totalCount=list.obj.totalcount;
						self.$Message.info('删除成功');
		            });
			},
			cancel () {
			  this.$Message.info('点击了取消');
			},
			async togglePage(index) {
	        	if(index) this.currentPage=index-1;
				let list=await Vendor_ListActive({
					"nPageIndex": this.currentPage,
					"nPageSize":this.pageSize,
					"uUserUUID":-1});
	        	this.companyList=list.obj.objectlist;
	        	this.totalCount=list.obj.totalcount;
			},
			async togglePageNum(pageSizeNum) {
				this.pageSize=pageSizeNum;
				this.togglePage();
			},
			Delete(obj) {
				this.modal1 = true;
				this.deletePopContent=obj.strVendorName;
				this.DelVendorID=obj.uVendorUUID;
			},
			ManufaEdit(index,add) {
				if(add){
					this.isAddManufa=true;
					this.editedManufa={};
				}
				else{
					this.isAddManufa=false;
					this.editedManufa=this.companyList[index];
				}
				this.showManufaEdit=!this.showManufaEdit;
			},
			async EditSubmit(str) {
				if(str=='confirm'){
					let list=await Vendor_ListActive({
					"nPageIndex": this.currentPage,
					"nPageSize":this.pageSize,
					"uUserUUID":-1});
		        	this.companyList=list.obj.objectlist;
		        	// this.totalCount=list.obj.totalcount;
				}
				else if(str=='cancel'||str=='close'){

				}
				this.showManufaEdit=!this.showManufaEdit;
			}
		},
		components:{
			"mf-edit":manufaEdit
		},
		async created(){
			let list=await Vendor_ListActive({
				"nPageIndex": this.currentPage,
				"nPageSize":this.pageSize,
				"uUserUUID":-1});
        	this.companyList=list.obj.objectlist;
        	this.totalCount=list.obj.totalcount;
		}
	}
</script>
<style>
	.companyList{
		font-size:.75em;
		padding:10px;
	}
	.vendorList{
		padding: 10px 15px;
		box-shadow: 2px 2px 5px #c6c5c7;
		border-radius:5px;
	}
	.companyList,.companyList-table{
		width: 100%;
	}
	.companyList-table{
		/*border: solid 1px #D2CDCD;*/
	}
	.companyList-table tbody tr:hover{
		background-color: #D6ECFA;
	}
	.companyList-table th,.companyList-table td{
		padding:15px 25px;
		text-align: center;
	}
	.companyList-table tr{
		border-bottom:solid 1px #E5E2E2;
	}
	.companyList-oper span{
		margin-left:15px;
	}
	.page{
        margin:30px 10px;
    }
</style>