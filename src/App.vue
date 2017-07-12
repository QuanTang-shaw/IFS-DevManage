<template>
  <div id="app">
    <header>
      <img src="./assets/53007d5b00000.png" alt="LOGO">
      <h2>生产设备管理</h2>
      <div class="log">
        <img src="./assets/people/50/guy-4.jpg" alt="头像" height="35">
        <select name="" id="" class="account">
          <option value="">我的账户</option>
          <option value="">个人信息</option>
          <option value="">退出</option>
        </select>
        <img src="./assets/flage.jpg" alt="guoqi" width="45">
      </div>
    </header>
    <router-view class="viewOne"  name="a"></router-view>
    <div class="row">
      <div class="col-md-1"></div>
      <div class="col-md-8">
        <router-view class="viewTwo"  name="b"></router-view>
      </div>
      <div class="col-md-2 deviceMan-wraper">
        <div class="panel panel-default deviceMan-nav" data-toggle="panel-collapse" data-open="true">
          <div class="panel-heading deviceMan-nav-head">
            <h4 class="panel-title">生产设备管理</h4>
          </div>
          <div class="panel-body list-group">
            <ul class="list-group list-group-menu">
              <li class="list-group-item active">
                <router-link to="/plant">厂区管理</router-link>
              </li>
              <li class="list-group-item">
                <router-link to="/workshop">车间管理</router-link>
              </li>
              <li class="list-group-item">
                <router-link :to="{name:'machineListMg',params:{userId:123}}">机台列表</router-link>
              </li>
              <li class="list-group-item">
                <router-link to="/deviceCategory">设备类别</router-link>
              </li>
              <li class="list-group-item">
                <router-link to="/deviceManufacturers">设备厂商</router-link>
              </li>
              <li class="list-group-item">
                <router-link to="/deviceList">设备列表</router-link>
              </li>
              <li class="list-group-item">
                <router-link to="/report">报表管理</router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import store from './store/store.js';
  export default {
    name: 'app',
    created:function () {
      store.initStorage();
    }
  }
</script>

<style>
  body{
    margin:0;
    padding: 0;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /*text-align: center;*/
    color: #2c3e50;
    padding:5px;
  }
  header{
    border:solid 1px #D1CBCB;
  }
  header h2{
    display:inline-block;
    color: #78C7FB;
  }
  .viewTwo{
    margin-top:30px;
  }
  .log{
    display:inline-block;
    float: right;
    margin-right:80px;
  }
  .account{
    border:none;
    padding:8px 5px;
    font-size:30px;
  }
  .deviceMan-wraper{
    /*border:solid 1px;*/
    padding:0;
    margin-top:30px;
  }
  .deviceMan-nav{
    width:100%;
    /*float: right;*/
    /*border:solid 1px;*/
    margin:0;
    position: relative;
  }
  .deviceMan-nav-head h4:after{
    font: normal normal normal 14px/1 FontAwesome;
    font-size: 16px;
    text-rendering: auto;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    content: "\f107";
    position: absolute;
    right: 15px;
    top: 10px;
    display: block;
  }
  .list-group-item.active a{
    color: #FFFFFF;
  }
</style>
