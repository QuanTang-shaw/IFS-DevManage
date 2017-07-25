<template>
	<div class="deviceCategory">
		<div class="categoryList-nav">
			<div>
				<div><i class="fa fa-minus-square-o  fa-lg"></i><span>设备类别</span></div>
				<ul style="margin-left:30px;">
					<li class="CategoryName" v-for="(category,key,index) in CategoryList">
						<div class="devType" @mouseover="category.showopt=true" >
							<i class="fa fa-minus-square-o  fa-lg" style="margin-right:6px;"></i>
							{{key|toChinese}}
							<i class="fa fa-caret-down fa-sm" v-show="category.showopt" style="margin-right:6px;"></i>
						</div>
						<ul>
							<li class="subCategoryName" v-for="(device,key,index) in category" @click="categoryClick(device)">{{key|toChinese}}</li>
						</ul>
					</li>
				</ul>
			</div>
		</div>
		<div class="categoryList">
			<table class="categoryList-table" border="0">
				<thead>
					<tr>
						<th><input type="checkbox"></th>
						<th><span>设备名称</span></th>
						<th><span>设备厂商</span></th>
						<th><span>设备型号</span></th>
						<th><span>设备数量</span></th>
						<th><span>操作</span></th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="device in selectedCategory">
						<td><input type="checkbox"></td>
						<td>
							<span>{{device.name}}</span>
						</td>
						<td>
							<span>{{device.factory}}</span>
						</td>
						<td>
							<span>{{device.model}}</span>
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
	export default{
		name:'devicCategory',
		data(){
			let	CategoryList=store.obtain('deviceCategory'),
				selectedCategory=CategoryList.feeder.Direct;
			return {
				CategoryList,
				selectedCategory,
				isShowArrow:[7]
			}
		},
		created:function () {
			console.log(this.selectedCategory)
		},
		methods:{
			categoryClick:function (category) {
				console.log(category);
				this.selectedCategory=category;
			},
			showArrow:function (index){
				this.isShowArrow[index]=true;
				console.log(index)
			}

		},
		filters:filter,
		components:{
			'tree-node':treeNode
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
	}
	.categoryList-table th,.categoryList-table td{
		padding:10px 30px;
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
</style>