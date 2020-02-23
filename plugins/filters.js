import Vue from 'vue'

Vue.filter('cut', (val, length) => `${val.slice(0, length)}...`)