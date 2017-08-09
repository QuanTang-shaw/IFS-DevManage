<template>
	<div class="deviceCategory">
		<div class="categoryList-nav">
			<div>
				<div @mouseenter="showIcon" @mouseleave="hideIcon">
					<i class="fa fa-minus-square-o  fa-lg"></i>
					<span>设备类别</span>
					<span class="operating-icon">
						<i class="fa fa-plus fa-sm" @click="addDevParentCategory"></i>
					</span>
				</div>
				<ul style="margin-left:20px;">
					<li class="CategoryName" v-for="(parentCategory,index0) in DevParentClass" style="position:relative;">
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
								@change="changeParentDevName(parentCategory)"
								v-if="parentIndex==index0"
								@blur="blur"
								v-focus>
							<span v-else style="font-weight:bolder">{{parentCategory.strDevCategoryName}}</span>
							<span class="operating-icon">
								<i class="fa fa-edit fa-sm" @click.stop="parentNameEdit(index0)"></i>
								<i class="fa fa-plus fa-sm" @click="addSubCategory(index0)"></i>
								<i class="fa fa-remove fa-sm" @click="delCategory(parentCategory,{index0},'parent')"></i>
							</span>
						</div>
						<ul style="border:solid 0px;" v-if="unfolder[index0]">
							<li class="subCategoryName" v-for="(subCategory,$index1) in DevSubClass[index0]" @click="categoryClick(subCategory)" style="padding-left:15px;" @mouseleave="devNameOut" @mouseenter="devNameOver">
									<input
										type="text"
										class="categoryNameInput"
										v-model="subCategory.strDevCategoryName"
										@change="changeName(subCategory)"
										v-if="showInputIndex0==index0&&showInputIndex1==$index1"
										@blur="blur"
									v-focus>
									<span v-else>{{subCategory.strDevCategoryName}}</span>
									<span class="operating-icon">
										<i class="fa fa-trash  fa-sm"  @click="delCategory(subCategory,{index0,$index1})"></i>
										<i class="fa fa-edit fa-sm" @click.stop="devNameEdit(index0,$index1)"></i>
									</span>
							</li>
						</ul>
					</li>
				</ul>
			</div>
		</div>
		<div class="categoryList">
			<table class="categoryList-table" border="0">
				<thead>
					<tr>
						<!-- <th><input type="checkbox"></th> -->
						<th><span>设备型号</span></th>
						<th><span>设备名称</span></th>
						<th><span>设备厂商</span></th>
						<th><span>设备数量</span></th>
						<th><span>操作</span></th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="device in DevModelList">
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
						<td>
							<span title="编辑">
								<i class="fa fa-edit fa-lg"></i>
							</span>
							<span title="删除">
								<i class="fa fa-trash-o fa-lg"></i>
							</span>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script>
  	import store from '@/store/store'
  	import filter from '@/Filter/filter'
  	import treeNode from '@/components/TreeNode'
	import fetch from '@/fetch/fetch'

	export default{
		name:'devicCategory',
		data(){
			return {
				selectedCategory:{},
				DevParentClass:[],
				DevSubClass:[],
				DevModelList:[],
				showInputIndex0:-1,
				showInputIndex1:-1,
				parentIndex:-1,
				isEdit:false,
				unfolder:[]
			}
		},
		methods:{
			categoryClick:function (category) {
				console.log(category);
				this.selectedCategory=category;
				fetch
					.DevModel_ListActive({
						nPageIndex:0,
						nPageSize:-1,
						uDevTypeUUID:-1,
						uDevCategoryUUID:category.uDevCategoryUUID,
						uVendorUUID:-1,
						uUserUUID:-1
					})
					.then(data=>console.log(this.DevModelList=data.obj.objectlist));
			},
			fold:function (index) {
				this.unfolder.splice(index, 1,!this.unfolder[index]);
				$(event.target).toggleClass('fa-minus-square-o')
							   .toggleClass('fa-plus-square-o');
			},
			showIcon:function (){
				if(!this.isEdit)
				$(event.target).children('.operating-icon').css('display','inline-block');
			},
			hideIcon:function () {
				$(event.target).children('.operating-icon').css('display','none');
			},
			addDevParentCategory:function () {
				fetch
	      	 	      .Devcategory_Add({
				      	 	uDevCategoryParentUUID:0,
			  	 	      	uUserUUID:-1,
			  	 	      	strDevCategoryName:'新设备类型',
	      	 	      })
	      	 	this.DevParentClass.push({strDevCategoryName:"xinshebei"})
			},
			addSubCategory:function (index0) {
				let pID=0,
					len=this.DevSubClass[index0].length;
				console.log(this.DevSubClass[index0]);

				if(this.DevSubClass[index0].length>=0){
					pID=this.DevSubClass[index0][0].uDevCategoryParentUUID;
				}
				else{
					pID=this.DevSubClass[index0][0].length+1;
				}
				fetch
	      	 	      .Devcategory_Add({
				      	 	uDevCategoryParentUUID:pID,
			  	 	      	uUserUUID:-1,
			  	 	      	strDevCategoryName:'',
	      	 	      });
	      	 	      console.log(this.DevSubClass[index0][len-1])
				this.DevSubClass[index0].push({
					uDevCategoryUUID:parseInt(this.DevSubClass[index0][len-1].uDevCategoryUUID)+1,
		      	 	uDevCategoryParentUUID:pID,
	  	 	      	uUserUUID:0,
	  	 	      	strDevCategoryName:'新设备种类',
	  	 	      	strDevCategoryDesc:'',
	  	 	      	strDevCategoryNote:''
				});
				/*fetch
	      	 	      .Devcategory_ListActive({
	      	 	      	"nPageIndex": 0,
	      	 	      	"nPageSize": -1,
	      	 	      	"uDevCategoryParentUUID":pID,
	      	 	      	"uUserUUID":-1})
	      	 	      .then(data=>this.DevSubClass[index0]=data.obj.objectlist);*/
				this.devNameEdit(index0,this.DevSubClass[index0].length-1);
			},
			delCategory:function (obj1,obj2,parent) {
				let UUID=obj1.uDevCategoryUUID;
				if(parent){
					// UUID=null;
					this.DevSubClass[obj2.index0].forEach(function (ele,index) {
						fetch
			      	 	      .Devcategory_Inactive({
						      	 	uDevCategoryUUID:ele.uDevCategoryUUID
			      	 	      })
					})
				}
				else{
		      	 	this.DevSubClass[obj2.index0].splice(obj2.$index1, 1);
				}
				fetch
	      	 	      .Devcategory_Inactive({
				      	 	uDevCategoryUUID:UUID
	      	 	      })
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
				console.log(index0,index1);
				console.log(this.showInputIndex0,this.showInputIndex1);
			},
			changeParentDevName:function () {
				/* body... */
			},
			changeName:function (obj) {
				fetch
	      	 	      .Devcategory_Update({
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
			}
		},
		filters:filter,
		components:{
			'tree-node':treeNode
		},
		directives:{
			focus:{
				inserted:function (el) {
					el.focus();
				}
			}
		},
		beforeCreate:function () {
			let self=this;
			fetch
			      .Devcategory_ListActive({
			      	"nPageIndex": 0,
			      	"nPageSize": -1,
			      	"uDevCategoryParentUUID":0,
			      	"uUserUUID":-1})
			      .then(data=>{
			      	this.DevParentClass=data.obj.objectlist;
			      	this.DevParentClass.forEach( function(element, index) {
			      		if(index==0) self.unfolder[0]=true;
			      		 else self.unfolder[index]=false;
			      	});
				    function getSubcategory (k) {
				    	console.log(k);
				      	 let promise=new Promise(function (resolve,reject) {
				      	 	fetch
				      	 	      .Devcategory_ListActive({
				      	 	      	"nPageIndex": 0,
				      	 	      	"nPageSize": -1,
				      	 	      	"uDevCategoryParentUUID":k,
				      	 	      	"uUserUUID":-1})
				      	 	      .then(data=>resolve(data));
				      	 });
				      	 return promise;
				     }

				    async function getData (k) {
				      	let value=await getSubcategory(k);
				      	return value;
				    }
				    let len=self.DevParentClass.length,
					      k=1;
				    function togetData (argument) {
					    getData(k++).then(function(data){
					    	self.DevSubClass.push(data.obj.objectlist);
					    	if(k<=len) togetData();
					    })

				    }
				    togetData();
				    self.selectedCategory=self.DevParentClass[0][0];
			      });

			fetch
				.DevModel_ListActive({
					nPageIndex:0,
					nPageSize:-1,
					uDevTypeUUID:-1,
					uDevCategoryUUID:1,
					uVendorUUID:-1,
					uUserUUID:-1
				})
				.then(data=>console.log(this.DevModelList=data.obj.objectlist));
		}
	}
</script>

<style>
	.deviceCategory{
		font-size:.7em;
		/*border:solid 1px #CBC6C6;*/
		box-shadow: 2px 2px 5px #c6c5c7;
		height:500px;
		position: relative;
	}
	.categoryList-nav{
		height: 100%;
	    max-width: 30%;
	    min-width:25%;
	    padding: 10px;
	    font-size: .9em;
	    /*background-color: #F7F6F6;*/
	    overflow-y: scroll;
	    display: inline-block;
	}
	.categoryList{
		display: inline-block;
		min-width: 70%;
		max-width: 85%;
		position: absolute;
		top: 0;
		bottom: 0;
		padding: 15px;
	}
	.deviceCategory,.categoryList-table{
		width: 100%;
	}
	.categoryList-table{
		/*border: solid 1px #D1CCCC;*/
		/*text-align: center;*/
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
</style>