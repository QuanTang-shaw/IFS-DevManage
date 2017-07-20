
	//通用
	function exec_getData(str,op,obj,txt) {
		let url =`http://ifs.top-link.me/ifs/${str}`,
			// obj = { uFactoryUUID: 3},
			req = new TRequest();

		// exec : function (url, op, obj, cb, err)
		req.exec(url,op,obj,
		    // success:
		    function (json) {
		    	console.log(txt);
		        console.log(json);
		    },
		    // error:

		    function (json) {
		        console.log(json);
		    });

		return;
	}

		//工厂详情
	//exec_getData("Handler_Factory_V1.ashx","Factory_GetDetail",{"uFactoryUUID": 3},"工厂详情:");
		//车间详情
	exec_getData("Handler_Workshop_V1.ashx","Workshop_GetDetail",{"uWorkshopUUID":5},"车间详情");
		//机台详情
	exec_getData("Handler_Workstation_V1.ashx","Workstation_GetDetail",{"uWorkstationUUID":2},"机台详情");
		//园区详情
	exec_getData("Handler_Park_V1.ashx","Park_GetDetail",{"uParkUUID":1},"园区详情");
		//设备详情
	exec_getData("Handler_Device_V1.ashx","Device_GetDetail",{"uDeviceUUID":2},"设备详情");
		//设备分类详情
	exec_getData("Handler_DevType_V1.ashx","DevType_GetDetail",{"uDevTypeUUID":2},"设备分类详情");

	exec_getData("Handler_DevCategory_V1.ashx","DevCategory_GetDetail",{"uDevCategoryUUID":2},"设备自定义分类详情");

	exec_getData("Handler_DevModel_V1.ashx","DevModel_GetDetail",{"uDevModelUUID":2},"设备型号详情");

	exec_getData("Handler_Vendor_V1.ashx","Vendor_GetDetail",{"uVendorUUID":2},"设备供应商详情");

	exec_getData("Handler_Device_V1.ashx","Device_GetDetail",{"uDeviceUUID":2},"设备详情");


   //查询列表
	exec_getData("Handler_Factory_V1.ashx","Factory_List",{},"工厂列表:");

	exec_getData("Handler_Workshop_V1.ashx","Workshop_List",{},"车间列表");
		//机台详情
	exec_getData("Handler_Workstation_V1.ashx","Workstation_List",{},"机台列表");
		//园区详情
	exec_getData("Handler_Park_V1.ashx","Park_List",{},"园区列表");
		//设备详情
	exec_getData("Handler_Device_V1.ashx","Device_List",{},"设备列表");
		//设备分类详情
	exec_getData("Handler_DevType_V1.ashx","DevType_List",{},"设备分类列表");

	exec_getData("Handler_DevCategory_V1.ashx","DevCategory_List",{},"设备自定义分类列表");

	exec_getData("Handler_DevModel_V1.ashx","DevModel_List",{},"设备型号列表");

	exec_getData("Handler_Vendor_V1.ashx","Vendor_List",{},"设备供应商列表");

	exec_getData("Handler_Device_V1.ashx","Device_List",{},"设备列表");



	// 修改工厂名称
	exec_getData("Handler_Factory_V1.ashx","Factory_Rename",{uFactoryUUID:4,strFactoryName:"改改"},"设备名称修改");

	exec_getData("Handler_Factory_V1.ashx","Factory_Del",{uFactoryUUID:3},"设备删除");






































	function initStorage(){

		let plantList=[

			  	{
			  		pic:'../pic/plant2.jpg',
			  		name:'A工厂',
			  		address:'广东省深圳市南山区',
			  		Contact:"0755-88888888"
			  	},
			  	{
			  		pic:'../pic/plant3.jpg',
			  		name:'B工厂',
			  		address:'广东省深圳市罗湖区',
			  		Contact:"0755-111111111"
			  	},
			  	{
			  		pic:'../pic/plant1.jpg',
			  		name:'C工厂',
			  		address:'广东省深圳市宝安区西乡宝源路1053号资信达大厦',
			  		Contact:"0755-88888888"
			  	},
			  	{
			  		pic:'../pic/plant3.jpg',
			  		name:'D工厂',
			  		address:'广东省深圳市罗湖区',
			  		Contact:"0755-111111111"
			  	},
			  	{
			  		pic:'../pic/plant3.jpg',
			  		name:'同堕落工业园',
			  		address:'广东省深圳市罗湖区',
			  		Contact:"0755-111111111"
			  	}

			  ];

		let workshopList=[
				{
					numbering:'A001',
					name:"注塑(1)车间",
					manager:"李铁柱",
					workshopType:"注塑成型"
				},
				{
					numbering:'A002',
					name:"注塑(2)车间",
					manager:"张全蛋",
					workshopType:"注塑成型"
				},
				{
					numbering:'A003',
					name:"注塑(3)车间",
					manager:"刘能",
					workshopType:"注塑成型"
				},
				{
					numbering:'A001',
					name:"注塑(1)车间",
					manager:"李铁柱",
					workshopType:"注塑成型"
				},
				{
					numbering:'A002',
					name:"注塑(2)车间",
					manager:"张全蛋",
					workshopType:"注塑成型"
				},
				{
					numbering:'A003',
					name:"注塑(3)车间",
					manager:"刘能",
					workshopType:"注塑成型"
				}
			];

		let machineList=[
				{
					numbering:"A01",
					name:"注塑机台01",
					manager:"张全蛋",
					machineType:"注塑单元"
				},
				{
					numbering:"A01",
					name:"注塑机台01",
					manager:"张全蛋",
					machineType:"注塑单元"
				},
				{
					numbering:"A01",
					name:"注塑机台01",
					manager:"张全蛋",
					machineType:"注塑单元"
				}
			];
		let deviceCategory={
				//送料机
				feeder:{
					Direct:[
						{
							name:'直接式吸料机',
							model:'TAL-6E',
							factory:'拓斯达',
							Quantity:'20pcs',
							pic:'img/topstart/Direct-feeder.jpg'
						},
						{
							name:'直接式吸料机',
							model:'TAL-6E',
							factory:'拓斯达',
							Quantity:'20pcs',
							pic:'img/topstart/Direct-feeder.jpg'
						},
						{
							name:'直接式吸料机',
							model:'TAL-6E',
							factory:'拓斯达',
							Quantity:'20pcs',
							pic:'img/topstart/Direct-feeder.jpg'
						},
						{
							name:'直接式吸料机',
							model:'TAL-6E',
							factory:'拓斯达',
							Quantity:'20pcs',
							pic:'img/topstart/Direct-feeder.jpg'
						},
						{
							name:'直接式吸料机',
							model:'TAL-6E',
							factory:'拓斯达',
							Quantity:'20pcs',
							pic:'img/topstart/Direct-feeder.jpg'
						},
						{
							name:'直接式吸料机',
							model:'TAL-6E',
							factory:'拓斯达',
							Quantity:'20pcs',
							pic:'img/topstart/Direct-feeder.jpg'
						},
						{
							name:'直接式吸料机',
							model:'TAL-6E',
							factory:'拓斯达',
							Quantity:'20pcs',
							pic:'img/topstart/Direct-feeder.jpg'
						}
					],
					Separate:[
						{
							name:'分离式吸料机',
							model:'TAL-700G',
							factory:'拓斯达',
							Quantity:'20pcs',
							pic:'img/topstart/Separate-feeder.jpg'
						}

					],
					OpenSeparation:[
						{
							name:'开放式吸料机',
							model:'TAL-3HP-2',
							factory:'拓斯达',
							Quantity:'20pcs',
							pic:'img/topstart/OpenSep-feeder.jpg'
						}
					],
					cups:[
						{
							name:'料杯',
							model:'ER-6E',
							factory:'拓斯达',
							Quantity:'20pcs',
							pic:'img/topstart/cups-feeder.jpg'
						}
					]
				},
				//模温机 Mold temperature machine
				mtm:{
					waterType:[
						{
							pic:'img/topstart/mtm-water.jpg',
							name:'水式模温机',
							model:'TTW1205',
							Numbering:'1',
							factory:'拓斯达'
						}
					],
					oilType:[
						{
							pic:'img/topstart/mtm-oil.jpg',
							name:'油式模温机',
							model:'TTO2005',
							Numbering:'1',
							factory:'拓斯达'
						}
					],
					//Rapid cooling speed highlight  速冷速热高光
					rcsh:[
						{
							pic:'img/topstart/mtm-rcsh.jpg',
							name:'速冷速热高光模温机',
							model:'TTR400T',
							Numbering:'1',
							factory:'拓斯达'
						}
					],
					dmtm:[
						{
							pic:'img/topstart/mtm-dmtm.jpg',
							name:'双温模温机',
							model:'TTR400T',
							Numbering:'1',
							factory:'拓斯达'
						}
					]
				},
				//干燥机 Dryer
				dryer:{
					Ordinary:[
						{
							pic:'img/topstart/dryer-ord.jpg',
							name:'THD系列普通型乾燥机',
							model:'THD-6U/THD-6UT',
							Numbering:'1',
							factory:'拓斯达'
						}
					],
					// stainlessSteel不锈钢
					thd:[
						{
							pic:'img/topstart/dryer-thd.jpg',
							name:'THD系列不锈钢乾燥机',
							model:'THD-6DT',
							Numbering:'1',
							factory:'拓斯达'
						}
					],
					Box:[
						{
							pic:'img/topstart/dryer-box.jpg',
							name:'TCD系列箱型乾燥机',
							model:'TCD-5',
							Numbering:'1',
							factory:'拓斯达'
						}
					]
				},
				//机械手Manipulator
				Manipulator:{
					//Horizontal single axis   单轴横走式
					Hor_singleAxis:[
						{
							pic:'img/topstart/Manipulator-hor.jpg',
							name:'横走式单轴伺服机械手',
							model:'AD-80',
							Numbering:'1',
							factory:'拓斯达'
						}
					],
					// Crossed three axes     三轴横走式
					Cro_threeAxes:[
						{
							pic:'img/topstart/Manipulator-cro.jpg',
							name:'横走式三轴伺服机械手',
							model:'MD-50',
							Numbering:'1',
							factory:'拓斯达'
						}
					]
				},
				//Measuring machine    计量
				Measuringmachine:{
					Screw:[
						{
							pic:'img/topstart/Measuringmachine-screw.jpg',
							name:'螺杆式色母计量机',
							model:'TSD-3025',
							Numbering:'1',
							factory:'拓斯达'
						}
					],
					weight:[
						{
							pic:'img/topstart/Measuringmachine-weight.jpg',
							name:'重量式计量机',
							model:'TGB-H',
							Numbering:'1',
							factory:'拓斯达'
						}
					],
					Vertical:[
						{
							pic:'img/topstart/Measuringmachine-ver.jpg',
							name:'卧式混色机',
							model:'THM-100',
							Numbering:'1',
							factory:'拓斯达'
						}
					],
					Hor_blending:[
						{
							pic:'img/topstart/Measuringmachine-hor.jpg',
							name:'立式混色机',
							model:'TVM-25',
							Numbering:'1',
							factory:'拓斯达'
						}
					]

				},
				//Crushing and recycling equipment  粉碎回收设备
				CrushingRecycling:{
					Slowmuffler:[
						{
							pic:'img/topstart/Slowmuffler.jpg',
							name:'慢速静音粉碎机',
							model:'TGL-2316SB',
							Numbering:'1',
							factory:'拓斯达'
						}
					],
					strong:[
						{
							pic:'img/topstart/strong.jpg',
							name:'强力型粉碎机TGP系列',
							model:'TGP-2320',
							Numbering:'1',
							factory:'拓斯达'
						}
					],
					Strongmute:[
						{
							pic:'img/topstart/Strongmute.jpg',
							name:'强力静音粉碎机TGP系列',
							model:'TGP-2320Q',
							Numbering:'1',
							factory:'拓斯达'
						}
					]
				},
				// Injection-molding-machine
				imm:{
					//柱塞式
					plunger:[
						{
							name:'柱塞式注塑机',
							model:'',
							factory:'拓斯达',
							Quantity:'20pcs',
							pic:'img/Inj-machine.jpg'
						}

					],
					//往复螺旋式ReciprocatingScrew
					ReScrew :[
						{
							name:'往复螺旋式注塑机',
							model:'',
							factory:'拓斯达',
							Quantity:'20pcs',
							pic:'img/Inj-machine.jpg'
						}
					],
					//螺杆塑化柱塞注射 Screw plastic plunger injection
					sppi:[
						{
							name:'螺杆塑化柱塞注射式注塑机',
							model:'',
							factory:'拓斯达',
							Quantity:'20pcs',
							pic:'img/Inj-machine.jpg'
						}
					]
				}
			}

		let deviceManufacturers=[
			{
				name:"拓斯达",
				englishName:"TOPSTAR",
				fullName:"广东拓斯达科技股份科技有限公司",
				location:"广东东莞",
			},
			{
				name:"富士康",
				englishName:"FOXCON",
				fullName:"广东拓斯达科技股份科技有限公司",
				location:"广东东莞",
			},
			{
				name:"比亚迪",
				englishName:"BYD",
				fullName:"广东拓斯达科技股份科技有限公司",
				location:"广东东莞",
			},
			{
				name:"拓斯达",
				englishName:"TOPSTAR",
				fullName:"广东拓斯达科技股份科技有限公司",
				location:"广东东莞",
			}
		]

		let deviceList=[
				{
					pic:'',
					name:'模温机',
					Brand:'拓斯达',
					serialNumber:'A5425663243',
					model:'M108',
					ownedWorkshop:'B001',
					ownedMachine:'0019'
				},
				{
					pic:'',
					name:'模温机',
					Brand:'拓斯达',
					serialNumber:'A5425663243',
					model:'M108',
					ownedWorkshop:'B001',
					ownedMachine:'0019'
				},
				{
					pic:'',
					name:'模温机',
					Brand:'拓斯达',
					serialNumber:'A5425663243',
					model:'M108',
					ownedWorkshop:'B001',
					ownedMachine:'0019'
				},
				{
					pic:'',
					name:'模温机',
					Brand:'拓斯达',
					serialNumber:'A5425663243',
					model:'M108',
					ownedWorkshop:'B001',
					ownedMachine:'0019'
				},
				{
					pic:'',
					name:'模温机',
					Brand:'拓斯达',
					serialNumber:'A5425663243',
					model:'M108',
					ownedWorkshop:'B001',
					ownedMachine:'0019'
				},
				{
					pic:'',
					name:'模温机',
					Brand:'拓斯达',
					serialNumber:'A5425663243',
					model:'M108',
					ownedWorkshop:'B001',
					ownedMachine:'0019'
				}
			];
		localStorage.clear();
		localStorage.setItem('plantList', JSON.stringify(plantList));
		localStorage.setItem('workshopList', JSON.stringify(workshopList));
		localStorage.setItem('machineList', JSON.stringify(machineList));
		localStorage.setItem('deviceCategory', JSON.stringify(deviceCategory));
		localStorage.setItem('deviceManufacturers', JSON.stringify(deviceManufacturers));
		localStorage.setItem('deviceList', JSON.stringify(deviceList));
	}
	function obtain (dataName) {
		// let data=localStorage.getItem(dataName);
		return JSON.parse(localStorage.getItem(dataName));
	}

	export default{
		initStorage,
		obtain
	}