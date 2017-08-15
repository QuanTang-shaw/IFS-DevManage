<template>
  <div class="plantManagement">
    <plant-edit v-if='showPlantEdit' @submit="plantEditSub" :editPlant="editPlant" :isAddPlant="isAddPlant"> </plant-edit>
    <Modal
        v-model="modal1"
        title="删除工厂"
        @on-ok="ok"
        @on-cancel="cancel">
        <Alert type="warning" show-icon>
          <template slot="desc">
            删除工厂后,工厂所属的车间、机台、设备等信息都将删除
          </template>
          您确定要删除<span class="warmTitle" style="color:#FA0E0E;font-weight: bolder;">{{deletePopContent}}</span>吗?
        </Alert>
    </Modal>
    <div>
      <Button-group class=" plantManagement-toggle">
          <Button type="primary">厂区列表</Button>
          <Button>厂区地图</Button>
      </Button-group>
      <Button class="addPlant" type="primary" icon="plus-round" @click="plantEdit(null,true)">添加工厂</Button>
    </div>
    <div class="plant-list">
      <ul class="list-group">
        <li class="list-group-item" v-for="(plant,index) in plantList">
          <div class="row">
            <div class="col-md-2 plant-pic">
              <img src="../pic/plant1.jpg" alt="厂区图片">
            </div>
            <div class="col-md-6 plant-info">
              <p><b>名称:</b> &nbsp {{plant.strFactoryName}}</p>
              <p><b>地址:</b> &nbsp {{plant.strFactoryAddress}}</p>
              <!-- <p><b>联系方式:</b></p> -->
            </div>
            <div class="col-md-4 plant-oper" >
              <!-- <a href="#" class="btn btn-default"><i class="fa fa-pencil fa-sm"></i> Edit</a>
              <a class="btn btn-default" href="#">
                <i class="fa fa-trash-o fa-lg"></i> Delete</a>
              <a class="btn btn-default" href="#">
                <i class="fa fa-cog fa-lg"></i> Settings</a> -->
                <span class="font-icon-btn" @click="plantEdit(index)">
                  <i class="fa fa-edit fa-lg" title="编辑"></i>
                </span>
                <span class="font-icon-btn" @click="plantDelete(plant)">
                  <i class="fa fa-trash-o fa-lg" title="删除"></i>
                </span>
                <!-- <span class="font-icon-btn" title="查看详情">
                  <i class="fa fa-list-alt fa-lg"></i>
                </span> -->
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import plantEdit from '@/modalEdit/PlantEdit'
  import {FactoryListActive,FactoryInactive} from '@/api/getData'
  export default {
    name: 'plantList',
    data () {
      return {
        plantList:[],
        deletePopContent:'',
        editPlant:{},
        showPlantEdit:false,
        showDeletePop:false,
        isAddPlant:false,
        DelFactoryID:null,
        modal1: false
      }
    },
    components:{
      'plant-edit':plantEdit
    },
    methods:{
      async ok (){
        let self=this;
        FactoryInactive({uFactoryUUID:this.DelFactoryID})
          .then(async function () {
            self.plantList=await FactoryListActive();
            self.$Message.info('删除成功');
          });
      },
      cancel () {
        this.$Message.info('点击了取消');
      },
      plantEdit(index,addplant) {
        if (addplant){
          this.isAddPlant=true;
          this.editPlant={
            strFactoryName:'',
            strFactoryID:'',
            strFactoryAddress:''
          };
        }
        else{
          this.isAddPlant=false;
          this.editPlant=this.plantList[index];
        }
        this.showPlantEdit=true;
      },
      async plantEditSub(str) {
        this.showPlantEdit=false;
        this.plantList=await FactoryListActive();
        if(str=='close'||str=='cancel');
        else if(str=='confirm'){
        }
      },
      plantDelete:function (obj) {
        this.modal1 = true;
        this.deletePopContent=obj.strFactoryName;
        this.DelFactoryID=obj.uFactoryUUID;
      }
    },
    async beforeCreate() {
      this.plantList=await FactoryListActive();
    }
  }
</script>
<style >
  .plantManagement{
    /*border:solid 1px;*/
    font-size:.7em;
  }
  .plantManagement-toggle{
    /*border:solid 1px;*/
    display:inline-block;
    margin:0px 15px 20px;
  }
  .addPlant{
    float: right;
    margin-right:20px;
  }
  .plantManagement-toggle span{
    display: inline-block;
    padding:15px 5;
  }
  .plant-list{
    /*font-size:15px;*/
  }
  .plant-list li .row>div{
    display: flex;
    /*border:solid 1px;*/
  }
  .plant-pic{
    display:block;
  }
  .plant-pic img{
    /*height:120px;*/
    width:100%;
    max-height:120px;
    max-width:180px;
  }
  .plant-list .list-group-item {
    margin-bottom:15px;
    padding: 0px 10px;
    /*border:solid 1px #EA0F0F;*/
  }
  .list-group-item .row{
    display:flex;
    justify-content:center;
  }
  .plant-info{
    flex-direction: column;
    justify-content:space-around;
    /*align-content: center;*/
  }
  .plant-info p{margin:0;}
  .plant-oper {
    padding: 0px;
    justify-content:space-around;
    align-items: center;
  }
  .font-icon-btn {
    cursor: pointer;
  }
</style>
