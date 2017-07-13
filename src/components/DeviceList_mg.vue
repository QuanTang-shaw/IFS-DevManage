<template>
	<div class="deviceList-mg">
		<div class="Filtering">
			<div class="row">
				<div class="col-md-10">
					<label for="">
						安装位置
						<select name="" id="">
							<option value="">厂区1</option>
							<option value="">厂区2</option>
							<option value="">厂区3</option>
							<option value="">厂区4</option>
							<option value="">厂区5</option>
						</select>
						<select name="" id="">
							<option value="">车间1</option>
							<option value="">车间2</option>
							<option value="">车间3</option>
							<option value="">车间4</option>
							<option value="">车间5</option>
						</select>
						<select name="" id="">
							<option value="">机台1</option>
							<option value="">机台2</option>
							<option value="">机台3</option>
							<option value="">机台4</option>
							<option value="">机台5</option>
						</select>
					</label></br>
					<label for="">
						产品型号
						<select name="" id="">
							<option value="">送料机</option>
							<option value="">模温机</option>
							<option value="">注塑机</option>
							<option value="">干燥机</option>
							<option value="">机械手</option>
						</select>
						<select name="" id="">
							<option value="">拓斯达</option>
							<option value="">拓斯达</option>
							<option value="">拓斯达</option>
							<option value="">拓斯达</option>
							<option value="">拓斯达</option>
						</select>
						<select name="" id="">
							<option value="">TTW1210A</option>
							<option value="">TTW1210A</option>
							<option value="">TTW1210A</option>
							<option value="">TTW1210A</option>
							<option value="">TTW1210A</option>
						</select>
					</label>
				</div>
				<div class="col-md-2">
					<button class="btn btn-default" type="submit">添加设备</button>
				</div>
			</div>
		</div>
		<div class="deviceList">
			<ul>
				<li class="device" v-for="device in deviceList">
					<div class="deviceInfo row">
						<div class="device-pic col-md-2">
							<img src="../assets/topstart/mtm-water.jpg" alt="" >
						</div>
						<div class="specification col-md-3">
							<p>{{device.name}}</p>
							<p><span>品牌:</span>{{device.Brand}}</p>
							<p>序列号: <strong></strong> {{device.serialNumber}}</p>
						</div>
						<div class="model col-md-5">
							<strong>{{device.model}}</strong>
							<span><strong>{{device.ownedWorkshop}}</strong>车间</span>
							<span>机台<strong>{{device.ownedMachine}}</strong></span>
						</div>
						<div class="operating col-md-2">
							<span>
								<i class="fa fa-edit"></i>
							</span>
							<span>
								<i class="fa fa-trash-o"></i>
							</span>
							<span>
								<i class="fa fa-list-alt"></i>
							</span>
						</div>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
  	import store from '@/store/store'
	export default{
		name:'machineList',
		data(){
			let	deviceList=store.obtain('deviceList'),
				plantList=store.obtain('plantList'),
				workshopList=store.obtain('workshopList'),
				machineList=store.obtain('machineList'),
				plantIndex=0,
				workshopIndex=0,
				selectedPlant=plantList[plantIndex];
			return {
				deviceList,
				workshopList,
				plantList,
				machineList,
				selectedPlant,
				plantIndex
			}
		},
		created:function () {
			console.log(this.machineList)
		},
		methods:{
			togglePlant:function () {
				/* body... */
				this.selectedPlant=this.plantList[this.plantIndex];
			}
		}
	}
</script>

<style>
	.Filtering{
		border:solid 3px #CFCCCC;
		font-size:20px;
		padding: 25px 15px;
	}
	.Filtering>select option{
		padding:35px 10px;
	}
	.deviceList{
		/*width: 100%;*/
		font-size:25px;
	}
	.deviceList ul{
		padding:20px 0;
	}
	.deviceList li{
		padding:10px 0;
		position:relative;
		margin: 0;
		list-style: none;
		border:solid 1px #E7E6E6;
		margin-bottom:10px;
	}
	.deviceInfo{
		margin: 0;
	}
	.deviceInfo,.deviceInfo>div{
		display: flex;
	}
	.device-pic img{
		/*position: absolute;*/
		/*top:100%;*/
		/*transform: translateY(-50%);*/
		/*border:solid 1px;*/
		width:100%;
		max-width:120px;
		max-height:120px;
	}
	.device-pic{
		justify-content: center;
		align-items: center;
	}
	.specification{
		/*border:solid 1px;*/
		flex-direction: column;
		justify-content:space-between;
		align-items:flex-start;
	}
	.model{
		/*border:solid 1px;*/
		justify-content:space-between;
		align-items:center;
	}
	.operating{
		/*border:solid 1px;*/
		justify-content:space-between;
		align-items:center;
	}
	p{margin: 0;}
</style>