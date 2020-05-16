import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '@/store/index'

Vue.use(VueRouter)

const routes = [{
  path: '/',
  name: 'Home',
  props: true,
  component: Home,
  beforeEnter(routeTo, routeFrom, next) {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.')
    } else {
      navigator.geolocation.getCurrentPosition(success, error)
    }

    function success(position) {
      store.dispatch('getLocation', {
        lat: position.coords.latitude,
        long: position.coords.longitude
      }).then(() => {
        routeTo.params.geoLocation = {
          lat: position.coords.latitude,
          long: position.coords.longitude
        }
        next()
      })
    }

    function error() {
      alert('Geolocation does not work.')
    }
  }
}]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router