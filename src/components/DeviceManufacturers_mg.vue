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
		<table border="0" class="companyList-table" >
			<thead>
				<tr>
					<!-- <th></th> -->
					<th>名称</th>
					<th>英文</th>
					<th>全称</th>
					<th>所在地</th>
					<th>
						<span>操作
							<Button  type="primary" icon="plus-round" @click="ManufaEdit(null,'add')">添加厂商</Button>
						</span>
					</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(company,index) in companyList">
					<!-- <td><input type="checkbox"></td> -->
					<td>{{company.strVendorShortName}}</td>
					<td>{{company.strVendorShortName_EN}}</td>
					<td>{{company.strVendorName}}</td>
					<td>{{company.strVendorAddress}}</td>
					<td class="companyList-oper">
						<span title="编辑" @click="ManufaEdit(index)">
							<i class="fa fa-edit fa-lg"></i>
						</span>
						<span title="删除" @click="Delete(company)">
							<i class="fa fa-trash-o fa-lg"></i>
						</span>
						<!-- <span title="详情">
							<i class="fa fa-list-alt fa-lg"></i>
						</span> -->
					</td>
				</tr>
			</tbody>
		</table>
		<paging v-if="showPaging" :totalcount="totalCount" :items="pageItems" @togglePage="togglePage"></paging>
	</div>
</template>

<script>
  	import store from '@/store/store'
	import fetch from '@/fetch/fetch'
  	import paging from '@/components/Paging'
	import deletepop from '@/components/Delete_pop'
	import manufaEdit from '@/components/ManufacturersEdit'
	import { Vendor_Inactive,Vendor_ListActive } from '@/api/getData'

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
				items:5,
				pageItems:5,
				currentPage:0,
				modal1:false
			}
		},
		methods:{
			ok (){
			  	let self=this;
				this.showPaging=false;
			  	Vendor_Inactive({uVendorUUID:this.DelVendorID})
		           .then(function () {
		            		Vendor_ListActive({"nPageIndex": self.currentPage,"nPageSize":5,"uUserUUID":-1})
					        .then(data=>{
					        	console.log(data);
					        	self.companyList=data.obj.objectlist;
					        	self.totalCount=Math.ceil(data.obj.totalcount/self.items);
			    				self.showPaging=true;
								self.$Message.info('删除成功');
					        });
		            });
			},
			cancel () {
			  this.$Message.info('点击了取消');
			},
			async togglePage(index) {
	        	this.currentPage=index;
				let list=await Vendor_ListActive({
					"nPageIndex": this.currentPage,
					"nPageSize":5,
					"uUserUUID":-1})
	        	this.companyList=list.obj.objectlist;
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
			EditSubmit:function (str) {
				if(str=='confirm'){
					fetch
					      .Vendor_ListActive()
					      .then(data=>console.log(this.companyList=data.obj.objectlist));
				}
				else if(str=='cancel'||str=='close'){

				}
				this.showManufaEdit=!this.showManufaEdit;
			}
		},
		components:{
			paging,
			"mf-edit":manufaEdit
		},
		beforeCreate:async function () {
			let list=await Vendor_ListActive({"nPageIndex": 0,"nPageSize":5,"uUserUUID":-1});
        	this.companyList=list.obj.objectlist;
        	this.totalCount=Math.ceil(list.obj.totalcount/this.items);
			this.showPaging=true;
		}
	}
</script>
<style>
	.companyList{
		font-size:.75em;
		box-shadow: 2px 2px 5px #c6c5c7;
		padding:10px;
	}
	.companyList,.companyList-table{
		width: 100%;
	}
	.companyList-table{
		/*border: solid 1px #D2CDCD;*/
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
</style>