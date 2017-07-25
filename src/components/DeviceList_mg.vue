<template>
	<div class="deviceList-mg">
		<div class="Filtering">
			<div class="row">
				<div class="col-md-10">
					<!-- <label for="">
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
					</label> -->
					<div>
						<label>安装位置
							<div class="btn-group">
							  <button type="button" class="btn btn-default">A厂区</button>
							  <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
							    <span class="caret"></span>
							    <span class="sr-only">Toggle Dropdown</span>
							  </button>
							  <ul class="dropdown-menu">
							  	<li v-for="(plant,index) in plantList"><a >{{plant.name}}</a></li>
							    <!-- <li><a href="#">Action</a></li>
							    <li><a href="#">Another action</a></li>
							    <li><a href="#">Something else here</a></li> -->
							    <li role="separator" class="divider"></li>
							    <li><a href="#">Separated link</a></li>
							  </ul>
							</div>
							<div class="btn-group">
							  <button type="button" class="btn btn-default">B001车间</button>
							  <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
							    <span class="caret"></span>
							    <span class="sr-only">Toggle Dropdown</span>
							  </button>
							  <ul class="dropdown-menu">
							  	<li v-for="(plant,index) in plantList"><a >{{plant.name}}</a></li>
							    <!-- <li><a href="#">Action</a></li>
							    <li><a href="#">Another action</a></li>
							    <li><a href="#">Something else here</a></li> -->
							    <li role="separator" class="divider"></li>
							    <li><a href="#">Separated link</a></li>
							  </ul>
							</div>
							<div class="btn-group">
							  <button type="button" class="btn btn-default">机台0019</button>
							  <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
							    <span class="caret"></span>
							    <span class="sr-only">Toggle Dropdown</span>
							  </button>
							  <ul class="dropdown-menu">
							  	<li v-for="(plant,index) in plantList"><a >{{plant.name}}</a></li>
							    <!-- <li><a href="#">Action</a></li>
							    <li><a href="#">Another action</a></li>
							    <li><a href="#">Something else here</a></li> -->
							    <li role="separator" class="divider"></li>
							    <li><a href="#">Separated link</a></li>
							  </ul>
							</div>
						</label>
					</div>
					<div>
						<label>产品型号
							<div class="btn-group">
							  <button type="button" class="btn btn-default">所有类型</button>
							  <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
							    <span class="caret"></span>
							    <span class="sr-only">Toggle Dropdown</span>
							  </button>
							  <ul class="dropdown-menu">
							  	<li v-for="(plant,index) in plantList"><a >{{plant.name}}</a></li>
							    <!-- <li><a href="#">Action</a></li>
							    <li><a href="#">Another action</a></li>
							    <li><a href="#">Something else here</a></li> -->
							    <li role="separator" class="divider"></li>
							    <li><a href="#">Separated link</a></li>
							  </ul>
							</div>
							<div class="btn-group">
							  <button type="button" class="btn btn-default">拓斯达</button>
							  <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
							    <span class="caret"></span>
							    <span class="sr-only">Toggle Dropdown</span>
							  </button>
							  <ul class="dropdown-menu">
							  	<li v-for="(plant,index) in plantList"><a >{{plant.name}}</a></li>
							    <!-- <li><a href="#">Action</a></li>
							    <li><a href="#">Another action</a></li>
							    <li><a href="#">Something else here</a></li> -->
							    <li role="separator" class="divider"></li>
							    <li><a href="#">Separated link</a></li>
							  </ul>
							</div>
							<div class="btn-group">
							  <button type="button" class="btn btn-default">TTW1210A</button>
							  <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
							    <span class="caret"></span>
							    <span class="sr-only">Toggle Dropdown</span>
							  </button>
							  <ul class="dropdown-menu">
							  	<li v-for="(plant,index) in plantList"><a >{{plant.name}}</a></li>
							    <!-- <li><a href="#">Action</a></li>
							    <li><a href="#">Another action</a></li>
							    <li><a href="#">Something else here</a></li> -->
							    <li role="separator" class="divider"></li>
							    <li><a href="#">Separated link</a></li>
							  </ul>
							</div>
						</label>
					</div>
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
						<div class="device-pic col-md-1">
							<img src="../assets/topstart/mtm-water.jpg" alt="设备图片">
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
								<i class="fa fa-edit fa-lg"></i>
							</span>
							<span>
								<i class="fa fa-trash-o fa-lg"></i>
							</span>
							<span>
								<i class="fa fa-list-alt fa-lg"></i>
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
	import fetch from '@/fetch/fetch'

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
		methods:{
			togglePlant:function () {
				/* body... */
				this.selectedPlant=this.plantList[this.plantIndex];
			}
		},
		beforeCreate:function () {
			fetch
			      .Device_ListActive()
			      .then(data=>console.log(data));
		},
	}
</script>

<style>
	.Filtering{
		border:solid 1px #CFCCCC;
		font-size:.7em;
		padding: 15px 15px;
	}
	.Filtering>select option{
		padding:35px 10px;
	}
	.deviceList{
		/*width: 100%;*/
		font-size:.7em;
	}
	.deviceList ul{
		padding:20px 0;
	}
	.deviceList li{
		padding:10px;
		position:relative;
		margin: 0;
		list-style: none;
		border:solid 1px #E7E6E6;
		margin-bottom:10px;
	}
	.device{
		padding: 0;
	}
	.deviceInfo{
		margin: 0;
	}
	.deviceInfo,.deviceInfo>div{
		display: flex;
	}
	.device-pic{padding: 0;}
	.device-pic img{
		/*position: absolute;*/
		/*top:100%;*/
		/*transform: translateY(-50%);*/
		/*border:solid 1px;*/
		width:100%;
		max-width:90px;
		max-height:90px;
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