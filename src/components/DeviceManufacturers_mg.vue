<template>
	<div class="companyList">
		<mf-edit v-show="showManufaEdit" @Edit="EditSubmit" :edited="editedManufa" :isAdd="isAddManufa"></mf-edit>
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
		    title="车间编辑"
		    @on-cancel="cancel"
		    :footer-hide="true">
		    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
	            <Form-item label="名称" prop="name">
	                <Input v-model="formValidate.name" placeholder="请输入厂商名称"></Input>
	            </Form-item>
	            <Form-item label="英文简称" prop="ENName">
	                <Input v-model="formValidate.ENName" placeholder="请输入厂商英文简称"></Input>
	            </Form-item>
	            <Form-item label="全称" prop="fullName">
	                <Input v-model="formValidate.fullName" placeholder="请输入厂商全称"></Input>
	            </Form-item>
	            <Form-item label="地址" prop="address">
	                <Input v-model="formValidate.address" placeholder="请输入厂商地址"></Input>
	            </Form-item>
	            <Form-item label="厂商描述" prop="desc">
	                <Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..."></Input>
	            </Form-item>
	            <Form-item label="LOGO" >
	              <div class="fileUpload">
	                <img src="../../static/img/TOP-STAR-LOGO.png" alt="图片" @click="upPic">
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
							<Button shape="circle" size="small" icon="edit" @click="ManufaEdit(company)">编辑</Button>
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
	import {Vendor_Inactive,Vendor_ListActive,Vendor_Add,Vendor_Update } from '@/api/getData'

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
				modal1:false,
				modal2:false,
				formValidate: {
				    name: '',
				    ENName:'',
				    fullName:'',
				    address:'',
				    desc: ''
			  	},
			  	ruleValidate: {
			    	name: [
			          { required: true, message: '名称不能为空', trigger: 'blur' }
			        ],
			    	ENName: [
			          { required: true, message: '英文不能为空', trigger: 'blur' },
			        ],
			    	fullName: [
			          { required: true, message: '厂商全称不能为空', trigger: 'blur' }
			        ],
			        address: [
			          { required: true, message: '厂商地址不能为空', trigger: 'blur' }
			        ],
			    	desc: [
			          // { type: 'string', min: 5, message: '介绍不能少于5字', trigger: 'blur'}
			        ]
			  	}
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
			close(){
				this.modal2=false;
				this.$Message.info('点击了取消');
			},
			handleSubmit (name) {
                this.$refs[name].validate(async(valid) => {
                    if (valid) {
                        if(this.isAddManufa){
                        	await Vendor_Add({
    							uUserUUID: 1,
    							strVendorName:this.formValidate.fullName,
    							strVendorID:"",
    							strVendorShortName:this.formValidate.name,
    							strVendorShortName_EN:this.formValidate.ENName,
    							strVendorName_EN:'',
    							strVendorAddress:this.formValidate.address
                        	});
                        }
                        else{
                        	await Vendor_Update({
    							uVendorUUID: this.editedManufa.uVendorUUID,
    							uUserUUID: 1,
    							strVendorName:this.formValidate.fullName,
    							strVendorID:"",
    							strVendorNote:"",
    							strVendorShortName:this.formValidate.name,
    							strVendorShortName_EN:this.formValidate.ENName,
    							strVendorName_EN:'',
    							strVendorAddress:this.formValidate.address,
    							strVendorDesc:this.formValidate.desc
    						});
                        }
            			let list=await Vendor_ListActive({
            				"nPageIndex": this.currentPage,
            				"nPageSize":this.pageSize,
            				"uUserUUID":-1});
            			this.modal2=false;
                    	this.companyList=list.obj.objectlist;
                    	this.totalCount=list.obj.totalcount;
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
			ManufaEdit(obj,add) {
				if(add){
					this.isAddManufa=true;
					this.editedManufa={};
					this.formValidate.name='';
					this.formValidate.ENName='';
					this.formValidate.fullName='';
					this.formValidate.address='';
					this.formValidate.desc='';
				}
				else{
					this.isAddManufa=false;
					this.editedManufa=obj;
					this.formValidate.name=obj.strVendorShortName;
					this.formValidate.ENName=obj.strVendorShortName_EN;
					this.formValidate.fullName=obj.strVendorName;
					this.formValidate.address=obj.strVendorAddress;
					this.formValidate.desc=obj.strVendorDesc;
				}
				// this.showManufaEdit=!this.showManufaEdit;
				this.modal2=true;
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