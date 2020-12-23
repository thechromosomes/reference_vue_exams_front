<template>
  <v-container fluid subtopic_section qus_rprt>
    <v-layout row wrap>
      <v-flex xs12><h2 class="add_title">User List</h2></v-flex>
    </v-layout>
   <div class="question_fields">
</div>
    <template>
      <v-card class="clearqstnrprts last_hide" >
        <v-card-title>
          User Logs List
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="search"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table
          :headers="headers"
          :items="users"
          :search="search"
          :rows-per-page-items="[50, 100, 150]"
          :pagination.sync="pagination"
          class="usertable"
        >
          <template  slot="items" slot-scope="props">
          
            
            <td> {{props.item.userdetail.firstname}}</td>
            <td>{{props.item.userdetail.lastname}}</td>
            
            <td class="text-xs-left"> {{ props.item.created_at | createDatentime  }}</td>
            <td>
            </td>
          </template>
          <template slot:no-results>
            <v-alert :value="true" color="error" icon="warning">
              Your search for "{{ search }}" found no results.
            </v-alert>
          </template>
        </v-data-table>
      </v-card>
    </template>
  </v-container>
</template>
<script>
var dateFormat = require('dateformat');
var username=localStorage.username;
import axios from 'axios';
  export default {
    data() {
      return {
        currentuser:null,
        errors: [],
        questiontypes:[],
        q_typename:null,
        advance_filter:false,
        search: '',
        pagination: {
        rowsPerPage: 100
      },
        headers: [
          { text: 'Firstname', sortable: true, value:'userdetail.firstname' },
          { text: 'Lastname', align: 'left',sortable: true, value: 'userdetail.lastname' },
          { text: 'Last Login', sortable: true, value:'created_at' },
          { text: 'Actions', sortable: false, value:'filterdate' }
        ],
        users: []
      }
    },
    methods: 
    {

      allUsers()
      {
        axios.post(`/getalluserlogs`,{"loggedinuser":this.currentuser})
        .then(response => {
          this.users = response.data
        })
        .catch(e => {
          this.errors.push(e)
        })
      },
      updateoptioncount(){
        axios.post(`/getalluserlogs`,{"loggedinuser":this.currentuser})
        .then(response => {
          // JSON responses are automatically parsed.
          this.users = response.data
        })
        .catch(e => {
          this.errors.push(e)
        })
      },
      deleteUser(userid){
        console.log(userid);
        if(confirm("Do you really want to delete?"))
        {
          axios.post(`/deleteuserfromlist`,{"del_userid":userid})
          .then(response => {
            console.log(response.data)
          })
          .catch(e => {
            this.errors.push(e)
          }) 
        }
      } 
    }, //end of methods
    created() {
      axios.post(`/getcurrentuser`,{'username':username})
      .then(response => {
     
        this.currentuser = response.data.unique_id
      })
      .catch(e => {
        this.errors.push(e)
      }),


      axios.post(`/getalluserlogs`,{"loggedinuser":this.currentuser})
      .then(response => {
        var i=0;
        for(i=0; i<=response.data.length; i++){
          response.data[i].filterdate=dateFormat(response.data[i].created_at, "dd/mm/yyyy");
          this.users.push(response.data[i]);
        }
      })
      .catch(e => {
        this.errors.push(e)
      })


    }//end of created
}
</script>
<style>
.last_hide thead tr th:last-child {display:none;}
</style>