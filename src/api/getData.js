
import {exec_getData as get} from '@/fetch/fetch'


	export const FactoryListActive = async  function (){
		var result = await get(
	              "Handler_Factory_V1.ashx",
	              "Factory_ListActive",
	              {
		              "nPageIndex": 0,
		              "nPageSize": -1,
		              "uParkUUID": 1,
		              "uFactoryTypeUUID":-1,
	  				  "uFactoryAdminUUID":-1
  				  });
		 return result.obj.objectlist;
	}

	export const  WorkshopListActive = async function(obj){
		var result = await get(
	              "Handler_Workshop_V1.ashx",
	              "Workshop_ListActive",
	              obj);
		 return result.obj.objectlist;
	}


	export const  WorkshopTypeListActive = async function(obj){
		var result = await get(
	              "Handler_WorkshopType_V1.ashx",
	              "WorkshopType_ListActive",
	              obj);
		 return result;
	}


	export const  WorkstationListActive = async function(obj){
		var result = await get(
	              "Handler_Workstation_V1.ashx",
	              "Workstation_ListActive",
	              obj);
		 return result.obj.objectlist;
	}

	export const  WorkstationTypeListActive = async function(obj){
		var result = await get(
	              "Handler_WorkstationType_V1.ashx",
	              "WorkstationType_ListActive",
	              obj);
		 return result.obj.objectlist;
	}

	export const DevTypeListActive = async  function(){
		var result = await get(
	              "Handler_DevType_V1.ashx",
	              "DevType_ListActive",
	              {"nPageIndex": 0,"nPageSize": -1,"uDevTypeParentUUID": 1});
		 return result;
	}

	export const  DevModelListActive = async function(obj){
		var result = await get(
	              "Handler_DevModel_V1.ashx",
	              "DevModel_ListActive",
	              obj);
		 return result.obj.objectlist;
	}


	export const  DeviceListActive = async function(obj){
		var result = await get(
	              "Handler_Device_V1.ashx",
	              "Device_ListActive",
	              obj);
		 return result;
	}


	export const  DevcategoryListActive = async function(obj){
		var result = await get(
	              "Handler_DevCategory_V1.ashx",
	              "DevCategory_ListActive",
	              obj);
		 return result.obj.objectlist;
	}

	export const  VendorListActive = async function(obj){
		var result = await get(
	              "Handler_Vendor_V1.ashx",
	              "Vendor_ListActive",
	              obj);
		 return result;
	}






	//修改工厂
	export const FactoryUpdate =async function (obj) {
		await   get("Handler_Factory_V1.ashx","Factory_Update",obj);
	}
	// 增加工厂
	export const FactoryAdd =async function (obj) {
		await   get("Handler_Factory_V1.ashx","Factory_Add",obj);
	}
	//删除工厂
	export const FactoryInactive =async function (obj) {
		await   get("Handler_Factory_V1.ashx","Factory_Inactive",obj);
	}
	//工厂详情
	export const FactoryDetail =async function (obj) {
		await   get("Handler_Factory_V1.ashx","Factory_GetDetail",obj);
	}



	// 增加车间
	export const WorkshopAdd =async function (obj) {
		await   get("Handler_Workshop_V1.ashx","Workshop_Add",obj);
	}
	//修改车间
	export const WorkshopUpdate =async function (obj) {
		await   get("Handler_Workshop_V1.ashx","Workshop_Update",obj);
	}
	/*// 增加车间
	export const WorkshopAdd =async function (obj) {
		await   get("Handler_Workshop_V1.ashx","Workshop_Add",obj);
	}*/
	//删除车间
	export const WorkshopInactive =async function (obj) {
		await   get("Handler_Workshop_V1.ashx","Workshop_Inactive",obj);
	}
	//车间详情
	export const WorkshopDetail =async function (obj) {
		await   get("Handler_Workshop_V1.ashx","Workshop_GetDetail",obj);
	}







	//修改机台
	export const Workstation_Update =async function (obj) {
		await   get("Handler_Workstation_V1.ashx","Workstation_Update",obj);
	}
	// 增加机台
	export const Workstation_Add =async function (obj) {
		await   get("Handler_Workstation_V1.ashx","Workstation_Add",obj);
	}
	//删除机台
	export const Workstation_Inactive =async function (obj) {
		await   get("Handler_Workstation_V1.ashx","Workstation_Inactive",obj);
	}
	//机台详情
	export const Workstation_Detail =async function (obj) {
		await   get("Handler_Workstation_V1.ashx","Workstation_GetDetail",obj);
	}









	//修改厂商
	export const Vendor_Update =async function (obj) {
		await   get("Handler_Vendor_V1.ashx","Vendor_Update",obj);
	}
	// 增加厂商
	export const Vendor_Add =async function (obj) {
		await   get("Handler_Vendor_V1.ashx","Vendor_Add",obj);
	}
	//删除厂商
	export const Vendor_Inactive =async function (obj) {
		await   get("Handler_Vendor_V1.ashx","Vendor_Inactive",obj);
	}
	//厂商详情
	export const Vendor_Detail =async function (obj) {
		await   get("Handler_Vendor_V1.ashx","Vendor_GetDetail",obj);
	}


	//修改设备
	export const Device_Update =async function (obj) {
		await   get("Handler_Device_V1.ashx","Device_Update",obj);
	}
	// 增加设备
	export const Device_Add =async function (obj) {
		await   get("Handler_Device_V1.ashx","Device_Add",obj);
	}
	//删除设备
	export const Device_Inactive =async function (obj) {
		await   get("Handler_Device_V1.ashx","Device_Inactive",obj);
	}
	//设备详情
	export const Device_Detail =async function (obj) {
		await   get("Handler_Device_V1.ashx","Device_GetDetail",obj);
	}





	export const  Devcategory_Update = async function(obj){
		await get("Handler_DevCategory_V1.ashx","DevCategory_Update",obj);
	}
	export const  Devcategory_Add = async function(obj){
		await get("Handler_DevCategory_V1.ashx","DevCategory_Add",obj);
	}
	export const  Devcategory_Inactive = async function(obj){
		await get("Handler_DevCategory_V1.ashx","DevCategory_Inactive",obj);
	}
