<template>
  <v-container subtopic_section addmodulepage>
    <v-layout row wrap>
      <v-flex xs12><h2 class="add_title">Add Capability</h2></v-flex>
      </v-layout>
    <form>
      <v-layout>
        <v-text-field v-model="module" label="Capability Name" required></v-text-field>
      </v-layout>
        <input @click='createModule' name="Add" type="button" value="Add" class="btn submit_btn" />
        <input name="Cancel" type="reset" class="btn cancel_btn" />
      </v-layout>
    </form>
    <template>
      <v-card>
        <v-card-title>
         Capability List
          <v-spacer></v-spacer>
          <v-text-field v-model="search" append-icon="search" label="Search"single-line hide-details></v-text-field>
        </v-card-title>
        <v-data-table :headers="headers" :items="capabilitydata" :search="search" :rows-per-page-items="[50, 100, 150]" :pagination.sync="pagination">
          <template  slot="items" slot-scope="props">
            <td>{{ props.item.modulename }}</td>    
            <td class="text-xs-left">{{ props.item.created_at | createDate  }}</td>
            <td><a :href="'/module/edit/' + props.item.unique_id"><img src="../assets/icons/edit.svg" class="fa_svg_icon"/></a>  
            <v-icon small @click="deleteModule(props.item.unique_id)">delete</v-icon></td>
          </template>
          <template slot:no-results>
            <v-alert :value="true" color="error" icon="warning">Your search for "{{ search }}" found no results.</v-alert>
          </template>
        </v-data-table>
      </v-card>
    </template>
  </v-container>
</template>
<script>
var username=localStorage.username;
import axios from 'axios';
  export default {
   data() {
    return {
      module:null,
      role:[],
      currentuser:null,
      moduledata:[],
      capabilitydata:[],
      errors: [],
      search: '',
      pagination: {
      rowsPerPage: 100
      },
      headers: [
      { text: 'Capability Name', align: 'left', sortable: true, value: 'modulename' },
      { text: 'Created at',sortable: true, value: 'created_at' },
      { text: 'Action', sortable: false, value:'' }
      ],
  
      rolename:[]
    }
  },

    methods: {

  createModule(){
      axios.post('/createmodule',{module:this.module,createdby:this.currentuser,addcap:"",editcap:"",deletecap:"",viewcap:""})
      .then(response => {
        // JSON responses are automatically parsed.
        location.reload();
      })
      .catch(e => {
        this.errors.push(e)
      })
    },
    
 deleteModule(modid){  
    if(confirm("Do you really want to delete this category?"))
    {
      axios.post(`/deletemodulebyid`,{'modid':modid})
        .then(response => {
          location.reload();
      })
      .catch(e => {
          this.errors.push(e)
      }),
      console.log(modid);
    }
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
 

 axios.post(`/getmoduledatatable`)
    .then(response => {
      this.moduledata = response.data
      console.log(this.moduledata);
    })
    .catch(e => {
      this.errors.push(e)
    })


axios.post(`/getcapabilitylable`)
    .then(response => {
      this.capabilitydata = response.data
      console.log(response.data);
    })
    .catch(e => {
      this.errors.push(e)
    })


          
}

}
</script>