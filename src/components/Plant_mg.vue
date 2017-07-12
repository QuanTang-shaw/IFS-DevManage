<template>
  <div class="plantManagement">
    <div class="btn-group plantManagement-toggle" role="group" aria-label="...">
      <button type="button" class="btn btn-default">厂区列表</button>
      <button type="button" class="btn btn-default">厂区地图</button>
    </div>
    <div class="plant-list">
      <ul class="list-group">
        <li class="list-group-item" v-for="plant in plantList">
          <div class="row">
            <div class="col-md-2 plant-pic">
              <img src="../pic/plant1.jpg" alt="" >
            </div>
            <div class="col-md-6 plant-info">
              <p>{{plant.name}}</p>
              <p>{{plant.address}}</p>
              <p>{{plant.Contact}}</p>
            </div>
            <div class="col-md-4 plant-oper">
              <a href="#" class="btn btn-default"><i class="fa fa-pencil fa-lg"></i> Edit</a>
              <a class="btn btn-default" href="#">
                <i class="fa fa-trash-o fa-lg"></i> Delete</a>
              <a class="btn btn-default" href="#">
                <i class="fa fa-cog fa-lg"></i> Settings</a>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import store from '@/store/store'
  export default {
    name: 'plantList',
    data () {
      let plantList=store.obtain('plantList');
      return {
        plantList
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
  }
  .plantManagement-toggle{
    /*border:solid 1px;*/
    display:inline-block;
    margin:0px 15px 20px;

  }
  .plantManagement-toggle span{
    display: inline-block;
    padding:15px 5;
  }
  .plant-list li .row>div{
    display: flex;
    /*border:solid 1px;*/
  }
  .plant-pic img{
    /*height:120px;*/
    width:100%;
    max-height:130px;
    max-width:180px;
  }
  .plant-list .list-group-item {
    margin-bottom:20px;
    /*padding: 10px;*/
    /*border:solid 1px #EA0F0F;*/
  }
  .list-group-item .row{
    display:flex;
    justify-content:center;
  }
  .plant-info{
    flex-direction: column;
    justify-content: center;
    align-content: center;
  }
  .plant-oper {
    padding: 50px;
    justify-content:space-around;
  }
</style>
