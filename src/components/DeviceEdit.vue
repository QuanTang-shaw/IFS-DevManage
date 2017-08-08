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
	            	<!-- <el-cascader
	            	    expand-trigger="hover"
	            	    :options="options"
	            	    v-model="selectedOptions2"
	            	    @change="handleChange">
	            	</el-cascader> -->
					<div class="btn-group Multistage-menu-wrap">
					  <button type="button" class="btn btn-default dropdown-toggle Multistage-menu-input" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
					    {{currentFactory.strFactoryName}}<span>/</span>
					    {{currentWorkshop.strWorkshopName}}<span>/</span>
					    {{currentMachine.strWorkstationName}}
					    <span class="caret"></span>
					  </button>
					  <div class="Multistage-menu" @click="menuClick">
						  <ul class="Multistage-menus" >
						    <li class="menu-item menu-item-icon" v-for="(factory,$index) in factoryList" @click="toggleFactory(factory,$index)" :class="{isActive:activeFNum==$index}">{{factory.strFactoryName}} </li>
						  </ul>
						  <ul class="Multistage-menus" >
						    <li class="menu-item menu-item-icon" v-for="(workshop,$index) in workshopList" @click="toggleWorkshop(workshop,$index)" :class="{isActive:activeWNum==$index}">{{workshop.strWorkshopName}}</li>
						  </ul>
						  <ul class="Multistage-menus">
						    <li class="menu-item" v-for="(workstation,$index) in workstationList" @click="toggleMachine(workstation,$index)" :class="{isActive:activeMNum==$index}">{{workstation.strWorkstationName}}</li>
						  </ul>
					  </div>
					</div>
					<!-- <div class="btn-group">
					  <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
					  {{currentWorkshop.strWorkshopName}} <span class="caret"></span>
					  </button>
					  <ul class="dropdown-menu">
					    <li v-for="workshop in workshopList" @click="toggleWorkshop(workshop)"><a>{{workshop.strWorkshopName}}</a></li>
					  </ul>
					</div>
					<div class="btn-group">
					  <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
					  {{currentMachine.strWorkstationName}} <span class="caret"></span>
					  </button>
					  <ul class="dropdown-menu">
					    <li v-for="workstation in workstationList" @click="toggleWorkstation(workstation)"><a>{{workstation.strWorkstationName}}</a></li>
					  </ul>
					</div> -->
	            </div>
	          </div>
	          <div class="form-group">
	            <label for="inputPassword3" class="col-sm-2 control-label">设备型号</label>
	            <div class="col-sm-10">

	            </div>
	          </div>
	          <div class="form-group">
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
				currentCategory:{},
				factoryList:[],
				workshopList:[],
				workstationList:[],
				workshopListAll:[],
				workstationListAll:[],
				DevParentCategoryList:[],
				DevSubCategoryList:[],
				DevModelList:[],
				currentDevModel:[],
				activeFNum:0,
				activeWNum:0,
				activeMNum:0
				/*options: [
							{
					          	value: '.....',
					          	label: '指南',
						        children: [
							        {
							            value: 'shejiyuanze',
							            label: '设计原则',
							            children: [
								            {
								              value: 'yizhi',
								              label: '一致'
								            },
								            {
								              value: 'fankui',
								              label: '反馈'
								            },
								            {
								              value: 'xiaolv',
								              label: '效率'
								            },
								            {
							              	  value: 'kekong',
							              	  label: '可控'
							            	}
						            	]
						          	},
							        {
							            value: 'daohang',
							            label: '导航',
							            children: [
								            {
								              value: 'cexiangdaohang',
								              label: '侧向导航'
								            },
								            {
								              value: 'dingbudaohang',
								              label: '顶部导航'
								            }
							            ]
							        }
							    ]
				        	},
				        	{
					          	value: 'zujian',
					          	label: '组件',
					          	children: [
					          		{
							            value: 'basic',
							            label: 'Basic',
							            children: [
								            {
								              	value: 'layout',
								              	label: 'Layout 布局'
								            },
								            {
							              		value: 'color',
							              		label: 'Color 色彩'
							            	},
								            {
								              	value: 'typography',
								              	label: 'Typography 字体'
								            },
								            {
								              	value: 'icon',
								              	label: 'Icon 图标'
								            },
								            {
								              	value: 'button',
								              	label: 'Button 按钮'
								            }
						            	]
				          			},
							        {
							            value: 'form',
							            label: 'Form',
							            children: [
								            {
								              value: 'radio',
								              label: 'Radio 单选框'
								            },
								            {
								              value: 'checkbox',
								              label: 'Checkbox 多选框'
								            },
								            {
								              value: 'input',
								              label: 'Input 输入框'
								            },
								            {
								              value: 'input-number',
								              label: 'InputNumber 计数器'
								            },
								            {
								              value: 'select',
								              label: 'Select 选择器'
								            },
								            {
								              value: 'cascader',
								              label: 'Cascader 级联选择器'
								            },
								            {
								              value: 'switch',
								              label: 'Switch 开关'
								            },
								            {
								              value: 'slider',
								              label: 'Slider 滑块'
								            },
								            {
								              value: 'time-picker',
								              label: 'TimePicker 时间选择器'
								            },
								            {
								              value: 'date-picker',
								              label: 'DatePicker 日期选择器'
								            },
								            {
								              value: 'datetime-picker',
								              label: 'DateTimePicker 日期时间选择器'
								            },
								            {
								              value: 'upload',
								              label: 'Upload 上传'
								            },
								            {
								              value: 'rate',
								              label: 'Rate 评分'
								            },
								            {
								              value: 'form',
								              label: 'Form 表单'
								            }
							            ]
							        },
							        {
							            value: 'data',
							            label: 'Data',
							            children: [
								            {
								              value: 'table',
								              label: 'Table 表格'
								            },
								            {
								              value: 'tag',
								              label: 'Tag 标签'
								            },
								            {
								              value: 'progress',
								              label: 'Progress 进度条'
								            },
								            {
								              value: 'tree',
								              label: 'Tree 树形控件'
								            },
								            {
								              value: 'pagination',
								              label: 'Pagination 分页'
								            },
								            {
								              value: 'badge',
								              label: 'Badge 标记'
								            }
							            ]
							        },
							        {
							            value: 'notice',
							            label: 'Notice',
							            children: [
								            {
								              value: 'alert',
								              label: 'Alert 警告'
								            },
								            {
								              value: 'loading',
								              label: 'Loading 加载'
								            },
								            {
								              value: 'message',
								              label: 'Message 消息提示'
								            },
								            {
								              value: 'message-box',
								              label: 'MessageBox 弹框'
								            },
								            {
								              value: 'notification',
								              label: 'Notification 通知'
								            }
							            ]
							        },
							        {
							            value: 'navigation',
							            label: 'Navigation',
							            children: [
								            {
								              value: 'menu',
								              label: 'NavMenu 导航菜单'
								            },
								            {
								              value: 'tabs',
								              label: 'Tabs 标签页'
								            },
								            {
								              value: 'breadcrumb',
								              label: 'Breadcrumb 面包屑'
								            },
								            {
								              value: 'dropdown',
								              label: 'Dropdown 下拉菜单'
								            },
								            {
								              value: 'steps',
								              label: 'Steps 步骤条'
								            }
							            ]
							        },
							        {
							            value: 'others',
							            label: 'Others',
							            children: [
								            {
								              value: 'dialog',
								              label: 'Dialog 对话框'
								            },
								            {
								              value: 'tooltip',
								              label: 'Tooltip 文字提示'
								            },
								            {
								              value: 'popover',
								              label: 'Popover 弹出框'
								            },
								            {
								              value: 'card',
								              label: 'Card 卡片'
								            },
								            {
								              value: 'carousel',
								              label: 'Carousel 走马灯'
								            },
								            {
								              value: 'collapse',
								              label: 'Collapse 折叠面板'
								            }
							            ]
							        }
				          		]
				        	},
					        {
					          value: 'ziyuan',
					          label: '资源',
					          children: [
						          {
						            value: 'axure',
						            label: 'Axure Components'
						          },
						          {
						            value: 'sketch',
						            label: 'Sketch Templates'
						          },
						          {
						            value: 'jiaohu',
						            label: '组件交互文档'
						          }
					          ]
					        }
				        ],
				selectedOptions: [],
				selectedOptions2: []*/
			}
		},
		computed:{
			options:function () {
				let arr=[],
					obj=null,
					self=this;
				this.factoryList.forEach( function(element, index) {
					let	obj={};
					// statements
					obj.value='F'+index;
					obj.label=element.strFactoryName;
					obj.children=[];

				});
			}
		},
		methods:{
			toggleFactory:function (obj,index) {
				this.currentFactory=obj;
				this.activeFNum=index;
				// this.activeWNum=0;
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
				this.activeWNum=index;
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
				this.activeMNum=index;
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
			closePop:function () {
				this.$emit('submit','close');
			},
			cancel:function () {
				this.$emit('submit','cancel');
			},
			confirm:function () {
				if (this.isAddDevice){
					fetch.Device_Add({
						uDevModelUUID:this.editDevice.uDevModelUUID,
						uWorkstationUUID:this.editDevice.uWorkstationUUID,
						strDeviceName:this.editDevice.strDeviceName,
						strDeviceID:'',
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
				event.cancelBubble=true;
			}
		},
		created:function () {
			let self=this;
			// console.log(this.editDevice);
			fetch
			        .Factory_ListActive()
			        .then(data=>this.factoryList=data.obj.objectlist);

		  	fetch
	        		.Workshop_ListActive({
			        	"nPageIndex": 0,
			            "nPageSize": -1,
			            "uFactoryUUID":this.selectedFactory.uFactoryUUID,
			            "uWorkshopTypeUUID":-1,
		  				"uWorkshopAdminUUID":-1
	        		})
		        	.then(data=>this.workshopList=data.obj.objectlist);

			fetch
			        .Workstation_ListActive({
		              	"nPageIndex": 0,
		              	"nPageSize": -1,
		              	"uPLineUUID": this.selectedWorkshop.uWorkshopUUID,
		              	"uWorkstationTypeUUID":-1,
		    			"uWorkstationAdminUUID":-1,
		              })
			        .then(data=>this.workstationList=data.obj.objectlist);

	        fetch
	              .Devcategory_ListActive({
	              	"nPageIndex": 0,
	              	"nPageSize": -1,
	              	"uDevCategoryParentUUID":0,
	              	"uUserUUID":-1})
	              .then(data=>{
	              	this.DevParentCategoryList=data.obj.objectlist;
	              	this.currentCategory=this.DevParentCategoryList[0];


			        fetch
		                .Devcategory_ListActive({
		                	"nPageIndex": 0,
		                	"nPageSize": -1,
		                	"uDevCategoryParentUUID":1,
		                	"uUserUUID":-1})
		                .then(data=>{
		                	self.DevSubCategoryList=data.obj.objectlist;
		                });

	            })



	    	fetch
	    			.DevModel_ListActive({
	    				"nPageIndex": 0,
	    				"nPageSize": -1,
	    				"uDevTypeUUID": -1,
						"uDevCategoryUUID":1,
						"uVendorUUID":-1,
						"uUserUUID":-1,
	    			})
	    			.then(data=>{
	    				console.log(data)
	    			})
		},
		/*beforeCreate:function () {

			let self=this
			fetch
			        .Factory_ListActive()
			        .then(data=>{
			        	console.log(this.factoryList=data.obj.objectlist);

						this.factoryList.forEach((ele,index)=>{
							self.workshopListAll[index]=[];
							fetch
				        		.Workshop_ListActive({
						        	"nPageIndex": 0,
						            "nPageSize": -1,
						            "uFactoryUUID":ele.uFactoryUUID,
						            "uWorkshopTypeUUID":-1,
					  				"uWorkshopAdminUUID":-1
				        		})
					        	.then(data=>{
					        		self.workshopListAll[index]=data.obj.objectlist;
					        		console.log(self.workshopListAll);
					        	});
						});
			    	});

			fetch
		        .Workstation_ListActive({
	              	"nPageIndex": 0,
	              	"nPageSize": -1,
	              	"uPLineUUID": -1,
	              	"uWorkstationTypeUUID":-1,
	    			"uWorkstationAdminUUID":-1,
	              })
		        .then(data=>console.log(data))
		}*/
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
	.menu-item-icon.isActive{
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