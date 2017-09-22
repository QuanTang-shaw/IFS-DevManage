<template>
	<div class="deviceEdit">
	  <div class="deviceEditCover">
	    <div class="deviceEditPop">
	      <header class="deviceEdit-header">
	        <span class="poptitle">设备编辑</span>
	        <span class="deviceEditclose" @click='closePop'>
	          <i class="fa fa-close fa-sm" title="关闭"></i>
	        </span>
	      </header>
	      <section class="deviceEdit-section">
	        <form class="form-horizontal">
	          <div class="form-group">
	            <label for="inputEmail3" class="col-sm-2 control-label">名称</label>
	            <div class="col-sm-10">
	              <input type="text" class="form-control" id="inputEmail3" placeholder="请输入工厂名称"  v-model="editDevice.strDeviceName">
	            </div>
	          </div>
	          <div class="form-group">
	            <label for="inputPassword3" class="col-sm-2 control-label">编号</label>
	            <div class="col-sm-10">
	              <input type="text" class="form-control" id="inputPassword3" placeholder="请输入工厂地址" v-model="editDevice.strDeviceID">
	            </div>
	          </div>
	          <div class="form-group">
	            <label for="inputPassword3" class="col-sm-2 control-label">序列号</label>
	            <div class="col-sm-10">
	              <input type="text" class="form-control" id="inputPassword3" placeholder="请输入工厂地址" v-model="editDevice.strDeviceSN">
	            </div>
	          </div>
	          <div class="form-group">
	            <label for="inputPassword3" class="col-sm-2 control-label">设备位置</label>
	            <div class="col-sm-10">
					<div class="btn-group Multistage-menu-wrap">
					  <button type="button" class="btn btn-default dropdown-toggle Multistage-menu-input" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
					    {{currentFactory.strFactoryName}}<span>/</span>
					    {{currentWorkshop.strWorkshopName}}<span>/</span>
					    {{currentMachine.strWorkstationName}}
					    <span class="caret"></span>
					  </button>
					  <div class="Multistage-menu" @click="menuClick">
						  <ul class="Multistage-menus" >
						    <li class="menu-item menu-item-icon" v-for="(factory,$index) in factoryList" @click.stop="toggleFactory(factory,$index)" :class="{isActive:activeClassNum.FTNum==$index}">{{factory.strFactoryName}} </li>
						  </ul>
						  <ul class="Multistage-menus" >
						    <li class="menu-item menu-item-icon" v-for="(workshop,$index) in workshopList" @click.stop="toggleWorkshop(workshop,$index)" :class="{isActive:activeClassNum.WSNum==$index}">{{workshop.strWorkshopName}}</li>
						  </ul>
						  <ul class="Multistage-menus">
						    <li class="menu-item" v-for="(workstation,$index) in workstationList" @click="toggleMachine(workstation,$index)" :class="{isActive:activeClassNum.MHNum==$index}">{{workstation.strWorkstationName}}</li>
						  </ul>
					  </div>
					</div>
	            </div>
	          </div>
	          <div class="form-group" v-if="isAddDevice">
	            <label for="inputPassword3" class="col-sm-2 control-label">设备类别</label>
	            <div class="col-sm-10">
		            <div class="btn-group Multistage-menu-wrap">
		              <button type="button" class="btn btn-default dropdown-toggle Multistage-menu-input" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
		                {{curParCategory.strDevCategoryName}}<span>/</span>
		                {{curSubCategory.strDevCategoryName}}
		                <span class="caret"></span>
		              </button>
		              <div class="Multistage-menu">
		            	  <ul class="Multistage-menus">
		            	    <li class="menu-item menu-item-icon" v-for="(ParentCategory,$index) in DevParentCategoryList" @click.stop="toggleParCategory(ParentCategory,$index)" :class="{isActive:activeClassNum.ParCategoryNum==$index}">{{ParentCategory.strDevCategoryName}}</li>
		            	  </ul>
		            	  <ul class="Multistage-menus" >
		            	    <li class="menu-item " v-for="(SubCategory,$index) in DevSubCategoryList" @click="toggleSubCagegory(SubCategory,$index)" :class="{isActive:activeClassNum.SubCategoryNum==$index}">{{SubCategory.strDevCategoryName}}</li>
		            	  </ul>
		              </div>
		            </div>
	            </div>
	          </div>
	          <div class="form-group" v-if="isAddDevice">
	            <label for="inputPassword3" class="col-sm-2 control-label">设备型号</label>
	            <div class="col-sm-10">
		            <div class="btn-group Multistage-menu-wrap">
		              <button type="button" class="btn btn-default dropdown-toggle Multistage-menu-input" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
		                {{curDevVendor.strVendorShortName}}<span>/</span>
		                {{curDevVendorModel.strDevModelName}}
		                <span class="caret"></span>
		              </button>
		              <div class="Multistage-menu">
		            	  <ul class="Multistage-menus" >
		            	    <li class="menu-item menu-item-icon" v-for="(Vendor,$index) in DevVendorList" @click.stop="toggleVendor(Vendor,$index)" :class="{isActive:activeClassNum.VendorNum==$index}">{{Vendor.strVendorShortName}} </li>
		            	  </ul>
		            	  <ul class="Multistage-menus">
		            	    <li class="menu-item" v-for="(VendorModel,$index) in DevVendorModelList" @click="toggleModel(VendorModel,$index)" :class="{isActive:activeClassNum.VendorModelNum==$index}">{{VendorModel.strDevModelName}}</li>
		            	  </ul>
		              </div>
		            </div>
	            </div>
	          </div>
	          <div class="form-group" >
	            <label for="inputPassword3" class="col-sm-2 control-label">设备图片</label>
	            <div class="col-sm-10">
	            	<div class="fileUpload">
		              <img src="../assets/topstart/mtm-water.jpg" alt="图片" @click="upFile">
		              <input type="file" style="display:none;">
	            	</div>
	            </div>
	          </div>
	        </form>
	      </section>
	      <footer class="deviceEdit-footer">
	        <div class="deviceEdit-btn">
	          <button type="button" class="btn btn-default" @click="cancel">取消</button>
	          <button type="button" class="btn btn-primary" @click="confirm">确认</button>
	        </div>
	      </footer>
	    </div>
	  </div>
	</div>
</template>

<script>
    import fetch from '@/fetch/fetch'
    import {
    	FactoryListActive,
    	Workshop_ListActive,
    	WorkstationListActive,
    	DevModelListActive,
    	DevcategoryListActive
    } from '@/api/getData'

	export default{
		name:'deviceEdit',
		props:['editDevice','isAddDevice','selectedFactory','selectedWorkshop','selectedMachine'],
		data(){
			return{
				DeviceName:'',
				DeviceAddress:'',
				currentFactory:this.selectedFactory,
				currentWorkshop:this.selectedWorkshop,
				currentMachine:this.selectedMachine,
				factoryList:[],
				workshopList:[],
				workstationList:[],
				workshopListAll:[],
				workstationListAll:[],
				DevParentCategoryList:[],
				DevSubCategoryList:[],
				DevModelList:[],
				DevVendorModelList:[],
				DevVendorList:[],
				curParCategory:{},
				curSubCategory:{},
				curDevVendor:{},
				curDevVendorModel:{},
				activeClassNum:{
					FTNum:0,
					WSNum:0,
					MHNum:0,
					ParCategoryNum:0,
					SubCategoryNum:0,
					VendorNum:0,
					VendorModelNum:0
				}
			}
		},
		methods:{
			toggleFactory:function (obj,index) {
				this.currentFactory=obj;
				this.activeClassNum.FTNum=index;
				// this.activeClassNum.WSNum=0;
				//更新车间列表
				fetch
			        .Workshop_ListActive({
			        	"nPageIndex": 0,
			            "nPageSize": -1,
			            "uFactoryUUID":this.currentFactory.uFactoryUUID,
			            "uWorkshopTypeUUID":-1,
		  				"uWorkshopAdminUUID":-1
			        })
			        .then(data=>{
			        	this.workshopList=data.obj.objectlist;
			        	this.currentWorkshop=this.workshopList[0];
					    this.toggleWorkshop();
			        },()=>alert('没有查到车间!'));
			},
			toggleWorkshop:function (obj,index) {
				this.activeClassNum.WSNum=index;
				if(obj)  this.currentWorkshop=obj;
				// this.showPaging=false;
				fetch
			        .Workstation_ListActive({
		              	"nPageIndex": 0,
		              	"nPageSize":-1,
		              	"uPLineUUID":this.currentWorkshop.uWorkshopUUID,
		              	"uWorkstationTypeUUID":-1,
		    			"uWorkstationAdminUUID":-1,
		              })
			        .then(data=>{
			        	console.log(this.workstationList=data.obj.objectlist);
			        	this.currentMachine=this.workstationList[0];
			        	this.toggleMachine();
			        	// console.log(data)
			        	// this.totalCount=Math.ceil(data.obj.totalcount/this.items);
			        	// this.showPaging=true;
			        });
			},
			toggleMachine:function (obj,index) {
				this.activeClassNum.MHNum=index;
				if(obj) {
					this.currentMachine=obj;
					console.log($(".Multistage-menu-wrap").removeClass('open'))
				}
			    /*this.showPaging=false;
				fetch
			      .Device_ListActive({
			      	"nPageIndex": 0,
			      	"nPageSize":5,
			      	"uDevModelUUID":-1,
			      	"uWorkstationUUID":this.currentMachine.uWorkstationUUID
			      })
			      .then(data=>{
			      	console.log(this.deviceList=data.obj.objectlist);
			      	// console.log(data);
			      	this.totalCount=Math.ceil(data.obj.totalcount/this.items);
			      	this.showPaging=true;
			      });*/
			},
			async toggleParCategory (obj,index){
				// console.log(obj);
				this.curParCategory=obj;
				this.activeClassNum.ParCategoryNum=index;
				this.DevSubCategoryList=await DevcategoryListActive({
                	"nPageIndex": 0,
                	"nPageSize": -1,
                	"uDevCategoryParentUUID":this.curParCategory.uDevCategoryUUID,
                	"uUserUUID":-1});
			},
			toggleSubCagegory(obj,index){
				let self=this;
				this.curSubCategory=obj;
				this.activeClassNum.SubCategoryNum=index;
				//设备型号列表
		    	DevModelListActive({
		    				"nPageIndex": 0,
		    				"nPageSize": -1,
		    				"uDevTypeUUID": -1,
							"uDevCategoryUUID":this.curSubCategory.uDevCategoryUUID,
							"uVendorUUID":-1,
							"uUserUUID":-1,
		    			})
		    			.then(data=>{
		    				self.DevModelList=data.obj.objectlist;
		    				let hash={};
	    		    		self.DevVendorList = self.DevModelList.reduce(function (item,ele) {
	    		    			hash[ele.uVendorUUID] ? '' : hash[ele.uVendorUUID] = true && item.push(ele);
	    		    			return item;
	    		    		},[]);
	    		    		self.curDevVendor=self.DevVendorList[0];
	    		    		self.DevVendorModelList=self.DevModelList.filter(function(ele,index) {
	    		    			if(ele.uVendorUUID==self.curDevVendor.uVendorUUID){
	    		    				return ele
	    		    			}
	    		    		});
	    		    		self.curDevVendorModel=self.DevVendorModelList[0];
		    			});
			},
			toggleVendor(obj,index){
				let self=this;
				// console.log(obj);
				this.curDevVendor=obj;
				this.activeClassNum.VendorNum=index;
				this.DevVendorModelList=this.DevModelList.filter(function(ele,index) {
					if(ele.uVendorUUID==self.curDevVendor.uVendorUUID){
						return ele
					}
				});
			},
			toggleModel(obj,index){
				console.log(obj);
				this.curDevVendorModel=obj;
				this.activeClassNum.VendorModelNum=index;
			},
			closePop:function () {
				this.$emit('submit','close');
			},
			cancel:function () {
				this.$emit('submit','cancel');
			},
			confirm:function () {
				if (this.isAddDevice){
					fetch.Device_Add({
						uDevModelUUID:this.curDevVendorModel.uDevModelUUID,
						uWorkstationUUID:this.currentMachine.uWorkstationUUID,
						strDeviceName:this.editDevice.strDeviceName,
						strDeviceID:this.editDevice.strDeviceID,
						strDeviceSN:this.editDevice.strDeviceSN,
					}).then(()=>this.$emit('submit','confirm'));
				}
				else{
					fetch.Device_Update({
						uDeviceUUID: this.editDevice.uDeviceUUID,
						uDevModelUUID:this.editDevice.uDevModelUUID,
						uWorkstationUUID:this.currentMachine.uWorkstationUUID,
						strDeviceName:this.editDevice.strDeviceName,
						strDeviceID:this.editDevice.strDeviceID,
						strDeviceSN:this.editDevice.strDeviceSN,
						strDeviceDesc:'',
						strDeviceNote:''
					}).then(()=>this.$emit('submit','confirm'));
				}
			},
			upFile:function () {
				event.target.nextSibling.nextSibling.click();
			},
			menuClick:function () {
				// event.cancelBubble=true;
				// console.log(this.activeClassNum.MHNum)
			}
		},
		beforeCreate:async function () {
			let self=this;
			//工厂列表
			this.factoryList=await FactoryListActive();

		  	this.workshopList=await Workshop_ListActive({
			        	"nPageIndex": 0,
			            "nPageSize": -1,
			            "uFactoryUUID":this.selectedFactory.uFactoryUUID,
			            "uWorkshopTypeUUID":-1,
		  				"uWorkshopAdminUUID":-1
	        		})

			this.workstationList=await WorkstationListActive({
		              	"nPageIndex": 0,
		              	"nPageSize": -1,
		              	"uPLineUUID": this.selectedWorkshop.uWorkshopUUID,
		              	"uWorkstationTypeUUID":-1,
		    			"uWorkstationAdminUUID":-1,
		              })

			// 设备父类
	        this.DevParentCategoryList=await DevcategoryListActive({
	              	"nPageIndex": 0,
	              	"nPageSize": -1,
	              	"uDevCategoryParentUUID":0,
	              	"uUserUUID":-1});
	        console.log(this.DevParentCategoryList);
          	this.curParCategory=this.DevParentCategoryList[0];
          	//设备子类
	        this.DevSubCategoryList=await DevcategoryListActive({
                	"nPageIndex": 0,
                	"nPageSize": -1,
                	"uDevCategoryParentUUID":this.curParCategory.uDevCategoryUUID,
                	"uUserUUID":-1});

	        this.curSubCategory=this.DevSubCategoryList[0];
	        //设备型号列表
	    	DevModelListActive({
	    				"nPageIndex": 0,
	    				"nPageSize": -1,
	    				"uDevTypeUUID": -1,
						"uDevCategoryUUID":this.curSubCategory.uDevCategoryUUID,
						"uVendorUUID":-1,
						"uUserUUID":-1,
	    			})
	    			.then(data=>{
	    				self.DevModelList=data.obj.objectlist;
	    				let hash={};
    		    		self.DevVendorList = self.DevModelList.reduce(function (item,ele) {
    		    			hash[ele.uVendorUUID] ? '' : hash[ele.uVendorUUID] = true && item.push(ele);
    		    			return item;
    		    		},[]);
    		    		self.curDevVendor=self.DevVendorList[0];
    		    		self.DevVendorModelList=self.DevModelList.filter(function(ele,index) {
    		    			if(ele.uVendorUUID=='1'){
    		    				return ele
    		    			}
    		    		});
    		    		self.curDevVendorModel=self.DevVendorModelList[0];
	    			});
		},
		created:function () {
			console.log(this.editDevice);
			if(this.isAddDevice){
				this.curDevVendorModel.uDevModelUUID=this.editDevice.uDevModelUUID;
			}
			let self=this;
			setTimeout(function () {
				self.activeClassNum.FTNum=self.factoryList.findIndex(function (ele,index) {
					return ele.uFactoryUUID==self.currentFactory.uFactoryUUID;
				});
				self.activeClassNum.WSNum=self.workshopList.findIndex(function (ele,index) {
					return ele.uWorkshopUUID==self.currentWorkshop.uWorkshopUUID;
				});
				self.activeClassNum.MHNum=self.workstationList.findIndex(function (ele,index) {
					return ele.uWorkstationUUID==self.currentMachine.uWorkstationUUID;
				});
			},500)
		}
	}
</script>
<style>
	.deviceEdit{
		font-size:.75em;
	}
	.deviceEditCover{
	  position: fixed;
	  left: 0;
	  right: 0;
	  top: 0;
	  bottom: 0;
	  background-color: rgba(43, 43, 43, 0.41);
	  z-index: 100;
	}
	.deviceEditPop{
	  position:absolute;
	  padding:10px 8px;
	  width:50%;
	  background-color: #FFFFFF;
	  top:15%;
	  left:50%;
	  transform:translateX(-50%);
	}
	.deviceEditclose{
		cursor: pointer;
		float:right;
	}
	.deviceEdit-section{
		font-size:0.9em;
		padding:15px;
	}
	.deviceEdit-section label{
		/*color:#8C8686;*/
		font-weight:initial;
	}
	.poptitle{
		font-weight:bolder;
	}
	.deviceEdit-btn{
	  display: inline-block;
	  float: right;
	  margin-right:15px;
	  margin-top:15px;
	}
	.fileUpload img{
		width:120px;
	}
	.fileUpload{
		border: dotted 1px #FAAFAF;
		border-radius:3px;
		display: inline-block;
		cursor:pointer;
	}
	.fileUpload:hover{border:dotted 1px #FB4242;}
	.Multistage-menu .dropdown-menu{
		display: inline-block;
	}
	.open>.Multistage-menu{
		display:block;
	}
	.Multistage-menu{
		display: none;
		white-space: nowrap;
	    background: #fff;
	    position: absolute;
	    margin: 38px 0;
	    border: 1px solid #d1dbe5;
	    border-radius: 2px;
	    box-shadow: 0 2px 4px rgba(0,0,0,.12), 0 0 6px rgba(0,0,0,.04);


	    position: fixed;
        /*top: 517px;*/
        /*left: 487px;*/
        transform-origin: center top 30px;
        z-index: 2002;
	}
	.Multistage-menus{
		display: inline-block;
	    vertical-align: top;
	    height: 204px;
	    overflow: auto;
	    border-right: 1px solid #d1dbe5;
	    margin: 0;
	    padding: 6px 0;
	    min-width: 160px;
	}
	.menu-item{
		font-size: 14px;
		padding: 8px 30px 8px 10px;
		position: relative;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		color: #48576a;
		height: 36px;
		line-height: 1.5;
		box-sizing: border-box;
		cursor: pointer;
	}
	.menu-item:hover{
		background-color: #E8DFDF;
	}
	.menu-item-icon:after{
	    font-family: element-icons;
	    content: "\E606";
	    font-size: 12px;
	    transform: scale(.8);
	    color: #bfcbd9;
	    position: absolute;
	    right: 10px;
	    margin-top: 1px;
	}
	.menu-item.isActive{
		color: #fff;
		background-color: #20a0ff;
	}
	.Multistage-menu-wrap .btn-default{
		font-size:14px;
		color: #3C3939;
	}
	.Multistage-menu-wrap .btn-default>span{
		/*padding:5px;*/
		color: #7594EC;
		font-weight:bolder;
	}
</style>