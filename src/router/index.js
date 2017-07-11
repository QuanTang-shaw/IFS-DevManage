import Vue from 'vue'
import Router from 'vue-router'
import plantMan from '@/components/plantMan'
import navPlant from '@/components/navPlant'
import Workshop_mg from '@/components/Workshop_mg'



Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'plantMan',
      components:{
      	default:plantMan,
      	a:navPlant,
      	b:plantMan
      }
    },
    {
      path: '/workshop',
      // name: 'plantMan',
      components:{
      	default:plantMan,
      	a:navPlant,
      	b:Workshop_mg
      }
    }
  ]
})
