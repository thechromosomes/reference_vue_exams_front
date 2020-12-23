<template>
<v-container>
 <v-layout row wrap>
 <v-flex xs12><h2>Create Group</h2></v-flex>
 </v-layout>

  <form>
   <v-layout>
    <v-text-field
      label="Group Name"
      v-model="groupname"
      required
    ></v-text-field>
    </v-layout>
    <v-layout>
       <v-select
  :items="registrars"
  name="registrar"
  label="Select a username"
  v-model="registrar"
  item-text="firstname"
  item-value="_id"
  multiple
  ></v-select>
          </v-layout><v-layout>
    <v-btn @click='createGroup'>Add</v-btn>
    <v-btn>Cancel</v-btn>
     </v-layout>
  </form>
  {{groups}}
   </v-container>
</template>
<script>
var username=localStorage.username;
var datetime = new Date();
import axios from 'axios';
  export default {
   data() {
    return {
      registrars: [],
      errors: [],
      currentuser:null,
      groupname:null,
      registrar:null,
        headers: [
          {
            text: 'Dessert (100g serving)',
            align: 'left',
            sortable: false,
            value: 'groupname'
          },
          { text: 'Fat (g)', value: 'groupmemmbers' },
          { text: 'Carbs (g)', value: 'createdby' },
          { text: 'Protein (g)', value: 'createddate' }
        ],
        groups: []
 
    }
  },
  methods: {

      createGroup(){
        axios.post('/creategroup',{groupname:this.groupname,members:this.registrar,createdby:this.currentuser,createddate:datetime})
    .then(response => {
      // JSON responses are automatically parsed.
    })
    .catch(e => {
      this.errors.push(e)
    })
        
      }
    },
 created() {
    axios.get(`/getusers`)
    .then(response => {
      // JSON responses are automatically parsed.
      this.registrars = response.data
    })
    .catch(e => {
      this.errors.push(e)
    }),
        axios.get(`/getgroups`)
    .then(response => {
      // JSON responses are automatically parsed.
      this.groups = response.data
    })
    .catch(e => {
      this.errors.push(e)
    }),
        axios.post(`/getcurrentuser`,{'username':username})
    .then(response => {
      // JSON responses are automatically parsed.
      this.currentuser = response.data._id
    })
    .catch(e => {
      this.errors.push(e)
    })
}

}
</script>