<template>
	<div class="companyList">
		<deletepop v-show="showDeletePop" @delete="Delete" :popTitle="deletePopTitle" :contentTxt="deletePopContent"></deletepop>
		<mf-edit v-show="showManufaEdit" @Edit="Edit"></mf-edit>
		<table border="0" class="companyList-table" >
			<thead>
				<tr>
					<th></th>
					<th>名称</th>
					<th>英文</th>
					<th>全称</th>
					<th>所在地</th>
					<th><span>操作
							<button class="btn btn-default addMachineList">
							<i class="fa fa-plus"></i>添加厂商</button>
						</span></th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="company in companyList">
					<td><input type="checkbox"></td>
					<td>{{company.name}}</td>
					<td>{{company.englishName}}</td>
					<td>{{company.fullName}}</td>
					<td>{{company.location}}</td>
					<td class="companyList-oper">
						<span title="编辑" @click="Edit">
							<i class="fa fa-edit fa-lg"></i>
						</span>
						<span title="删除" @click="Delete(company.name)">
							<i class="fa fa-trash-o fa-lg"></i>
						</span>
						<span title="详情">
							<i class="fa fa-list-alt fa-lg"></i>
						</span>
					</td>
				</tr>
			</tbody>
		</table>
		<paging></paging>
	</div>
</template>

<script>
  	import store from '@/store/store'
  	import paging from '@/components/Paging'
	import deletepop from '@/components/Delete_pop'
	import manufaEdit from '@/components/ManufacturersEdit'

	export default{
		name:'devicManufacturers',
		data(){
			let	companyList=store.obtain('deviceManufacturers');
			return {
				companyList,
				showManufaEdit:false,
				showDeletePop:false,
				editTypeTxt:'机台',
				deletePopTitle:'删除厂商',
				deletePopContent:''
			}
		},
		methods:{
			Delete:function (str) {
				this.showDeletePop=!this.showDeletePop;
				this.deletePopContent=str;
			},
			Edit:function () {
				this.showManufaEdit=!this.showManufaEdit;
			}

		},
		components:{
			paging,
			deletepop,
			"mf-edit":manufaEdit
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