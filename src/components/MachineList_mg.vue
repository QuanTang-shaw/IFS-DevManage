<template>
	<div class="machineList-mg">
		<!-- <div class="workshopSelect" >
			<div class="row">
			  <div class="col-md-2 selectedPlant-pic">
			    <img src="../pic/plant1.jpg" alt="" width="120">
			  </div>
			  <div class="col-md-6 selectedPlant-info">
			    <p>{{selectedPlant.name}}</p>
			    <p>{{selectedPlant.address}}</p>
			    <p>{{selectedPlant.Contact}}</p>
			  </div>
			  <div class="col-md-4 selectedPlant-oper">
				<label for="">切换厂区:
					<select name="selectPlant" id="" v-model="selectedIndex" @change="togglePlant">
						<option :value="index" v-for="(plant,index) in plantList">{{plant.name}}</option>
					</select>
				</label>
			  </div>
			</div>
		</div> -->
		<div class="machineList">
			<table class="machineList-table" border="1">
				<thead>
					<tr>
						<th><span>机台编号</span></th>
						<th><span>机台名称</span></th>
						<th><span>机台主管</span></th>
						<th><span>机台类型</span></th>
						<th><span>操作</span></th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="machine in machineList">
						<td><span>{{machine.numbering}}</span></td>
						<td><span>{{machine.name}}</span></td>
						<td><span>{{machine.manager}}</span></td>
						<td><span>{{machine.machineType}}</span></td>
						<td>
							<span>
								<button>查看详情</button>
								<button>机台管理</button>
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
	export default{
		name:'machineList',
		data(){
			let	plantList=store.obtain('plantList'),
				workshopList=store.obtain('workshopList'),
				machineList=store.obtain('machineList'),
				plantIndex=0,
				workshopIndex=0,
				selectedPlant=plantList[plantIndex];
			return {
			  workshopList,
			  plantList,
			  machineList,
			  selectedPlant,
			  plantIndex
			}
		},
		created:function () {
			console.log(this.machineList)
		}

	}
</script>


<style>
	.machineList-mg{
		font-size:25px;
	}
	.machineList-mg,.machineList,.machineList-table{
		width: 100%;
	}
	.machineList-table{
		border:solid 1px #DFDFDF;
	}
	.machineList-table th,.machineList-table td{
		padding:20px 15px;
	}
</style>