<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12><h2>Edit Capability</h2></v-flex>
      </v-layout>
    <form>
      <v-layout>
        <v-text-field
             v-model="modulesedit"
          label="Capability Name"
          required
        ></v-text-field>

      </v-layout>
   
        <input @click='updateModule' name="Add" type="button" value="Update" class="btn submit_btn" />
       <input @click='cancelModule' type="button" class="btn cancel_btn" value="Cancel" />
      </v-layout>
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

 modulesedit:""

      }
    },
  methods: {
   cancelModule(){
location.href = "/addmodules"
},
 updateModule(){

         axios.post('/updatemodule',{id:this.$route.params.id,name:this.modulesedit,createdby:this.currentuser})
        .then(response => {
          // JSON responses are automatically parsed.
 location.href = "/addmodules"
        })
        .catch(e => {
          this.errors.push(e)
        })
 
      } 
},
 created() {
    axios.post(`/getcurrentuser`,{'username':username})
    .then(response => {
      // JSON responses are automatically parsed.
      this.currentuser = response.data._id
    })
    .catch(e => {
      this.errors.push(e)
    }),

       axios.post('/editmodules',{'id':this.$route.params.id})
 
    .then(response => {
 
      this.modulesedit = response.data[0].modulename
console.log(this.modulesedit);
    })
    .catch(e => {
      this.errors.push(e)
    })
    
}
}


</script>