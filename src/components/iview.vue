<template>
    <div class="layout">
        <Row type="flex">
            <i-col span="5" class="layout-menu-left">
                <Menu active-name="1-1" theme="dark" width="auto" :open-names="['1']" @on-select="router">
                    <div class="layout-logo-left">
                    </div>
                    <Submenu name="1">
                        <template slot="title">
                            <Icon type="ios-navigate"></Icon>
                            生产设备管理
                        </template>
                        <Menu-item :name="`1-${index+1}`" v-for="(menu,index) in routerMenu.factoryDevManage" >
                            {{menu.text}}
                            <!-- <router-link class="router-link" to="/">工厂管理</router-link> -->
                        </Menu-item>
                    </Submenu>
                    <Submenu name="2">
                        <template slot="title">
                            <Icon type="ios-keypad"></Icon>
                            报表管理
                        </template>
                        <Menu-item :name="`2-${index+1}`" v-for="(menu,index) in routerMenu.reportManage">{{menu.text}}</Menu-item>
                    </Submenu>
                </Menu>
            </i-col>
            <i-col span="19">
                <!-- <div class="layout-header"></div> -->
                <div class="layout-breadcrumb">
                    <Breadcrumb>
                        <!-- <Breadcrumb-item href="#">首页</Breadcrumb-item> -->
                        <Breadcrumb-item href="#">{{BreadcrumbText}}</Breadcrumb-item>
                        <Breadcrumb-item>{{SubBreadcrumbText}}</Breadcrumb-item>
                    </Breadcrumb>
                </div>
                <div class="layout-content">
                    <div class="layout-content-main">
                        <router-view class="viewTwo" name="b"></router-view>
                    </div>
                </div>
                <div class="layout-copy">
                    2011-2016 &copy; TalkingData
                </div>
            </i-col>
        </Row>
    </div>
</template>
<script>
    export default {
        data(){
            return{
                routerMenu:{
                    factoryDevManage:[
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
                      }
                    ],
                    reportManage:[{
                         path:'/report',
                         text:'报表管理',
                         isActive:false
                    }]
                },
                BreadcrumbText:'生产设备管理',
                SubBreadcrumbText:'工厂管理',
            }
        },
        methods:{
            router:function(name){
                let str=name.split(''),
                    item0=parseInt(str.shift()),
                    item1=parseInt(str.pop());
                if(item0==1){
                    this.$router.push(this.routerMenu.factoryDevManage[item1-1].path);
                    this.BreadcrumbText='生产设备管理';
                    this.SubBreadcrumbText=this.routerMenu.factoryDevManage[item1-1].text;
                }
                else{
                    this.$router.push(this.routerMenu.reportManage[item1-1].path);
                    this.BreadcrumbText='报表管理';
                    this.SubBreadcrumbText=this.routerMenu.reportManage[item1-1].text;
                }
                console.log(this.$router)
            }
        },
        created(){
            this.$router.push(this.routerMenu.factoryDevManage[0].path);
        }
    }
</script>
<style scoped>
    .layout{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        /*width:90%;*/
        /*margin:0 auto;*/
    }
    .layout-breadcrumb{
        padding: 10px 15px 0;
    }
    .layout-content{
        min-height: 200px;
        margin: 15px;
        overflow: hidden;
        background: #fff;
        border-radius: 4px;
    }
    .layout-content-main{
        padding: 10px;
        font-size:20px;
    }
    .layout-copy{
        text-align: center;
        padding: 10px 0 20px;
        color: #9ea7b4;
    }
    .layout-menu-left{
        background: #464c5b;
    }
    .layout-header{
        height: 60px;
        background: #fff;
        box-shadow: 0 1px 1px rgba(0,0,0,.1);
    }
    .layout-logo-left{
        width: 90%;
        height: 30px;
        background: #5b6270;
        border-radius: 3px;
        margin: 15px auto;
    }
    .viewTwo{
        min-height:490px;
    }
    .warmTitle{
        color: #FC0808;
    }
</style>