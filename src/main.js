// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex';
import App from './App'
import moment from 'moment'
import router from './router'
import Vuetify from 'vuetify'
import HighCharts from 'v-highcharts'
import axios from 'axios'
import 'vuetify/dist/vuetify.min.css'
import store from './store/index'
// import MediumEditor from 'medium-editor'
import 'handsontable/dist/handsontable.full.css';
//import HoneybadgerVue from '@honeybadger-io/vue'



require('dateformat');
require('@/assets/css/main.css')

window.Bus=new Vue;
window.axios=axios

window.token= localStorage.getItem('token');
window.user= localStorage.getItem('user');
axios.defaults.baseURL = 'http://localhost:3000/api';
window.publicfileurl = "http://localhost:3000/public?file=";
// axios.defaults.baseURL = 'https://devexams1.gpex.org.au/api';
// window.publicfileurl = "https://devexams1.gpex.org.au/public?file=";
//axios.defaults.baseURL = 'https://exams.gpex.org.au/api';
//window.publicfileurl = "https://exams.gpex.org.au/public?file=";
axios.defaults.headers.common['Authorization'] = "Bearer " + window.token;
axios.defaults.headers.common['x-access-token'] = window.token;

axios.defaults.headers.post['Content-Type'] = 'application/json';

Vue.use(Vuetify)
Vue.use(HighCharts)
Vue.use(Vuex)

// const config = {
//   apiKey: 'fb69aad23f55b5264155873969c1a7c8310312c7f57c2e1116d0ca4422a343ad',
//   environment: 'production',
//   revision: 'git SHA/project version'
//   }

//   Vue.use(HoneybadgerVue, config)
// Vue.config.productionTip = false

Vue.filter('fixedTwo', function(value) {
  if (value) {
    return (value).toFixed(2)

  }else{
    return 0;
  }
});
Vue.filter('postsumDate', function(value) {
  if (value) {
    var dateString = value/1000;
    return moment.unix(dateString).format("MMM DD");

  }
});
Vue.filter('timeleft', function(value) {
  if (value) {
    var dateString = value/1000;
    return moment.unix(dateString).format("DD/MM/YYYY  hh:mm A");

  }
});
Vue.filter('createDate', function(value) {
  if (value) {
    var dateString = value/1000;
    return moment.unix(dateString).format("DD/MM/YYYY");

  }
});
Vue.filter('createDatentime', function(value) {
  if (value) {
    var dateString = value/1000;
    return moment.unix(dateString).format("DD/MM/YYYY  hh:mm A");

  }
});
Vue.filter('NotifyDatentime', function(value) {
  if (value) {
    var dateString = value/1000;
    //return moment(value, "YYYYMMDD").fromNow();
    return moment.unix(dateString).format("ha DD/MM/YYYY");

  }
});
// var editor = new MediumEditor('.editable', {
//   toolbar: {
//       /* These are the default options for the toolbar,
//          if nothing is passed this is what is used */
//       allowMultiParagraphSelection: true,
//       buttons: ['bold', 'italic', 'underline', 'anchor', 'h2', 'h3', 'quote'],
//       diffLeft: 0,
//       diffTop: -10,
//       firstButtonClass: 'medium-editor-button-first',
//       lastButtonClass: 'medium-editor-button-last',
//       relativeContainer: null,
//       standardizeSelectionStart: false,
//       static: false,
//       /* options which only apply when static is true */
//       align: 'center',
//       sticky: false,
//       updateOnEmptySelection: false
//   }
// });
// Vue.use(editor)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
}).$mount('#app')
