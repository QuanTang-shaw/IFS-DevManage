<template>
	<div class="deviceCategory">
		<div class="categoryList-nav">
			<ul>
				<li class="CategoryName" v-for="(category,key,index) in CategoryList">{{key}}
					<ul>
						<li class="subCategoryName" v-for="(device,key,index) in category" @click="categoryClick(device)">{{key}}</li>
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

		}
	}
</script>

<style>
	.deviceCategory{
		border:solid 1px #CBC6C6;
	}
	.categoryList-nav{
		border:solid 1px #CBC6C6;
		float: left;
		/*display:inline-block;*/
	}
	.categoryList{
		/*display:inline-block;*/
		width: 85%;
		float: left;
		border:solid 1px #C5C3C3;
		font-size:25px;
	}
	.deviceCategory,.categoryList-table{
		width: 100%;
	}
	.categoryList-table th,.categoryList-table td{
		padding:20px 30px;
	}
	.subCategoryName{
		cursor: pointer;
	}
	.subCategoryName:hover{
		background-color: #E4D8D8;
	}
</style>