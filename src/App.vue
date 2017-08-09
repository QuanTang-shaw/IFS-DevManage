<template>
  <div id="app">
    <!-- <router-view class="viewOne"  name="a"></router-view> -->
      <div class="row wraper">
        <!-- <pagetitle :message="titleText"></pagetitle> -->
        <div class="col-md-2 deviceMg-wraper" >
          <div class="panel panel-default deviceMg-nav" data-toggle="panel-collapse" data-open="true">
            <div class="panel-heading deviceMg-nav-head">
              <h4 class="panel-title">生产设备管理</h4>
            </div>
            <div class="panel-body list-group deviceMg-nav-body">
              <ul class="list-group list-group-menu">
                <li class="list-group-item" :class="{ active: menu.isActive }" v-for="(menu,index ) in routerMenu" @click="menuClick(index)">
                  <router-link class="router-link" :to="menu.path">
                    {{menu.text}}
                  </router-link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <!-- <div class="col-md-1"></div> -->
        <div class="col-md-9" >
          <router-view class="viewTwo" name="b"></router-view>
        </div>
      </div>
  </div>
</template>
<script>
  import store from './store/store.js'
  import pagetitle from './components/pageTitle.vue'
  export default {
    name: 'app',
    data() {
      let routerMenu=[
          {
            path:'/',
            text:'工厂管理',
            isActive:false
          },
          {
            path:'/workshop',
            text:'车间管理',
            isActive:false
          },
          {
            path:'/machineList',
            text:'机台管理',
            isActive:false
          },
          {
            path:'/deviceCategory',
            text:'设备类别',
            isActive:false
          },
          {
            path:'/deviceManufacturers',
            text:'设备厂商',
            isActive:false
          },
          {
            path:'/deviceList',
            text:'设备列表',
            isActive:false
          },
          {
            path:'/report',
            text:'报表管理',
            isActive:false
          }
        ],
          titleText='厂区管理';
      return{
        routerMenu,
        titleText
      }
    },
    created:function () {
      store.initStorage();
    },
    components:{
      pagetitle
    },
    methods:{
      menuClick:function (index) {
        this.routerMenu.forEach( function(element, index) {
          element.isActive=false;
        });
        this.routerMenu[index].isActive=true;
        this.titleText=event.target.innerText;
      }
    }
  }
</script>
<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    position:relative;
    margin:0 auto;
    color: #2c3e50;
    max-width:1300px;
    padding: 0;
    font-size:20px;
  }
  .wraper{
    /*border:solid 1px #11F77C;*/
    margin-right: 0;
    margin-left: 0;
    padding: 0 30px;
    font-size:20px;
  }
  .buttonDown{
    /*padding:2px 12px;*/
  }
  .viewTwo{
    margin-top:30px;
  }
  .deviceMg-wraper{
    /*padding:0;*/
    margin-top:30px;
  }
  .deviceMg-nav{
    width:100%;
    font-size:18px;
    margin:0;
    position: relative;
  }
  .deviceMg-nav-head h4:after{
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
  .deviceMg-nav-body{
    padding:0px;
  }
  .deviceMg-nav-body .list-group{margin:0;}
  .list-group-item{
    padding: 0;
  }
  .list-group-item.active a{
    color: #FFFFFF;
    text-decoration: none;
  }
  .router-link{
    text-decoration: none;
    display: inline-block;
    width: 100%;
    height: 100%;
    padding:10px;
    letter-spacing:6px;
  }
  .router-link:hover{text-decoration: none;}
</style>
