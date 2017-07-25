
	var exec_getData=function (str,op,obj) {

		var promise=new Promise(function (resolve,reject) {
			var url =`http://ifs.top-link.me/ifs/${str}`,
				req = new TRequest();
			// obj = { uFactoryUUID: 3},
			// exec : function (url, op, obj, cb, err)
			// console.log(req)
			req.exec(url,op,obj,
			    // success:
			    function (json) {
			    	resolve(json);
			    },
			    // error:
			    function (json) {
			        reject(json);
			    });
		});
		return promise;
	}




	async  function Factory_ListActive(){
		var result = await exec_getData(
	              "Handler_Factory_V1.ashx",
	              "Factory_ListActive",
	              {"nPageIndex": 0,"nPageSize": -1,"uParkUUID": -1});
		 return result;
	}

	async  function Workshop_ListActive(){
		var result = await exec_getData(
	              "Handler_Workshop_V1.ashx",
	              "Workshop_ListActive",
	              {"nPageIndex": 0,"nPageSize": -1,"uFactoryUUID": 1});
		 return result;
	}

	async  function Workstation_ListActive(){
		var result = await exec_getData(
	              "Handler_Workstation_V1.ashx",
	              "Workstation_ListActive",
	              {"nPageIndex": 0,"nPageSize": -1,"uPLineUUID": 1});
		 return result;
	}

	async  function DevType_ListActive(){
		var result = await exec_getData(
	              "Handler_DevType_V1.ashx",
	              "DevType_List",
	              {"nPageIndex": 0,"nPageSize": -1,"uDevTypeParentUUID": 1});
		 return result;
	}

	async  function DevModel_ListActive(){
		var result = await exec_getData(
	              "Handler_DevModel_V1.ashx",
	              "DevModel_List",
	              {"nPageIndex": 0,"nPageSize": -1,"uDevTypeUUID": 1});
		 return result;
	}


	async  function Device_ListActive(){
		var result = await exec_getData(
	              "Handler_Device_V1.ashx",
	              "Device_List",
	              {"nPageIndex": 0,"nPageSize": -1,"uDevModelUUID": 1});
		 return result;
	}


	async  function Devcategory_ListActive(){
		var result = await exec_getData(
	              "Handler_Devcategory_V1.ashx",
	              "Devcategory_List",
	              {"nPageIndex": 0,"nPageSize": -1,"uDevCategoryParentUUID": 1});
		 return result;
	}

	async  function Vendor_ListActive(){
		var result = await exec_getData(
	              "Handler_Vendor_V1.ashx",
	              "Vendor_List",
	              {"nPageIndex": 0,"nPageSize": -1,"uUserUUID": 1});
		 return result;
	}






	//修改工厂
	async  function Factory_Update (obj) {
		await   exec_getData("Handler_Factory_V1.ashx","Factory_Update",obj);
	}
	// 增加工厂
	async  function Factory_Add (obj) {
		await   exec_getData("Handler_Factory_V1.ashx","Factory_Add",obj);
	}
	//删除工厂
	async  function Factory_Inactive (obj) {
		await   exec_getData("Handler_Factory_V1.ashx","Factory_Inactive",obj);
	}
	//工厂详情
	async  function Factory_Detail (obj) {
		await   exec_getData("Handler_Factory_V1.ashx","Factory_GetDetail",obj);
	}



	// 增加车间
	async  function Workshop_Add (obj) {
		await   exec_getData("Handler_Workshop_V1.ashx","Workshop_Add",obj);
	}
	//修改车间
	async  function Workshop_Update (obj) {
		await   exec_getData("Handler_Workshop_V1.ashx","Workshop_Update",obj);
	}
	// 增加车间
	async  function Workshop_Add (obj) {
		await   exec_getData("Handler_Workshop_V1.ashx","Workshop_Add",obj);
	}
	//删除车间
	async  function Workshop_Inactive (obj) {
		await   exec_getData("Handler_Workshop_V1.ashx","Workshop_Inactive",obj);
	}
	//车间详情
	async  function Workshop_Detail (obj) {
		await   exec_getData("Handler_Workshop_V1.ashx","Workshop_GetDetail",obj);
	}







	//修改机台
	async  function Workstation_Update (obj) {
		await   exec_getData("Handler_Workstation_V1.ashx","Workstation_Update",obj);
	}
	// 增加机台
	async  function Workstation_Add (obj) {
		await   exec_getData("Handler_Workstation_V1.ashx","Workstation_Add",obj);
	}
	//删除机台
	async  function Workstation_Inactive (obj) {
		await   exec_getData("Handler_Workstation_V1.ashx","Workstation_Inactive",obj);
	}
	//机台详情
	async  function Workstation_Detail (obj) {
		await   exec_getData("Handler_Workstation_V1.ashx","Workstation_GetDetail",obj);
	}




	export default{
		exec_getData,

		Factory_ListActive,
		Workshop_ListActive,
		Workstation_ListActive,
		DevType_ListActive,
		Device_ListActive,
		Devcategory_ListActive,
		Vendor_ListActive,


		Factory_Update,
		Factory_Add,
		Factory_Inactive,
		Factory_Detail,

		Workshop_Update,
		Workshop_Add,
		Workshop_Inactive,
		Workshop_Detail,

		Workstation_Update,
		Workstation_Add,
		Workstation_Inactive,
		Workstation_Detail,
	}