<template>
	<div class="deviceCategory">
		<div class="categoryList-nav">
			<ul>
				<li class="CategoryName" v-for="(category,key,index) in CategoryList">{{key}}
					<ul>
						<li class="subCategoryName" v-for="(device,key,index) in category" @click="categoryClick(device)">{{key|toChinese}}</li>
					</ul>
				</li>
			</ul>
		</div>
		<div class="categoryList">
			<table class="categoryList-table" border="1">
				<thead>
					<tr>
						<th><span>厂商</span></th>
						<th><span>型号</span></th>
						<th><span>名称</span></th>
						<th><span>数量</span></th>
						<th><span>操作</span></th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="device in selectedCategory">
						<td>
							<span>{{device.name}}</span>
						</td>
						<td>
							<span>{{device.model}}</span>
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
	export default{
		name:'devicCategory',
		data(){
			let	CategoryList=store.obtain('deviceCategory'),
				selectedCategory=CategoryList.feeder.Direct;
			return {
				CategoryList,
				selectedCategory
			}
		},
		created:function () {
			console.log(this.selectedCategory)
		},
		methods:{
			categoryClick:function (category) {
				console.log(category);
				this.selectedCategory=category;
			}

		},
		filters:filter
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
		border:solid 1px #CBC6C6;
		/*float: left;*/
		overflow-y:scroll;
		display:inline-block;
	}
	.categoryList{
		display: inline-block;
	    width: 80%;
	    border: solid 1px #C5C3C3;
	    position: absolute;
	    top: 0;
	    bottom: 0;
	}
	.deviceCategory,.categoryList-table{
		width: 100%;
	}
	.categoryList-table th,.categoryList-table td{
		padding:10px 30px;
	}
	.subCategoryName{
		cursor: pointer;
		margin-left:25px;
	}
	.subCategoryName:hover{
		background-color: #E4D8D8;
	}
</style>