<template>
  <v-app>
  <gpexheader></gpexheader>
  <v-container fluid>
    <v-content>
<router-view></router-view>
    </v-content>
    </v-container>
    <div class="footer_styling text-center"> <p>Copyright © {{curryear}} GPEx SA, All rights reserved. <a href="/privacypolicy/">  Privacy Policy </a> </p> </div>

  </v-app>
</template>

<script>
import gpexheader from './components/includes/gpexheader.vue'
import moment from 'moment'
import {
  mapGetters,
  mapState,
} from 'vuex'
export default {
  data: () => ({

      title:"GPEx Exams Collective",
      currentuser:null,
      curryear: '2020'

  }),
   components: {
      gpexheader: gpexheader
    },
  name: 'App',
  // computed: {
  //   ...mapGetters(['isAuthenticated', 'menus']),
  //   ...mapState(['user']),
  //   name () {
  //     return this.user ? this.user.name : ''
  //   }
  // },
  created(){

    axios.interceptors.response.use(undefined, function (err) {
    return new Promise(function (resolve, reject) {
      if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
        this.$store.dispatch('logout').then(()=>{
            location.href='https://one.gpex.com.au';
        })
      }
      throw err;
    });
  });
  this.curryear=moment().format('YYYY');
  }

}

</script>
