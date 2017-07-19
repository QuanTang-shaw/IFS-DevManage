<template>
  <div class="plantManagement">
    <plant-edit v-show='showPlantEdit' @submit="plantEditSub" :editPlant="editPlant"> </plant-edit>
    <delete-pop v-show='showDeletePop' @delete="plantDeletePop" :popTitle="deletePopTitle" :contentTxt="deletePopContent"></delete-pop>
    <div>
      <div class="btn-group plantManagement-toggle" role="group" aria-label="...">
        <button type="button" class="btn btn-default">厂区列表</button>
        <button type="button" class="btn btn-default">厂区地图</button>
      </div>
      <button class="btn btn-default addPlant" @click="addPlant">
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
              <p><b>名称:</b> &nbsp {{plant.name}}</p>
              <p><b>地址:</b> &nbsp {{plant.address}}</p>
              <p><b>联系方式:</b> &nbsp {{plant.Contact}}</p>
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
                <span class="font-icon-btn" @click="plantDelete(plant.name)">
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
  import plantEdit from '@/components/PlantEdit'
  import deletepop from '@/components/Delete_pop'
  export default {
    name: 'plantList',
    data () {
      let plantList=store.obtain('plantList'),
          showPlantEdit=false,
          showDeletePop=false,
          deletePopTitle='删除工厂',
          deletePopContent='',
          editPlant=plantList[0];
      return {
        plantList,
        showPlantEdit,
        showDeletePop,
        deletePopTitle,
        deletePopContent,
        editPlant
      }
    },
    components:{
      'plant-edit':plantEdit,
      'delete-pop':deletepop
    },
    methods:{
      plantEdit:function (index) {
        this.showPlantEdit=true;
        this.editPlant=this.plantList[index];
      },
      plantEditSub:function (str) {
        if(str=='close'||str=='cancel');
          else if(str=='confirm'){
            //ajax
          }
        this.showPlantEdit=false;
      },
      plantDelete:function (str) {
        this.showDeletePop=true;
        this.deletePopContent=str;
      },
      plantDeletePop:function (str) {
        if(str=='close'||str=='cancel');
          else if(str=='confirm'){
            //ajax
          }
        this.showDeletePop=false;
      },
      addPlant:function () {
        this.showPlantEdit=true;
      }
    },
    created:function () {
      console.log(this.plantList)
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
