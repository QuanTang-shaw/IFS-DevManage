
import Vue from 'vue'
import Router from 'vue-router'
import plant from '@/components/Plant_mg'
import workshop from '@/components/Workshop_mg'
import machineList from '@/components/MachineList_mg'
import deviceCategory from '@/components/DeviceCategory_mg'
import deviceManufacturers from '@/components/DeviceManufacturers_mg'
import deviceList from '@/components/DeviceList_mg'
import report from '@/components/Report_mg'

import navPlant from '@/components/NavPlant'
import navworkshop from '@/components/NavWorkshop'
import navMachineList from '@/components/NavMachineList'
import navDeviceCategory from '@/components/NavDeviceCategory'
import navDeviceManufacturers from '@/components/NavDeviceManufacturers'
import navDeviceList from '@/components/NavDeviceList'
import navReport from '@/components/NavReport'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/plant',
      name: 'plantMg',
      components:{
      	default:navPlant,
      	a:navPlant,
      	b:plant
      }
    },
    {
      path: '/workshop',
      name: 'workshopMg',
      components:{
      	default:navworkshop,
      	a:navworkshop,
      	b:workshop
      }
    },
    {
      path: '/machineList/:userId',
      name: 'machineListMg',
      components:{
      	default:navMachineList,
      	a:navMachineList,
      	b:machineList
      }
    },
    {
      path: '/deviceCategory',
      name: 'deviceCategoryMg',
      components:{
      	default:navDeviceCategory,
      	a:navDeviceCategory,
      	b:deviceCategory
      }
    },
    {
      path: '/deviceManufacturers',
      name: 'deviceManufacturersMg',
      components:{
      	default:navDeviceManufacturers,
      	a:navDeviceManufacturers,
      	b:deviceManufacturers
      }
    },
    {
      path: '/deviceList',
      name: 'deviceListMg',
      components:{
      	default:navDeviceList,
      	a:navDeviceList,
      	b:deviceList
      }
    },
    {
      path: '/report',
      name: 'reportMg',
      components:{
      	default:navReport,
      	a:navReport,
      	b:report
      }
    }
  ]
})
