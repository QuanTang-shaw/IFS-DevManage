<template>
	<div class="companyList">
		<table border="1" class="companyList-table">
			<thead>
				<tr>
					<th>名称</th>
					<th>英文</th>
					<th>全称</th>
					<th>所在地</th>
					<th>操作</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="company in companyList">
					<td>{{company.name}}</td>
					<td>{{company.englishName}}</td>
					<td>{{company.fullName}}</td>
					<td>{{company.location}}</td>
					<td>
						<span>列表</span>
						<span>管理</span>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
  	import store from '@/store/store'
	export default{
		name:'devicManufacturers',
		data(){
			let	companyList=store.obtain('deviceManufacturers');
			return {
				companyList
			}
		},
		created:function () {

		},
		methods:{

		}
	}
</script>
<style>
	.companyList{
		font-size:25px;
	}
	.companyList,.companyList-table{
		width: 100%;
	}
	.companyList-table th,.companyList-table td{
		padding:25px 35px;
	}
</style>