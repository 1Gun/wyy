import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    musicList: {
      name:'',
      src:'',
      img:'',
      lrc:''
    },
    img:'',
    name:''
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
