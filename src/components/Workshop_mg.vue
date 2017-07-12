<template>
	<div class="workshopManagement">
		<div class="workshop-plantSelect" >
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
		</div>
		<div class="workshopManagement-table">
			<table class="workshopTable" border="1">
				<thead>
					<tr>
						<th>车间编号</th>
						<th>车间名称</th>
						<th>车间主管</th>
						<th>车间类型</th>
						<th>操作</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="workshop in workshopList">
						<td>
							<span>
								{{workshop.numbering}}
							</span>
						</td>
						<td>
							<span>
								{{workshop.name}}
							</span>
						</td>
						<td>
							<span>
								{{workshop.manager}}
							</span>
						</td>
						<td>
							<span>
								{{workshop.workshopType}}
							</span>
						</td>
						<td>
							<button>查看详情</button>
							<button>机台管理</button>
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
		name:'workshoplist',
		data () {
		  let workshopList=store.obtain('workshopList'),
		  	  plantList=store.obtain('plantList'),
		  	  selectedIndex=0,
		  	  selectedPlant=plantList[selectedIndex];
		  return {
		    workshopList,
		    plantList,
		    selectedPlant,
		    selectedIndex
		  }
		},
		created:function () {
		  console.log(this.workshopList)
		},
		methods:{
			togglePlant:function () {
		  	  this.selectedPlant=this.plantList[this.selectedIndex];
			}
		}
	}
</script>

<style>
	.workshopManagement{
		margin-top:30px;
	}
	.workshopManagement,.workshopManagement-table{
		font-size:20px;
		width:100%;
	}
	.workshop-plantSelect{
		border:solid 3px #DAD2D2;
	}
	.workshopManagement-table th,.workshopManagement-table td{
		padding:15px 30px;
	}
	.workshopTable{
		border:solid 1px #D9D4D4;
		width:100%;
		margin-top: 20px;
	}
</style>