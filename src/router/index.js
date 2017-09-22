
import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
const plant = r => require.ensure([], () => r(require('@/components/Plant_mg')), 'plant');
const workshop = r => require.ensure([], () => r(require('@/components/Workshop_mg')), 'Workshop');
const machineList = r => require.ensure([], () => r(require('@/components/MachineList_mg')), 'machineList');
const devCategory = r => require.ensure([], () => r(require('@/components/deviceCategory_mg')), 'devCategory');
const devMF = r => require.ensure([], () => r(require('@/components/DeviceManufacturers_mg')), 'devMF');
const devList = r => require.ensure([], () => r(require('@/components/DeviceList_mg')), 'devList');
const report = r => require.ensure([], () => r(require('@/components/Report_mg')), 'report');

export default new Router({
  routes: [
    {
      path: '/',
      name: 'plantMg',
      components:{
      	b:plant
      }
    },
    {
      path: '/workshop',
      name: 'workshopMg',
      components:{
      	b:workshop
      }
    },
    {
      path: '/machineList',
      name: 'machineListMg',
      components:{
      	b:machineList
      }
    },
    {
      path: '/deviceCategory',
      name: 'deviceCategoryMg',
      components:{
      	b:devCategory
      }
    },
    {
      path: '/deviceManufacturers',
      name: 'deviceManufacturersMg',
      components:{
      	b:devMF
      }
    },
    {
      path: '/deviceList',
      name: 'deviceListMg',
      components:{
      	b:devList
      }
    },
    {
      path: '/report',
      name: 'reportMg',
      components:{
      	b:report
      }
    }
  ]
})
