<template>
	<div class="deviceCategory">
		<Modal
		    v-model="modal1"
		    :title=modalTitle
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
	        title="对话框标题"
	        @on-ok="ModelEditOk"
	        @on-cancel="closeEdit">
		    <Form ref="formValidate"  :model="formValidate" :rules="ruleValidate" :label-width="80">
		           <Form-item label="设备型号" prop="ModelName">
		               <Input v-model="formValidate.ModelName" placeholder="请输入设备型号"></Input>
		           </Form-item>
		           <Form-item label="设备类型" prop="categoryType">
			           <Cascader :data="dataCategory" v-model="formValidate.categoryType" @on-change="changeCategory"></Cascader>
		           </Form-item>
		           <Form-item label="设备厂家" prop="vendor">
		               <Select v-model="formValidate.vendor" placeholder="请选择设备厂家">
		                   <Option :value="vendor.uVendorUUID" :key="vendor.uVendorUUID" v-for="vendor in vendorList">{{vendor.strVendorShortName}}</Option>
		                  <!--  <Option value="shanghai">上海市</Option>
		                  <Option value="shenzhen">深圳市</Option> -->
		               </Select>
		           </Form-item>
		           <Form-item label="型号介绍" prop="desc">
		               <Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..."></Input>
		           </Form-item>
		           <Form-item>
		               <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
		               <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
		               <Alert v-show="showWaring" type="error" show-icon>请先提交!</Alert>
		           </Form-item>
		    </Form>
		</Modal>
		<Modal
	        v-model="modal3"
	        title="新增设备父类"
	        @on-ok="addNewCategoryOk"
	        @on-cancel="cancel">
	        <Input v-model="newParCagegoryName" placeholder="请输入新的设备类型名称" style="width: 300px"></Input>
    	</Modal>
    	<div class="devModel-mg">
			<div class="categoryList-nav">
				<div>
					<div @mouseenter="showIcon" @mouseleave="hideIcon">
						<i class="fa fa-minus-square-o  fa-lg" @click="foldAll"></i>
						<span>设备类别</span>
						<span class="operating-icon">
								<i class="fa fa-plus fa-sm" @click="render"></i>
							<!-- <Button @click="render" icon="plus-round" size="small">
							</Button> -->
						</span>
					</div>
					<ul style="margin-left:20px;" v-show="showTree">
						<li class="CategoryName" v-for="(parentCategory,index0) in DevParentClass" style="position:relative;margin-top:5px;">
							<div class="devType" @mouseenter="showIcon" @mouseleave="hideIcon">
								<i class="fa fa-minus-square-o fa-lg"
									style="margin-right:6px;"
									@click="fold(index0,parentCategory)"
									v-if="index0==0">
								</i>
								<i class="fa fa-plus-square-o fa-lg"
									style="margin-right:6px;"
									@click="fold(index0,parentCategory)"
									v-else>
								</i>
								<input
									type="text"
									class="categoryNameInput"
									v-model="parentCategory.strDevCategoryName"
									@change="changeCategoryName(parentCategory)"
									v-if="parentIndex==index0"
									@blur="blur"
									v-focus>
								<span v-else style="">{{parentCategory.strDevCategoryName}}</span>
								<span class="operating-icon">
									<i class="fa fa-edit fa-sm" @click.stop="parentNameEdit(index0)"></i>
									<i class="fa fa-plus fa-sm" @click="addSubCategory(parentCategory,index0)"></i>
									<i class="fa fa-remove fa-sm" @click="delParCategory(parentCategory,{index0},'parent')"></i>
								</span>
							</div>
							<ul style="border:solid 0px;" v-if="unfolder[index0]">
								<li class="subCategoryName" v-for="(subCategory,$index1) in DevSubClass[index0]" @click="categoryClick(subCategory)" style="padding-left:15px;margin-top:6px;" @mouseleave="devNameOut" @mouseenter="devNameOver">
										<input
											type="text"
											class="categoryNameInput"
											v-model="subCategory.strDevCategoryName"
											@change="changeCategoryName(subCategory)"
											v-if="showInputIndex0==index0&&showInputIndex1==$index1"
											@blur="blur"
										v-focus>
										<span v-else>{{subCategory.strDevCategoryName}}</span>
										<span class="operating-icon">
											<i class="fa fa-trash  fa-sm"  @click="delSubCategory(subCategory,{index0,$index1},'sub')"></i>
											<i class="fa fa-edit fa-sm" @click.stop="devNameEdit(index0,$index1)"></i>
										</span>
								</li>
							</ul>
						</li>
					</ul>
				</div>
			</div>
			<div class="devModelList">
				<div class="categoryList">
					<table class="categoryList-table" border="0">
						<thead style="background-color:#F0EDED">
							<tr>
								<!-- <th><input type="checkbox"></th> -->
								<th><span>设备型号</span></th>
								<th><span>设备名称</span></th>
								<th><span>设备厂商</span></th>
								<th><span>设备数量</span></th>
								<th>
									<span>操作</span>
									<Button  type="primary" icon="plus-round" @click="DevModelEdit">添加型号</Button>
								</th>
							</tr>
						</thead>
						<tbody style="border:solid 1px #F2F1F1;">
							<tr v-for="(device,index) in DevModelList">
								<!-- <td><input type="checkbox"></td> -->
								<td>
									<span>{{device.strDevModelName}}</span>
								</td>
								<td>
									<span>{{device.strDevCategoryName}}</span>
								</td>
								<td>
									<span>{{device.strVendorShortName}}</span>
								</td>
								<td>
									<span>15</span>
								</td>
								<td class="DevCagegory-oper">
									<!-- <span title="编辑">
										<i class="fa fa-edit fa-lg" @click="DevModelEdit(device,index)"></i>
									</span>
									<span title="删除">
										<i class="fa fa-trash-o fa-lg" @click="DevModelDelete(device,index)"></i>
									</span> -->
									<Button shape="circle" size="small" icon="edit" @click="DevModelEdit(device,index)">编辑</Button>
			                		<Button shape="circle" size="small" icon="trash-a" @click="DevModelDelete(device,index)">删除</Button>
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
    	</div>
	</div>
</template>

<script>
	import {
		DevModelListActive,
		DevModel_Update,
		DevModel_Add,
		DevModel_Inactive,
		DevcategoryListActive,
		Devcategory_Inactive,
		Devcategory_Add,
		Devcategory_Update,
		Vendor_ListActive,
	} from '@/api/getData'
	export default{
		name:'devicCategory',
		data(){
			return {
				selectedCategory:{},
				DevModelEditing:{},
				DevParentClass:[],
				DevSubClass:[],
				DevModelList:[],
				vendorList:[],
				unfolder:[],
				modalTitle:'',
				deletePopContent:'',
				initvalue:'',
				newParCagegoryName:'',
				DelDevModelID:0,
				showInputIndex0:-1,
				showInputIndex1:-1,
				showTree:true,
				parentIndex:-1,
				isEdit:false,
				isAddDevModel:false,
				isParCategoryDel:false,
				isSubCategoryDel:false,
				obj1:{},
				obj2:{},
				isModelDel:false,
				modal1:false,
				modal2:false,
				modal3:false,
				loading:false,
				showWaring:false,
				submitSuc:false,
				totalCount:0,
				currentPage:0,
				pageSize:8,
				pageSizeOpts:[5,8],
				// categoryType:[],
				dataCategory:[],
				formValidate: {
                    ModelName: '',
                    categoryType:[],
                    vendor: '',
                    gender: '',
                    interest: [],
                    date: '',
                    time: '',
                    desc: ''
                },
                ruleValidate: {
                    ModelName: [
                        { required: true, message: '设备型号不能为空', trigger: 'blur' }
                    ],
                    categoryType: [
                        // { required: true, message: '设备类型不能为空', trigger: 'blur' },
                        // { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
                    ],
                    vendor: [
                        { required: true, message: '请选择设备厂商', trigger: 'blur' }
                    ],
                    gender: [
                        { required: true, message: '请选择性别', trigger: 'change' }
                    ],
                    interest: [
                        { required: true, type: 'array', min: 1, message: '至少选择一个爱好', trigger: 'change' },
                        { type: 'array', max: 2, message: '最多选择两个爱好', trigger: 'change' }
                    ],
                    date: [
                        { required: true, type: 'date', message: '请选择日期', trigger: 'change' }
                    ],
                    time: [
                        { required: true, type: 'date', message: '请选择时间', trigger: 'change' }
                    ],
                    desc: [
                        { required: false, message: '请输入个人介绍', trigger: 'blur' },
                        { type: 'string', min: 20, message: '介绍不能少于10字', trigger: 'blur' }
                    ]
                }
			}
		},
		methods:{
			handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('提交成功!');
                        this.submitSuc=true;
                        if(this.isAddDevModel){
	                	DevModel_Add({
	                		uDevTypeUUID:-1,
	                		uDevCategoryUUID:this.formValidate.categoryType[1],
	                		uVendorUUID:this.formValidate.vendor,
	                		uUserUUID:-1,
	                		strDevModelName:this.formValidate.ModelName
	                	}).
	                	then(async (data)=>{
	                		console.log(data);
	                		let list=await DevModelListActive({
	                				nPageIndex:self.currentPage,
	                				nPageSize:self.pageSize,
	                				uDevTypeUUID:-1,
	                				uDevCategoryUUID:self.selectedCategory.uDevCategoryUUID,
	                				uVendorUUID:-1,
	                				uUserUUID:-1
	                			});
	                		self.DevModelList=list.obj.objectlist;
	                		self.totalCount=list.obj.totalcount;
	                	});
	                }
	                else{
	                	DevModel_Update({
	                		uDevModelUUID:this.DevModelEditing.uDevModelUUID,
	                		uDevTypeUUID:-1,
	                		uDevCategoryUUID:this.formValidate.categoryType[1],
	                		uVendorUUID:this.formValidate.vendor,
	                		uUserUUID:-1,
	                		strDevModelName:this.formValidate.ModelName,
	                		strDevModelDesc:this.formValidate.desc,
	                		strDevModelNote:''
	                	}).
	                	then(async (data)=>{
	                		console.log(data);
	                		let list=await DevModelListActive({
	                				nPageIndex:self.currentPage,
	                				nPageSize:self.pageSize,
	                				uDevTypeUUID:-1,
	                				uDevCategoryUUID:self.selectedCategory.uDevCategoryUUID,
	                				uVendorUUID:-1,
	                				uUserUUID:-1
	                			});
	                		self.DevModelList=list.obj.objectlist;
	                		self.totalCount=list.obj.totalcount;
	                	})
	                }
                    } else {
                        this.$Message.error('表单验证失败!');
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            },
			async ok (){
			  	let self=this;
			  	if(this.isModelDel){
				  	DevModel_Inactive({uDevModelUUID:this.DelDevModelID})
				  	.then(async function () {
				  		let list=await DevModelListActive({
							nPageIndex:self.currentPage,
							nPageSize:self.pageSize,
							uDevTypeUUID:-1,
							uDevCategoryUUID:self.selectedCategory.uDevCategoryUUID,
							uVendorUUID:-1,
							uUserUUID:-1
						});
						self.DevModelList=list.obj.objectlist;
						self.totalCount=list.obj.totalcount;
				  		self.$Message.info('设备型号删除成功');
					})
			  	}
			  	else if(this.isSubCategoryDel){
	  				this.delSubCategory(null,null,'callback');
			  	}
			  	else if(this.isParCategoryDel){
	  				this.delParCategory(null,null,'callback');
			  	}
			},
			cancel () {
			  this.$Message.info('点击了取消');
			},
			ModelEditOk () {
				let self=this;
				if(this.submitSuc){
					this.loading=true;
	                setTimeout(() => {
	                    this.modal2 = false;
	                }, 500);
	                if(this.isAddDevModel){
	                	DevModel_Add({
	                		uDevTypeUUID:-1,
	                		uDevCategoryUUID:this.formValidate.categoryType[1],
	                		uVendorUUID:this.formValidate.vendor,
	                		uUserUUID:-1,
	                		strDevModelName:this.formValidate.ModelName
	                	}).
	                	then(async (data)=>{
	                		console.log(data);
	                		let list=await DevModelListActive({
	                				nPageIndex:self.currentPage,
	                				nPageSize:self.pageSize,
	                				uDevTypeUUID:-1,
	                				uDevCategoryUUID:self.selectedCategory.uDevCategoryUUID,
	                				uVendorUUID:-1,
	                				uUserUUID:-1
	                			});
	                		self.DevModelList=list.obj.objectlist;
	                		self.totalCount=list.obj.totalcount;
	                	});
	                }
	                else{
	                	DevModel_Update({
	                		uDevModelUUID:this.DevModelEditing.uDevModelUUID,
	                		uDevTypeUUID:-1,
	                		uDevCategoryUUID:this.formValidate.categoryType[1],
	                		uVendorUUID:this.formValidate.vendor,
	                		uUserUUID:-1,
	                		strDevModelName:this.formValidate.ModelName,
	                		strDevModelDesc:this.formValidate.desc,
	                		strDevModelNote:''
	                	}).
	                	then(async (data)=>{
	                		console.log(data);
	                		let list=await DevModelListActive({
	                				nPageIndex:self.currentPage,
	                				nPageSize:self.pageSize,
	                				uDevTypeUUID:-1,
	                				uDevCategoryUUID:self.selectedCategory.uDevCategoryUUID,
	                				uVendorUUID:-1,
	                				uUserUUID:-1
	                			});
	                		self.DevModelList=list.obj.objectlist;
	                		self.totalCount=list.obj.totalcount;
	                	})
	                }
				}
				else{
					this.showWaring=true;
					this.loading=true;
				}
            },
            closeEdit(){
			  this.$Message.info('点击了取消');
              this.showWaring=false;
            },
            addNewCategoryOk(){
            	this.addDevParentCategory();
            },
            render () {
                this.modal3=true;
            },
			async togglePage(pagenum){
				this.currentPage=pagenum-1;
				let list=await DevModelListActive({
					nPageIndex:pagenum-1,
					nPageSize:this.pageSize,
					uDevTypeUUID:-1,
					uDevCategoryUUID:this.selectedCategory.uDevCategoryUUID,
					uVendorUUID:-1,
					uUserUUID:-1
				});
				this.DevModelList=list.obj.objectlist;
				this.totalCount=list.obj.totalcount;
			},
			async togglePageNum(pageSizeNum){
				// alert(pageSizeNum)
				this.pageSize=pageSizeNum;
				let list=await DevModelListActive({
					nPageIndex:this.currentPage,
					nPageSize:pageSizeNum,
					uDevTypeUUID:-1,
					uDevCategoryUUID:this.selectedCategory.uDevCategoryUUID,
					uVendorUUID:-1,
					uUserUUID:-1
				});
				this.DevModelList=list.obj.objectlist;
				this.totalCount=list.obj.totalcount;
			},
			async categoryClick(category) {
				console.log(category);
				this.selectedCategory=category;
				let list=await
				DevModelListActive({
    				nPageIndex:0,
    				nPageSize:this.pageSize,
    				uDevTypeUUID:-1,
    				uDevCategoryUUID:this.selectedCategory.uDevCategoryUUID,
    				uVendorUUID:-1,
    				uUserUUID:-1});
        		this.DevModelList=list.obj.objectlist;
        		this.totalCount=list.obj.totalcount;
			},
			fold:function (index) {
				this.unfolder.splice(index, 1,!this.unfolder[index]);
				$(`.devType:eq(${index}) .fa`).first().toggleClass('fa-minus-square-o')
							   .toggleClass('fa-plus-square-o');
				/*$(".devType:eq(`${index}`):first-child").toggleClass('fa-minus-square-o')
							   .toggleClass('fa-plus-square-o');*/
				/*$(event.target).toggleClass('fa-minus-square-o')
							   .toggleClass('fa-plus-square-o');*/
			},
			foldAll(){
				$(event.target).toggleClass('fa-minus-square-o')
							   .toggleClass('fa-plus-square-o');
				this.showTree=!this.showTree;
			},
			showIcon:function (){
				if(!this.isEdit)
				$(event.target).children('.operating-icon').css('display','inline-block');
			},
			hideIcon:function () {
				$(event.target).children('.operating-icon').css('display','none');
			},
			async addDevParentCategory() {
				await Devcategory_Add({
				      	 	uDevCategoryParentUUID:0,
			  	 	      	uUserUUID:-1,
			  	 	      	strDevCategoryName:this.newParCagegoryName,
	      	 	      });
				this.DevParentClass=await DevcategoryListActive({
			      	"nPageIndex": 0,
			      	"nPageSize": -1,
			      	"uDevCategoryParentUUID":0,
			      	"uUserUUID":-1});

	      	 	// this.DevParentClass.push({strDevCategoryName:this.newParCagegoryName});
			},
			async addSubCategory(obj,index0) {
				// console.log(obj);
				if(!this.unfolder[index0]){ this.fold(index0);console.log(event.target)}
				await Devcategory_Add({
				      	 	uDevCategoryParentUUID:obj.uDevCategoryUUID,
			  	 	      	uUserUUID:-1,
			  	 	      	strDevCategoryName:'新设备种类'});
				this.DevSubClass[index0]=await DevcategoryListActive({
	      	 	      	"nPageIndex": 0,
	      	 	      	"nPageSize": -1,
	      	 	      	"uDevCategoryParentUUID":obj.uDevCategoryUUID,
	      	 	      	"uUserUUID":-1});
				this.devNameEdit(index0,this.DevSubClass[index0].length-1);
			},
			async delParCategory(obj1,obj2,callback){
				this.modal1=true;
				this.modalTitle="删除设备父类";
				this.isParCategoryDel=true;
				if(obj1){
					this.deletePopContent=obj1.strDevCategoryName;
					this.obj1=obj1;
					this.obj2=obj2;
				}
				else if(callback){
					this.DevSubClass[this.obj2.index0].forEach(function (ele,index) {
						Devcategory_Inactive({uDevCategoryUUID:ele.uDevCategoryUUID});
					});
		  			await Devcategory_Inactive({uDevCategoryUUID:this.obj1.uDevCategoryUUID});
		  			this.DevParentClass=await DevcategoryListActive({
				      	"nPageIndex": 0,
				      	"nPageSize": -1,
				      	"uDevCategoryParentUUID":0,
				      	"uUserUUID":-1
				    });
					this.isParCategoryDel=false;
					this.modal1=false;
					this.$Message.info('设备类别删除成功');
				}
			},
			delSubCategory(obj1,obj2,callback) {
				console.log('del');
				this.modal1=true;
				this.modalTitle="删除设备子类";
				this.isSubCategoryDel=true;
				if(obj1){
					this.deletePopContent=obj1.strDevCategoryName;
					this.obj1=obj1;
					this.obj2=obj2;
				}
				else if(callback){
		  		    this.DevSubClass[this.obj2.index0].splice(this.obj2.$index1, 1);
		  			Devcategory_Inactive({uDevCategoryUUID:this.obj1.uDevCategoryUUID});
					this.isSubCategoryDel=false;
					this.modal1=false;
					this.$Message.info('设备类别删除成功');
				}
			},
			devNameOver:function () {
				$(event.target).children('.operating-icon').css('display','inline-block');
			},
			devNameOut:function (argument) {
				event.cancelBubble=true;
				$(event.target).children('.operating-icon').css('display','none');
			},
			parentNameEdit:function (index) {
				this.isEdit=true;
				this.parentIndex=index;
				$(event.target.parentElement).css('display','none');
			},
			devNameEdit:function (index0,index1) {
				this.showInputIndex0=index0;
				this.showInputIndex1=index1;
				event.cancelBubble=true;
				// console.log(index0,index1);
				// console.log(this.showInputIndex0,this.showInputIndex1);
			},
			changeCategoryName:function (obj) {
				Devcategory_Update({
				      	 	uDevCategoryUUID:obj.uDevCategoryUUID,
				      	 	uDevCategoryParentUUID:obj.uDevCategoryParentUUID,
			  	 	      	uUserUUID:obj.uUserUUID,
			  	 	      	strDevCategoryName:obj.strDevCategoryName,
			  	 	      	strDevCategoryDesc:'',
			  	 	      	strDevCategoryNote:''
	      	 	      });
			},
			blur:function (){
				this.showInputIndex0=-1;
				this.showInputIndex1=-1;
				this.parentIndex=-1;
				this.isEdit=false;
			},
			DevModelDelete(obj,index){
				this.modal1 = true;
				this.modalTitle='删除设备型号'
				this.deletePopContent=obj.strDevModelName;
				this.DelDevModelID=obj.uDevModelUUID;
			},
			async DevModelEdit(obj,index){
				this.DevModelEditing=obj;
				this.modal2=true;
				let list=await Vendor_ListActive({
					nPageIndex:0,
					nPageSize:-1,
					uUserUUID:-1
				});
				this.vendorList=list.obj.objectlist;
				if(!index){
					this.isAddDevModel=true;
					this.formValidate.categoryType=[];
					this.formValidate.ModelName='';
				}
				else{
					console.log(obj)
					this.formValidate.categoryType=[];
					this.formValidate.categoryType.push(obj.uDevCategoryParentUUID);
					this.formValidate.categoryType.push(obj.uDevCategoryUUID);
					this.formValidate.ModelName=obj.strDevModelName
					// console.log(this.formValidate.vendor)
					// this.formValidate.vendor=obj.strVendorShortName;
				}
			},
			async changeCategory(value){
				// alert(value);
				// alert(this.formValidate.categoryType);
				// console.log(this.formValidate.categoryType[0])
			}
		},
		directives:{
			focus:{
				inserted:function (el) {
					el.focus();
				}
			}
		},
		async beforeCreate() {
			let self=this;
			this.DevParentClass=await DevcategoryListActive({
			      	"nPageIndex": 0,
			      	"nPageSize": -1,
			      	"uDevCategoryParentUUID":0,
			      	"uUserUUID":-1});
	      	// this.DevParentClass=list.obj.objectlist;
	      	this.DevParentClass.forEach( function(element, index) {
	      		if(index==0) self.unfolder[0]=true;
	      		 else self.unfolder[index]=false;
	      	});
	      	// console.log(this.DevParentClass);

		    let len=self.DevParentClass.length,
			      k=0;
		    async function  togetData  (argument) {
			    self.DevSubClass[k]=[];
			    self.DevSubClass[k]=await DevcategoryListActive({
			      	"nPageIndex": 0,
			      	"nPageSize": -1,
			      	"uDevCategoryParentUUID":self.DevParentClass[k].uDevCategoryUUID,
			      	"uUserUUID":-1
			    });
			    k++;
			    if(k<len) togetData();
			    else  self.selectedCategory=self.DevSubClass[0][0];
		    }
		    togetData();

			let list=await DevModelListActive({
					nPageIndex:0,
					nPageSize:this.pageSize,
					uDevTypeUUID:-1,
					uDevCategoryUUID:7,
					uVendorUUID:-1,
					uUserUUID:-1
				});
			this.DevModelList=list.obj.objectlist;
			this.totalCount=list.obj.totalcount;
			// console.log(this.DevModelList);
		},
		created(){
			setTimeout(()=>{
				this.DevParentClass.forEach((ele,index)=>{
						let obj1={};
						obj1.value=ele.uDevCategoryUUID;
						obj1.label=ele.strDevCategoryName;
						obj1.children=[];
						this.DevSubClass[index].forEach((ele)=>{
							let obj2={};
							obj2.value=ele.uDevCategoryUUID;
							obj2.label=ele.strDevCategoryName;
							obj1.children.push(obj2);
						});
						this.dataCategory.push(obj1);
					});
			},2000)
		}
	}
</script>

<style>
	.devModel-mg{
		/*border:solid 1px #CBC6C6;*/
		font-size:.7em;
		box-shadow: 2px 2px 5px #c6c5c7;
		height:500px;
		position: relative;
	}
	.categoryList-nav{
		height: 100%;
	    max-width: 30%;
	    min-width:20%;
	    padding: 10px;
	    font-size:1.2em;
	    /*background-color: #F7F6F6;*/
	    overflow-y: scroll;
	    border: solid 1px #E7E2E2;
	    display: inline-block;
	}
	.devModelList{
		display: inline-block;
		min-width: 70%;
		max-width: 80%;
		position: absolute;
		top: 0;
		bottom: 0;
		padding: 15px;
	}
	.categoryList{
		margin:0 auto;
	}
	.deviceCategory,.categoryList-table{
		width: 100%;
	}
	.categoryList-table{
		/*border: solid 1px #D1CCCC;*/
		/*text-align: center;*/
	}
	.categoryList-table tbody tr:hover{
		background-color: #D6ECFA;
	}
	.categoryList-table th,.categoryList-table td{
		text-align: center;
		padding:10px 0;
	}
	.categoryList-table tr{
		border-bottom:solid 1px #E9E5E5;
	}
	.CategoryName:hover{
		/*background-color: #F6EAEA;*/
	}
	.subCategoryName{
		cursor: pointer;
		margin-left:20px;
	}
	.subCategoryName:hover{
		background-color: #DFDADA;
	}
	.editName{
		/*display:inline;*/
		width: 80px;
	}
	.categoryNameInput{
		width: 80px;
		border: none;
		background: transparent;
	}
	.operating-icon{
		/*border: solid 1px;*/
		display:none;
		cursor: pointer;
	}
	.operating-icon>i{
		margin: 2px;
	}
	.DevCagegory-oper span{
		margin-left:15px;
	}
	.page{
        margin:30px 10px;
    }
</style>