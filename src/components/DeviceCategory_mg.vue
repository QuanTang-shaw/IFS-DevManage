<template>
	<div class="deviceCategory">
		<div class="categoryList-nav">
			<div>
				<div><i class="fa fa-minus-square-o  fa-lg"></i><span>设备类别</span></div>
				<ul style="margin-left:20px;">
					<li class="CategoryName" v-for="(parentCategory,index0) in DevParentClass" style="position:relative;">
						<div class="devType" @mouseover="showArrow" @mouseout="hideArrow" style="cursor:default;">
							<i class="fa fa-minus-square-o  fa-lg" style="margin-right:6px;"></i>
							{{parentCategory.strDevCategoryName}}
							<i class="fa fa-caret-down fa-sm"  style="display:none;"></i>
						</div>
						<div style="
							position:absolute;
							right:0;
							z-index:100;
							background-color:#FFFFFF;
							width:50px;
							padding:10px;
							display:none;
						top:0;">
							<ul>
								<li>增加</li>
								<li>删除</li>
								<li>修改</li>
							</ul>
						</div>
						<ul style="border:solid 0px;">
							<li class="subCategoryName" v-for="(subCategory,index) in DevSubClass[index0]" @click="categoryClick" style="border:solid 0px;margin:0px;" @mouseleave="devNameOut" @mouseenter=" devNameOver">
									<i class="fa fa-trash  fa-sm" style="visibility:hidden;"></i>
									<i class="fa fa-edit fa-sm"  style="visibility:hidden;" @click="devNameEdit({index0,index})"></i>
									<!-- <span>{{subCategory.strDevCategoryName}}</span> -->
									<input type="text" disabled="disabled" v-model="subCategory.strDevCategoryName" style="
									    width: 80px;
									    border: none;
									    background: transparent;" @change="changeName">
									<span v-show="subCategory.uShowInput"><input type="text" v-model="subCategory.strDevCategoryName"></span>
							</li>
						</ul>
					</li>
				</ul>
			</div>
		</div>
		<div class="categoryList">
			<table class="categoryList-table" border="1">
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
					<tr v-for="device in selectedCategory">
						<!-- <td><input type="checkbox"></td> -->
						<td>
							<span>{{device.model}}</span>
						</td>
						<td>
							<span>{{device.name}}</span>
						</td>
						<td>
							<span>{{device.factory}}</span>
						</td>
						<td>
							<span>{{device.Quantity}}</span>
						</td>
						<td>
							<span>列表</span>
							<span>管理</span>
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
			let	CategoryList=store.obtain('deviceCategory'),
				selectedCategory=CategoryList.feeder.Direct;
			return {
				CategoryList,
				selectedCategory,
				isShowArrow:[7],
				// showInput:false,
				DevParentClass:[],
				DevSubClass:[],
				showInput:[],
			}
		},
		watch:function (argument) {
			/* body... */
		},
		methods:{
			categoryClick:function (category) {
				console.log(category);
				this.selectedCategory=category;
			},
			showArrow:function (){
				// this.isShowArrow[index]=true;
				// event.target.children[1].style.display = 'inline-block';
			},
			hideArrow:function () {
				/* body... */
				// event.target.children[1].style.display = 'none';
			},
			devNameOver:function () {
				if(event.target.children[1]){
					event.target.children[0].style.visibility = "visible";
					event.target.children[1].style.visibility = "visible";
				}
				// console.log(event.target.children[1])
			},
			devNameOut:function (argument) {
				event.cancelBubble=true;
				if(event.target.children[1]){
					event.target.children[0].style.visibility = "hidden";
					event.target.children[1].style.visibility = "hidden";
				}
			},
			devNameEdit:function (obj) {
				event.cancelBubble=true;
				let el=event.target.nextSibling.nextSibling,
					val=el.innerHTML;

				// el.innerHTML=`<input class="editName" type="text" value="${val}" v-on:change="changeName"/>`;
				// style.contenteditable="true";
				el.removeAttribute('disabled')
				el.focus();
				el.select();
				console.log(el)
			},
			changeName:function () {
				alert('blur');
			},
			alert:function () {
				alert('message?: DOMString')
			}

		},
		filters:filter,
		components:{
			'tree-node':treeNode
		},
		beforeCreate:function () {
			fetch
			      .Devcategory_ListActive({
			      	"nPageIndex": 0,
			      	"nPageSize": -1,
			      	"uDevCategoryParentUUID":0,
			      	"uUserUUID":-1})
			      .then(data=>{
			      	console.log(this.DevParentClass=data.obj.objectlist);
					for(var j = 1, length2 = this.DevParentClass.length; j <= length2; j++){
						/*fetch
						      .Devcategory_ListActive({
						      	"nPageIndex": 0,
						      	"nPageSize": -1,
						      	"uDevCategoryParentUUID":j,
						      	"uUserUUID":-1})
						      .then(data=>{
						      	this.DevSubClass.push(data.obj.objectlist);
						      });*/
						    function getSubcategory () {
						      	 let promise=new Promise(function (resolve,reject) {
						      	 	fetch
						      	 	      .Devcategory_ListActive({
						      	 	      	"nPageIndex": 0,
						      	 	      	"nPageSize": -1,
						      	 	      	"uDevCategoryParentUUID":j,
						      	 	      	"uUserUUID":-1})
						      	 	      .then(data=>resolve(data));
						      	 });
						      	 return promise;
						     }
							    (async function () {
							      	let value=await getSubcategory();
							      	return value;
							    })().then(data=>{
							    	this.DevSubClass.push(data.obj.objectlist);
							    	// console.log(this.DevSubClass)
							    })
					}
			      });


		},
		created:function () {
			setTimeout(()=>{
			    this.DevSubClass.forEach( function(element, index,arr) {
					element.forEach( function(element, index) {
						element.uShowInput=false;
					});
			    });
			},300);
			// setTimeout(()=>console.log(this.DevSubClass),1000);
		}
	}
</script>

<style>
	.deviceCategory{
		font-size:.7em;
		border:solid 1px #CBC6C6;
		height:500px;
		position: relative;
	}
	.categoryList-nav{
		height: 100%;
		width: 20%;
		padding:10px ;
		font-size:.9em;
		/*border:solid 1px #CBC6C6;*/
		background-color:#F7F6F6;
		/*float: left;*/
		overflow-y:scroll;
		display:inline-block;
	}
	.categoryList{
		display: inline-block;
	    width: 80%;
	    /*border: solid 1px #C5C3C3;*/
	    position: absolute;
	    top: 0;
	    bottom: 0;
	    padding:15px;
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
	.subCategoryName{
		cursor: pointer;
		margin-left:20px;
	}
	.subCategoryName:hover{
		background-color: #E4D8D8;
	}
	.editName{
		/*display:inline;*/
		width: 80px;
	}
</style>