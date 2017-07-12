
	function initStorage(){

		let plantList=[
			  	{
			  		pic:'../pic/plant1.jpg',
			  		name:'***高新技术工业产业园',
			  		address:'广东省深圳市宝安区西乡宝源路1053号资信达大厦',
			  		Contact:"0755-88888888"
			  	},
			  	{
			  		pic:'../pic/plant2.jpg',
			  		name:'同富裕工业园',
			  		address:'广东省深圳市南山区',
			  		Contact:"0755-88888888"
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
			mtm:{
				//Low temperature water machine
				ltwm:[
						{
							Manufacturers:'拓斯达',
							model:'TTW1210',
							name:"低温水机",
							number:"20pcs",
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
			}
		]

		let deviceList=[
				{
					pic:'',
					name:'模温机',
					Brand:'拓斯达',
					serialNumber:'A5425663243',
					model:'M108',
					ownedWorkshop:'B001车间',
					ownedMachine:'机台0019'
				},
				{
					pic:'',
					name:'模温机',
					Brand:'拓斯达',
					serialNumber:'A5425663243',
					model:'M108',
					ownedWorkshop:'B001车间',
					ownedMachine:'机台0019'
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