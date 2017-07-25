<template>
  <div class="plantManagement">
    <plant-edit v-if='showPlantEdit' @submit="plantEditSub" :editPlant="editPlant" :isAddPlant="isAddPlant"> </plant-edit>
    <delete-pop v-show='showDeletePop' @delete="plantDelete" :popTitle="deletePopTitle" :contentTxt="deletePopContent"></delete-pop>
    <div>
      <div class="btn-group plantManagement-toggle" role="group" aria-label="...">
        <button type="button" class="btn btn-default">厂区列表</button>
        <button type="button" class="btn btn-default">厂区地图</button>
      </div>
      <button class="btn btn-default addPlant" @click="plantEdit(null,true)">
        <i class="fa fa-plus"></i>添加工厂</button>
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
                <span class="font-icon-btn" title="查看详情">
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
  import plantEdit from '@/components/PlantEdit'
  // import addplant from '@/components/AddPlant'
  import deletepop from '@/components/Delete_pop'
  export default {
    name: 'plantList',
    data () {
      let editPlant={},
          plantList,
          showPlantEdit=false,
          showDeletePop=false,
          deletePopTitle='删除工厂',
          deletePopContent='';
      return {
        plantList,
        showPlantEdit,
        showDeletePop,
        deletePopTitle,
        deletePopContent,
        editPlant,
        test:null,
        isAddPlant:false,
        DelFactoryID:null
      }
    },
    components:{
      'plant-edit':plantEdit,
      'delete-pop':deletepop,
      // addplant
    },
    methods:{
      plantEdit:function (index,addplant) {
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
      plantEditSub:function (str) {
        this.showPlantEdit=false;
         fetch
               .Factory_ListActive()
               .then(data=>console.log(this.plantList=data.obj.objectlist));
        if(str=='close'||str=='cancel');
          else if(str=='confirm'){
          }
      },
      plantDelete:function (obj,str) {
        let _this=this;
        this.showDeletePop=!this.showDeletePop;
        if (str) {
          if(str=='close'||str=='cancel');
            else if(str=='confirm'){
              fetch.Factory_Inactive({uFactoryUUID:this.DelFactoryID})
                   .then(function (a) {
                     fetch
                           .Factory_ListActive()
                           .then(data=>console.log(_this.plantList=data.obj.objectlist));
                    });
            }
        }
        else {
          this.deletePopContent=obj.strFactoryName;
          this.DelFactoryID=obj.uFactoryUUID;
        }



      },
      addPlant:function () {
        this.showPlantEdit=true;
      }
    },
    created:function () {

    },
    beforeCreate:function () {
      fetch
            .Factory_ListActive()
            .then(data=>console.log(this.plantList=data.obj.objectlist));
      fetch.Factory_Detail({uFactoryUUID:98})
           .then(da=>console.log(da),err=>console.log(err));
    }
  }
</script>
<style>
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
