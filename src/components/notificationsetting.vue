<template>
  <v-container moduledetails_section>
    <v-layout row wrap>
      <v-flex xs12><h2> Notifications Setting </h2></v-flex>
    </v-layout>
    <form>
  
     
      <select class="col-md-12 qus_one animated infinite bounce delay-2s" v-model="user" selected=''>
        <option value=" " selected > All </option>
        <option v-for="user in users" :value="user.unique_id">{{user.firstname+' '+user.lastname}}</option>
      </select>

      <div class="">
            <button class="clear_btn" @click="clearnotification"> Remove Notifications </button>
      </div>

    </form>
   
  </v-container>
</template>
<script>
var username=localStorage.username;
import axios from 'axios';
  export default {
    data() {
      return {
      currentuser:null,
      errors: [],
      users:[],
      currentuserdata:null,
      user:''
      }
    },
methods: {

  clearnotification(){
  axios.post(`/clearnotifications`,{"userid":this.user})
      .then(response => {
         this.updatenotification();
      })
      .catch(e => {
        this.errors.push(e)
      })
  }

},
created() {
  axios.post(`/getcurrentuser`,{'username':username})
        .then(response => {
          this.currentuser = response.data.unique_id
        })
        .catch(e => {
          this.errors.push(e)
        }),

  axios.get(`/getallmodules`)
        .then(response => {
          this.modules = response.data
        })
        .catch(e => {
          this.errors.push(e)
        }),

  axios.post(`/getallusers`)
        .then(response => {
          this.users = response.data
        })
        .catch(e => {
          this.errors.push(e)
        })

}
}
</script>