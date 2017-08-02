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
	              <input type="text" class="form-control" id="inputEmail3" :placeholder="`请输入${editType}编号`" v-model="edited.strWorkshopID">
	            </div>
	          </div>
	          <div class="form-group">
	            <label for="inputPassword3" class="col-sm-2 control-label">名称</label>
	            <div class="col-sm-10">
	              <input type="text" class="form-control" id="inputPassword3"  :placeholder="`请输入${editType}名称`" v-model="edited.strWorkshopName">
	            </div>
	          </div>
	          <div class="form-group">
	            <label for="inputPassword3" class="col-sm-2 control-label">主管</label>
	            <div class="col-sm-10">
	              <input type="text" class="form-control" id="inputPassword3" :placeholder="`请输入${editType}主管`" >
	            </div>
	          </div>
	          <div class="form-group">
	            <label for="inputPassword3" class="col-sm-2 control-label">车间类型</label>
	            <div class="col-sm-10">
	              <div class="btn-group">
	                <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
	                  {{currentWorkshopType.strWorkshopTypeNote}}<span class="caret"></span>
	                </button>
	                <ul class="dropdown-menu">
	                  <li v-for="(workshopType,index) in workshopTypelist" @click="toggleWorkshopType(index)"><a>{{workshopType.strWorkshopTypeNote}}</a></li>
	                  <!-- <li role="separator" class="divider"></li>
	                  <li><a href="#">Separated link</a></li> -->
	                </ul>
	              </div>
	            </div>
	          </div>
	          <div class="form-group">
	            <label for="inputPassword3" class="col-sm-2 control-label">所属工厂</label>
	            <div class="col-sm-10">
	              <div class="btn-group">
	                <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
	                  {{changeFactory.strFactoryName}}<span class="caret"></span>
	                </button>
	                <ul class="dropdown-menu">
	                  <li v-for="(factory,index) in factoryList" @click="toggleFactory(index)"><a>{{factory.strFactoryName}}</a></li>
	                  <!-- <li role="separator" class="divider"></li>
	                  <li><a href="#">Separated link</a></li> -->
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
		props:['editType','isAdd','edited','factoryList','selectedFactory'],
		data(){
			let changeFactory;
			return{
				workshopTypelist:[],
				changeFactory:this.selectedFactory,
				currentWorkshopType:{}
			}
		},
		methods:{
			closePop:function () {
				this.$emit('Edit','close');
			},
			cancel:function () {
				this.$emit('Edit','cancel');
			},
			confirm:function () {
				if(this.isAdd){
					fetch.Workshop_Add({
						uFactoryUUID: this.changeFactory.uFactoryUUID,
						uWorkshopTypeUUID:this.currentWorkshopType.uWorkshopTypeUUID,
						uWorkshopAdminUUID: 1,
						strWorkshopID: this.edited.strWorkshopID,
						strWorkshopName: this.edited.strWorkshopName,
					}).then(()=>this.$emit('Edit','confirm'));
				}
				else{
					fetch.Workshop_Update({
						uWorkshopUUID: this.edited.uWorkshopUUID,
						uFactoryUUID: this.changeFactory.uFactoryUUID,
						uWorkshopTypeUUID:this.currentWorkshopType.uWorkshopTypeUUID,
						uWorkshopAdminUUID : 10001,
						strWorkshopName:this.edited.strWorkshopName,
						strWorkshopID :this.edited.strWorkshopID,
						strWorkshopDesc: "装配车间一 DESC",
						strWorkshopNote: "装配车间一 NOTE"
					}).then(()=>this.$emit('Edit','confirm'));
				}
			},
			toggleWorkshopType:function (index) {
				this.currentWorkshopType=this.workshopTypelist[index];
			},
			toggleFactory:function (index) {
				this.changeFactory=this.factoryList[index];
				console.log(this.factoryList)
			},
			upFile:function () {
				event.target.nextSibling.nextSibling.click();
			}
		},
		beforeCreate:function () {
			fetch.WorkshopType_ListActive({
	              	"nPageIndex":0,
	              	"nPageSize":-1
	              }).then((data)=>{
				console.log(this.workshopTypelist=data.obj.objectlist);
				if(!this.isAdd){
					for(var j = 0, length2 = this.workshopTypelist.length; j < length2; j++){
						if(this.workshopTypelist[j].uWorkshopTypeUUID==this.edited.uWorkshopTypeUUID){
							this.currentWorkshopType=this.workshopTypelist[j];
							break;
						}
					}
				}
				else{
					// this.currentWorkshopType={
					// 	strWorkshopTypeNote:"请选择车间类型"
					// }
					this.currentWorkshopType=this.workshopTypelist[0];
				}
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