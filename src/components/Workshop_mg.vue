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
		<Modal
		    v-model="modal2"
		    title="车间编辑"
		    @on-cancel="cancel"
		    :footer-hide="true">
		    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
		            <Form-item label="编号" prop="numbering">
		                <Input v-model="formValidate.numbering" placeholder="请输入车间编号"></Input>
		            </Form-item>
		            <Form-item label="名称" prop="name">
		                <Input v-model="formValidate.name" placeholder="请输入车间名称"></Input>
		            </Form-item>
		            <Form-item label="主管" prop="mail">
		                <Select v-model="formValidate.charge" placeholder="请选择车间主管">
	                        <Option value="1" >主管1</Option>
	                        <Option value="2" >主管2</Option>
	                        <Option value="3" >主管3</Option>
	                        <Option value="4" >主管4</Option>
	                        <Option value="5" >主管5</Option>
		                </Select>
		            </Form-item>
		            <Form-item label="类型" prop="workshopType">
		                <Select v-model="formValidate.workshopType" placeholder="请选择车间类型">
	                        <Option :key="wsType.uWorkshopTypeUUID" :value="wsType.uWorkshopTypeUUID" v-for="wsType in workshopTypelist">{{wsType.strWorkshopTypeName}}</Option>
		                </Select>
		            </Form-item>
		            <Form-item label="所属工厂" prop="Ownedfactory">
		                <Select v-model="formValidate.Ownedfactory" placeholder="请选择车间所属工厂">
	                        <Option :key="factory.uFactoryUUID" :value="factory.uFactoryUUID" v-for="factory in factoryList">{{factory.strFactoryName}}</Option>
		                </Select>
		            </Form-item>
		            <Form-item label="车间描述" prop="desc">
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
				        <Button >
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
		<div style="margin-top:20px;">
			<Row type="flex" justify="space-around">
		        <Col span="15">
					<Button class="addWorkshop" type="primary" icon="plus-round" @click="WsEdit(null,null,'add')">添加车间</Button>
		        </Col>
		        <Col span="4">
		        	<Input  placeholder="请输入..."></Input>
		        </Col>
		        <Col span="2">
					<Button type="ghost" shape="circle" icon="ios-search">搜索</Button>
		        </Col>
			</Row>
		</div>
		<div class="workshopManagement-table">
			<table class="workshopTable" border="0">
				<thead style="background-color:#F0EDED">
					<tr>
						<!-- <th></th> -->
						<th>车间编号</th>
						<th>车间名称</th>
						<th>车间主管</th>
						<th>车间类型</th>
						<th> <span>操作</span>
							<!-- <button class="btn btn-default addWorkshop" @click="WsEdit(null,'add')">
							<i class="fa fa-plus"></i>添加车间</button> -->
							<!-- <Button class="addWorkshop" type="primary" icon="plus-round" @click="WsEdit(null,'add')">添加车间</Button> -->
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
			                <Button  shape="circle" size="small" icon="edit" @click="WsEdit(workshop,index)">编辑</Button>
			                <Button  shape="circle" size="small" icon="trash-a" @click="wsDeletePop(workshop)">删除</Button>
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
	import workshopEdit from '@/modalEdit/WorkshopEdit'
	import {
    	FactoryListActive,
    	Workshop_ListActive,
    	WorkshopTypeListActive,
    	WorkshopInactive,
    	WorkshopAdd,
    	WorkshopUpdate,
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
			    workshopTypelist:[],
			    selectedPlant:{},
			    editedWorkshop:{},
			    showWSEdit:false,
			    showDeletePop:false,
			    isAdd:false,
			    showPaging:false,
			    editTypeTxt:'车间',
			    deletePopContent:'',
			    totalCount:0,
			    pageSize:10,
			    pageSizeOpts:[10,15,20],
			    currentPage:0,
			    modal1:false,
			    modal2:false,
			    formValidate: {
			      numbering:'',
			      name: '',
			      charge:'',
			      workshopType:'',
			      Ownedfactory:'',
			      desc: ''
			    },
			    ruleValidate: {
			        numbering: [
			            { required: true, message: '地址不能为空', trigger: 'blur' },
			        ],
			        name: [
			            { required: true, message: '名称不能为空', trigger: 'blur' }
			        ],
			        workshopType: [
			            { required: true, message: '请选择车间类型', trigger: 'blur' }
			        ],
			        Ownedfactory: [
			            { required: true, message: '请选择所属工厂', trigger: 'blur' }
			        ],
			        interest: [
			            { required: true, type: 'array', min: 1, message: '至少选择一个爱好', trigger: 'change' },
			            { type: 'array', max: 2, message: '最多选择两个爱好', trigger: 'change' }
			        ],
			        desc: [
			            // { required: true, message: '请输入工厂详细信息', trigger: 'blur' },
			            { type: 'string', min: 5, message: '介绍不能少于5字', trigger: 'blur' }
			        ]
			    }
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
			close(){
				this.modal2=false;
			},
			handleSubmit (name) {
                this.$refs[name].validate(async (valid) => {
                    if (valid) {
                        if(this.isAdd){
                        	await WorkshopAdd({
    							uFactoryUUID: this.formValidate.Ownedfactory,
    							uWorkshopTypeUUID:this.formValidate.workshopType,
    							uWorkshopAdminUUID: -1,
    							strWorkshopID: this.formValidate.numbering,
    							strWorkshopName: this.formValidate.name,
								strWorkshopDesc: this.formValidate.desc
                        	});
                        }
                        else{
                        	await WorkshopUpdate({
								uWorkshopUUID: this.editedWorkshop.uWorkshopUUID,
								uFactoryUUID: this.formValidate.Ownedfactory,
								uWorkshopTypeUUID:this.formValidate.workshopType,
								uWorkshopAdminUUID : 1,
								strWorkshopName:this.formValidate.name,
								strWorkshopID :this.formValidate.numbering,
								strWorkshopDesc: this.formValidate.desc,
								strWorkshopNote: ""
                        	});
                        }
                        let list=await Workshop_ListActive({
			              "nPageIndex": 0,
			              "nPageSize": this.pageSize,
			              "uFactoryUUID":this.selectedPlant.uFactoryUUID,
			              "uWorkshopTypeUUID":-1,
		  				  "uWorkshopAdminUUID":-1
            	  		});
            	        this.workshopList=list.obj.objectlist;
            	        this.totalCount=list.obj.totalcount;
                        this.$Message.success('提交成功!');
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
			WsEdit:function (obj,index,add) {
				if(add){
					this.isAdd=true;
					this.editedWorkshop={};
					this.formValidate.numbering='';
					this.formValidate.name='';
					this.formValidate.workshopType='';
					this.formValidate.Ownedfactory='';
					this.formValidate.desc='';
				}
				else{
					this.isAdd=false;
					this.editedWorkshop=obj;
					this.formValidate.numbering=obj.strWorkshopID;
					this.formValidate.name=obj.strWorkshopName;
					this.formValidate.workshopType=obj.uWorkshopTypeUUID;
					this.formValidate.Ownedfactory=obj.uFactoryUUID;
					this.formValidate.desc=obj.strWorkshopDesc;
					// console.log(obj);
				}
				this.modal2=true;
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
        	this.workshopTypelist=await WorkshopTypeListActive({
              	"nPageIndex":0,
              	"nPageSize":-1
	        });
        	// console.log(this.workshopTypelist);
		}
	}
</script>
<style>
	.workshopManagement{
		/*margin-top:30px;*/
		font-size: .7em;
	}
	.workshopManagement,.workshopManagement-table{
		/*font-size:20px;*/
		width:100%;
	}
	.workshop-plantSelect{
		border:solid 1px #DAD2D2;
		padding:5px 10px;
	    border-radius: 5px;
	}
	.workshopManagement-table{
		box-shadow: 2px 2px 5px #c6c5c7;
		/*padding: 10px;*/
		margin-top:20px;
	    border-radius: 3px;
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
	.workshopTable tbody tr:hover{
		background-color: #D6ECFA;
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
	.page{
        margin:30px 10px;
    }
</style>