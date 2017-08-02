<template>
	<div class="plantEdit">
	  <div class="plantEditCover">
	    <div class="plantEditPop">
	      <header class="plantEdit-header">
	        <span class="poptitle">{{editType}}编辑</span>
	        <span class="plantEditclose" @click='closePop'>
	          <i class="fa fa-close fa-sm" title="关闭"></i>
	        </span>
	      </header>
	      <section class="plantEdit-section">
	        <form class="form-horizontal">
	          <div class="form-group">
	            <label for="inputEmail3" class="col-sm-2 control-label">编号</label>
	            <div class="col-sm-10">
	              <input type="text" class="form-control" id="inputEmail3" :placeholder="`请输入${editType}编号`" v-model="edited.strWorkstationID">
	            </div>
	          </div>
	          <div class="form-group">
	            <label for="inputPassword3" class="col-sm-2 control-label">名称</label>
	            <div class="col-sm-10">
	              <input type="text" class="form-control" id="inputPassword3" :placeholder="`请输入${editType}名称`" v-model="edited.strWorkstationName">
	            </div>
	          </div>
	          <div class="form-group">
	            <label for="inputPassword3" class="col-sm-2 control-label">主管</label>
	            <div class="col-sm-10">
	              <input type="text" class="form-control" id="inputPassword3" :placeholder="`请输入${editType}主管`" >
	            </div>
	          </div>
	          <div class="form-group">
	            <label for="inputPassword3" class="col-sm-2 control-label">机台类型</label>
	            <div class="col-sm-10">
	              <div class="btn-group">
	                <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
	                {{currentMachineType.strWorkstationTypeName}}<span class="caret"></span>
	                </button>
	                <ul class="dropdown-menu">
	                  <li v-for="machineType in MachineTypeList" @click="toggleMachineType(machineType)"><a>{{machineType.strWorkstationTypeName}}</a></li>
	                </ul>
	              </div>
	            </div>
	          </div>
	          <div class="form-group">
	            <label for="inputPassword3" class="col-sm-2 control-label">所属车间</label>
	            <div class="col-sm-10">
	              <div class="btn-group">
	                <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
	                  {{currentFactory.strFactoryName}}<span class="caret"></span>
	                </button>
	                <ul class="dropdown-menu">
	                  <li v-for="factory in factoryList" @click="toggleFactory(factory)"><a>{{factory.strFactoryName}}</a></li>
	                </ul>
	              </div>
	              <div class="btn-group">
	                <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
	                {{currentWorkshop.strWorkshopName}} <span class="caret"></span>
	                </button>
	                <ul class="dropdown-menu">
	                  <li v-for="workshop in workshopList" @click="toggleWorkshop(workshop)"><a>{{workshop.strWorkshopName}}</a></li>
	                </ul>
	              </div>
	            </div>
	          </div>
	          <div class="form-group">
	            <label for="inputPassword3" class="col-sm-2 control-label">图片</label>
	            <div class="col-sm-10">
	            	<div class="fileUpload">
		              <img src="../assets/plant1.jpg" alt="图片" @click="upFile">
		              <input type="file" style="display:none;">
	            	</div>
	            </div>
	          </div>
	        </form>
	      </section>
	      <footer class="plantEdit-footer">
	        <div class="plantEdit-btn">
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
		name:'plantEdit',
		props:['editType','isAdd','edited','factoryList','selectedFactory','selectedWorkshop'],
		data(){
			let workshopList,
				MachineTypeList;
			return{
				workshopList,
				MachineTypeList,
				currentFactory:this.selectedFactory,
				currentWorkshop:this.selectedWorkshop,
				currentMachineType:{
					strWorkstationTypeName:this.edited.strWorkstationTypeName,
					uWorkstationTypeUUID:this.edited.uWorkstationTypeUUID
				}
			}
		},
		methods:{
			toggleFactory:function (obj) {
				this.currentFactory=obj;
				fetch
	    		      .Workshop_ListActive({
    		        	"nPageIndex": 0,
    		            "nPageSize": -1,
    		            "uFactoryUUID":this.currentFactory.uFactoryUUID,
    		            "uWorkshopTypeUUID":-1,
    	  				"uWorkshopAdminUUID":-1
	    		       })
	    		      .then(data=>{
    		        	console.log(this.workshopList=data.obj.objectlist);
    		        	this.currentWorkshop=this.workshopList[0];
	    		       });
			},
			toggleWorkshop:function (obj) {
				this.currentWorkshop=obj;
			},
			toggleMachineType:function (obj) {
				this.currentMachineType=obj;
			},
			closePop:function () {
				this.$emit('Edit','close');
			},
			cancel:function () {
				this.$emit('Edit','cancel');
			},
			confirm:function () {
				if(this.isAdd){
					fetch.Workstation_Add({
						uPLineUUID: this.currentWorkshop.uWorkshopUUID,
						uWorkstationTypeUUID:this.currentMachineType.uWorkstationTypeUUID,
						uWorkstationAdminUUID:1,
						strWorkstationName:this.edited.strWorkstationName,
						strWorkstationID:this.edited.strWorkstationID,
					}).then(()=>this.$emit('Edit','confirm'));
				}
				else{
					fetch.Workstation_Update({
						uWorkstationUUID: this.edited.uWorkstationUUID,
						uPLineUUID:this.currentWorkshop.uWorkshopUUID,
						uWorkstationTypeUUID:this.currentMachineType.uWorkstationTypeUUID,
						uWorkstationAdminUUID:1,
						strWorkstationName:this.edited.strWorkstationName,
						strWorkstationID:this.edited.strWorkstationID,
						strWorkstationDesc:"Desc PHKT 05",
						strWorkstationNote:"Note PHKT 05"
					}).then(()=>this.$emit('Edit','confirm'));

				}
			},
			upFile:function () {
				event.target.nextSibling.nextSibling.click();
			}
		},
		created:function () {
			console.log(this.edited)
			let self=this;
			fetch.WorkstationType_ListActive({
					"nPageIndex":0,
					"nPageSize":-1
					})
				 .then(data=>{
				 	console.log(data);
				 	this.MachineTypeList=data.obj.objectlist;
				 });

    		 fetch
    		      .Workshop_ListActive({
		        	"nPageIndex": 0,
		            "nPageSize": -1,
		            "uFactoryUUID":self.selectedFactory.uFactoryUUID,
		            "uWorkshopTypeUUID":-1,
	  				"uWorkshopAdminUUID":-1
    		       })
    		      .then(data=>{
		        	console.log(self.workshopList=data.obj.objectlist);
		        	// self.selectedWorkshop=self.workshopList[0];
    		       });
		}
	}
</script>
<style>
	.plantEditCover{
	  position: fixed;
	  left: 0;
	  right: 0;
	  top: 0;
	  bottom: 0;
	  background-color: rgba(43, 43, 43, 0.41);
	  z-index: 100;
	}
	.plantEditPop{
	  position:absolute;
	  padding:10px 8px;
	  width:50%;
	  background-color: #FFFFFF;
	  top:15%;
	  left:50%;
	  transform:translateX(-50%);
	}
	.plantEditclose{
		cursor: pointer;
		float:right;
	}
	.plantEdit-section{
		font-size:0.9em;
		padding:15px;
	}
	.plantEdit-section label{
		/*color:#8C8686;*/
		font-weight:initial;
	}
	.poptitle{
		font-weight:bolder;
	}
	.plantEdit-btn{
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
</style>